---
url: "https://supabase.com/docs/guides/ai/examples/mixpeek-video-search"
title: "Video Search with Mixpeek Multimodal Embeddings | Supabase Docs"
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
3. Third-Party Tools
5. [Mixpeek](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search)

# Video Search with Mixpeek Multimodal Embeddings

## Implement video search with the Mixpeek Multimodal Embed API and Supabase Vector.

* * *

The [Mixpeek Embed API](https://docs.mixpeek.com/api-documentation/inference/embed) allows you to generate embeddings for various types of content, including videos and text. You can use these embeddings for:

- Text-to-Video / Video-To-Text / Video-to-Video / Text-to-Text Search
- Fine-tuning on your own video and text data

This guide demonstrates how to implement video search using Mixpeek Embed for video processing and embedding, and Supabase Vector for storing and querying embeddings.

## Create a new Python project with Poetry [\#](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search\#create-a-new-python-project-with-poetry)

[Poetry](https://python-poetry.org/) provides packaging and dependency management for Python. If you haven't already, install poetry via pip:

```
1
pip install poetry
```

Then initialize a new project:

```
1
poetry new video-search
```

## Setup Supabase project [\#](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search\#setup-supabase-project)

If you haven't already, [install the Supabase CLI](https://supabase.com/docs/guides/cli), then initialize Supabase in the root of your newly created poetry project:

```
1
supabase init
```

Next, start your local Supabase stack:

```
1
supabase start
```

This will start up the Supabase stack locally and print out a bunch of environment details, including your local `DB URL`. Make a note of that for later use.

## Install the dependencies [\#](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search\#install-the-dependencies)

Add the following dependencies to your project:

- [`supabase`](https://github.com/supabase-community/supabase-py): Supabase Python Client
- [`mixpeek`](https://github.com/mixpeek/python-sdk): Mixpeek Python Client for embedding generation

```
1
poetry add supabase mixpeek
```

## Import the necessary dependencies [\#](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search\#import-the-necessary-dependencies)

At the top of your main Python script, import the dependencies and store your environment variables:

```
1
from supabase import create_client, Client
2
from mixpeek import Mixpeek
3
import os
4

5
SUPABASE_URL = os.getenv("SUPABASE_URL")
6
SUPABASE_KEY = os.getenv("SUPABASE_API_KEY")
7
MIXPEEK_API_KEY = os.getenv("MIXPEEK_API_KEY")
```

## Create embeddings for your videos [\#](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search\#create-embeddings-for-your-videos)

Next, create a `seed` method, which will create a new Supabase table, generate embeddings for your video chunks, and insert the embeddings into your database:

```
1
def seed():
2
    # Initialize Supabase and Mixpeek clients
3
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
4
    mixpeek = Mixpeek(MIXPEEK_API_KEY)
5

6
    # Create a table for storing video chunk embeddings
7
    supabase.table("video_chunks").create({
8
        "id": "text",
9
        "start_time": "float8",
10
        "end_time": "float8",
11
        "embedding": "extensions.vector(768)",
12
        "metadata": "jsonb"
13
    })
14

15
    # Process and embed video
16
    video_url = "https://example.com/your_video.mp4"
17
    processed_chunks = mixpeek.tools.video.process(
18
        video_source=video_url,
19
        chunk_interval=1,  # 1 second intervals
20
        resolution=[720, 1280]
21
    )
22

23
    for chunk in processed_chunks:
24
        print(f"Processing video chunk: {chunk['start_time']}")
25

26
        # Generate embedding using Mixpeek
27
        embed_response = mixpeek.embed.video(
28
            model_id="vuse-generic-v1",
29
            input=chunk['base64_chunk'],
30
            input_type="base64"
31
        )
32

33
        # Insert into Supabase
34
        supabase.table("video_chunks").insert({
35
            "id": f"chunk_{chunk['start_time']}",
36
            "start_time": chunk["start_time"],
37
            "end_time": chunk["end_time"],
38
            "embedding": embed_response['embedding'],
39
            "metadata": {"video_url": video_url}
40
        }).execute()
41

42
    print("Video processed and embeddings inserted")
43

44
    # Create index for fast search performance
45
    supabase.query("CREATE INDEX ON video_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100)").execute()
46
    print("Created index")
```

Add this method as a script in your `pyproject.toml` file:

```
1
[tool.poetry.scripts]
2
seed = "video_search.main:seed"
3
search = "video_search.main:search"
```

After activating the virtual environment with `poetry shell`, you can now run your seed script via `poetry run seed`. You can inspect the generated embeddings in your local database by visiting the local Supabase dashboard at [localhost:54323](http://localhost:54323/project/default/editor).

## Perform a video search from a text query [\#](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search\#perform-a-video-search-from-a-text-query)

With Supabase Vector, you can query your embeddings. You can use either a video clip as search input or alternatively, you can generate an embedding from a string input and use that as the query input:

```
1
def search():
2
    # Initialize Supabase and Mixpeek clients
3
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
4
    mixpeek = Mixpeek(MIXPEEK_API_KEY)
5

6
    # Generate embedding for text query
7
    query_string = "a car chase scene"
8
    text_emb = mixpeek.embed.video(
9
        model_id="vuse-generic-v1",
10
        input=query_string,
11
        input_type="text"
12
    )
13

14
    # Query the collection
15
    results = supabase.rpc(
16
        'match_video_chunks',
17
        {
18
            'query_embedding': text_emb['embedding'],
19
            'match_threshold': 0.8,
20
            'match_count': 5
21
        }
22
    ).execute()
23

24
    # Display the results
25
    if results.data:
26
        for result in results.data:
27
            print(f"Matched chunk from {result['start_time']} to {result['end_time']} seconds")
28
            print(f"Video URL: {result['metadata']['video_url']}")
29
            print(f"Similarity: {result['similarity']}")
30
            print("---")
31
    else:
32
        print("No matching video chunks found")
```

This query will return the top 5 most similar video chunks from your database.

You can now test it out by running `poetry run search`, and you will be presented with the most relevant video chunks to the query "a car chase scene".

## Conclusion [\#](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search\#conclusion)

With just a couple of Python scripts, you are able to implement video search as well as reverse video search using Mixpeek Embed and Supabase Vector. This approach allows for powerful semantic search capabilities that can be integrated into various applications, enabling you to search through video content using both text and video queries.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/examples/mixpeek-video-search.mdx)

### Is this helpful?

NoYes

### On this page

[Create a new Python project with Poetry](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search#create-a-new-python-project-with-poetry) [Setup Supabase project](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search#setup-supabase-project) [Install the dependencies](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search#install-the-dependencies) [Import the necessary dependencies](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search#import-the-necessary-dependencies) [Create embeddings for your videos](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search#create-embeddings-for-your-videos) [Perform a video search from a text query](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search#perform-a-video-search-from-a-text-query) [Conclusion](https://supabase.com/docs/guides/ai/examples/mixpeek-video-search#conclusion)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)