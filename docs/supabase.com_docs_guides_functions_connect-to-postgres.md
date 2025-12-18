---
url: "https://supabase.com/docs/guides/functions/connect-to-postgres"
title: "Integrating with Supabase Database (Postgres) | Supabase Docs"
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
5. [Supabase Database (Postgres)](https://supabase.com/docs/guides/functions/connect-to-postgres)

# Integrating with Supabase Database (Postgres)

## Connect to your Postgres database from Edge Functions.

* * *

Connect to your Postgres database from an Edge Function by using the `supabase-js` client.
You can also use other Postgres clients like [Deno Postgres](https://deno.land/x/postgres)

* * *

## Using supabase-js [\#](https://supabase.com/docs/guides/functions/connect-to-postgres\#using-supabase-js)

The `supabase-js` client handles authorization with Row Level Security and automatically formats responses as JSON. This is the recommended approach for most applications:

```
1
import { createClient } from 'npm:@supabase/supabase-js@2'
2

3
Deno.serve(async (req) => {
4
  try {
5
    const supabase = createClient(
6
      Deno.env.get('SUPABASE_URL') ?? '',
7
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? '',
8
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
9
    )
10

11
    const { data, error } = await supabase.from('countries').select('*')
12

13
    if (error) {
14
      throw error
15
    }
16

17
    return new Response(JSON.stringify({ data }), {
18
      headers: { 'Content-Type': 'application/json' },
19
      status: 200,
20
    })
21
  } catch (err) {
22
    return new Response(String(err?.message ?? err), { status: 500 })
23
  }
24
})
```

This enables:

- Automatic Row Level Security enforcement
- Built-in JSON serialization
- Consistent error handling
- TypeScript support for database schema

* * *

## Using a Postgres client [\#](https://supabase.com/docs/guides/functions/connect-to-postgres\#using-a-postgres-client)

Because Edge Functions are a server-side technology, it's safe to connect directly to your database using any popular Postgres client. This means you can run raw SQL from your Edge Functions.

Here is how you can connect to the database using Deno Postgres driver and run raw SQL. Check out the [full example](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/postgres-on-the-edge).

```
1
import { Pool } from 'https://deno.land/x/postgres@v0.17.0/mod.ts'
2

3
// Create a database pool with one connection.
4
const pool = new Pool(
5
  {
6
    tls: { enabled: false },
7
    database: 'postgres',
8
    hostname: Deno.env.get('DB_HOSTNAME'),
9
    user: Deno.env.get('DB_USER'),
10
    port: 6543,
11
    password: Deno.env.get('DB_PASSWORD'),
12
  },
13
  1
14
)
15

16
Deno.serve(async (_req) => {
17
  try {
18
    // Grab a connection from the pool
19
    const connection = await pool.connect()
20

21
    try {
22
      // Run a query
23
      const result = await connection.queryObject`SELECT * FROM animals`
24
      const animals = result.rows // [{ id: 1, name: "Lion" }, ...]
25

26
      // Encode the result as pretty printed JSON
27
      const body = JSON.stringify(
28
        animals,
29
        (_key, value) => (typeof value === 'bigint' ? value.toString() : value),
30
        2
31
      )
32

33
      // Return the response with the correct content type header
34
      return new Response(body, {
35
        status: 200,
36
        headers: {
37
          'Content-Type': 'application/json; charset=utf-8',
38
        },
39
      })
40
    } finally {
41
      // Release the connection back into the pool
42
      connection.release()
43
    }
44
  } catch (err) {
45
    console.error(err)
46
    return new Response(String(err?.message ?? err), { status: 500 })
47
  }
48
})
```

[View source](https://github.com/supabase/supabase/blob/2fbb6cb9a7d6fb0a10f74b0a421af33038e557c7/examples/edge-functions/supabase/functions/postgres-on-the-edge/index.ts)

* * *

## Using Drizzle [\#](https://supabase.com/docs/guides/functions/connect-to-postgres\#using-drizzle)

You can use Drizzle together with [Postgres.js](https://github.com/porsager/postgres). Both can be loaded directly from npm:

**Set up dependencies in `import_map.json`**:

```
1
{
2
  "imports": {
3
    "drizzle-orm": "npm:drizzle-orm@0.29.1",
4
    "drizzle-orm/": "npm:/drizzle-orm@0.29.1/",
5
    "postgres": "npm:postgres@3.4.3"
6
  }
7
}
```

**Use in your function**:

```
1
import { drizzle } from 'drizzle-orm/postgres-js'
2
import postgres from 'postgres'
3
import { countries } from '../_shared/schema.ts'
4

5
const connectionString = Deno.env.get('SUPABASE_DB_URL')!
6

7
Deno.serve(async (_req) => {
8
  // Disable prefetch as it is not supported for "Transaction" pool mode
9
  const client = postgres(connectionString, { prepare: false })
10
  const db = drizzle(client)
11
  const allCountries = await db.select().from(countries)
12

13
  return Response.json(allCountries)
14
})
```

You can find the full example on [GitHub](https://github.com/thorwebdev/edgy-drizzle).

* * *

## SSL connections [\#](https://supabase.com/docs/guides/functions/connect-to-postgres\#ssl-connections)

### Production [\#](https://supabase.com/docs/guides/functions/connect-to-postgres\#production)

Deployed edge functions are pre-configured to use SSL for connections to the Supabase database. You don't need to add any extra configurations.

### Local development [\#](https://supabase.com/docs/guides/functions/connect-to-postgres\#local-development)

If you want to use SSL connections during local development, follow these steps:

1. Download the SSL certificate from [Database Settings](https://supabase.com/dashboard/project/_/database/settings)
2. Add to your [local .env file](https://supabase.com/docs/guides/functions/secrets), add these two variables:

```
1
SSL_CERT_FILE=/path/to/cert.crt # set the path to the downloaded cert
2
DENO_TLS_CA_STORE=mozilla,system
```

Then, restart your local development server:

```
1
supabase functions serve your-function
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/connect-to-postgres.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2Fcl7EuF1-RsY%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Using supabase-js](https://supabase.com/docs/guides/functions/connect-to-postgres#using-supabase-js) [Using a Postgres client](https://supabase.com/docs/guides/functions/connect-to-postgres#using-a-postgres-client) [Using Drizzle](https://supabase.com/docs/guides/functions/connect-to-postgres#using-drizzle) [SSL connections](https://supabase.com/docs/guides/functions/connect-to-postgres#ssl-connections) [Production](https://supabase.com/docs/guides/functions/connect-to-postgres#production) [Local development](https://supabase.com/docs/guides/functions/connect-to-postgres#local-development)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)