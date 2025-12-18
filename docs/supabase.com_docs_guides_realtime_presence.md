---
url: "https://supabase.com/docs/guides/realtime/presence"
title: "Presence | Supabase Docs"
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
3. Usage
5. [Presence](https://supabase.com/docs/guides/realtime/presence)

# Presence

## Share state between users with Realtime Presence.

* * *

Let's explore how to implement Realtime Presence to track state between multiple users.

## Usage [\#](https://supabase.com/docs/guides/realtime/presence\#usage)

You can use the Supabase client libraries to track Presence state between users.

### How Presence works [\#](https://supabase.com/docs/guides/realtime/presence\#how-presence-works)

Presence lets each connected client publish a small piece of state—called a “presence payload”—to a shared channel. Supabase stores each client’s payload under a unique presence key and keeps a merged view of all connected clients.

When any client subscribes, disconnects, or updates their presence payload, Supabase triggers one of three events:

- **`sync`** — the full presence state has been updated
- **`join`** — a new client has started tracking presence
- **`leave`** — a client has stopped tracking presence

The complete presence state returned by `presenceState()` looks like this:

```
1
{
2
  "client_key_1": [{ "userId": 1, "typing": false }],
3
  "client_key_2": [{ "userId": 2, "typing": true }]
4
}
```

### Initialize the client [\#](https://supabase.com/docs/guides/realtime/presence\#initialize-the-client)

Get the Project URL and key from [the project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true).

##### Changes to API keys

Supabase is changing the way keys work to improve project security and developer experience. You can [read the full announcement](https://github.com/orgs/supabase/discussions/29260), but in the transition period, you can use both the current `anon` and `service_role` keys and the new publishable key with the form `sb_publishable_xxx` which will replace the older keys.

In most cases, you can get the correct key from [the Project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true), but if you want a specific key, you can find all keys in [the API Keys section of a Project's Settings page](https://supabase.com/dashboard/project/_/settings/api-keys/):

- **For legacy keys**, copy the `anon` key for client-side operations and the `service_role` key for server-side operations from the **Legacy API Keys** tab.
- **For new keys**, open the **API Keys** tab, if you don't have a publishable key already, click **Create new API Keys**, and copy the value from the **Publishable key** section.

JavaScriptDartSwiftKotlinPython

```
1
import { createClient } from '@supabase/supabase-js'
2

3
const SUPABASE_URL = 'https://<project>.supabase.co'
4
const SUPABASE_KEY = '<sb_publishable_... or anon key>'
5

6
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
```

### Sync and track state [\#](https://supabase.com/docs/guides/realtime/presence\#sync-and-track-state)

JavaScriptDartSwiftKotlinPython

Listen to the `sync`, `join`, and `leave` events triggered whenever any client joins or leaves the channel or changes their slice of state:

```
1
const roomOne = supabase.channel('room_01')
2

3
roomOne
4
  .on('presence', { event: 'sync' }, () => {
5
    const newState = roomOne.presenceState()
6
    console.log('sync', newState)
7
  })
8
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
9
    console.log('join', key, newPresences)
10
  })
11
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
12
    console.log('leave', key, leftPresences)
13
  })
14
  .subscribe()
```

### Sending state [\#](https://supabase.com/docs/guides/realtime/presence\#sending-state)

You can send state to all subscribers using `track()`:

JavaScriptDartSwiftKotlinPython

```
1
const roomOne = supabase.channel('room_01')
2

3
const userStatus = {
4
  user: 'user-1',
5
  online_at: new Date().toISOString(),
6
}
7

8
roomOne.subscribe(async (status) => {
9
  if (status !== 'SUBSCRIBED') { return }
10

11
  const presenceTrackStatus = await roomOne.track(userStatus)
12
  console.log(presenceTrackStatus)
13
})
```

A client will receive state from any other client that is subscribed to the same topic (in this case `room_01`). It will also automatically trigger its own `sync` and `join` event handlers.

### Stop tracking [\#](https://supabase.com/docs/guides/realtime/presence\#stop-tracking)

You can stop tracking presence using the `untrack()` method. This will trigger the `sync` and `leave` event handlers.

JavaScriptDartSwiftKotlinPython

```
1
const untrackPresence = async () => {
2
  const presenceUntrackStatus = await roomOne.untrack()
3
  console.log(presenceUntrackStatus)
4
}
5

6
untrackPresence()
```

## Presence options [\#](https://supabase.com/docs/guides/realtime/presence\#presence-options)

You can pass configuration options while initializing the Supabase Client.

### Presence key [\#](https://supabase.com/docs/guides/realtime/presence\#presence-key)

By default, Presence will generate a unique `UUIDv1` key on the server to track a client channel's state. If you prefer, you can provide a custom key when creating the channel. This key should be unique among clients.

JavaScriptDartSwiftKotlinPython

```
1
import { createClient } from '@supabase/supabase-js'
2
const supabase = createClient('SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY')
3

4
const channelC = supabase.channel('test', {
5
  config: {
6
    presence: {
7
      key: 'userId-123',
8
    },
9
  },
10
})
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/realtime/presence.mdx)

### Is this helpful?

NoYes

### On this page

[Usage](https://supabase.com/docs/guides/realtime/presence#usage) [How Presence works](https://supabase.com/docs/guides/realtime/presence#how-presence-works) [Initialize the client](https://supabase.com/docs/guides/realtime/presence#initialize-the-client) [Sync and track state](https://supabase.com/docs/guides/realtime/presence#sync-and-track-state) [Sending state](https://supabase.com/docs/guides/realtime/presence#sending-state) [Stop tracking](https://supabase.com/docs/guides/realtime/presence#stop-tracking) [Presence options](https://supabase.com/docs/guides/realtime/presence#presence-options) [Presence key](https://supabase.com/docs/guides/realtime/presence#presence-key)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)