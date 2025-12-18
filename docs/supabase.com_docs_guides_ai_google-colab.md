---
url: "https://supabase.com/docs/guides/ai/google-colab"
title: "Google Colab | Supabase Docs"
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
5. [Google Colab](https://supabase.com/docs/guides/ai/google-colab)

# Google Colab

## Use Google Colab to manage your Supabase Vector store.

* * *

[![](https://supabase.com/docs/img/ai/colab-badge.svg)](https://colab.research.google.com/github/supabase/supabase/blob/master/examples/ai/vector_hello_world.ipynb)

Google Colab is a hosted Jupyter Notebook service. It provides free access to computing resources, including GPUs and TPUs, and is well-suited to machine learning, data science, and education. We can use Colab to manage collections using [Supabase Vecs](https://supabase.com/docs/guides/ai/vecs-python-client).

In this tutorial we'll connect to a database running on the Supabase [platform](https://supabase.com/dashboard/). If you don't already have a database, you can create one here: [database.new](https://database.new/).

## Create a new notebook [\#](https://supabase.com/docs/guides/ai/google-colab\#create-a-new-notebook)

Start by visiting [colab.research.google.com](https://colab.research.google.com/). There you can create a new notebook.

![Google Colab new notebook](https://supabase.com/docs/img/ai/google-colab/colab-new.png)

## Install Vecs [\#](https://supabase.com/docs/guides/ai/google-colab\#install-vecs)

We'll use the Supabase Vector client, [Vecs](https://supabase.com/docs/guides/ai/vecs-python-client), to manage our collections.

At the top of the notebook add the notebook paste the following code and hit the "execute" button (`ctrl+enter`):

```
1
pip install vecs
```

![Install vecs](https://supabase.com/docs/img/ai/google-colab/install-vecs.png)

## Connect to your database [\#](https://supabase.com/docs/guides/ai/google-colab\#connect-to-your-database)

On your project dashboard, click [Connect](https://supabase.com/dashboard/project/_?showConnect=true). The connection string should look like `postgres://postgres.xxxx:password@xxxx.pooler.supabase.com:6543/postgres`

Create a new code block below the install block (`ctrl+m b`) and add the following code using the Postgres URI you copied above:

```
1
import vecs
2

3
DB_CONNECTION = "postgres://postgres.xxxx:password@xxxx.pooler.supabase.com:6543/postgres"
4

5
# create vector store client
6
vx = vecs.create_client(DB_CONNECTION)
```

Execute the code block (`ctrl+enter`). If no errors were returned then your connection was successful.

## Create a collection [\#](https://supabase.com/docs/guides/ai/google-colab\#create-a-collection)

Now we're going to create a new collection and insert some documents.

Create a new code block below the install block (`ctrl+m b`). Add the following code to the code block and execute it (`ctrl+enter`):

```
1
collection = vx.get_or_create_collection(name="colab_collection", dimension=3)
2

3
collection.upsert(
4
    vectors=[\
5\
        (\
6\
         "vec0",           # the vector's identifier\
7\
         [0.1, 0.2, 0.3],  # the vector. list or np.array\
8\
         {"year": 1973}    # associated  metadata\
9\
        ),\
10\
        (\
11\
         "vec1",\
12\
         [0.7, 0.8, 0.9],\
13\
         {"year": 2012}\
14\
        )\
15\
    ]
16
)
```

This will create a table inside your database within the `vecs` schema, called `colab_collection`. You can view the inserted items in the [Table Editor](https://supabase.com/dashboard/project/_/editor/), by selecting the `vecs` schema from the schema dropdown.

![Colab documents](https://supabase.com/docs/img/ai/google-colab/colab-documents.png)

## Query your documents [\#](https://supabase.com/docs/guides/ai/google-colab\#query-your-documents)

Now we can search for documents based on their similarity. Create a new code block and execute the following code:

```
1
collection.query(
2
    query_vector=[0.4,0.5,0.6],  # required
3
    limit=5,                     # number of records to return
4
    filters={},                  # metadata filters
5
    measure="cosine_distance",   # distance measure to use
6
    include_value=False,         # should distance measure values be returned?
7
    include_metadata=False,      # should record metadata be returned?
8
)
```

You will see that this returns two documents in an array `['vec1', 'vec0']`:

![Colab results](https://supabase.com/docs/img/ai/google-colab/colab-results.png)

It also returns a warning:

```
1
Query does not have a covering index for cosine_distance.
```

You can lean more about creating indexes in the [Vecs documentation](https://supabase.github.io/vecs/api/#create-an-index).

## Resources [\#](https://supabase.com/docs/guides/ai/google-colab\#resources)

- Vecs API: [supabase.github.io/vecs/api](https://supabase.github.io/vecs/api)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/google-colab.mdx)

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