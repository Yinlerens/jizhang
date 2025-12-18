---
url: "https://supabase.com/docs/guides/realtime/protocol"
title: "Realtime Protocol | Supabase Docs"
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

Realtime

1. [Realtime](https://supabase.com/docs/guides/realtime)
3. Deep dive
5. [Protocol](https://supabase.com/docs/guides/realtime/protocol)

# Realtime Protocol

* * *

## WebSocket connection setup [\#](https://supabase.com/docs/guides/realtime/protocol\#websocket-connection-setup)

To start the connection we use the WebSocket URL, which for:

- Supabase projects: `wss://<PROJECT_REF>.supabase.co/realtime/v1/websocket?apikey=<API_KEY>`
- self-hosted projects: `wss://<HOST>:<PORT>/socket/websocket?apikey=<API_KEY>`

As an example, using [websocat](https://github.com/vi/websocat), you would run the following command in your terminal:

```
1
# With Supabase
2
websocat "wss://<PROJECT_REF>.supabase.co/realtime/v1/websocket?apikey=<API_KEY>"
3

4
# With self-hosted
5
websocat "wss://<HOST>:<PORT>/socket/websocket?apikey=<API_KEY>"
```

During this stage you can also set other URL params:

- `vsn`: sets the protocol version. Possible values are `1.0.0` and `2.0.0`. Defaults to `1.0.0`.
- `log_level`: sets the log level to be used by this connection to help you debug potential issues. This only affects server side logs.

After connecting a `phx_join` event must be sent to the server to join a channel. The next sections outline the different messages types and events that are supported.

## Protocol messages [\#](https://supabase.com/docs/guides/realtime/protocol\#protocol-messages)

Messages can be serialized in different formats. The Realtime protocol supports two versions: `1.0.0` and `2.0.0`.

## 1.0.0 [\#](https://supabase.com/docs/guides/realtime/protocol\#100)

Version 1.0.0 is extremely simple. It uses JSON as the serialization format for messages. The underlying WebSocket messages are all text frames.

Messages contain the following fields:

- `event`: The type of event being sent or received. Example `phx_join`, `postgres_changes`, `broadcast`, etc.
- `topic`: The topic to which the message belongs. This is a string that identifies the channel or context of the message.
- `payload`: The data associated with the event. This can be any JSON-serializable data structure, such as an object or an array.
- `ref`: A unique reference ID for the message. This is useful to track replies to a specific message.
- `join_ref`: A unique reference ID to uniquely identify a joined topic for pushes, broadcasts, replies, etc.

Example:

```
1
{
2
  "topic": "realtime:presence-room",
3
  "event": "phx_join",
4
  "payload": {
5
    "config": {
6
      "broadcast": {
7
        "ack": false,
8
        "self": false
9
      },
10
      "presence": {
11
        "enabled": false
12
      },
13
      "private": false
14
    }
15
  },
16
  "ref": "1",
17
  "join_ref": "1"
18
}
```

## 2.0.0 [\#](https://supabase.com/docs/guides/realtime/protocol\#200)

Version 2.0.0 uses text and binary WebSocket frames.

### Text frames [\#](https://supabase.com/docs/guides/realtime/protocol\#text-frames)

Text frames are always JSON encoded, but unlike version 1.0.0, they use a JSON array where the element order must be exactly:

- `join_ref`
- `ref`
- `topic`
- `event`
- `payload`

Example:

```
1
[\
2\
  "1",\
3\
  "1",\
4\
  "realtime:presence-room",\
5\
  "phx_join",\
6\
  {\
7\
    "config": {\
8\
      "broadcast": {\
9\
        "ack": false,\
10\
        "self": false\
11\
      },\
12\
      "presence": {\
13\
        "enabled": false\
14\
      },\
15\
      "private": false\
16\
    }\
17\
  }\
18\
]
```

### Binary frames [\#](https://supabase.com/docs/guides/realtime/protocol\#binary-frames)

The two special message types have a well defined binary format where the first byte defines the type of message. Both are used to send and receive broadcast events. See the [client](https://supabase.com/docs/guides/realtime/protocol#client-sent-events) and [server](https://supabase.com/docs/guides/realtime/protocol#server-sent-events) sent events for more details.

| Code | Type | Description |
| --- | --- | --- |
| 3 | USER\_BROADCAST\_PUSH | User-initiated broadcast push |
| 4 | USER\_BROADCAST | User broadcast message |

#### User Broadcast Push [\#](https://supabase.com/docs/guides/realtime/protocol\#user-broadcast-push)

```
1
0                   1                   2                   3
2
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
3
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
4
|  Type (0x03)  | Join Ref Size |   Ref Size    |  Topic Size   |
5
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
6
|User Event Size| Metadata Size | Payload Enc.  |  Join Ref ... |
7
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
8
|                      Ref (variable length)                    |
9
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10
|                     Topic (variable length)                   |
11
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12
|                  User Event (variable length)                 |
13
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14
|                   Metadata (variable length)                  |
15
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
16
|                User Payload (variable length)                 |
17
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

**Field Descriptions:**

- **Type**: 1 byte, value = 0x03
- **Join Ref Size**: 1 byte, size of join reference string (max 255)
- **Ref Size**: 1 byte, size of reference string (max 255)
- **Topic Size**: 1 byte, size of topic string (max 255)
- **User Event Size**: 1 byte, size of user event string (max 255)
- **Metadata Size**: 1 byte, size of metadata string (max 255)
- **Payload Encoding**: 1 byte (0 = binary, 1 = JSON)
- **Join Ref**: Variable length string
- **Ref**: Variable length string
- **Topic**: Variable length string
- **User Event**: Variable length string
- **Metadata**: Variable length JSON string
- **User Payload**: Variable length payload data

#### User Broadcast [\#](https://supabase.com/docs/guides/realtime/protocol\#user-broadcast)

```
1
0                   1                   2                   3
2
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
3
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
4
|  Type (0x04)  |  Topic Size   |User Event Size| Metadata Size |
5
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
6
| Payload Enc.  |          Topic (variable length)              |
7
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
8
|                  User Event (variable length)                 |
9
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10
|                   Metadata (variable length)                  |
11
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12
|                User Payload (variable length)                 |
13
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

**Field Descriptions:**

- **Type**: 1 byte, value = 0x04
- **Topic Size**: 1 byte, size of topic string (max 255)
- **User Event Size**: 1 byte, size of user event string (max 255)
- **Metadata Size**: 1 byte, size of metadata JSON string (max 255)
- **Payload Encoding**: 1 byte (0 = binary, 1 = JSON)
- **Topic**: Variable length string
- **User Event**: Variable length string
- **Metadata**: Variable length JSON string
- **User Payload**: Variable length payload data

## Event types [\#](https://supabase.com/docs/guides/realtime/protocol\#event-types)

Messages for all events are encoded as text frames using JSON except with the `broadcast` event type which can happen on both text and binary frames.

### Client sent events [\#](https://supabase.com/docs/guides/realtime/protocol\#client-sent-events)

| Event Type | Description | Requires Ref | Requires Join Ref |
| --- | --- | --- | --- |
| `phx_join` | Initial message to join a channel and configure features | ✅ | ✅ |
| `phx_leave` | Message to leave a channel | ✅ | ✅ |
| `heartbeat` | Heartbeat message to keep the connection alive | ✅ | ⛔ |
| `access_token` | Message to update the access token | ✅ | ✅ |
| `broadcast` | Broadcast message sent to all clients in a channel | ✅ | ✅ |
| `presence` | Presence state update sent after joining a channel | ✅ | ✅ |

#### phx\_join [\#](https://supabase.com/docs/guides/realtime/protocol\#phxjoin)

This is the initial message required to join a channel. The client sends this message to the server to join a specific topic and configure the features it wants to use, such as Postgres changes, Presence, and Broadcast. The payload of the `phx_join` event contains the configuration options for the channel.

```
1
{
2
  "config": {
3
    "broadcast": {
4
      "ack": boolean,
5
      "self": boolean,
6
      "replay" : {
7
        "since": integer,
8
        "limit": integer
9
      }
10
    },
11
    "presence": {
12
      "enabled": boolean,
13
      "key": string
14
    },
15
    "postgres_changes": [\
16\
      {\
17\
        "event": string,\
18\
        "schema": string,\
19\
        "table": string,\
20\
        "filter": string\
21\
      }\
22\
    ]
23
    "private": boolean
24
  },
25
  "access_token": string
26
}
```

- `config`:
  - `private`: Whether the channel is private
  - `broadcast`: Configuration options for broadcasting messages
    - `ack`: Acknowledge broadcast messages
    - `self`: Include the sender in broadcast messages
    - `replay`: Configuration options for broadcast replay (Optional)
      - `since`: Replay messages since a specific timestamp in milliseconds
      - `limit`: Limit the number of replayed messages (Optional)
  - `presence`: Configuration options for presence tracking
    - `enabled`: Whether presence tracking is enabled for this channel
    - `key`: Key to be used for presence tracking, if not specified or empty, a UUID will be generated and used
  - `postgres_changes`: Array of configurations for Postgres changes
    - `event`: Database change event to listen to, accepts `INSERT`, `UPDATE`, `DELETE`, or `*` to listen to all events.
    - `schema`: Schema of the table to listen to, accepts `*` wildcard to listen to all schemas
    - `table`: Table of the database to listen to, accepts `*` wildcard to listen to all tables
    - `filter`: Filter to be used when pulling changes from database. Read more about filters in the usage docs for [Postgres Changes](https://supabase.com/docs/guides/realtime/postgres-changes?queryGroups=language&language=js#filtering-for-specific-changes)
- `access_token`: Optional access token for authentication, if not provided, the server will use the API key.

Example on protocol version `2.0.0`:

```
1
[\
2\
  "3",\
3\
  "5",\
4\
  "realtime:chat-room",\
5\
  "phx_join",\
6\
  {\
7\
    "config": {\
8\
      "broadcast": {\
9\
        "ack": false,\
10\
        "self": true,\
11\
        "replay": {\
12\
          "since": 1763407103911,\
13\
          "limit": 10\
14\
        }\
15\
      },\
16\
      "presence": {\
17\
        "key": "user_id-827",\
18\
        "enabled": true\
19\
      },\
20\
      "postgres_changes": [],\
21\
      "private": true\
22\
    }\
23\
  }\
24\
]
```

#### phx\_leave [\#](https://supabase.com/docs/guides/realtime/protocol\#phxleave)

This message is sent by the client to leave a channel. It can be used to clean up resources or stop listening for events on that channel. Payload should be empty object.

Example on protocol version `2.0.0`:

```
1
["1", "3", "realtime:avatar-stack-demo", "phx_leave", {}]
```

#### heartbeat [\#](https://supabase.com/docs/guides/realtime/protocol\#heartbeat)

The heartbeat message should be sent at least every 25 seconds to avoid a connection timeout. Payload should be an empty object.

For heartbeat, the topic `phoenix` is used as this special message is not connected to a specific channel.

Example on protocol version `2.0.0`:

```
1
[null, "26", "phoenix", "heartbeat", {}]
```

#### access\_token [\#](https://supabase.com/docs/guides/realtime/protocol\#accesstoken)

Used to setup a new token to be used by Realtime for authentication and to refresh the token to prevent a private channel from closing when the token expires.

```
1
{
2
   "access_token": string
3
}
```

- `access_token`: The new access token to be used for authentication. Either to change it or to refresh it.

Example on protocol version `2.0.0`:

```
1
[\
2\
  "10",\
3\
  "1",\
4\
  "realtime:chat-room",\
5\
  "access_token",\
6\
  {\
7\
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"\
8\
  }\
9\
]
```

#### broadcast (text frame) [\#](https://supabase.com/docs/guides/realtime/protocol\#broadcast-text-frame)

Used to send a broadcast event to all clients in a channel.

The `payload` field contains the event name and the data to broadcast.

```
1
{
2
   "event": string,
3
   "payload": json,
4
   "type": "broadcast"
5
}
```

- `event`: The name of the user event to broadcast.
- `payload`: The user data associated with the event, which can be any JSON-serializable data structure.
- `type`: The type of message, which must always be `broadcast`.

Example on protocol version `2.0.0`:

```
1
[\
2\
  "10",\
3\
  "1",\
4\
  "realtime:chat-room",\
5\
  "broadcast",\
6\
  {\
7\
    "event": "user-event",\
8\
    "type": "broadcast",\
9\
    "payload": {\
10\
      "content": "Hello, World!",\
11\
      "createdAt": "2025-11-17T21:14:14Z",\
12\
      "id": "9b823349-71c0-465b-9a83-a63aa2a9ae6d",\
13\
      "username": "VCSHLD556nQD-B-vUTJJ3"\
14\
    }\
15\
  }\
16\
]
```

#### broadcast (binary frame) [\#](https://supabase.com/docs/guides/realtime/protocol\#broadcast-binary-frame)

See the [User Broadcast Push](https://supabase.com/docs/guides/realtime/protocol#user-broadcast-push) section for the binary frame structure.

This message is a streamlined version of the text frame broadcast event that also supports non-JSON payloads.
Below is the same example from the previous section, showing the binary frame structure with hexadecimal values for the header and plain text for the remaining fields:

- Join Ref: `10`
- Ref: `1`
- Topic: `realtime:chat-room`
- Payload encoding being JSON
- User Event: `user-event`
- Metadata is empty
- User Payload

```
1
0x03                      // Type
2
0x02                      // Join Ref Size
3
0x01                      // Ref Size
4
0x12                      // Topic Size
5
0x0A                      // User Event Size
6
0x00                      // Metadata Size
7
0x01                      // Payload Encoding (1 = JSON)
8
10                        // Actual Join Ref
9
1                         // Actual Ref
10
realtime:chat-room        // Topic
11
user-event                // User Event
12
{                         // User Event Payload
13
  "content": "Hello, World!",
14
  "createdAt": "2025-11-17T21:14:14Z",
15
  "id": "9b823349-71c0-465b-9a83-a63aa2a9ae6d",
16
  "username": "VCSHLD556nQD-B-vUTJJ3"
17
}
```

The payload encoding is just a hint for the client to know if the payload should be treated as JSON or not.

#### presence [\#](https://supabase.com/docs/guides/realtime/protocol\#presence)

Used to send presence metadata after joining a channel. The payload contains the presence information to be tracked by the server.
This metadata is then sent back to all clients in the channel via `presence_state` and `presence_diff` events.

```
1
{
2
   "type": "presence",
3
   "event": "track",
4
   "payload": json
5
}
```

Example on protocol version `2.0.0`:

```
1
[\
2\
  "1",\
3\
  "5",\
4\
  "realtime:presence-room",\
5\
  "presence",\
6\
  {\
7\
    "type": "presence",\
8\
    "event": "track",\
9\
    "payload": {\
10\
      "name": "Alice",\
11\
      "color": "hsl(29, 100%, 70%)"\
12\
    }\
13\
  }\
14\
]
```

### Server sent events [\#](https://supabase.com/docs/guides/realtime/protocol\#server-sent-events)

| Event Type | Description | Requires Ref | Requires Join Ref |
| --- | --- | --- | --- |
| `phx_close` | Message from server to signal channel closed | ✅ | ✅ |
| `phx_error` | Error message sent by the server when an error occurs | ✅ | ✅ |
| `phx_reply` | Response to a `phx_join` or other requests | ✅ | ✅\* |
| `system` | System messages to inform about the status of the Postgres subscription | ⛔ | ⛔ |
| `broadcast` | Broadcast message sent to all clients in a channel | ⛔ | ⛔ |
| `presence_state` | Presence state sent by the server on join | ⛔ | ⛔ |
| `presence_diff` | Presence state diff update sent after a change in presence state | ⛔ | ⛔ |
| `postgres_changes` | Postgres CDC message containing changes to the database | ⛔ | ⛔ |

#### phx\_close [\#](https://supabase.com/docs/guides/realtime/protocol\#phxclose)

This message is sent by the server to signal that the channel has been closed. Payload will be empty object.

Example on protocol version `2.0.0`:

```
1
["3", "3", "realtime:avatar-stack-demo", "phx_close", {}]
```

#### phx\_error [\#](https://supabase.com/docs/guides/realtime/protocol\#phxerror)

This message is sent by the server when an unexpected error occurs in the channel. Payload will be an empty object

```
1
["3", "3", "realtime:avatar-stack-demo", "phx_error", {}]
```

#### phx\_reply [\#](https://supabase.com/docs/guides/realtime/protocol\#phxreply)

The server sends these messages in response to client requests that require acknowledgment.

```
1
{
2
   "status": string,
3
   "response": any,
4
}
```

- `status`: The status of the response, can be `ok` or `error`.
- `response`: The response data, which can vary based on the event that was replied to

`phx_join` has a specific response structure outlined below.

Contains the status of the join request and any additional information requested in the `phx_join` payload.

```
1
{
2
   "postgres_changes": [\
3\
      {\
4\
         "id": number,\
5\
         "event": string,\
6\
         "schema": string,\
7\
         "table": string\
8\
      }\
9\
   ]
10
}
```

- `postgres_changes`: Array of Postgres changes that the client is subscribed to, each object contains:
  - `id`: Unique identifier for the Postgres changes subscription
  - `event`: The type of event the client is subscribed to, such as `INSERT`, `UPDATE`, `DELETE`, or `*`
  - `schema`: The schema of the table the client is subscribed to
  - `table`: The table the client is subscribed to

Example on protocol version `2.0.0`:

```
1
[\
2\
  "1",\
3\
  "1",\
4\
  "realtime:chat-room",\
5\
  "phx_reply",\
6\
  {\
7\
    "status": "ok",\
8\
    "response": {\
9\
      "postgres_changes": [\
10\
        {\
11\
          "id": 106243155,\
12\
          "event": "*",\
13\
          "schema": "public",\
14\
          "table": "test"\
15\
        }\
16\
      ]\
17\
    }\
18\
  }\
19\
]
```

#### system [\#](https://supabase.com/docs/guides/realtime/protocol\#system)

The server sends system messages to inform clients about the status of their Realtime channel subscriptions.

```
1
{
2
   "message": string,
3
   "status": string,
4
   "extension": string,
5
   "channel": string
6
}
```

- `message`: A human-readable message describing the status of the subscription.
- `status`: The status of the subscription, can be `ok`, `error`, or `timeout`.
- `extension`: The extension that sent the message.
- `channel`: The channel to which the message belongs, such as `realtime:room1`.

Example on protocol version `2.0.0`:

```
1
[\
2\
  "13",\
3\
  null,\
4\
  "realtime:chat-room",\
5\
  "system",\
6\
  {\
7\
    "message": "Subscribed to PostgreSQL",\
8\
    "status": "ok",\
9\
    "extension": "postgres_changes",\
10\
    "channel": "main"\
11\
  }\
12\
]
```

#### broadcast (text frame) [\#](https://supabase.com/docs/guides/realtime/protocol\#broadcast-text-frame)

This is the structure of broadcast events received by all clients subscribed to a channel. The `payload` field contains the event name and data that was broadcasted.

```
1
{
2
  "event": string,
3
  "meta" : {
4
    "id" : uuid,
5
    "replayed" : boolean
6
  },
7
  "payload": json,
8
  "type": "broadcast"
9
}
```

- `event`: The name of the user event to broadcast.
- `meta`: Metadata about the broadcast message. Not always present.
  - `id`: A unique identifier for the broadcast message in UUID format.
  - `replayed`: A boolean indicating whether the message is a replayed message. Not always present
- `payload`: The user data associated with the event, which can be any JSON-serializable data structure.
- `type`: The type of message, which must always be `broadcast` for broadcast messages.

Example on protocol version `2.0.0`:

```
1
[\
2\
  null,\
3\
  null,\
4\
  "realtime:chat-room",\
5\
  "broadcast",\
6\
  {\
7\
    "event": "message",\
8\
    "type": "broadcast",\
9\
    "meta": {\
10\
      "id": "006554ce-d22d-469c-877a-88bef47214a3"\
11\
    },\
12\
    "payload": {\
13\
      "id": "513edcc1-4cbc-4274-aa26-c195f7e8c090",\
14\
      "content": "oi",\
15\
      "username": "hpK9jN2iY-I2HioHWr5ml",\
16\
      "createdAt": "2025-11-18T22:44:29Z"\
17\
    }\
18\
  }\
19\
]
```

#### broadcast (binary frame) [\#](https://supabase.com/docs/guides/realtime/protocol\#broadcast-binary-frame)

See the [User Broadcast](https://supabase.com/docs/guides/realtime/protocol#user-broadcast) section for the binary frame structure.

This message is a streamlined version of the text frame broadcast event that also supports non-JSON payloads.
Below is the same example from the previous section, showing the binary frame structure with hexadecimal values for the header and plain text for the remaining fields:

- Topic: `realtime:chat-room`
- Payload encoding being JSON
- Metadata: `{"id":"006554ce-d22d-469c-877a-88bef47214a3"}`
- User Event: `message`
- User Payload

```
1
0x04                                          // Type
2
0x12                                          // Topic Size
3
0x07                                          // User Event Size
4
0x2D                                          // Metadata Size
5
0x01                                          // Payload Encoding (1 = JSON)
6
realtime:chat-room                            // Topic
7
message                                       // User Event
8
{"id":"006554ce-d22d-469c-877a-88bef47214a3"} // Metadata
9
{                                             // User Event Payload
10
  "id": "513edcc1-4cbc-4274-aa26-c195f7e8c090",
11
  "content": "oi",
12
  "username": "hpK9jN2iY-I2HioHWr5ml",
13
  "createdAt": "2025-11-18T22:44:29Z"
14
}
```

The metadata field is JSON encoded. The payload encoding is just a hint for the client to know if the payload should be treated as JSON or not.

#### postgres\_changes [\#](https://supabase.com/docs/guides/realtime/protocol\#postgreschanges)

The server sends this message when a database change occurs in a subscribed schema and table. The payload contains the details of the change, including the schema, table, event type, and the new and old records.

```
1
{
2
   "ids": [\
3\
      number\
4\
   ],
5
   "data": {
6
      "schema": string,
7
      "table": string,
8
      "commit_timestamp": string,
9
      "type": "*" | "INSERT" | "UPDATE" | "DELETE",
10
      "columns": [\
11\
        {\
12\
          "name": string,\
13\
          "type": string\
14\
        }\
15\
      ]
16
      "record": {
17
         [key: string]: boolean | number | string | null
18
      },
19
      "old_record": {
20
         [key: string]: boolean | number | string | null
21
      },
22
      "errors": string | null
23
   }
24
}
```

- `ids`: An array of unique identifiers matching the subscription when joining the channel.
- `data`: An object containing the details of the change:
  - `schema`: The schema of the table where the change occurred.
  - `table`: The table where the change occurred.
  - `commit_timestamp`: The timestamp when the change was committed to the database.
  - `type`: The type of event that occurred, such as `INSERT`, `UPDATE`, `DELETE`, or `*` for all events.
  - `columns`: An array of objects representing the columns of the table, each containing:
    - `name`: The name of the column.
    - `type`: The data type of the column.
  - `record`: An object representing the new values after the change, with keys as column names and values as their corresponding values.
  - `old_record`: An object representing the old values before the change, with keys as column names and values as their corresponding values.
  - `errors`: Any errors that occurred during the change, if applicable.

```
1
[\
2\
  null,\
3\
  null,\
4\
  "realtime:chat-room",\
5\
  "postgres_changes",\
6\
  {\
7\
    "ids": [104868189],\
8\
    "data": {\
9\
      "schema": "public",\
10\
      "table": "test",\
11\
      "commit_timestamp": "2025-11-19T00:22:40.877Z",\
12\
      "type": "UPDATE",\
13\
      "columns": [\
14\
        {\
15\
          "name": "id",\
16\
          "type": "int8"\
17\
        },\
18\
        {\
19\
          "name": "created_at",\
20\
          "type": "timestamptz"\
21\
        },\
22\
        {\
23\
          "name": "text",\
24\
          "type": "text"\
25\
        }\
26\
      ],\
27\
      "record": {\
28\
        "id": 46,\
29\
        "text": "content",\
30\
        "created_at": "2025-11-03T09:32:55+00:00"\
31\
      },\
32\
      "old_record": {\
33\
        "id": 46\
34\
      },\
35\
      "errors": null\
36\
    }\
37\
  }\
38\
]
```

#### presence\_state [\#](https://supabase.com/docs/guides/realtime/protocol\#presencestate)

After joining, the server sends a `presence_state` message to a client with presence information. The payload field contains keys, where each key represents a client and its value is a JSON object containing information about that client. The key is defined by the client when joining the channel. If not specified, a UUID is automatically generated.

```
1
{
2
   [key: string]: {
3
      metas: [\
4\
         {\
5\
            phx_ref: string,\
6\
            [key: string]: any\
7\
         }\
8\
      ]
9
   }
10
}
```

- `key`: The client key.
- `metas`: An array of metadata objects for the client, each containing:
  - `phx_ref`: A unique reference ID for the metadata.
  - Any other custom fields defined by the client, such as `name`.

Example on protocol version `2.0.0`:

```
1
[\
2\
  "4",\
3\
  null,\
4\
  "realtime:cursor-room",\
5\
  "presence_state",\
6\
  {\
7\
    "2wCojG1xWgxG2ZxwocvSX": {\
8\
      "metas": [\
9\
        {\
10\
          "phx_ref": "GHlA1fShRjMmZhnL",\
11\
          "color": "hsl(204, 100%, 70%)",\
12\
          "key": "2wCojG1xWgxG2ZxwocvSX"\
13\
        }\
14\
      ]\
15\
    },\
16\
    "6eorYR7andHiq-7tCkmxQ": {\
17\
      "metas": [\
18\
        {\
19\
          "phx_ref": "GHk99Q_ez6-GzaeG",\
20\
          "color": "hsl(7, 100%, 70%)",\
21\
          "key": "6eorYR7andHiq-7tCkmxQ"\
22\
        }\
23\
      ]\
24\
    },\
25\
    "FOeQUamq3OLOWAAZK8iH3": {\
26\
      "metas": [\
27\
        {\
28\
          "phx_ref": "GHk-wA8Z61GGzeoG",\
29\
          "color": "hsl(212, 100%, 70%)",\
30\
          "key": "FOeQUamq3OLOWAAZK8iH3"\
31\
        }\
32\
      ]\
33\
    }\
34\
  }\
35\
]
```

#### presence\_diff [\#](https://supabase.com/docs/guides/realtime/protocol\#presencediff)

After a change to the presence state, such as a client joining or leaving, the server sends a presence\_diff message to update the client's view of the presence state. The payload field contains two keys, `joins` and `leaves`, which represent clients that have joined and left, respectively. Each key is either specified by the client when joining the channel or automatically generated as a UUID.

```
1
{
2
  "joins": {
3
    [key: string]: {
4
      metas: [\
5\
        {\
6\
          phx_ref: string,\
7\
          [key: string]: any\
8\
        }\
9\
      ]
10
    }
11
  },
12
  "leaves": {
13
    [key: string]: {
14
      metas: [\
15\
        {\
16\
          phx_ref: string,\
17\
          [key: string]: any\
18\
        }\
19\
      ]
20
    }
21
  }
22
}
```

- `joins`: An object containing metadata for clients that have joined the channel, with keys as UUIDs and values as metadata objects.
- `leaves`: An object containing metadata for clients that have left the channel, with keys as UUIDs and values as metadata objects.

Example on protocol version `2.0.0`:

```
1
[\
2\
  null,\
3\
  null,\
4\
  "realtime:cursor-room",\
5\
  "presence_diff",\
6\
  {\
7\
    "joins": {\
8\
      "XnAJXkZVEJuBYZcp9GCG5": {\
9\
        "metas": [\
10\
          {\
11\
            "phx_ref": "GHlE8VLvxuKGzQJN",\
12\
            "color": "hsl(60, 100%, 70%)",\
13\
            "user": "123"\
14\
          }\
15\
        ]\
16\
      }\
17\
    },\
18\
    "leaves": {\
19\
      "ouCsaiOdKZ9yauoy4x5pv": {\
20\
        "metas": [\
21\
          {\
22\
            "phx_ref": "GHlE8HyhSPAmZgdB",\
23\
            "color": "hsl(72, 100%, 70%)",\
24\
            "user": "456"\
25\
          }\
26\
        ]\
27\
      }\
28\
    }\
29\
  }\
30\
]
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/realtime/protocol.mdx)

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