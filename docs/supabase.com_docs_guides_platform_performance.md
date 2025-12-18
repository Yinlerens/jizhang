---
url: "https://supabase.com/docs/guides/platform/performance"
title: "Performance Tuning | Supabase Docs"
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

[Platform](https://supabase.com/docs/guides/platform)

Add-ons[Custom Domains](https://supabase.com/docs/guides/platform/custom-domains)
[Database Backups](https://supabase.com/docs/guides/platform/backups)
[IPv4 Address](https://supabase.com/docs/guides/platform/ipv4-address)
[Read Replicas](https://supabase.com/docs/guides/platform/read-replicas)

Upgrades & Migrations[Upgrading](https://supabase.com/docs/guides/platform/upgrading)

Migrating within Supabase

Migrating to Supabase

Project & Account Management[Access Control](https://supabase.com/docs/guides/platform/access-control)

Multi-factor Authentication

[Transfer Project](https://supabase.com/docs/guides/platform/project-transfer)
[Restore to a new project](https://supabase.com/docs/guides/platform/clone-project)

Single Sign-On

Platform Configuration[Regions](https://supabase.com/docs/guides/platform/regions)
[Compute and Disk](https://supabase.com/docs/guides/platform/compute-and-disk)
[Database Size](https://supabase.com/docs/guides/platform/database-size)
[HIPAA Projects](https://supabase.com/docs/guides/platform/hipaa-projects)
[Network Restrictions](https://supabase.com/docs/guides/platform/network-restrictions)
[Performance Tuning](https://supabase.com/docs/guides/platform/performance)
[SSL Enforcement](https://supabase.com/docs/guides/platform/ssl-enforcement)
[Default Platform Permissions](https://supabase.com/docs/guides/platform/permissions)
[PrivateLink](https://supabase.com/docs/guides/platform/privatelink)

Billing[About billing on Supabase](https://supabase.com/docs/guides/platform/billing-on-supabase)
[Get set up for billing](https://supabase.com/docs/guides/platform/get-set-up-for-billing)
[Manage your subscription](https://supabase.com/docs/guides/platform/manage-your-subscription)

Manage your usage

[Your monthly invoice](https://supabase.com/docs/guides/platform/your-monthly-invoice)
[Control your costs](https://supabase.com/docs/guides/platform/cost-control)
[Credits](https://supabase.com/docs/guides/platform/credits)

AWS Marketplace

[Billing FAQ](https://supabase.com/docs/guides/platform/billing-faq)

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

Platform

1. [Platform](https://supabase.com/docs/guides/platform)
3. Platform Configuration
5. [Performance Tuning](https://supabase.com/docs/guides/platform/performance)

# Performance Tuning

* * *

The Supabase platform automatically optimizes your Postgres database to take advantage of the compute resources of the plan your project is on. However, these optimizations are based on assumptions about the type of workflow the project is being utilized for, and it is likely that better results can be obtained by tuning the database for your particular workflow.

## Examining query performance [\#](https://supabase.com/docs/guides/platform/performance\#examining-query-performance)

Unoptimized queries are a major cause of poor database performance. To analyze the performance of your queries, see the [Debugging and monitoring guide](https://supabase.com/docs/guides/database/inspect).

## Optimizing the number of connections [\#](https://supabase.com/docs/guides/platform/performance\#optimizing-the-number-of-connections)

The default connection limits for Postgres and Supavisor is based on your compute size. See the default connection numbers in the [Compute Add-ons](https://supabase.com/docs/guides/platform/compute-add-ons) section.

If the number of connections is insufficient, you will receive the following error upon connecting to the DB:

```
1
$ psql -U postgres -h ...
2
FATAL: remaining connection slots are reserved for non-replication superuser connections
```

In such a scenario, you can consider:

- [upgrading to a larger compute add-on](https://supabase.com/dashboard/project/_/settings/compute-and-disk)
- configuring your clients to use fewer connections
- manually configuring the database for a higher number of connections

### Configuring clients to use fewer connections [\#](https://supabase.com/docs/guides/platform/performance\#configuring-clients-to-use-fewer-connections)

You can use the [pg\_stat\_activity](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW) view to debug which clients are holding open connections on your DB. `pg_stat_activity` only exposes information on direct connections to the database. Information on the number of connections to Supavisor is available [via the metrics endpoint](https://supabase.com/docs/guides/platform/metrics).

Depending on the clients involved, you might be able to configure them to work with fewer connections (e.g. by imposing a limit on the maximum number of connections they're allowed to use), or shift specific workloads to connect via [Supavisor](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler) instead. Transient workflows, which can quickly scale up and down in response to traffic (e.g. serverless functions), can especially benefit from using a connection pooler rather than connecting to the DB directly.

### Allowing higher number of connections [\#](https://supabase.com/docs/guides/platform/performance\#allowing-higher-number-of-connections)

You can configure Postgres connection limit among other parameters by using [Custom Postgres Config](https://supabase.com/docs/guides/platform/custom-postgres-config#custom-postgres-config).

### Enterprise [\#](https://supabase.com/docs/guides/platform/performance\#enterprise)

[Contact us](https://forms.supabase.com/enterprise) if you need help tuning your database for your specific workflow.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/performance.mdx)

### Is this helpful?

NoYes

### On this page

[Examining query performance](https://supabase.com/docs/guides/platform/performance#examining-query-performance) [Optimizing the number of connections](https://supabase.com/docs/guides/platform/performance#optimizing-the-number-of-connections) [Configuring clients to use fewer connections](https://supabase.com/docs/guides/platform/performance#configuring-clients-to-use-fewer-connections) [Allowing higher number of connections](https://supabase.com/docs/guides/platform/performance#allowing-higher-number-of-connections) [Enterprise](https://supabase.com/docs/guides/platform/performance#enterprise)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)