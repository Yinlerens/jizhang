import "server-only";

import { cookies } from "next/headers";

export const CONTROL_CONTEXT_COOKIES = {
  organization: "gachaops-organization",
  project: "gachaops-project",
  environment: "gachaops-environment",
} as const;

export type ControlContextSelection = {
  organizationId: string;
  projectId: string;
  environmentId: string;
};

export async function readControlContextSelection() {
  const cookieStore = await cookies();
  return {
    organizationId: cookieStore.get(CONTROL_CONTEXT_COOKIES.organization)?.value,
    projectId: cookieStore.get(CONTROL_CONTEXT_COOKIES.project)?.value,
    environmentId: cookieStore.get(CONTROL_CONTEXT_COOKIES.environment)?.value,
  };
}

export async function writeControlContextSelection(selection: ControlContextSelection) {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  };

  cookieStore.set(CONTROL_CONTEXT_COOKIES.organization, selection.organizationId, options);
  cookieStore.set(CONTROL_CONTEXT_COOKIES.project, selection.projectId, options);
  cookieStore.set(CONTROL_CONTEXT_COOKIES.environment, selection.environmentId, options);
}
