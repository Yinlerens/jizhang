---
url: "https://supabase.com/docs/guides/storage/schema/custom-roles"
title: "Custom Roles | Supabase Docs"
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

[Database Design](https://supabase.com/docs/guides/storage/schema/design)
[Helper Functions](https://supabase.com/docs/guides/storage/schema/helper-functions)
[Custom Roles](https://supabase.com/docs/guides/storage/schema/custom-roles)

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
5. [Schema](https://supabase.com/docs/guides/storage/schema)
7. [Custom Roles](https://supabase.com/docs/guides/storage/schema/custom-roles)

# Custom Roles

## Learn about using custom roles with storage schema

* * *

In this guide, you will learn how to create and use custom roles with Storage to manage role-based access to objects and buckets. The same approach can be used to use custom roles with any other Supabase service.

Supabase Storage uses the same role-based access control system as any other Supabase service using RLS (Row Level Security).

## Create a custom role [\#](https://supabase.com/docs/guides/storage/schema/custom-roles\#create-a-custom-role)

Let's create a custom role `manager` to provide full read access to a specific bucket. For a more advanced setup, see the [RBAC Guide](https://supabase.com/docs/guides/auth/custom-claims-and-role-based-access-control-rbac#create-auth-hook-to-apply-user-role).

```
1
create role 'manager';
2

3
-- Important to grant the role to the authenticator and anon role
4
grant manager to authenticator;
5
grant anon to manager;
```

## Create a policy [\#](https://supabase.com/docs/guides/storage/schema/custom-roles\#create-a-policy)

Let's create a policy that gives full read permissions to all objects in the bucket `teams` for the `manager` role.

```
1
create policy "Manager can view all files in the bucket 'teams'"
2
on storage.objects
3
for select
4
to manager
5
using (
6
 bucket_id = 'teams'
7
);
```

## Test the policy [\#](https://supabase.com/docs/guides/storage/schema/custom-roles\#test-the-policy)

To impersonate the `manager` role, you will need a valid JWT token with the `manager` role.
You can quickly create one using the `jsonwebtoken` library in Node.js.

Signing a new JWT requires your `JWT_SECRET`. You must store this secret securely. Never expose it in frontend code, and do not check it into version control.

```
1
const jwt = require('jsonwebtoken')
2

3
const JWT_SECRET = 'your-jwt-secret' // You can find this in your Supabase project settings under API. Store this securely.
4
const USER_ID = '' // the user id that we want to give the manager role
5

6
const token = jwt.sign({ role: 'manager', sub: USER_ID }, JWT_SECRET, {
7
  expiresIn: '1h',
8
})
```

Now you can use this token to access the Storage API.

```
1
const { StorageClient } = require('@supabase/storage-js')
2

3
const PROJECT_URL = 'https://your-project-id.supabase.co/storage/v1'
4

5
const storage = new StorageClient(PROJECT_URL, {
6
  authorization: `Bearer ${token}`,
7
})
8

9
await storage.from('teams').list()
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/storage/schema/custom-roles.mdx)

### Is this helpful?

NoYes

### On this page

[Create a custom role](https://supabase.com/docs/guides/storage/schema/custom-roles#create-a-custom-role) [Create a policy](https://supabase.com/docs/guides/storage/schema/custom-roles#create-a-policy) [Test the policy](https://supabase.com/docs/guides/storage/schema/custom-roles#test-the-policy)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)