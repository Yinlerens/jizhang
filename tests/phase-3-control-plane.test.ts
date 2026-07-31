import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeEmail,
  parseControlRole,
  parseEnvironmentKind,
  parseSlug,
  parseUuid,
} from "../lib/control-plane/input.ts";
import {
  diffReleaseSnapshots,
  summarizeReleaseSnapshot,
} from "../lib/control-plane/release-summary.ts";

test("normalizes and validates organization member input", () => {
  const mixedCaseEmail = `  ${["Owner", "Example.COM"].join("@")} `;
  const normalizedEmail = ["owner", "example.com"].join("@");
  assert.equal(normalizeEmail(mixedCaseEmail), normalizedEmail);
  assert.equal(normalizeEmail("not-an-email"), null);
  assert.equal(parseControlRole("operator"), "operator");
  assert.equal(parseControlRole("super-admin"), null);
});

test("validates workspace identifiers without coercing invalid input", () => {
  assert.equal(parseSlug("live-ops-1"), "live-ops-1");
  assert.equal(parseSlug("Live Ops"), null);
  assert.equal(parseEnvironmentKind("production"), "production");
  assert.equal(parseEnvironmentKind("preview"), null);
  assert.equal(parseUuid("c3000000-c3c3-4c3c-8c3c-c3c3c3c3c3c3"),
    "c3000000-c3c3-4c3c-8c3c-c3c3c3c3c3c3");
  assert.equal(parseUuid("c3000000"), null);
});

test("summarizes a release snapshot for operators", () => {
  assert.deepEqual(
    summarizeReleaseSnapshot({
      items: [{ id: "item-1" }, { id: "item-2" }],
      banners: [{ id: "banner-1" }],
      banner_versions: [{ id: "version-1" }],
      rule_sets: [{ id: "rules-1" }],
    }),
    { items: 2, banners: 1, versions: 1, ruleSets: 1 },
  );
});

test("diffs release snapshots by stable row identity", () => {
  const before = {
    items: [
      { id: "item-1", name: "One" },
      { id: "item-2", name: "Two" },
    ],
    banners: [{ id: "banner-1", name: "Permanent" }],
    banner_versions: [{ id: "version-1", version: 1 }],
    rule_sets: [],
  };
  const after = {
    items: [
      { id: "item-1", name: "One updated" },
      { id: "item-3", name: "Three" },
    ],
    banners: [{ id: "banner-1", name: "Permanent" }],
    banner_versions: [
      { id: "version-1", version: 1 },
      { id: "version-2", version: 2 },
    ],
    rule_sets: [],
  };

  assert.deepEqual(diffReleaseSnapshots(before, after), {
    added: 2,
    removed: 1,
    changed: 1,
  });
});
