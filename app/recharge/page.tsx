import { redirect } from "next/navigation";
import {
  getAssetAccount,
  getAssetLedger,
  type AssetAccount,
  type AssetLedgerPage,
} from "@/lib/gateway/assets";
import { SANDBOX_RESOURCE_GRANTS } from "@/lib/sandbox/resource-grants";
import { getAuthenticatedSession } from "@/lib/supabase/server";
import RechargeClient from "./RechargeClient";

export const dynamic = "force-dynamic";

export default async function RechargePage() {
  const { user, session } = await getAuthenticatedSession();

  if (!user || !session?.access_token) {
    redirect("/login?next=/sandbox/resources");
  }

  let account: AssetAccount | null = null;
  let ledger: AssetLedgerPage = { items: [] };
  let loadError: string | undefined;
  let ledgerLoadError: string | undefined;

  const [accountResult, ledgerResult] = await Promise.allSettled([
    getAssetAccount(session.access_token),
    getAssetLedger({ accessToken: session.access_token, limit: 20 }),
  ]);

  if (accountResult.status === "fulfilled") {
    account = accountResult.value;
  } else {
    loadError =
      accountResult.reason instanceof Error
        ? accountResult.reason.message
        : "资产账户加载失败。";
  }

  if (ledgerResult.status === "fulfilled") {
    ledger = ledgerResult.value;
  } else {
    ledgerLoadError =
      ledgerResult.reason instanceof Error
        ? ledgerResult.reason.message
        : "资产流水加载失败。";
  }

  return (
    <RechargeClient
      initialAccount={account}
      initialLedgerItems={ledger.items}
      initialLedgerNextCursor={ledger.next_cursor}
      ledgerLoadError={ledgerLoadError}
      loadError={loadError}
      grants={SANDBOX_RESOURCE_GRANTS}
    />
  );
}
