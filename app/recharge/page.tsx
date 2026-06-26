import { redirect } from "next/navigation";
import {
  getAssetAccount,
  getAssetLedger,
  type AssetAccount,
  type AssetLedgerPage,
} from "@/lib/gateway/assets";
import { RECHARGE_TIERS } from "@/lib/recharge/tiers";
import { createClient } from "@/lib/supabase/server";
import RechargeClient from "./RechargeClient";

export const dynamic = "force-dynamic";

export default async function RechargePage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    redirect("/login?next=/recharge");
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
      tiers={RECHARGE_TIERS}
    />
  );
}
