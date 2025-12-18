---
url: "https://supabase.com/docs/guides/functions/examples/push-notifications"
title: "Sending Push Notifications | Supabase Docs"
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
3. Examples
5. [Sending Push Notifications](https://supabase.com/docs/guides/functions/examples/push-notifications)

# Sending Push Notifications

* * *

Push notifications are an important part of any mobile app. They allow you to send notifications to your users even when they are not using your app. This guide will show you how to send push notifications to different mobile app frameworks from your Supabase edge functions.

Expo Push NotificationsFirebase Cloud Messaging

[Expo](https://docs.expo.dev/push-notifications/overview/) makes implementing push notifications easy. All the hassle with device information and communicating with Firebase Cloud Messaging (FCM) or Apple Push Notification Service (APNs) is done behind the scenes. This allows you to treat Android and iOS notifications in the same way and save time both on the frontend and backend.

Find the example code on [GitHub](https://github.com/supabase/supabase/blob/master/examples/user-management/expo-push-notifications/).

## Supabase setup [\#](https://supabase.com/docs/guides/functions/examples/push-notifications\#supabase-setup)

- [Create a new Supabase project](https://database.new/).
- Link your project: `supabase link --project-ref your-supabase-project-ref`
- Start Supabase locally: `supabase start`
- Push up the schema: `supabase db push` (schema is defined in [supabase/migrations](https://github.com/supabase/supabase/blob/master/examples/user-management/expo-push-notifications/supabase/migrations/))

## Expo setup [\#](https://supabase.com/docs/guides/functions/examples/push-notifications\#expo-setup)

To utilize Expo's push notification service, you must configure your app by installing a set of libraries, implementing functions to handle notifications, and setting up credentials for Android and iOS. Follow the official [Expo Push Notifications Setup Guide](https://docs.expo.dev/push-notifications/push-notifications-setup/) to get the credentials for Android and iOS. This project uses [Expo's EAS build](https://docs.expo.dev/build/introduction/) service to simplify this part.

1. Install the dependencies: `npm i`
2. Create a [new Expo project](https://expo.dev/accounts/_/projects)
3. Link this app to your project: `npm install --global eas-cli && eas init --id your-expo-project-id`
4. [Create a build for your physical device](https://docs.expo.dev/develop/development-builds/create-a-build/#create-a-build-for-the-device)
5. Start the development server for your project: `npx expo start --dev-client`
6. Scan the QR code shown in the terminal with your physical device.
7. Sign up/in to create a user in Supabase Auth.

## Enhanced security for push notifications [\#](https://supabase.com/docs/guides/functions/examples/push-notifications\#enhanced-security-for-push-notifications)

1. Navigate to your [Expo Access Token Settings](https://expo.dev/accounts/_/settings/access-tokens).
2. Create a new token for usage in Supabase Edge Functions.
3. Toggle on "Enhanced Security for Push Notifications".
4. Create the local `.env` file: `cp .env.local.example .env.local`
5. In the newly created `.env.local` file, set your `EXPO_ACCESS_TOKEN` value.

## Deploy the Supabase Edge Function [\#](https://supabase.com/docs/guides/functions/examples/push-notifications\#deploy-the-supabase-edge-function)

The database webhook handler to send push notifications is located in [supabase/functions/push/index.ts](https://github.com/supabase/supabase/blob/master/examples/user-management/expo-push-notifications/supabase/functions/push/index.ts). Deploy the function to your linked project and set the `EXPO_ACCESS_TOKEN` secret.

1. `supabase functions deploy push`
2. `supabase secrets set --env-file .env.local`

```
1
import { createClient } from 'npm:@supabase/supabase-js@2'
2

3
console.log('Hello from Functions!')
4

5
interface Notification {
6
  id: string
7
  user_id: string
8
  body: string
9
}
10

11
interface WebhookPayload {
12
  type: 'INSERT' | 'UPDATE' | 'DELETE'
13
  table: string
14
  record: Notification
15
  schema: 'public'
16
  old_record: null | Notification
17
}
18

19
const supabase = createClient(
20
  Deno.env.get('SUPABASE_URL')!,
21
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
22
)
23

24
Deno.serve(async (req) => {
25
  const payload: WebhookPayload = await req.json()
26
  const { data } = await supabase
27
    .from('profiles')
28
    .select('expo_push_token')
29
    .eq('id', payload.record.user_id)
30
    .single()
31

32
  const res = await fetch('https://exp.host/--/api/v2/push/send', {
33
    method: 'POST',
34
    headers: {
35
      'Content-Type': 'application/json',
36
      Authorization: `Bearer ${Deno.env.get('EXPO_ACCESS_TOKEN')}`,
37
    },
38
    body: JSON.stringify({
39
      to: data?.expo_push_token,
40
      sound: 'default',
41
      body: payload.record.body,
42
    }),
43
  }).then((res) => res.json())
44

45
  return new Response(JSON.stringify(res), {
46
    headers: { 'Content-Type': 'application/json' },
47
  })
48
})
```

## Create the database webhook [\#](https://supabase.com/docs/guides/functions/examples/push-notifications\#create-the-database-webhook)

Navigate to the [Database Webhooks settings](https://supabase.com/dashboard/project/_/integrations/webhooks/overview) in your Supabase Dashboard.

1. Enable and create a new hook.
2. Conditions to fire webhook: Select the `notifications` table and tick the `Insert` event.
3. Webhook configuration: Supabase Edge Functions.
4. Edge Function: Select the `push` edge function and leave the method as `POST` and timeout as `1000`.
5. HTTP Headers: Click "Add new header" > "Add auth header with service key" and leave Content-type: `application/json`.
6. Click "Create webhook".

## Send push notification [\#](https://supabase.com/docs/guides/functions/examples/push-notifications\#send-push-notification)

1. Navigate to the [table editor](https://supabase.com/dashboard/project/_/editor) in your Supabase Dashboard.
2. In your `notifications` table, insert a new row.
3. Watch the magic happen 🪄

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/examples/push-notifications.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FxYRbYG77M_o%2F0.jpg&w=3840&q=75)

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