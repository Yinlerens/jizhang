---
url: "https://supabase.com/docs/guides/ai/integrations/roboflow"
title: "Roboflow | Supabase Docs"
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
5. [Roboflow](https://supabase.com/docs/guides/ai/integrations/roboflow)

# Roboflow

## Learn how to integrate Supabase with Roboflow, a tool for running fine-tuned and foundation vision models.

* * *

In this guide, we will walk through two examples of using [Roboflow Inference](https://inference.roboflow.com/) to run fine-tuned and foundation models. We will run inference and save predictions using an object detection model and [CLIP](https://github.com/openai/CLIP).

## Project setup [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#project-setup)

Let's create a new Postgres database. This is as simple as starting a new Project in Supabase:

1. [Create a new project](https://database.new/) in the Supabase dashboard.
2. Enter your project details. Remember to store your password somewhere safe.

Your database will be available in less than a minute.

**Finding your credentials:**

You can find your project credentials on the dashboard:

- [Database connection strings](https://supabase.com/dashboard/project/_/settings/api?showConnect=true): Direct and Pooler connection details including the connection string and parameters.
- [Database password](https://supabase.com/dashboard/project/_/database/settings): Reset database password here if you do not have it.
- [API credentials](https://supabase.com/dashboard/project/_/settings/api): your serverless API URL and `anon` / `service_role` keys.

## Save computer vision predictions [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#save-computer-vision-predictions)

Once you have a trained vision model, you need to create business logic for your application. In many cases, you want to save inference results to a file.

The steps below show you how to run a vision model locally and save predictions to Supabase.

### Preparation: Set up a model [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#preparation-set-up-a-model)

Before you begin, you will need an object detection model trained on your data.

You can [train a model on Roboflow](https://blog.roboflow.com/getting-started-with-roboflow/), leveraging end-to-end tools from data management and annotation to deployment, or [upload custom model weights](https://docs.roboflow.com/deploy/upload-custom-weights) for deployment.

All models have an infinitely scalable API through which you can query your model, and can be run locally.

For this guide, we will use a demo [rock, paper, scissors](https://universe.roboflow.com/roboflow-58fyf/rock-paper-scissors-sxsw) model.

### Step 1: Install and start Roboflow Inference [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#step-1-install-and-start-roboflow-inference)

You will deploy our model locally using Roboflow Inference, a computer vision inference server.

To install and start Roboflow Inference, first install Docker on your machine.

Then, run:

```
1
pip install inference inference-cli inference-sdk && inference server start
```

An inference server will be available at `http://localhost:9001`.

### Step 2: Run inference on an image [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#step-2-run-inference-on-an-image)

You can run inference on images and videos. Let's run inference on an image.

Create a new Python file and add the following code:

```
1
from inference_sdk import InferenceHTTPClient
2

3
image = "example.jpg"
4
MODEL_ID = "rock-paper-scissors-sxsw/11"
5

6
client = InferenceHTTPClient(
7
    api_url="http://localhost:9001",
8
    api_key="ROBOFLOW_API_KEY"
9
)
10
with client.use_model(MODEL_ID):
11
    predictions = client.infer(image)
12

13
print(predictions)
```

Above, replace:

1. The image URL with the name of the image on which you want to run inference.
2. `ROBOFLOW_API_KEY` with your Roboflow API key. [Learn how to retrieve your Roboflow API key](https://docs.roboflow.com/api-reference/authentication#retrieve-an-api-key).
3. `MODEL_ID` with your Roboflow model ID. [Learn how to retrieve your model ID](https://docs.roboflow.com/api-reference/workspace-and-project-ids).

When you run the code above, a list of predictions will be printed to the console:

```
1
{'time': 0.05402109300121083, 'image': {'width': 640, 'height': 480}, 'predictions': [{'x': 312.5, 'y': 392.0, 'width': 255.0, 'height': 110.0, 'confidence': 0.8620790839195251, 'class': 'Paper', 'class_id': 0}]}
```

### Step 3: Save results in Supabase [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#step-3-save-results-in-supabase)

To save results in Supabase, add the following code to your script:

```
1
import os
2
from supabase import create_client, Client
3

4
url: str = os.environ.get("SUPABASE_URL")
5
key: str = os.environ.get("SUPABASE_KEY")
6
supabase: Client = create_client(url, key)
7

8
result = supabase.table('predictions') \
9
    .insert({"filename": image, "predictions": predictions}) \
10
    .execute()
```

You can then query your predictions using the following code:

```
1
result = supabase.table('predictions') \
2
    .select("predictions") \
3
    .filter("filename", "eq", image) \
4
    .execute()
5

6
print(result)
```

Here is an example result:

```
1
data=[{'predictions': {'time': 0.08492901099998562, 'image': {'width': 640, 'height': 480}, 'predictions': [{'x': 312.5, 'y': 392.0, 'width': 255.0, 'height': 110.0, 'confidence': 0.8620790839195251, 'class': 'Paper', 'class_id': 0}]}}, {'predictions': {'time': 0.08818970100037404, 'image': {'width': 640, 'height': 480}, 'predictions': [{'x': 312.5, 'y': 392.0, 'width': 255.0, 'height': 110.0, 'confidence': 0.8620790839195251, 'class': 'Paper', 'class_id': 0}]}}] count=None
```

## Calculate and save CLIP embeddings [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#calculate-and-save-clip-embeddings)

You can use the Supabase vector database functionality to store and query CLIP embeddings.

Roboflow Inference provides a HTTP interface through which you can calculate image and text embeddings using CLIP.

### Step 1: Install and start Roboflow Inference [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#step-1-install-and-start-roboflow-inference)

See [Step #1: Install and Start Roboflow Inference](https://supabase.com/docs/guides/ai/integrations/roboflow#step-1-install-and-start-roboflow-inference) above to install and start Roboflow Inference.

### Step 2: Run CLIP on an image [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#step-2-run-clip-on-an-image)

Create a new Python file and add the following code:

```
1
import cv2
2
import supervision as sv
3
import requests
4
import base64
5
import os
6

7
IMAGE_DIR = "images/train/images/"
8
API_KEY = ""
9
SERVER_URL = "http://localhost:9001"
10

11
results = []
12

13
for i, image in enumerate(os.listdir(IMAGE_DIR)):
14
    print(f"Processing image {image}")
15
    infer_clip_payload = {
16
        "image": {
17
            "type": "base64",
18
            "value": base64.b64encode(open(IMAGE_DIR + image, "rb").read()).decode("utf-8"),
19
        },
20
    }
21

22
    res = requests.post(
23
        f"{SERVER_URL}/clip/embed_image?api_key={API_KEY}",
24
        json=infer_clip_payload,
25
    )
26

27
    embeddings = res.json()['embeddings']
28

29
    results.append({
30
        "filename": image,
31
        "embeddings": embeddings
32
    })
```

This code will calculate CLIP embeddings for each image in the directory and print the results to the console.

Above, replace:

1. `IMAGE_DIR` with the directory containing the images on which you want to run inference.
2. `ROBOFLOW_API_KEY` with your Roboflow API key. [Learn how to retrieve your Roboflow API key](https://docs.roboflow.com/api-reference/authentication#retrieve-an-api-key).

You can also calculate CLIP embeddings in the cloud by setting `SERVER_URL` to `https://infer.roboflow.com`.

### Step 3: Save embeddings in Supabase [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#step-3-save-embeddings-in-supabase)

You can store your image embeddings in Supabase using the Supabase `vecs` Python package:

First, install `vecs`:

```
1
pip install vecs
```

Next, add the following code to your script to create an index:

```
1
import vecs
2

3
DB_CONNECTION = "postgresql://postgres:[password]@[host]:[port]/[database]"
4

5
vx = vecs.create_client(DB_CONNECTION)
6

7
# create a collection of vectors with 3 dimensions
8
images = vx.get_or_create_collection(name="image_vectors", dimension=512)
9

10
for result in results:
11
    image = result["filename"]
12
    embeddings = result["embeddings"][0]
13

14
    # insert a vector into the collection
15
    images.upsert(
16
        records=[\
17\
            (\
18\
                image,\
19\
                embeddings,\
20\
                {} # metadata\
21\
            )\
22\
        ]
23
    )
24

25
images.create_index()
```

Replace `DB_CONNECTION` with the authentication information for your database. You can retrieve this from the Supabase dashboard in `Project Settings > Database Settings`.

You can then query your embeddings using the following code:

```
1
infer_clip_payload = {
2
    "text": "cat",
3
}
4

5
res = requests.post(
6
    f"{SERVER_URL}/clip/embed_text?api_key={API_KEY}",
7
    json=infer_clip_payload,
8
)
9

10
embeddings = res.json()['embeddings']
11

12
result = images.query(
13
    data=embeddings[0],
14
    limit=1
15
)
16

17
print(result[0])
```

## Resources [\#](https://supabase.com/docs/guides/ai/integrations/roboflow\#resources)

- [Roboflow Inference documentation](https://inference.roboflow.com/)
- [Roboflow Getting Started guide](https://blog.roboflow.com/getting-started-with-roboflow/)
- [How to Build a Semantic Image Search Engine with Supabase and OpenAI CLIP](https://blog.roboflow.com/how-to-use-semantic-search-supabase-openai-clip/)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/integrations/roboflow.mdx)

### Is this helpful?

NoYes

### On this page

[Project setup](https://supabase.com/docs/guides/ai/integrations/roboflow#project-setup) [Save computer vision predictions](https://supabase.com/docs/guides/ai/integrations/roboflow#save-computer-vision-predictions) [Preparation: Set up a model](https://supabase.com/docs/guides/ai/integrations/roboflow#preparation-set-up-a-model) [Step 1: Install and start Roboflow Inference](https://supabase.com/docs/guides/ai/integrations/roboflow#step-1-install-and-start-roboflow-inference) [Step 2: Run inference on an image](https://supabase.com/docs/guides/ai/integrations/roboflow#step-2-run-inference-on-an-image) [Step 3: Save results in Supabase](https://supabase.com/docs/guides/ai/integrations/roboflow#step-3-save-results-in-supabase) [Calculate and save CLIP embeddings](https://supabase.com/docs/guides/ai/integrations/roboflow#calculate-and-save-clip-embeddings) [Step 1: Install and start Roboflow Inference](https://supabase.com/docs/guides/ai/integrations/roboflow#step-1-install-and-start-roboflow-inference) [Step 2: Run CLIP on an image](https://supabase.com/docs/guides/ai/integrations/roboflow#step-2-run-clip-on-an-image) [Step 3: Save embeddings in Supabase](https://supabase.com/docs/guides/ai/integrations/roboflow#step-3-save-embeddings-in-supabase) [Resources](https://supabase.com/docs/guides/ai/integrations/roboflow#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)