import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/console/:path*",
    "/admin/gacha/:path*",
    "/sandbox/:path*",
    "/recharge/:path*",
  ],
};
