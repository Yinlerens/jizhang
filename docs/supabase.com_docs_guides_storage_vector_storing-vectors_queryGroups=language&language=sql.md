---
url: "https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql"
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

## Basic vector insertion [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#basic-vector-insertion)

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
-- Setup S3 Vector Wrapper (one-time setup)
2
-- https://supabase.com/docs/guides/database/extensions/wrappers/s3_vectors
3

4
-- Insert vectors into the index
5
INSERT INTO s3_vectors.documents_openai (key, data, metadata)
6
VALUES
7
  (
8
    'doc-1',
9
    '[0.1, 0.2, 0.3, /* ... rest of embedding ... */]'::embd,
10
    '{"title": "Getting Started with Vector Buckets", "source": "documentation"}'::jsonb
11
  ),
12
  (
13
    'doc-2',
14
    '[0.4, 0.5, 0.6, /* ... rest of embedding ... */]'::embd,
15
    '{"title": "Advanced Vector Search", "source": "blog"}'::jsonb
16
  );
```

## Storing vectors from Embeddings API [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#storing-vectors-from-embeddings-api)

Generate embeddings using an LLM API and store them directly:

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
-- Insert vectors with pre-generated embeddings
2
INSERT INTO s3_vectors.documents_openai (key, data, metadata)
3
VALUES
4
  (
5
    '1',
6
    '[0.1, 0.2, 0.3, /* ... rest of embedding ... */]'::embd,
7
    '{"title": "How to Train Your AI", "source": "knowledge_base", "created_at": "2025-01-01T00:00:00Z"}'::jsonb
8
  ),
9
  (
10
    '2',
11
    '[0.4, 0.5, 0.6, /* ... rest of embedding ... */]'::embd,
12
    '{"title": "Vector Search Best Practices", "source": "knowledge_base", "created_at": "2025-01-01T00:00:00Z"}'::jsonb
13
  ),
14
  (
15
    '3',
16
    '[0.7, 0.8, 0.9, /* ... rest of embedding ... */]'::embd,
17
    '{"title": "Building RAG Systems", "source": "knowledge_base", "created_at": "2025-01-01T00:00:00Z"}'::jsonb
18
  );
```

## Updating vectors [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#updating-vectors)

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
-- Update a vector (delete and re-insert)
2
DELETE FROM s3_vectors.documents_openai WHERE key = 'doc-1';
3

4
INSERT INTO s3_vectors.documents_openai (key, data, metadata)
5
VALUES (
6
  'doc-1',
7
  '[0.15, 0.25, 0.35, /* ... updated embedding ... */]'::embd,
8
  '{"title": "Getting Started with Vector Buckets - Updated", "updated_at": "2025-01-01T00:00:00Z"}'::jsonb
9
);
```

## Deleting vectors [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#deleting-vectors)

JavaScriptPythonSQL (via S3 Vector Wrapper)

```
1
-- Delete vectors by key
2
delete from s3_vectors.documents_openai
3
where key in ('doc-1', 'doc-2');
```

## Metadata best practices [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#metadata-best-practices)

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

### Metadata field guidelines [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#metadata-field-guidelines)

- **Keep it lightweight** \- Metadata is returned with query results, so large values increase response size
- **Use consistent types** \- Store the same field with consistent data types across vectors
- **Index key fields** \- Mark fields you'll filter by to improve query performance
- **Avoid nested objects** \- While supported, flat structures are easier to filter

## Batch processing large datasets [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#batch-processing-large-datasets)

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

## Performance optimization [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#performance-optimization)

### Batch operations [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#batch-operations)

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

### Metadata considerations [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#metadata-considerations)

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

## Next steps [\#](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql\#next-steps)

- [Query vectors with similarity search](https://supabase.com/docs/guides/storage/vector/querying-vectors)
- [Work with vector indexes](https://supabase.com/docs/guides/storage/vector/working-with-indexes)
- [Explore vector bucket limits](https://supabase.com/docs/guides/storage/vector/limits)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/vector/storing-vectors.mdx)

### Is this helpful?

NoYes

### On this page

[Basic vector insertion](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#basic-vector-insertion) [Storing vectors from Embeddings API](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#storing-vectors-from-embeddings-api) [Updating vectors](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#updating-vectors) [Deleting vectors](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#deleting-vectors) [Metadata best practices](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#metadata-best-practices) [Metadata field guidelines](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#metadata-field-guidelines) [Batch processing large datasets](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#batch-processing-large-datasets) [Performance optimization](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#performance-optimization) [Batch operations](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#batch-operations) [Metadata considerations](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#metadata-considerations) [Next steps](https://supabase.com/docs/guides/storage/vector/storing-vectors?queryGroups=language&language=sql#next-steps)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)