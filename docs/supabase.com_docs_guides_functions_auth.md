---
url: "https://supabase.com/docs/guides/functions/auth"
title: "Integrating With Supabase Auth | Supabase Docs"
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

Edge Functions

1. [Edge Functions](https://supabase.com/docs/guides/functions)
3. Integrations
5. [Supabase Auth](https://supabase.com/docs/guides/functions/auth)

# Integrating With Supabase Auth

## Integrate Supabase Auth with Edge Functions

* * *

Edge Functions work seamlessly with [Supabase Auth](https://supabase.com/docs/guides/auth).

This allows you to:

- Automatically identify users through JWT tokens
- Enforce Row Level Security policies
- Seamlessly integrate with your existing auth flow

* * *

## Setting up auth context [\#](https://supabase.com/docs/guides/functions/auth\#setting-up-auth-context)

When a user makes a request to an Edge Function, you can use the `Authorization` header to set the Auth context in the Supabase client and enforce Row Level Security policies.

```
1
import { createClient } from 'npm:@supabase/supabase-js@2'
2

3
Deno.serve(async (req: Request) => {
4
  const supabaseClient = createClient(
5
    Deno.env.get('SUPABASE_URL') ?? '',
6
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
7
    // Create client with Auth context of the user that called the function.
8
    // This way your row-level-security (RLS) policies are applied.
9
    {
10
      global: {
11
        headers: { Authorization: req.headers.get('Authorization')! },
12
      },
13
    }
14
  );
15

16
  //...
17
})
```

Importantly, this is done _inside_ the `Deno.serve()` callback argument, so that the `Authorization` header is set for each individual request!

* * *

## Fetching the user [\#](https://supabase.com/docs/guides/functions/auth\#fetching-the-user)

By getting the JWT from the `Authorization` header, you can provide the token to `getUser()` to fetch the user object to obtain metadata for the logged in user.

```
1
Deno.serve(async (req: Request) => {
2
  // ...
3
  const authHeader = req.headers.get('Authorization')!
4
  const token = authHeader.replace('Bearer ', '')
5
  const { data } = await supabaseClient.auth.getUser(token)
6
  // ...
7
})
```

* * *

## Row Level Security [\#](https://supabase.com/docs/guides/functions/auth\#row-level-security)

After initializing a Supabase client with the Auth context, all queries will be executed with the context of the user. For database queries, this means [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) will be enforced.

```
1
import { createClient } from 'npm:@supabase/supabase-js@2'
2

3
Deno.serve(async (req: Request) => {
4
  // ...
5
  // This query respects RLS - users only see rows they have access to
6
  const { data, error } = await supabaseClient.from('profiles').select('*');
7

8
  if (error) {
9
    return new Response('Database error', { status: 500 })
10
  }
11

12
  // ...
13
})
```

* * *

## Example [\#](https://supabase.com/docs/guides/functions/auth\#example)

See the full [example on GitHub](https://github.com/supabase/supabase/blob/master/examples/edge-functions/supabase/functions/select-from-table-with-auth-rls/index.ts).

```
1
// Follow this setup guide to integrate the Deno language server with your editor:
2
// https://deno.land/manual/getting_started/setup_your_environment
3
// This enables autocomplete, go to definition, etc.
4

5
import { createClient } from 'npm:supabase-js@2'
6
import { corsHeaders } from '../_shared/cors.ts'
7

8
console.log(`Function "select-from-table-with-auth-rls" up and running!`)
9

10
Deno.serve(async (req: Request) => {
11
  // This is needed if you're planning to invoke your function from a browser.
12
  if (req.method === 'OPTIONS') {
13
    return new Response('ok', { headers: corsHeaders })
14
  }
15

16
  try {
17
    // Create a Supabase client with the Auth context of the logged in user.
18
    const supabaseClient = createClient(
19
      // Supabase API URL - env var exported by default.
20
      Deno.env.get('SUPABASE_URL') ?? '',
21
      // Supabase API ANON KEY - env var exported by default.
22
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
23
      // Create client with Auth context of the user that called the function.
24
      // This way your row-level-security (RLS) policies are applied.
25
      {
26
        global: {
27
          headers: { Authorization: req.headers.get('Authorization')! },
28
        },
29
      }
30
    )
31

32
    // First get the token from the Authorization header
33
    const token = req.headers.get('Authorization').replace('Bearer ', '')
34

35
    // Now we can get the session or user object
36
    const {
37
      data: { user },
38
    } = await supabaseClient.auth.getUser(token)
39

40
    // And we can run queries in the context of our authenticated user
41
    const { data, error } = await supabaseClient.from('users').select('*')
42
    if (error) throw error
43

44
    return new Response(JSON.stringify({ user, data }), {
45
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
46
      status: 200,
47
    })
48
  } catch (error) {
49
    return new Response(JSON.stringify({ error: error.message }), {
50
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
51
      status: 400,
52
    })
53
  }
54
})
55

56
// To invoke:
57
// curl -i --location --request POST 'http://localhost:54321/functions/v1/select-from-table-with-auth-rls' \
58
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
59
//   --header 'Content-Type: application/json' \
60
//   --data '{"name":"Functions"}'
```

[View source](https://github.com/supabase/supabase/blob/d3ca2a5a4b6a2e8984cb9228e664cfed1423f2ac/examples/edge-functions/supabase/functions/select-from-table-with-auth-rls/index.ts) [Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/auth.mdx)

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