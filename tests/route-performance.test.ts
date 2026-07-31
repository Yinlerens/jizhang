import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("shares one locally verified Supabase authentication lookup per server request", () => {
  const server = read("../lib/supabase/server.ts");

  assert.match(server, /export const getAuthenticatedRequest = cache/);
  assert.match(server, /export const getAuthenticatedSession = cache/);
  assert.equal(count(server, /auth\.getClaims\(\)/g), 1);
  assert.equal(count(server, /auth\.getUser\(\)/g), 0);
});

test("refreshes Supabase cookies before rendering protected routes", () => {
  const rootProxy = read("../proxy.ts");
  const sessionProxy = read("../lib/supabase/proxy.ts");

  assert.match(rootProxy, /updateSession\(request\)/);
  assert.match(rootProxy, /"\/console\/:path\*"/);
  assert.match(rootProxy, /"\/admin\/gacha\/:path\*"/);
  assert.match(rootProxy, /"\/sandbox\/:path\*"/);
  assert.match(sessionProxy, /request\.cookies\.set/);
  assert.match(sessionProxy, /response\.cookies\.set/);
  assert.match(sessionProxy, /response\.headers\.set/);
  assert.match(sessionProxy, /auth\.getClaims\(\)/);
});

test("uses verified claims across legacy server-side auth entry points", () => {
  const contextActions = read("../lib/control-plane/context-actions.ts");
  const auditLogs = read("../app/admin/gacha/audit-logs/page.tsx");
  const rechargeActions = read("../app/recharge/actions.ts");
  const rechargePage = read("../app/recharge/page.tsx");
  const signout = read("../app/auth/signout/route.ts");
  const sources = [contextActions, auditLogs, rechargeActions, rechargePage, signout];

  sources.forEach((source) => assert.doesNotMatch(source, /auth\.getUser\(\)/));
  assert.match(contextActions, /getAuthenticatedRequest\(\)/);
  assert.match(auditLogs, /getAuthenticatedSession\(\)/);
  assert.match(rechargeActions, /getAuthenticatedSession\(\)/);
  assert.match(rechargePage, /getAuthenticatedSession\(\)/);
  assert.match(signout, /auth\.signOut\(\)/);
});

test("loads control-plane context and workspace options from one cached snapshot", () => {
  const access = read("../lib/control-plane/access.ts");

  assert.match(access, /const getControlPlaneWorkspaceSnapshot = cache/);
  assert.equal(count(access, /\.from\("organization_members"\)/g), 1);
  assert.match(access, /\.select\(CONTROL_WORKSPACE_SELECT\)/);
  assert.equal(count(access, /\.from\("organizations"\)/g), 0);
  assert.equal(count(access, /\.from\("projects"\)/g), 0);
  assert.equal(count(access, /\.from\("environments"\)/g), 0);
  assert.match(access, /getControlPlaneWorkspaceOptions[\s\S]*getControlPlaneWorkspaceSnapshot\(\)/);
});

test("does not block Sandbox navigation on optional Gateway state", () => {
  const page = read("../app/page.tsx");
  const lab = read("../app/SandboxTraceLab.tsx");
  const actions = read("../app/gacha/actions.ts");

  assert.doesNotMatch(page, /loadGatewayInitialState|getBackpackInventory|getGachaPity/);
  assert.match(actions, /export async function loadSandboxInitialState/);
  assert.match(lab, /loadSandboxInitialState/);
  assert.match(lab, /useEffect\(\(\) => \{[\s\S]*loadSandboxInitialState\(\)/);
});

test("loads the Sandbox catalog from the active release snapshot", () => {
  const page = read("../app/page.tsx");

  assert.match(page, /\.from\("environment_release_heads"\)/);
  assert.match(page, /release:releases!inner\(snapshot\)/);
  assert.match(page, /createSandboxCatalogFromReleaseSnapshot/);
  assert.equal(count(page, /\.from\("items"\)/g), 0);
  assert.equal(count(page, /\.from\("banners"\)/g), 0);
  assert.equal(count(page, /\.from\("banner_versions"\)/g), 0);
});

test("provides immediate loading feedback for slow dynamic route segments", () => {
  assert.match(read("../app/console/layout.tsx"), /<Suspense fallback=\{<ConsoleShellLoading/);
  assert.match(read("../app/admin/gacha/layout.tsx"), /<Suspense fallback=\{<ConsoleShellLoading/);
  assert.match(read("../app/console/loading.tsx"), /ConsolePageLoading/);
  assert.match(read("../app/admin/gacha/loading.tsx"), /ConsolePageLoading/);
  assert.match(read("../app/sandbox/loading.tsx"), /SandboxLoading/);
});

test("shows link-local feedback while a console navigation is pending", () => {
  const shell = read("../app/admin/gacha/AdminShell.tsx");

  assert.match(shell, /useLinkStatus/);
  assert.match(shell, /function NavigationPendingIndicator/);
  assert.match(shell, /正在打开页面/);
  assert.match(shell, /size-4/);
});

test("bounds Gateway waits so an unavailable service cannot hang a route indefinitely", () => {
  const client = read("../lib/gateway/client.ts");

  assert.match(client, /AbortSignal\.timeout/);
  assert.match(client, /gateway_timeout/);
});

test("keeps each legacy Gacha admin route in its own client module", () => {
  const routes = [
    "items",
    "banners",
    "rule-sets",
    "banner-versions",
    "banner-items",
    "rarity-rates",
    "featured-rules",
    "pity-rules",
  ];

  assert.equal(
    existsSync(new URL("../app/admin/gacha/GachaAdminPanels.tsx", import.meta.url)),
    false,
  );

  routes.forEach((route) => {
    const page = read(`../app/admin/gacha/${route}/page.tsx`);
    const panel = read(`../app/admin/gacha/panels/${route}.tsx`);

    assert.doesNotMatch(page, /GachaAdminPanels/);
    assert.match(page, new RegExp(`from "\\.\\./panels/${route}"`));

    routes
      .filter((candidate) => candidate !== route)
      .forEach((candidate) => {
        assert.doesNotMatch(panel, new RegExp(`\\.\\./${candidate}/actions`));
      });
  });

  const itemsPanel = read("../app/admin/gacha/panels/items.tsx");
  assert.match(itemsPanel, /export function ItemsAdminPanel/);
  assert.doesNotMatch(
    itemsPanel,
    /BannersAdminPanel|RuleSetsAdminPanel|BannerVersionsAdminPanel|BannerItemsAdminPanel|RarityRatesAdminPanel|FeaturedRulesAdminPanel|PityRulesAdminPanel/,
  );
});

function count(value: string, pattern: RegExp) {
  return value.match(pattern)?.length ?? 0;
}

function read(path: string) {
  return readFileSync(new URL(path, import.meta.url), "utf8");
}
