---
url: "https://supabase.com/docs/guides/realtime/architecture"
title: "Realtime Architecture | Supabase Docs"
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
5. [Architecture](https://supabase.com/docs/guides/realtime/architecture)

# Realtime Architecture

* * *

Realtime is a globally distributed Elixir cluster. Clients can connect to any node in the cluster via WebSockets and send messages to any other client connected to the cluster.

Realtime is written in [Elixir](https://elixir-lang.org/), which compiles to [Erlang](https://www.erlang.org/), and utilizes many tools the [Phoenix Framework](https://www.phoenixframework.org/) provides out of the box.

![Architecture](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fguides%2Fplatform%2Frealtime%2Farchitecture--light.png&w=3840&q=75)

## Elixir & Phoenix [\#](https://supabase.com/docs/guides/realtime/architecture\#elixir--phoenix)

Phoenix is fast and able to handle millions of concurrent connections.

Phoenix can handle many concurrent connections because Elixir provides lightweight processes (not OS processes) to work with.

Client-facing WebSocket servers need to handle many concurrent connections. Elixir & Phoenix let the Supabase Realtime cluster do this easily.

## Channels [\#](https://supabase.com/docs/guides/realtime/architecture\#channels)

Channels are implemented using [Phoenix Channels](https://hexdocs.pm/phoenix/channels.html) which uses [Phoenix.PubSub](https://hexdocs.pm/phoenix_pubsub/Phoenix.PubSub.html) with the default `Phoenix.PubSub.PG2` adapter.

The PG2 adapter utilizes Erlang [process groups](https://www.erlang.org/docs/18/man/pg2.html) to implement the PubSub model where a publisher can send messages to many subscribers.

## Global cluster [\#](https://supabase.com/docs/guides/realtime/architecture\#global-cluster)

Presence is an in-memory key-value store backed by a CRDT. When a user is connected to the cluster the state of that user is sent to all connected Realtime nodes.

Broadcast lets you send a message from any connected client to a Channel. Any other client connected to that same Channel will receive that message.

This works globally. A client connected to a Realtime node in the United States can send a message to another client connected to a node in Singapore. Connect two clients to the same Realtime Channel and they'll all receive the same messages.

Broadcast is useful for getting messages to users in the same location very quickly. If a group of clients are connected to a node in Singapore, the message only needs to go to that Realtime node in Singapore and back down. If users are close to a Realtime node they'll get Broadcast messages in the time it takes to ping the cluster.

Thanks to the Realtime cluster, you (an amazing Supabase user) don't have to think about which regions your clients are connected to.

If you're using Broadcast, Presence, or streaming database changes, messages will always get to your users via the shortest path possible.

## Connecting to a database [\#](https://supabase.com/docs/guides/realtime/architecture\#connecting-to-a-database)

Realtime allows you to listen to changes from your Postgres database. When a new client connects to Realtime and initializes the `postgres_changes` Realtime Extension the cluster will connect to your Postgres database and start streaming changes from a replication slot.

Realtime knows the region your database is in, and connects to it from the closest region possible.

Every Realtime region has at least two nodes so if one node goes offline the other node should reconnect and start streaming changes again.

## Broadcast from Postgres [\#](https://supabase.com/docs/guides/realtime/architecture\#broadcast-from-postgres)

Realtime Broadcast sends messages when changes happen in your database. Behind the scenes, Realtime creates a publication on the `realtime.messages` table. It then reads the Write-Ahead Log (WAL) file for this table, and sends a message whenever an insert happens. Messages are sent as JSON packages over WebSockets.

The `realtime.messages` table is partitioned by day. This allows old messages to be deleted performantly, by dropping old partitions. Partitions are retained for 3 days before being deleted.

Broadcast uses [Realtime Authorization](https://supabase.com/docs/guides/realtime/authorization) by default to protect your data.

## Streaming the Write-Ahead Log [\#](https://supabase.com/docs/guides/realtime/architecture\#streaming-the-write-ahead-log)

A Postgres logical replication slot is acquired when connecting to your database.

Realtime delivers changes by polling the replication slot and appending channel subscription IDs to each wal record.

Subscription IDs are Erlang processes representing underlying sockets on the cluster. These IDs are globally unique and messages to processes are routed automatically by the Erlang virtual machine.

After receiving results from the polling query, with subscription IDs appended, Realtime delivers records to those clients.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/realtime/architecture.mdx)

### Is this helpful?

NoYes

### On this page

[Elixir & Phoenix](https://supabase.com/docs/guides/realtime/architecture#elixir--phoenix) [Channels](https://supabase.com/docs/guides/realtime/architecture#channels) [Global cluster](https://supabase.com/docs/guides/realtime/architecture#global-cluster) [Connecting to a database](https://supabase.com/docs/guides/realtime/architecture#connecting-to-a-database) [Broadcast from Postgres](https://supabase.com/docs/guides/realtime/architecture#broadcast-from-postgres) [Streaming the Write-Ahead Log](https://supabase.com/docs/guides/realtime/architecture#streaming-the-write-ahead-log)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)