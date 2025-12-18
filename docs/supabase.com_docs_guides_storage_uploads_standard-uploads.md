---
url: "https://supabase.com/docs/guides/storage/uploads/standard-uploads"
title: "Standard Uploads | Supabase Docs"
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

[Standard Uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads)
[Resumable Uploads](https://supabase.com/docs/guides/storage/uploads/resumable-uploads)
[S3 Uploads](https://supabase.com/docs/guides/storage/uploads/s3-uploads)
[Limits](https://supabase.com/docs/guides/storage/uploads/file-limits)

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
3. More
5. [Uploads](https://supabase.com/docs/guides/storage/uploads)
7. [Standard Uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads)

# Standard Uploads

## Learn how to upload files to Supabase Storage.

* * *

## Uploading [\#](https://supabase.com/docs/guides/storage/uploads/standard-uploads\#uploading)

The standard file upload method is ideal for small files that are not larger than 6MB.

It uses the traditional `multipart/form-data` format and is simple to implement using the supabase-js SDK. Here's an example of how to upload a file using the standard upload method:

Though you can upload up to 5GB files using the standard upload method, we recommend using [TUS Resumable Upload](https://supabase.com/docs/guides/storage/uploads/resumable-uploads) for uploading files greater than 6MB in size for better reliability.

JavaScriptDartSwiftKotlinPython

```
1
import { createClient } from '@supabase/supabase-js'
2

3
// Create Supabase client
4
const supabase = createClient('your_project_url', 'your_supabase_api_key')
5

6
// Upload file using standard upload
7
async function uploadFile(file) {
8
  const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file)
9
  if (error) {
10
    // Handle error
11
  } else {
12
    // Handle success
13
  }
14
}
```

## Overwriting files [\#](https://supabase.com/docs/guides/storage/uploads/standard-uploads\#overwriting-files)

When uploading a file to a path that already exists, the default behavior is to return a `400 Asset Already Exists` error.
If you want to overwrite a file on a specific path you can set the `upsert` options to `true` or using the `x-upsert` header.

JavaScriptDartSwiftKotlinPython

```
1
// Create Supabase client
2
const supabase = createClient('your_project_url', 'your_supabase_api_key')
3

4
await supabase.storage.from('bucket_name').upload('file_path', file, {
5
  upsert: true,
6
})
```

We do advise against overwriting files when possible, as our Content Delivery Network will take sometime to propagate the changes to all the edge nodes leading to stale content.
Uploading a file to a new path is the recommended way to avoid propagation delays and stale content.

## Content type [\#](https://supabase.com/docs/guides/storage/uploads/standard-uploads\#content-type)

By default, Storage will assume the content type of an asset from the file extension. If you want to specify the content type for your asset, pass the `contentType` option during upload.

JavaScriptDartSwiftKotlinPython

```
1
// Create Supabase client
2
const supabase = createClient('your_project_url', 'your_supabase_api_key')
3

4
await supabase.storage.from('bucket_name').upload('file_path', file, {
5
  contentType: 'image/jpeg',
6
})
```

## Concurrency [\#](https://supabase.com/docs/guides/storage/uploads/standard-uploads\#concurrency)

When two or more clients upload a file to the same path, the first client to complete the upload will succeed and the other clients will receive a `400 Asset Already Exists` error.
If you provide the `x-upsert` header the last client to complete the upload will succeed instead.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/uploads/standard-uploads.mdx)

### Is this helpful?

NoYes

### On this page

[Uploading](https://supabase.com/docs/guides/storage/uploads/standard-uploads#uploading) [Overwriting files](https://supabase.com/docs/guides/storage/uploads/standard-uploads#overwriting-files) [Content type](https://supabase.com/docs/guides/storage/uploads/standard-uploads#content-type) [Concurrency](https://supabase.com/docs/guides/storage/uploads/standard-uploads#concurrency)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)