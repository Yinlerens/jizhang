---
url: "https://supabase.com/docs/guides/functions/http-methods"
title: "Routing | Supabase Docs"
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

# Routing

## Handle different request types in a single function to create efficient APIs.

* * *

## Overview [\#](https://supabase.com/docs/guides/functions/http-methods\#overview)

Edge Functions support **`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, and `OPTIONS`**. This means you can build complete REST APIs in a single function:

```
1
Deno.serve(async (req) => {
2
  const { method, url } = req
3
  const { pathname } = new URL(url)
4

5
  // Route based on method and path
6
  if (method === 'GET' && pathname === '/users') {
7
    return getAllUsers()
8
  } else if (method === 'POST' && pathname === '/users') {
9
    return createUser(req)
10
  }
11

12
  return new Response('Not found', { status: 404 })
13
})
```

Edge Functions allow you to build APIs without needing separate functions for each endpoint. This reduces cold starts and simplifies deployment while keeping your code organized.

HTML content is not supported. `GET` requests that return `text/html` will be rewritten to `text/plain`. Edge Functions are designed for APIs and data processing, not serving web pages. Use Supabase for your backend API and your favorite frontend framework for HTML.

* * *

## Example [\#](https://supabase.com/docs/guides/functions/http-methods\#example)

Here's a full example of a RESTful API built with Edge Functions.

```
1
// Follow this setup guide to integrate the Deno language server with your editor:
2
// https://deno.land/manual/getting_started/setup_your_environment
3
// This enables autocomplete, go to definition, etc.
4

5
import { createClient, SupabaseClient } from 'npm:supabase-js@2'
6

7
const corsHeaders = {
8
  'Access-Control-Allow-Origin': '*',
9
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
10
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
11
}
12

13
interface Task {
14
  name: string
15
  status: number
16
}
17

18
async function getTask(supabaseClient: SupabaseClient, id: string) {
19
  const { data: task, error } = await supabaseClient.from('tasks').select('*').eq('id', id)
20
  if (error) throw error
21

22
  return new Response(JSON.stringify({ task }), {
23
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
24
    status: 200,
25
  })
26
}
27

28
async function getAllTasks(supabaseClient: SupabaseClient) {
29
  const { data: tasks, error } = await supabaseClient.from('tasks').select('*')
30
  if (error) throw error
31

32
  return new Response(JSON.stringify({ tasks }), {
33
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
34
    status: 200,
35
  })
36
}
37

38
async function deleteTask(supabaseClient: SupabaseClient, id: string) {
39
  const { error } = await supabaseClient.from('tasks').delete().eq('id', id)
40
  if (error) throw error
41

42
  return new Response(JSON.stringify({}), {
43
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
44
    status: 200,
45
  })
46
}
47

48
async function updateTask(supabaseClient: SupabaseClient, id: string, task: Task) {
49
  const { error } = await supabaseClient.from('tasks').update(task).eq('id', id)
50
  if (error) throw error
51

52
  return new Response(JSON.stringify({ task }), {
53
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
54
    status: 200,
55
  })
56
}
57

58
async function createTask(supabaseClient: SupabaseClient, task: Task) {
59
  const { error } = await supabaseClient.from('tasks').insert(task)
60
  if (error) throw error
61

62
  return new Response(JSON.stringify({ task }), {
63
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
64
    status: 200,
65
  })
66
}
67

68
Deno.serve(async (req) => {
69
  const { url, method } = req
70

71
  // This is needed if you're planning to invoke your function from a browser.
72
  if (method === 'OPTIONS') {
73
    return new Response('ok', { headers: corsHeaders })
74
  }
75

76
  try {
77
    // Create a Supabase client with the Auth context of the logged in user.
78
    const supabaseClient = createClient(
79
      // Supabase API URL - env var exported by default.
80
      Deno.env.get('SUPABASE_URL') ?? '',
81
      // Supabase API ANON KEY - env var exported by default.
82
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
83
      // Create client with Auth context of the user that called the function.
84
      // This way your row-level-security (RLS) policies are applied.
85
      {
86
        global: {
87
          headers: { Authorization: req.headers.get('Authorization')! },
88
        },
89
      }
90
    )
91

92
    // For more details on URLPattern, check https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
93
    const taskPattern = new URLPattern({ pathname: '/restful-tasks/:id' })
94
    const matchingPath = taskPattern.exec(url)
95
    const id = matchingPath ? matchingPath.pathname.groups.id : null
96

97
    let task = null
98
    if (method === 'POST' || method === 'PUT') {
99
      const body = await req.json()
100
      task = body.task
101
    }
102

103
    // call relevant method based on method and id
104
    switch (true) {
105
      case id && method === 'GET':
106
        return getTask(supabaseClient, id as string)
107
      case id && method === 'PUT':
108
        return updateTask(supabaseClient, id as string, task)
109
      case id && method === 'DELETE':
110
        return deleteTask(supabaseClient, id as string)
111
      case method === 'POST':
112
        return createTask(supabaseClient, task)
113
      case method === 'GET':
114
        return getAllTasks(supabaseClient)
115
      default:
116
        return getAllTasks(supabaseClient)
117
    }
118
  } catch (error) {
119
    console.error(error)
120

121
    return new Response(JSON.stringify({ error: error.message }), {
122
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
123
      status: 400,
124
    })
125
  }
126
})
```

[View source](https://github.com/supabase/supabase/blob/2fbb6cb9a7d6fb0a10f74b0a421af33038e557c7/examples/edge-functions/supabase/functions/restful-tasks/index.ts) [Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/http-methods.mdx)

### Is this helpful?

NoYes

### On this page

[Overview](https://supabase.com/docs/guides/functions/http-methods#overview) [Example](https://supabase.com/docs/guides/functions/http-methods#example)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)