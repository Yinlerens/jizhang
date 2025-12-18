---
url: "https://supabase.com/docs/guides/functions/regional-invocation"
title: "Regional Invocations | Supabase Docs"
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
3. Platform
5. [Regional invocations](https://supabase.com/docs/guides/functions/regional-invocation)

# Regional Invocations

## Execute Edge Functions in specific regions for optimal performance.

* * *

Edge Functions automatically execute in the region closest to the user making the request. This reduces network latency and provides faster responses.

However, if your function performs intensive database or storage operations, executing in the same region as your database often provides better performance:

- **Bulk database operations:** Adding or editing many records
- **File uploads:** Processing large files or multiple uploads
- **Complex queries:** Operations requiring multiple database round trips

* * *

## Available regions [\#](https://supabase.com/docs/guides/functions/regional-invocation\#available-regions)

The following regions are supported:

**Asia Pacific:**

- `ap-northeast-1` (Tokyo)
- `ap-northeast-2` (Seoul)
- `ap-south-1` (Mumbai)
- `ap-southeast-1` (Singapore)
- `ap-southeast-2` (Sydney)

**North America:**

- `ca-central-1` (Canada Central)
- `us-east-1` (N. Virginia)
- `us-west-1` (N. California)
- `us-west-2` (Oregon)

**Europe:**

- `eu-central-1` (Frankfurt)
- `eu-west-1` (Ireland)
- `eu-west-2` (London)
- `eu-west-3` (Paris)

**South America:**

- `sa-east-1` (São Paulo)

* * *

## Usage [\#](https://supabase.com/docs/guides/functions/regional-invocation\#usage)

You can specify the region programmatically using the Supabase Client library, or using the `x-region` HTTP header.

JavaScriptcURL

```
1
import { createClient, FunctionRegion } from '@supabase/supabase-js'
2

3
const { data, error } = await supabase.functions.invoke('function-name', {
4
  ...
5
  region: FunctionRegion.UsEast1, // Execute in us-east-1 region
6
})
```

In case you cannot add the `x-region` header to the request (e.g.: CORS requests, Webhooks), you can use `forceFunctionRegion` query parameter.

You can verify the execution region by looking at the `x-sb-edge-region` HTTP header in the response. You can also find it as metadata in [Edge Function Logs](https://supabase.com/docs/guides/functions/logging).

* * *

## Region runtime information [\#](https://supabase.com/docs/guides/functions/regional-invocation\#region-runtime-information)

Functions have access to the following environment variables:

SB\_REGION: The AWS region function was invoked

This is useful if you have read replicate and want to Postgres connect to a different replicate according of the Region.

* * *

## Region outages [\#](https://supabase.com/docs/guides/functions/regional-invocation\#region-outages)

When you explicitly specify a region via the `x-region` header, requests will NOT be automatically
re-routed to another region.

During outages, consider temporarily changing to a different region.

Test your function's performance with and without regional specification to determine if the benefits outweigh automatic region selection.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/regional-invocation.mdx)

### Is this helpful?

NoYes

### On this page

[Available regions](https://supabase.com/docs/guides/functions/regional-invocation#available-regions) [Usage](https://supabase.com/docs/guides/functions/regional-invocation#usage) [Region runtime information](https://supabase.com/docs/guides/functions/regional-invocation#region-runtime-information) [Region outages](https://supabase.com/docs/guides/functions/regional-invocation#region-outages)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)