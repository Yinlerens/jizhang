---
url: "https://supabase.com/docs/guides/functions/examples/image-manipulation"
title: "Image Manipulation | Supabase Docs"
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
5. [Image Transformation & Optimization](https://supabase.com/docs/guides/functions/examples/image-manipulation)

# Image Manipulation

* * *

Supabase Storage has [out-of-the-box support](https://supabase.com/docs/guides/storage/serving/image-transformations?queryGroups=language&language=js) for the most common image transformations and optimizations you need.
If you need to do anything custom beyond what Supabase Storage provides, you can use Edge Functions to write custom image manipulation scripts.

In this example, we will use [`magick-wasm`](https://github.com/dlemstra/magick-wasm) to perform image manipulations. `magick-wasm` is the WebAssembly port of the popular ImageMagick library and supports processing over 100 file formats.

Edge Functions currently doesn't support image processing libraries such as `Sharp`, which depend on native libraries. Only WASM-based libraries are supported.

### Prerequisites [\#](https://supabase.com/docs/guides/functions/examples/image-manipulation\#prerequisites)

Make sure you have the latest version of the [Supabase CLI](https://supabase.com/docs/guides/cli#installation) installed.

### Create the Edge Function [\#](https://supabase.com/docs/guides/functions/examples/image-manipulation\#create-the-edge-function)

Create a new function locally:

```
1
supabase functions new image-blur
```

### Write the function [\#](https://supabase.com/docs/guides/functions/examples/image-manipulation\#write-the-function)

In this example, we are implementing a function allowing users to upload an image and get a blurred thumbnail.

Here's the implementation in `index.ts` file:

```
1
// This is an example showing how to use Magick WASM to do image manipulations in Edge Functions.
2
//
3
import {
4
  ImageMagick,
5
  initializeImageMagick,
6
  MagickFormat,
7
} from "npm:@imagemagick/magick-wasm@0.0.30";
8

9
const wasmBytes = await Deno.readFile(
10
  new URL(
11
    "magick.wasm",
12
    import.meta.resolve("npm:@imagemagick/magick-wasm@0.0.30"),
13
  ),
14
);
15
await initializeImageMagick(
16
  wasmBytes,
17
);
18

19
Deno.serve(async (req) => {
20
  const formData = await req.formData();
21
  const content = await formData.get("file").bytes();
22

23
  let result = ImageMagick.read(
24
    content,
25
    (img): Uint8Array => {
26
      // resize the image
27
      img.resize(500, 300);
28
      // add a blur of 60x5
29
      img.blur(60, 5);
30

31
      return img.write(
32
        (data) => data,
33
      );
34
    },
35
  );
36

37
  return new Response(
38
    result,
39
    { headers: { "Content-Type": "image/png" } },
40
  );
41
});
```

[View source](https://github.com/supabase/supabase/blob/5a7661b4468ed0dea3d462e1f203a8c5f6597210/examples/edge-functions/supabase/functions/image-manipulation/index.ts)

### Test it locally [\#](https://supabase.com/docs/guides/functions/examples/image-manipulation\#test-it-locally)

You can test the function locally by running:

```
1
supabase start
2
supabase functions serve --no-verify-jwt
```

Then, make a request using `curl` or your favorite API testing tool.

```
1
curl --location '<http://localhost:54321/functions/v1/image-blur>' \\
2
--form 'file=@"/path/to/image.png"'
3
--output '/path/to/output.png'
```

If you open the `output.png` file you will find a transformed version of your original image.

### Deploy to your hosted project [\#](https://supabase.com/docs/guides/functions/examples/image-manipulation\#deploy-to-your-hosted-project)

Now, let's deploy the function to your Supabase project.

```
1
supabase link
2
supabase functions deploy image-blur
```

Hosted Edge Functions have [limits](https://supabase.com/docs/guides/functions/limits) on memory and CPU usage.

If you try to perform complex image processing or handle large images (> 5MB) your function may return a resource limit exceeded error.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/examples/image-manipulation.mdx)

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