---
url: "https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python"
title: "Storing Vectors | Supabase Docs"
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

[Storage](https://supabase.com/docs/guides/storage)

[Overview](https://supabase.com/docs/guides/storage)

File Buckets[Quickstart](https://supabase.com/docs/guides/storage/quickstart)
[Fundamentals](https://supabase.com/docs/guides/storage/buckets/fundamentals)
[Creating Buckets](https://supabase.com/docs/guides/storage/buckets/creating-buckets)

Security

Uploads

Serving

Management

S3

CDN

Debugging

Schema

Going to production

[Pricing](https://supabase.com/docs/guides/storage/pricing)

Analytics Buckets[Introduction](https://supabase.com/docs/guides/storage/analytics/introduction)
[Creating Buckets](https://supabase.com/docs/guides/storage/analytics/creating-analytics-buckets)
[Iceberg Catalog](https://supabase.com/docs/guides/storage/analytics/connecting-to-analytics-bucket)
[Realtime Data-Sync](https://supabase.com/docs/guides/storage/analytics/replication)
[Query with Postgres](https://supabase.com/docs/guides/storage/analytics/query-with-postgres)

Examples

[Limits](https://supabase.com/docs/guides/storage/analytics/limits)
[Pricing](https://supabase.com/docs/guides/storage/analytics/pricing)

Vector Buckets[Introduction](https://supabase.com/docs/guides/storage/vector/introduction)
[Creating Buckets](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets)
[Working with Indexes](https://supabase.com/docs/guides/storage/vector/working-with-indexes)
[Storing Vectors](https://supabase.com/docs/guides/storage/vector/storing-vectors)
[Querying Vectors](https://supabase.com/docs/guides/storage/vector/querying-vectors)
[Limits](https://supabase.com/docs/guides/storage/vector/limits)

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

Storage

1. [Storage](https://supabase.com/docs/guides/storage)
3. [Vector Buckets](https://supabase.com/docs/guides/storage/vector)
5. [Storing Vectors](https://supabase.com/docs/guides/storage/vector/storing-vectors)

# Storing Vectors

## Insert and update vector embeddings with metadata using the JavaScript SDK or Postgres.

* * *

##### This feature is in alpha

Expect rapid changes, limited features, and possible breaking updates. [Share feedback](https://github.com/orgs/supabase/discussions/40116) as we refine the experience and expand access.

Once you've created a bucket and index, you can start storing vectors. Vectors can include optional metadata for filtering and enrichment during queries.

## Basic vector insertion [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#basic-vector-insertion)

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
from supabase import create_client
2

3
supabase = create_client('https://your-project.supabase.co', 'your-service-key')
4

5
# Get bucket and index
6
bucket = supabase.storage.vectors().from_('embeddings')
7
index = bucket.index('documents-openai')
8

9
# Insert vectors
10
index.put([\
11\
    {\
12\
        'key': 'doc-1',\
13\
        'data': {'float32': [0.1, 0.2, 0.3]},  # ... rest of embedding\
14\
        'metadata': {\
15\
            'title': 'Getting Started with Vector Buckets',\
16\
            'source': 'documentation',\
17\
        },\
18\
    },\
19\
    {\
20\
        'key': 'doc-2',\
21\
        'data': {'float32': [0.4, 0.5, 0.6]},  # ... rest of embedding\
22\
        'metadata': {\
23\
            'title': 'Advanced Vector Search',\
24\
            'source': 'blog',\
25\
        },\
26\
    },\
27\
])
28

29
print('✓ Vectors stored successfully')
```

## Storing vectors from Embeddings API [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#storing-vectors-from-embeddings-api)

Generate embeddings using an LLM API and store them directly:

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
from supabase import create_client
2
from openai import OpenAI
3
from datetime import datetime
4

5
supabase = create_client('https://your-project.supabase.co', 'your-service-key')
6
openai = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))
7

8
# Documents to embed and store
9
documents = [\
10\
    {'id': '1', 'title': 'How to Train Your AI', 'content': 'Guide for training models...'},\
11\
    {'id': '2', 'title': 'Vector Search Best Practices', 'content': 'Tips for semantic search...'},\
12\
    {'id': '3', 'title': 'Building RAG Systems', 'content': 'Implementing retrieval-augmented generation...'},\
13\
]
14

15
# Generate embeddings
16
embeddings_response = openai.embeddings.create(
17
    model='text-embedding-3-small',
18
    input=[doc['content'] for doc in documents]
19
)
20

21
# Prepare vectors for storage
22
vectors = []
23
for doc, embedding_data in zip(documents, embeddings_response.data):
24
    vectors.append({
25
        'key': doc['id'],
26
        'data': {'float32': embedding_data.embedding},
27
        'metadata': {
28
            'title': doc['title'],
29
            'source': 'knowledge_base',
30
            'created_at': datetime.now().isoformat(),
31
        },
32
    })
33

34
# Store vectors in batches (max 500 per request)
35
bucket = supabase.storage.vectors().from_('embeddings')
36
vector_index = bucket.index('documents-openai')
37

38
batch_size = 500
39
for i in range(0, len(vectors), batch_size):
40
    batch = vectors[i:i + batch_size]
41
    vector_index.put(batch)
42
    print(f'✓ Stored batch {i // batch_size + 1} ({len(batch)} vectors)')
```

## Updating vectors [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#updating-vectors)

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
index = bucket.index('documents-openai')
2

3
# Update a vector (same key)
4
index.put([\
5\
    {\
6\
        'key': 'doc-1',\
7\
        'data': {'float32': [0.15, 0.25, 0.35]},  # ... updated embedding\
8\
        'metadata': {\
9\
            'title': 'Getting Started with Vector Buckets - Updated',\
10\
            'updated_at': datetime.now().isoformat(),\
11\
        },\
12\
    },\
13\
])
14

15
print('✓ Vector updated successfully')
```

## Deleting vectors [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#deleting-vectors)

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
index = bucket.index('documents-openai')
2

3
# Delete specific vectors
4
index.delete(['doc-1', 'doc-2'])
5

6
print('✓ Vectors deleted successfully')
```

## Metadata best practices [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#metadata-best-practices)

Metadata makes vectors more useful by enabling filtering and context:

```
1
const vectors = [\
2\
  {\
3\
    key: 'product-001',\
4\
    data: { float32: [...] },\
5\
    metadata: {\
6\
      product_id: 'prod-001',\
7\
      category: 'electronics',\
8\
      price: 299.99,\
9\
      in_stock: true,\
10\
      tags: ['laptop', 'portable'],\
11\
      description: 'High-performance ultrabook'\
12\
    }\
13\
  },\
14\
  {\
15\
    key: 'product-002',\
16\
    data: { float32: [...] },\
17\
    metadata: {\
18\
      product_id: 'prod-002',\
19\
      category: 'electronics',\
20\
      price: 99.99,\
21\
      in_stock: true,\
22\
      tags: ['headphones', 'wireless'],\
23\
      description: 'Noise-cancelling wireless headphones'\
24\
    }\
25\
  }\
26\
]
27

28
const { error } = await index.putVectors({ vectors })
```

### Metadata field guidelines [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#metadata-field-guidelines)

- **Keep it lightweight** \- Metadata is returned with query results, so large values increase response size
- **Use consistent types** \- Store the same field with consistent data types across vectors
- **Index key fields** \- Mark fields you'll filter by to improve query performance
- **Avoid nested objects** \- While supported, flat structures are easier to filter

## Batch processing large datasets [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#batch-processing-large-datasets)

For storing large numbers of vectors efficiently:

JavaScriptPython

```
1
from supabase import create_client
2
import json
3

4
supabase = create_client(...)
5
index = supabase.storage.vectors().from_('embeddings').index('documents-openai')
6

7
# Read embeddings from file
8
with open('embeddings.jsonl', 'r') as f:
9
    lines = [line.strip() for line in f if line.strip()]
10

11
vectors = []
12
for line in lines:
13
    data = json.loads(line)
14
    vectors.append({
15
        'key': data['key'],
16
        'data': {'float32': data['embedding']},
17
        'metadata': data.get('metadata', {})
18
    })
19

20
# Process in batches
21
BATCH_SIZE = 500
22
processed = 0
23

24
for i in range(0, len(vectors), BATCH_SIZE):
25
    batch = vectors[i:i + BATCH_SIZE]
26

27
    try:
28
        index.put(batch)
29
        processed += len(batch)
30
        print(f'Progress: {processed}/{len(vectors)}')
31
    except Exception as e:
32
        print(f'Batch failed at offset {i}: {e}')
33
        # Optionally implement retry logic
34

35
print('✓ All vectors stored successfully')
```

## Performance optimization [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#performance-optimization)

### Batch operations [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#batch-operations)

Always use batch operations for better performance:

JavaScriptPython

```
1
# ❌ Inefficient - Multiple requests
2
for vector in vectors:
3
    index.put([vector])
4

5
# ✅ Efficient - Single batch operation
6
index.put(vectors)
```

### Metadata considerations [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#metadata-considerations)

Keep metadata concise:

```
1
// ❌ Large metadata
2
metadata: {
3
  full_document_text: 'Very long document content...',
4
  detailed_analysis: { /* large object */ }
5
}
6

7
// ✅ Lean metadata
8
metadata: {
9
  doc_id: 'doc-123',
10
  category: 'news',
11
  summary: 'Brief summary'
12
}
```

## Next steps [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python\#next-steps)

- [Query vectors with similarity search](https://supabase.com/docs/guides/storage/vector/querying-vectors)
- [Work with vector indexes](https://supabase.com/docs/guides/storage/vector/working-with-indexes)
- [Explore vector bucket limits](https://supabase.com/docs/guides/storage/vector/limits)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/vector/storing-vectors.mdx)

### Is this helpful?

NoYes

### On this page

[Basic vector insertion](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#basic-vector-insertion) [Storing vectors from Embeddings API](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#storing-vectors-from-embeddings-api) [Updating vectors](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#updating-vectors) [Deleting vectors](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#deleting-vectors) [Metadata best practices](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#metadata-best-practices) [Metadata field guidelines](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#metadata-field-guidelines) [Batch processing large datasets](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#batch-processing-large-datasets) [Performance optimization](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#performance-optimization) [Batch operations](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#batch-operations) [Metadata considerations](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#metadata-considerations) [Next steps](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=python#next-steps)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)