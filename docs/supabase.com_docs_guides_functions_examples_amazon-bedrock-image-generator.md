---
url: "https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator"
title: "Generate Images with Amazon Bedrock | Supabase Docs"
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
3. Examples
5. [Generating AI images](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator)

# Generate Images with Amazon Bedrock

* * *

[Amazon Bedrock](https://aws.amazon.com/bedrock) is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies like AI21 Labs, Anthropic, Cohere, Meta, Mistral AI, Stability AI, and Amazon. Each model is accessible through a common API which implements a broad set of features to help build generative AI applications with security, privacy, and responsible AI in mind.

This guide will walk you through an example using the Amazon Bedrock JavaScript SDK in Supabase Edge Functions to generate images using the [Amazon Titan Image Generator G1](https://aws.amazon.com/blogs/machine-learning/use-amazon-titan-models-for-image-generation-editing-and-searching/) model.

## Setup [\#](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator\#setup)

- In your AWS console, navigate to Amazon Bedrock and under "Request model access", select the Amazon Titan Image Generator G1 model.
- In your Supabase project, create a `.env` file in the `supabase` directory with the following contents:

```
1
AWS_DEFAULT_REGION="<your_region>"
2
AWS_ACCESS_KEY_ID="<replace_your_own_credentials>"
3
AWS_SECRET_ACCESS_KEY="<replace_your_own_credentials>"
4
AWS_SESSION_TOKEN="<replace_your_own_credentials>"
5

6
# Mocked config files
7
AWS_SHARED_CREDENTIALS_FILE="./aws/credentials"
8
AWS_CONFIG_FILE="./aws/config"
```

### Configure Storage [\#](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator\#configure-storage)

- \[locally\] Run `supabase start`
- Open Studio URL: [locally](http://127.0.0.1:54323/project/default/storage/buckets) \| [hosted](https://app.supabase.com/project/_/storage/buckets)
- Navigate to Storage
- Click "New bucket"
- Create a new public bucket called "images"

## Code [\#](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator\#code)

Create a new function in your project:

```
1
supabase functions new amazon-bedrock
```

And add the code to the `index.ts` file:

```
1
// We need to mock the file system for the AWS SDK to work.
2
import { prepareVirtualFile } from 'https://deno.land/x/mock_file@v1.1.2/mod.ts'
3

4
import { BedrockRuntimeClient, InvokeModelCommand } from 'npm:@aws-sdk/client-bedrock-runtime'
5
import { createClient } from 'npm:@supabase/supabase-js'
6
import { decode } from 'npm:base64-arraybuffer'
7

8
console.log('Hello from Amazon Bedrock!')
9

10
Deno.serve(async (req) => {
11
  prepareVirtualFile('./aws/config')
12
  prepareVirtualFile('./aws/credentials')
13

14
  const client = new BedrockRuntimeClient({
15
    region: Deno.env.get('AWS_DEFAULT_REGION') ?? 'us-west-2',
16
    credentials: {
17
      accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID') ?? '',
18
      secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY') ?? '',
19
      sessionToken: Deno.env.get('AWS_SESSION_TOKEN') ?? '',
20
    },
21
  })
22

23
  const { prompt, seed } = await req.json()
24
  console.log(prompt)
25
  const input = {
26
    contentType: 'application/json',
27
    accept: '*/*',
28
    modelId: 'amazon.titan-image-generator-v1',
29
    body: JSON.stringify({
30
      taskType: 'TEXT_IMAGE',
31
      textToImageParams: { text: prompt },
32
      imageGenerationConfig: {
33
        numberOfImages: 1,
34
        quality: 'standard',
35
        cfgScale: 8.0,
36
        height: 512,
37
        width: 512,
38
        seed: seed ?? 0,
39
      },
40
    }),
41
  }
42

43
  const command = new InvokeModelCommand(input)
44
  const response = await client.send(command)
45
  console.log(response)
46

47
  if (response.$metadata.httpStatusCode === 200) {
48
    const { body, $metadata } = response
49

50
    const textDecoder = new TextDecoder('utf-8')
51
    const jsonString = textDecoder.decode(body.buffer)
52
    const parsedData = JSON.parse(jsonString)
53
    console.log(parsedData)
54
    const image = parsedData.images[0]
55

56
    const supabaseClient = createClient(
57
      // Supabase API URL - env var exported by default.
58
      Deno.env.get('SUPABASE_URL')!,
59
      // Supabase API ANON KEY - env var exported by default.
60
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
61
    )
62

63
    const { data: upload, error: uploadError } = await supabaseClient.storage
64
      .from('images')
65
      .upload(`${$metadata.requestId ?? ''}.png`, decode(image), {
66
        contentType: 'image/png',
67
        cacheControl: '3600',
68
        upsert: false,
69
      })
70
    if (!upload) {
71
      return Response.json(uploadError)
72
    }
73
    const { data } = supabaseClient.storage.from('images').getPublicUrl(upload.path!)
74
    return Response.json(data)
75
  }
76

77
  return Response.json(response)
78
})
```

## Run the function locally [\#](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator\#run-the-function-locally)

1. Run `supabase start` (see: [https://supabase.com/docs/reference/cli/supabase-start](https://supabase.com/docs/reference/cli/supabase-start))
2. Start with env: `supabase functions serve --env-file supabase/.env`
3. Make an HTTP request:

```
1
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/amazon-bedrock' \
2
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
3
    --header 'Content-Type: application/json' \
4
    --data '{"prompt":"A beautiful picture of a bird"}'
```

4. Navigate back to your storage bucket. You might have to hit the refresh button to see the uploaded image.

## Deploy to your hosted project [\#](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator\#deploy-to-your-hosted-project)

```
1
supabase link
2
supabase functions deploy amazon-bedrock
3
supabase secrets set --env-file supabase/.env
```

You've now deployed a serverless function that uses AI to generate and upload images to your Supabase storage bucket.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/examples/amazon-bedrock-image-generator.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FKIwN2TmkTlg%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Setup](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator#setup) [Configure Storage](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator#configure-storage) [Code](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator#code) [Run the function locally](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator#run-the-function-locally) [Deploy to your hosted project](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator#deploy-to-your-hosted-project)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)