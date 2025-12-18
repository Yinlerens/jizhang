---
url: "https://supabase.com/docs/guides/functions/routing"
title: "Handling Routing in Functions | Supabase Docs"
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

[Edge Functions](https://supabase.com/docs/guides/functions)

[Overview](https://supabase.com/docs/guides/functions)

Getting started[Quickstart (Dashboard)](https://supabase.com/docs/guides/functions/quickstart-dashboard)
[Quickstart (CLI)](https://supabase.com/docs/guides/functions/quickstart)
[Development Environment](https://supabase.com/docs/guides/functions/development-environment)
[Architecture](https://supabase.com/docs/guides/functions/architecture)

Configuration[Environment Variables](https://supabase.com/docs/guides/functions/secrets)
[Managing Dependencies](https://supabase.com/docs/guides/functions/dependencies)
[Function Configuration](https://supabase.com/docs/guides/functions/function-configuration)

Development[Error Handling](https://supabase.com/docs/guides/functions/error-handling)
[Routing](https://supabase.com/docs/guides/functions/routing)
[Deploy to Production](https://supabase.com/docs/guides/functions/deploy)

Debugging[Local Debugging with DevTools](https://supabase.com/docs/guides/functions/debugging-tools)
[Testing your Functions](https://supabase.com/docs/guides/functions/unit-test)
[Logging](https://supabase.com/docs/guides/functions/logging)
[Troubleshooting](https://supabase.com/docs/guides/functions/troubleshooting)

Platform[Regional invocations](https://supabase.com/docs/guides/functions/regional-invocation)
[Status codes](https://supabase.com/docs/guides/functions/status-codes)
[Limits](https://supabase.com/docs/guides/functions/limits)
[Pricing](https://supabase.com/docs/guides/functions/pricing)

Integrations[Supabase Auth](https://supabase.com/docs/guides/functions/auth)
[Supabase Database (Postgres)](https://supabase.com/docs/guides/functions/connect-to-postgres)
[Supabase Storage](https://supabase.com/docs/guides/functions/storage-caching)

Advanced Features[Background Tasks](https://supabase.com/docs/guides/functions/background-tasks)
[File Storage](https://supabase.com/docs/guides/functions/ephemeral-storage)
[WebSockets](https://supabase.com/docs/guides/functions/websockets)
[Custom Routing](https://supabase.com/docs/guides/functions/routing)
[Wasm Modules](https://supabase.com/docs/guides/functions/wasm)
[AI Models](https://supabase.com/docs/guides/functions/ai-models)

Examples[Auth Send Email Hook](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend)
[Building an MCP Server with mcp-lite](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite)
[CORS support for invoking from the browser](https://supabase.com/docs/guides/functions/cors)
[Scheduling Functions](https://supabase.com/docs/guides/functions/schedule-functions)
[Sending Push Notifications](https://supabase.com/docs/guides/functions/examples/push-notifications)
[Generating AI images](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator)
[Generating OG images](https://supabase.com/docs/guides/functions/examples/og-image)
[Semantic AI Search](https://supabase.com/docs/guides/functions/examples/semantic-search)
[CAPTCHA support with Cloudflare Turnstile](https://supabase.com/docs/guides/functions/examples/cloudflare-turnstile)
[Building a Discord Bot](https://supabase.com/docs/guides/functions/examples/discord-bot)
[Building a Telegram Bot](https://supabase.com/docs/guides/functions/examples/telegram-bot)
[Handling Stripe Webhooks](https://supabase.com/docs/guides/functions/examples/stripe-webhooks)
[Rate-limiting with Redis](https://supabase.com/docs/guides/functions/examples/rate-limiting)
[Taking Screenshots with Puppeteer](https://supabase.com/docs/guides/functions/examples/screenshots)
[Slack Bot responding to mentions](https://supabase.com/docs/guides/functions/examples/slack-bot-mention)
[Image Transformation & Optimization](https://supabase.com/docs/guides/functions/examples/image-manipulation)

Third-Party Tools[Dart Edge on Supabase](https://supabase.com/docs/guides/functions/dart-edge)
[mcp-lite (Model Context Protocol)](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite)
[Browserless.io](https://supabase.com/docs/guides/functions/examples/screenshots)
[Hugging Face](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning)
[Monitoring with Sentry](https://supabase.com/docs/guides/functions/examples/sentry-monitoring)
[OpenAI API](https://supabase.com/docs/guides/ai/examples/openai)
[React Email](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend)
[Sending Emails with Resend](https://supabase.com/docs/guides/functions/examples/send-emails)
[Upstash Redis](https://supabase.com/docs/guides/functions/examples/upstash-redis)
[Type-Safe SQL with Kysely](https://supabase.com/docs/guides/functions/kysely-postgres)
[Text To Speech with ElevenLabs](https://supabase.com/docs/guides/functions/examples/elevenlabs-generate-speech-stream)
[Speech Transcription with ElevenLabs](https://supabase.com/docs/guides/functions/examples/elevenlabs-transcribe-speech)

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

Edge Functions

1. [Edge Functions](https://supabase.com/docs/guides/functions)
3. Development
5. [Routing](https://supabase.com/docs/guides/functions/routing)

# Handling Routing in Functions

## Handle custom routing within Edge Functions.

* * *

Usually, an Edge Function is written to perform a single action (e.g. write a record to the database). However, if your app's logic is split into multiple Edge Functions, requests to each action may seem slower.

Each Edge Function needs to be booted before serving a request (known as cold starts). If an action is performed less frequently (e.g. deleting a record), there is a high chance of that function experiencing a cold start.

One way to reduce cold starts and increase performance is to combine multiple actions into a single Edge Function. This way only one instance needs to be booted and it can handle multiple requests to different actions.

This allows you to:

- Reduce cold starts by combining multiple actions into one function
- Build complete REST APIs in a single function
- Improve performance by keeping one instance warm for multiple endpoints

* * *

For example, we can use a single Edge Function to create a typical CRUD API (create, read, update, delete records).

To combine multiple endpoints into a single Edge Function, you can use web application frameworks such as [Express](https://expressjs.com/), [Oak](https://oakserver.github.io/oak/), or [Hono](https://hono.dev/).

* * *

## Basic routing example [\#](https://supabase.com/docs/guides/functions/routing\#basic-routing-example)

Here's a simple hello world example using some popular web frameworks:

DenoExpressOakHono

```
1
import { Hono } from 'jsr:@hono/hono'
2

3
const app = new Hono()
4

5
app.post('/hello-world', async (c) => {
6
  const { name } = await c.req.json()
7
  return new Response(`Hello ${name}!`)
8
})
9

10
app.get('/hello-world', (c) => {
11
  return new Response('Hello World!')
12
})
13

14
Deno.serve(app.fetch)
```

Within Edge Functions, paths should always be prefixed with the function name (in this case `hello-world`).

* * *

## Using route parameters [\#](https://supabase.com/docs/guides/functions/routing\#using-route-parameters)

You can use route parameters to capture values at specific URL segments (e.g. `/tasks/:taskId/notes/:noteId`).

Keep in mind paths must be prefixed by function name. Route parameters can only be used after the function name prefix.

DenoExpressOakHono

```
1
interface Task {
2
  id: string
3
  name: string
4
}
5

6
let tasks: Task[] = []
7

8
const router = new Map<string, (req: Request) => Promise<Response>>()
9

10
async function getAllTasks(): Promise<Response> {
11
  return new Response(JSON.stringify(tasks))
12
}
13

14
async function getTask(id: string): Promise<Response> {
15
  const task = tasks.find((t) => t.id === id)
16
  if (task) {
17
    return new Response(JSON.stringify(task))
18
  } else {
19
    return new Response('Task not found', { status: 404 })
20
  }
21
}
22

23
async function createTask(req: Request): Promise<Response> {
24
  const id = Math.random().toString(36).substring(7)
25
  const task = { id, name: '' }
26
  tasks.push(task)
27
  return new Response(JSON.stringify(task), { status: 201 })
28
}
29

30
async function updateTask(id: string, req: Request): Promise<Response> {
31
  const index = tasks.findIndex((t) => t.id === id)
32
  if (index !== -1) {
33
    tasks[index] = { ...tasks[index] }
34
    return new Response(JSON.stringify(tasks[index]))
35
  } else {
36
    return new Response('Task not found', { status: 404 })
37
  }
38
}
39

40
async function deleteTask(id: string): Promise<Response> {
41
  const index = tasks.findIndex((t) => t.id === id)
42
  if (index !== -1) {
43
    tasks.splice(index, 1)
44
    return new Response('Task deleted successfully')
45
  } else {
46
    return new Response('Task not found', { status: 404 })
47
  }
48
}
49

50
Deno.serve(async (req) => {
51
  const url = new URL(req.url)
52
  const method = req.method
53
  // Extract the last part of the path as the command
54
  const command = url.pathname.split('/').pop()
55
  // Assuming the last part of the path is the task ID
56
  const id = command
57
  try {
58
    switch (method) {
59
      case 'GET':
60
        if (id) {
61
          return getTask(id)
62
        } else {
63
          return getAllTasks()
64
        }
65
      case 'POST':
66
        return createTask(req)
67
      case 'PUT':
68
        if (id) {
69
          return updateTask(id, req)
70
        } else {
71
          return new Response('Bad Request', { status: 400 })
72
        }
73
      case 'DELETE':
74
        if (id) {
75
          return deleteTask(id)
76
        } else {
77
          return new Response('Bad Request', { status: 400 })
78
        }
79
      default:
80
        return new Response('Method Not Allowed', { status: 405 })
81
    }
82
  } catch (error) {
83
    return new Response(`Internal Server Error: ${error}`, { status: 500 })
84
  }
85
})
```

* * *

## URL Patterns API [\#](https://supabase.com/docs/guides/functions/routing\#url-patterns-api)

If you prefer not to use a web framework, you can directly use [URL Pattern API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API) within your Edge Functions to implement routing.

This works well for small apps with only a couple of routes:

```
1
// ...
2

3
    // For more details on URLPattern, check https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
4
    const taskPattern = new URLPattern({ pathname: '/restful-tasks/:id' })
5
    const matchingPath = taskPattern.exec(url)
6
    const id = matchingPath ? matchingPath.pathname.groups.id : null
7

8
    let task = null
9
    if (method === 'POST' || method === 'PUT') {
10
      const body = await req.json()
11
      task = body.task
12
    }
13

14
    // call relevant method based on method and id
15
    switch (true) {
16
      case id && method === 'GET':
17
        return getTask(supabaseClient, id as string)
18
      case id && method === 'PUT':
19
        return updateTask(supabaseClient, id as string, task)
20
      case id && method === 'DELETE':
21
        return deleteTask(supabaseClient, id as string)
22
      case method === 'POST':
23
        return createTask(supabaseClient, task)
24
      case method === 'GET':
25
        return getAllTasks(supabaseClient)
26
      default:
27
        return getAllTasks(supabaseClient)
28

29
    // ...
```

[View source](https://github.com/supabase/supabase/blob/2fbb6cb9a7d6fb0a10f74b0a421af33038e557c7/examples/edge-functions/supabase/functions/restful-tasks/index.ts) [Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/routing.mdx)

### Is this helpful?

NoYes

### On this page

[Basic routing example](https://supabase.com/docs/guides/functions/routing#basic-routing-example) [Using route parameters](https://supabase.com/docs/guides/functions/routing#using-route-parameters) [URL Patterns API](https://supabase.com/docs/guides/functions/routing#url-patterns-api)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)