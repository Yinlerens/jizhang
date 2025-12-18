---
url: "https://supabase.com/docs/guides/ai/integrations/amazon-bedrock"
title: "Amazon Bedrock | Supabase Docs"
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
5. [Amazon Bedrock](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock)

# Amazon Bedrock

* * *

[Amazon Bedrock](https://aws.amazon.com/bedrock) is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies like AI21 Labs, Anthropic, Cohere, Meta, Mistral AI, Stability AI, and Amazon. Each model is accessible through a common API which implements a broad set of features to help build generative AI applications with security, privacy, and responsible AI in mind.

This guide will walk you through an example using Amazon Bedrock SDK with `vecs`. We will create embeddings using the Amazon Titan Embeddings G1 – Text v1.2 (amazon.titan-embed-text-v1) model, insert these embeddings into a Postgres database using vecs, and then query the collection to find the most similar sentences to a given query sentence.

## Create an environment [\#](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock\#create-an-environment)

First, you need to set up your environment. You will need Python 3.7+ with the `vecs` and `boto3` libraries installed.

You can install the necessary Python libraries using pip:

```
1
pip install vecs boto3
```

You'll also need:

- [Credentials to your AWS account](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html)
- [A Postgres Database with the pgvector extension](https://supabase.com/docs/guides/ai/integrations/hosting.md)

## Create embeddings [\#](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock\#create-embeddings)

Next, we will use Amazon’s Titan Embedding G1 - Text v1.2 model to create embeddings for a set of sentences.

```
1
import boto3
2
import vecs
3
import json
4

5
client = boto3.client(
6
    'bedrock-runtime',
7
    region_name='us-east-1',
8
	# Credentials from your AWS account
9
    aws_access_key_id='<replace_your_own_credentials>',
10
    aws_secret_access_key='<replace_your_own_credentials>',
11
    aws_session_token='<replace_your_own_credentials>',
12
)
13

14
dataset = [\
15\
    "The cat sat on the mat.",\
16\
    "The quick brown fox jumps over the lazy dog.",\
17\
    "Friends, Romans, countrymen, lend me your ears",\
18\
    "To be or not to be, that is the question.",\
19\
]
20

21
embeddings = []
22

23
for sentence in dataset:
24
    # invoke the embeddings model for each sentence
25
    response = client.invoke_model(
26
        body= json.dumps({"inputText": sentence}),
27
        modelId= "amazon.titan-embed-text-v1",
28
        accept = "application/json",
29
        contentType = "application/json"
30
    )
31
    # collect the embedding from the response
32
    response_body = json.loads(response["body"].read())
33
    # add the embedding to the embedding list
34
    embeddings.append((sentence, response_body.get("embedding"), {}))
```

### Store the embeddings with vecs [\#](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock\#store-the-embeddings-with-vecs)

Now that we have our embeddings, we can insert them into a Postgres database using vecs.

```
1
import vecs
2

3
DB_CONNECTION = "postgresql://<user>:<password>@<host>:<port>/<db_name>"
4

5
# create vector store client
6
vx = vecs.Client(DB_CONNECTION)
7

8
# create a collection named 'sentences' with 1536 dimensional vectors
9
# to match the default dimension of the Titan Embeddings G1 - Text model
10
sentences = vx.get_or_create_collection(name="sentences", dimension=1536)
11

12
# upsert the embeddings into the 'sentences' collection
13
sentences.upsert(records=embeddings)
14

15
# create an index for the 'sentences' collection
16
sentences.create_index()
```

### Querying for most similar sentences [\#](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock\#querying-for-most-similar-sentences)

Now, we query the `sentences` collection to find the most similar sentences to a sample query sentence. First need to create an embedding for the query sentence. Next, we query the collection we created earlier to find the most similar sentences.

```
1
query_sentence = "A quick animal jumps over a lazy one."
2

3
# create vector store client
4
vx = vecs.Client(DB_CONNECTION)
5

6
# create an embedding for the query sentence
7
response = client.invoke_model(
8
        body= json.dumps({"inputText": query_sentence}),
9
        modelId= "amazon.titan-embed-text-v1",
10
        accept = "application/json",
11
        contentType = "application/json"
12
    )
13

14
response_body = json.loads(response["body"].read())
15

16
query_embedding = response_body.get("embedding")
17

18
# query the 'sentences' collection for the most similar sentences
19
results = sentences.query(
20
    data=query_embedding,
21
    limit=3,
22
    include_value = True
23
)
24

25
# print the results
26
for result in results:
27
    print(result)
```

This returns the most similar 3 records and their distance to the query vector.

```
1
('The quick brown fox jumps over the lazy dog.', 0.27600620558852)
2
('The cat sat on the mat.', 0.609986272479202)
3
('To be or not to be, that is the question.', 0.744849503688346)
```

## Resources [\#](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock\#resources)

- [Amazon Bedrock](https://aws.amazon.com/bedrock)
- [Amazon Titan](https://aws.amazon.com/bedrock/titan)
- [Semantic Image Search with Amazon Titan](https://supabase.com/docs/guides/ai/examples/semantic-image-search-amazon-titan)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/ai/integrations/amazon-bedrock.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FA3uND5sgiO0%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Create an environment](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock#create-an-environment) [Create embeddings](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock#create-embeddings) [Store the embeddings with vecs](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock#store-the-embeddings-with-vecs) [Querying for most similar sentences](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock#querying-for-most-similar-sentences) [Resources](https://supabase.com/docs/guides/ai/integrations/amazon-bedrock#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)