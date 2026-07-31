export const CAMPAIGN_TYPES = ["limited-character", "standard"] as const;

export type CampaignType = (typeof CAMPAIGN_TYPES)[number];
export type CampaignLifecycle = "draft" | "scheduled" | "active" | "ended" | "archived";

export type CampaignFeaturedItem = {
  id: string;
  imageUrl: string;
  name: string;
  rarity: 4 | 5;
};

export type CampaignItemOption = CampaignFeaturedItem & {
  subtitle: string;
};

export type CampaignSummary = {
  bannerId: string;
  bannerType: CampaignType;
  coverImageUrl: string;
  effectiveFrom: string;
  effectiveTo: string | null;
  featuredItems: CampaignFeaturedItem[];
  id: string;
  itemCount: number;
  lifecycle: CampaignLifecycle;
  name: string;
  notes: string;
  status: "draft" | "published" | "archived";
  version: number;
};

export type CampaignDraftRawInput = {
  effectiveFrom: unknown;
  effectiveTo: unknown;
  featuredItemId: unknown;
  name: unknown;
};

export type CampaignDraftInput = {
  effectiveFrom: string;
  effectiveTo: string;
  featuredItemId: string;
  name: string;
};

export type CampaignDraftValidation =
  | { ok: true; value: CampaignDraftInput }
  | { ok: false; message: string };

export type CampaignLifecycleSummary = {
  active: number;
  all: number;
  draft: number;
  ended: number;
  scheduled: number;
};

type CampaignSchedule = {
  status: "draft" | "published" | "archived";
  effectiveFrom: string;
  effectiveTo: string | null;
};

const ITEM_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,99}$/;
const LOCAL_DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const HONG_KONG_DATE_TIME_FORMAT = new Intl.DateTimeFormat("en-CA", {
  day: "2-digit",
  hour: "2-digit",
  hourCycle: "h23",
  minute: "2-digit",
  month: "2-digit",
  timeZone: "Asia/Hong_Kong",
  year: "numeric",
});

export function validateCampaignDraftInput(
  raw: CampaignDraftRawInput,
): CampaignDraftValidation {
  const name = normalizeText(raw.name);
  if (!name) {
    return { ok: false, message: "请输入卡池名称。" };
  }
  if (name.length > 120) {
    return { ok: false, message: "卡池名称不能超过 120 个字。" };
  }

  const effectiveFrom = parseHongKongDateTime(raw.effectiveFrom);
  const effectiveTo = parseHongKongDateTime(raw.effectiveTo);
  if (!effectiveFrom || !effectiveTo) {
    return { ok: false, message: "请选择完整的开始和结束时间。" };
  }
  if (new Date(effectiveTo).getTime() <= new Date(effectiveFrom).getTime()) {
    return { ok: false, message: "结束时间必须晚于开始时间。" };
  }

  const featuredItemId = normalizeItemId(raw.featuredItemId);
  if (!featuredItemId) return { ok: false, message: "请选择五星 UP 角色。" };

  return {
    ok: true,
    value: {
      effectiveFrom,
      effectiveTo,
      featuredItemId,
      name,
    },
  };
}

export function getCampaignLifecycle(
  campaign: CampaignSchedule,
  now = new Date(),
): CampaignLifecycle {
  if (campaign.status === "draft") return "draft";
  if (campaign.status === "archived") return "archived";

  const nowTime = now.getTime();
  if (nowTime < new Date(campaign.effectiveFrom).getTime()) return "scheduled";
  if (campaign.effectiveTo && nowTime >= new Date(campaign.effectiveTo).getTime()) {
    return "ended";
  }
  return "active";
}

export function toHongKongDateTimeInput(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const parts = new Map(
    HONG_KONG_DATE_TIME_FORMAT.formatToParts(date).map((part) => [part.type, part.value]),
  );
  return `${parts.get("year")}-${parts.get("month")}-${parts.get("day")}T${parts.get("hour")}:${parts.get("minute")}`;
}

export function createCampaignScheduleDefaults(now = new Date()) {
  const effectiveFrom = new Date(now);
  effectiveFrom.setUTCMinutes(0, 0, 0);
  if (effectiveFrom.getTime() <= now.getTime()) {
    effectiveFrom.setUTCHours(effectiveFrom.getUTCHours() + 1);
  }

  const effectiveTo = new Date(effectiveFrom);
  effectiveTo.setUTCDate(effectiveTo.getUTCDate() + 21);

  return {
    effectiveFrom: toHongKongDateTimeInput(effectiveFrom),
    effectiveTo: toHongKongDateTimeInput(effectiveTo),
  };
}

export function summarizeCampaigns(
  campaigns: readonly Pick<CampaignSummary, "lifecycle">[],
): CampaignLifecycleSummary {
  const summary: CampaignLifecycleSummary = {
    active: 0,
    all: campaigns.length,
    draft: 0,
    ended: 0,
    scheduled: 0,
  };

  for (const campaign of campaigns) {
    if (campaign.lifecycle === "archived" || campaign.lifecycle === "ended") {
      summary.ended += 1;
    } else {
      summary[campaign.lifecycle] += 1;
    }
  }

  return summary;
}

function normalizeItemId(value: unknown) {
  const itemId = normalizeText(value);
  return ITEM_ID_PATTERN.test(itemId) ? itemId : null;
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseHongKongDateTime(value: unknown) {
  const localValue = normalizeText(value);
  if (!LOCAL_DATE_TIME_PATTERN.test(localValue)) return null;

  const parsed = new Date(`${localValue}:00+08:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}
