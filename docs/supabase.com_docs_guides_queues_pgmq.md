---
url: "https://supabase.com/docs/guides/queues/pgmq"
title: "PGMQ Extension | Supabase Docs"
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

[Queues](https://supabase.com/docs/guides/queues)

[Overview](https://supabase.com/docs/guides/queues)

Getting Started[Quickstart](https://supabase.com/docs/guides/queues/quickstart)
[Consuming Messages with Edge Functions](https://supabase.com/docs/guides/queues/consuming-messages-with-edge-functions)
[Expose Queues for local and self-hosted Supabase](https://supabase.com/docs/guides/queues/expose-self-hosted-queues)

References[API](https://supabase.com/docs/guides/queues/api)
[PGMQ Extension](https://supabase.com/docs/guides/queues/pgmq)

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

Queues

1. [Queues](https://supabase.com/docs/guides/queues)
3. References
5. [PGMQ Extension](https://supabase.com/docs/guides/queues/pgmq)

# PGMQ Extension

* * *

pgmq is a lightweight message queue built on Postgres.

## Features [\#](https://supabase.com/docs/guides/queues/pgmq\#features)

- Lightweight - No background worker or external dependencies, just Postgres functions packaged in an extension
- "exactly once" delivery of messages to a consumer within a visibility timeout
- API parity with AWS SQS and RSMQ
- Messages stay in the queue until explicitly removed
- Messages can be archived, instead of deleted, for long-term retention and replayability

## Enable the extension [\#](https://supabase.com/docs/guides/queues/pgmq\#enable-the-extension)

```
1
create extension pgmq;
```

## Usage [\#](https://supabase.com/docs/guides/queues/pgmq\#get-usage)

### Queue management [\#](https://supabase.com/docs/guides/queues/pgmq\#queue-management)

#### `create` [\#](https://supabase.com/docs/guides/queues/pgmq\#create)

Create a new queue.

```
1
pgmq.create(queue_name text)
2
returns void
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| queue\_name | text | The name of the queue |

Example:

```
1
select from pgmq.create('my_queue');
2
 create
3
--------
```

#### `create_unlogged` [\#](https://supabase.com/docs/guides/queues/pgmq\#createunlogged)

Creates an unlogged table. This is useful when write throughput is more important than durability.
See Postgres documentation for [unlogged tables](https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-UNLOGGED) for more information.

```
1
pgmq.create_unlogged(queue_name text)
2
returns void
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| queue\_name | text | The name of the queue |

Example:

```
1
select pgmq.create_unlogged('my_unlogged');
2
 create_unlogged
3
-----------------
```

* * *

#### `detach_archive` [\#](https://supabase.com/docs/guides/queues/pgmq\#detacharchive)

Drop the queue's archive table as a member of the PGMQ extension. Useful for preventing the queue's archive table from being dropped when `drop extension pgmq` is executed.
This does not prevent the further archives() from appending to the archive table.

```
1
pgmq.detach_archive(queue_name text)
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| queue\_name | text | The name of the queue |

Example:

```
1
select * from pgmq.detach_archive('my_queue');
2
 detach_archive
3
----------------
```

* * *

#### `drop_queue` [\#](https://supabase.com/docs/guides/queues/pgmq\#dropqueue)

Deletes a queue and its archive table.

```
1
pgmq.drop_queue(queue_name text)
2
returns boolean
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| queue\_name | text | The name of the queue |

Example:

```
1
select * from pgmq.drop_queue('my_unlogged');
2
 drop_queue
3
------------
4
 t
```

### Sending messages [\#](https://supabase.com/docs/guides/queues/pgmq\#sending-messages)

#### `send` [\#](https://supabase.com/docs/guides/queues/pgmq\#send)

Send a single message to a queue.

```
1
pgmq.send(
2
    queue_name text,
3
    msg jsonb,
4
    delay integer default 0
5
)
6
returns setof bigint
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `queue_name` | `text` | The name of the queue |
| `msg` | `jsonb` | The message to send to the queue |
| `delay` | `integer` | Time in seconds before the message becomes visible. Defaults to 0. |

Example:

```
1
select * from pgmq.send('my_queue', '{"hello": "world"}');
2
 send
3
------
4
    4
```

* * *

#### `send_batch` [\#](https://supabase.com/docs/guides/queues/pgmq\#sendbatch)

Send 1 or more messages to a queue.

```
1
pgmq.send_batch(
2
    queue_name text,
3
    msgs jsonb[],
4
    delay integer default 0
5
)
6
returns setof bigint
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `queue_name` | `text` | The name of the queue |
| `msgs` | `jsonb[]` | Array of messages to send to the queue |
| `delay` | `integer` | Time in seconds before the messages becomes visible. Defaults to 0. |

```
1
select * from pgmq.send_batch(
2
    'my_queue',
3
    array[\
4\
      '{"hello": "world_0"}'::jsonb,\
5\
      '{"hello": "world_1"}'::jsonb\
6\
    ]
7
);
8
 send_batch
9
------------
10
          1
11
          2
```

* * *

### Reading messages [\#](https://supabase.com/docs/guides/queues/pgmq\#reading-messages)

#### `read` [\#](https://supabase.com/docs/guides/queues/pgmq\#read)

Read 1 or more messages from a queue. The VT specifies the duration of time in seconds that the message is invisible to other consumers. At the end of that duration, the message is visible again and could be read by other consumers.

```
1
pgmq.read(
2
    queue_name text,
3
    vt integer,
4
    qty integer
5
)
6

7
returns setof pgmq.message_record
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `queue_name` | `text` | The name of the queue |
| `vt` | `integer` | Time in seconds that the message become invisible after reading |
| `qty` | `integer` | The number of messages to read from the queue. Defaults to 1 |

Example:

```
1
select * from pgmq.read('my_queue', 10, 2);
2
 msg_id | read_ct |          enqueued_at          |              vt               |       message
3
--------+---------+-------------------------------+-------------------------------+----------------------
4
      1 |       1 | 2023-10-28 19:14:47.356595-05 | 2023-10-28 19:17:08.608922-05 | {"hello": "world_0"}
5
      2 |       1 | 2023-10-28 19:14:47.356595-05 | 2023-10-28 19:17:08.608974-05 | {"hello": "world_1"}
6
(2 rows)
```

* * *

#### `read_with_poll` [\#](https://supabase.com/docs/guides/queues/pgmq\#readwithpoll)

Same as read(). Also provides convenient long-poll functionality.
When there are no messages in the queue, the function call will wait for `max_poll_seconds` in duration before returning.
If messages reach the queue during that duration, they will be read and returned immediately.

```
1
pgmq.read_with_poll(
2
    queue_name text,
3
    vt integer,
4
    qty integer,
5
    max_poll_seconds integer default 5,
6
    poll_interval_ms integer default 100
7
)
8
returns setof pgmq.message_record
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `queue_name` | `text` | The name of the queue |
| `vt` | `integer` | Time in seconds that the message become invisible after reading. |
| `qty` | `integer` | The number of messages to read from the queue. Defaults to 1. |
| `max_poll_seconds` | `integer` | Time in seconds to wait for new messages to reach the queue. Defaults to 5. |
| `poll_interval_ms` | `integer` | Milliseconds between the internal poll operations. Defaults to 100. |

Example:

```
1
select * from pgmq.read_with_poll('my_queue', 1, 1, 5, 100);
2
 msg_id | read_ct |          enqueued_at          |              vt               |      message
3
--------+---------+-------------------------------+-------------------------------+--------------------
4
      1 |       1 | 2023-10-28 19:09:09.177756-05 | 2023-10-28 19:27:00.337929-05 | {"hello": "world"}
```

* * *

#### `pop` [\#](https://supabase.com/docs/guides/queues/pgmq\#pop)

Reads a single message from a queue and deletes it upon read.

Note: utilization of pop() results in at-most-once delivery semantics if the consuming application does not guarantee processing of the message.

```
1
pgmq.pop(queue_name text)
2
returns setof pgmq.message_record
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| queue\_name | text | The name of the queue |

Example:

```
1
pgmq=# select * from pgmq.pop('my_queue');
2
 msg_id | read_ct |          enqueued_at          |              vt               |      message
3
--------+---------+-------------------------------+-------------------------------+--------------------
4
      1 |       2 | 2023-10-28 19:09:09.177756-05 | 2023-10-28 19:27:00.337929-05 | {"hello": "world"}
```

* * *

### Deleting/Archiving messages [\#](https://supabase.com/docs/guides/queues/pgmq\#deletingarchiving-messages)

#### `delete` (single) [\#](https://supabase.com/docs/guides/queues/pgmq\#delete-single)

Deletes a single message from a queue.

```
1
pgmq.delete (queue_name text, msg_id: bigint)
2
returns boolean
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `queue_name` | `text` | The name of the queue |
| `msg_id` | `bigint` | Message ID of the message to delete |

Example:

```
1
select pgmq.delete('my_queue', 5);
2
 delete
3
--------
4
 t
```

* * *

#### `delete` (batch) [\#](https://supabase.com/docs/guides/queues/pgmq\#delete-batch)

Delete one or many messages from a queue.

```
1
pgmq.delete (queue_name text, msg_ids: bigint[])
2
returns setof bigint
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `queue_name` | `text` | The name of the queue |
| `msg_ids` | `bigint[]` | Array of message IDs to delete |

Examples:

Delete two messages that exist.

```
1
select * from pgmq.delete('my_queue', array[2, 3]);
2
 delete
3
--------
4
      2
5
      3
```

Delete two messages, one that exists and one that does not. Message `999` does not exist.

```
1
select * from pgmq.delete('my_queue', array[6, 999]);
2
 delete
3
--------
4
      6
```

* * *

#### `purge_queue` [\#](https://supabase.com/docs/guides/queues/pgmq\#purgequeue)

Permanently deletes all messages in a queue. Returns the number of messages that were deleted.

```
1
purge_queue(queue_name text)
2
returns bigint
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| queue\_name | text | The name of the queue |

Example:

Purge the queue when it contains 8 messages;

```
1
select * from pgmq.purge_queue('my_queue');
2
 purge_queue
3
-------------
4
           8
```

* * *

#### `archive` (single) [\#](https://supabase.com/docs/guides/queues/pgmq\#archive-single)

Removes a single requested message from the specified queue and inserts it into the queue's archive.

```
1
pgmq.archive(queue_name text, msg_id bigint)
2
returns boolean
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `queue_name` | `text` | The name of the queue |
| `msg_id` | `bigint` | Message ID of the message to archive |

Returns
Boolean value indicating success or failure of the operation.

Example; remove message with ID 1 from queue `my_queue` and archive it:

```
1
select * from pgmq.archive('my_queue', 1);
2
 archive
3
---------
4
       t
```

* * *

#### `archive` (batch) [\#](https://supabase.com/docs/guides/queues/pgmq\#archive-batch)

Deletes a batch of requested messages from the specified queue and inserts them into the queue's archive.
Returns an array of message ids that were successfully archived.

```
1
pgmq.archive(queue_name text, msg_ids bigint[])
2
RETURNS SETOF bigint
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `queue_name` | `text` | The name of the queue |
| `msg_ids` | `bigint[]` | Array of message IDs to archive |

Examples:

Delete messages with ID 1 and 2 from queue `my_queue` and move to the archive.

```
1
select * from pgmq.archive('my_queue', array[1, 2]);
2
 archive
3
---------
4
       1
5
       2
```

Delete messages 4, which exists and 999, which does not exist.

```
1
select * from pgmq.archive('my_queue', array[4, 999]);
2
 archive
3
---------
4
       4
```

* * *

### Utilities [\#](https://supabase.com/docs/guides/queues/pgmq\#utilities)

#### `set_vt` [\#](https://supabase.com/docs/guides/queues/pgmq\#setvt)

Sets the visibility timeout of a message to a specified time duration in the future. Returns the record of the message that was updated.

```
1
pgmq.set_vt(
2
    queue_name text,
3
    msg_id bigint,
4
    vt_offset integer
5
)
6
returns pgmq.message_record
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `queue_name` | `text` | The name of the queue |
| `msg_id` | `bigint` | ID of the message to set visibility time |
| `vt_offset` | `integer` | Duration from now, in seconds, that the message's VT should be set to |

Example:

Set the visibility timeout of message 1 to 30 seconds from now.

```
1
select * from pgmq.set_vt('my_queue', 11, 30);
2
 msg_id | read_ct |          enqueued_at          |              vt               |       message
3
--------+---------+-------------------------------+-------------------------------+----------------------
4
     1 |       0 | 2023-10-28 19:42:21.778741-05 | 2023-10-28 19:59:34.286462-05 | {"hello": "world_0"}
```

* * *

#### `list_queues` [\#](https://supabase.com/docs/guides/queues/pgmq\#listqueues)

List all the queues that currently exist.

```
1
list_queues()
2
RETURNS TABLE(
3
    queue_name text,
4
    created_at timestamp with time zone,
5
    is_partitioned boolean,
6
    is_unlogged boolean
7
)
```

Example:

```
1
select * from pgmq.list_queues();
2
      queue_name      |          created_at           | is_partitioned | is_unlogged
3
----------------------+-------------------------------+----------------+-------------
4
 my_queue             | 2023-10-28 14:13:17.092576-05 | f              | f
5
 my_partitioned_queue | 2023-10-28 19:47:37.098692-05 | t              | f
6
 my_unlogged          | 2023-10-28 20:02:30.976109-05 | f              | t
```

* * *

#### `metrics` [\#](https://supabase.com/docs/guides/queues/pgmq\#metrics)

Get metrics for a specific queue.

```
1
pgmq.metrics(queue_name: text)
2
returns table(
3
    queue_name text,
4
    queue_length bigint,
5
    newest_msg_age_sec integer,
6
    oldest_msg_age_sec integer,
7
    total_messages bigint,
8
    scrape_time timestamp with time zone
9
)
```

**Parameters:**

| Parameter | Type | Description |
| :-- | :-- | :-- |
| queue\_name | text | The name of the queue |

**Returns:**

\| Attribute \| Type \| Description \|
\| :\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \| :\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \| :\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \| \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \|
\| `queue_name` \| `text` \| The name of the queue \|
\| `queue_length` \| `bigint` \| Number of messages currently in the queue \|
\| `newest_msg_age_sec` \| `integer                   | null` \| Age of the newest message in the queue, in seconds \|
\| `oldest_msg_age_sec` \| `integer                   | null` \| Age of the oldest message in the queue, in seconds \|
\| `total_messages` \| `bigint` \| Total number of messages that have passed through the queue over all time \|
\| `scrape_time` \| `timestamp with time zone` \| The current timestamp \|

Example:

```
1
select * from pgmq.metrics('my_queue');
2
 queue_name | queue_length | newest_msg_age_sec | oldest_msg_age_sec | total_messages |          scrape_time
3
------------+--------------+--------------------+--------------------+----------------+-------------------------------
4
 my_queue   |           16 |               2445 |               2447 |             35 | 2023-10-28 20:23:08.406259-05
```

* * *

#### `metrics_all` [\#](https://supabase.com/docs/guides/queues/pgmq\#metricsall)

Get metrics for all existing queues.

```
1
pgmq.metrics_all()
2
RETURNS TABLE(
3
    queue_name text,
4
    queue_length bigint,
5
    newest_msg_age_sec integer,
6
    oldest_msg_age_sec integer,
7
    total_messages bigint,
8
    scrape_time timestamp with time zone
9
)
```

**Returns:**

\| Attribute \| Type \| Description \|
\| :\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \| :\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \| :\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \| \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \|
\| `queue_name` \| `text` \| The name of the queue \|
\| `queue_length` \| `bigint` \| Number of messages currently in the queue \|
\| `newest_msg_age_sec` \| `integer                   | null` \| Age of the newest message in the queue, in seconds \|
\| `oldest_msg_age_sec` \| `integer                   | null` \| Age of the oldest message in the queue, in seconds \|
\| `total_messages` \| `bigint` \| Total number of messages that have passed through the queue over all time \|
\| `scrape_time` \| `timestamp with time zone` \| The current timestamp \|

```
1
select * from pgmq.metrics_all();
2
      queue_name      | queue_length | newest_msg_age_sec | oldest_msg_age_sec | total_messages |          scrape_time
3
----------------------+--------------+--------------------+--------------------+----------------+-------------------------------
4
 my_queue             |           16 |               2563 |               2565 |             35 | 2023-10-28 20:25:07.016413-05
5
 my_partitioned_queue |            1 |                 11 |                 11 |              1 | 2023-10-28 20:25:07.016413-05
6
 my_unlogged          |            1 |                  3 |                  3 |              1 | 2023-10-28 20:25:07.016413-05
```

### Types [\#](https://supabase.com/docs/guides/queues/pgmq\#types)

#### `message_record` [\#](https://supabase.com/docs/guides/queues/pgmq\#messagerecord)

The complete representation of a message in a queue.

| Attribute Name | Type | Description |
| :-- | :-- | :-- |
| `msg_id` | `bigint` | Unique ID of the message |
| `read_ct` | `bigint` | Number of times the message has been read. Increments on read(). |
| `enqueued_at` | `timestamp with time zone` | time that the message was inserted into the queue |
| `vt` | `timestamp with time zone` | Timestamp when the message will become available for consumers to read |
| `message` | `jsonb` | The message payload |

Example:

```
1
msg_id | read_ct |          enqueued_at          |              vt               |      message
2
--------+---------+-------------------------------+-------------------------------+--------------------
3
      1 |       1 | 2023-10-28 19:06:19.941509-05 | 2023-10-28 19:06:27.419392-05 | {"hello": "world"}
```

## Resources [\#](https://supabase.com/docs/guides/queues/pgmq\#resources)

- Official Docs: [pgmq/api](https://pgmq.github.io/pgmq/#creating-a-queue)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/queues/pgmq.mdx)

### Is this helpful?

NoYes

### On this page

[Features](https://supabase.com/docs/guides/queues/pgmq#features) [Enable the extension](https://supabase.com/docs/guides/queues/pgmq#enable-the-extension) [Usage](https://supabase.com/docs/guides/queues/pgmq#get-usage) [Queue management](https://supabase.com/docs/guides/queues/pgmq#queue-management) [Sending messages](https://supabase.com/docs/guides/queues/pgmq#sending-messages) [Reading messages](https://supabase.com/docs/guides/queues/pgmq#reading-messages) [Deleting/Archiving messages](https://supabase.com/docs/guides/queues/pgmq#deletingarchiving-messages) [Utilities](https://supabase.com/docs/guides/queues/pgmq#utilities) [Types](https://supabase.com/docs/guides/queues/pgmq#types) [Resources](https://supabase.com/docs/guides/queues/pgmq#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)