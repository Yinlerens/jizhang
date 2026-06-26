export type RechargeTier = {
  id: string;
  amountMinor: number;
  priceLabel: string;
  title: string;
  badge?: string;
};

export const RECHARGE_TIERS: RechargeTier[] = [
  {
    id: "topup-60",
    amountMinor: 60,
    priceLabel: "¥6",
    title: "微光补给",
  },
  {
    id: "topup-300",
    amountMinor: 300,
    priceLabel: "¥30",
    title: "日常补给",
  },
  {
    id: "topup-980",
    amountMinor: 980,
    priceLabel: "¥98",
    title: "战术补给",
    badge: "常用",
  },
  {
    id: "topup-1980",
    amountMinor: 1980,
    priceLabel: "¥198",
    title: "深度补给",
  },
  {
    id: "topup-3280",
    amountMinor: 3280,
    priceLabel: "¥328",
    title: "高额补给",
  },
  {
    id: "topup-6480",
    amountMinor: 6480,
    priceLabel: "¥648",
    title: "满额补给",
    badge: "推荐",
  },
];

export function formatAssetAmount(value: number) {
  return value.toLocaleString("zh-CN");
}
