---
url: "https://supabase.com/docs/guides/functions/development-tips"
title: "Development tips | Supabase Docs"
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

# Development tips

## Tips for getting started with Edge Functions.

* * *

Here are a few recommendations when you first start developing Edge Functions.

### Skipping authorization checks [\#](https://supabase.com/docs/guides/functions/development-tips\#skipping-authorization-checks)

By default, Edge Functions require a valid JWT in the authorization header. If you want to use Edge Functions without Authorization checks (commonly used for Stripe webhooks), you can pass the `--no-verify-jwt` flag when serving your Edge Functions locally.

```
1
supabase functions serve hello-world --no-verify-jwt
```

Be careful when using this flag, as it will allow anyone to invoke your Edge Function without a valid JWT. The Supabase client libraries automatically handle authorization.

### Using HTTP methods [\#](https://supabase.com/docs/guides/functions/development-tips\#using-http-methods)

Edge Functions support `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, and `OPTIONS`. A Function can be designed to perform different actions based on a request's HTTP method. See the [example on building a RESTful service](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/restful-tasks) to learn how to handle different HTTP methods in your Function.

##### HTML not supported

HTML content is not supported. `GET` requests that return `text/html` will be rewritten to `text/plain`.

### Naming Edge Functions [\#](https://supabase.com/docs/guides/functions/development-tips\#naming-edge-functions)

We recommend using hyphens to name functions because hyphens are the most URL-friendly of all the naming conventions (snake\_case, camelCase, PascalCase).

### Organizing your Edge Functions [\#](https://supabase.com/docs/guides/functions/development-tips\#organizing-your-edge-functions)

We recommend developing "fat functions". This means that you should develop few large functions, rather than many small functions. One common pattern when developing Functions is that you need to share code between two or more Functions. To do this, you can store any shared code in a folder prefixed with an underscore (`_`). We also recommend a separate folder for [Unit Tests](https://supabase.com/docs/guides/functions/unit-test) including the name of the function followed by a `-test` suffix.
We recommend this folder structure:

```
1
└── supabase
2
    ├── functions
3
    │   ├── import_map.json # A top-level import map to use across functions.
4
    │   ├── _shared
5
    │   │   ├── supabaseAdmin.ts # Supabase client with SERVICE_ROLE key.
6
    │   │   └── supabaseClient.ts # Supabase client with ANON key.
7
    │   │   └── cors.ts # Reusable CORS headers.
8
    │   ├── function-one # Use hyphens to name functions.
9
    │   │   └── index.ts
10
    │   └── function-two
11
    │   │   └── index.ts
12
    │   └── tests
13
    │       └── function-one-test.ts
14
    │       └── function-two-test.ts
15
    ├── migrations
16
    └── config.toml
```

### Using config.toml [\#](https://supabase.com/docs/guides/functions/development-tips\#using-configtoml)

Individual function configuration like [JWT verification](https://supabase.com/docs/guides/cli/config#functions.function_name.verify_jwt) and [import map location](https://supabase.com/docs/guides/cli/config#functions.function_name.import_map) can be set via the `config.toml` file.

```
1
[functions.hello-world]
2
verify_jwt = false
3
import_map = './import_map.json'
```

### Not using TypeScript [\#](https://supabase.com/docs/guides/functions/development-tips\#not-using-typescript)

When you create a new Edge Function, it will use TypeScript by default. However, it is possible to write and deploy Edge Functions using pure JavaScript.

Save your Function as a JavaScript file (e.g. `index.js`) and then update the `supabase/config.toml` as follows:

`entrypoint` is available only in Supabase CLI version 1.215.0 or higher.

```
1
[functions.hello-world]
2
# other entries
3
entrypoint = './functions/hello-world/index.js' # path must be relative to config.toml
```

You can use any `.ts`, `.js`, `.tsx`, `.jsx` or `.mjs` file as the `entrypoint` for a Function.

### Error handling [\#](https://supabase.com/docs/guides/functions/development-tips\#error-handling)

The `supabase-js` library provides several error types that you can use to handle errors that might occur when invoking Edge Functions:

```
1
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'
2

3
const { data, error } = await supabase.functions.invoke('hello', {
4
  headers: { 'my-custom-header': 'my-custom-header-value' },
5
  body: { foo: 'bar' },
6
})
7

8
if (error instanceof FunctionsHttpError) {
9
  const errorMessage = await error.context.json()
10
  console.log('Function returned an error', errorMessage)
11
} else if (error instanceof FunctionsRelayError) {
12
  console.log('Relay error:', error.message)
13
} else if (error instanceof FunctionsFetchError) {
14
  console.log('Fetch error:', error.message)
15
}
```

### Database Functions vs Edge Functions [\#](https://supabase.com/docs/guides/functions/development-tips\#database-functions-vs-edge-functions)

For data-intensive operations we recommend using [Database Functions](https://supabase.com/docs/guides/database/functions), which are executed within your database and can be called remotely using the [REST and GraphQL API](https://supabase.com/docs/guides/api).

For use-cases which require low-latency we recommend [Edge Functions](https://supabase.com/docs/guides/functions), which are globally-distributed and can be written in TypeScript.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/development-tips.mdx)

### Is this helpful?

NoYes

### On this page

[Skipping authorization checks](https://supabase.com/docs/guides/functions/development-tips#skipping-authorization-checks) [Using HTTP methods](https://supabase.com/docs/guides/functions/development-tips#using-http-methods) [Naming Edge Functions](https://supabase.com/docs/guides/functions/development-tips#naming-edge-functions) [Organizing your Edge Functions](https://supabase.com/docs/guides/functions/development-tips#organizing-your-edge-functions) [Using config.toml](https://supabase.com/docs/guides/functions/development-tips#using-configtoml) [Not using TypeScript](https://supabase.com/docs/guides/functions/development-tips#not-using-typescript) [Error handling](https://supabase.com/docs/guides/functions/development-tips#error-handling) [Database Functions vs Edge Functions](https://supabase.com/docs/guides/functions/development-tips#database-functions-vs-edge-functions)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)