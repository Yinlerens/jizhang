---
url: "https://supabase.com/docs/guides/ai/python/indexes"
title: "Indexes | Supabase Docs"
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
3. Python Client
5. [Indexes](https://supabase.com/docs/guides/ai/python/indexes)

# Indexes

* * *

Indexes are tools for optimizing query performance of a [collection](https://supabase.com/docs/guides/ai/python/collections).

Collections can be [queried](https://supabase.github.io/api.md#query) without an index, but that will emit a python warning and should never be done in production.

```
1
query does not have a covering index for cosine_similarity. See Collection.create_index
```

As each query vector must be checked against every record in the collection. When the number of dimensions and/or number of records becomes large, that becomes extremely slow and computationally expensive.

An index is a heuristic data structure that pre-computes distances between key points in the vector space. It is smaller and can be traversed more quickly than the whole collection enabling much more performant searching.

Only one index may exist per-collection. An index optimizes a collection for searching according to a selected distance measure.

To create an index:

```
1
docs.create_index()
```

You may optionally provide a distance measure and index method.

Available options for distance `measure` are:

- `vecs.IndexMeasure.cosine_distance`
- `vecs.IndexMeasure.l2_distance`
- `vecs.IndexMeasure.l1_distance`
- `vecs.IndexMeasure.max_inner_product`

which correspond to different methods for comparing query vectors to the vectors in the database.

If you aren't sure which to use, the default of cosine\_distance is the most widely compatible with off-the-shelf embedding methods.

Available options for index `method` are:

- `vecs.IndexMethod.auto`
- `vecs.IndexMethod.hnsw`
- `vecs.IndexMethod.ivfflat`

Where `auto` selects the best available index method, `hnsw` uses the [HNSW](https://github.com/pgvector/pgvector#hnsw) method and `ivfflat` uses [IVFFlat](https://github.com/pgvector/pgvector#ivfflat).

HNSW and IVFFlat indexes both allow for parameterization to control the speed/accuracy tradeoff. vecs provides sane defaults for these parameters. For a greater level of control you can optionally pass an instance of `vecs.IndexArgsIVFFlat` or `vecs.IndexArgsHNSW` to `create_index`'s `index_arguments` argument. Descriptions of the impact for each parameter are available in the [pgvector docs](https://github.com/pgvector/pgvector).

When using IVFFlat indexes, the index must be created **after** the collection has been populated with records. Building an IVFFlat index on an empty collection will result in significantly reduced recall. You can continue upserting new documents after the index has been created, but should rebuild the index if the size of the collection more than doubles since the last index operation.

HNSW indexes can be created immediately after the collection without populating records.

To manually specify `method`, `measure`, and `index_arguments` add them as arguments to `create_index` for example:

```
1
docs.create_index(
2
    method=IndexMethod.hnsw,
3
    measure=IndexMeasure.cosine_distance,
4
    index_arguments=IndexArgsHNSW(m=8),
5
)
```

The time required to create an index grows with the number of records and size of vectors.
For a few thousand records expect sub-minute a response in under a minute. It may take a few
minutes for larger collections.

[Edit this page on GitHub](https://github.com/supabase/vecs/blob/main/docs/concepts_indexes.md)

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