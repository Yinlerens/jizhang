---
url: "https://supabase.com/docs/guides/storage/uploads/file-limits"
title: "Limits | Supabase Docs"
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

Storage

1. [Storage](https://supabase.com/docs/guides/storage)
3. More
5. [Uploads](https://supabase.com/docs/guides/storage/uploads)
7. [Limits](https://supabase.com/docs/guides/storage/uploads/file-limits)

# Limits

## Learn how to increase Supabase file limits.

* * *

## Global file size [\#](https://supabase.com/docs/guides/storage/uploads/file-limits\#global-file-size)

You can set the maximum file size across all your buckets by setting the _Global file size limit_ value in your [Storage Settings](https://supabase.com/dashboard/project/_/storage/settings). For Free projects, the limit can't exceed 50 MB. On the Pro Plan and up, you can set this value to up to 500 GB. If you need more than 500 GB, [contact us](https://supabase.com/dashboard/support/new).

| Plan | Max File Size Limit |
| --- | --- |
| Free | 50 MB |
| Pro | 500 GB |
| Team | 500 GB |
| Enterprise | Custom |

This option is a global limit, which applies to all your buckets.

Additionally, you can specify the maximum file size on a per [bucket level](https://supabase.com/docs/guides/storage/buckets/creating-buckets#restricting-uploads) but it can't be higher than this global limit. As a good practice, the global limit should be set to the highest possible file size that your application accepts, with smaller per-bucket limits set as needed.

## Per bucket restrictions [\#](https://supabase.com/docs/guides/storage/uploads/file-limits\#per-bucket-restrictions)

You can have different restrictions on a per bucket level such as restricting the file types (e.g. `pdf`, `images`, `videos`) or the maximum file size, which should be lower than the global limit. To apply these limits on a bucket level see [Creating Buckets](https://supabase.com/docs/guides/storage/buckets/creating-buckets#restricting-uploads).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/uploads/file-limits.mdx)

### Is this helpful?

NoYes

### On this page

[Global file size](https://supabase.com/docs/guides/storage/uploads/file-limits#global-file-size) [Per bucket restrictions](https://supabase.com/docs/guides/storage/uploads/file-limits#per-bucket-restrictions)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)