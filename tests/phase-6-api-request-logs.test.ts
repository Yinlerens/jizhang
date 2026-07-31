import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("exposes API request records as an operational console page", () => {
  const navigation = read("../app/admin/gacha/AdminShell.tsx");
  const page = read("../app/admin/gacha/audit-logs/page.tsx");

  assert.match(navigation, /href: "\/admin\/gacha\/audit-logs"/);
  assert.match(navigation, /label: "API 请求记录"/);
  assert.doesNotMatch(page, /retireConfigurationPage/);
  assert.doesNotMatch(page, /redirect\("\/console\/pools"\)/);
  assert.match(page, /listAuditLogs\(session\.access_token, query\)/);
  assert.match(page, /getAuditLogDetail\(session\.access_token, selectedRequestId\)/);
  assert.match(page, /label="方法"/);
  assert.match(page, /label="状态码"/);
  assert.match(page, /label="请求 ID"/);
  assert.match(page, /请求体/);
  assert.match(page, /响应体/);
});

test("keeps API request records authenticated and server-only", () => {
  const layout = read("../app/admin/gacha/audit-logs/layout.tsx");
  const page = read("../app/admin/gacha/audit-logs/page.tsx");
  const gateway = read("../lib/gateway/audit.ts");

  assert.match(layout, /getControlPlaneAccess\("audit:view"\)/);
  assert.match(page, /getAuthenticatedSession\(\)/);
  assert.doesNotMatch(page, /supabase\.auth\.getUser\(\)/);
  assert.match(page, /session\?\.access_token/);
  assert.match(gateway, /import "server-only"/);
  assert.match(gateway, /\/api\/v1\/admin\/audit\/http-api-calls/);
  assert.doesNotMatch(gateway, /NEXT_PUBLIC/);
});

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
