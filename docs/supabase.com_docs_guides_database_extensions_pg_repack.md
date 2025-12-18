---
url: "https://supabase.com/docs/guides/database/extensions/pg_repack"
title: "pg_repack: Physical storage optimization and maintenance | Supabase Docs"
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

[Database](https://supabase.com/docs/guides/database/overview)

[Overview](https://supabase.com/docs/guides/database/overview)

Fundamentals[Connecting to your database](https://supabase.com/docs/guides/database/connecting-to-postgres)
[Importing data](https://supabase.com/docs/guides/database/import-data)
[Securing your data](https://supabase.com/docs/guides/database/secure-data)

Working with your database (basics)[Managing tables, views, and data](https://supabase.com/docs/guides/database/tables)
[Working with arrays](https://supabase.com/docs/guides/database/arrays)
[Managing indexes](https://supabase.com/docs/guides/database/postgres/indexes)
[Querying joins and nested tables](https://supabase.com/docs/guides/database/joins-and-nesting)
[JSON and unstructured data](https://supabase.com/docs/guides/database/json)

Working with your database (intermediate)[Implementing cascade deletes](https://supabase.com/docs/guides/database/postgres/cascade-deletes)
[Managing enums](https://supabase.com/docs/guides/database/postgres/enums)
[Managing database functions](https://supabase.com/docs/guides/database/functions)
[Managing database triggers](https://supabase.com/docs/guides/database/postgres/triggers)
[Managing database webhooks](https://supabase.com/docs/guides/database/webhooks)
[Using Full Text Search](https://supabase.com/docs/guides/database/full-text-search)
[Partitioning your tables](https://supabase.com/docs/guides/database/partitions)
[Managing connections](https://supabase.com/docs/guides/database/connection-management)
[Managing event triggers](https://supabase.com/docs/guides/database/postgres/event-triggers)

OrioleDB[Overview](https://supabase.com/docs/guides/database/orioledb)

Access and security[Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
[Column Level Security](https://supabase.com/docs/guides/database/postgres/column-level-security)
[Hardening the Data API](https://supabase.com/docs/guides/database/hardening-data-api)
[Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
[Managing Postgres Roles](https://supabase.com/docs/guides/database/postgres/roles)
[Using Custom Postgres Roles](https://supabase.com/docs/guides/storage/schema/custom-roles)
[Managing secrets with Vault](https://supabase.com/docs/guides/database/vault)
[Superuser Access and Unsupported Operations](https://supabase.com/docs/guides/database/postgres/roles-superuser)

Configuration, optimization, and testing[Database configuration](https://supabase.com/docs/guides/database/postgres/configuration)
[Query optimization](https://supabase.com/docs/guides/database/query-optimization)
[Database Advisors](https://supabase.com/docs/guides/database/database-advisors)
[Testing your database](https://supabase.com/docs/guides/database/testing)
[Customizing Postgres config](https://supabase.com/docs/guides/database/custom-postgres-config)

Debugging[Timeouts](https://supabase.com/docs/guides/database/postgres/timeouts)
[Debugging and monitoring](https://supabase.com/docs/guides/database/inspect)
[Debugging performance issues](https://supabase.com/docs/guides/database/debugging-performance)
[Supavisor](https://supabase.com/docs/guides/database/supavisor)
[Troubleshooting](https://supabase.com/docs/guides/database/troubleshooting)

ORM Quickstarts

Prisma

[Drizzle](https://supabase.com/docs/guides/database/drizzle)
[Postgres.js](https://supabase.com/docs/guides/database/postgres-js)

GUI quickstarts[pgAdmin](https://supabase.com/docs/guides/database/pgadmin)
[PSQL](https://supabase.com/docs/guides/database/psql)
[DBeaver](https://supabase.com/docs/guides/database/dbeaver)
[Metabase](https://supabase.com/docs/guides/database/metabase)
[Beekeeper Studio](https://supabase.com/docs/guides/database/beekeeper-studio)

Database replication[Overview](https://supabase.com/docs/guides/database/replication)

Replication

Manual replication

Extensions[Overview](https://supabase.com/docs/guides/database/extensions)
[HypoPG: Hypothetical indexes](https://supabase.com/docs/guides/database/extensions/hypopg)
[plv8 (deprecated)](https://supabase.com/docs/guides/database/extensions/plv8)
[http: RESTful Client](https://supabase.com/docs/guides/database/extensions/http)
[index\_advisor: Query optimization](https://supabase.com/docs/guides/database/extensions/index_advisor)
[PGAudit: Postgres Auditing](https://supabase.com/docs/guides/database/extensions/pgaudit)
[pgjwt (deprecated)](https://supabase.com/docs/guides/database/extensions/pgjwt)
[PGroonga: Multilingual Full Text Search](https://supabase.com/docs/guides/database/extensions/pgroonga)
[pgRouting: Geospatial Routing](https://supabase.com/docs/guides/database/extensions/pgrouting)
[pg\_cron: Schedule Recurring Jobs](https://supabase.com/docs/guides/database/extensions/pg_cron)
[pg\_graphql: GraphQL Support](https://supabase.com/docs/guides/database/extensions/pg_graphql)
[pg\_hashids: Short UIDs](https://supabase.com/docs/guides/database/extensions/pg_hashids)
[pg\_jsonschema: JSON Schema Validation](https://supabase.com/docs/guides/database/extensions/pg_jsonschema)
[pg\_net: Async Networking](https://supabase.com/docs/guides/database/extensions/pg_net)
[pg\_plan\_filter: Restrict Total Cost](https://supabase.com/docs/guides/database/extensions/pg_plan_filter)
[postgres\_fdw: query data from an external Postgres server](https://supabase.com/docs/guides/database/extensions/postgres_fdw)
[pgvector: Embeddings and vector similarity](https://supabase.com/docs/guides/database/extensions/pgvector)
[pg\_stat\_statements: SQL Planning and Execution Statistics](https://supabase.com/docs/guides/database/extensions/pg_stat_statements)
[pg\_repack: Storage Optimization](https://supabase.com/docs/guides/database/extensions/pg_repack)
[PostGIS: Geo queries](https://supabase.com/docs/guides/database/extensions/postgis)
[pgmq: Queues](https://supabase.com/docs/guides/database/extensions/pgmq)
[pgsodium (pending deprecation): Encryption Features](https://supabase.com/docs/guides/database/extensions/pgsodium)
[pgTAP: Unit Testing](https://supabase.com/docs/guides/database/extensions/pgtap)
[plpgsql\_check: PL/pgSQL Linter](https://supabase.com/docs/guides/database/extensions/plpgsql_check)
[timescaledb (deprecated)](https://supabase.com/docs/guides/database/extensions/timescaledb)
[uuid-ossp: Unique Identifiers](https://supabase.com/docs/guides/database/extensions/uuid-ossp)
[RUM: inverted index for full-text search](https://supabase.com/docs/guides/database/extensions/rum)

Foreign Data Wrappers[Overview](https://supabase.com/docs/guides/database/extensions/wrappers/overview)
[Connecting to Auth0](https://supabase.com/docs/guides/database/extensions/wrappers/auth0)
[Connecting to Airtable](https://supabase.com/docs/guides/database/extensions/wrappers/airtable)
[Connecting to AWS Cognito](https://supabase.com/docs/guides/database/extensions/wrappers/cognito)
[Connecting to AWS S3](https://supabase.com/docs/guides/database/extensions/wrappers/s3)
[Connecting to AWS S3 Vectors](https://supabase.com/docs/guides/database/extensions/wrappers/s3_vectors)
[Connecting to BigQuery](https://supabase.com/docs/guides/database/extensions/wrappers/bigquery)
[Connecting to Clerk](https://supabase.com/docs/guides/database/extensions/wrappers/clerk)
[Connecting to ClickHouse](https://supabase.com/docs/guides/database/extensions/wrappers/clickhouse)
[Connecting to DuckDB](https://supabase.com/docs/guides/database/extensions/wrappers/duckdb)
[Connecting to Firebase](https://supabase.com/docs/guides/database/extensions/wrappers/firebase)
[Connecting to Iceberg](https://supabase.com/docs/guides/database/extensions/wrappers/iceberg)
[Connecting to Logflare](https://supabase.com/docs/guides/database/extensions/wrappers/logflare)
[Connecting to MSSQL](https://supabase.com/docs/guides/database/extensions/wrappers/mssql)
[Connecting to Notion](https://supabase.com/docs/guides/database/extensions/wrappers/notion)
[Connecting to Paddle](https://supabase.com/docs/guides/database/extensions/wrappers/paddle)
[Connecting to Redis](https://supabase.com/docs/guides/database/extensions/wrappers/redis)
[Connecting to Snowflake](https://supabase.com/docs/guides/database/extensions/wrappers/snowflake)
[Connecting to Stripe](https://supabase.com/docs/guides/database/extensions/wrappers/stripe)

Examples[Drop All Tables in Schema](https://supabase.com/docs/guides/database/postgres/dropping-all-tables-in-schema)
[Select First Row per Group](https://supabase.com/docs/guides/database/postgres/first-row-in-group)
[Print PostgreSQL Version](https://supabase.com/docs/guides/database/postgres/which-version-of-postgres)
[Replicating from Supabase to External Postgres](https://supabase.com/docs/guides/database/postgres/setup-replication-external)

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

Database

1. [Database](https://supabase.com/docs/guides/database/overview)
3. Extensions
5. [pg\_repack: Storage Optimization](https://supabase.com/docs/guides/database/extensions/pg_repack)

# pg\_repack: Physical storage optimization and maintenance

* * *

[pg\_repack](https://github.com/reorg/pg_repack) is a Postgres extension to remove bloat from tables and indexes, and optionally restore the physical order of clustered indexes. Unlike CLUSTER and VACUUM FULL, pg\_repack runs "online" and does not hold a exclusive locks on the processed tables that could prevent ongoing database operations. pg\_repack's efficiency is comparable to using CLUSTER directly.

pg\_repack provides the following methods to optimize physical storage:

- Online CLUSTER: ordering table data by cluster index in a non-blocking way
- Ordering table data by specified columns
- Online VACUUM FULL: packing rows only in a non-blocking way
- Rebuild or relocate only the indexes of a table

pg\_repack has 2 components, the database extension and a client-side CLI to control it.

## Requirements [\#](https://supabase.com/docs/guides/database/extensions/pg_repack\#requirements)

- A target table must have a PRIMARY KEY, or a UNIQUE total index on a NOT NULL column.
- Performing a full-table repack requires free disk space about twice as large as the target table and its indexes.

pg\_repack requires the Postgres superuser role by default. That role is not available to users on the Supabase platform. To avoid that requirement, use the `-k` or `--no-superuser-check` flags on every `pg_repack` CLI command.

The first version of pg\_repack with full support for non-superuser repacking is 1.5.2. You can check the version installed on your Supabase instance using

```
1
select default_version
2
from pg_available_extensions
3
where name = 'pg_repack';
```

If pg\_repack is not present, or the version is < 1.5.2, [upgrade to the latest version](https://supabase.com/docs/guides/platform/upgrading) of Supabase to gain access.

## Usage [\#](https://supabase.com/docs/guides/database/extensions/pg_repack\#usage)

### Enable the extension [\#](https://supabase.com/docs/guides/database/extensions/pg_repack\#enable-the-extension)

Get started with pg\_repack by enabling the extension in the Supabase Dashboard.

DashboardSQL

1. Go to the [Database](https://supabase.com/dashboard/project/_/database/tables) page in the Dashboard.
2. Click on **Extensions** in the sidebar.
3. Search for "pg\_repack" and enable the extension.

### Install the CLI [\#](https://supabase.com/docs/guides/database/extensions/pg_repack\#install-the-cli)

Select an option from the pg\_repack docs to [install the client CLI](https://reorg.github.io/pg_repack/#download).

### Syntax [\#](https://supabase.com/docs/guides/database/extensions/pg_repack\#syntax)

All pg\_repack commands should include the `-k` flag to skip the client-side superuser check.

```
1
pg_repack -k [OPTION]... [DBNAME]
```

## Example [\#](https://supabase.com/docs/guides/database/extensions/pg_repack\#example)

Perform an online `VACUUM FULL` on the tables `public.foo` and `public.bar` in the database `postgres`:

```
1
pg_repack -k -h db.<PROJECT_REF>.supabase.co -p 5432 -U postgres -d postgres --no-order --table public.foo --table public.bar
```

See the [official pg\_repack documentation](https://reorg.github.io/pg_repack/) for the full list of options.

## Limitations [\#](https://supabase.com/docs/guides/database/extensions/pg_repack\#limitations)

- pg\_repack cannot reorganize temporary tables.
- pg\_repack cannot cluster tables by GiST indexes.
- You cannot perform DDL commands of the target tables except VACUUM or ANALYZE while pg\_repack is working.
pg\_repack holds an ACCESS SHARE lock on the target table to enforce this restriction.

## Resources [\#](https://supabase.com/docs/guides/database/extensions/pg_repack\#resources)

- [Official pg\_repack documentation](https://reorg.github.io/pg_repack/)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/database/extensions/pg_repack.mdx)

### Is this helpful?

NoYes

### On this page

[Requirements](https://supabase.com/docs/guides/database/extensions/pg_repack#requirements) [Usage](https://supabase.com/docs/guides/database/extensions/pg_repack#usage) [Enable the extension](https://supabase.com/docs/guides/database/extensions/pg_repack#enable-the-extension) [Install the CLI](https://supabase.com/docs/guides/database/extensions/pg_repack#install-the-cli) [Syntax](https://supabase.com/docs/guides/database/extensions/pg_repack#syntax) [Example](https://supabase.com/docs/guides/database/extensions/pg_repack#example) [Limitations](https://supabase.com/docs/guides/database/extensions/pg_repack#limitations) [Resources](https://supabase.com/docs/guides/database/extensions/pg_repack#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)