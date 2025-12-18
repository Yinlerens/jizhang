---
url: "https://supabase.com/docs/guides/platform/backups"
title: "Database Backups | Supabase Docs"
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

Platform

1. [Platform](https://supabase.com/docs/guides/platform)
3. Add-ons
5. [Database Backups](https://supabase.com/docs/guides/platform/backups)

# Database Backups

* * *

Database backups are an integral part of any disaster recovery plan. Disasters come in many shapes and sizes. It could be as simple as accidentally deleting a table column, the database crashing, or even a natural calamity wiping out the underlying hardware a database is running on. The risks and impact brought by these scenarios can never be fully eliminated, but only minimized or even mitigated. Having database backups is a form of insurance policy. They are essentially snapshots of the database at various points in time. When disaster strikes, database backups allow the project to be brought back to any of these points in time, therefore averting the crisis.

The Supabase team regularly monitors the status of backups. In case of any issues, you can [contact support](https://supabase.com/dashboard/support/new). Also you can check out our [status page](https://status.supabase.com/) at any time.

Once a project is deleted all associated data will be permanently removed, including any backups stored in S3. This action is irreversible and should be carefully considered before proceeding.

## Types of backups [\#](https://supabase.com/docs/guides/platform/backups\#types-of-backups)

Database backups can be categorized into two types: **logical** and **physical**. You can learn more about them [here](https://supabase.com/blog/postgresql-physical-logical-backups).

##### Physical backups are not enabled by default

To enable physical backups, you have three options:

- Enable [Point-in-Time Recovery (PITR)](https://supabase.com/docs/guides/platform/backups#point-in-time-recovery)
- [Increase your database size](https://supabase.com/docs/guides/platform/database-size) to greater than 15GB
- [Create a read replica](https://supabase.com/docs/guides/platform/read-replicas)

Once a project satisfies at least one of the requirements for physical backups then logical backups are no longer made. However, your project may revert back to logical backups if you remove add-ons.

You can confirm your project's backup type by navigating to [**Database Backups > Scheduled backups**](https://supabase.com/dashboard/project/_/database/backups/scheduled) and if you can download a backup then it is logical, otherwise it is physical.

However, if your project has the Point-in-Time Recovery (PITR) add-on then the backups are physical and you can view them in [Database Backups > Point in time](https://supabase.com/dashboard/project/_/database/backups/pitr).

## Frequency of backups [\#](https://supabase.com/docs/guides/platform/backups\#frequency-of-backups)

When deciding how often a database should be backed up, the key business metric Recovery Point Objective (RPO) should be considered. RPO is the threshold for how much data, measured in time, a business could lose when disaster strikes. This amount is fully dependent on a business and its underlying requirements. A low RPO would mean that database backups would have to be taken at an increased cadence throughout the day. Each Supabase project has access to two forms of backups, Daily Backups and Point-in-Time Recovery (PITR). The agreed upon RPO would be a deciding factor in choosing which solution best fits a project.

If you enable PITR, Daily Backups will no longer be taken. PITR provides a finer granularity than Daily Backups, so it's unnecessary to run both.

Database backups do not include objects stored via the Storage API, as the database only includes metadata about these objects. Restoring an old backup does not restore objects that have been deleted since then.

## Daily backups [\#](https://supabase.com/docs/guides/platform/backups\#daily-backups)

All Pro, Team and Enterprise Plan Supabase projects are backed up automatically on a daily basis. In terms of Recovery Point Objective (RPO), Daily Backups would be suitable for projects willing to lose up to 24 hours worth of data if disaster hits at the most inopportune time. If a lower RPO is required, enabling Point-in-Time Recovery should be considered.

For security purposes, passwords for custom roles are not stored in daily backups, and will not be found in downloadable files. As such, if you are restoring from a daily backup and are using custom roles, you will need to set their passwords once more following a completed restoration.

### Backup process [\#](https://supabase.com/docs/guides/platform/backups\#daily-backups-process)

The Postgres utility [pg\_dumpall](https://www.postgresql.org/docs/current/app-pg-dumpall.html) is used to perform daily backups. An SQL file is generated, zipped up, and sent to our storage servers for safe keeping.

You can access daily backups in the [Scheduled backups](https://supabase.com/dashboard/project/_/database/backups/scheduled) settings in the Dashboard. Pro Plan projects can access the last 7 days' worth of daily backups. Team Plan projects can access the last 14 days' worth of daily backups, while Enterprise Plan projects can access up to 30 days' worth of daily backups. Users can restore their project to any one of the backups. If you wish to generate a logical backup on your own, you can do so through the [Supabase CLI](https://supabase.com/docs/reference/cli/supabase-db-dump).

You can also manage backups programmatically using the Management API:

```
1
# Get your access token from https://supabase.com/dashboard/account/tokens
2
export SUPABASE_ACCESS_TOKEN="your-access-token"
3
export PROJECT_REF="your-project-ref"
4

5
# List all available backups
6
curl -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
7
  "https://api.supabase.com/v1/projects/$PROJECT_REF/database/backups"
8

9
# Restore from a PITR (not logical) backup (replace ISO timestamp with desired restore point)
10
curl -X POST "https://api.supabase.com/v1/projects/$PROJECT_REF/database/backups/restore-pitr" \
11
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
12
  -H "Content-Type: application/json" \
13
  -d '{
14
    "recovery_time_target_unix": "1735689600"
15
  }'
```

#### Backup process for large databases [\#](https://supabase.com/docs/guides/platform/backups\#backup-process-for-large-databases)

Databases larger than 15GB[1](https://supabase.com/docs/guides/platform/backups#user-content-fn-1), if they're on a recent build[2](https://supabase.com/docs/guides/platform/backups#user-content-fn-2) of the Supabase platform, get automatically transitioned[3](https://supabase.com/docs/guides/platform/backups#user-content-fn-3) to use daily physical backups. Physical backups are a more performant backup mechanism that lowers the overhead and impact on the database being backed up, and also avoids holding locks on objects in your database for a long period of time. While restores are unaffected, the backups created using this method cannot be downloaded from the Backups section of the dashboard.

This class of physical backups only allows for recovery to a fixed time each day, similar to daily backups. You can upgrade to [PITR](https://supabase.com/docs/guides/platform/backups#point-in-time-recovery) for access to more granular recovery options.

Once a database is transitioned to using physical backups, it continues to use physical backups, even if the database size falls back below the threshold for the transition.

### Restoration process [\#](https://supabase.com/docs/guides/platform/backups\#daily-backups-restoration-process)

When selecting a backup to restore to, select the closest available one made before the desired point in time to restore to. Earlier backups can always be chosen too but do consider the number of days' worth of data that could be lost.

The Dashboard will then prompt for a confirmation before proceeding with the restoration. The project will be inaccessible following this. As such, do ensure to allot downtime beforehand. This is dependent on the size of the database. The larger it is, the longer the downtime will be. Once the confirmation has been given, the underlying SQL of the chosen backup is then run against the project. The Postgres utility [psql](https://www.postgresql.org/docs/current/app-psql.html) is used to facilitate the restoration. The Dashboard will display a notification once the restoration completes.

If your project is using subscriptions or replication slots, you will need to drop them prior to the restoration, and re-create them afterwards. The slot used by Realtime is exempted from this, and will be handled automatically.

## Point-in-Time recovery [\#](https://supabase.com/docs/guides/platform/backups\#point-in-time-recovery)

Point-in-Time Recovery (PITR) allows a project to be backed up at much shorter intervals. This provides users an option to restore to any chosen point of up to seconds in granularity. Even with daily backups, a day's worth of data could still be lost. With PITR, backups could be performed up to the point of disaster.

Pro, Team and Enterprise Plan projects can enable PITR as an add-on.

Projects interested in PITR will also need to use at least a Small compute add-on, in order to ensure smooth functioning.

If you enable PITR, Daily Backups will no longer be taken. PITR provides a finer granularity than Daily Backups, so it's unnecessary to run both.

When you disable PITR, all new backups will still be taken as physical backups only. Physical backups can still be used for restoration, but they are not available for direct download. If you need to download a backup after PITR is disabled, you’ll need to take a manual [logical backup using the Supabase CLI or pg\_dump](https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore#backup-database-using-the-cli).

If PITR has been disabled, logical backups remain available until they pass the backup retention period for your plan. After that window passes, only physical backups will be shown.

### Backup process [\#](https://supabase.com/docs/guides/platform/backups\#pitr-backup-process)

As discussed [here](https://supabase.com/blog/postgresql-physical-logical-backups), PITR is made possible by a combination of taking physical backups of a project, as well as archiving [Write Ahead Log (WAL)](https://www.postgresql.org/docs/current/wal-intro.html) files. Physical backups provide a snapshot of the underlying directory of the database, while WAL files contain records of every change made in the database.

Supabase uses [WAL-G](https://github.com/wal-g/wal-g), an open source archival and restoration tool, to handle both aspects of PITR. On a daily basis, a snapshot of the database is taken and sent to our storage servers. Throughout the day, as database transactions occur, WAL files are generated and uploaded.

By default, WAL files are backed up at two minute intervals. If these files cross a certain file size threshold, they are backed up immediately. As such, during periods of high amount of transactions, WAL file backups become more frequent. Conversely, when there is no activity in the database, WAL file backups are not made. Overall, this would mean that at the worst case scenario or disaster, the PITR achieves a Recovery Point Objective (RPO) of two minutes.

![PITR dashboard](https://supabase.com/docs/img/backups-pitr-dashboard.png)

You can access PITR in the [Point in Time](https://supabase.com/dashboard/project/_/database/backups/pitr) settings in the Dashboard. The recovery period of a project is indicated by the earliest and latest points of recoveries displayed in your preferred timezone. If need be, the maximum amount of this recovery period can be modified accordingly.

Note that the latest restore point of the project could be significantly far from the current time. This occurs when there has not been any recent activity in the database, and therefore no WAL file backups have been made recently. This is perfectly fine as the state of the database at the latest point of recovery would still be indicative of the state of the database at the current time given that no transactions have been made in between.

### Restoration process [\#](https://supabase.com/docs/guides/platform/backups\#pitr-restoration-process)

![PITR: Calendar view](https://supabase.com/docs/img/backups-pitr-calendar-view.png)

A date and time picker will be provided upon pressing the `Start a restore` button. The process will only proceed if the selected date and time fall within the earliest and latest points of recoveries.

![PITR: Confirmation modal](https://supabase.com/docs/img/backups-pitr-confirmation-modal.png)

After locking in the desired point in time to recover to, The Dashboard will then prompt for a review and confirmation before proceeding with the restoration. The project will be inaccessible following this. As such, do ensure to allot for downtime beforehand. This is dependent on the size of the database. The larger it is, the longer the downtime will be. Once the confirmation has been given, the latest physical backup available is downloaded to the project and the database is partially restored. WAL files generated after this physical backup up to the specified point-in-time are then downloaded. The underlying records of transactions in these files are replayed against the database to complete the restoration. The Dashboard will display a notification once the restoration completes.

### Pricing [\#](https://supabase.com/docs/guides/platform/backups\#pricing)

Pricing depends on the recovery retention period, which determines how many days back you can restore data to any chosen point of up to seconds in granularity.

| Recovery Retention Period in Days | Hourly Price USD | Monthly Price USD |
| --- | --- | --- |
| 7 | $0.137 | $100 |
| 14 | $0.274 | $200 |
| 28 | $0.55 | $400 |

For a detailed breakdown of how charges are calculated, refer to [Manage Point-in-Time Recovery usage](https://supabase.com/docs/guides/platform/manage-your-usage/point-in-time-recovery).

## Restore to a new project [\#](https://supabase.com/docs/guides/platform/backups\#restore-to-a-new-project)

See the [Duplicate Project docs](https://supabase.com/docs/guides/platform/clone-project).

## Troubleshooting [\#](https://supabase.com/docs/guides/platform/backups\#troubleshooting)

### Logical backups [\#](https://supabase.com/docs/guides/platform/backups\#logical-backups)

#### `search_path` issues [\#](https://supabase.com/docs/guides/platform/backups\#searchpath-issues)

During the `pg_restore` process, the `search_path` is set to an empty string for predictability, and security. Using unqualified references to functions or relations can cause restorations using logical backups to fail, as the database will not be able to locate the function or relation being referenced. This can happen even if the database functions without issues during normal operations, as the `search_path` is usually set to include several schemas during normal operations. Therefore, you should always use schema-qualified names within your SQL code.

You can refer to [an example PR](https://github.com/supabase/supabase/pull/28393/files) on how to update SQL code to use schema-qualified names.

#### Invalid check constraints [\#](https://supabase.com/docs/guides/platform/backups\#invalid-check-constraints)

Postgres requires that [check constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS) be:

1. immutable
2. not reference table data other than the new or updated row being checked

Violating these requirements can result in numerous failure scenarios, including during logical restorations.

Common examples of check constraints that can result in such failures are:

- validating against the current time, e.g. that the row being inserted references a future event
- validating the contents of a row against the contents of another table

#### Views that reference themselves [\#](https://supabase.com/docs/guides/platform/backups\#views-that-reference-themselves)

Views that directly or indirectly reference themselves will cause logical restores to fail due to cyclic dependency errors. These views are also invalid and unusable in Postgres, and any query against them will result in a runtime error.

**Example:**

```
1
-- Direct self-reference
2
CREATE VIEW my_view AS
3
  SELECT * FROM my_view;
4

5
-- Indirect circular reference
6
CREATE VIEW v1 AS SELECT * FROM v2;
7
CREATE VIEW v2 AS SELECT * FROM v1;
```

\-\- Drop the offending view from your database, or delete them from the logical backup to make it restorable.

Postgres documentation [views](https://www.postgresql.org/docs/current/sql-createview.html)

## Footnotes [\#](https://supabase.com/docs/guides/platform/backups\#footnote-label)

1. The threshold for transitioning will be slowly lowered over time. Eventually, all projects will be transitioned to using physical backups. [↩](https://supabase.com/docs/guides/platform/backups#user-content-fnref-1)

2. Projects created or upgraded after the 14th of July 2022 are eligible. [↩](https://supabase.com/docs/guides/platform/backups#user-content-fnref-2)

3. The transition to physical backups is handled transparently and does not require any user intervention. It involves a single restart of the database to pick up new configuration that can only be loaded at start; the expected downtime for the restart is a few seconds. [↩](https://supabase.com/docs/guides/platform/backups#user-content-fnref-3)


[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/backups.mdx)

### Is this helpful?

NoYes

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)