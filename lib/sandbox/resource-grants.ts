export type ResourceGrantPreset = {
  id: string;
  amountMinor: number;
  title: string;
  badge?: string;
};

export const SANDBOX_RESOURCE_GRANTS: ResourceGrantPreset[] = [
  {
    id: "single-pull-check",
    amountMinor: 160,
    title: "单次抽取验证",
  },
  {
    id: "ten-pull-check",
    amountMinor: 1600,
    title: "十次抽取验证",
    badge: "常用",
  },
  {
    id: "session-check",
    amountMinor: 8000,
    title: "完整会话验证",
  },
  {
    id: "stress-check",
    amountMinor: 16000,
    title: "长周期压力验证",
  },
];

export function formatAssetAmount(value: number) {
  return value.toLocaleString("zh-CN");
}
