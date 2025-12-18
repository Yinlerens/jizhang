---
url: "https://supabase.com/docs/guides/ai/python/metadata"
title: "Metadata | Supabase Docs"
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
5. [Metadata](https://supabase.com/docs/guides/ai/python/metadata)

# Metadata

* * *

vecs allows you to associate key-value pairs of metadata with indexes and ids in your collections.
You can then add filters to queries that reference the metadata metadata.

## Types [\#](https://supabase.com/docs/guides/ai/python/metadata\#types)

Metadata is stored as binary JSON. As a result, allowed metadata types are drawn from JSON primitive types.

- Boolean
- String
- Number

The technical limit of a metadata field associated with a vector is 1GB.
In practice you should keep metadata fields as small as possible to maximize performance.

## Metadata Query Language [\#](https://supabase.com/docs/guides/ai/python/metadata\#metadata-query-language)

The metadata query language is based loosely on [mongodb's selectors](https://www.mongodb.com/docs/manual/reference/operator/query/).

`vecs` currently supports a subset of those operators.

### Comparison Operators [\#](https://supabase.com/docs/guides/ai/python/metadata\#comparison-operators)

Comparison operators compare a provided value with a value stored in metadata field of the vector store.

| Operator | Description |
| --- | --- |
| $eq | Matches values that are equal to a specified value |
| $ne | Matches values that are not equal to a specified value |
| $gt | Matches values that are greater than a specified value |
| $gte | Matches values that are greater than or equal to a specified value |
| $lt | Matches values that are less than a specified value |
| $lte | Matches values that are less than or equal to a specified value |
| $in | Matches values that are contained by scalar list of specified values |
| $contains | Matches values where a scalar is contained within an array metadata field |

### Logical Operators [\#](https://supabase.com/docs/guides/ai/python/metadata\#logical-operators)

Logical operators compose other operators, and can be nested.

| Operator | Description |
| --- | --- |
| $and | Joins query clauses with a logical AND returns all documents that match the conditions of both clauses. |
| $or | Joins query clauses with a logical OR returns all documents that match the conditions of either clause. |

### Performance [\#](https://supabase.com/docs/guides/ai/python/metadata\#performance)

For best performance, use scalar key-value pairs for metadata and prefer `$eq`, `$and` and `$or` filters where possible.
Those variants are most consistently able to make use of indexes.

### Examples [\#](https://supabase.com/docs/guides/ai/python/metadata\#examples)

* * *

`year` equals 2020

```
1
{"year": {"$eq": 2020}}
```

* * *

`year` equals 2020 or `gross` greater than or equal to 5000.0

```
1
{
2
    "$or": [\
3\
        {"year": {"$eq": 2020}},\
4\
        {"gross": {"$gte": 5000.0}}\
5\
    ]
6
}
```

* * *

`last_name` is less than "Brown" and `is_priority_customer` is true

```
1
{
2
    "$and": [\
3\
        {"last_name": {"$lt": "Brown"}},\
4\
        {"is_priority_customer": {"$gte": 5000.00}}\
5\
    ]
6
}
```

* * *

`priority` contained by \["enterprise", "pro"\]

```
1
{
2
    "priority": {"$in": ["enterprise", "pro"]}
3
}
```

`tags`, an array, contains the string "important"

```
1
{
2
    "tags": {"$contains": "important"}
3
}
```

[Edit this page on GitHub](https://github.com/supabase/vecs/blob/main/docs/concepts_metadata.md)

### Is this helpful?

NoYes

### On this page

[Types](https://supabase.com/docs/guides/ai/python/metadata#types) [Metadata Query Language](https://supabase.com/docs/guides/ai/python/metadata#metadata-query-language) [Comparison Operators](https://supabase.com/docs/guides/ai/python/metadata#comparison-operators) [Logical Operators](https://supabase.com/docs/guides/ai/python/metadata#logical-operators) [Performance](https://supabase.com/docs/guides/ai/python/metadata#performance) [Examples](https://supabase.com/docs/guides/ai/python/metadata#examples)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)