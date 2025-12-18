---
url: "https://supabase.com/docs/guides/queues/consuming-messages-with-edge-functions"
title: "Consuming Supabase Queue Messages with Edge Functions | Supabase Docs"
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
3. Getting Started
5. [Consuming Messages with Edge Functions](https://supabase.com/docs/guides/queues/consuming-messages-with-edge-functions)

# Consuming Supabase Queue Messages with Edge Functions

## Learn how to consume Supabase Queue messages server-side with a Supabase Edge Function

* * *

This guide helps you read & process queue messages server-side with a Supabase Edge Function. Read [Queues API Reference](https://supabase.com/docs/guides/queues/api) for more details on our API.

## Concepts [\#](https://supabase.com/docs/guides/queues/consuming-messages-with-edge-functions\#concepts)

Supabase Queues is a pull-based Message Queue consisting of three main components: Queues, Messages, and Queue Types. You should already be familiar with the [Queues Quickstart](https://supabase.com/docs/guides/queues/quickstart).

### Consuming messages in an Edge Function [\#](https://supabase.com/docs/guides/queues/consuming-messages-with-edge-functions\#consuming-messages-in-an-edge-function)

This is a Supabase Edge Function that reads 5 messages off the queue, processes each of them, and deletes each message when it is done.

```
1
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
2
import { createClient } from 'npm:@supabase/supabase-js@2'
3

4
const supabaseUrl = 'supabaseURL'
5
const supabaseKey = 'supabaseKey'
6

7
const supabase = createClient(supabaseUrl, supabaseKey)
8
const queueName = 'your_queue_name'
9

10
// Type definition for queue messages
11
interface QueueMessage {
12
  msg_id: bigint
13
  read_ct: number
14
  vt: string
15
  enqueued_at: string
16
  message: any
17
}
18

19
async function processMessage(message: QueueMessage) {
20
  //
21
  // Do whatever logic you need to with the message content
22
  //
23
  // Delete the message from the queue
24
  const { error: deleteError } = await supabase.schema('pgmq_public').rpc('delete', {
25
    queue_name: queueName,
26
    msg_id: message.msg_id,
27
  })
28

29
  if (deleteError) {
30
    console.error(`Failed to delete message ${message.msg_id}:`, deleteError)
31
  } else {
32
    console.log(`Message ${message.msg_id} deleted from queue`)
33
  }
34
}
35

36
Deno.serve(async (req) => {
37
  const { data: messages, error } = await supabase.schema('pgmq_public').rpc('read', {
38
    queue_name: queueName,
39
    sleep_seconds: 0, // Don't wait if queue is empty
40
    n: 5, // Read 5 messages off the queue
41
  })
42

43
  if (error) {
44
    console.error(`Error reading from ${queueName} queue:`, error)
45
    return new Response(JSON.stringify({ error: error.message }), {
46
      status: 500,
47
      headers: { 'Content-Type': 'application/json' },
48
    })
49
  }
50

51
  if (!messages || messages.length === 0) {
52
    console.log('No messages in workflow_messages queue')
53
    return new Response(JSON.stringify({ message: 'No messages in queue' }), {
54
      status: 200,
55
      headers: { 'Content-Type': 'application/json' },
56
    })
57
  }
58

59
  console.log(`Found ${messages.length} messages to process`)
60

61
  // Process each message that was read off the queue
62
  for (const message of messages) {
63
    try {
64
      await processMessage(message as QueueMessage)
65
    } catch (error) {
66
      console.error(`Error processing message ${message.msg_id}:`, error)
67
    }
68
  }
69

70
  // Return immediately while background processing continues
71
  return new Response(
72
    JSON.stringify({
73
      message: `Processing ${messages.length} messages in background`,
74
      count: messages.length,
75
    }),
76
    {
77
      status: 200,
78
      headers: { 'Content-Type': 'application/json' },
79
    }
80
  )
81
})
```

Every time this Edge Function is run it:

1. Read 5 messages off the queue
2. Call the `processMessage` function
3. At the end of `processMessage`, the message is deleted from the queue
4. If `processMessage` throws an error, the error is logged. In this case, the message is still in the queue, so the next time this Edge Function runs it reads the message again.

You might find this kind of setup handy to run with [Supabase Cron](https://supabase.com/docs/guides/cron). You can set up Cron so that every N number of minutes or seconds, the Edge Function will run and process a number of messages off the queue.

Similarly, you can invoke the Edge Function on command at any given time with [`supabase.functions.invoke`](https://supabase.com/docs/guides/functions/quickstart-dashboard#usage).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/queues/consuming-messages-with-edge-functions.mdx)

### Is this helpful?

NoYes

### On this page

[Concepts](https://supabase.com/docs/guides/queues/consuming-messages-with-edge-functions#concepts) [Consuming messages in an Edge Function](https://supabase.com/docs/guides/queues/consuming-messages-with-edge-functions#consuming-messages-in-an-edge-function)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)