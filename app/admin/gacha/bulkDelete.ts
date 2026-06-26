import "server-only";

type FilterValue = string | number;
type FilterPair = [column: string, value: FilterValue];

const MAX_BULK_DELETE_COUNT = 100;

export function normalizeBulkTextValues(values: string[], label: string) {
  const normalized = [...new Set(values.map((value) => value.trim()).filter(Boolean))];

  if (normalized.length === 0) {
    throw new Error(`请选择要删除的${label}`);
  }

  if (normalized.length > MAX_BULK_DELETE_COUNT) {
    throw new Error(`一次最多删除 ${MAX_BULK_DELETE_COUNT} 条${label}`);
  }

  return normalized;
}

export function buildCompositeDeleteFilter(rows: FilterPair[][], label: string) {
  if (rows.length === 0) {
    throw new Error(`请选择要删除的${label}`);
  }

  if (rows.length > MAX_BULK_DELETE_COUNT) {
    throw new Error(`一次最多删除 ${MAX_BULK_DELETE_COUNT} 条${label}`);
  }

  const uniqueRows = [
    ...new Map(
      rows.map((pairs) => [
        pairs.map(([column, value]) => `${column}:${String(value)}`).join("|"),
        pairs,
      ]),
    ).values(),
  ];

  return uniqueRows
    .map((pairs) => {
      const filters = pairs
        .map(([column, value]) => `${column}.eq.${sanitizeFilterValue(value, label)}`)
        .join(",");

      return `and(${filters})`;
    })
    .join(",");
}

function sanitizeFilterValue(value: FilterValue, label: string) {
  if (typeof value === "number") {
    if (!Number.isInteger(value)) {
      throw new Error(`${label}包含非法数字`);
    }

    return String(value);
  }

  const normalized = value.trim();
  if (!normalized || normalized.length > 200 || /[(),]/.test(normalized)) {
    throw new Error(`${label}包含非法标识`);
  }

  return normalized;
}
