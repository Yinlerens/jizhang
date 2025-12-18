---
url: "https://supabase.com/docs/guides/storage/vector/storing-vectors"
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

## Basic vector insertion [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#basic-vector-insertion)

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
import { createClient } from '@supabase/supabase-js'
2

3
const supabase = createClient('https://your-project.supabase.co', 'your-service-key')
4

5
// Get bucket and index
6
const bucket = supabase.storage.vectors.from('embeddings')
7
const index = bucket.index('documents-openai')
8

9
// Insert vectors
10
const { error } = await index.putVectors({
11
  vectors: [\
12\
    {\
13\
      key: 'doc-1',\
14\
      data: {\
15\
        float32: [0.1, 0.2, 0.3 /* ... rest of embedding ... */],\
16\
      },\
17\
      metadata: {\
18\
        title: 'Getting Started with Vector Buckets',\
19\
        source: 'documentation',\
20\
      },\
21\
    },\
22\
    {\
23\
      key: 'doc-2',\
24\
      data: {\
25\
        float32: [0.4, 0.5, 0.6 /* ... rest of embedding ... */],\
26\
      },\
27\
      metadata: {\
28\
        title: 'Advanced Vector Search',\
29\
        source: 'blog',\
30\
      },\
31\
    },\
32\
  ],
33
})
34

35
if (error) {
36
  console.error('Error storing vectors:', error)
37
} else {
38
  console.log('✓ Vectors stored successfully')
39
}
```

## Storing vectors from Embeddings API [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#storing-vectors-from-embeddings-api)

Generate embeddings using an LLM API and store them directly:

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
import { createClient } from '@supabase/supabase-js'
2
import OpenAI from 'openai'
3

4
const supabase = createClient('https://your-project.supabase.co', 'your-service-key')
5

6
const openai = new OpenAI({
7
  apiKey: process.env.OPENAI_API_KEY,
8
})
9

10
// Documents to embed and store
11
const documents = [\
12\
  { id: '1', title: 'How to Train Your AI', content: 'Guide for training models...' },\
13\
  { id: '2', title: 'Vector Search Best Practices', content: 'Tips for semantic search...' },\
14\
  {\
15\
    id: '3',\
16\
    title: 'Building RAG Systems',\
17\
    content: 'Implementing retrieval-augmented generation...',\
18\
  },\
19\
]
20

21
// Generate embeddings
22
const embeddings = await openai.embeddings.create({
23
  model: 'text-embedding-3-small',
24
  input: documents.map((doc) => doc.content),
25
})
26

27
// Prepare vectors for storage
28
const vectors = documents.map((doc, index) => ({
29
  key: doc.id,
30
  data: {
31
    float32: embeddings.data[index].embedding,
32
  },
33
  metadata: {
34
    title: doc.title,
35
    source: 'knowledge_base',
36
    created_at: new Date().toISOString(),
37
  },
38
}))
39

40
// Store vectors in batches (max 500 per request)
41
const bucket = supabase.storage.vectors.from('embeddings')
42
const vectorIndex = bucket.index('documents-openai')
43

44
for (let i = 0; i < vectors.length; i += 500) {
45
  const batch = vectors.slice(i, i + 500)
46
  const { error } = await vectorIndex.putVectors({ vectors: batch })
47

48
  if (error) {
49
    console.error(`Error storing batch ${i / 500 + 1}:`, error)
50
  } else {
51
    console.log(`✓ Stored batch ${i / 500 + 1} (${batch.length} vectors)`)
52
  }
53
}
```

## Updating vectors [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#updating-vectors)

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
const index = bucket.index('documents-openai')
2

3
// Update a vector (same key)
4
const { error } = await index.putVectors({
5
  vectors: [\
6\
    {\
7\
      key: 'doc-1',\
8\
      data: {\
9\
        float32: [0.15, 0.25, 0.35 /* ... updated embedding ... */],\
10\
      },\
11\
      metadata: {\
12\
        title: 'Getting Started with Vector Buckets - Updated',\
13\
        updated_at: new Date().toISOString(),\
14\
      },\
15\
    },\
16\
  ],
17
})
18

