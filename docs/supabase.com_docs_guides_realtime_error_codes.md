---
url: "https://supabase.com/docs/guides/realtime/error_codes"
title: "Operational Error Codes | Supabase Docs"
---

[![Supabase wordmark](https://supabase.com/docs/supabase-dark.svg)![Supabase wordmark](https://supabase.com/docs/supabase-light.svg)DOCS](https://supabase.com/docs)

- [Start](https://supabase.com/docs/guides/getting-started)
- Products
- Build
- Manage
- Reference
- Resources

[![Supabase wordmark](https://supabase.com/docs/supabase-dark.svg)![Supabase wordmark](https://supabase.com/docs/supabase-light.svg)DOCS](https://supabase.com/docs)

Search docs...

K

[Sign up](https://supabase.com/dashboard)

Main menu

[Realtime](https://supabase.com/docs/guides/realtime)

[Overview](https://supabase.com/docs/guides/realtime)

[Getting Started](https://supabase.com/docs/guides/realtime/getting_started)

Usage[Broadcast](https://supabase.com/docs/guides/realtime/broadcast)
[Presence](https://supabase.com/docs/guides/realtime/presence)
[Postgres Changes](https://supabase.com/docs/guides/realtime/postgres-changes)
[Settings](https://supabase.com/docs/guides/realtime/settings)

Security[Authorization](https://supabase.com/docs/guides/realtime/authorization)

Guides[Subscribing to Database Changes](https://supabase.com/docs/guides/realtime/subscribing-to-database-changes)
[Using Realtime with Next.js](https://supabase.com/docs/guides/realtime/realtime-with-nextjs)
[Using Realtime Presence with Flutter](https://supabase.com/docs/guides/realtime/realtime-user-presence)
[Listening to Postgres Changes with Flutter](https://supabase.com/docs/guides/realtime/realtime-listening-flutter)

Deep dive[Quotas](https://supabase.com/docs/guides/realtime/quotas)
[Pricing](https://supabase.com/docs/guides/realtime/pricing)
[Architecture](https://supabase.com/docs/guides/realtime/architecture)
[Concepts](https://supabase.com/docs/guides/realtime/concepts)
[Protocol](https://supabase.com/docs/guides/realtime/protocol)
[Benchmarks](https://supabase.com/docs/guides/realtime/benchmarks)

Debugging[Operational Error Codes](https://supabase.com/docs/guides/realtime/error_codes)
[Troubleshooting](https://supabase.com/docs/guides/realtime/troubleshooting)

[![Supabase wordmark](https://supabase.com/docs/supabase-dark.svg)![Supabase wordmark](https://supabase.com/docs/supabase-light.svg)DOCS](https://supabase.com/docs)

- [Start](https://supabase.com/docs/guides/getting-started)
- Products
- Build
- Manage
- Reference
- Resources

[![Supabase wordmark](https://supabase.com/docs/supabase-dark.svg)![Supabase wordmark](https://supabase.com/docs/supabase-light.svg)DOCS](https://supabase.com/docs)

Search docs...

K

[Sign up](https://supabase.com/dashboard)

Realtime

1. [Realtime](https://supabase.com/docs/guides/realtime)
3. Debugging
5. [Operational Error Codes](https://supabase.com/docs/guides/realtime/error_codes)

# Operational Error Codes

## List of operational codes to help understand your deployment and usage.

* * *

| Error code | Description | Action |
| --- | --- | --- |
| `ChannelRateLimitReached` | The number of channels you can create has reached its limit. |  |
| `ClientJoinRateLimitReached` | The rate of joins per second from your clients has reached the channel limits. |  |
| `ConnectionInitializing` | Database is initializing connection. |  |
| `ConnectionRateLimitReached` | The number of connected clients has reached its limit. |  |
| `DatabaseConnectionIssue` | Database had connection issues and connection was not able to be established. |  |
| `DatabaseLackOfConnections` | Realtime was not able to connect to the tenant's database due to not having enough available connections.<br>Learn more:<br>- [Connection management guide](https://supabase.com/docs/guides/database/connection-management) | Verify your database connection limits. |
| `ErrorAuthorizingWebsocket` | Error when trying to authorize the WebSocket connection. | Verify user information on connect. |
| `ErrorConnectingToWebsocket` | Error when trying to connect to the WebSocket server. | Verify user information on connect. |
| `ErrorExecutingTransaction` | Error executing a database transaction in tenant database. |  |
| `ErrorOnRpcCall` | Error when calling another realtime node. |  |
| `ErrorStartingPostgresCDC` | Error when starting the Postgres CDC extension which is used for Postgres Changes. |  |
| `ErrorStartingPostgresCDCStream` | Error when starting the Postgres CDC stream which is used for Postgres Changes. |  |
| `IncreaseConnectionPool` | The number of connections you have set for Realtime are not enough to handle your current use case. |  |
| `InitializingProjectConnection` | Connection against Tenant database is still starting. |  |
| `InvalidJWTExpiration` | JWT exp claim value it's incorrect. |  |
| `JanitorFailedToDeleteOldMessages` | Scheduled task for realtime.message cleanup was unable to run. |  |
| `JwtSignatureError` | JWT signature was not able to be validated. |  |
| `MalformedJWT` | Token received does not comply with the JWT format. |  |
| `MigrationCheckFailed` | Check to see if we require to run migrations fails. |  |
| `MigrationsFailedToRun` | Error when running the migrations against the Tenant database that are required by Realtime. |  |
| `PartitionCreationFailed` | Error when creating partitions for realtime.messages. |  |
| `PoolingReplicationError` | Error when pooling the replication slot. |  |
| `PoolingReplicationPreparationError` | Error when preparing the replication slot. |  |
| `RealtimeDisabledForConfiguration` | The configuration provided to Realtime on connect will not be able to provide you any Postgres Changes. | Verify your configuration on channel startup as you might not have your tables properly registered. |
| `RealtimeDisabledForTenant` | Realtime has been disabled for the tenant. |  |
| `RealtimeNodeDisconnected` | Realtime is a distributed application and this means that one the system is unable to communicate with one of the distributed nodes. |  |
| `RealtimeRestarting` | Realtime is currently restarting. |  |
| `ReconnectSubscribeToPostgres` | Postgres changes still waiting to be subscribed. |  |
| `ReplicationMaxWalSendersReached` | Maximum number of WAL senders reached in tenant database.<br>Learn more:<br>- [Configuring max WAL senders](https://supabase.com/docs/guides/database/custom-postgres-config#cli-configurable-settings) |  |
| `ReplicationSlotBeingUsed` | The replication slot is being used by another transaction. |  |
| `RlsPolicyError` | Error on RLS policy used for authorization. |  |
| `StartListenAndReplicationFailed` | Error when starting the replication and listening of errors for database broadcasting. |  |
| `SubscriptionDeletionFailed` | Error when trying to delete a subscription for postgres changes. |  |
| `SynInitializationError` | Our framework to syncronize processes has failed to properly startup a connection to the database. |  |
| `TableHasSpacesInName` | The table you are trying to listen to has spaces in its name which we are unable to support. | Change the table name to not have spaces in it. |
| `TenantNotFound` | The tenant you are trying to connect to does not exist. | Verify the tenant name you are trying to connect to exists in the realtime.tenants table. |
| `TimeoutOnRpcCall` | RPC request within the Realtime server has timed out. |  |
| `TopicNameRequired` | You are trying to use Realtime without a topic name set. |  |
| `UnableCheckoutConnection` | Error when trying to checkout a connection from the tenant pool. |  |
| `UnableToCheckProcessesOnRemoteNode` | Error when trying to check the processes on a remote node. |  |
| `UnableToConnectToProject` | Unable to connect to Project database. |  |
| `UnableToConnectToTenantDatabase` | Realtime was not able to connect to the tenant's database. |  |
| `UnableToCreateCounter` | Error when trying to create a counter to track rate limits for a tenant. |  |
| `UnableToDecrementCounter` | Error when trying to decrement a counter to track rate limits for a tenant. |  |
| `UnableToDeletePhantomSubscriptions` | Error when trying to delete subscriptions that are no longer being used. |  |
| `UnableToDeleteTenant` | Error when trying to delete a tenant. |  |
| `UnableToEncodeJson` | An error were we are not handling correctly the response to be sent to the end user. |  |
| `UnableToFindCounter` | Error when trying to find a counter to track rate limits for a tenant. |  |
| `UnableToIncrementCounter` | Error when trying to increment a counter to track rate limits for a tenant. |  |
| `UnableToListenToTenantDatabase` | Unable to LISTEN for notifications against the Tenant Database. |  |
| `UnableToProcessListenPayload` | Payload sent in NOTIFY operation was JSON parsable. |  |
| `UnableToSetPolicies` | Error when setting up Authorization Policies. |  |
| `UnableToSubscribeToPostgres` | Error when trying to subscribe to Postgres changes. |  |
| `UnableToTrackPresence` | Error when handling track presence for this socket. |  |
| `UnableToUpdateCounter` | Error when trying to update a counter to track rate limits for a tenant. |  |
| `Unauthorized` | Unauthorized access to Realtime channel. |  |
| `UnhandledProcessMessage` | Unhandled message received by a Realtime process. |  |
| `UnknownDataProcessed` | An unknown data type was processed by the Realtime system. |  |
| `UnknownErrorOnChannel` | An error we are not handling correctly was triggered on a channel. |  |
| `UnknownErrorOnController` | An error we are not handling correctly was triggered on a controller. |  |
| `UnknownPresenceEvent` | Presence event type not recognized by service. |  |
| `UnprocessableEntity` | Received a HTTP request with a body that was not able to be processed by the endpoint. |  |

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/realtime/error_codes.mdx)

### Is this helpful?

NoYes

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)