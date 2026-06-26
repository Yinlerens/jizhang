import "server-only";

import { gatewayFetch } from "./client";

export type AuditLogQuery = {
  limit?: string;
  requestId?: string;
  userId?: string;
  method?: string;
  path?: string;
  route?: string;
  authResult?: string;
  status?: string;
  since?: string;
  until?: string;
};

export type AuditLogBase = {
  request_id: string;
  client_request_id: string | null;
  started_at: string;
  finished_at: string | null;
  duration_ms: number | null;
  method: string;
  path: string;
  raw_query: string;
  route: string | null;
  user_id: string | null;
  remote_ip: string | null;
  auth_result: string;
  response_status: number | null;
  error_code: string | null;
  error_message: string | null;
  audit_status: string;
};

export type AuditLogListItem = AuditLogBase & {
  request_body_size: number | null;
  request_body_truncated: boolean | null;
  request_body_preview: string;
  response_body_size: number | null;
  response_body_truncated: boolean | null;
  response_body_preview: string;
};

export type AuditLogDetail = AuditLogBase & {
  upstream_url: string | null;
  request_headers: Record<string, string[]> | null;
  request_body_text: string | null;
  request_body_base64: string | null;
  request_body_json: unknown | null;
  request_body_encoding: string | null;
  request_body_size: number | null;
  request_body_truncated: boolean | null;
  response_headers: Record<string, string[]> | null;
  response_body_text: string | null;
  response_body_base64: string | null;
  response_body_json: unknown | null;
  response_body_encoding: string | null;
  response_body_size: number | null;
  response_body_truncated: boolean | null;
};

type AuditLogListResponse = {
  data: AuditLogListItem[];
  meta: {
    count: number;
    limit: number;
  };
};

type AuditLogDetailResponse = {
  data: AuditLogDetail;
};

export async function listAuditLogs(accessToken: string, query: AuditLogQuery) {
  const params = auditLogSearchParams(query);
  const suffix = params.toString();
  const response = await gatewayFetch(
    `/api/v1/admin/audit/http-api-calls${suffix ? `?${suffix}` : ""}`,
    accessToken,
    { method: "GET" },
  );

  return (await response.json()) as AuditLogListResponse;
}

export async function getAuditLogDetail(accessToken: string, requestId: string) {
  const response = await gatewayFetch(
    `/api/v1/admin/audit/http-api-calls/${encodeURIComponent(requestId)}`,
    accessToken,
    { method: "GET" },
  );

  return ((await response.json()) as AuditLogDetailResponse).data;
}

function auditLogSearchParams(query: AuditLogQuery) {
  const params = new URLSearchParams();
  setParam(params, "limit", query.limit);
  setParam(params, "request_id", query.requestId);
  setParam(params, "user_id", query.userId);
  setParam(params, "method", query.method);
  setParam(params, "path", query.path);
  setParam(params, "route", query.route);
  setParam(params, "auth_result", query.authResult);
  setParam(params, "status", query.status);
  setParam(params, "since", query.since);
  setParam(params, "until", query.until);
  return params;
}

function setParam(params: URLSearchParams, key: string, value?: string) {
  const trimmed = value?.trim();
  if (trimmed) {
    params.set(key, trimmed);
  }
}
