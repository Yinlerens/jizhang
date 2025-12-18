---
url: "https://supabase.com/docs/guides/functions/ai-models"
title: "Running AI Models | Supabase Docs"
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
5. [AI Models](https://supabase.com/docs/guides/functions/ai-models)

# Running AI Models

## Run AI models in Edge Functions using the built-in Supabase AI API.

* * *

Edge Functions have a built-in API for running AI models. You can use this API to generate embeddings, build conversational workflows, and do other AI related tasks in your Edge Functions.

This allows you to:

- Generate text embeddings without external dependencies
- Run Large Language Models via Ollama or Llamafile
- Build conversational AI workflows

* * *

## Setup [\#](https://supabase.com/docs/guides/functions/ai-models\#setup)

There are no external dependencies or packages to install to enable the API.

Create a new inference session:

```
1
const model = new Supabase.ai.Session('model-name')
```

To get type hints and checks for the API, import types from `functions-js`:

```
1
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
```

### Running a model inference [\#](https://supabase.com/docs/guides/functions/ai-models\#running-a-model-inference)

Once the session is instantiated, you can call it with inputs to perform inferences:

```
1
// For embeddings (gte-small model)
2
const embeddings = await model.run('Hello world', {
3
  mean_pool: true,
4
  normalize: true,
5
})
6

7
// For text generation (non-streaming)
8
const response = await model.run('Write a haiku about coding', {
9
  stream: false,
10
  timeout: 30,
11
})
12

13
// For streaming responses
14
const stream = await model.run('Tell me a story', {
15
  stream: true,
16
  mode: 'ollama',
17
})
```

* * *

## Generate text embeddings [\#](https://supabase.com/docs/guides/functions/ai-models\#generate-text-embeddings)

Generate text embeddings using the built-in [`gte-small`](https://huggingface.co/Supabase/gte-small) model:

`gte-small` model exclusively caters to English texts, and any lengthy texts will be truncated to a maximum of 512 tokens. While you can provide inputs longer than 512 tokens, truncation may affect the accuracy.

```
1
const model = new Supabase.ai.Session('gte-small')
2

3
Deno.serve(async (req: Request) => {
4
  const params = new URL(req.url).searchParams
5
  const input = params.get('input')
6
  const output = await model.run(input, { mean_pool: true, normalize: true })
7
  return new Response(JSON.stringify(output), {
8
    headers: {
9
      'Content-Type': 'application/json',
10
      Connection: 'keep-alive',
11
    },
12
  })
13
})
```

* * *

## Using Large Language Models (LLM) [\#](https://supabase.com/docs/guides/functions/ai-models\#using-large-language-models-llm)

Inference via larger models is supported via [Ollama](https://ollama.com/) and [Mozilla Llamafile](https://github.com/Mozilla-Ocho/llamafile). In the first iteration, you can use it with a self-managed Ollama or [Llamafile server](https://www.docker.com/blog/a-quick-guide-to-containerizing-llamafile-with-docker-for-ai-applications/).

We are progressively rolling out support for the hosted solution. To sign up for early access, fill out [this form](https://forms.supabase.com/supabase.ai-llm-early-access).

* * *

## Running locally [\#](https://supabase.com/docs/guides/functions/ai-models\#running-locally)

OllamaMozilla Llamafile

1

### Install Ollama

[Install Ollama](https://github.com/ollama/ollama?tab=readme-ov-file#ollama) and pull the Mistral model

```
1
ollama pull mistral
```

2

### Run the Ollama server

```
1
ollama serve
```

3

### Set the function secret

Set a function secret called `AI_INFERENCE_API_HOST` to point to the Ollama server

```
1
echo "AI_INFERENCE_API_HOST=http://host.docker.internal:11434" >> supabase/functions/.env
```

4

### Create a new function

```
1
supabase functions new ollama-test
```

```
1
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
2
const session = new Supabase.ai.Session('mistral')
3

4
Deno.serve(async (req: Request) => {
5
  const params = new URL(req.url).searchParams
6
  const prompt = params.get('prompt') ?? ''
7

8
  // Get the output as a stream
9
  const output = await session.run(prompt, { stream: true })
10

11
  const headers = new Headers({
12
    'Content-Type': 'text/event-stream',
13
    Connection: 'keep-alive',
14
  })
15

16
  // Create a stream
17
  const stream = new ReadableStream({
18
    async start(controller) {
19
      const encoder = new TextEncoder()
20

21
      try {
22
        for await (const chunk of output) {
23
          controller.enqueue(encoder.encode(chunk.response ?? ''))
24
        }
25
      } catch (err) {
26
        console.error('Stream error:', err)
27
      } finally {
28
        controller.close()
29
      }
30
    },
31
  })
32

33
  // Return the stream to the user
34
  return new Response(stream, {
35
    headers,
36
  })
37
})
```

5

### Serve the function

```
1
supabase functions serve --env-file supabase/functions/.env
```

6

### Execute the function

```
1
curl --get "http://localhost:54321/functions/v1/ollama-test" \
2
--data-urlencode "prompt=write a short rap song about Supabase, the Postgres Developer platform, as sung by Nicki Minaj" \
3
-H "Authorization: $ANON_KEY"
```

* * *

## Deploying to production [\#](https://supabase.com/docs/guides/functions/ai-models\#deploying-to-production)

Once the function is working locally, it's time to deploy to production.

1

### Deploy an Ollama or Llamafile server

Deploy an Ollama or Llamafile server and set a function secret called `AI_INFERENCE_API_HOST`
to point to the deployed server:

```
1
supabase secrets set AI_INFERENCE_API_HOST=https://path-to-your-llm-server/
```

2

### Deploy the function

```
1
supabase functions deploy
```

3

### Execute the function

```
1
curl --get "https://project-ref.supabase.co/functions/v1/ollama-test" \
2
--data-urlencode "prompt=write a short rap song about Supabase, the Postgres Developer platform, as sung by Nicki Minaj" \
3
-H "Authorization: $ANON_KEY"
```

As demonstrated in the video above, running Ollama locally is typically slower than running it in on a server with dedicated GPUs. We are collaborating with the Ollama team to improve local performance.

In the future, a hosted LLM API, will be provided as part of the Supabase platform. Supabase will scale and manage the API and GPUs for you. To sign up for early access, fill up [this form](https://forms.supabase.com/supabase.ai-llm-early-access).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/ai-models.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2Fw4Rr_1whU-U%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Setup](https://supabase.com/docs/guides/functions/ai-models#setup) [Running a model inference](https://supabase.com/docs/guides/functions/ai-models#running-a-model-inference) [Generate text embeddings](https://supabase.com/docs/guides/functions/ai-models#generate-text-embeddings) [Using Large Language Models (LLM)](https://supabase.com/docs/guides/functions/ai-models#using-large-language-models-llm) [Running locally](https://supabase.com/docs/guides/functions/ai-models#running-locally) [Deploying to production](https://supabase.com/docs/guides/functions/ai-models#deploying-to-production)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)