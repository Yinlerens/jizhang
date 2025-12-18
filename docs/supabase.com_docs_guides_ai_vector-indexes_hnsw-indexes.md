---
url: "https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes"
title: "HNSW indexes | Supabase Docs"
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
7. [HNSW indexes](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes)

# HNSW indexes

* * *

HNSW is an algorithm for approximate nearest neighbor search. It is a frequently used index type that can improve performance when querying highly-dimensional vectors, like those representing embeddings.

## Usage [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#usage)

The way you create an HNSW index depends on the distance operator you are using. `pgvector` includes 3 distance operators:

| Operator | Description | [**Operator class**](https://www.postgresql.org/docs/current/sql-createopclass.html) |
| --- | --- | --- |
| `<->` | Euclidean distance | `vector_l2_ops` |
| `<#>` | negative inner product | `vector_ip_ops` |
| `<=>` | cosine distance | `vector_cosine_ops` |

Use the following SQL commands to create an HNSW index for the operator(s) used in your queries.

### Euclidean L2 distance (`vector_l2_ops`) [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#euclidean-l2-distance--vectorl2ops-)

```
1
create index on items using hnsw (column_name vector_l2_ops);
```

### Inner product (`vector_ip_ops`) [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#inner-product--vectoripops-)

```
1
create index on items using hnsw (column_name vector_ip_ops);
```

### Cosine distance (`vector_cosine_ops`) [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#cosine-distance--vectorcosineops-)

```
1
create index on items using hnsw (column_name vector_cosine_ops);
```

For pgvector versions 0.7.0 and above, it's possible to create indexes on vectors with the following maximum dimensions:

- vector: up to 2,000 dimensions
- halfvec: up to 4,000 dimensions
- bit: up to 64,000 dimensions

You can check your current pgvector version by running: `SELECT * FROM pg_extension WHERE extname = 'vector';` or by navigating to the [Extensions](https://supabase.com/dashboard/project/_/database/extensions) tab in your Supabase project dashboard.

If you are on an earlier version of pgvector, you should [upgrade your project here](https://supabase.com/dashboard/project/_/settings/infrastructure).

## Example with high-dimensional vectors [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#example-with-high-dimensional-vectors)

For vectors with more than 2,000 dimensions, you can use the `halfvec` type to create indexes. Here's an example with 3,072 dimensions:

```
1
CREATE TABLE documents (
2
    id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
3
    content text,
4
    embedding vector(3072)
5
);
6

7
CREATE INDEX ON documents
8
    USING hnsw ((embedding::halfvec(3072)) halfvec_cosine_ops);
```

## How does HNSW work? [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#how-does-hnsw-work)

HNSW uses proximity graphs (graphs connecting nodes based on distance between them) to approximate nearest-neighbor search. To understand HNSW, we can break it down into 2 parts:

- **Hierarchical (H):** The algorithm operates over multiple layers
- **Navigable Small World (NSW):** Each vector is a node within a graph and is connected to several other nodes

### Hierarchical [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#hierarchical)

The hierarchical aspect of HNSW builds off of the idea of skip lists.

Skip lists are multi-layer linked lists. The bottom layer is a regular linked list connecting an ordered sequence of elements. Each new layer above removes some elements from the underlying layer (based on a fixed probability), producing a sparser subsequence that “skips” over elements.

![visual of an example skip list](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fai%2Fvector-indexes%2Fhnsw-indexes%2Fskip-list--light.png&w=3840&q=75)

When searching for an element, the algorithm begins at the top layer and traverses its linked list horizontally. If the target element is found, the algorithm stops and returns it. Otherwise if the next element in the list is greater than the target (or `NULL`), the algorithm drops down to the next layer below. Since each layer below is less sparse than the layer above (with the bottom layer connecting all elements), the target will eventually be found. Skip lists offer O(log n) average complexity for both search and insertion/deletion.

### Navigable Small World [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#navigable-small-world)

A navigable small world (NSW) is a special type of proximity graph that also includes long-range connections between nodes. These long-range connections support the “small world” property of the graph, meaning almost every node can be reached from any other node within a few hops. Without these additional long-range connections, many hops would be required to reach a far-away node.

![visual of an example navigable small world graph](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fai%2Fvector-indexes%2Fhnsw-indexes%2Fnsw.png&w=3840&q=75)

The “navigable” part of NSW specifically refers to the ability to logarithmically scale the greedy search algorithm on the graph, an algorithm that attempts to make only the locally optimal choice at each hop. Without this property, the graph may still be considered a small world with short paths between far-away nodes, but the greedy algorithm tends to miss them. Greedy search is ideal for NSW because it is quick to navigate and has low computational costs.

### **Hierarchical +** Navigable Small World [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#hierarchical--navigable-small-world)

HNSW combines these two concepts. From the hierarchical perspective, the bottom layer consists of a NSW made up of short links between nodes. Each layer above “skips” elements and creates longer links between nodes further away from each other.

Just like skip lists, search starts at the top layer and works its way down until it finds the target element. However, instead of comparing a scalar value at each layer to determine whether or not to descend to the layer below, a multi-dimensional distance measure (such as Euclidean distance) is used.

## When should you create HNSW indexes? [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#when-should-you-create-hnsw-indexes)

HNSW should be your default choice when creating a vector index. Add the index when you don't need 100% accuracy and are willing to trade a small amount of accuracy for a lot of throughput.

Unlike IVFFlat indexes, you are safe to build an HNSW index immediately after the table is created. HNSW indexes are based on graphs which inherently are not affected by the same limitations as IVFFlat. As new data is added to the table, the index will be filled automatically and the index structure will remain optimal.

## Resources [\#](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes\#resources)

Read more about indexing on `pgvector`'s [GitHub page](https://github.com/pgvector/pgvector#indexing).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/vector-indexes/hnsw-indexes.mdx)

### Is this helpful?

NoYes

### On this page

[Usage](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#usage) [Euclidean L2 distance (vector\_l2\_ops)](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#euclidean-l2-distance--vectorl2ops-) [Inner product (vector\_ip\_ops)](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#inner-product--vectoripops-) [Cosine distance (vector\_cosine\_ops)](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#cosine-distance--vectorcosineops-) [Example with high-dimensional vectors](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#example-with-high-dimensional-vectors) [How does HNSW work?](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#how-does-hnsw-work) [Hierarchical](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#hierarchical) [Navigable Small World](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#navigable-small-world) [Hierarchical + Navigable Small World](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#hierarchical--navigable-small-world) [When should you create HNSW indexes?](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#when-should-you-create-hnsw-indexes) [Resources](https://supabase.com/docs/guides/ai/vector-indexes/hnsw-indexes#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)