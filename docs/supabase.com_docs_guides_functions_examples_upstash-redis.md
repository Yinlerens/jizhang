---
url: "https://supabase.com/docs/guides/functions/examples/upstash-redis"
title: "Upstash Redis | Supabase Docs"
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
5. [Upstash Redis](https://supabase.com/docs/guides/functions/examples/upstash-redis)

# Upstash Redis

* * *

Increment Redis Counter in Edge Functions - YouTube

[Photo image of Supabase](https://www.youtube.com/channel/UCNTVzV1InxHV-YR0fSajqPQ?embeds_referring_euri=https%3A%2F%2Fsupabase.com%2F)

Supabase

70.4K subscribers

[Increment Redis Counter in Edge Functions](https://www.youtube.com/watch?v=OPg3_oPZCh0)

Supabase

Search

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

Watch later

Share

Copy link

Watch on

0:00

/

•Live

•

A Redis counter example that stores a [hash](https://redis.io/commands/hincrby/) of function invocation count per region. Find the code on [GitHub](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/upstash-redis-counter).

## Redis database setup [\#](https://supabase.com/docs/guides/functions/examples/upstash-redis\#redis-database-setup)

Create a Redis database using the [Upstash Console](https://console.upstash.com/) or [Upstash CLI](https://github.com/upstash/cli).

Select the `Global` type to minimize the latency from all edge locations. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your .env file.

You'll find them under **Details > REST API > .env**.

```
1
cp supabase/functions/upstash-redis-counter/.env.example supabase/functions/upstash-redis-counter/.env
```

## Code [\#](https://supabase.com/docs/guides/functions/examples/upstash-redis\#code)

Make sure you have the latest version of the [Supabase CLI installed](https://supabase.com/docs/guides/cli#installation).

Create a new function in your project:

```
1
supabase functions new upstash-redis-counter
```

And add the code to the `index.ts` file:

```
1
import { Redis } from 'https://deno.land/x/upstash_redis@v1.19.3/mod.ts'
2

3
console.log(`Function "upstash-redis-counter" up and running!`)
4

5
Deno.serve(async (_req) => {
6
  try {
7
    const redis = new Redis({
8
      url: Deno.env.get('UPSTASH_REDIS_REST_URL')!,
9
      token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!,
10
    })
11

12
    const deno_region = Deno.env.get('DENO_REGION')
13
    if (deno_region) {
14
      // Increment region counter
15
      await redis.hincrby('supa-edge-counter', deno_region, 1)
16
    } else {
17
      // Increment localhost counter
18
      await redis.hincrby('supa-edge-counter', 'localhost', 1)
19
    }
20

21
    // Get all values
22
    const counterHash: Record<string, number> | null = await redis.hgetall('supa-edge-counter')
23
    const counters = Object.entries(counterHash!)
24
      .sort(([, a], [, b]) => b - a) // sort desc
25
      .reduce((r, [k, v]) => ({ total: r.total + v, regions: { ...r.regions, [k]: v } }), {
26
        total: 0,
27
        regions: {},
28
      })
29

30
    return new Response(JSON.stringify({ counters }), { status: 200 })
31
  } catch (error) {
32
    return new Response(JSON.stringify({ error: error.message }), { status: 200 })
33
  }
34
})
```

## Run locally [\#](https://supabase.com/docs/guides/functions/examples/upstash-redis\#run-locally)

```
1
supabase start
2
supabase functions serve --no-verify-jwt --env-file supabase/functions/upstash-redis-counter/.env
```

Navigate to [http://localhost:54321/functions/v1/upstash-redis-counter](http://localhost:54321/functions/v1/upstash-redis-counter).

## Deploy [\#](https://supabase.com/docs/guides/functions/examples/upstash-redis\#deploy)

```
1
supabase functions deploy upstash-redis-counter --no-verify-jwt
2
supabase secrets set --env-file supabase/functions/upstash-redis-counter/.env
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/examples/upstash-redis.mdx)

### Is this helpful?

NoYes

### On this page

[Redis database setup](https://supabase.com/docs/guides/functions/examples/upstash-redis#redis-database-setup) [Code](https://supabase.com/docs/guides/functions/examples/upstash-redis#code) [Run locally](https://supabase.com/docs/guides/functions/examples/upstash-redis#run-locally) [Deploy](https://supabase.com/docs/guides/functions/examples/upstash-redis#deploy)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)