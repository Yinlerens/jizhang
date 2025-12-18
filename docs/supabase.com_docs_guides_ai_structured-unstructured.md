---
url: "https://supabase.com/docs/guides/ai/structured-unstructured"
title: "Structured and Unstructured | Supabase Docs"
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
3. [Structured & unstructured](https://supabase.com/docs/guides/ai/structured-unstructured)

# Structured and Unstructured

## Supabase is flexible enough to associate structured and unstructured metadata with embeddings.

* * *

Most vector stores treat metadata associated with embeddings like NoSQL, unstructured data. Supabase is flexible enough to store unstructured and structured metadata.

## Structured [\#](https://supabase.com/docs/guides/ai/structured-unstructured\#structured)

```
1
create table docs (
2
  id uuid primary key,
3
  embedding extensions.vector(3),
4
  content text,
5
  url text
6
);
7

8
insert into docs
9
  (id, embedding, content, url)
10
values
11
  ('79409372-7556-4ccc-ab8f-5786a6cfa4f7', array[0.1, 0.2, 0.3], 'Hello world', '/hello-world');
```

Notice that we've associated two pieces of metadata, `content` and `url`, with the embedding. Those fields can be filtered, constrained, indexed, and generally operated on using the full power of SQL. Structured metadata fits naturally with a traditional Supabase application, and can be managed via database [migrations](https://supabase.com/docs/guides/deployment/database-migrations).

## Unstructured [\#](https://supabase.com/docs/guides/ai/structured-unstructured\#unstructured)

```
1
create table docs (
2
  id uuid primary key,
3
  embedding extensions.vector(3),
4
  meta jsonb
5
);
6

7
insert into docs
8
  (id, embedding, meta)
9
values
10
  (
11
    '79409372-7556-4ccc-ab8f-5786a6cfa4f7',
12
    array[0.1, 0.2, 0.3],
13
    '{"content": "Hello world", "url": "/hello-world"}'
14
  );
```

An unstructured approach does not specify the metadata fields that are expected. It stores all metadata in a flexible `json`/`jsonb` column. The tradeoff is that the querying/filtering capabilities of a schemaless data type are less flexible than when each field has a dedicated column. It also pushes the burden of metadata data integrity onto application code, which is more error prone than enforcing constraints in the database.

The unstructured approach is recommended:

- for ephemeral/interactive workloads e.g. data science or scientific research
- when metadata fields are user-defined or unknown
- during rapid prototyping

Client libraries like python's [vecs](https://github.com/supabase/vecs) use this structure. For example, running:

```
1
#!/usr/bin/env python3
2
import vecs
3

4
# In practice, do not hard-code your password. Use environment variables.
5
DB_CONNECTION = "postgresql://<user>:<password>@<host>:<port>/<db_name>"
6

7
# create vector store client
8
vx = vecs.create_client(DB_CONNECTION)
9

10
docs = vx.get_or_create_collection(name="docs", dimension=1536)
11

12
docs.upsert(vectors=[\
13\
  ('79409372-7556-4ccc-ab8f-5786a6cfa4f7', [100, 200, 300], { url: '/hello-world' })\
14\
])
```

automatically creates the unstructured SQL table during the call to `get_or_create_collection`.

Note that when working with client libraries that emit SQL DDL, like `create table ...`, you should add that SQL to your migrations when moving to production to maintain a single source of truth for your database's schema.

## Hybrid [\#](https://supabase.com/docs/guides/ai/structured-unstructured\#hybrid)

The structured metadata style is recommended when the fields being tracked are known in advance. If you have a combination of known and unknown metadata fields, you can accommodate the unknown fields by adding a `json`/`jsonb` column to the table. In that situation, known fields should continue to use dedicated columns for best query performance and throughput.

```
1
create table docs (
2
  id uuid primary key,
3
  embedding extensions.vector(3),
4
  content text,
5
  url string,
6
  meta jsonb
7
);
8

9
insert into docs
10
  (id, embedding, content, url, meta)
11
values
12
  (
13
    '79409372-7556-4ccc-ab8f-5786a6cfa4f7',
14
    array[0.1, 0.2, 0.3],
15
    'Hello world',
16
    '/hello-world',
17
    '{"key": "value"}'
18
  );
```

## Choosing the right model [\#](https://supabase.com/docs/guides/ai/structured-unstructured\#choosing-the-right-model)

Both approaches create a table where you can store your embeddings and some metadata. You should choose the best approach for your use-case. In summary:

- Structured metadata is best when fields are known in advance or query patterns are predictable e.g. a production Supabase application
- Unstructured metadata is best when fields are unknown/user-defined or when working with data interactively e.g. exploratory research

Both approaches are valid, and the one you should choose depends on your use-case.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/structured-unstructured.mdx)

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