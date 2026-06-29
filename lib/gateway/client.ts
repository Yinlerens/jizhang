import "server-only";

type GatewayErrorBody = {
  error?: {
    code?: string;
    message?: string;
  };
  detail?: unknown;
};

const defaultGatewayBaseUrl = "https://api.makima.sbs";

export class GatewayFetchError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "GatewayFetchError";
  }
}

export async function gatewayFetch(path: string, accessToken: string, init: RequestInit) {
  let response: Response;
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);

  try {
    response = await fetch(`${getGatewayBaseUrl()}${path}`, {
      ...init,
      cache: "no-store",
      headers,
    });
  } catch {
    throw new Error("网关连接失败，请稍后重试或检查线上网关是否可用。");
  }

  if (!response.ok) {
    const error = await getGatewayError(response);
    throw new GatewayFetchError(error.message, response.status, error.code);
  }

  return response;
}

function getGatewayBaseUrl() {
  const value =
    process.env.GATEWAY_URL ?? process.env.NEXT_PUBLIC_GATEWAY_URL ?? defaultGatewayBaseUrl;
  return value.replace(/\/+$/, "");
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
