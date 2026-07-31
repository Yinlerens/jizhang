import "server-only";

import { cache } from "react";
import {
  getAuthenticatedRequest,
  type AuthenticatedUser,
} from "@/lib/supabase/server";
import { readControlContextSelection } from "./context-cookie";
import {
  hasControlCapability,
  isControlRole,
  type ControlCapability,
  type ControlRole,
} from "./roles";

type MembershipRow = {
  organization_id: string;
  role: string;
};

export type OrganizationRow = {
  id: string;
  name: string;
  slug: string;
};

export type ProjectRow = {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
};

export type EnvironmentRow = {
  id: string;
  project_id: string;
  kind: "development" | "staging" | "production";
  name: string;
  slug: string;
};

type EmbeddedEnvironmentRow = EnvironmentRow & {
  status: string;
  is_default: boolean;
  created_at: string;
};

type EmbeddedProjectRow = ProjectRow & {
  status: string;
  is_default: boolean;
  created_at: string;
  environments: EmbeddedEnvironmentRow[] | null;
};

type EmbeddedOrganizationRow = OrganizationRow & {
  status: string;
  projects: EmbeddedProjectRow[] | null;
};

type EmbeddedMembershipRow = MembershipRow & {
  organization: EmbeddedOrganizationRow | EmbeddedOrganizationRow[] | null;
};

const CONTROL_WORKSPACE_SELECT = `
  organization_id,
  role,
  organization:organizations!inner(
    id,
    name,
    slug,
    status,
    projects(
      id,
      organization_id,
      name,
      slug,
      status,
      is_default,
      created_at,
      environments(
        id,
        project_id,
        kind,
        name,
        slug,
        status,
        is_default,
        created_at
      )
    )
  )
`;

export type ControlPlaneWorkspaceOption = {
  organizationId: string;
  organizationName: string;
  projectId: string;
  projectName: string;
  environmentId: string;
  environmentName: string;
  environmentKind: EnvironmentRow["kind"];
};

export type ControlPlaneContext = {
  user: AuthenticatedUser;
  role: ControlRole;
  organization: OrganizationRow;
  project: ProjectRow;
  environment: EnvironmentRow;
};

export type ControlPlaneAccessFailure = {
  ok: false;
  reason: "unauthenticated" | "forbidden" | "config";
  message: string;
};

export type ControlPlaneAccessResult =
  | {
      ok: true;
      context: ControlPlaneContext;
    }
  | ControlPlaneAccessFailure;

type ControlPlaneWorkspaceSnapshot = {
  access: ControlPlaneAccessResult;
  options: ControlPlaneWorkspaceOption[];
};

const getControlPlaneWorkspaceSnapshot = cache(
  async (): Promise<ControlPlaneWorkspaceSnapshot> => {
    const [request, selectedContext] = await Promise.all([
      getAuthenticatedRequest(),
      readControlContextSelection(),
    ]);
    const { supabase, user, userError } = request;

    if (userError || !user) {
      return snapshotFailure({
        ok: false,
        reason: "unauthenticated",
        message: "登录状态已失效，请重新登录。",
      });
    }

    const { data: membershipData, error: membershipError } = await supabase
      .schema("control")
      .from("organization_members")
      .select(CONTROL_WORKSPACE_SELECT)
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("created_at", { ascending: true });

    if (membershipError) {
      return snapshotFailure(controlSchemaFailure());
    }

    const { memberships, organizations, projects, environments } = unpackWorkspaceRows(
      (membershipData ?? []) as unknown as EmbeddedMembershipRow[],
    );
    if (!memberships.length) {
      return snapshotFailure({
        ok: false,
        reason: "forbidden",
        message: "此账号尚未加入可用的 GachaOps 组织，请联系组织所有者分配访问权限。",
      });
    }

    const options = createWorkspaceOptions({ organizations, projects, environments });
    const configuredOrganizationId = configuredId("GACHAOPS_ORGANIZATION_ID");
    const preferredOrganizationId = configuredOrganizationId ?? selectedContext.organizationId;
    const membership = preferredOrganizationId
      ? memberships.find((candidate) => candidate.organization_id === preferredOrganizationId) ??
        (configuredOrganizationId ? null : memberships[0] ?? null)
      : memberships[0] ?? null;
    if (!membership || !isControlRole(membership.role)) {
      return snapshotFailure(missingContextFailure("组织"), options);
    }

    const organization =
      organizations.find((candidate) => candidate.id === membership.organization_id) ?? null;
    if (!organization) {
      return snapshotFailure(missingContextFailure("组织"), options);
    }

    const organizationProjects = projects.filter(
      (candidate) => candidate.organization_id === organization.id,
    );
    const configuredProjectId = configuredId("GACHAOPS_PROJECT_ID");
    const preferredProjectId = configuredProjectId ?? selectedContext.projectId;
    const project = preferredProjectId
      ? organizationProjects.find((candidate) => candidate.id === preferredProjectId) ??
        (configuredProjectId ? null : organizationProjects[0] ?? null)
      : organizationProjects[0] ?? null;
    if (!project) {
      return snapshotFailure(missingContextFailure("项目"), options);
    }

    const projectEnvironments = environments.filter(
      (candidate) => candidate.project_id === project.id,
    );
    const configuredEnvironmentId = configuredId("GACHAOPS_ENVIRONMENT_ID");
    const preferredEnvironmentId = configuredEnvironmentId ?? selectedContext.environmentId;
    const environment = preferredEnvironmentId
      ? projectEnvironments.find((candidate) => candidate.id === preferredEnvironmentId) ??
        (configuredEnvironmentId ? null : projectEnvironments[0] ?? null)
      : projectEnvironments[0] ?? null;
    if (!environment) {
      return snapshotFailure(missingContextFailure("环境"), options);
    }

    return {
      access: {
        ok: true,
        context: {
          user,
          role: membership.role,
          organization,
          project,
          environment,
        },
      },
      options,
    };
  },
);

