---
url: "https://supabase.com/docs/guides/functions/ephemeral-storage"
title: "File Storage | Supabase Docs"
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
3. Advanced Features
5. [File Storage](https://supabase.com/docs/guides/functions/ephemeral-storage)

# File Storage

## Use persistent and ephemeral file storage

* * *

Edge Functions provides two flavors of file storage:

- Persistent - backed by S3 protocol, can read/write from any S3 compatible bucket, including Supabase Storage
- Ephemeral - You can read and write files to the `/tmp` directory. Only suitable for temporary operations

You can use file storage to:

- Handle complex file transformations and workflows
- Do data migrations between projects
- Process user uploaded files and store them
- Unzip archives and process contents before saving to database

* * *

## Persistent Storage [\#](https://supabase.com/docs/guides/functions/ephemeral-storage\#persistent-storage)

The persistent storage option is built on top of the S3 protocol. It allows you to mount any S3-compatible bucket, including Supabase Storage Buckets, as a directory for your Edge Functions.
You can perform operations such as reading and writing files to the mounted buckets as you would in a POSIX file system.

To access an S3 bucket from Edge Functions, you must set the following for environment variables in Edge Function Secrets.

- `S3FS_ENDPOINT_URL`
- `S3FS_REGION`
- `S3FS_ACCESS_KEY_ID`
- `S3FS_SECRET_ACCESS_KEY`

[Follow this guide](https://supabase.com/docs/guides/storage/s3/authentication) to enable and create an access key for Supabase Storage S3.

To access a file path in your mounted bucket from your Edge Function, use the prefix `/s3/YOUR-BUCKET-NAME`.

```
1
// read from S3 bucket
2
const data = await Deno.readFile('/s3/my-bucket/results.csv')
3

4
// make a directory
5
await Deno.mkdir('/s3/my-bucket/sub-dir')
6

7
// write to S3 bucket
8
await Deno.writeTextFile('/s3/my-bucket/demo.txt', 'hello world')
```

## Ephemeral storage [\#](https://supabase.com/docs/guides/functions/ephemeral-storage\#ephemeral-storage)

Ephemeral storage will reset on each function invocation. This means the files you write during an invocation can only be read within the same invocation.

You can use [Deno File System APIs](https://docs.deno.com/api/deno/file-system) or the [`node:fs`](https://docs.deno.com/api/node/fs/) module to access the `/tmp` path.

```
1
Deno.serve(async (req) => {
2
  if (req.headers.get('content-type') !== 'application/zip') {
3
    return new Response('file must be a zip file', {
4
      status: 400,
5
    })
6
  }
7

8
  const uploadId = crypto.randomUUID()
9
  await Deno.writeFile('/tmp/' + uploadId, req.body)
10

11
  // E.g. extract and process the zip file
12
  const zipFile = await Deno.readFile('/tmp/' + uploadId)
13
  // You could use a zip library to extract contents
14
  const extracted = await extractZip(zipFile)
15

16
  // Or process the file directly
17
  console.log(`Processing zip file: ${uploadId}, size: ${zipFile.length} bytes`)
18
})
```

* * *

## Common use cases [\#](https://supabase.com/docs/guides/functions/ephemeral-storage\#common-use-cases)

### Archive processing with background tasks [\#](https://supabase.com/docs/guides/functions/ephemeral-storage\#archive-processing-with-background-tasks)

You can use ephemeral storage with [Background Tasks](https://supabase.com/docs/guides/functions/background-tasks) to handle large file processing operations that exceed memory limits.

Imagine you have a Photo Album application that accepts photo uploads as zip files. A streaming implementation will run into memory limit errors with zip files exceeding 100MB, as it retains all archive files in memory simultaneously.

You can write the zip file to ephemeral storage first, then use a background task to extract and upload files to Supabase Storage. This way, you only read parts of the zip file to the memory.

```
1
import { BlobWriter, ZipReader } from 'https://deno.land/x/zipjs/index.js'
2
import { createClient } from 'jsr:@supabase/supabase-js@2'
3

4
const supabase = createClient(
5
  Deno.env.get('SUPABASE_URL'),
6
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
7
)
8

9
async function processZipFile(uploadId: string, filepath: string) {
10
  const file = await Deno.open(filepath, { read: true })
11
  const zipReader = new ZipReader(file.readable)
12
  const entries = await zipReader.getEntries()
13

14
  await supabase.storage.createBucket(uploadId, { public: false })
15

16
  await Promise.all(
17
    entries.map(async (entry) => {
18
      if (entry.directory) return
19

20
      // Read file entry from temp storage
21
      const blobWriter = new BlobWriter()
22
      const blob = await entry.getData(blobWriter)
23

24
      // Upload to permanent storage
25
      await supabase.storage.from(uploadId).upload(entry.filename, blob)
26

27
      console.log('uploaded', entry.filename)
28
    })
29
  )
30

31
  await zipReader.close()
32
}
33

34
Deno.serve(async (req) => {
35
  const uploadId = crypto.randomUUID()
36
  const filepath = `/tmp/${uploadId}.zip`
37

38
  // Write zip to ephemeral storage
39
  await Deno.writeFile(filepath, req.body)
40

41
  // Process in background to avoid memory limits
42
  EdgeRuntime.waitUntil(processZipFile(uploadId, filepath))
43

44
  return new Response(JSON.stringify({ uploadId }), {
45
    headers: { 'Content-Type': 'application/json' },
46
  })
47
})
```

### Image manipulation [\#](https://supabase.com/docs/guides/functions/ephemeral-storage\#image-manipulation)

Custom image manipulation workflows using [`magick-wasm`](https://supabase.com/docs/guides/functions/examples/image-manipulation).

```
1
Deno.serve(async (req) => {
2
  // Save uploaded image to temp storage
3
  const imagePath = `/tmp/input-${crypto.randomUUID()}.jpg`
4
  await Deno.writeFile(imagePath, req.body)
5

6
  // Process image with magick-wasm
7
  const processedPath = `/tmp/output-${crypto.randomUUID()}.jpg`
8
  // ... image manipulation logic
9

10
  // Read processed image and return
11
  const processedImage = await Deno.readFile(processedPath)
12
  return new Response(processedImage, {
13
    headers: { 'Content-Type': 'image/jpeg' },
14
  })
15
})
```

* * *

## Using synchronous file APIs [\#](https://supabase.com/docs/guides/functions/ephemeral-storage\#using-synchronous-file-apis)

You can safely use the following synchronous Deno APIs (and their Node counterparts) _during initial script evaluation_:

- Deno.statSync
- Deno.removeSync
- Deno.writeFileSync
- Deno.writeTextFileSync
- Deno.readFileSync
- Deno.readTextFileSync
- Deno.mkdirSync
- Deno.makeTempDirSync
- Deno.readDirSync

**Keep in mind** that the sync APIs are available only during initial script evaluation and aren’t supported in callbacks like HTTP handlers or `setTimeout`.

```
1
Deno.statSync('...') // ✅
2

3
setTimeout(() => {
4
  Deno.statSync('...') // 💣 ERROR! Deno.statSync is blocklisted on the current context
5
})
6

7
Deno.serve(() => {
8
  Deno.statSync('...') // 💣 ERROR! Deno.statSync is blocklisted on the current context
9
})
```

* * *

## Limits [\#](https://supabase.com/docs/guides/functions/ephemeral-storage\#limits)

There are no limits on S3 buckets you mount for Persistent storage.

Ephemeral Storage:

- Free projects: Up to 256MB of ephemeral storage
- Paid projects: Up to 512MB of ephemeral storage

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/ephemeral-storage.mdx)

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