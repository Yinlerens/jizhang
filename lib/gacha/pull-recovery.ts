export type PullFailureIdentity = {
  code?: string;
  httpStatus?: number;
};

const uncertainFailureCodes = new Set([
  "asset_refund_unavailable",
  "gateway_connection_failed",
  "gateway_timeout",
  "gacha_config_unavailable",
  "kafka_unavailable",
  "pull_in_progress",
  "redis_unavailable",
  "state_store_unavailable",
  "upstream_unavailable",
]);

const terminalFailureCodes = new Set([
  "banner_not_found",
  "idempotency_conflict",
  "insufficient_assets",
  "invalid_banner_id",
  "invalid_idempotency_key",
  "invalid_pull_count",
  "next_auth_missing",
  "pity_version_conflict",
  "pull_operation_not_found",
  "pull_refunded",
]);

export function shouldPreservePullOperation({ code, httpStatus }: PullFailureIdentity) {
  if (code && terminalFailureCodes.has(code)) {
    return false;
  }
  if (code && uncertainFailureCodes.has(code)) {
    return true;
  }
  if (httpStatus === undefined || httpStatus === 0 || httpStatus >= 500) {
    return true;
  }
  return false;
}

export function shouldPreservePullRecoveryLookup({ code }: PullFailureIdentity) {
  return code !== "pull_operation_not_found";
}
