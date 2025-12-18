---
url: "https://supabase.com/docs/guides/troubleshooting/all-about-supabase-egress-a_Sg_e"
title: "Supabase Docs | Troubleshooting | All about Supabase Egress"
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

1. [Troubleshooting](https://supabase.com/docs/guides/troubleshooting)

# All about Supabase Egress

Last edited: 11/18/2025

* * *

**What is Egress?**

Egress (also known as bandwidth) is any amount of network packets/bytes being streamed back to a connected client. Means, the data that is leaving the Supabase platform. Egress in Supabase includes any calls through PostgREST, to Storage, Realtime, Auth, Edge Functions, Database and Supavisor.

You can read about Unified egress, included quota, and how to check the egress usage here: [https://supabase.com/docs/guides/platform/manage-your-usage/egress](https://supabase.com/docs/guides/platform/manage-your-usage/egress). Additionally, the [project reports](https://supabase.com/dashboard/project/_/observability) have a few egress related stats. You can create a custom report to look into daily egress.

- Example: Log Explorer -> Custom Reports -> Add/Remove charts -> Database API -> API Egress.

**What is contributing to Egress?**

While pointing out the exact cause for egress may not be straightforward, there are various steps you can take to determine the source of these issues:

- Picking the "Top Paths" from the [log explorer](https://app.supabase.com/project/_/logs/explorer/templates) will help you identify heavily queried paths
- By finding the most requested queries from Query performance report: [https://app.supabase.com/project/\_/advisors/query-performance](https://app.supabase.com/project/_/advisors/query-performance)
- Supavisor Egress is independent of client. There is no direct relation between a single query and Supavisor egress, it is harder to debug and identify. But you can make use of frequent queries from the link in above step that also displays average number of rows which will help to identify queries with a large number of rows returned. While this does not display Supavisor queries specifically, it will give an overview of queries with lots of rows that can help.
- For Storage Egress, all outgoing traffic for storage-related requests to download/view your Storage items are considered as Storage egress. We have a "Storage Egress Requests" template in logs explorer that you can use to get the number of requests for each Storage object
- If you pull 1mb of data out of the database using the Supavisor connection in your edge function, but only sends 100kb back to the user, you will have the Egress from the Supavisor to your Edge function plus from the edge function to your user

**How can you decrease egress?**

- Reduce the number of fields selected or entries when querying
- Reduce the number of queries/calls by optimising client code or use caches to reduce the number of requests/queries being done: [https://github.com/psteinroe/supabase-cache-helpers/](https://github.com/psteinroe/supabase-cache-helpers/)
- In case of update/insert queries, if you don’t need the entire row to be returned, configure your ORM/queries to not return the entire row
- In case of running manual backups through Supavisor, remove unneeded tables and/or reduce the frequency
- For Storage, if you start using the [Smart CDN](https://supabase.com/docs/guides/storage/cdn/smart-cdn) Storage Egress usage can be reduced. You can also use the [Supabase Image Transformations](https://supabase.com/docs/guides/storage/image-transformations) to optimize the images and reduce the egress.

**Cached vs uncached egress**

We differentiate between cached and uncached egress. Cached egress, which only applies to Supabase Storage, refers to egress that is served via our CDN and hits the cache. Uncached egress, on the other hand, refers to egress that is not served from the cache and requires a fresh request to the origin server.

Your plan includes a quota for both cached and uncached egress and these are independent. Cached egress is also cheaper in case you exceed your quota.

## Metadata

* * *

### Products

[Platform](https://supabase.com/docs/guides/troubleshooting?products=platform) [Database](https://supabase.com/docs/guides/troubleshooting?products=database) [Functions](https://supabase.com/docs/guides/troubleshooting?products=functions) [Storage](https://supabase.com/docs/guides/troubleshooting?products=storage) [Realtime](https://supabase.com/docs/guides/troubleshooting?products=realtime) [Auth](https://supabase.com/docs/guides/troubleshooting?products=auth) [Supavisor](https://supabase.com/docs/guides/troubleshooting?products=supavisor)

* * *

### Keywords

[egress](https://supabase.com/docs/guides/troubleshooting?tags=egress) [bandwidth](https://supabase.com/docs/guides/troubleshooting?tags=bandwidth)

* * *

### Is this helpful?

NoYes

* * *

[View discussion on GitHub](https://github.com/orgs/supabase/discussions/26605)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)