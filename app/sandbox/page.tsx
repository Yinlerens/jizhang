import { SandboxPage } from "../page";

export const dynamic = "force-dynamic";

type SandboxRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SandboxRoute({ searchParams }: SandboxRouteProps) {
  const params = (await searchParams) ?? {};
  const requestIdValue = params.request_id;
  const requestId = Array.isArray(requestIdValue) ? requestIdValue[0] : requestIdValue;
  const initialRequestId = isUuidLike(requestId) ? requestId : undefined;

  return <SandboxPage initialRequestId={initialRequestId} />;
}

function isUuidLike(value: string | undefined) {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      ),
  );
}
