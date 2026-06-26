export type GachaRarity = 3 | 4 | 5;

export type GachaItemType = "character" | "weapon";

export type BannerType = "limited-character" | "standard";

export type PoolGroup = "standard" | "featured";

export type FeaturedGroup = "five_up" | "four_up";

export interface GachaItem {
  id: string;
  name: string;
  subtitle: string;
  rarity: GachaRarity;
  type: GachaItemType;
  element: string;
  role: string;
  faction: string;
  accent: string;
  quote: string;
  imageUrl?: string;
  profile?: string;
}

export interface BannerTheme {
  primary: string;
  secondary: string;
  glow: string;
}

export interface BannerPoolEntry {
  itemId: string;
  poolGroup: PoolGroup;
  featuredGroup: FeaturedGroup | null;
  weight: number;
  sortOrder: number;
}

export interface GachaRarityRule {
  rarity: GachaRarity;
  baseRatePpm: number;
  rollOrder: number;
  hardPity?: number;
  softPityStart?: number | null;
  softPityIncrementPpm: number;
  resetsLowerRarity: boolean;
}

export interface GachaFeaturedRule {
  rarity: 4 | 5;
  featuredGroup: FeaturedGroup;
  featuredRatePpm: number;
  guaranteeAfterMiss: boolean;
  missSetsGuarantee: boolean;
  guaranteeStateKey: string | null;
}

export interface Banner {
  id: string;
  name: string;
  shortName: string;
  type: BannerType;
  description: string;
  coverImageUrl?: string;
  backgroundImageUrl?: string;
  mobileBackgroundImageUrl?: string;
  backgroundPosition?: string;
  endsAt: string;
  featuredFiveId?: string;
  featuredFourIds: string[];
  itemPool: string[];
  poolEntries: BannerPoolEntry[];
  rarityRules: GachaRarityRule[];
  featuredRules: GachaFeaturedRule[];
  theme: BannerTheme;
}

export interface PityState {
  sinceFive: number;
  sinceFour: number;
  guaranteedFeaturedFive: boolean;
  guarantees: Record<string, boolean>;
}

export interface PullRecord {
  id: string;
  itemId: string;
  itemName: string;
  itemType: GachaItemType;
  rarity: GachaRarity;
  bannerId: string;
  bannerName: string;
  at: string;
  pityAtFive: number;
  pityAtFour: number;
  isFeatured: boolean;
}

export interface GachaCurrency {
  tides: number;
  astrite: number;
}

export interface StoredGachaState {
  currencies: GachaCurrency;
  history: PullRecord[];
  inventory: Record<string, number>;
  pity: Record<string, PityState>;
}
