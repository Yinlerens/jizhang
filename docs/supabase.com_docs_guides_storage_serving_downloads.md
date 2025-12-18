---
url: "https://supabase.com/docs/guides/storage/serving/downloads"
title: "Serving assets from Storage | Supabase Docs"
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

[Serving assets](https://supabase.com/docs/guides/storage/serving/downloads)
[Image Transformations](https://supabase.com/docs/guides/storage/serving/image-transformations)
[Bandwidth & Storage Egress](https://supabase.com/docs/guides/storage/serving/bandwidth)

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
5. [Serving](https://supabase.com/docs/guides/storage/serving)
7. [Serving assets](https://supabase.com/docs/guides/storage/serving/downloads)

# Serving assets from Storage

## Serving assets from Storage

* * *

## Public buckets [\#](https://supabase.com/docs/guides/storage/serving/downloads\#public-buckets)

As mentioned in the [Buckets Fundamentals](https://supabase.com/docs/guides/storage/buckets/fundamentals) all files uploaded in a public bucket are publicly accessible and benefit a high CDN cache HIT ratio.

You can access them by using this conventional URL:

```
1
https://[project_id].supabase.co/storage/v1/object/public/[bucket]/[asset-name]
```

You can also use the Supabase SDK `getPublicUrl` to generate this URL for you

```
1
const { data } = supabase.storage.from('bucket').getPublicUrl('filePath.jpg')
2

3
console.log(data.publicUrl)
```

### Downloading [\#](https://supabase.com/docs/guides/storage/serving/downloads\#downloading)

If you want the browser to start an automatic download of the asset instead of trying serving it, you can add the `?download` query string parameter.

By default it will use the asset name to save the file on disk. You can optionally pass a custom name to the `download` parameter as following: `?download=customname.jpg`

## Private buckets [\#](https://supabase.com/docs/guides/storage/serving/downloads\#private-buckets)

Assets stored in a non-public bucket are considered private and are not accessible via a public URL like the public buckets.

You can access them only by:

- Signing a time limited URL on the Server, for example with Edge Functions.
- with a GET request the URL `https://[project_id].supabase.co/storage/v1/object/authenticated/[bucket]/[asset-name]` and the user Authorization header

### Signing URLs [\#](https://supabase.com/docs/guides/storage/serving/downloads\#signing-urls)

You can sign a time-limited URL that you can share to your users by invoking the `createSignedUrl` method on the SDK.

```
1
const { data, error } = await supabase.storage
2
  .from('bucket')
3
  .createSignedUrl('private-document.pdf', 3600)
4

5
if (data) {
6
  console.log(data.signedUrl)
7
}
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/serving/downloads.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FdLqSmxX3r7I%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Public buckets](https://supabase.com/docs/guides/storage/serving/downloads#public-buckets) [Downloading](https://supabase.com/docs/guides/storage/serving/downloads#downloading) [Private buckets](https://supabase.com/docs/guides/storage/serving/downloads#private-buckets) [Signing URLs](https://supabase.com/docs/guides/storage/serving/downloads#signing-urls)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)