---
url: "https://supabase.com/docs/guides/ai/quickstarts/generate-text-embeddings"
title: "Generate Embeddings | Supabase Docs"
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
5. [Generate Embeddings](https://supabase.com/docs/guides/ai/quickstarts/generate-text-embeddings)

# Generate Embeddings

## Generate text embeddings using Edge Functions.

* * *

This guide will walk you through how to generate high quality text embeddings in [Edge Functions](https://supabase.com/docs/guides/functions) using its built-in AI inference API, so no external API is required.

## Build the Edge Function [\#](https://supabase.com/docs/guides/ai/quickstarts/generate-text-embeddings\#build-the-edge-function)

Let's build an Edge Function that will accept an input string and generate an embedding for it. Edge Functions are server-side TypeScript HTTP endpoints that run on-demand closest to your users.

1

### Set up Supabase locally

Make sure you have the latest version of the [Supabase CLI installed](https://supabase.com/docs/guides/cli/getting-started).

Initialize Supabase in the root directory of your app and start your local stack.

```
1
supabase init
2
supabase start
```

2

### Create Edge Function

Create an Edge Function that we will use to generate embeddings. We'll call this `embed` (you can name this anything you like).

This will create a new TypeScript file called `index.ts` under `./supabase/functions/embed`.

```
1
supabase functions new embed
```

3

### Setup Inference Session

Let's create a new inference session to be used in the lifetime of this function. Multiple requests can use the same inference session.

Currently, only the `gte-small` ( [https://huggingface.co/Supabase/gte-small](https://huggingface.co/Supabase/gte-small)) text embedding model is supported in Supabase's Edge Runtime.

```
1
const session = new Supabase.ai.Session('gte-small');
```

4

### Implement request handler

Modify our request handler to accept an `input` string from the POST request JSON body.

Then generate the embedding by calling `session.run(input)`.

```
1
Deno.serve(async (req) => {
2
  // Extract input string from JSON body
3
  const { input } = await req.json();
4

5
  // Generate the embedding from the user input
6
  const embedding = await session.run(input, {
7
    mean_pool: true,
8
    normalize: true,
9
  });
10

11
  // Return the embedding
12
  return new Response(
13
    JSON.stringify({ embedding }),
14
    { headers: { 'Content-Type': 'application/json' } }
15
  );
16
});
```

Note the two options we pass to `session.run()`:

- `mean_pool`: The first option sets `pooling` to `mean`. Pooling refers to how token-level embedding representations are compressed into a single sentence embedding that reflects the meaning of the entire sentence. Average pooling is the most common type of pooling for sentence embeddings.
- `normalize`: The second option normalizes the embedding vector so that it can be used with distance measures like dot product. A normalized vector means its length (magnitude) is 1 - also referred to as a unit vector. A vector is normalized by dividing each element by the vector's length (magnitude), which maintains its direction but changes its length to 1.

5

### Test it!

To test the Edge Function, first start a local functions server.

```
1
supabase functions serve
```

Then in a new shell, create an HTTP request using cURL and pass in your input in the JSON body.

```
1
curl --request POST 'http://localhost:54321/functions/v1/embed' \
2
  --header 'Authorization: Bearer ANON_KEY' \
3
  --header 'Content-Type: application/json' \
4
  --data '{ "input": "hello world" }'
```

Be sure to replace `ANON_KEY` with your project's anonymous key. You can get this key by running `supabase status`.

## Next steps [\#](https://supabase.com/docs/guides/ai/quickstarts/generate-text-embeddings\#next-steps)

- Learn more about [embedding concepts](https://supabase.com/docs/guides/ai/concepts)
- [Store your embeddings](https://supabase.com/docs/guides/ai/vector-columns) in a database

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/quickstarts/generate-text-embeddings.mdx)

### Is this helpful?

NoYes

### On this page

[Build the Edge Function](https://supabase.com/docs/guides/ai/quickstarts/generate-text-embeddings#build-the-edge-function) [Next steps](https://supabase.com/docs/guides/ai/quickstarts/generate-text-embeddings#next-steps)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)