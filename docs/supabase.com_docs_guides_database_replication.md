---
url: "https://supabase.com/docs/guides/database/replication"
title: "Database Replication | Supabase Docs"
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
3. Database replication
5. [Overview](https://supabase.com/docs/guides/database/replication)

# Database Replication

## An introduction to database replication and change data capture.

* * *

Replication is the process of copying changes from your database to another location. It's also referred to as change data capture (CDC): capturing all the changes that occur to your data.

## Use cases [\#](https://supabase.com/docs/guides/database/replication\#use-cases)

You might use database replication for:

- **Analytics and Data Warehousing**: Replicate your operational database to analytics platforms for complex analysis without impacting your application's performance.
- **Data Integration**: Keep your data synchronized across different systems and services in your tech stack.
- **Backup and Disaster Recovery**: Maintain up-to-date copies of your data in different locations.

## Replication methods [\#](https://supabase.com/docs/guides/database/replication\#replication-methods)

Supabase supports two methods for replicating your database to external destinations:

### Replication [\#](https://supabase.com/docs/guides/database/replication\#replication)

##### Private Alpha

Replication is currently in private alpha. Access is limited and features may change.

Replication powered by [Supabase ETL](https://github.com/supabase/etl) automatically replicates data to supported systems.

- [Set up replication](https://supabase.com/docs/guides/database/replication/replication-setup)

### Manual replication [\#](https://supabase.com/docs/guides/database/replication\#manual-replication)

Configure your own replication using external tools and Postgres's native logical replication. This gives you full control over the replication process and allows you to use any tool that supports Postgres logical replication.

- [Set up Manual Replication](https://supabase.com/docs/guides/database/replication/manual-replication-setup)

## Related features [\#](https://supabase.com/docs/guides/database/replication\#related-features)

Choose the data syncing method based on your use case:

- For realtime features and syncing data to clients (browsers, mobile apps), see [Realtime](https://supabase.com/docs/guides/realtime)
- For deploying read-only databases across multiple regions, see [Read Replicas](https://supabase.com/docs/guides/platform/read-replicas)

## Concepts and terms [\#](https://supabase.com/docs/guides/database/replication\#concepts-and-terms)

### Write-Ahead Log (WAL) [\#](https://supabase.com/docs/guides/database/replication\#write-ahead-log-wal)

Postgres uses a system called the Write-Ahead Log (WAL) to manage changes to the database. As you make changes, they are appended to the WAL, which is a series of files (also called "segments") where the file size can be specified. Once one segment is full, Postgres will start appending to a new segment. After a period of time, a checkpoint occurs and Postgres synchronizes the WAL with your database. Once the checkpoint is complete, then the WAL files can be removed from disk and free up space.

### Logical replication and WAL [\#](https://supabase.com/docs/guides/database/replication\#logical-replication-and-wal)

Logical replication is a method of replication where Postgres uses the WAL files and transmit those changes to another Postgres database, or a system that supports reading WAL files.

### LSN [\#](https://supabase.com/docs/guides/database/replication\#lsn)

LSN is a Log Sequence Number that is used to identify the position of a WAL file in the WAL directory. It is often used to determine the progress of replication in subscribers and calculate the lag of a replication slot.

## Logical replication architecture [\#](https://supabase.com/docs/guides/database/replication\#logical-replication-architecture)

When setting up logical replication, three key components are involved:

- `publication` \- A set of tables on your primary database that will be `published`
- `replication slot` \- A slot used for replicating the data from a single publication. The slot, when created, will specify the output format of the changes
- `subscription` \- A subscription is created from an external system (i.e. another Postgres database) and must specify the name of the `publication`. If you do not specify a replication slot, one is automatically created

## Logical replication output format [\#](https://supabase.com/docs/guides/database/replication\#logical-replication-output-format)

Logical replication is typically output in 2 forms, `pgoutput` and `wal2json`. The output method is how Postgres sends changes to any active replication slot.

## Logical replication configuration [\#](https://supabase.com/docs/guides/database/replication\#logical-replication-configuration)

When using logical replication, Postgres is then configured to keep WAL files around for longer than it needs them. If the files are removed too quickly, then your `replication slot` will become inactive and, if the database receives a large number of changes in a short time, then the `replication slot` can become lost as it was not able to keep up.

In order to mitigate this, Postgres has many options and settings that can be [tweaked](https://supabase.com/docs/guides/database/custom-postgres-config) to manage the WAL usage effectively. Not all of these settings are user configurable as they can impact the stability of your database. For those that are, these should be considered as advanced configuration and not changed without understanding that they can cause additional disk space and resources to be used, as well as incur additional costs.

| Setting | Description | User-facing | Default |
| --- | --- | --- | --- |
| [`max_replication_slots`](https://postgresqlco.nf/doc/en/param/max_replication_slots/) | Max count of replication slots allowed | No |  |
| [`wal_keep_size`](https://postgresqlco.nf/doc/en/param/wal_keep_size/) | Minimum size of WAL files to keep for replication | No |  |
| [`max_slot_wal_keep_size`](https://postgresqlco.nf/doc/en/param/max_slot_wal_keep_size/) | Max WAL size that can be reserved by replication slots | No |  |
| [`checkpoint_timeout`](https://postgresqlco.nf/doc/en/param/checkpoint_timeout/) | Max time between WAL checkpoints | No |  |

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/database/replication.mdx)

### Is this helpful?

NoYes

### On this page

[Use cases](https://supabase.com/docs/guides/database/replication#use-cases) [Replication methods](https://supabase.com/docs/guides/database/replication#replication-methods) [Replication](https://supabase.com/docs/guides/database/replication#replication) [Manual replication](https://supabase.com/docs/guides/database/replication#manual-replication) [Related features](https://supabase.com/docs/guides/database/replication#related-features) [Concepts and terms](https://supabase.com/docs/guides/database/replication#concepts-and-terms) [Write-Ahead Log (WAL)](https://supabase.com/docs/guides/database/replication#write-ahead-log-wal) [Logical replication and WAL](https://supabase.com/docs/guides/database/replication#logical-replication-and-wal) [LSN](https://supabase.com/docs/guides/database/replication#lsn) [Logical replication architecture](https://supabase.com/docs/guides/database/replication#logical-replication-architecture) [Logical replication output format](https://supabase.com/docs/guides/database/replication#logical-replication-output-format) [Logical replication configuration](https://supabase.com/docs/guides/database/replication#logical-replication-configuration)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)