export const getControlPlaneContext = cache(async (): Promise<ControlPlaneAccessResult> => {
  const snapshot = await getControlPlaneWorkspaceSnapshot();
  return snapshot.access;
});

export const getControlPlaneWorkspaceOptions = cache(
  async (userId: string): Promise<ControlPlaneWorkspaceOption[]> => {
    const snapshot = await getControlPlaneWorkspaceSnapshot();
    if (!snapshot.access.ok || snapshot.access.context.user.id !== userId) {
      return [];
    }
    return snapshot.options;
  },
);

export function controlPlaneContextIsPinned() {
  return Boolean(
    configuredId("GACHAOPS_ORGANIZATION_ID") ||
      configuredId("GACHAOPS_PROJECT_ID") ||
      configuredId("GACHAOPS_ENVIRONMENT_ID"),
  );
}

export async function getControlPlaneAccess(
  capability: ControlCapability,
): Promise<ControlPlaneAccessResult> {
  const result = await getControlPlaneContext();
  if (!result.ok) {
    return result;
  }

  if (!hasControlCapability(result.context.role, capability)) {
    return {
      ok: false,
      reason: "forbidden",
      message: "当前组织角色没有执行此操作的权限。",
    };
  }

  return result;
}

function unpackWorkspaceRows(rows: EmbeddedMembershipRow[]) {
  const memberships: MembershipRow[] = [];
  const organizations = new Map<string, OrganizationRow>();
  const projects = new Map<string, ProjectRow>();
  const environments = new Map<string, EnvironmentRow>();

  for (const row of rows) {
    if (!isControlRole(row.role)) {
      continue;
    }
    memberships.push({ organization_id: row.organization_id, role: row.role });

    const organization = Array.isArray(row.organization)
      ? row.organization[0] ?? null
      : row.organization;
    if (
      !organization ||
      organization.status !== "active" ||
      organization.id !== row.organization_id
    ) {
      continue;
    }

    organizations.set(organization.id, {
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
    });

    const activeProjects = (organization.projects ?? [])
      .filter(
        (project) =>
          project.status === "active" && project.organization_id === organization.id,
      )
      .sort(compareDefaultRows);

    for (const project of activeProjects) {
      projects.set(project.id, {
        id: project.id,
        organization_id: project.organization_id,
        name: project.name,
        slug: project.slug,
      });

      const activeEnvironments = (project.environments ?? [])
        .filter(
          (environment) =>
            environment.status === "active" && environment.project_id === project.id,
        )
        .sort(compareDefaultRows);

      for (const environment of activeEnvironments) {
        environments.set(environment.id, {
          id: environment.id,
          project_id: environment.project_id,
          kind: environment.kind,
          name: environment.name,
          slug: environment.slug,
        });
      }
    }
  }

  return {
    memberships,
    organizations: [...organizations.values()],
    projects: [...projects.values()],
    environments: [...environments.values()],
  };
}

function compareDefaultRows(
  left: { is_default: boolean; created_at: string },
  right: { is_default: boolean; created_at: string },
) {
  return (
    Number(right.is_default) - Number(left.is_default) ||
    left.created_at.localeCompare(right.created_at)
  );
}

function createWorkspaceOptions({
  organizations,
  projects,
  environments,
}: {
  organizations: OrganizationRow[];
  projects: ProjectRow[];
  environments: EnvironmentRow[];
}) {
  const organizationNames = new Map(
    organizations.map((organization) => [organization.id, organization.name]),
  );
  const projectById = new Map(projects.map((project) => [project.id, project]));

  return environments.flatMap((environment): ControlPlaneWorkspaceOption[] => {
    const project = projectById.get(environment.project_id);
    const organizationName = project
      ? organizationNames.get(project.organization_id)
      : undefined;
    if (!project || !organizationName) {
      return [];
    }

    return [
      {
        organizationId: project.organization_id,
        organizationName,
        projectId: project.id,
        projectName: project.name,
        environmentId: environment.id,
        environmentName: environment.name,
        environmentKind: environment.kind,
      },
    ];
  });
}

function snapshotFailure(
  access: ControlPlaneAccessFailure,
  options: ControlPlaneWorkspaceOption[] = [],
): ControlPlaneWorkspaceSnapshot {
  return { access, options };
}

function configuredId(name: string) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function controlSchemaFailure(): ControlPlaneAccessFailure {
  return {
    ok: false,
    reason: "config",
    message:
      "控制面尚未就绪。请应用 phase 1 migration，并确认 Supabase API 已暴露 control schema。",
  };
}

function missingContextFailure(label: string): ControlPlaneAccessFailure {
  return {
    ok: false,
    reason: "config",
    message: `当前账号没有可用的${label}上下文，请检查控制面配置。`,
  };
}
