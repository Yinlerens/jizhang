---
url: "https://supabase.com/docs/guides/storage/uploads/s3-uploads"
title: "S3 Uploads | Supabase Docs"
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
7. [S3 Uploads](https://supabase.com/docs/guides/storage/uploads/s3-uploads)

# S3 Uploads

## Learn how to upload files to Supabase Storage using S3.

* * *

You can use the S3 protocol to upload files to Supabase Storage. To get started with S3, see the [S3 setup guide](https://supabase.com/docs/guides/storage/s3/authentication).

The S3 protocol supports file upload using:

- A single request
- Multiple requests via Multipart Upload

## Single request uploads [\#](https://supabase.com/docs/guides/storage/uploads/s3-uploads\#single-request-uploads)

The `PutObject` action uploads the file in a single request. This matches the behavior of the Supabase SDK [Standard Upload](https://supabase.com/docs/guides/storage/uploads/standard-uploads).

Use `PutObject` to upload smaller files, where retrying the entire upload won't be an issue. The maximum file size on paid plans is 500 GB.

For example, using JavaScript and the `aws-sdk` client:

```
1
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
2

3
const s3Client = new S3Client({...})
4

5
const file = fs.createReadStream('path/to/file')
6

7
const uploadCommand = new PutObjectCommand({
8
  Bucket: 'bucket-name',
9
  Key: 'path/to/file',
10
  Body: file,
11
  ContentType: 'image/jpeg',
12
})
13

14
await s3Client.send(uploadCommand)
```

## Multipart uploads [\#](https://supabase.com/docs/guides/storage/uploads/s3-uploads\#multipart-uploads)

Multipart Uploads split the file into smaller parts and upload them in parallel, maximizing the upload speed on a fast network. When uploading large files, this allows you to retry the upload of individual parts in case of network issues.

This method is preferable over [Resumable Upload](https://supabase.com/docs/guides/storage/uploads/resumable-uploads) for server-side uploads, when you want to maximize upload speed at the cost of resumability. The maximum file size on paid plans is 500 GB.

### Upload a file in parts [\#](https://supabase.com/docs/guides/storage/uploads/s3-uploads\#upload-a-file-in-parts)

Use the `Upload` class from an S3 client to upload a file in parts. For example, using JavaScript:

```
1
import { S3Client } from '@aws-sdk/client-s3'
2
import { Upload } from '@aws-sdk/lib-storage'
3

4
const s3Client = new S3Client({...})
5

6
const file = fs.createReadStream('path/to/very-large-file')
7

8
const upload = new Upload(s3Client, {
9
  Bucket: 'bucket-name',
10
  Key: 'path/to/file',
11
  ContentType: 'image/jpeg',
12
  Body: file,
13
})
14

15
await uploader.done()
```

### Aborting multipart uploads [\#](https://supabase.com/docs/guides/storage/uploads/s3-uploads\#aborting-multipart-uploads)

All multipart uploads are automatically aborted after 24 hours. To abort a multipart upload before that, you can use the [`AbortMultipartUpload`](https://docs.aws.amazon.com/AmazonS3/latest/API/API_AbortMultipartUpload.html) action.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/uploads/s3-uploads.mdx)

### Is this helpful?

NoYes

### On this page

[Single request uploads](https://supabase.com/docs/guides/storage/uploads/s3-uploads#single-request-uploads) [Multipart uploads](https://supabase.com/docs/guides/storage/uploads/s3-uploads#multipart-uploads) [Upload a file in parts](https://supabase.com/docs/guides/storage/uploads/s3-uploads#upload-a-file-in-parts) [Aborting multipart uploads](https://supabase.com/docs/guides/storage/uploads/s3-uploads#aborting-multipart-uploads)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)