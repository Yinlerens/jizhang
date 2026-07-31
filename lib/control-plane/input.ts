import type { ControlRole } from "./roles";

const CONTROL_ROLE_VALUES = new Set<ControlRole>([
  "owner",
  "admin",
  "designer",
  "operator",
  "reviewer",
  "support",
  "viewer",
]);
const ENVIRONMENT_KINDS = new Set(["development", "staging", "production"] as const);
const MEMBER_STATUSES = new Set(["active", "suspended"] as const);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type EnvironmentKind = "development" | "staging" | "production";
export type MemberStatus = "active" | "suspended";

export function normalizeEmail(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const email = value.trim().toLowerCase();
  return email.length <= 320 && EMAIL_PATTERN.test(email) ? email : null;
}

export function parseControlRole(value: unknown): ControlRole | null {
  return typeof value === "string" && CONTROL_ROLE_VALUES.has(value as ControlRole)
    ? (value as ControlRole)
    : null;
}

export function parseEnvironmentKind(value: unknown): EnvironmentKind | null {
  return typeof value === "string" && ENVIRONMENT_KINDS.has(value as EnvironmentKind)
    ? (value as EnvironmentKind)
    : null;
}

export function parseMemberStatus(value: unknown): MemberStatus | null {
  return typeof value === "string" && MEMBER_STATUSES.has(value as MemberStatus)
    ? (value as MemberStatus)
    : null;
}

export function parseSlug(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const slug = value.trim();
  return SLUG_PATTERN.test(slug) ? slug : null;
}

export function parseUuid(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const uuid = value.trim().toLowerCase();
  return UUID_PATTERN.test(uuid) ? uuid : null;
}

export function parseDisplayName(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const name = value.trim();
  return name.length >= 1 && name.length <= 120 ? name : null;
}
