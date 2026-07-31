import type { ReactNode } from "react";
import { AccessNotice } from "@/components/console/AccessNotice";
import { getControlPlaneAccess } from "@/lib/control-plane/access";

export default async function AuditLogsLayout({ children }: { children: ReactNode }) {
  const access = await getControlPlaneAccess("audit:view");

  if (!access.ok) {
    return <AccessNotice message={access.message} showLogin={access.reason === "unauthenticated"} />;
  }

  return children;
}
