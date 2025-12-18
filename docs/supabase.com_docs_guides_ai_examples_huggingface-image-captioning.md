---
url: "https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning"
title: "Generate image captions using Hugging Face | Supabase Docs"
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
5. [Generate image captions using Hugging Face](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning)

# Generate image captions using Hugging Face

## Use the Hugging Face Inference API to make calls to 100,000+ Machine Learning models from Supabase Edge Functions.

* * *

We can combine Hugging Face with [Supabase Storage](https://supabase.com/storage) and [Database Webhooks](https://supabase.com/docs/guides/database/webhooks) to automatically caption for any image we upload to a storage bucket.

## About Hugging Face [\#](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning\#about-hugging-face)

[Hugging Face](https://huggingface.co/) is the collaboration platform for the machine learning community.

[Huggingface.js](https://huggingface.co/docs/huggingface.js/index) provides a convenient way to make calls to 100,000+ Machine Learning models, making it easy to incorporate AI functionality into your [Supabase Edge Functions](https://supabase.com/edge-functions).

## Setup [\#](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning\#setup)

- Open your Supabase project dashboard or [create a new project](https://supabase.com/dashboard/projects).
- [Create a new bucket](https://supabase.com/dashboard/project/_/storage/buckets) called `images`.
- Generate TypeScript types from remote Database.
- Create a new Database table called `image_caption`.
  - Create `id` column of type `uuid` which references `storage.objects.id`.
  - Create a `caption` column of type `text`.
- Regenerate TypeScript types to include new `image_caption` table.
- Deploy the function to Supabase: `supabase functions deploy huggingface-image-captioning`.
- Create the Database Webhook in the [Supabase Dashboard](https://supabase.com/dashboard/project/_/database/hooks) to trigger the `huggingface-image-captioning` function anytime a record is added to the `storage.objects` table.

## Generate TypeScript types [\#](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning\#generate-typescript-types)

To generate the types.ts file for the storage and public schemas, run the following command in the terminal:

```
1
supabase gen types typescript --project-id=your-project-ref --schema=storage,public > supabase/functions/huggingface-image-captioning/types.ts
```

## Code [\#](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning\#code)

Find the complete code on [GitHub](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/huggingface-image-captioning).

```
1
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
2
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'
3
import { createClient } from 'npm:@supabase/supabase-js@2'
4
import { Database } from './types.ts'
5

6
console.log('Hello from `huggingface-image-captioning` function!')
7

8
const hf = new HfInference(Deno.env.get('HUGGINGFACE_ACCESS_TOKEN'))
9

10
type SoRecord = Database['storage']['Tables']['objects']['Row']
11
interface WebhookPayload {
12
  type: 'INSERT' | 'UPDATE' | 'DELETE'
13
  table: string
14
  record: SoRecord
15
  schema: 'public'
16
  old_record: null | SoRecord
17
}
18

19
serve(async (req) => {
20
  const payload: WebhookPayload = await req.json()
21
  const soRecord = payload.record
22
  const supabaseAdminClient = createClient<Database>(
23
    // Supabase API URL - env var exported by default when deployed.
24
    Deno.env.get('SUPABASE_URL') ?? '',
25
    // Supabase API SERVICE ROLE KEY - env var exported by default when deployed.
26
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
27
  )
28

29
  // Construct image url from storage
30
  const { data, error } = await supabaseAdminClient.storage
31
    .from(soRecord.bucket_id!)
32
    .createSignedUrl(soRecord.path_tokens!.join('/'), 60)
33
  if (error) throw error
34
  const { signedUrl } = data
35

36
  // Run image captioning with Huggingface
37
  const imgDesc = await hf.imageToText({
38
    data: await (await fetch(signedUrl)).blob(),
39
    model: 'nlpconnect/vit-gpt2-image-captioning',
40
  })
41

42
  // Store image caption in Database table
43
  await supabaseAdminClient
44
    .from('image_caption')
45
    .insert({ id: soRecord.id!, caption: imgDesc.generated_text })
46
    .throwOnError()
47

48
  return new Response('ok')
49
})
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/examples/huggingface-image-captioning.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FOgnYxRkxEUw%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[About Hugging Face](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning#about-hugging-face) [Setup](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning#setup) [Generate TypeScript types](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning#generate-typescript-types) [Code](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning#code)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)