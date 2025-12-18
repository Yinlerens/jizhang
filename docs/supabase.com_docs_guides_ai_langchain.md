---
url: "https://supabase.com/docs/guides/ai/langchain"
title: "LangChain | Supabase Docs"
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

AI & Vectors

1. [AI & Vectors](https://supabase.com/docs/guides/ai)
3. Third-Party Tools
5. [LangChain](https://supabase.com/docs/guides/ai/langchain)

# LangChain

* * *

[LangChain](https://langchain.com/) is a popular framework for working with AI, Vectors, and embeddings. LangChain supports using Supabase as a [vector store](https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase), using the `pgvector` extension.

## Initializing your database [\#](https://supabase.com/docs/guides/ai/langchain\#initializing-your-database)

Prepare you database with the relevant tables:

DashboardSQL

1. Go to the [SQL Editor](https://supabase.com/dashboard/project/_/sql) page in the Dashboard.
2. Click **LangChain** in the Quick start section.
3. Click **Run**.

## Usage [\#](https://supabase.com/docs/guides/ai/langchain\#usage)

You can now search your documents using any Node.js application. This is intended to be run on a secure server route.

```
1
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
2
import { OpenAIEmbeddings } from '@langchain/openai'
3
import { createClient } from '@supabase/supabase-js'
4

5
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
6
if (!supabaseKey) throw new Error(`Expected SUPABASE_SERVICE_ROLE_KEY`)
7

8
const url = process.env.SUPABASE_URL
9
if (!url) throw new Error(`Expected env var SUPABASE_URL`)
10

11
export const run = async () => {
12
  const client = createClient(url, supabaseKey)
13

14
  const vectorStore = await SupabaseVectorStore.fromTexts(
15
    ['Hello world', 'Bye bye', "What's this?"],
16
    [{ id: 2 }, { id: 1 }, { id: 3 }],
17
    new OpenAIEmbeddings(),
18
    {
19
      client,
20
      tableName: 'documents',
21
      queryName: 'match_documents',
22
    }
23
  )
24

25
  const resultOne = await vectorStore.similaritySearch('Hello world', 1)
26

27
  console.log(resultOne)
28
}
```

### Simple metadata filtering [\#](https://supabase.com/docs/guides/ai/langchain\#simple-metadata-filtering)

Given the above `match_documents` Postgres function, you can also pass a filter parameter to only return documents with a specific metadata field value. This filter parameter is a JSON object, and the `match_documents` function will use the Postgres JSONB Containment operator `@>` to filter documents by the metadata field values you specify. See details on the [Postgres JSONB Containment operator](https://www.postgresql.org/docs/current/datatype-json.html#JSON-CONTAINMENT) for more information.

```
1
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
2
import { OpenAIEmbeddings } from '@langchain/openai'
3
import { createClient } from '@supabase/supabase-js'
4

5
// First, follow set-up instructions above
6

7
const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY
8
if (!privateKey) throw new Error(`Expected env var SUPABASE_SERVICE_ROLE_KEY`)
9

10
const url = process.env.SUPABASE_URL
11
if (!url) throw new Error(`Expected env var SUPABASE_URL`)
12

13
export const run = async () => {
14
  const client = createClient(url, privateKey)
15

16
  const vectorStore = await SupabaseVectorStore.fromTexts(
17
    ['Hello world', 'Hello world', 'Hello world'],
18
    [{ user_id: 2 }, { user_id: 1 }, { user_id: 3 }],
19
    new OpenAIEmbeddings(),
20
    {
21
      client,
22
      tableName: 'documents',
23
      queryName: 'match_documents',
24
    }
25
  )
26

27
  const result = await vectorStore.similaritySearch('Hello world', 1, {
28
    user_id: 3,
29
  })
30

31
  console.log(result)
32
}
```

### Advanced metadata filtering [\#](https://supabase.com/docs/guides/ai/langchain\#advanced-metadata-filtering)

You can also use query builder-style filtering ( [similar to how the Supabase JavaScript library works](https://supabase.com/docs/reference/javascript/using-filters)) instead of passing an object. Note that since the filter properties will be in the metadata column, you need to use arrow operators (`->` for integer or `->>` for text) as defined in [PostgREST API documentation](https://postgrest.org/en/stable/references/api/tables_views.html?highlight=operators#json-columns) and specify the data type of the property (e.g. the column should look something like `metadata->some_int_value::int`).

```
1
import { SupabaseFilterRPCCall, SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
2
import { OpenAIEmbeddings } from '@langchain/openai'
3
import { createClient } from '@supabase/supabase-js'
4

5
// First, follow set-up instructions above
6

7
const privateKey = process.env.SUPABASE_SERVICE_ROLE_KEY
8
if (!privateKey) throw new Error(`Expected env var SUPABASE_SERVICE_ROLE_KEY`)
9

10
const url = process.env.SUPABASE_URL
11
if (!url) throw new Error(`Expected env var SUPABASE_URL`)
12

13
export const run = async () => {
14
  const client = createClient(url, privateKey)
15

16
  const embeddings = new OpenAIEmbeddings()
17

18
  const store = new SupabaseVectorStore(embeddings, {
19
    client,
20
    tableName: 'documents',
21
  })
22

23
  const docs = [\
24\
    {\
25\
      pageContent:\
26\
        'This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to expand upon the notion of quantum fluff, a theoretical concept where subatomic particles coalesce to form transient multidimensional spaces. Yet, this abstraction holds no real-world application or comprehensible meaning, reflecting a cosmic puzzle.',\
27\
      metadata: { b: 1, c: 10, stuff: 'right' },\
28\
    },\
29\
    {\
30\
      pageContent:\
31\
        'This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to proceed by discussing the echo of virtual tweets in the binary corridors of the digital universe. Each tweet, like a pixelated canary, hums in an unseen frequency, a fascinatingly perplexing phenomenon that, while conjuring vivid imagery, lacks any concrete implication or real-world relevance, portraying a paradox of multidimensional spaces in the age of cyber folklore.',\
32\
      metadata: { b: 2, c: 9, stuff: 'right' },\
33\
    },\
34\
    { pageContent: 'hello', metadata: { b: 1, c: 9, stuff: 'right' } },\
35\
    { pageContent: 'hello', metadata: { b: 1, c: 9, stuff: 'wrong' } },\
36\
    { pageContent: 'hi', metadata: { b: 2, c: 8, stuff: 'right' } },\
37\
    { pageContent: 'bye', metadata: { b: 3, c: 7, stuff: 'right' } },\
38\
    { pageContent: "what's this", metadata: { b: 4, c: 6, stuff: 'right' } },\
39\
  ]
40

41
  await store.addDocuments(docs)
42

43
  const funcFilterA: SupabaseFilterRPCCall = (rpc) =>
44
    rpc
45
      .filter('metadata->b::int', 'lt', 3)
46
      .filter('metadata->c::int', 'gt', 7)
47
      .textSearch('content', `'multidimensional' & 'spaces'`, {
48
        config: 'english',
49
      })
50

51
  const resultA = await store.similaritySearch('quantum', 4, funcFilterA)
52

53
  const funcFilterB: SupabaseFilterRPCCall = (rpc) =>
54
    rpc
55
      .filter('metadata->b::int', 'lt', 3)
56
      .filter('metadata->c::int', 'gt', 7)
57
      .filter('metadata->>stuff', 'eq', 'right')
58

59
  const resultB = await store.similaritySearch('hello', 2, funcFilterB)
60

61
  console.log(resultA, resultB)
62
}
```

## Hybrid search [\#](https://supabase.com/docs/guides/ai/langchain\#hybrid-search)

LangChain supports the concept of a hybrid search, which combines Similarity Search with Full Text Search. Read the official docs to get started: [Supabase Hybrid Search](https://js.langchain.com/docs/modules/indexes/retrievers/supabase-hybrid).

You can install the LangChain Hybrid Search function though our [database.dev package manager](https://database.dev/langchain/hybrid_search).

## Resources [\#](https://supabase.com/docs/guides/ai/langchain\#resources)

- Official [LangChain site](https://langchain.com/).
- Official [LangChain docs](https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase).
- Supabase [Hybrid Search](https://js.langchain.com/docs/modules/indexes/retrievers/supabase-hybrid).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/langchain.mdx)

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