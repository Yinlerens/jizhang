"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Pencil,
  Plus,
  RadioTower,
  Rocket,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  summarizeCampaigns,
  type CampaignFeaturedItem,
  type CampaignLifecycle,
  type CampaignSummary,
} from "@/lib/control-plane/campaign";
import { PublishCampaignForm } from "./PublishCampaignForm";

type CampaignFilter = "all" | "draft" | "scheduled" | "active" | "ended";

const CAMPAIGN_FILTERS: { label: string; value: CampaignFilter }[] = [
  { label: "全部", value: "all" },
  { label: "草稿", value: "draft" },
  { label: "待开始", value: "scheduled" },
  { label: "进行中", value: "active" },
  { label: "已结束", value: "ended" },
];

export type CurrentReleaseIndicator = {
  publishedAt: string;
  releaseNumber: number;
} | null;

export function CampaignBoard({
  campaigns,
  canManage,
  canPublish,
  currentRelease,
}: {
  campaigns: CampaignSummary[];
  canManage: boolean;
  canPublish: boolean;
  currentRelease: CurrentReleaseIndicator;
}) {
  const [filter, setFilter] = useState<CampaignFilter>("all");
  const summary = summarizeCampaigns(campaigns);
  const visibleCampaigns = campaigns.filter((campaign) =>
    campaignMatchesFilter(campaign.lifecycle, filter),
  );

  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-2 border-y border-border bg-card lg:grid-cols-5">
        <Metric label="草稿" value={summary.draft} />
        <Metric label="待开始" value={summary.scheduled} />
        <Metric label="进行中" value={summary.active} />
        <Metric label="已结束" value={summary.ended} />
        <div className="col-span-2 flex min-h-20 items-center gap-3 border-t border-border px-4 py-3 lg:col-span-1 lg:border-t-0 lg:border-l">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <RadioTower aria-hidden="true" className="size-4" />
          </span>
          <div className="min-w-0">
            <dt className="text-xs text-muted-foreground">当前发布</dt>
            <dd className="truncate text-sm font-semibold text-foreground">
              {currentRelease ? `#${currentRelease.releaseNumber}` : "尚未发布"}
            </dd>
            {currentRelease ? (
              <div className="text-xs text-muted-foreground">
                {formatDateTime(currentRelease.publishedAt)}
              </div>
            ) : null}
          </div>
        </div>
      </dl>

      <Tabs
        className="flex-col"
        onValueChange={(value) => setFilter(value as CampaignFilter)}
        value={filter}
      >
        <TabsList className="w-full justify-start overflow-x-auto" variant="line">
          {CAMPAIGN_FILTERS.map((campaignFilter) => (
            <TabsTrigger key={campaignFilter.value} value={campaignFilter.value}>
              {campaignFilter.label}
              <span className="hidden tabular-nums text-muted-foreground sm:inline">
                {summary[campaignFilter.value]}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={filter}>
          {visibleCampaigns.length > 0 ? (
            <section className="border-y border-border bg-card">
              <div className="divide-y divide-border">
                {visibleCampaigns.map((campaign) => (
                  <CampaignRow
                    campaign={campaign}
                    canManage={canManage}
                    canPublish={canPublish}
                    key={campaign.id}
                  />
                ))}
              </div>
            </section>
          ) : (
            <Empty className="min-h-64 border-y border-border bg-card">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CalendarRange />
                </EmptyMedia>
                <EmptyTitle>{filter === "all" ? "还没有卡池" : "当前状态没有卡池"}</EmptyTitle>
                <EmptyDescription>
                  {filter === "all" ? "创建第一份草稿后，它会出现在这里。" : "切换状态查看其他卡池。"}
                </EmptyDescription>
              </EmptyHeader>
              {filter === "all" && canManage ? (
                <EmptyContent>
                  <Button asChild>
                    <Link href="/console/pools/new">
                      <Plus data-icon="inline-start" />
                      新建卡池
                    </Link>
                  </Button>
                </EmptyContent>
              ) : null}
            </Empty>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CampaignRow({
  campaign,
  canManage,
  canPublish,
}: {
  campaign: CampaignSummary;
  canManage: boolean;
  canPublish: boolean;
}) {
  return (
    <article className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 px-4 py-4 lg:grid-cols-[72px_minmax(0,1fr)_230px_170px] lg:items-center lg:px-5">
      <CampaignArtwork campaign={campaign} />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="truncate text-base font-semibold text-foreground">{campaign.name}</h2>
          <LifecycleBadge lifecycle={campaign.lifecycle} />
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {campaign.bannerType === "limited-character" ? "角色限定" : "常驻卡池"}
        </div>
        <FeaturedItems campaign={campaign} />
      </div>

      <div className="col-span-2 flex items-start gap-2 text-sm text-muted-foreground lg:col-span-1">
        <CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <div>
          <div className="font-medium text-foreground">{formatDateTime(campaign.effectiveFrom)}</div>
          <div className="mt-0.5 text-xs">至 {formatDateTime(campaign.effectiveTo)}</div>
        </div>
      </div>

      <div className="col-span-2 flex min-h-9 items-center justify-end gap-2 lg:col-span-1">
        {campaign.lifecycle === "draft" && canManage ? (
          <Button asChild size="sm" variant="outline">
            <Link href={`/console/pools/${campaign.id}`}>
              <Pencil data-icon="inline-start" />
              编辑
            </Link>
          </Button>
        ) : null}
        {campaign.lifecycle === "draft" && canPublish ? (
          <PublishCampaignForm campaignName={campaign.name} versionId={campaign.id} />
        ) : null}
        {campaign.lifecycle !== "draft" ? (
          <span className="text-xs text-muted-foreground">已锁定</span>
        ) : null}
      </div>
    </article>
  );
}

function FeaturedItems({ campaign }: { campaign: CampaignSummary }) {
  if (campaign.featuredItems.length === 0) {
    return <div className="mt-3 text-xs text-muted-foreground">常驻内容</div>;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {campaign.featuredItems.slice(0, 4).map((item) => (
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground" key={item.id}>
          <FeaturedArtwork item={item} />
          <span className="max-w-24 truncate">{item.name}</span>
          <span aria-label={`${item.rarity}星`} className="tabular-nums">
            {item.rarity}★
          </span>
        </span>
      ))}
    </div>
  );
}

function CampaignArtwork({ campaign }: { campaign: CampaignSummary }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = campaign.coverImageUrl || campaign.featuredItems[0]?.imageUrl || "";

  return (
    <div className="flex size-16 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground lg:size-18">
      {imageUrl && !failed ? (
        // Remote content-library hosts are configured by operators at runtime.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className="size-full object-cover"
          onError={() => setFailed(true)}
          src={imageUrl}
        />
      ) : (
        <CalendarRange aria-hidden="true" />
      )}
    </div>
  );
}

function FeaturedArtwork({ item }: { item: CampaignFeaturedItem }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex size-7 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground">
      {item.imageUrl && !failed ? (
        // Remote content-library hosts are configured by operators at runtime.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className="size-full object-cover"
          onError={() => setFailed(true)}
          src={item.imageUrl}
        />
      ) : (
        <Star aria-hidden="true" className="size-3.5" />
      )}
    </span>
  );
}

function LifecycleBadge({ lifecycle }: { lifecycle: CampaignLifecycle }) {
  const details = lifecycleDetails(lifecycle);
  const Icon = details.icon;
  return (
    <Badge variant={details.variant}>
      <Icon data-icon="inline-start" />
      {details.label}
    </Badge>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-h-20 flex-col justify-center border-r border-border px-4 py-3 even:border-r-0 lg:even:border-r lg:last:border-r-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{value}</dd>
    </div>
  );
}

function campaignMatchesFilter(lifecycle: CampaignLifecycle, filter: CampaignFilter) {
  if (filter === "all") return true;
  if (filter === "ended") return lifecycle === "ended" || lifecycle === "archived";
  return lifecycle === filter;
}

function lifecycleDetails(lifecycle: CampaignLifecycle) {
  switch (lifecycle) {
    case "draft":
      return { icon: CircleDashed, label: "草稿", variant: "secondary" as const };
    case "scheduled":
      return { icon: Clock3, label: "待开始", variant: "outline" as const };
    case "active":
      return { icon: Rocket, label: "进行中", variant: "default" as const };
    case "ended":
      return { icon: CheckCircle2, label: "已结束", variant: "ghost" as const };
    case "archived":
      return { icon: Archive, label: "已归档", variant: "ghost" as const };
  }
}

function formatDateTime(value: string | null) {
  if (!value) return "长期开放";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "时间待确认";
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Hong_Kong",
  }).format(date);
}
