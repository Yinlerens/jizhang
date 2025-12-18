---
url: "https://supabase.com/docs/guides/functions/examples/sentry-monitoring"
title: "Monitoring with Sentry | Supabase Docs"
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
3. Third-Party Tools
5. [Monitoring with Sentry](https://supabase.com/docs/guides/functions/examples/sentry-monitoring)

# Monitoring with Sentry

* * *

Add the [Sentry Deno SDK](https://docs.sentry.io/platforms/javascript/guides/deno/) to your Supabase Edge Functions to track exceptions and get notified of errors or performance issues.

### Prerequisites [\#](https://supabase.com/docs/guides/functions/examples/sentry-monitoring\#prerequisites)

- [Create a Sentry account](https://sentry.io/signup/).
- Make sure you have the latest version of the [Supabase CLI](https://supabase.com/docs/guides/cli#installation) installed.

### 1\. Create Supabase function [\#](https://supabase.com/docs/guides/functions/examples/sentry-monitoring\#1-create-supabase-function)

Create a new function locally:

```
1
supabase functions new sentryfied
```

### 2\. Add the Sentry Deno SDK [\#](https://supabase.com/docs/guides/functions/examples/sentry-monitoring\#2-add-the-sentry-deno-sdk)

Handle exceptions within your function and send them to Sentry.

```
1
import * as Sentry from 'https://deno.land/x/sentry/index.mjs'
2

3
Sentry.init({
4
  // https://docs.sentry.io/product/sentry-basics/concepts/dsn-explainer/#where-to-find-your-dsn
5
  dsn: SENTRY_DSN,
6
  defaultIntegrations: false,
7
  // Performance Monitoring
8
  tracesSampleRate: 1.0,
9
  // Set sampling rate for profiling - this is relative to tracesSampleRate
10
  profilesSampleRate: 1.0,
11
})
12

13
// Set region and execution_id as custom tags
14
Sentry.setTag('region', Deno.env.get('SB_REGION'))
15
Sentry.setTag('execution_id', Deno.env.get('SB_EXECUTION_ID'))
16

17
Deno.serve(async (req) => {
18
  try {
19
    const { name } = await req.json()
20
    // This will throw, as `name` in our example call will be `undefined`
21
    const data = {
22
      message: `Hello ${name}!`,
23
    }
24

25
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
26
  } catch (e) {
27
    Sentry.captureException(e)
28
    // Flush Sentry before the running process closes
29
    await Sentry.flush(2000)
30
    return new Response(JSON.stringify({ msg: 'error' }), {
31
      status: 500,
32
      headers: { 'Content-Type': 'application/json' },
33
    })
34
  }
35
})
```

### 3\. Deploy and test [\#](https://supabase.com/docs/guides/functions/examples/sentry-monitoring\#3-deploy-and-test)

Run function locally:

```
1
supabase start
2
supabase functions serve --no-verify-jwt
```

Test it: [http://localhost:54321/functions/v1/sentryfied](http://localhost:54321/functions/v1/sentryfied)

Deploy function to Supabase:

```
1
supabase functions deploy sentryfied --no-verify-jwt
```

### 4\. Try it yourself [\#](https://supabase.com/docs/guides/functions/examples/sentry-monitoring\#4-try-it-yourself)

Find the complete example on [GitHub](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/sentryfied/index.ts).

## Working with scopes [\#](https://supabase.com/docs/guides/functions/examples/sentry-monitoring\#working-with-scopes)

Sentry Deno SDK currently do not support `Deno.serve` instrumentation, which means that there is no scope separation between requests. Because of that, when the Edge Functions runtime is reused between multiple requests, all globally captured breadcrumbs and contextual data will be shared, which is not the desired behavior. To work around this, all default integrations in the example code above are disabled, and you should be relying on [`withScope`](https://docs.sentry.io/platforms/javascript/enriching-events/scopes/#using-withscope) to encapsulate all Sentry SDK API calls, or [pass context directly](https://docs.sentry.io/platforms/javascript/enriching-events/context/#passing-context-directly) to the `captureException` or `captureMessage` calls.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/examples/sentry-monitoring.mdx)

### Is this helpful?

NoYes

### On this page

[Prerequisites](https://supabase.com/docs/guides/functions/examples/sentry-monitoring#prerequisites) [1\. Create Supabase function](https://supabase.com/docs/guides/functions/examples/sentry-monitoring#1-create-supabase-function) [2\. Add the Sentry Deno SDK](https://supabase.com/docs/guides/functions/examples/sentry-monitoring#2-add-the-sentry-deno-sdk) [3\. Deploy and test](https://supabase.com/docs/guides/functions/examples/sentry-monitoring#3-deploy-and-test) [4\. Try it yourself](https://supabase.com/docs/guides/functions/examples/sentry-monitoring#4-try-it-yourself) [Working with scopes](https://supabase.com/docs/guides/functions/examples/sentry-monitoring#working-with-scopes)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)