import { SandboxPage } from "../page";

export const dynamic = "force-dynamic";

type SandboxRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SandboxRoute({ searchParams }: SandboxRouteProps) {
  const params = (await searchParams) ?? {};
  const operationIdValue = params.operation_id;
  const operationId = Array.isArray(operationIdValue) ? operationIdValue[0] : operationIdValue;
  const playerIdValue = params.player_id;
  const playerId = Array.isArray(playerIdValue) ? playerIdValue[0] : playerIdValue;
  const initialOperationId = isUuidLike(operationId) ? operationId : undefined;
  const initialPlayerId = isUuidLike(playerId) ? playerId : undefined;

  return (
    <SandboxPage
      initialOperationId={initialOperationId}
      initialPlayerId={initialPlayerId}
    />
  );
}

function isUuidLike(value: string | undefined) {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      ),
  );
}
