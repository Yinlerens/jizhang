---
url: "https://supabase.com/docs/guides/ai/keyword-search"
title: "Keyword search | Supabase Docs"
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
5. [Keyword search](https://supabase.com/docs/guides/ai/keyword-search)

# Keyword search

## Learn how to search by words or phrases.

* * *

Keyword search involves locating documents or records that contain specific words or phrases, primarily based on the exact match between the search terms and the text within the data. It differs from [semantic search](https://supabase.com/docs/guides/ai/semantic-search), which interprets the meaning behind the query to provide results that are contextually related, even if the exact words aren't present in the text. Semantic search considers synonyms, intent, and natural language nuances to provide a more nuanced approach to information retrieval.

In Postgres, keyword search is implemented using [full-text search](https://supabase.com/docs/guides/database/full-text-search). It supports indexing and text analysis for data retrieval, focusing on records that match the search criteria. Postgres' full-text search extends beyond simple keyword matching to address linguistic nuances, making it effective for applications that require precise text queries.

## When and why to use keyword search [\#](https://supabase.com/docs/guides/ai/keyword-search\#when-and-why-to-use-keyword-search)

Keyword search is particularly useful in scenarios where precision and specificity matter. It's more effective than semantic search when users are looking for information using exact terminology or specific identifiers. It ensures that results directly contain those terms, reducing the chance of retrieving irrelevant information that might be semantically related but not what the user seeks.

For example in technical or academic research databases, researchers often search for specific studies, compounds, or concepts identified by certain terms or codes. Searching for a specific chemical compound using its exact molecular formula or a unique identifier will yield more focused and relevant results compared to a semantic search, which could return a wide range of documents discussing the compound in different contexts. Keyword search ensures documents that explicitly mention the exact term are found, allowing users to access the precise data they need efficiently.

It's also possible to combine keyword search with semantic search to get the best of both worlds. See [Hybrid search](https://supabase.com/docs/guides/ai/hybrid-search) for more details.

## Using full-text search [\#](https://supabase.com/docs/guides/ai/keyword-search\#using-full-text-search)

For an in-depth guide to Postgres' full-text search, including how to store, index, and query records, see [Full text search](https://supabase.com/docs/guides/database/full-text-search).

## See also [\#](https://supabase.com/docs/guides/ai/keyword-search\#see-also)

- [Semantic search](https://supabase.com/docs/guides/ai/semantic-search)
- [Hybrid search](https://supabase.com/docs/guides/ai/hybrid-search)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/keyword-search.mdx)

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