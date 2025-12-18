---
url: "https://supabase.com/docs/guides/storage/buckets/fundamentals"
title: "Storage Buckets | Supabase Docs"
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
5. [Fundamentals](https://supabase.com/docs/guides/storage/buckets/fundamentals)

# Storage Buckets

* * *

Buckets allow you to keep your files organized and determines the [Access Model](https://supabase.com/docs/guides/storage/buckets/fundamentals#access-model) for your assets. [Upload restrictions](https://supabase.com/docs/guides/storage/buckets/creating-buckets#restricting-uploads) like max file size and allowed content types are also defined at the bucket level.

## Access model [\#](https://supabase.com/docs/guides/storage/buckets/fundamentals\#access-model)

There are 2 access models for buckets, **public** and **private** buckets.

### Private buckets [\#](https://supabase.com/docs/guides/storage/buckets/fundamentals\#private-buckets)

When a bucket is set to **Private** all operations are subject to access control via [RLS policies](https://supabase.com/docs/guides/storage/security/access-control). This also applies when downloading assets. Buckets are private by default.

The only ways to download assets within a private bucket is to:

- Use the [download method](https://supabase.com/docs/reference/javascript/storage-from-download) by providing a authorization header containing your user's JWT. The RLS policy you create on the `storage.objects` table will use this user to determine if they have access.
- Create a signed URL with the [`createSignedUrl` method](https://supabase.com/docs/reference/javascript/storage-from-createsignedurl) that can be accessed for a limited time.

#### Example use cases: [\#](https://supabase.com/docs/guides/storage/buckets/fundamentals\#example-use-cases)

- Uploading users' sensitive documents
- Securing private assets by using RLS to set up fine-grain access controls

### Public buckets [\#](https://supabase.com/docs/guides/storage/buckets/fundamentals\#public-buckets)

When a bucket is designated as 'Public,' it effectively bypasses access controls for both retrieving and serving files within the bucket. This means that anyone who possesses the asset URL can readily access the file.

Access control is still enforced for other types of operations including uploading, deleting, moving, and copying.

#### Example use cases: [\#](https://supabase.com/docs/guides/storage/buckets/fundamentals\#example-use-cases)

- User profile pictures
- User public media
- Blog post content

Public buckets are more performant than private buckets since they are [cached differently](https://supabase.com/docs/guides/storage/cdn/fundamentals#public-vs-private-buckets).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/buckets/fundamentals.mdx)

### Is this helpful?

NoYes

### On this page

[Access model](https://supabase.com/docs/guides/storage/buckets/fundamentals#access-model) [Private buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals#private-buckets) [Public buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals#public-buckets)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)