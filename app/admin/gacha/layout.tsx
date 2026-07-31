import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { AccessNotice } from "@/components/console/AccessNotice";
import {
  controlPlaneContextIsPinned,
  getControlPlaneAccess,
  getControlPlaneWorkspaceOptions,
} from "@/lib/control-plane/access";
import AdminShell from "./AdminShell";
import { ConsoleShellLoading } from "@/components/console/ConsoleLoading";

export default function GachaAdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<ConsoleShellLoading />}>
      <AuthenticatedGachaAdminShell>{children}</AuthenticatedGachaAdminShell>
    </Suspense>
  );
}

async function AuthenticatedGachaAdminShell({ children }: { children: ReactNode }) {
  const access = await getControlPlaneAccess("console:view");

  if (!access.ok && access.reason === "unauthenticated") {
    redirect(`/login?next=${encodeURIComponent("/admin/gacha/items")}`);
  }

  if (!access.ok) {
    return <AccessNotice message={access.message} />;
  }

  const { context } = access;
  const workspaceOptions = await getControlPlaneWorkspaceOptions(context.user.id);
  return (
    <AdminShell
      activeEnvironmentId={context.environment.id}
      contextPinned={controlPlaneContextIsPinned()}
      environmentName={context.environment.name}
      organizationName={context.organization.name}
      projectName={context.project.name}
      role={context.role}
      userEmail={context.user.email || ""}
      workspaceOptions={workspaceOptions}
    >
      {children}
    </AdminShell>
  );
}
