export type PlayerCaseTone = "success" | "info" | "warning" | "danger" | "neutral";

export type PlayerCaseSummary = {
  code: "no_activity" | "processing" | "delivery_pending" | "refund_pending" | "failed" | "completed" | "partial";
  label: string;
  detail: string;
  tone: PlayerCaseTone;
};

type LatestOperation = {
  status: "processing" | "event_pending" | "event_published" | "succeeded" | "refund_pending" | "failed";
  event_id: string | null;
  error: { code: string; message: string } | null;
};

export function summarizePlayerCase({
  deliveredEventIds,
  latestOperation,
  partial,
}: {
  deliveredEventIds: ReadonlySet<string>;
  latestOperation: LatestOperation | null;
  partial: boolean;
}): PlayerCaseSummary {
  if (!latestOperation) {
    return partial
      ? {
          code: "partial",
          label: "数据不完整",
          detail: "部分服务暂时不可用，当前没有足够证据判断玩家状态。",
          tone: "warning",
        }
      : {
          code: "no_activity",
          label: "暂无抽卡记录",
          detail: "该玩家当前没有可核对的抽卡操作。",
          tone: "neutral",
        };
  }

  if (latestOperation.status === "processing") {
    return {
      code: "processing",
      label: "抽卡处理中",
      detail: "服务端操作尚未结束，恢复任务会继续处理。",
      tone: "info",
    };
  }

  if (latestOperation.status === "refund_pending") {
    return {
      code: "refund_pending",
      label: "退款处理中",
      detail: latestOperation.error?.message ?? "抽卡未完成，资产补偿正在处理。",
      tone: "warning",
    };
  }

  if (latestOperation.status === "failed") {
    return {
      code: "failed",
      label: "抽卡失败",
      detail: latestOperation.error?.message ?? "本次抽卡已失败。",
      tone: "danger",
    };
  }

  if (
    latestOperation.status === "succeeded" ||
    (latestOperation.event_id && deliveredEventIds.has(latestOperation.event_id))
  ) {
    return {
      code: "completed",
      label: "已完成",
      detail: "抽卡结果与背包奖励均已确认。",
      tone: "success",
    };
  }

  return {
    code: "delivery_pending",
    label: "奖励同步中",
    detail: "抽卡结果已生成，背包尚未确认收到奖励。",
    tone: "warning",
  };
}
