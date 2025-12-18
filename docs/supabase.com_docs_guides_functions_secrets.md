---
url: "https://supabase.com/docs/guides/functions/secrets"
title: "Environment Variables | Supabase Docs"
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
3. Configuration
5. [Environment Variables](https://supabase.com/docs/guides/functions/secrets)

# Environment Variables

## Manage sensitive data securely across environments.

* * *

## Default secrets [\#](https://supabase.com/docs/guides/functions/secrets\#default-secrets)

Edge Functions have access to these secrets by default:

- `SUPABASE_URL`: The API gateway for your Supabase project
- `SUPABASE_ANON_KEY`: The `anon` key for your Supabase API. This is safe to use in a browser when you have Row Level Security enabled
- `SUPABASE_SERVICE_ROLE_KEY`: The `service_role` key for your Supabase API. This is safe to use in Edge Functions, but it should NEVER be used in a browser. This key will bypass Row Level Security
- `SUPABASE_DB_URL`: The URL for your Postgres database. You can use this to connect directly to your database

In a hosted environment, functions have access to the following environment variables:

- `SB_REGION`: The region function was invoked
- `SB_EXECUTION_ID`: A UUID of function instance ( [isolate](https://supabase.com/docs/guides/functions/architecture#4-execution-mechanics-fast-and-isolated))
- `DENO_DEPLOYMENT_ID`: Version of the function code (`{project_ref}_{function_id}_{version}`)

* * *

## Accessing environment variables [\#](https://supabase.com/docs/guides/functions/secrets\#accessing-environment-variables)

You can access environment variables using Deno's built-in handler, and passing it the name of the environment variable you’d like to access.

```
1
Deno.env.get('NAME_OF_SECRET')
```

For example, in a function:

```
1
import { createClient } from 'npm:@supabase/supabase-js@2'
2

3
// For user-facing operations (respects RLS)
4
const supabase = createClient(
5
  Deno.env.get('SUPABASE_URL')!,
6
  Deno.env.get('SUPABASE_ANON_KEY')!
7
)
8

9
// For admin operations (bypasses RLS)
10
const supabaseAdmin = createClient(
11
  Deno.env.get('SUPABASE_URL')!,
12
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
13
)
```

* * *

### Local secrets [\#](https://supabase.com/docs/guides/functions/secrets\#local-secrets)

In development, you can load environment variables in two ways:

1. Through an `.env` file placed at `supabase/functions/.env`, which is automatically loaded on `supabase start`
2. Through the `--env-file` option for `supabase functions serve`. This allows you to use custom file names like `.env.local` to distinguish between different environments.

```
1
supabase functions serve --env-file .env.local
```

Never check your `.env` files into Git! Instead, add the path to this file to your `.gitignore`.

We can automatically access the secrets in our Edge Functions through Deno’s handler

```
1
const secretKey = Deno.env.get('STRIPE_SECRET_KEY')
```

Now we can invoke our function locally. If you're using the default `.env` file at `supabase/functions/.env`, it's automatically loaded:

```
1
supabase functions serve hello-world
```

Or you can specify a custom `.env` file with the `--env-file` flag:

```
1
supabase functions serve hello-world --env-file .env.local
```

This is useful for managing different environments (development, staging, etc.).

* * *

### Production secrets [\#](https://supabase.com/docs/guides/functions/secrets\#production-secrets)

You will also need to set secrets for your production Edge Functions. You can do this via the Dashboard or using the CLI.

**Using the Dashboard**:

1. Visit [Edge Function Secrets Management](https://supabase.com/dashboard/project/_/settings/functions) page in your Dashboard.
2. Add the Key and Value for your secret and press Save

Note that you can paste multiple secrets at a time.

**Using the CLI**

You can create a `.env` file to help deploy your secrets to production

```
1
# .env
2
STRIPE_SECRET_KEY=sk_live_...
```

Never check your `.env` files into Git! Instead, add the path to this file to your `.gitignore`.

You can push all the secrets from the `.env` file to your remote project using `supabase secrets set`. This makes the environment visible in the dashboard as well.

```
1
supabase secrets set --env-file .env
```

Alternatively, this command also allows you to set production secrets individually rather than storing them in a `.env` file.

```
1
supabase secrets set STRIPE_SECRET_KEY=sk_live_...
```

To see all the secrets which you have set remotely, you can use `supabase secrets list`

```
1
supabase secrets list
```

You don't need to re-deploy after setting your secrets. They're available immediately in your
functions.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/secrets.mdx)

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