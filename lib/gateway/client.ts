import "server-only";

import { randomUUID } from "node:crypto";

type GatewayErrorBody = {
  error?: {
    code?: string;
    message?: string;
  };
  detail?: unknown;
};

const defaultGatewayBaseUrl = "https://api.makima.sbs";
const defaultGatewayTimeoutMs = 8_000;

export class GatewayFetchError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly requestId?: string,
  ) {
    super(formatGatewayErrorMessage(message, status, requestId));
    this.name = "GatewayFetchError";
  }
}

export async function gatewayFetch(path: string, accessToken: string, init: RequestInit) {
  let response: Response;
  const headers = new Headers(init.headers);
  const requestId = headers.get("X-Request-Id") ?? randomUUID();
  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("X-Request-Id", requestId);
  const timeoutSignal = AbortSignal.timeout(getGatewayTimeoutMs());
  const signal = init.signal ?? timeoutSignal;

  try {
    response = await fetch(`${getGatewayBaseUrl()}${path}`, {
      ...init,
      cache: "no-store",
      headers,
      signal,
    });
  } catch {
    const timedOut = signal === timeoutSignal && timeoutSignal.aborted;
    throw new GatewayFetchError(
      timedOut
        ? "网关响应超时，请稍后重试。"
        : "网关连接失败，请稍后重试或检查线上网关是否可用。",
      0,
      timedOut ? "gateway_timeout" : "gateway_connection_failed",
      requestId,
    );
  }

  if (!response.ok) {
    const error = await getGatewayError(response);
    throw new GatewayFetchError(
      error.message,
      response.status,
      error.code,
      response.headers.get("X-Request-Id") ?? requestId,
    );
  }

  return response;
}

function getGatewayBaseUrl() {
  const value =
    process.env.GATEWAY_URL ?? process.env.NEXT_PUBLIC_GATEWAY_URL ?? defaultGatewayBaseUrl;
  return value.replace(/\/+$/, "");
}

function getGatewayTimeoutMs() {
  const configured = Number(process.env.GATEWAY_TIMEOUT_MS);
  if (!Number.isFinite(configured)) {
    return defaultGatewayTimeoutMs;
  }
  return Math.max(1_000, Math.min(60_000, Math.round(configured)));
}

function formatGatewayErrorMessage(message: string, status: number, requestId?: string) {
  if (!requestId || (status > 0 && status < 500)) {
    return message;
  }
  return `${message}（请求编号：${requestId}）`;
}

async function getGatewayError(response: Response) {
  let body: GatewayErrorBody | undefined;

  try {
    body = (await response.json()) as GatewayErrorBody;
  } catch {
    return { message: `网关请求失败（HTTP ${response.status}）` };
  }

  if (body?.error?.message) {
    return {
      code: body.error.code,
      message: body.error.message,
    };
  }

  if (Array.isArray(body?.detail)) {
    return { message: "请求参数不合法，请检查后重试。" };
  }

  return {
    code: body?.error?.code,
    message: body?.error?.code ?? `网关请求失败（HTTP ${response.status}）`,
  };
}
