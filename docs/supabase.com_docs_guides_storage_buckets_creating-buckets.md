---
url: "https://supabase.com/docs/guides/storage/buckets/creating-buckets"
title: "Creating Buckets | Supabase Docs"
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
3. File Buckets
5. [Creating Buckets](https://supabase.com/docs/guides/storage/buckets/creating-buckets)

# Creating Buckets

* * *

You can create a bucket using the Supabase Dashboard. Since storage is interoperable with your Postgres database, you can also use SQL or our client libraries.
Here we create a bucket called "avatars":

JavaScriptDashboardSQLDartSwiftPython

```
1
// Use the JS library to create a bucket.
2

3
const { data, error } = await supabase.storage.createBucket('avatars', {
4
  public: true, // default: false
5
})
```

[Reference.](https://supabase.com/docs/reference/javascript/storage-createbucket)

## Restricting uploads [\#](https://supabase.com/docs/guides/storage/buckets/creating-buckets\#restricting-uploads)

When creating a bucket you can add additional configurations to restrict the type or size of files you want this bucket to contain.

For example, imagine you want to allow your users to upload only images to the `avatars` bucket and the size must not be greater than 1MB. You can achieve the following by providing `allowedMimeTypes` and `maxFileSize`:

```
1
// Use the JS library to create a bucket.
2

3
const { data, error } = await supabase.storage.createBucket('avatars', {
4
  public: true,
5
  allowedMimeTypes: ['image/*'],
6
  fileSizeLimit: '1MB',
7
})
```

If an upload request doesn't meet the above restrictions it will be rejected. See [File Limits](https://supabase.com/docs/guides/storage/uploads/file-limits) for more information.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/buckets/creating-buckets.mdx)

### Is this helpful?

NoYes

### On this page

[Restricting uploads](https://supabase.com/docs/guides/storage/buckets/creating-buckets#restricting-uploads)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)