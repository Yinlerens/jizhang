import Link from "next/link";
import { CheckCircle2, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { createControlPlaneAdminPageClient } from "@/lib/control-plane/admin";
import { listCampaigns } from "@/lib/control-plane/campaign-data";
import { hasControlCapability } from "@/lib/control-plane/roles";
import { CampaignBoard, type CurrentReleaseIndicator } from "./CampaignBoard";

export const dynamic = "force-dynamic";

type ReleaseRow = {
  id: string;
  published_at: string;
  release_number: number;
};

export default async function PoolsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const adminClient = await createControlPlaneAdminPageClient(
    "/console/pools",
    "configuration:read",
  );
  if (!adminClient.ok) {
    return <PageFailure message={adminClient.message} />;
  }

  const { context, supabase } = adminClient;
  let campaigns;
  let currentRelease: CurrentReleaseIndicator = null;

  try {
    const campaignsPromise = listCampaigns(
      supabase,
      context.project.id,
      context.environment.id,
    );
    const headPromise = supabase
      .schema("gacha")
      .from("environment_release_heads")
      .select("release_id")
      .eq("project_id", context.project.id)
      .eq("environment_id", context.environment.id)
      .maybeSingle();
    const [campaignRows, headResult] = await Promise.all([campaignsPromise, headPromise]);
    campaigns = campaignRows;

    if (headResult.error) {
      console.error("Current release head unavailable", headResult.error);
    } else if (headResult.data?.release_id) {
      const { data: releaseData, error: releaseError } = await supabase
        .schema("gacha")
        .from("releases")
        .select("id, release_number, published_at")
        .eq("project_id", context.project.id)
        .eq("environment_id", context.environment.id)
        .eq("id", headResult.data.release_id)
        .maybeSingle();
      if (releaseError) {
        console.error("Current release unavailable", releaseError);
      } else if (releaseData) {
        const release = releaseData as ReleaseRow;
        currentRelease = {
          publishedAt: release.published_at,
          releaseNumber: release.release_number,
        };
      }
    }
  } catch (error) {
    console.error("Campaign board unavailable", error);
    return <PageFailure message="卡池列表暂时不可用，请稍后刷新。" />;
  }

  const params = await searchParams;
  const notice = mutationNotice(params);
  const canManage = hasControlCapability(context.role, "campaign:manage");
  const canPublish = hasControlCapability(context.role, "release:manage");

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-semibold text-muted-foreground">日常操作</div>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">卡池管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {context.project.name} / {context.environment.name}
          </p>
        </div>
        {canManage ? (
          <Button asChild>
            <Link href="/console/pools/new">
              <Plus data-icon="inline-start" />
              新建卡池
            </Link>
          </Button>
        ) : null}
      </header>

      {notice ? (
        <Alert>
          <CheckCircle2 />
          <AlertTitle>{notice.title}</AlertTitle>
          <AlertDescription>{notice.description}</AlertDescription>
        </Alert>
      ) : null}

      <CampaignBoard
        campaigns={campaigns}
        canManage={canManage}
        canPublish={canPublish}
        currentRelease={currentRelease}
      />
    </div>
  );
}

function mutationNotice(params: Record<string, string | string[] | undefined>) {
  if (params.published === "1") {
    return { title: "卡池已发布", description: "新的环境版本已经生效。" };
  }
  if (params.created === "1") {
    return { title: "草稿已创建", description: "确认内容后即可从列表发布。" };
  }
  if (params.updated === "1") {
    return { title: "草稿已更新", description: "本次修改已经保存。" };
  }
  return null;
}

function PageFailure({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <AlertTitle>无法加载卡池管理</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