19
if (!error) {
20
  console.log('✓ Vector updated successfully')
21
}
```

## Deleting vectors [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#deleting-vectors)

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
const index = bucket.index('documents-openai')
2

3
// Delete specific vectors
4
const { error } = await index.deleteVectors({
5
  keys: ['doc-1', 'doc-2'],
6
})
7

8
if (!error) {
9
  console.log('✓ Vectors deleted successfully')
10
}
```

## Metadata best practices [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#metadata-best-practices)

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

### Metadata field guidelines [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#metadata-field-guidelines)

- **Keep it lightweight** \- Metadata is returned with query results, so large values increase response size
- **Use consistent types** \- Store the same field with consistent data types across vectors
- **Index key fields** \- Mark fields you'll filter by to improve query performance
- **Avoid nested objects** \- While supported, flat structures are easier to filter

## Batch processing large datasets [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#batch-processing-large-datasets)

For storing large numbers of vectors efficiently:

JavaScriptPython

```
1
import { createClient } from '@supabase/supabase-js'
2
import fs from 'fs'
3

4
const supabase = createClient(...)
5
const index = supabase.storage.vectors
6
  .from('embeddings')
7
  .index('documents-openai')
8

9
// Read embeddings from file
10
const embeddingsFile = fs.readFileSync('embeddings.jsonl', 'utf-8')
11
const lines = embeddingsFile.split('\n').filter(line => line.trim())
12

13
const vectors = lines.map((line, idx) => {
14
  const { key, embedding, metadata } = JSON.parse(line)
15
  return {
16
    key,
17
    data: { float32: embedding },
18
    metadata
19
  }
20
})
21

22
// Process in batches
23
const BATCH_SIZE = 500
24
let processed = 0
25

26
for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
27
  const batch = vectors.slice(i, i + BATCH_SIZE)
28

29
  try {
30
    const { error } = await index.putVectors({ vectors: batch })
31

32
    if (error) throw error
33

34
    processed += batch.length
35
    console.log(`Progress: ${processed}/${vectors.length}`)
36
  } catch (error) {
37
    console.error(`Batch failed at offset ${i}:`, error)
38
    // Optionally implement retry logic
39
  }
40
}
41

42
console.log('✓ All vectors stored successfully')
```

## Performance optimization [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#performance-optimization)

### Batch operations [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#batch-operations)

Always use batch operations for better performance:

JavaScriptPython

```
1
// ❌ Inefficient - Multiple requests
2
for (const vector of vectors) {
3
  await index.putVectors({ vectors: [vector] })
4
}
5

6
// ✅ Efficient - Single batch operation
7
await index.putVectors({ vectors })
```

### Metadata considerations [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#metadata-considerations)

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

## Next steps [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors\#next-steps)

- [Query vectors with similarity search](https://supabase.com/docs/guides/storage/vector/querying-vectors)
- [Work with vector indexes](https://supabase.com/docs/guides/storage/vector/working-with-indexes)
- [Explore vector bucket limits](https://supabase.com/docs/guides/storage/vector/limits)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/vector/storing-vectors.mdx)

### Is this helpful?

NoYes

### On this page

[Basic vector insertion](https://supabase.com/docs/guides/storage/vector/storing-vectors#basic-vector-insertion) [Storing vectors from Embeddings API](https://supabase.com/docs/guides/storage/vector/storing-vectors#storing-vectors-from-embeddings-api) [Updating vectors](https://supabase.com/docs/guides/storage/vector/storing-vectors#updating-vectors) [Deleting vectors](https://supabase.com/docs/guides/storage/vector/storing-vectors#deleting-vectors) [Metadata best practices](https://supabase.com/docs/guides/storage/vector/storing-vectors#metadata-best-practices) [Metadata field guidelines](https://supabase.com/docs/guides/storage/vector/storing-vectors#metadata-field-guidelines) [Batch processing large datasets](https://supabase.com/docs/guides/storage/vector/storing-vectors#batch-processing-large-datasets) [Performance optimization](https://supabase.com/docs/guides/storage/vector/storing-vectors#performance-optimization) [Batch operations](https://supabase.com/docs/guides/storage/vector/storing-vectors#batch-operations) [Metadata considerations](https://supabase.com/docs/guides/storage/vector/storing-vectors#metadata-considerations) [Next steps](https://supabase.com/docs/guides/storage/vector/storing-vectors#next-steps)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)