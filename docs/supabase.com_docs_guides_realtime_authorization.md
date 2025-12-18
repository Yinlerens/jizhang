---
url: "https://supabase.com/docs/guides/realtime/authorization"
title: "Realtime Authorization | Supabase Docs"
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
3. Security
5. [Authorization](https://supabase.com/docs/guides/realtime/authorization)

# Realtime Authorization

* * *

You can control client access to Realtime [Broadcast](https://supabase.com/docs/guides/realtime/broadcast) and [Presence](https://supabase.com/docs/guides/realtime/presence) by adding Row Level Security policies to the `realtime.messages` table. Each RLS policy can map to a specific action a client can take:

- Control which clients can broadcast to a Channel
- Control which clients can receive broadcasts from a Channel
- Control which clients can publish their presence to a Channel
- Control which clients can receive messages about the presence of other clients

Realtime Authorization is in Public Beta. To use Authorization for your Realtime Channels, use `supabase-js` version `v2.44.0` or later.

To enforce private channels you need to disable the 'Allow public access' setting in [Realtime Settings](https://supabase.com/dashboard/project/_/realtime/settings)

## How it works [\#](https://supabase.com/docs/guides/realtime/authorization\#how-it-works)

Realtime uses the `messages` table in your database's `realtime` schema to generate access policies for your clients when they connect to a Channel topic.

By creating RLS policies on the `realtime.messages` table you can control the access users have to a Channel topic, and features within a Channel topic.

The validation is done when the user connects. When their WebSocket connection is established and a Channel topic is joined, their permissions are calculated based on:

- The RLS policies on the `realtime.messages` table
- The user information sent as part of their [Auth JWT](https://supabase.com/docs/guides/auth/jwts)
- The request headers
- The Channel topic the user is trying to connect to

When Realtime generates a policy for a client it performs a query on the `realtime.messages` table and then rolls it back. Realtime does not store any messages in your `realtime.messages` table.

Using Realtime Authorization involves two steps:

- In your database, create RLS policies on the `realtime.messages`
- In your client, instantiate the Realtime Channel with the `config` option `private: true`

Increased RLS complexity can impact database performance and connection time, leading to higher connection latency and decreased join rates.

## Accessing request information [\#](https://supabase.com/docs/guides/realtime/authorization\#accessing-request-information)

### `realtime.topic` [\#](https://supabase.com/docs/guides/realtime/authorization\#realtimetopic)

You can use the `realtime.topic` helper function when writing RLS policies. It returns the Channel topic the user is attempting to connect to.

```
1
create policy "authenticated can read all messages on topic"
2
on "realtime"."messages"
3
for select
4
to authenticated
5
using (
6
  (select realtime.topic()) = 'room-1'
7
);
```

### JWT claims [\#](https://supabase.com/docs/guides/realtime/authorization\#jwt-claims)

The user claims can be accessed using the `current_setting` function. The claims are available as a JSON object in the `request.jwt.claims` setting.

```
1
create policy "authenticated with supabase.io email can read all"
2
on "realtime"."messages"
3
for select
4
to authenticated
5
using (
6
  -- Only users with the email claim ending with @supabase.io
7
  (((current_setting('request.jwt.claims'))::json ->> 'email') ~~ '%@supabase.io')
8
);
```

## Examples [\#](https://supabase.com/docs/guides/realtime/authorization\#examples)

The following examples use this schema:

```
1
create table public.rooms (
2
    id bigint generated by default as identity primary key,
3
    topic text not null unique
4
);
5

6
alter table public.rooms enable row level security;
7

8
create table public.profiles (
9
  id uuid not null references auth.users on delete cascade,
10
  email text NOT NULL,
11

12
  primary key (id)
13
);
14

15
alter table public.profiles enable row level security;
16

17
create table public.rooms_users (
18
  user_id uuid references auth.users (id),
19
  room_topic text references public.rooms (topic),
20
  created_at timestamptz default current_timestamp
21
);
22

23
alter table public.rooms_users enable row level security;
```

### Broadcast [\#](https://supabase.com/docs/guides/realtime/authorization\#broadcast)

The `extension` field on the `realtime.messages` table records the message type. For Broadcast messages, the value of `realtime.messages.extension` is `broadcast`. You can check for this in your RLS policies.

#### Allow a user to join (and read) a Broadcast topic [\#](https://supabase.com/docs/guides/realtime/authorization\#allow-a-user-to-join-and-read-a-broadcast-topic)

To join a Broadcast Channel, a user must have at least one read or write permission on the Channel topic.

Here, we allow reads (`select`s) for users who are linked to the requested topic within the relationship table `public.room_users`:

```
1
create policy "authenticated can receive broadcast"
2
on "realtime"."messages"
3
for select
4
to authenticated
5
using (
6
exists (
7
    select
8
      user_id
9
    from
10
      rooms_users
11
    where
12
      user_id = (select auth.uid())
13
      and topic = (select realtime.topic())
14
      and realtime.messages.extension in ('broadcast')
15
  )
16
);
```

Then, to join a topic with RLS enabled, instantiate the Channel with the `private` option set to `true`.

JavaScriptDartSwiftKotlinPython

```
1
const channel = supabase.channel('room-1', {
2
  config: { private: true },
3
})
4

5
channel
6
  .on('broadcast', { event: 'test' }, (payload) => console.log(payload))
7
  .subscribe((status, err) => {
8
    if (status === 'SUBSCRIBED') {
9
      console.log('Connected!')
10
    } else {
11
      console.error(err)
12
    }
13
  })
```

#### Allow a user to send a Broadcast message [\#](https://supabase.com/docs/guides/realtime/authorization\#allow-a-user-to-send-a-broadcast-message)

To authorize sending Broadcast messages, create a policy for `insert` where the value of `realtime.messages.extension` is `broadcast`.

Here, we allow writes (sends) for users who are linked to the requested topic within the relationship table `public.room_users`:

```
1
create policy "authenticated can send broadcast on topic"
2
on "realtime"."messages"
3
for insert
4
to authenticated
5
with check (
6
  exists (
7
    select
8
      user_id
9
    from
10
      rooms_users
11
    where
12
      user_id = (select auth.uid())
13
      and topic = (select realtime.topic())
14
      and realtime.messages.extension in ('broadcast')
15
  )
16
);
```

### Presence [\#](https://supabase.com/docs/guides/realtime/authorization\#presence)

The `extension` field on the `realtime.messages` table records the message type. For Presence messages, the value of `realtime.messages.extension` is `presence`. You can check for this in your RLS policies.

#### Allow users to listen to Presence messages on a Channel [\#](https://supabase.com/docs/guides/realtime/authorization\#allow-users-to-listen-to-presence-messages-on-a-channel)

Create a policy for `select` on `realtime.messages` where `realtime.messages.extension` is `presence`.

```
1
create policy "authenticated can listen to presence in topic"
2
on "realtime"."messages"
3
for select
4
to authenticated
5
using (
6
  exists (
7
    select
8
      user_id
9
    from
10
      rooms_users
11
    where
12
      user_id = (select auth.uid())
13
      and topic = (select realtime.topic())
14
      and realtime.messages.extension in ('presence')
15
  )
16
);
```

#### Allow users to send Presence messages on a channel [\#](https://supabase.com/docs/guides/realtime/authorization\#allow-users-to-send-presence-messages-on-a-channel)

To update the Presence status for a user create a policy for `insert` on `realtime.messages` where the value of `realtime.messages.extension` is `presence`.

```
1
create policy "authenticated can track presence on topic"
2
on "realtime"."messages"
3
for insert
4
to authenticated
5
with check (
6
  exists (
7
    select
8
      user_id
9
    from
10
      rooms_users
11
    where
12
      user_id = (select auth.uid())
13
      and name = (select realtime.topic())
14
      and realtime.messages.extension in ('presence')
15
  )
16
);
```

### Presence and Broadcast [\#](https://supabase.com/docs/guides/realtime/authorization\#presence-and-broadcast)

Authorize both Presence and Broadcast by including both extensions in the `where` filter.

#### Broadcast and Presence read [\#](https://supabase.com/docs/guides/realtime/authorization\#broadcast-and-presence-read)

Authorize Presence and Broadcast read in one RLS policy.

```
1
create policy "authenticated can listen to broadcast and presence on topic"
2
on "realtime"."messages"
3
for select
4
to authenticated
5
using (
6
  exists (
7
    select
8
      user_id
9
    from
10
      rooms_users
11
    where
12
      user_id = (select auth.uid())
13
      and topic = (select realtime.topic())
14
      and realtime.messages.extension in ('broadcast', 'presence')
15
  )
16
);
```

#### Broadcast and Presence write [\#](https://supabase.com/docs/guides/realtime/authorization\#broadcast-and-presence-write)

Authorize Presence and Broadcast write in one RLS policy.

```
1
create policy "authenticated can send broadcast and presence on topic"
2
on "realtime"."messages"
3
for insert
4
to authenticated
5
with check (
6
  exists (
7
    select
8
      user_id
9
    from
10
      rooms_users
11
    where
12
      user_id = (select auth.uid())
13
      and name = (select realtime.topic())
14
      and realtime.messages.extension in ('broadcast', 'presence')
15
  )
16
);
```

## Interaction with Postgres Changes [\#](https://supabase.com/docs/guides/realtime/authorization\#interaction-with-postgres-changes)

Realtime Postgres Changes are separate from Channel authorization. The `private` Channel option does not apply to Postgres Changes.

When using Postgres Changes with RLS, database records are sent only to clients who are allowed to read them based on your RLS policies.

## Updating RLS policies [\#](https://supabase.com/docs/guides/realtime/authorization\#updating-rls-policies)

Client access policies are cached for the duration of the connection. Your database is not queried for every Channel message.

Realtime updates the access policy cache for a client based on your RLS policies when:

- A client connects to Realtime and subscribes to a Channel
- A new JWT is sent to Realtime from a client via the [`access_token` message](https://supabase.com/docs/guides/realtime/protocol#access-token)

If a new JWT is never received on the Channel, the client will be disconnected when the JWT expires.

Make sure to keep the JWT expiration window short.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/realtime/authorization.mdx)

### Is this helpful?

NoYes

### On this page

[How it works](https://supabase.com/docs/guides/realtime/authorization#how-it-works) [Accessing request information](https://supabase.com/docs/guides/realtime/authorization#accessing-request-information) [realtime.topic](https://supabase.com/docs/guides/realtime/authorization#realtimetopic) [JWT claims](https://supabase.com/docs/guides/realtime/authorization#jwt-claims) [Examples](https://supabase.com/docs/guides/realtime/authorization#examples) [Broadcast](https://supabase.com/docs/guides/realtime/authorization#broadcast) [Presence](https://supabase.com/docs/guides/realtime/authorization#presence) [Presence and Broadcast](https://supabase.com/docs/guides/realtime/authorization#presence-and-broadcast) [Interaction with Postgres Changes](https://supabase.com/docs/guides/realtime/authorization#interaction-with-postgres-changes) [Updating RLS policies](https://supabase.com/docs/guides/realtime/authorization#updating-rls-policies)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)