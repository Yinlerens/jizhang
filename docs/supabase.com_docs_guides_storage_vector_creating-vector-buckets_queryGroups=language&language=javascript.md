---
url: "https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript"
title: "Creating Vector Buckets | Supabase Docs"
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
5. [Creating Buckets](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets)

# Creating Vector Buckets

## Set up vector buckets and indexes using the dashboard or JavaScript SDK.

* * *

##### This feature is in alpha

Expect rapid changes, limited features, and possible breaking updates. [Share feedback](https://github.com/orgs/supabase/discussions/40116) as we refine the experience and expand access.

Vector buckets organize your vector data into logical units. Within each bucket, you create indexes that define how vectors are stored and searched based on their dimensions and distance metrics.

## Creating a Vector bucket [\#](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript\#creating-a-vector-bucket)

You can create vector buckets using either the Supabase Dashboard or the SDK.

### Using the Supabase Dashboard [\#](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript\#using-the-supabase-dashboard)

1. Navigate to the **Storage** section in the Supabase Dashboard.
2. Click **Create Bucket**.
3. Enter a name for your bucket (e.g., `embeddings` or `semantic-search`).
4. Select **Vector Bucket** as the bucket type.
5. Click **Create**.

Your vector bucket is now ready. The next step is to create indexes within it.

### Using the SDK [\#](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript\#using-the-sdk)

JavaScriptPython

```
1
import { createClient } from '@supabase/supabase-js'
2

3
const supabase = createClient('https://your-project.supabase.co', 'your-service-key')
4

5
// Create a vector bucket
6
await supabase.storage.vectors.createBucket('embeddings')
7

8
console.log('✓ Vector bucket created: embeddings')
```

## Creating indexes [\#](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript\#creating-indexes)

Indexes organize vectors within a bucket with consistent dimensions and distance metrics. For comprehensive index management documentation, see [Working with Vector Indexes](https://supabase.com/docs/guides/storage/vector/working-with-indexes).

### Quick start: Creating an index via Dashboard [\#](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript\#quick-start-creating-an-index-via-dashboard)

1. Open your vector bucket.
2. Click **Create Index**.
3. Enter an index name (e.g., `documents-openai`).
4. Set the dimension matching your embeddings (e.g., `1536` for OpenAI's text-embedding-3-small).
5. Select the distance metric (`cosine`, `euclidean`, or `l2`).
6. Click **Create**.

### Quick start: Creating an index via SDK [\#](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript\#quick-start-creating-an-index-via-sdk)

JavaScriptPython

```
1
const bucket = supabase.storage.vectors.from('embeddings')
2

3
// Create an index
4
await bucket.createIndex({
5
  indexName: 'documents-openai',
6
  dataType: 'float32',
7
  dimension: 1536,
8
  distanceMetric: 'cosine',
9
})
10

11
console.log('✓ Index created: documents-openai')
```

### Key details [\#](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript\#key-details)

- **Dimension** must match your embedding model (e.g., 1536 for OpenAI)
- **Distance metric** (`cosine`, `euclidean`, or `l2`) is immutable after creation
- **Maximum indexes per bucket**: 10
- **Maximum batch size**: 500 vectors per operation

For detailed information on distance metrics, embedding dimensions, managing multiple indexes, and advanced index operations, see [Working with Vector Indexes](https://supabase.com/docs/guides/storage/vector/working-with-indexes).

## Next steps [\#](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript\#next-steps)

After creating your bucket and indexes, you can:

- [Store vectors](https://supabase.com/docs/guides/storage/vector/storing-vectors)
- [Query vectors with similarity search](https://supabase.com/docs/guides/storage/vector/querying-vectors)
- [Explore vector bucket limits](https://supabase.com/docs/guides/storage/vector/limits)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/vector/creating-vector-buckets.mdx)

### Is this helpful?

NoYes

### On this page

[Creating a Vector bucket](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript#creating-a-vector-bucket) [Using the Supabase Dashboard](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript#using-the-supabase-dashboard) [Using the SDK](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript#using-the-sdk) [Creating indexes](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript#creating-indexes) [Quick start: Creating an index via Dashboard](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript#quick-start-creating-an-index-via-dashboard) [Quick start: Creating an index via SDK](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript#quick-start-creating-an-index-via-sdk) [Key details](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript#key-details) [Next steps](https://supabase.com/docs/guides/storage/vector/creating-vector-buckets?queryGroups=language&language=javascript#next-steps)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)