---
url: "https://supabase.com/docs/guides/queues/api"
title: "API | Supabase Docs"
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
5. [API](https://supabase.com/docs/guides/queues/api)

# API

* * *

When you create a Queue in Supabase, you can choose to create helper database functions in the `pgmq_public` schema. This schema exposes operations to manage Queue Messages to consumers client-side, but does not expose functions for creating or dropping Queues.

Database functions in `pgmq_public` can be exposed via Supabase Data API so consumers client-side can call them. Visit the [Quickstart](https://supabase.com/docs/guides/queues/quickstart) for an example.

### `pgmq_public.pop(queue_name)` [\#](https://supabase.com/docs/guides/queues/api\#pgmqpublicpopqueuename)

Retrieves the next available message and deletes it from the specified Queue.

- `queue_name` (`text`): Queue name

* * *

### `pgmq_public.send(queue_name, message, sleep_seconds)` [\#](https://supabase.com/docs/guides/queues/api\#pgmqpublicsendqueuename-message-sleepseconds)

Adds a Message to the specified Queue, optionally delaying its visibility to all consumers by a number of seconds.

- `queue_name` (`text`): Queue name
- `message` (`jsonb`): Message payload to send
- `sleep_seconds` (`integer`, optional): Delay message visibility by specified seconds. Defaults to 0

* * *

### `pgmq_public.send_batch(queue_name, messages, sleep_seconds)` [\#](https://supabase.com/docs/guides/queues/api\#pgmqpublicsendbatchqueuename-messages-sleepseconds)

Adds a batch of Messages to the specified Queue, optionally delaying their availability to all consumers by a number of seconds.

- `queue_name` (`text`): Queue name
- `messages` (`jsonb[]`): Array of message payloads to send
- `sleep_seconds` (`integer`, optional): Delay messages visibility by specified seconds. Defaults to 0

* * *

### `pgmq_public.archive(queue_name, message_id)` [\#](https://supabase.com/docs/guides/queues/api\#pgmqpublicarchivequeuename-messageid)

Archives a Message by moving it from the Queue table to the Queue's archive table.

- `queue_name` (`text`): Queue name
- `message_id` (`bigint`): ID of the Message to archive

* * *

### `pgmq_public.delete(queue_name, message_id)` [\#](https://supabase.com/docs/guides/queues/api\#pgmqpublicdeletequeuename-messageid)

Permanently deletes a Message from the specified Queue.

- `queue_name` (`text`): Queue name
- `message_id` (`bigint`): ID of the Message to delete

* * *

### `pgmq_public.read(queue_name, sleep_seconds, n)` [\#](https://supabase.com/docs/guides/queues/api\#pgmqpublicreadqueuename-sleepseconds-n)

Reads up to "n" Messages from the specified Queue with an optional "sleep\_seconds" (visibility timeout).

- `queue_name` (`text`): Queue name
- `sleep_seconds` (`integer`): Visibility timeout in seconds
- `n` (`integer`): Maximum number of Messages to read

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/queues/api.mdx)

### Is this helpful?

NoYes

### On this page

[pgmq\_public.pop(queue\_name)](https://supabase.com/docs/guides/queues/api#pgmqpublicpopqueuename) [pgmq\_public.send(queue\_name, message, sleep\_seconds)](https://supabase.com/docs/guides/queues/api#pgmqpublicsendqueuename-message-sleepseconds) [pgmq\_public.send\_batch(queue\_name, messages, sleep\_seconds)](https://supabase.com/docs/guides/queues/api#pgmqpublicsendbatchqueuename-messages-sleepseconds) [pgmq\_public.archive(queue\_name, message\_id)](https://supabase.com/docs/guides/queues/api#pgmqpublicarchivequeuename-messageid) [pgmq\_public.delete(queue\_name, message\_id)](https://supabase.com/docs/guides/queues/api#pgmqpublicdeletequeuename-messageid) [pgmq\_public.read(queue\_name, sleep\_seconds, n)](https://supabase.com/docs/guides/queues/api#pgmqpublicreadqueuename-sleepseconds-n)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)