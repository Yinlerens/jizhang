import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { createControlPlaneAdminPageClient } from "@/lib/control-plane/admin";
import {
  listCampaignItemOptions,
  listCampaigns,
} from "@/lib/control-plane/campaign-data";
import { toHongKongDateTimeInput } from "@/lib/control-plane/campaign";
import { parseUuid } from "@/lib/control-plane/input";
import { updateCampaignDraft } from "../actions";
import { CampaignDraftForm } from "../CampaignDraftForm";

export const dynamic = "force-dynamic";

export default async function EditPoolPage({
  params,
}: {
  params: Promise<{ versionId: string }>;
}) {
  const { versionId: rawVersionId } = await params;
  const versionId = parseUuid(rawVersionId);
  if (!versionId) notFound();

  const nextPath = `/console/pools/${versionId}`;
  const adminClient = await createControlPlaneAdminPageClient(nextPath, "campaign:manage");
  if (!adminClient.ok) {
    return <PageFailure message={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  let campaign;
  let itemOptions;
  try {
    const [campaigns, availableItems] = await Promise.all([
      listCampaigns(supabase, context.project.id, context.environment.id),
      listCampaignItemOptions(supabase, context.project.id),
    ]);
    campaign = campaigns.find((candidate) => candidate.id === versionId);
    itemOptions = availableItems;
  } catch (error) {
    console.error("Campaign editor unavailable", error);
    return <PageFailure message="卡池草稿暂时不可用，请稍后刷新。" />;
  }

  if (!campaign) notFound();
  if (campaign.lifecycle !== "draft") {
    return <PageFailure message="该卡池已经发布或归档，不能继续修改。" />;
  }
  if (campaign.bannerType !== "limited-character") {
    return <PageFailure message="常驻卡池由系统维护，无需运营修改。" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-start gap-3 border-b border-border pb-5">
        <Button asChild aria-label="返回卡池列表" size="icon-sm" variant="ghost">
          <Link href="/console/pools" title="返回卡池列表">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <div className="text-xs font-semibold text-muted-foreground">卡池草稿</div>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">编辑“{campaign.name}”</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {context.project.name} / {context.environment.name}
          </p>
        </div>
      </header>

      <CampaignDraftForm
        action={updateCampaignDraft}
        initialValues={{
          effectiveFrom: toHongKongDateTimeInput(campaign.effectiveFrom),
          effectiveTo: campaign.effectiveTo
            ? toHongKongDateTimeInput(campaign.effectiveTo)
            : "",
          featuredItemId:
            campaign.featuredItems.find((item) => item.rarity === 5)?.id ?? "",
          name: campaign.name,
          versionId: campaign.id,
        }}
        itemOptions={itemOptions}
        mode="edit"
      />
    </div>
  );
}

function PageFailure({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>无法编辑卡池</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
