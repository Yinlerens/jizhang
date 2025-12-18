---
url: "https://supabase.com/docs/guides/functions/storage-caching"
title: "Integrating with Supabase Storage | Supabase Docs"
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
3. Integrations
5. [Supabase Storage](https://supabase.com/docs/guides/functions/storage-caching)

# Integrating with Supabase Storage

* * *

Edge Functions work seamlessly with [Supabase Storage](https://supabase.com/docs/guides/storage). This allows you to:

- Upload generated content directly from your functions
- Implement cache-first patterns for better performance
- Serve files with built-in CDN capabilities

* * *

## Basic file operations [\#](https://supabase.com/docs/guides/functions/storage-caching\#basic-file-operations)

Use the Supabase client to upload files directly from your Edge Functions. You'll need the service role key for server-side storage operations:

```
1
import { createClient } from 'npm:@supabase/supabase-js@2'
2

3
Deno.serve(async (req) => {
4
  const supabaseAdmin = createClient(
5
    Deno.env.get('SUPABASE_URL') ?? '',
6
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
7
  )
8

9
  // Generate your content
10
  const fileContent = await generateImage()
11

12
  // Upload to storage
13
  const { data, error } = await supabaseAdmin.storage
14
    .from('images')
15
    .upload(`generated/${filename}.png`, fileContent.body!, {
16
      contentType: 'image/png',
17
      cacheControl: '3600',
18
      upsert: false,
19
    })
20

21
  if (error) {
22
    throw error
23
  }
24

25
  return new Response(JSON.stringify({ path: data.path }))
26
})
```

Always use the `SUPABASE_SERVICE_ROLE_KEY` for server-side operations. Never expose this key in client-side code!

* * *

## Cache-first pattern [\#](https://supabase.com/docs/guides/functions/storage-caching\#cache-first-pattern)

Check storage before generating new content to improve performance:

```
1
const STORAGE_URL = 'https://your-project.supabase.co/storage/v1/object/public/images'
2

3
Deno.serve(async (req) => {
4
  const url = new URL(req.url)
5
  const username = url.searchParams.get('username')
6

7
  try {
8
    // Try to get existing file from storage first
9
    const storageResponse = await fetch(`${STORAGE_URL}/avatars/${username}.png`)
10

11
    if (storageResponse.ok) {
12
      // File exists in storage, return it directly
13
      return storageResponse
14
    }
15

16
    // File doesn't exist, generate it
17
    const generatedImage = await generateAvatar(username)
18

19
    // Upload to storage for future requests
20
    const { error } = await supabaseAdmin.storage
21
      .from('images')
22
      .upload(`avatars/${username}.png`, generatedImage.body!, {
23
        contentType: 'image/png',
24
        cacheControl: '86400', // Cache for 24 hours
25
      })
26

27
    if (error) {
28
      console.error('Upload failed:', error)
29
    }
30

31
    return generatedImage
32
  } catch (error) {
33
    return new Response('Error processing request', { status: 500 })
34
  }
35
})
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/storage-caching.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FwW6L52v9Ldo%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Basic file operations](https://supabase.com/docs/guides/functions/storage-caching#basic-file-operations) [Cache-first pattern](https://supabase.com/docs/guides/functions/storage-caching#cache-first-pattern)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)