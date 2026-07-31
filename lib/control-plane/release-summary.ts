type JsonRecord = Record<string, unknown>;

const RELEASE_COLLECTIONS: { key: string; identity: readonly string[] }[] = [
  { key: "items", identity: ["id"] },
  { key: "banners", identity: ["id"] },
  { key: "banner_versions", identity: ["id"] },
  { key: "banner_items", identity: ["banner_version_id", "item_id"] },
  { key: "rarity_rates", identity: ["banner_version_id", "rarity"] },
  { key: "featured_rules", identity: ["banner_version_id", "rarity", "featured_group"] },
  { key: "pity_rules", identity: ["banner_version_id", "rarity"] },
  { key: "rule_sets", identity: ["id"] },
  { key: "rule_set_rarity_rates", identity: ["rule_set_id", "rarity"] },
  {
    key: "rule_set_featured_rules",
    identity: ["rule_set_id", "rarity", "featured_group"],
  },
  { key: "rule_set_pity_rules", identity: ["rule_set_id", "rarity"] },
];

export type ReleaseSnapshotSummary = {
  items: number;
  banners: number;
  versions: number;
  ruleSets: number;
};

export type ReleaseSnapshotDiff = {
  added: number;
  removed: number;
  changed: number;
};

export function summarizeReleaseSnapshot(snapshot: unknown): ReleaseSnapshotSummary {
  const record = asRecord(snapshot);
  return {
    items: rows(record, "items").length,
    banners: rows(record, "banners").length,
    versions: rows(record, "banner_versions").length,
    ruleSets: rows(record, "rule_sets").length,
  };
}

export function diffReleaseSnapshots(before: unknown, after: unknown): ReleaseSnapshotDiff {
  const beforeRecord = asRecord(before);
  const afterRecord = asRecord(after);
  const result: ReleaseSnapshotDiff = { added: 0, removed: 0, changed: 0 };

  for (const collection of RELEASE_COLLECTIONS) {
    const beforeRows = indexRows(rows(beforeRecord, collection.key), collection.identity);
    const afterRows = indexRows(rows(afterRecord, collection.key), collection.identity);

    for (const [identity, afterRow] of afterRows) {
      const beforeRow = beforeRows.get(identity);
      if (!beforeRow) {
        result.added += 1;
      } else if (stableJson(beforeRow) !== stableJson(afterRow)) {
        result.changed += 1;
      }
    }

    for (const identity of beforeRows.keys()) {
      if (!afterRows.has(identity)) {
        result.removed += 1;
      }
    }
  }

  return result;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function rows(record: JsonRecord, key: string) {
  const value = record[key];
  return Array.isArray(value)
    ? value.filter((row): row is JsonRecord => Boolean(row) && typeof row === "object" && !Array.isArray(row))
    : [];
}

function indexRows(collection: JsonRecord[], identityFields: readonly string[]) {
  const indexed = new Map<string, JsonRecord>();
  for (const row of collection) {
    const identity = identityFields.map((field) => String(row[field] ?? "")).join("\u001f");
    indexed.set(identity, row);
  }
  return indexed;
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const record = value as JsonRecord;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}
