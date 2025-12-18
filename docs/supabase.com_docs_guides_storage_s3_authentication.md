---
url: "https://supabase.com/docs/guides/storage/s3/authentication"
title: "S3 Authentication | Supabase Docs"
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

[Authentication](https://supabase.com/docs/guides/storage/s3/authentication)
[API Compatibility](https://supabase.com/docs/guides/storage/s3/compatibility)

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
5. [S3](https://supabase.com/docs/guides/storage/s3)
7. [Authentication](https://supabase.com/docs/guides/storage/s3/authentication)

# S3 Authentication

## Learn about authenticating with Supabase Storage S3.

* * *

You have two options to authenticate with Supabase Storage S3:

- Using the generated S3 access keys from your [project settings](https://supabase.com/dashboard/project/_/storage/settings) (Intended exclusively for server-side use)
- Using a Session Token, which will allow you to authenticate with a user JWT token and provide limited access via Row Level Security (RLS).

## S3 access keys [\#](https://supabase.com/docs/guides/storage/s3/authentication\#s3-access-keys)

##### Keep these credentials secure

S3 access keys provide full access to all S3 operations across all buckets and bypass RLS policies. These are meant to be used only on the server.

To authenticate with S3, generate a pair of credentials (Access Key ID and Secret Access Key), copy the endpoint and region from the [project settings page](https://supabase.com/dashboard/project/_/storage/settings).

This is all the information you need to connect to Supabase Storage using any S3-compatible service.

![Storage S3 Access keys](https://supabase.com/docs/img/storage/s3-credentials.png)

For optimal performance when uploading large files you should always use the direct storage hostname. This provides several performance enhancements that will greatly improve performance when uploading large files.

Instead of `https://project-id.supabase.co` use `https://project-id.storage.supabase.co`

aws-sdk-jsAWS Credentials

```
1
import { S3Client } from '@aws-sdk/client-s3';
2

3
const client = new S3Client({
4
  forcePathStyle: true,
5
  region: 'project_region',
6
  endpoint: 'https://project_ref.storage.supabase.co/storage/v1/s3',
7
  credentials: {
8
    accessKeyId: 'your_access_key_id',
9
    secretAccessKey: 'your_secret_access_key',
10
  }
11
})
```

## Session token [\#](https://supabase.com/docs/guides/storage/s3/authentication\#session-token)

You can authenticate to Supabase S3 with a user JWT token to provide limited access via RLS to all S3 operations. This is useful when you want initialize the S3 client on the server scoped to a specific user, or use the S3 client directly from the client side.

All S3 operations performed with the Session Token are scoped to the authenticated user. RLS policies on the Storage Schema are respected.

To authenticate with S3 using a Session Token, use the following credentials:

- access\_key\_id: `project_ref`
- secret\_access\_key: `anonKey`
- session\_token: `valid jwt token`

For example, using the `aws-sdk` library:

```
1
import { S3Client } from '@aws-sdk/client-s3'
2

3
const {
4
  data: { session },
5
} = await supabase.auth.getSession()
6

7
const client = new S3Client({
8
  forcePathStyle: true,
9
  region: 'project_region',
10
  endpoint: 'https://project_ref.storage.supabase.co/storage/v1/s3',
11
  credentials: {
12
    accessKeyId: 'project_ref',
13
    secretAccessKey: 'anonKey',
14
    sessionToken: session.access_token,
15
  },
16
})
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/s3/authentication.mdx)

### Is this helpful?

NoYes

### On this page

[S3 access keys](https://supabase.com/docs/guides/storage/s3/authentication#s3-access-keys) [Session token](https://supabase.com/docs/guides/storage/s3/authentication#session-token)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)