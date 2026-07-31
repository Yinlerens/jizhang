import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { createControlPlaneAdminPageClient } from "@/lib/control-plane/admin";
import { listCampaignItemOptions } from "@/lib/control-plane/campaign-data";
import { createCampaignScheduleDefaults } from "@/lib/control-plane/campaign";
import { createCampaignDraft } from "../actions";
import { CampaignDraftForm } from "../CampaignDraftForm";

export const dynamic = "force-dynamic";

export default async function NewPoolPage() {
  const adminClient = await createControlPlaneAdminPageClient(
    "/console/pools/new",
    "campaign:manage",
  );
  if (!adminClient.ok) {
    return <PageFailure message={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  let itemOptions;
  try {
    itemOptions = await listCampaignItemOptions(supabase, context.project.id);
  } catch (error) {
    console.error("Campaign item options unavailable", error);
    return <PageFailure message="内容库暂时不可用，请稍后刷新。" />;
  }

  const schedule = createCampaignScheduleDefaults();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-start gap-3 border-b border-border pb-5">
        <Button asChild aria-label="返回卡池列表" size="icon-sm" variant="ghost">
          <Link href="/console/pools" title="返回卡池列表">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <div className="text-xs font-semibold text-muted-foreground">卡池管理</div>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">新建卡池</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {context.project.name} / {context.environment.name}
          </p>
        </div>
      </header>

      <CampaignDraftForm
        action={createCampaignDraft}
        initialValues={{
          effectiveFrom: schedule.effectiveFrom,
          effectiveTo: schedule.effectiveTo,
          featuredItemId: "",
          name: "",
        }}
        itemOptions={itemOptions}
        mode="create"
      />
    </div>
  );
}

function PageFailure({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>无法新建卡池</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
