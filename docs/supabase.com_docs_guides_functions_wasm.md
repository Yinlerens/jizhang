---
url: "https://supabase.com/docs/guides/functions/wasm"
title: "Using Wasm modules | Supabase Docs"
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
3. Advanced Features
5. [Wasm Modules](https://supabase.com/docs/guides/functions/wasm)

# Using Wasm modules

## Use WebAssembly in Edge Functions.

* * *

Edge Functions supports running [WebAssembly (Wasm)](https://developer.mozilla.org/en-US/docs/WebAssembly) modules. WebAssembly is useful if you want to optimize code that's slower to run in JavaScript or require low-level manipulation.

This allows you to:

- Optimize performance-critical code beyond JavaScript capabilities
- Port existing libraries from other languages (C, C++, Rust) to JavaScript
- Access low-level system operations not available in JavaScript

For example, libraries like [magick-wasm](https://supabase.com/docs/guides/functions/examples/image-manipulation) port existing C libraries to WebAssembly for complex image processing.

* * *

### Writing a Wasm module [\#](https://supabase.com/docs/guides/functions/wasm\#writing-a-wasm-module)

You can use different languages and SDKs to write Wasm modules. For this tutorial, we will write a simple Wasm module in Rust that adds two numbers.

Follow this [guide on writing Wasm modules in Rust](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_Wasm) to setup your dev environment.

1

### Create a new Edge Function

Create a new Edge Function called `wasm-add`

```
1
supabase functions new wasm-add
```

2

### Create a new Cargo project

Create a new Cargo project for the Wasm module inside the function's directory:

```
1
cd supabase/functions/wasm-add
2
cargo new --lib add-wasm
```

3

### Add the Wasm module code

Add the following code to `add-wasm/src/lib.rs`.

```
1
use wasm_bindgen::prelude::*;
2

3
#[wasm_bindgen]
4
pub fn add(a: u32, b: u32) -> u32 {
5
    a + b
6
}
```

[View source](https://github.com/supabase/supabase/blob/2fbb6cb9a7d6fb0a10f74b0a421af33038e557c7/examples/edge-functions/supabase/functions/wasm-modules/add-wasm/src/lib.rs)

4

### Update the Cargo.toml file

Update the `add-wasm/Cargo.toml` to include the `wasm-bindgen` dependency.

```
1
[package]
2
name = "add-wasm"
3
version = "0.1.0"
4
description = "A simple wasm module that adds two numbers"
5
license = "MIT/Apache-2.0"
6
edition = "2021"
7

8
[lib]
9
crate-type = ["cdylib"]
10

11
[dependencies]
12
wasm-bindgen = "0.2"
```

[View source](https://github.com/supabase/supabase/blob/2fbb6cb9a7d6fb0a10f74b0a421af33038e557c7/examples/edge-functions/supabase/functions/wasm-modules/add-wasm/Cargo.toml)

5

### Build the Wasm module

Build the package by running:

```
1
wasm-pack build --target deno
```

This will produce a Wasm binary file inside `add-wasm/pkg` directory.

* * *

## Calling the Wasm module from the Edge Function [\#](https://supabase.com/docs/guides/functions/wasm\#calling-the-wasm-module-from-the-edge-function)

Update your Edge Function to call the add function from the Wasm module:

```
1
import { add } from "./add-wasm/pkg/add_wasm.js";
2

3
Deno.serve(async (req) => {
4
  const { a, b } = await req.json();
5
  return new Response(
6
    JSON.stringify({ result: add(a, b) }),
7
    { headers: { "Content-Type": "application/json" } },
8
  );
9
});
```

[View source](https://github.com/supabase/supabase/blob/2fbb6cb9a7d6fb0a10f74b0a421af33038e557c7/examples/edge-functions/supabase/functions/wasm-modules/index.ts)

Supabase Edge Functions currently use Deno 1.46. From [Deno 2.1, importing Wasm modules](https://deno.com/blog/v2.1) will require even less boilerplate code.

* * *

## Bundle and deploy [\#](https://supabase.com/docs/guides/functions/wasm\#bundle-and-deploy)

Before deploying, ensure the Wasm module is bundled with your function by defining it in `supabase/config.toml`:

- You will need update Supabase CLI to 2.7.0 or higher for the `static_files` support.
- Static files cannot be deployed using the `--use-api` API flag. You need to build them with [Docker on the CLI](https://supabase.com/docs/guides/functions/quickstart#step-6-deploy-to-production).

```
1
[functions.wasm-add]
2
static_files = [ "./functions/wasm-add/add-wasm/pkg/*"]
```

Deploy the function by running:

```
1
supabase functions deploy wasm-add
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/wasm.mdx)

### Is this helpful?

NoYes

### On this page

[Writing a Wasm module](https://supabase.com/docs/guides/functions/wasm#writing-a-wasm-module) [Calling the Wasm module from the Edge Function](https://supabase.com/docs/guides/functions/wasm#calling-the-wasm-module-from-the-edge-function) [Bundle and deploy](https://supabase.com/docs/guides/functions/wasm#bundle-and-deploy)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)