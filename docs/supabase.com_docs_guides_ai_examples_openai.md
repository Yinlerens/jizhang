---
url: "https://supabase.com/docs/guides/ai/examples/openai"
title: "Generating OpenAI GPT3 completions | Supabase Docs"
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

[AI & Vectors](https://supabase.com/docs/guides/ai)

[Overview](https://supabase.com/docs/guides/ai)

[Concepts](https://supabase.com/docs/guides/ai/concepts)

[Structured & unstructured](https://supabase.com/docs/guides/ai/structured-unstructured)

Learn[Vector columns](https://supabase.com/docs/guides/ai/vector-columns)

Vector indexes

[Automatic embeddings](https://supabase.com/docs/guides/ai/automatic-embeddings)
[Engineering for scale](https://supabase.com/docs/guides/ai/engineering-for-scale)
[Choosing Compute Add-on](https://supabase.com/docs/guides/ai/choosing-compute-addon)
[Going to Production](https://supabase.com/docs/guides/ai/going-to-prod)
[RAG with Permissions](https://supabase.com/docs/guides/ai/rag-with-permissions)

Search[Semantic search](https://supabase.com/docs/guides/ai/semantic-search)
[Keyword search](https://supabase.com/docs/guides/ai/keyword-search)
[Hybrid search](https://supabase.com/docs/guides/ai/hybrid-search)

JavaScript Examples[OpenAI completions using Edge Functions](https://supabase.com/docs/guides/ai/examples/openai)
[Generate image captions using Hugging Face](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning)
[Generate Embeddings](https://supabase.com/docs/guides/ai/quickstarts/generate-text-embeddings)
[Adding generative Q&A to your documentation](https://supabase.com/docs/guides/ai/examples/headless-vector-search)
[Adding generative Q&A to your Next.js site](https://supabase.com/docs/guides/ai/examples/nextjs-vector-search)

Python Client[Choosing a Client](https://supabase.com/docs/guides/ai/python-clients)
[API](https://supabase.com/docs/guides/ai/python/api)
[Collections](https://supabase.com/docs/guides/ai/python/collections)
[Indexes](https://supabase.com/docs/guides/ai/python/indexes)
[Metadata](https://supabase.com/docs/guides/ai/python/metadata)

Python Examples[Developing locally with Vecs](https://supabase.com/docs/guides/ai/vecs-python-client)
[Creating and managing collections](https://supabase.com/docs/guides/ai/quickstarts/hello-world)
[Text Deduplication](https://supabase.com/docs/guides/ai/quickstarts/text-deduplication)
[Face similarity search](https://supabase.com/docs/guides/ai/quickstarts/face-similarity)
[Image search with OpenAI CLIP](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip)
[Semantic search with Amazon Titan](https://supabase.com/docs/guides/ai/examples/semantic-image-search-amazon-titan)
[Building ChatGPT Plugins](https://supabase.com/docs/guides/ai/examples/building-chatgpt-plugins)

Third-Party Tools[LangChain](https://supabase.com/docs/guides/ai/langchain)
[Hugging Face](https://supabase.com/docs/guides/ai/hugging-face)
[Google Colab](https://supabase.com/docs/guides/ai/google-colab)
[LlamaIndex](https://supabase.com/docs/guides/ai/integrations/llamaindex)
[Roboflow](https://supabase.com/docs/guides/ai/integrations/roboflow)
[Amazon Bedrock](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock)
[Mixpeek](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search)

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

AI & Vectors

1. [AI & Vectors](https://supabase.com/docs/guides/ai)
3. JavaScript Examples
5. [OpenAI completions using Edge Functions](https://supabase.com/docs/guides/ai/examples/openai)

# Generating OpenAI GPT3 completions

## Generate GPT text completions using OpenAI and Supabase Edge Functions.

* * *

OpenAI provides a [completions API](https://platform.openai.com/docs/api-reference/completions) that allows you to use their generative GPT models in your own applications.

OpenAI's API is intended to be used from the server-side. Supabase offers Edge Functions to make it easy to interact with third party APIs like OpenAI.

## Setup Supabase project [\#](https://supabase.com/docs/guides/ai/examples/openai\#setup-supabase-project)

If you haven't already, [install the Supabase CLI](https://supabase.com/docs/guides/cli) and initialize your project:

```
1
supabase init
```

## Create edge function [\#](https://supabase.com/docs/guides/ai/examples/openai\#create-edge-function)

Scaffold a new edge function called `openai` by running:

```
1
supabase functions new openai
```

A new edge function will now exist under `./supabase/functions/openai/index.ts`.

We'll design the function to take your user's query (via POST request) and forward it to OpenAI's API.

```
1
import OpenAI from 'https://deno.land/x/openai@v4.24.0/mod.ts'
2

3
Deno.serve(async (req) => {
4
  const { query } = await req.json()
5
  const apiKey = Deno.env.get('OPENAI_API_KEY')
6
  const openai = new OpenAI({
7
    apiKey: apiKey,
8
  })
9

10
  // Documentation here: https://github.com/openai/openai-node
11
  const chatCompletion = await openai.chat.completions.create({
12
    messages: [{ role: 'user', content: query }],
13
    // Choose model from here: https://platform.openai.com/docs/models
14
    model: 'gpt-3.5-turbo',
15
    stream: false,
16
  })
17

18
  const reply = chatCompletion.choices[0].message.content
19

20
  return new Response(reply, {
21
    headers: { 'Content-Type': 'text/plain' },
22
  })
23
})
```

Note that we are setting `stream` to `false` which will wait until the entire response is complete before returning. If you wish to stream GPT's response word-by-word back to your client, set `stream` to `true`.

## Create OpenAI key [\#](https://supabase.com/docs/guides/ai/examples/openai\#create-openai-key)

You may have noticed we were passing `OPENAI_API_KEY` in the Authorization header to OpenAI. To generate this key, go to [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) and create a new secret key.

After getting the key, copy it into a new file called `.env.local` in your `./supabase` folder:

```
1
OPENAI_API_KEY=your-key-here
```

## Run locally [\#](https://supabase.com/docs/guides/ai/examples/openai\#run-locally)

Serve the edge function locally by running:

```
1
supabase functions serve --env-file ./supabase/.env.local --no-verify-jwt
```

Notice how we are passing in the `.env.local` file.

Use cURL or Postman to make a POST request to [http://localhost:54321/functions/v1/openai](http://localhost:54321/functions/v1/openai).

```
1
curl -i --location --request POST http://localhost:54321/functions/v1/openai \
2
  --header 'Content-Type: application/json' \
3
  --data '{"query":"What is Supabase?"}'
```

You should see a GPT response come back from OpenAI!

## Deploy [\#](https://supabase.com/docs/guides/ai/examples/openai\#deploy)

Deploy your function to the cloud by running:

```
1
supabase functions deploy --no-verify-jwt openai
2
supabase secrets set --env-file ./supabase/.env.local
```

## Go deeper [\#](https://supabase.com/docs/guides/ai/examples/openai\#go-deeper)

If you're interesting in learning how to use this to build your own ChatGPT, read [the blog post](https://supabase.com/blog/chatgpt-supabase-docs) and check out the video:

ClippyGPT - How I Built Supabase’s OpenAI Doc Search (Embeddings) - YouTube

[Photo image of Rabbit Hole Syndrome](https://www.youtube.com/channel/UCXIa1dlKtpeCEBHObZFQgsA?embeds_referring_euri=https%3A%2F%2Fsupabase.com%2F)

Rabbit Hole Syndrome

26.5K subscribers

[ClippyGPT - How I Built Supabase’s OpenAI Doc Search (Embeddings)](https://www.youtube.com/watch?v=Yhtjd7yGGGA)

Rabbit Hole Syndrome

Search

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

Watch later

Share

Copy link

Watch on

0:00

/

•Live

•

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/examples/openai.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2F29p8kIqyU_Y%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Setup Supabase project](https://supabase.com/docs/guides/ai/examples/openai#setup-supabase-project) [Create edge function](https://supabase.com/docs/guides/ai/examples/openai#create-edge-function) [Create OpenAI key](https://supabase.com/docs/guides/ai/examples/openai#create-openai-key) [Run locally](https://supabase.com/docs/guides/ai/examples/openai#run-locally) [Deploy](https://supabase.com/docs/guides/ai/examples/openai#deploy) [Go deeper](https://supabase.com/docs/guides/ai/examples/openai#go-deeper)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)