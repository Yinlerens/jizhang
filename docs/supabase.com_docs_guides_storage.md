---
url: "https://supabase.com/docs/guides/storage"
title: "Storage | Supabase Docs"
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
3. [Overview](https://supabase.com/docs/guides/storage)

# Storage

## Use Supabase to store and serve files.

* * *

Supabase Storage is a robust, scalable solution for managing files of any size with fine-grained access controls and optimized delivery. Whether you're storing user-generated content, analytics data, or vector embeddings, Supabase Storage provides specialized bucket types to meet your specific needs.

## Key features [\#](https://supabase.com/docs/guides/storage\#key-features)

- **Multi Protocol** \- S3 compatible Storage, RESTful API, TUS resumable uploads
- **Global CDN** \- Serve your assets with lightning-fast performance from over 285 cities worldwide
- **Image Optimization** \- Resize, compress, and transform media files on the fly with built-in image processing
- **Fine-grained Access Control** \- Manage file permissions with row-level security and custom policies
- **Multiple Bucket Types** \- Specialized storage solutions for different use cases

## Storage bucket types [\#](https://supabase.com/docs/guides/storage\#storage-bucket-types)

Supabase Storage offers different bucket types optimized for specific use cases:

### Files buckets [\#](https://supabase.com/docs/guides/storage\#files-buckets)

Store and serve traditional files including images, videos, documents, and general-purpose content. Ideal for user-generated content, media libraries, and asset management.

**Use cases:** Images, videos, documents, PDFs, archives

**Features:**

- Global CDN delivery
- Image optimization and transformation
- Row-level security integration
- Direct URL access for files

[Learn more about Files Buckets](https://supabase.com/docs/guides/storage/quickstart)

### Analytics buckets [\#](https://supabase.com/docs/guides/storage\#analytics-buckets)

Purpose-built for storing and analyzing data in open table formats like Apache Iceberg. Perfect for time-series data, logs, and large-scale analytical workloads.

**Use cases:** Data lakes, analytics pipelines, ETL operations, historical data analysis

**Features:**

- Apache Iceberg table format support
- SQL-accessible via Postgres foreign tables
- Partitioned data organization
- Efficient data querying and transformation

[Learn more about Analytics Buckets](https://supabase.com/docs/guides/storage/analytics/introduction)

### Vector buckets [\#](https://supabase.com/docs/guides/storage\#vector-buckets)

Specialized storage for vector embeddings and similarity search operations. Designed for AI and ML applications requiring semantic search capabilities.

**Use cases:** AI-powered search, semantic similarity matching, embedding storage, RAG systems

**Features:**

- Optimized vector indexing (HNSW, Flat)
- Multiple distance metrics (cosine, euclidean, L2)
- Metadata filtering for vectors
- Similarity search queries

[Learn more about Vector Buckets](https://supabase.com/docs/guides/storage/vector/introduction)

## Examples [\#](https://supabase.com/docs/guides/storage\#examples)

Check out all of the Storage [templates and examples](https://github.com/supabase/supabase/tree/master/examples/storage) in our GitHub repository.

[![Resumable Uploads with Uppy](https://supabase.com/docs/img/icons/github-icon-light.svg)\\
\\
Resumable Uploads with Uppy\\
\\
Use Uppy to upload files to Supabase Storage using the TUS protocol (resumable uploads).](https://github.com/supabase/supabase/tree/master/examples/storage/resumable-upload-uppy)

## Resources [\#](https://supabase.com/docs/guides/storage\#resources)

Find the source code and documentation in the Supabase GitHub repository.

[Supabase Storage API\\
\\
View the source code.](https://github.com/supabase/storage-api)

[OpenAPI Spec\\
\\
See the Swagger Documentation for Supabase Storage.](https://supabase.github.io/storage/)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage.mdx)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)