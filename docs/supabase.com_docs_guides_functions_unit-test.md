---
url: "https://supabase.com/docs/guides/functions/unit-test"
title: "Testing your Edge Functions | Supabase Docs"
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
3. Debugging
5. [Testing your Functions](https://supabase.com/docs/guides/functions/unit-test)

# Testing your Edge Functions

## Writing Unit Tests for Edge Functions using Deno Test

* * *

Testing is an essential step in the development process to ensure the correctness and performance of your Edge Functions.

* * *

## Testing in Deno [\#](https://supabase.com/docs/guides/functions/unit-test\#testing-in-deno)

Deno has a built-in test runner that you can use for testing JavaScript or TypeScript code. You can read the [official documentation](https://docs.deno.com/runtime/manual/basics/testing/) for more information and details about the available testing functions.

* * *

## Folder structure [\#](https://supabase.com/docs/guides/functions/unit-test\#folder-structure)

We recommend creating your testing in a `supabase/functions/tests` directory, using the same name as the Function followed by `-test.ts`:

```
1
└── supabase
2
    ├── functions
3
    │   ├── function-one
4
    │   │   └── index.ts
5
    │   └── function-two
6
    │   │   └── index.ts
7
    │   └── tests
8
    │       └── function-one-test.ts  # Tests for function-one
9
    │       └── function-two-test.ts  # Tests for function-two
10
    └── config.toml
```

* * *

## Example [\#](https://supabase.com/docs/guides/functions/unit-test\#example)

The following script is a good example to get started with testing your Edge Functions:

```
1
// Import required libraries and modules
2
import { assert, assertEquals } from 'jsr:@std/assert@1'
3
import { createClient, SupabaseClient } from 'npm:@supabase/supabase-js@2'
4

5
// Will load the .env file to Deno.env
6
import 'jsr:@std/dotenv/load'
7

8
// Set up the configuration for the Supabase client
9
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
10
const supabaseKey = Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? ''
11
const options = {
12
  auth: {
13
    autoRefreshToken: false,
14
    persistSession: false,
15
    detectSessionInUrl: false,
16
  },
17
}
18

19
// Test the creation and functionality of the Supabase client
20
const testClientCreation = async () => {
21
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options)
22

23
  // Verify if the Supabase URL and key are provided
24
  if (!supabaseUrl) throw new Error('supabaseUrl is required.')
25
  if (!supabaseKey) throw new Error('supabaseKey is required.')
26

27
  // Test a simple query to the database
28
  const { data: table_data, error: table_error } = await client
29
    .from('my_table')
30
    .select('*')
31
    .limit(1)
32
  if (table_error) {
33
    throw new Error('Invalid Supabase client: ' + table_error.message)
34
  }
35
  assert(table_data, 'Data should be returned from the query.')
36
}
37

38
// Test the 'hello-world' function
39
const testHelloWorld = async () => {
40
  var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options)
41

42
  // Invoke the 'hello-world' function with a parameter
43
  const { data: func_data, error: func_error } = await client.functions.invoke('hello-world', {
44
    body: { name: 'bar' },
45
  })
46

47
  // Check for errors from the function invocation
48
  if (func_error) {
49
    throw new Error('Invalid response: ' + func_error.message)
50
  }
51

52
  // Log the response from the function
53
  console.log(JSON.stringify(func_data, null, 2))
54

55
  // Assert that the function returned the expected result
56
  assertEquals(func_data.message, 'Hello bar!')
57
}
58

59
// Register and run the tests
60
Deno.test('Client Creation Test', testClientCreation)
61
Deno.test('Hello-world Function Test', testHelloWorld)
```

This test case consists of two parts.

1. The first part tests the client library and verifies that the database can be connected to and returns values from a table (`my_table`).
2. The second part tests the edge function and checks if the received value matches the expected value. Here's a brief overview of the code:
   - We import various testing functions from the Deno standard library, including `assert`, `assertExists`, and `assertEquals`.
   - We import the `createClient` and `SupabaseClient` classes from the `@supabase/supabase-js` library to interact with the Supabase client.
   - We define the necessary configuration for the Supabase client, including the Supabase URL, API key, and authentication options.
   - The `testClientCreation` function tests the creation of a Supabase client instance and queries the database for data from a table. It verifies that data is returned from the query.
   - The `testHelloWorld` function tests the "Hello-world" Edge Function by invoking it using the Supabase client's `functions.invoke` method. It checks if the response message matches the expected greeting.
   - We run the tests using the `Deno.test` function, providing a descriptive name for each test case and the corresponding test function.

Make sure to replace the placeholders (`supabaseUrl`, `supabaseKey`, `my_table`) with the actual values relevant to your Supabase setup.

* * *

## Running Edge Functions locally [\#](https://supabase.com/docs/guides/functions/unit-test\#running-edge-functions-locally)

To locally test and debug Edge Functions, you can utilize the Supabase CLI. Let's explore how to run Edge Functions locally using the Supabase CLI:

1. Ensure that the Supabase server is running by executing the following command:



```
1
supabase start
```

2. In your terminal, use the following command to serve the Edge Functions locally:



```
1
supabase functions serve
```







This command starts a local server that runs your Edge Functions, enabling you to test and debug them in a development environment.

3. Create the environment variables file:



```
1
# creates the file
2
touch .env
3
# adds the SUPABASE_URL secret
4
echo "SUPABASE_URL=http://localhost:54321" >> .env
5
# adds the SUPABASE_PUBLISHABLE_KEY secret
6
echo "SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0" >> .env
7
# Alternatively, you can open it in your editor:
8
open .env
```

4. To run the tests, use the following command in your terminal:



```
1
deno test --allow-all supabase/functions/tests/function-one-test.ts
```


* * *

## Resources [\#](https://supabase.com/docs/guides/functions/unit-test\#resources)

- Full guide on Testing Supabase Edge Functions on [Mansueli's tips](https://blog.mansueli.com/testing-supabase-edge-functions-with-deno-test)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/unit-test.mdx)

### Is this helpful?

NoYes

### On this page

[Testing in Deno](https://supabase.com/docs/guides/functions/unit-test#testing-in-deno) [Folder structure](https://supabase.com/docs/guides/functions/unit-test#folder-structure) [Example](https://supabase.com/docs/guides/functions/unit-test#example) [Running Edge Functions locally](https://supabase.com/docs/guides/functions/unit-test#running-edge-functions-locally) [Resources](https://supabase.com/docs/guides/functions/unit-test#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)