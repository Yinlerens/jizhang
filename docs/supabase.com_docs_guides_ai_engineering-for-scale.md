---
url: "https://supabase.com/docs/guides/ai/engineering-for-scale"
title: "Engineering for Scale | Supabase Docs"
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
3. Learn
5. [Engineering for scale](https://supabase.com/docs/guides/ai/engineering-for-scale)

# Engineering for Scale

## Building an enterprise-grade vector architecture.

* * *

Content sources for vectors can be extremely large. As you grow you should run your Vector workloads across several secondary databases (sometimes called "pods"), which allows each collection to scale independently.

## Simple workloads [\#](https://supabase.com/docs/guides/ai/engineering-for-scale\#simple-workloads)

For small workloads, it's typical to store your data in a single database.

If you've used [Vecs](https://supabase.com/docs/guides/ai/vecs-python-client) to create 3 different collections, you can expose collections to your web or mobile application using [views](https://supabase.com/docs/guides/database/tables#views):

For example, with 3 collections, called `docs`, `posts`, and `images`, we could expose the "docs" inside the public schema like this:

```
1
create view public.docs as
2
select
3
  id,
4
  embedding,
5
  metadata, # Expose the metadata as JSON
6
  (metadata->>'url')::text as url # Extract the URL as a string
7
from vector
```

You can then use any of the client libraries to access your collections within your applications:

```
1
const { data, error } = await supabase
2
  .from('docs')
3
  .select('id, embedding, metadata')
4
  .eq('url', '/hello-world')
```

## Enterprise workloads [\#](https://supabase.com/docs/guides/ai/engineering-for-scale\#enterprise-workloads)

As you move into production, we recommend splitting your collections into separate projects. This is because it allows your vector stores to scale independently of your production data. Vectors typically grow faster than operational data, and they have different resource requirements. Running them on separate databases removes the single-point-of-failure.

You can use as many secondary databases as you need to manage your collections. With this architecture, you have 2 options for accessing collections within your application:

1. Query the collections directly using Vecs.
2. Access the collections from your Primary database through a Wrapper.

You can use both of these in tandem to suit your use-case. We recommend option `1` wherever possible, as it offers the most scalability.

### Query collections using Vecs [\#](https://supabase.com/docs/guides/ai/engineering-for-scale\#query-collections-using-vecs)

Vecs provides methods for querying collections, either using a [cosine similarity function](https://supabase.github.io/vecs/api/#basic) or with [metadata filtering](https://supabase.github.io/vecs/api/#metadata-filtering).

```
1
# cosine similarity
2
docs.query(query_vector=[0.4,0.5,0.6], limit=5)
3

4
# metadata filtering
5
docs.query(
6
    query_vector=[0.4,0.5,0.6],
7
    limit=5,
8
    filters={"year": {"$eq": 2012}}, # metadata filters
9
)
```

### Accessing external collections using Wrappers [\#](https://supabase.com/docs/guides/ai/engineering-for-scale\#accessing-external-collections-using-wrappers)

Supabase supports [Foreign Data Wrappers](https://supabase.com/blog/postgres-foreign-data-wrappers-rust). Wrappers allow you to connect two databases together so that you can query them over the network.

This involves 2 steps: connecting to your remote database from the primary and creating a Foreign Table.

#### Connecting your remote database [\#](https://supabase.com/docs/guides/ai/engineering-for-scale\#connecting-your-remote-database)

Inside your Primary database we need to provide the credentials to access the secondary database:

```
1
create extension postgres_fdw;
2

3
create server docs_server
4
foreign data wrapper postgres_fdw
5
options (host 'db.xxx.supabase.co', port '5432', dbname 'postgres');
6

7
create user mapping for docs_user
8
server docs_server
9
options (user 'postgres', password 'password');
```

#### Create a foreign table [\#](https://supabase.com/docs/guides/ai/engineering-for-scale\#create-a-foreign-table)

We can now create a foreign table to access the data in our secondary project.

```
1
create foreign table docs (
2
  id text not null,
3
  embedding extensions.vector(384),
4
  metadata jsonb,
5
  url text
6
)
7
server docs_server
8
options (schema_name 'public', table_name 'docs');
```

This looks very similar to our View example above, and you can continue to use the client libraries to access your collections through the foreign table:

```
1
const { data, error } = await supabase
2
  .from('docs')
3
  .select('id, embedding, metadata')
4
  .eq('url', '/hello-world')
```

### Enterprise architecture [\#](https://supabase.com/docs/guides/ai/engineering-for-scale\#enterprise-architecture)

This diagram provides an example architecture that allows you to access the collections either with our client libraries or using Vecs. You can add as many secondary databases as you need (in this example we only show one):

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/engineering-for-scale.mdx)

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