---
url: "https://supabase.com/docs/guides/realtime/quotas"
title: "Realtime Quotas | Supabase Docs"
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
3. Deep dive
5. [Quotas](https://supabase.com/docs/guides/realtime/quotas)

# Realtime Quotas

* * *

Our cluster supports millions of concurrent connections and message throughput for production workloads.

Upgrade your plan to increase your quotas. Without a spend cap, or on an Enterprise plan, some quotas are still in place to protect budgets. All quotas are configurable per project. [Contact support](https://supabase.com/dashboard/support/new) if you need your quotas increased.

## Quotas by plan [\#](https://supabase.com/docs/guides/realtime/quotas\#quotas-by-plan)

|  | Free | Pro | Pro (no spend cap) | Team | Enterprise |
| --- | --- | --- | --- | --- | --- |
| **Concurrent connections** | 200 | 500 | 10,000 | 10,000 | 10,000+ |
| **Messages per second** | 100 | 500 | 2,500 | 2,500 | 2,500+ |
| **Channel joins per second** | 100 | 500 | 2,500 | 2,500 | 2,500+ |
| **Channels per connection** | 100 | 100 | 100 | 100 | 100+ |
| **Presence keys per object** | 10 | 10 | 10 | 10 | 10+ |
| **Presence messages per second** | 20 | 50 | 1,000 | 1,000 | 1,000+ |
| **Broadcast payload size KB** | 256 | 3,000 | 3,000 | 3,000 | 3,000+ |
| **Postgres change payload size KB ( [**read more**](https://supabase.com/docs/guides/realtime/quotas#postgres-changes-payload-quota))** | 1,024 | 1,024 | 1,024 | 1,024 | 1,024+ |

Beyond the Free and Pro Plan you can customize your quotas by [contacting support](https://supabase.com/dashboard/support/new).

## Quota errors [\#](https://supabase.com/docs/guides/realtime/quotas\#quota-errors)

When you exceed a quota, errors will appear in the backend logs and client-side messages in the WebSocket connection.

- **Logs**: check the [Realtime logs](https://supabase.com/dashboard/project/_/database/realtime-logs) inside your project Dashboard.
- **WebSocket errors**: Use your browser's developer tools to find the WebSocket initiation request and view individual messages.

##### Realtime Inspector

You can use the [Realtime Inspector](https://realtime.supabase.com/inspector/new) to reproduce an error and share those connection details with Supabase support.

Some quotas can cause a Channel join to be refused. Realtime will reply with one of the following WebSocket messages:

### `too_many_channels` [\#](https://supabase.com/docs/guides/realtime/quotas\#toomanychannels)

Too many channels currently joined for a single connection.

### `too_many_connections` [\#](https://supabase.com/docs/guides/realtime/quotas\#toomanyconnections)

Too many total concurrent connections for a project.

### `too_many_joins` [\#](https://supabase.com/docs/guides/realtime/quotas\#toomanyjoins)

Too many Channel joins per second.

### `tenant_events` [\#](https://supabase.com/docs/guides/realtime/quotas\#tenantevents)

Connections will be disconnected if your project is generating too many messages per second. `supabase-js` will reconnect automatically when the message throughput decreases below your plan quota. An `event` is a WebSocket message delivered to, or sent from a client.

## Postgres changes payload quota [\#](https://supabase.com/docs/guides/realtime/quotas\#postgres-changes-payload-quota)

When this quota is reached, the `new` and `old` record payloads only include the fields with a value size of less than or equal to 64 bytes.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/realtime/quotas.mdx)

### Is this helpful?

NoYes

### On this page

[Quotas by plan](https://supabase.com/docs/guides/realtime/quotas#quotas-by-plan) [Quota errors](https://supabase.com/docs/guides/realtime/quotas#quota-errors) [too\_many\_channels](https://supabase.com/docs/guides/realtime/quotas#toomanychannels) [too\_many\_connections](https://supabase.com/docs/guides/realtime/quotas#toomanyconnections) [too\_many\_joins](https://supabase.com/docs/guides/realtime/quotas#toomanyjoins) [tenant\_events](https://supabase.com/docs/guides/realtime/quotas#tenantevents) [Postgres changes payload quota](https://supabase.com/docs/guides/realtime/quotas#postgres-changes-payload-quota)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)