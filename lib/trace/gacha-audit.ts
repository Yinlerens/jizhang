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
  return {
    requestId: detail.request_id,
    startedAt: detail.started_at,
    finishedAt: detail.finished_at,
    durationMs: detail.duration_ms,
    upstreamUrl: detail.upstream_url,
    responseStatus: detail.response_status,
    errorCode: detail.error_code,
    errorMessage: detail.error_message,
    requestBody: detail.request_body_json,
    responseBody: detail.response_body_json,
  };
}
