import type { GachaTraceAuditSnapshot } from "./gacha-run";

type GachaAuditDetailLike = {
  request_id: string;
  started_at: string;
  finished_at: string | null;
  duration_ms: number | null;
  upstream_url: string | null;
  response_status: number | null;
  error_code: string | null;
  error_message: string | null;
  request_body_json: unknown | null;
  response_body_json: unknown | null;
  request_headers?: unknown;
  response_headers?: unknown;
};

export function toGachaTraceAuditSnapshot(
  detail: GachaAuditDetailLike,
): GachaTraceAuditSnapshot {
  const response = asRecord(detail.response_body_json);
  const responseError = asRecord(response?.error);
  const errorCode =
    optionalString(detail.error_code) ??
    optionalString(responseError?.code) ??
    optionalString(response?.code);
  const errorMessage =
    optionalString(detail.error_message) ??
    optionalString(responseError?.message) ??
    optionalString(response?.message);

  return {
    requestId: detail.request_id,
    startedAt: detail.started_at,
    finishedAt: detail.finished_at,
    durationMs: detail.duration_ms,
    upstreamUrl: detail.upstream_url,
    responseStatus: detail.response_status,
    errorCode,
    errorMessage,
    requestBody: detail.request_body_json,
    responseBody: detail.response_body_json,
  };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
