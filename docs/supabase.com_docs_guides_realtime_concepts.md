---
url: "https://supabase.com/docs/guides/realtime/concepts"
title: "Realtime Concepts | Supabase Docs"
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
5. [Concepts](https://supabase.com/docs/guides/realtime/concepts)

# Realtime Concepts

* * *

## Concepts [\#](https://supabase.com/docs/guides/realtime/concepts\#concepts)

There are several concepts and terminology that is useful to understand how Realtime works.

- **Channels**: the foundation of Realtime. Think of them as rooms where clients can communicate and listen to events. Channels are identified by a topic name and if they are public or private.
- **Topics**: the name of the channel. They are used to identify the channel and are a string used to identify the channel.
- **Events**: the type of messages that can be sent and received.
- **Payload**: the actual data that is sent and received and that the user will act upon.
- **Concurrent Connections**: number of total channels subscribed for all clients.

## Channels [\#](https://supabase.com/docs/guides/realtime/concepts\#channels)

Channels are the foundation of Realtime. Think of them as rooms where clients can communicate and listen to events. Channels are identified by a topic name and if they are public or private.

For private channels, you need to use [Realtime Authorization](https://supabase.com/docs/guides/realtime/authorization) to control access to the channel and if they are able to send messages.
For public channels, any user can subscribe to the channel, send and receive messages.

You can set your project to use only private channels or both private and public channels in the [Realtime Settings](https://supabase.com/docs/guides/realtime/settings).

If you have a private channel and a public channel with the same topic name, Realtime sees them as unique channels and won't send messages between them.

## Database resources [\#](https://supabase.com/docs/guides/realtime/concepts\#database-resources)

Realtime uses several database connections to perform several operations. As a user, you are able to tune some of them using [Realtime Settings](https://supabase.com/docs/guides/realtime/settings).

### Database connections [\#](https://supabase.com/docs/guides/realtime/concepts\#database-connections)

Realtime uses several database connections to perform various operations. You can configure some of these connections through [Realtime Settings](https://supabase.com/docs/guides/realtime/settings).

The connections include:

- **Migrations**: Two temporary connections to run database migrations when needed
- **Authorization**: Configurable connection pool to check authorization policies on join that are always started.
- **Broadcast from database**: One connection to receive data from replication slot used to broadcast the changes to the clients that is always started.
- **Postgres Changes**: Multiple connection pools required. These pools are only started if you use Postgres Changes.
  - **Subscription management**: To manage the subscribers to Postgres Changes
  - **Subscription cleanup**: To cleanup the subscribers to Postgres Changes
  - **WAL pull**: To pull the changes from the database

The number of connections varies based on your compute add-on size and configuration. The following table shows the default connection pool sizes for different compute add-on variants:

| Compute Add-on | Broadcast from database | Authorization Pool Size | Subscription management | Subscription cleanup | WAL pull |
| --- | --- | --- | --- | --- | --- |
| Nano | 1 | 2 | 2 | 2 | 2 |
| Micro | 1 | 2 | 2 | 2 | 2 |
| Small | 1 | 5 | 4 | 4 | 4 |
| Medium | 1 | 5 | 4 | 4 | 4 |
| Large | 1 | 5 | 4 | 4 | 4 |
| XL | 1 | 10 | 7 | 7 | 7 |
| 2XL | 1 | 10 | 7 | 7 | 7 |
| 4XL | 1 | 10 | 7 | 7 | 7 |
| 8XL | 1 | 15 | 9 | 9 | 9 |
| 12XL | 1 | 15 | 9 | 9 | 9 |
| 16XL | 1 | 15 | 9 | 9 | 9 |
| >16XL | 1 | 15 | 9 | 9 | 9 |

You can customize `Authorization Pool Size` through the `Database connection pool size` parameter in your Realtime configuration. If not specified, the default values shown in the table will be used.

### Replication slots [\#](https://supabase.com/docs/guides/realtime/concepts\#replication-slots)

Realtime also uses, at maximum, 2 replication slots.

- **Broadcast from database**: To broadcast the changes from the database to the clients
- **Postgres Changes**: To listen to changes from the database

### Schema and tables [\#](https://supabase.com/docs/guides/realtime/concepts\#schema-and-tables)

The `realtime` schema creates the following tables:

- `schema_migrations` \- To track the migrations that have been run on the database from Realtime
- `subscription` \- Track the subscribers to Postgres Changes
- `messages`\- Partitioned table per day that's used for Authorization and Broadcast from database
  - **Authorization**: To check the authorization policies on join by checking if a given user can read and write to this table
  - **Broadcast from database**: Replication slot tracks a publication to this table to broadcast the changes to the connected clients.
  - The schema from the table is the following:


    ```
    1
    create table realtime.messages (
    2
    topic text not null, -- The topic of the message
    3
    extension text not null, -- The extension of the message (presence, broadcast)
    4
    payload jsonb null, -- The payload of the message
    5
    event text null, -- The event of the message
    6
    private boolean null default false, -- If the message is going to use a private channel
    7
    updated_at timestamp without time zone not null default now(), -- The timestamp of the message
    8
    inserted_at timestamp without time zone not null default now(), -- The timestamp of the message
    9
    id uuid not null default gen_random_uuid (), -- The id of the message
    10
    constraint messages_pkey primary key (id, inserted_at)) partition by RANGE (inserted_at);
    ```

Realtime has a cleanup process that will delete tables older than 3 days.

### Functions [\#](https://supabase.com/docs/guides/realtime/concepts\#functions)

Realtime creates two functions on your database:

- `realtime.send` \- Inserts an entry into `realtime.messages` table that will trigger the replication slot to broadcast the changes to the clients. It also captures errors to prevent the trigger from breaking.
- `realtime.broadcast_changes` \- uses `realtime.send` to broadcast the changes with a format that is compatible with Postgres Changes

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/realtime/concepts.mdx)

### Is this helpful?

NoYes

### On this page

[Concepts](https://supabase.com/docs/guides/realtime/concepts#concepts) [Channels](https://supabase.com/docs/guides/realtime/concepts#channels) [Database resources](https://supabase.com/docs/guides/realtime/concepts#database-resources) [Database connections](https://supabase.com/docs/guides/realtime/concepts#database-connections) [Replication slots](https://supabase.com/docs/guides/realtime/concepts#replication-slots) [Schema and tables](https://supabase.com/docs/guides/realtime/concepts#schema-and-tables) [Functions](https://supabase.com/docs/guides/realtime/concepts#functions)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)