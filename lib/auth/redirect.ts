export function sanitizeNextPath(value: string | null | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/console";
  }

  return value;
}

export function createLoginPath(nextPath: string) {
  return `/login?next=${encodeURIComponent(sanitizeNextPath(nextPath))}`;
}
