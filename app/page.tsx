import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import SandboxTraceLab from "./SandboxTraceLab";
import { createGachaAdminClientResult } from "@/app/admin/gacha/actionAuth";
import {
  createSandboxCatalogFromReleaseSnapshot,
  emptySandboxCatalog,
  type SandboxCatalog,
} from "@/lib/sandbox/release-catalog";
import { createLoginPath } from "@/lib/auth/redirect";

type ReleaseSnapshotRow = {
  snapshot: unknown;
};

type ReleaseHeadRow = {
  release: ReleaseSnapshotRow | ReleaseSnapshotRow[] | null;
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  redirect("/console");
}

export async function SandboxPage({
  initialOperationId,
  initialPlayerId,
}: {
  initialOperationId?: string;
  initialPlayerId?: string;
} = {}) {
  const adminClient = await createGachaAdminClientResult("configuration:read");
  if (!adminClient.ok && adminClient.reason === "unauthenticated") {
    const replayParams = new URLSearchParams();
    if (initialOperationId) {
      replayParams.set("operation_id", initialOperationId);
      if (initialPlayerId) {
        replayParams.set("player_id", initialPlayerId);
      }
    }
    const nextPath = replayParams.size ? `/sandbox?${replayParams}` : "/sandbox";
    redirect(createLoginPath(nextPath));
  }
  if (!adminClient.ok) {
    redirect("/console");
  }

  const catalog = await loadCatalog(
    adminClient.supabase,
    adminClient.context.project.id,
    adminClient.context.environment.id,
  );

  return (
    <SandboxTraceLab
      banners={catalog.banners}
      initialOperationId={initialOperationId}
      initialPlayerId={initialPlayerId}
    />
  );
}

async function loadCatalog(
  supabase: SupabaseClient,
  projectId: string,
  environmentId: string,
): Promise<SandboxCatalog> {
  try {
    const { data, error } = await supabase
      .schema("gacha")
      .from("environment_release_heads")
      .select("release:releases!inner(snapshot)")
      .eq("project_id", projectId)
      .eq("environment_id", environmentId)
      .maybeSingle();

    if (error || !data) {
      if (error) {
        console.error("Sandbox release snapshot unavailable", error);
      }
      return emptySandboxCatalog();
    }

    const releaseValue = (data as unknown as ReleaseHeadRow).release;
    const release = Array.isArray(releaseValue) ? releaseValue[0] : releaseValue;
    return createSandboxCatalogFromReleaseSnapshot(release?.snapshot);
  } catch (error) {
    console.error("Sandbox release snapshot load failed", error);
    return emptySandboxCatalog();
  }
}
