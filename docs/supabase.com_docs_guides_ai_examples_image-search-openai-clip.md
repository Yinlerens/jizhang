---
url: "https://supabase.com/docs/guides/ai/examples/image-search-openai-clip"
title: "Image Search with OpenAI CLIP | Supabase Docs"
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
3. Python Examples
5. [Image search with OpenAI CLIP](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip)

# Image Search with OpenAI CLIP

## Implement image search with the OpenAI CLIP Model and Supabase Vector.

* * *

The [OpenAI CLIP Model](https://github.com/openai/CLIP) was trained on a variety of (image, text)-pairs. You can use the CLIP model for:

- Text-to-Image / Image-To-Text / Image-to-Image / Text-to-Text Search
- You can fine-tune it on your own image and text data with the regular `SentenceTransformers` training code.

[`SentenceTransformers`](https://www.sbert.net/examples/applications/image-search/README.html) provides models that allow you to embed images and text into the same vector space. You can use this to find similar images as well as to implement image search.

You can find the full application code as a Python Poetry project on [GitHub](https://github.com/supabase/supabase/tree/master/examples/ai/image_search#image-search-with-supabase-vector).

## Create a new Python project with Poetry [\#](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip\#create-a-new-python-project-with-poetry)

[Poetry](https://python-poetry.org/) provides packaging and dependency management for Python. If you haven't already, install poetry via pip:

```
1
pip install poetry
```

Then initialize a new project:

```
1
poetry new image-search
```

## Setup Supabase project [\#](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip\#setup-supabase-project)

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

This will start up the Supabase stack locally and print out a bunch of environment details, including your local `DB URL`. Make a note of that for later user.

## Install the dependencies [\#](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip\#install-the-dependencies)

We will need to add the following dependencies to our project:

- [`vecs`](https://github.com/supabase/vecs#vecs): Supabase Vector Python Client.
- [`sentence-transformers`](https://huggingface.co/sentence-transformers/clip-ViT-B-32): a framework for sentence, text and image embeddings (used with OpenAI CLIP model)
- [`matplotlib`](https://matplotlib.org/): for displaying our image result

```
1
poetry add vecs sentence-transformers matplotlib
```

## Import the necessary dependencies [\#](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip\#import-the-necessary-dependencies)

At the top of your main python script, import the dependencies and store your `DB URL` from above in a variable:

```
1
from PIL import Image
2
from sentence_transformers import SentenceTransformer
3
import vecs
4
from matplotlib import pyplot as plt
5
from matplotlib import image as mpimg
6

7
DB_CONNECTION = "postgresql://postgres:postgres@localhost:54322/postgres"
```

## Create embeddings for your images [\#](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip\#create-embeddings-for-your-images)

In the root of your project, create a new folder called `images` and add some images. You can use the images from the example project on [GitHub](https://github.com/supabase/supabase/tree/master/examples/ai/image_search/images) or you can find license free images on [Unsplash](https://unsplash.com/).

Next, create a `seed` method, which will create a new Supabase Vector Collection, generate embeddings for your images, and upsert the embeddings into your database:

```
1
def seed():
2
    # create vector store client
3
    vx = vecs.create_client(DB_CONNECTION)
4

5
    # create a collection of vectors with 3 dimensions
6
    images = vx.get_or_create_collection(name="image_vectors", dimension=512)
7

8
    # Load CLIP model
9
    model = SentenceTransformer('clip-ViT-B-32')
10

11
    # Encode an image:
12
    img_emb1 = model.encode(Image.open('./images/one.jpg'))
13
    img_emb2 = model.encode(Image.open('./images/two.jpg'))
14
    img_emb3 = model.encode(Image.open('./images/three.jpg'))
15
    img_emb4 = model.encode(Image.open('./images/four.jpg'))
16

17
    # add records to the *images* collection
18
    images.upsert(
19
        records=[\
20\
            (\
21\
                "one.jpg",        # the vector's identifier\
22\
                img_emb1,          # the vector. list or np.array\
23\
                {"type": "jpg"}   # associated  metadata\
24\
            ), (\
25\
                "two.jpg",\
26\
                img_emb2,\
27\
                {"type": "jpg"}\
28\
            ), (\
29\
                "three.jpg",\
30\
                img_emb3,\
31\
                {"type": "jpg"}\
32\
            ), (\
33\
                "four.jpg",\
34\
                img_emb4,\
35\
                {"type": "jpg"}\
36\
            )\
37\
        ]
38
    )
39
    print("Inserted images")
40

41
    # index the collection for fast search performance
42
    images.create_index()
43
    print("Created index")
```

Add this method as a script in your `pyproject.toml` file:

```
1
[tool.poetry.scripts]
2
seed = "image_search.main:seed"
3
search = "image_search.main:search"
```

After activating the virtual environment with `poetry shell` you can now run your seed script via `poetry run seed`. You can inspect the generated embeddings in your local database by visiting the local Supabase dashboard at [localhost:54323](http://localhost:54323/project/default/editor), selecting the `vecs` schema, and the `image_vectors` database.

## Perform an image search from a text query [\#](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip\#perform-an-image-search-from-a-text-query)

With Supabase Vector we can query our embeddings. We can use either an image as search input or alternative we can generate an embedding from a string input and use that as the query input:

```
1
def search():
2
    # create vector store client
3
    vx = vecs.create_client(DB_CONNECTION)
4
    images = vx.get_or_create_collection(name="image_vectors", dimension=512)
5

6
    # Load CLIP model
7
    model = SentenceTransformer('clip-ViT-B-32')
8
    # Encode text query
9
    query_string = "a bike in front of a red brick wall"
10
    text_emb = model.encode(query_string)
11

12
    # query the collection filtering metadata for "type" = "jpg"
13
    results = images.query(
14
        data=text_emb,                      # required
15
        limit=1,                            # number of records to return
16
        filters={"type": {"$eq": "jpg"}},   # metadata filters
17
    )
18
    result = results[0]
19
    print(result)
20
    plt.title(result)
21
    image = mpimg.imread('./images/' + result)
22
    plt.imshow(image)
23
    plt.show()
```

By limiting the query to one result, we can show the most relevant image to the user. Finally we use `matplotlib` to show the image result to the user.

Go ahead and test it out by running `poetry run search` and you will be presented with an image of a "bike in front of a red brick wall".

## Conclusion [\#](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip\#conclusion)

With just a couple of lines of Python you are able to implement image search as well as reverse image search using OpenAI's CLIP model and Supabase Vector.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/examples/image-search-openai-clip.mdx)

### Is this helpful?

NoYes

### On this page

[Create a new Python project with Poetry](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip#create-a-new-python-project-with-poetry) [Setup Supabase project](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip#setup-supabase-project) [Install the dependencies](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip#install-the-dependencies) [Import the necessary dependencies](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip#import-the-necessary-dependencies) [Create embeddings for your images](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip#create-embeddings-for-your-images) [Perform an image search from a text query](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip#perform-an-image-search-from-a-text-query) [Conclusion](https://supabase.com/docs/guides/ai/examples/image-search-openai-clip#conclusion)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)