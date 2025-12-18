---
url: "https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes"
title: "IVFFlat indexes | Supabase Docs"
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

[Overview](https://supabase.com/docs/guides/ai/vector-indexes)
[HNSW indexes](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes)
[IVFFlat indexes](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes)

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
3. More
5. [Vector indexes](https://supabase.com/docs/guides/ai/vector-indexes)
7. [IVFFlat indexes](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes)

# IVFFlat indexes

* * *

IVFFlat is a type of vector index for approximate nearest neighbor search. It is a frequently used index type that can improve performance when querying highly-dimensional vectors, like those representing embeddings.

## Choosing an index [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#choosing-an-index)

Today `pgvector` supports two types of indexes:

- [HNSW](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes)
- [IVFFlat](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes)

In general we recommend using [HNSW](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes) because of its [performance](https://supabase.com/blog/increase-performance-pgvector-hnsw#hnsw-performance-1536-dimensions) and [robustness against changing data](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#when-should-you-create-hnsw-indexes). If you have a special use case that requires IVFFlat instead, keep reading.

## Usage [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#usage)

The way you create an IVFFlat index depends on the distance operator you are using. `pgvector` includes 3 distance operators:

| Operator | Description | [**Operator class**](https://www.postgresql.org/docs/current/sql-createopclass.html) |
| --- | --- | --- |
| `<->` | Euclidean distance | `vector_l2_ops` |
| `<#>` | negative inner product | `vector_ip_ops` |
| `<=>` | cosine distance | `vector_cosine_ops` |

Use the following SQL commands to create an IVFFlat index for the operator(s) used in your queries.

### Euclidean L2 distance (`vector_l2_ops`) [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#euclidean-l2-distance--vectorl2ops-)

```
1
create index on items using ivfflat (column_name vector_l2_ops) with (lists = 100);
```

### Inner product (`vector_ip_ops`) [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#inner-product--vectoripops-)

```
1
create index on items using ivfflat (column_name vector_ip_ops) with (lists = 100);
```

### Cosine distance (`vector_cosine_ops`) [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#cosine-distance--vectorcosineops-)

```
1
create index on items using ivfflat (column_name vector_cosine_ops) with (lists = 100);
```

Currently vectors with up to 2,000 dimensions can be indexed.

## How does IVFFlat work? [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#how-does-ivfflat-work)

IVF stands for 'inverted file indexes'. It works by clustering your vectors in order to reduce the similarity search scope. Rather than comparing a vector to every other vector, the vector is only compared against vectors within the same cell cluster (or nearby clusters, depending on your configuration).

### Inverted lists (cell clusters) [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#inverted-lists-cell-clusters)

When you create the index, you choose the number of inverted lists (cell clusters). Increase this number to speed up queries, but at the expense of recall.

For example, to create an index with 100 lists on a column that uses the cosine operator:

```
1
create index on items using ivfflat (column_name vector_cosine_ops) with (lists = 100);
```

For more info on the different operators, see [Distance operations](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#distance-operators).

For every query, you can set the number of probes (1 by default). The number of probes corresponds to the number of nearby cells to probe for a match. Increase this for better recall at the expense of speed.

To set the number of probes for the duration of the session run:

```
1
set ivfflat.probes = 10;
```

To set the number of probes only for the current transaction run:

```
1
begin;
2
set local ivfflat.probes = 10;
3
select ...
4
commit;
```

If the number of probes is the same as the number of lists, exact nearest neighbor search will be performed and the planner won't use the index.

### Approximate nearest neighbor [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#approximate-nearest-neighbor)

One important note with IVF indexes is that nearest neighbor search is approximate, since exact search on high dimensional data can't be indexed efficiently. This means that similarity results will change (slightly) after you add an index (trading recall for speed).

## When should you create IVFFlat indexes? [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#when-should-you-create-ivfflat-indexes)

`pgvector` recommends building IVFFlat indexes only after the table has sufficient data, so that the internal IVFFlat cell clusters are based on your data's distribution. Anytime the distribution changes significantly, consider rebuilding indexes.

## Resources [\#](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes\#resources)

Read more about indexing on `pgvector`'s [GitHub page](https://github.com/pgvector/pgvector#indexing).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/vector-indexes/ivf-indexes.mdx)

### Is this helpful?

NoYes

### On this page

[Choosing an index](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#choosing-an-index) [Usage](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#usage) [Euclidean L2 distance (vector\_l2\_ops)](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#euclidean-l2-distance--vectorl2ops-) [Inner product (vector\_ip\_ops)](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#inner-product--vectoripops-) [Cosine distance (vector\_cosine\_ops)](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#cosine-distance--vectorcosineops-) [How does IVFFlat work?](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#how-does-ivfflat-work) [Inverted lists (cell clusters)](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#inverted-lists-cell-clusters) [Approximate nearest neighbor](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#approximate-nearest-neighbor) [When should you create IVFFlat indexes?](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#when-should-you-create-ivfflat-indexes) [Resources](https://supabase.com/docs/guides/ai/vector-indexes/ivf-indexes#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)