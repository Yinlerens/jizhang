---
url: "https://supabase.com/docs/guides/functions/dependencies"
title: "Managing dependencies | Supabase Docs"
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
3. Configuration
5. [Managing Dependencies](https://supabase.com/docs/guides/functions/dependencies)

# Managing dependencies

## Handle dependencies within Edge Functions.

* * *

## Importing dependencies [\#](https://supabase.com/docs/guides/functions/dependencies\#importing-dependencies)

Supabase Edge Functions support several ways to import dependencies:

- JavaScript modules from npm ( [https://docs.deno.com/examples/npm/](https://docs.deno.com/examples/npm/))
- Built-in [Node APIs](https://docs.deno.com/runtime/manual/node/compatibility)
- Modules published to [JSR](https://jsr.io/) or [deno.land/x](https://deno.land/x)

```
1
// NPM packages (recommended)
2
import { createClient } from 'npm:@supabase/supabase-js@2'
3

4
// Node.js built-ins
5
import process from 'node:process'
6

7
// JSR modules (Deno's registry)
8
import path from 'jsr:@std/path@1.0.8'
```

### Using `deno.json` (recommended) [\#](https://supabase.com/docs/guides/functions/dependencies\#using-denojson-recommended)

Each function should have its own `deno.json` file to manage dependencies and configure Deno-specific settings. This ensures proper isolation between functions and is the recommended approach for deployment. When you update the dependencies for one function, it won't accidentally break another function that needs different versions.

```
1
{
2
  "imports": {
3
    "supabase": "npm:@supabase/supabase-js@2",
4
    "lodash": "https://cdn.skypack.dev/lodash"
5
  }
6
}
```

You can add this file directly to the function’s own directory:

```
1
└── supabase
2
    ├── functions
3
    │   ├── function-one
4
    │   │   ├── index.ts
5
    │   │   └── deno.json    # Function-specific Deno configuration
6
    │   └── function-two
7
    │       ├── index.ts
8
    │       └── deno.json    # Function-specific Deno configuration
9
    └── config.toml
```

It's possible to use a global `deno.json` in the `/supabase/functions` directory for local development, but this approach is not recommended for deployment. Each function should maintain its own configuration to ensure proper isolation and dependency management.

### Using import maps (legacy) [\#](https://supabase.com/docs/guides/functions/dependencies\#using-import-maps-legacy)

Import Maps are a legacy way to manage dependencies, similar to a `package.json` file. While still supported, we recommend using `deno.json`. If both exist, `deno.json` takes precedence.

Each function should have its own `import_map.json` file for proper isolation:

```
1
# /function-one/import_map.json
2
{
3
  "imports": {
4
    "lodash": "https://cdn.skypack.dev/lodash"
5
  }
6
}
```

This JSON file should be located within the function’s own directory:

```
1
└── supabase
2
    ├── functions
3
    │   ├── function-one
4
    │   │   ├── index.ts
5
    │   │   └── import_map.json    # Function-specific import map
```

It's possible to use a global `import_map.json` in the `/supabase/functions` directory for local development, but this approach is not recommended for deployment. Each function should maintain its own configuration to ensure proper isolation and dependency management.

If you’re using import maps with VSCode, update your `.vscode/settings.json` to point to your function-specific import map:

```
1
{
2
  "deno.enable": true,
3
  "deno.unstable": ["bare-node-builtins", "byonm"],
4
  "deno.importMap": "./supabase/functions/function-one/import_map.json"
5
}
```

You can override the default import map location using the `--import-map <string>` flag with serve and deploy commands, or by setting the `import_map` property in your `config.toml` file:

```
1
[functions.my-function]
2
import_map = "./supabase/functions/function-one/import_map.json"
```

* * *

## Private NPM packages [\#](https://supabase.com/docs/guides/functions/dependencies\#private-npm-packages)

To use private npm packages, create a `.npmrc` file within your function’s own directory.

This feature requires Supabase CLI version 1.207.9 or higher.

```
1
└── supabase
2
    └── functions
3
        └── my-function
4
            ├── index.ts
5
            ├── deno.json
6
            └── .npmrc       # Function-specific npm configuration
```

It's possible to use a global `.npmrc` in the `/supabase/functions` directory for local development, but this approach is not recommended for deployment. Each function should maintain its own configuration to ensure proper isolation and dependency management.

Add your registry details in the `.npmrc` file. Follow [this guide](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) to learn more about the syntax of npmrc files.

```
1
# /my-function/.npmrc
2
@myorg:registry=https://npm.registryhost.com
3
//npm.registryhost.com/:_authToken=VALID_AUTH_TOKEN
```

After configuring your `.npmrc`, you can import the private package in your function code:

```
1
import package from 'npm:@myorg/private-package@v1.0.1'
```

* * *

## Using a custom NPM registry [\#](https://supabase.com/docs/guides/functions/dependencies\#using-a-custom-npm-registry)

This feature requires Supabase CLI version 2.2.8 or higher.

Some organizations require a custom NPM registry for security and compliance purposes. In such cases, you can specify the custom NPM registry to use via `NPM_CONFIG_REGISTRY` environment variable.

You can define it in the project's `.env` file or directly specify it when running the deploy command:

```
1
NPM_CONFIG_REGISTRY=https://custom-registry/ supabase functions deploy my-function
```

* * *

## Importing types [\#](https://supabase.com/docs/guides/functions/dependencies\#importing-types)

If your [environment is set up properly](https://supabase.com/docs/guides/functions/development-environment) and the module you're importing is exporting types, the import will have types and autocompletion support.

Some npm packages may not ship out of the box types and you may need to import them from a separate package. You can specify their types with a `@deno-types` directive:

```
1
// @deno-types="npm:@types/express@^4.17"
2
import express from 'npm:express@^4.17'
```

To include types for built-in Node APIs, add the following line to the top of your imports:

```
1
/// <reference types="npm:@types/node" />
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/dependencies.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FILr3cneZuFk%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Importing dependencies](https://supabase.com/docs/guides/functions/dependencies#importing-dependencies) [Using deno.json (recommended)](https://supabase.com/docs/guides/functions/dependencies#using-denojson-recommended) [Using import maps (legacy)](https://supabase.com/docs/guides/functions/dependencies#using-import-maps-legacy) [Private NPM packages](https://supabase.com/docs/guides/functions/dependencies#private-npm-packages) [Using a custom NPM registry](https://supabase.com/docs/guides/functions/dependencies#using-a-custom-npm-registry) [Importing types](https://supabase.com/docs/guides/functions/dependencies#importing-types)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)