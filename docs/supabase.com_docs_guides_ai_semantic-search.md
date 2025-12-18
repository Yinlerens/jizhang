---
url: "https://supabase.com/docs/guides/ai/semantic-search"
title: "Semantic search | Supabase Docs"
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
3. Search
5. [Semantic search](https://supabase.com/docs/guides/ai/semantic-search)

# Semantic search

## Learn how to search by meaning rather than exact keywords.

* * *

Semantic search interprets the meaning behind user queries rather than exact [keywords](https://supabase.com/docs/guides/ai/keyword-search). It uses machine learning to capture the intent and context behind the query, handling language nuances like synonyms, phrasing variations, and word relationships.

## When to use semantic search [\#](https://supabase.com/docs/guides/ai/semantic-search\#when-to-use-semantic-search)

Semantic search is useful in applications where the depth of understanding and context is important for delivering relevant results. A good example is in customer support or knowledge base search engines. Users often phrase their problems or questions in various ways, and a traditional keyword-based search might not always retrieve the most helpful documents. With semantic search, the system can understand the meaning behind the queries and match them with relevant solutions or articles, even if the exact wording differs.

For instance, a user searching for "increase text size on display" might miss articles titled "How to adjust font size in settings" in a keyword-based search system. However, a semantic search engine would understand the intent behind the query and correctly match it to relevant articles, regardless of the specific terminology used.

It's also possible to combine semantic search with keyword search to get the best of both worlds. See [Hybrid search](https://supabase.com/docs/guides/ai/hybrid-search) for more details.

## How semantic search works [\#](https://supabase.com/docs/guides/ai/semantic-search\#how-semantic-search-works)

Semantic search uses an intermediate representation called an “embedding vector” to link database records with search queries. A vector, in the context of semantic search, is a list of numerical values. They represent various features of the text and allow for the semantic comparison between different pieces of text.

The best way to think of embeddings is by plotting them on a graph, where each embedding is a single point whose coordinates are the numerical values within its vector. Importantly, embeddings are plotted such that similar concepts are positioned close together while dissimilar concepts are far apart. For more details, see [What are embeddings?](https://supabase.com/docs/guides/ai/concepts#what-are-embeddings)

Embeddings are generated using a language model, and embeddings are compared to each other using a similarity metric. The language model is trained to understand the semantics of language, including syntax, context, and the relationships between words. It generates embeddings for both the content in the database and the search queries. Then the similarity metric, often a function like cosine similarity or dot product, is used to compare the query embeddings with the document embeddings (in other words, to measure how close they are to each other on the graph). The documents with embeddings most similar to the query's are deemed the most relevant and are returned as search results.

## Embedding models [\#](https://supabase.com/docs/guides/ai/semantic-search\#embedding-models)

There are many embedding models available today. Supabase Edge Functions has [built in support](https://supabase.com/docs/guides/functions/examples/semantic-search) for the `gte-small` model. Others can be accessed through third-party APIs like [OpenAI](https://platform.openai.com/docs/guides/embeddings), where you send your text in the request and receive an embedding vector in the response. Others can run locally on your own compute, such as through Transformers.js for JavaScript implementations. For more information on local implementation, see [Generate embeddings](https://supabase.com/docs/guides/ai/quickstarts/generate-text-embeddings).

It's crucial to remember that when using embedding models with semantic search, you must use the same model for all embedding comparisons. Comparing embeddings created by different models will yield meaningless results.

## Semantic search in Postgres [\#](https://supabase.com/docs/guides/ai/semantic-search\#semantic-search-in-postgres)

To implement semantic search in Postgres we use `pgvector` \- an extension that allows for efficient storage and retrieval of high-dimensional vectors. These vectors are numerical representations of text (or other types of data) generated by embedding models.

1. Enable the `pgvector` extension by running:



```
1
create extension vector
2
with
3
     schema extensions;
```

2. Create a table to store the embeddings:



```
1
create table documents (
2
     id bigint primary key generated always as identity,
3
     content text,
4
     embedding extensions.vector(512)
5
);
```







Or if you have an existing table, you can add a vector column like so:



```
1
alter table documents
2
add column embedding extensions.vector(512);
```







In this example, we create a column named `embedding` which uses the newly enabled `vector` data type. The size of the vector (as indicated in parentheses) represents the number of dimensions in the embedding. Here we use 512, but adjust this to match the number of dimensions produced by your embedding model.


For more details on vector columns, including how to generate embeddings and store them, see [Vector columns](https://supabase.com/docs/guides/ai/vector-columns).

### Similarity metric [\#](https://supabase.com/docs/guides/ai/semantic-search\#similarity-metric)

`pgvector` support 3 operators for computing distance between embeddings:

| **Operator** | **Description** |
| --- | --- |
| `<->` | Euclidean distance |
| `<#>` | negative inner product |
| `<=>` | cosine distance |

These operators are used directly in your SQL query to retrieve records that are most similar to the user's search query. Choosing the right operator depends on your needs. Inner product (also known as dot product) tends to be the fastest if your vectors are normalized.

The easiest way to perform semantic search in Postgres is by creating a function:

```
1
-- Match documents using cosine distance (<=>)
2
create or replace function match_documents (
3
  query_embedding extensions.vector(512),
4
  match_threshold float,
5
  match_count int
6
)
7
returns setof documents
8
language sql
9
as $$
10
  select *
11
  from documents
12
  where documents.embedding <=> query_embedding < 1 - match_threshold
13
  order by documents.embedding <=> query_embedding asc
14
  limit least(match_count, 200);
15
$$;
```

Here we create a function `match_documents` that accepts three parameters:

1. `query_embedding`: a one-time embedding generated for the user's search query. Here we set the size to 512, but adjust this to match the number of dimensions produced by your embedding model.
2. `match_threshold`: the minimum similarity between embeddings. This is a value between 1 and -1, where 1 is most similar and -1 is most dissimilar.
3. `match_count`: the maximum number of results to return. Note the query may return less than this number if `match_threshold` resulted in a small shortlist. Limited to 200 records to avoid unintentionally overloading your database.

In this example, we return a `setof documents` and refer to `documents` throughout the query. Adjust this to use the relevant tables in your application.

You'll notice we are using the cosine distance (`<=>`) operator in our query. Cosine distance is a safe default when you don't know whether or not your embeddings are normalized. If you know for a fact that they are normalized (for example, your embedding is returned from OpenAI), you can use negative inner product (`<#>`) for better performance:

```
1
-- Match documents using negative inner product (<#>)
2
create or replace function match_documents (
3
  query_embedding extensions.vector(512),
4
  match_threshold float,
5
  match_count int
6
)
7
returns setof documents
8
language sql
9
as $$
10
  select *
11
  from documents
12
  where documents.embedding <#> query_embedding < -match_threshold
13
  order by documents.embedding <#> query_embedding asc
14
  limit least(match_count, 200);
15
$$;
```

Note that since `<#>` is negative, we negate `match_threshold` accordingly in the `where` clause. For more information on the different operators, see the [pgvector docs](https://github.com/pgvector/pgvector?tab=readme-ov-file#vector-operators).

### Calling from your application [\#](https://supabase.com/docs/guides/ai/semantic-search\#calling-from-your-application)

Finally you can execute this function from your application. If you are using a Supabase client library such as [`supabase-js`](https://github.com/supabase/supabase-js), you can invoke it using the `rpc()` method:

```
1
const { data: documents } = await supabase.rpc('match_documents', {
2
  query_embedding: embedding, // pass the query embedding
3
  match_threshold: 0.78, // choose an appropriate threshold for your data
4
  match_count: 10, // choose the number of matches
5
})
```

You can also call this method directly from SQL:

```
1
select *
2
from match_documents(
3
  '[...]'::extensions.vector(512), -- pass the query embedding
4
  0.78, -- chose an appropriate threshold for your data
5
  10 -- choose the number of matches
6
);
```

In this scenario, you'll likely use a Postgres client library to establish a direct connection from your application to the database. It's best practice to parameterize your arguments before executing the query.

## Next steps [\#](https://supabase.com/docs/guides/ai/semantic-search\#next-steps)

As your database scales, you will need an index on your vector columns to maintain fast query speeds. See [Vector indexes](https://supabase.com/docs/guides/ai/vector-indexes) for an in-depth guide on the different types of indexes and how they work.

## See also [\#](https://supabase.com/docs/guides/ai/semantic-search\#see-also)

- [Embedding concepts](https://supabase.com/docs/guides/ai/concepts)
- [Vector columns](https://supabase.com/docs/guides/ai/vector-columns)
- [Vector indexes](https://supabase.com/docs/guides/ai/vector-indexes)
- [Hybrid search](https://supabase.com/docs/guides/ai/hybrid-search)
- [Keyword search](https://supabase.com/docs/guides/ai/keyword-search)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/semantic-search.mdx)

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