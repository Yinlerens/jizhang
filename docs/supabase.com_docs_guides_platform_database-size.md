---
url: "https://supabase.com/docs/guides/platform/database-size"
title: "Understanding Database and Disk Size | Supabase Docs"
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
5. [Database Size](https://supabase.com/docs/guides/platform/database-size)

# Understanding Database and Disk Size

* * *

Disk metrics refer to the storage usage reported by Postgres. These metrics are updated daily. As you read through this document, we will refer to "database size" and "disk size":

- _Database size_: Displays the actual size of the data within your Postgres database. This can be found on the [Database Reports page](https://supabase.com/dashboard/project/_/observability/database).

- _Disk size_: Shows the overall disk space usage, which includes both the database size and additional files required for Postgres to function like the Write Ahead Log (WAL) and other system log files. You can view this on the [Database Settings page](https://supabase.com/dashboard/project/_/database/settings).


## Database size [\#](https://supabase.com/docs/guides/platform/database-size\#database-size)

This SQL query will show the size of all databases in your Postgres cluster:

```
1
select
2
  pg_size_pretty(sum(pg_database_size(pg_database.datname)))
3
from pg_database;
```

This value is reported in the [database report page](https://supabase.com/dashboard/project/_/observability/database).

Database size is consumed primarily by your data, indexes, and materialized views. You can reduce your database size by removing any of these and running a Vacuum operation.

Depending on your billing plan, your database can go into read-only mode which can prevent you inserting and deleting data. There are instructions for managing read-only mode in the [Disk Management](https://supabase.com/docs/guides/platform/database-size#disk-management) section.

### Disk space usage [\#](https://supabase.com/docs/guides/platform/database-size\#disk-space-usage)

Your database size is part of the disk usage for your Supabase project, there are many components to Postgres that consume additional disk space. One of the primary components, is the [Write Ahead Log (WAL)](https://www.postgresql.org/docs/current/wal-intro.html). Postgres will store database changes in log files that are cleared away after they are applied to the database. These same files are also used by [Read Replicas](https://supabase.com/docs/guides/platform/read-replicas) or other replication methods.

If you would like to determine the size of the WAL files stored on disk, Postgres provides `pg_ls_waldir` as a helper function; the following query can be run:

```
1
select pg_size_pretty(sum(size)) as wal_size from pg_ls_waldir();
```

### Vacuum operations [\#](https://supabase.com/docs/guides/platform/database-size\#vacuum-operations)

Postgres does not immediately reclaim the physical space used by dead tuples (i.e., deleted rows) in the DB. They are marked as "removed" until a [vacuum operation](https://www.postgresql.org/docs/current/routine-vacuuming.html) is executed. As a result, deleting data from your database may not immediately reduce the reported disk usage. You can use the [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)`inspect db bloat` command to view all dead tuples in your database. Alternatively, you can run the [query](https://github.com/supabase/cli/blob/c9cce58025fded16b4c332747f819a44f45c3b83/internal/inspect/bloat/bloat.go#L17) found in the CLI's GitHub repo in the [SQL Editor](https://supabase.com/dashboard/project/_/sql/)

```
1
# Login to the CLI
2
npx supabase login
3

4
# Initialize a local supabase directory
5
npx supabase init
6

7
# Link a project
8
npx supabase link
9

10
# Detect bloat
11
npx supabase inspect db bloat --linked
```

If you find a table you would like to immediately clean, you can run the following in the [SQL Editor](https://supabase.com/dashboard/project/_/sql/new):

```
1
vacuum full <table name>;
```

Vacuum operations can temporarily increase resource utilization, which may adversely impact the observed performance of your project until the maintenance is completed. The [vacuum full](https://www.postgresql.org/docs/current/sql-vacuum.html) command will lock the table until the operation concludes.

Supabase projects have automatic vacuuming enabled, which ensures that these operations are performed regularly to keep the database healthy and performant.
It is possible to [fine-tune](https://www.percona.com/blog/2018/08/10/tuning-autovacuum-in-postgresql-and-autovacuum-internals/) the [autovacuum parameters](https://www.enterprisedb.com/blog/postgresql-vacuum-and-analyze-best-practice-tips), or [manually initiate](https://www.postgresql.org/docs/current/sql-vacuum.html) vacuum operations.
Running a manual vacuum after deleting large amounts of data from your DB could help reduce the database size reported by Postgres.

### Preoccupied space [\#](https://supabase.com/docs/guides/platform/database-size\#preoccupied-space)

New Supabase projects have a database size of ~40-60mb. This space includes pre-installed extensions, schemas, and default Postgres data. Additional database size is used when installing extensions, even if those extensions are inactive.

## Disk size [\#](https://supabase.com/docs/guides/platform/database-size\#disk-size)

Supabase uses network-attached storage to balance performance with scalability. The disk scaling behavior depends on your billing plan.

### Paid plan behavior [\#](https://supabase.com/docs/guides/platform/database-size\#paid-plan-behavior)

Projects on the Pro Plan and higher have auto-scaling disks.

Disk size expands automatically when the database reaches 90% of the allocated disk size. The disk is expanded to be 50% larger (for example, 8 GB -> 12 GB). Auto-scaling can only take place once every 6 hours. If within those 6 hours you reach 95% of the disk space, your project will enter read-only mode.

The automatic resize operation will add an additional 50% capped to a maximum of 200 GB. If 50% of your current usage is more than 200 GB then only 200 GB will be added to your disk (for example a size of 1500 GB will resize to 1700 GB).

Disk size can also be manually expanded on the [Database Settings page](https://supabase.com/dashboard/project/_/database/settings). The maximum disk size for the Pro/Team Plan is 60 TB. If you need more than this, [contact us](https://forms.supabase.com/enterprise) to learn more about the Enterprise Plan.

You may want to import a lot of data into your database which requires multiple disk expansions. for example, uploading more than 1.5x the current size of your database storage will put your database into [read-only mode](https://supabase.com/docs/guides/platform/database-size#read-only-mode). If so, it is highly recommended you increase the disk size manually on the [Database Settings page](https://supabase.com/dashboard/project/_/database/settings).

Due to restrictions on the underlying cloud provider, disk expansions can occur only once every six hours. During the six hour cool down window, the disk cannot be resized again.

### Free Plan behavior [\#](https://supabase.com/docs/guides/platform/database-size\#free-plan-behavior)

Free Plan projects enter [read-only](https://supabase.com/docs/guides/platform/database-size#read-only-mode) mode when you exceed the 500 MB limit. Once in read-only mode, you have these options:

- [Upgrade to the Pro Plan](https://supabase.com/dashboard/org/_/billing) to increase the limit to 8 GB. [Disable the Spend Cap](https://app.supabase.com/org/_/billing?panel=costControl) if you want your Pro instance to auto-scale beyond the 8 GB disk size limit.
- [Disable read-only mode](https://supabase.com/docs/guides/platform/database-size#disabling-read-only-mode) and reduce your database size.

### Read-only mode [\#](https://supabase.com/docs/guides/platform/database-size\#read-only-mode)

In some cases Supabase may put your database into read-only mode to prevent your database from exceeding the billing or disk limitations.

In read-only mode, clients will encounter errors such as `cannot execute INSERT in a read-only transaction`. Regular operation (read-write mode) is automatically re-enabled once usage is below 95% of the disk size,

### Disabling read-only mode [\#](https://supabase.com/docs/guides/platform/database-size\#disabling-read-only-mode)

You manually override read-only mode to reduce disk size. To do this, run the following in the [SQL Editor](https://supabase.com/dashboard/project/_/sql):

First, change the [transaction access mode](https://www.postgresql.org/docs/current/sql-set-transaction.html):

```
1
set session characteristics as transaction read write;
```

This allows you to delete data from within the session. After deleting data, consider running a vacuum to reclaim as much space as possible:

```
1
vacuum;
```

Once you have reclaimed space, you can run the following to disable [read-only](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-DEFAULT-TRANSACTION-READ-ONLY) mode:

```
1
set default_transaction_read_only = 'off';
```

### Disk size distribution [\#](https://supabase.com/docs/guides/platform/database-size\#disk-size-distribution)

You can check the distribution of your disk size on your [project's compute and disk page](https://supabase.com/dashboard/project/_/settings/compute-and-disk).

![Disk Size Distribution](https://supabase.com/docs/img/guides/platform/database-size/disk-size-distribution.png)

Your disk size usage falls in three categories:

- **Database** \- Disk usage by the database. This includes the actual data, indexes, materialized views, ...
- **WAL** \- Disk usage by the write-ahead log. The usage depends on your WAL settings and the amount of data being written to the database.
- **System** \- Disk usage reserved by the system to ensure the database can operate smoothly. Users cannot modify this and it should only take very little space.

### Reducing disk size [\#](https://supabase.com/docs/guides/platform/database-size\#reducing-disk-size)

Disks don't automatically downsize during normal operation. Once you have [reduced your database size](https://supabase.com/docs/guides/platform/database-size#database-size), they _will_ automatically "right-size" during a [project upgrade](https://supabase.com/docs/guides/platform/upgrading). The final disk size after the upgrade is 1.2x the size of the database with a minimum of 8 GB. For example, if your database size is 100GB, and you have a 200GB disk, the size after a project upgrade will be 120 GB.

In case you have a large WAL directory, you may [modify WAL settings](https://supabase.com/docs/guides/database/custom-postgres-config) such as `max_wal_size`. Use at your own risk as changing these settings can have side effects. To query your current WAL size, use `SELECT SUM(size) FROM pg_ls_waldir()`.

In the event that your project is already on the latest version of Postgres and cannot be upgraded, a new version of Postgres will be released approximately every week which you can then upgrade to once it becomes available.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/database-size.mdx)

### Is this helpful?

NoYes

### On this page

[Database size](https://supabase.com/docs/guides/platform/database-size#database-size) [Disk space usage](https://supabase.com/docs/guides/platform/database-size#disk-space-usage) [Vacuum operations](https://supabase.com/docs/guides/platform/database-size#vacuum-operations) [Preoccupied space](https://supabase.com/docs/guides/platform/database-size#preoccupied-space) [Disk size](https://supabase.com/docs/guides/platform/database-size#disk-size) [Paid plan behavior](https://supabase.com/docs/guides/platform/database-size#paid-plan-behavior) [Free Plan behavior](https://supabase.com/docs/guides/platform/database-size#free-plan-behavior) [Read-only mode](https://supabase.com/docs/guides/platform/database-size#read-only-mode) [Disabling read-only mode](https://supabase.com/docs/guides/platform/database-size#disabling-read-only-mode) [Disk size distribution](https://supabase.com/docs/guides/platform/database-size#disk-size-distribution) [Reducing disk size](https://supabase.com/docs/guides/platform/database-size#reducing-disk-size)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)