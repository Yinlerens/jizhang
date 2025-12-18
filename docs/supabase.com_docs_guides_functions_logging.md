---
url: "https://supabase.com/docs/guides/functions/logging"
title: "Logging | Supabase Docs"
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
3. Debugging
5. [Logging](https://supabase.com/docs/guides/functions/logging)

# Logging

## Monitor your Edge Functions with logging to track execution, debug issues, and optimize performance.

* * *

Logs are provided for each function invocation, locally and in hosted environments.

* * *

## Accessing logs [\#](https://supabase.com/docs/guides/functions/logging\#accessing-logs)

### Production [\#](https://supabase.com/docs/guides/functions/logging\#production)

Access logs from the Functions section of your Dashboard:

1. Navigate to the [Functions section](https://supabase.com/dashboard/project/_/functions) of the Dashboard
2. Select your function from the list
3. Choose your log view:
   - **Invocations:** Request/Response data including headers, body, status codes, and execution duration. Filter by date, time, or status code.
   - **Logs:** Platform events, uncaught exceptions, and custom log messages. Filter by timestamp, level, or message content.

![Function invocations.](https://supabase.com/docs/img/guides/functions/function-logs.png)

### Development [\#](https://supabase.com/docs/guides/functions/logging\#development)

When [developing locally](https://supabase.com/docs/guides/functions/quickstart) you will see error messages and console log statements printed to your local terminal window.

* * *

## Log event types [\#](https://supabase.com/docs/guides/functions/logging\#log-event-types)

### Automatic logs [\#](https://supabase.com/docs/guides/functions/logging\#automatic-logs)

Your functions automatically capture several types of events:

- **Uncaught exceptions**: Uncaught exceptions thrown by a function during execution are automatically logged. You can see the error message and stack trace in the Logs tool.
- **Custom log events**: You can use `console.log`, `console.error`, and `console.warn` in your code to emit custom log events. These events also appear in the Logs tool.
- **Boot and Shutdown Logs**: The Logs tool extends its coverage to include logs for the boot and shutdown of functions.

### Custom logs [\#](https://supabase.com/docs/guides/functions/logging\#custom-logs)

You can add your own log messages using standard console methods:

```
1
Deno.serve(async (req) => {
2
  try {
3
    const { name } = await req.json()
4

5
    if (!name) {
6
      // Log a warning message
7
      console.warn('Empty name parameter received')
8
    }
9

10
    // Log a message
11
    console.log(`Processing request for: ${name}`)
12

13
    const data = {
14
      message: `Hello ${name || 'Guest'}!`,
15
    }
16

17
    return new Response(JSON.stringify(data), {
18
      headers: { 'Content-Type': 'application/json' },
19
    })
20
  } catch (error) {
21
    // Log an error message
22
    console.error(`Request processing failed: ${error.message}`)
23
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
24
      status: 500,
25
      headers: { 'Content-Type': 'application/json' },
26
    })
27
  }
28
})
```

A custom log message can contain up to 10,000 characters. A function can log up to 100 events within a 10 second period.

* * *

## Logging tips [\#](https://supabase.com/docs/guides/functions/logging\#logging-tips)

### Logging request headers [\#](https://supabase.com/docs/guides/functions/logging\#logging-request-headers)

When debugging Edge Functions, a common mistake is to try to log headers to the developer console via code like this:

```
1
// ❌ This doesn't work as expected
2

3
Deno.serve(async (req) => {
4
  console.log(`Headers: ${JSON.stringify(req.headers)}`) // Outputs: "{}"
5
})
```

The `req.headers` object appears empty because Headers objects don't store data in enumerable JavaScript properties, making them opaque to `JSON.stringify()`.

Instead, you have to convert headers to a plain object first, for example using `Object.fromEntries`.

```
1
// ✅ This works correctly
2
Deno.serve(async (req) => {
3
  const headersObject = Object.fromEntries(req.headers)
4
  const headersJson = JSON.stringify(headersObject, null, 2)
5

6
  console.log(`Request headers:\n${headersJson}`)
7
})
```

This results in something like:

```
1
Request headers: {
2
    "accept": "*/*",
3
    "accept-encoding": "gzip",
4
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1cGFuYWNobyIsInJvbGUiOiJhbm9uIiwieW91IjoidmVyeSBzbmVha3ksIGh1aD8iLCJpYXQiOjE2NTQ1NDA5MTYsImV4cCI6MTk3MDExNjkxNn0.cwBbk2tq-fUcKF1S0jVKkOAG2FIQSID7Jjvff5Do99Y",
5
    "cdn-loop": "cloudflare; subreqs=1",
6
    "cf-ew-via": "15",
7
    "cf-ray": "8597a2fcc558a5d7-GRU",
8
    "cf-visitor": "{\"scheme\":\"https\"}",
9
    "cf-worker": "supabase.co",
10
    "content-length": "20",
11
    "content-type": "application/x-www-form-urlencoded",
12
    "host": "edge-runtime.supabase.com",
13
    "my-custom-header": "abcd",
14
    "user-agent": "curl/8.4.0",
15
    "x-deno-subhost": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6InN1cGFiYXNlIn0.eyJkZXBsb3ltZW50X2lkIjoic3VwYW5hY2hvX2M1ZGQxMWFiLTFjYmUtNDA3NS1iNDAxLTY3ZTRlZGYxMjVjNV8wMDciLCJycGNfcm9vdCI6Imh0dHBzOi8vc3VwYWJhc2Utb3JpZ2luLmRlbm8uZGV2L3YwLyIsImV4cCI6MTcwODYxMDA4MiwiaWF0IjoxNzA4NjA5MTgyfQ.-fPid2kEeEM42QHxWeMxxv2lJHZRSkPL-EhSH0r_iV4",
16
    "x-forwarded-host": "edge-runtime.supabase.com",
17
    "x-forwarded-port": "443",
18
    "x-forwarded-proto": "https"
19
}
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/logging.mdx)

### Is this helpful?

NoYes

### On this page

[Accessing logs](https://supabase.com/docs/guides/functions/logging#accessing-logs) [Production](https://supabase.com/docs/guides/functions/logging#production) [Development](https://supabase.com/docs/guides/functions/logging#development) [Log event types](https://supabase.com/docs/guides/functions/logging#log-event-types) [Automatic logs](https://supabase.com/docs/guides/functions/logging#automatic-logs) [Custom logs](https://supabase.com/docs/guides/functions/logging#custom-logs) [Logging tips](https://supabase.com/docs/guides/functions/logging#logging-tips) [Logging request headers](https://supabase.com/docs/guides/functions/logging#logging-request-headers)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)