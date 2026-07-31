export const CONTROL_ROLES = [
  "owner",
  "admin",
  "designer",
  "operator",
  "reviewer",
  "support",
  "viewer",
] as const;

export type ControlRole = (typeof CONTROL_ROLES)[number];

export const CONTROL_CAPABILITIES = [
  "console:view",
  "campaign:manage",
  "configuration:read",
  "configuration:write",
  "release:manage",
  "audit:view",
  "organization:manage",
] as const;

export type ControlCapability = (typeof CONTROL_CAPABILITIES)[number];

const roleCapabilities: Record<ControlRole, readonly ControlCapability[]> = {
  owner: CONTROL_CAPABILITIES,
  admin: CONTROL_CAPABILITIES,
  designer: ["console:view", "campaign:manage", "configuration:read", "configuration:write"],
  operator: ["console:view", "campaign:manage", "configuration:read", "release:manage", "audit:view"],
  reviewer: ["console:view", "configuration:read", "audit:view"],
  support: ["console:view", "configuration:read", "audit:view"],
  viewer: ["console:view", "configuration:read"],
};

export const controlRoleLabels: Record<ControlRole, string> = {
  owner: "所有者",
  admin: "管理员",
  designer: "数值设计",
  operator: "运营",
  reviewer: "审核",
  support: "支持",
  viewer: "只读",
};

export function isControlRole(value: unknown): value is ControlRole {
  return typeof value === "string" && CONTROL_ROLES.includes(value as ControlRole);
}

export function hasControlCapability(role: ControlRole, capability: ControlCapability) {
  return roleCapabilities[role].includes(capability);
}
