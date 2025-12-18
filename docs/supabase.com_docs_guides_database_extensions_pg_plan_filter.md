---
url: "https://supabase.com/docs/guides/database/extensions/pg_plan_filter"
title: "pg_plan_filter: Restrict Total Cost | Supabase Docs"
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
5. [pg\_plan\_filter: Restrict Total Cost](https://supabase.com/docs/guides/database/extensions/pg_plan_filter)

# pg\_plan\_filter: Restrict Total Cost

* * *

[`pg_plan_filter`](https://github.com/pgexperts/pg_plan_filter) is Postgres extension to block execution of statements where query planner's estimate of the total cost exceeds a threshold. This is intended to give database administrators a way to restrict the contribution an individual query has on database load.

## Enable the extension [\#](https://supabase.com/docs/guides/database/extensions/pg_plan_filter\#enable-the-extension)

The extension is already enabled by default via `shared_preload_libraries` setting.

You can follow the instructions below.

## API [\#](https://supabase.com/docs/guides/database/extensions/pg_plan_filter\#api)

`plan_filter.statement_cost_limit`: restricts the maximum total cost for executed statements
`plan_filter.limit_select_only`: restricts to `select` statements

Note that `limit_select_only = true` is not the same as read-only because `select` statements may modify data, for example, through a function call.

## Example [\#](https://supabase.com/docs/guides/database/extensions/pg_plan_filter\#example)

To demonstrate total cost filtering, we'll compare how `plan_filter.statement_cost_limit` treats queries that are under and over its cost limit. First, we set up a table with some data:

```
1
create table book(
2
  id int primary key
3
);
4
-- CREATE TABLE
5

6
insert into book(id) select * from generate_series(1, 10000);
7
-- INSERT 0 10000
```

Next, we can review the explain plans for a single record select, and a whole table select.

```
1
explain select * from book where id =1;
2
                                QUERY PLAN
3
---------------------------------------------------------------------------
4
 Index Only Scan using book_pkey on book  (cost=0.28..2.49 rows=1 width=4)
5
   Index Cond: (id = 1)
6
(2 rows)
7

8
explain select * from book;
9
                       QUERY PLAN
10
---------------------------------------------------------
11
 Seq Scan on book  (cost=0.00..135.00 rows=10000 width=4)
12
(1 row)
```

Now we can choose a `statement_cost_filter` value between the total cost for the single select (2.49) and the whole table select (135.0) so one statement will succeed and one will fail.

```
1
set plan_filter.statement_cost_limit = 50; -- between 2.49 and 135.0
2

3
select * from book where id = 1;
4
 id
5
----
6
  1
7
(1 row)
8
-- SUCCESS
```

```
1
select * from book;
2

3
ERROR:  plan cost limit exceeded
4
HINT:  The plan for your query shows that it would probably have an excessive run time. This may be due to a logic error in the SQL, or it maybe just a very costly query. Rewrite your query or increase the configuration parameter "plan_filter.statement_cost_limit".
5
-- FAILURE
```

## Resources [\#](https://supabase.com/docs/guides/database/extensions/pg_plan_filter\#resources)

- Official [`pg_plan_filter` documentation](https://github.com/pgexperts/pg_plan_filter)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/database/extensions/pg_plan_filter.mdx)

### Is this helpful?

NoYes

### On this page

[Enable the extension](https://supabase.com/docs/guides/database/extensions/pg_plan_filter#enable-the-extension) [API](https://supabase.com/docs/guides/database/extensions/pg_plan_filter#api) [Example](https://supabase.com/docs/guides/database/extensions/pg_plan_filter#example) [Resources](https://supabase.com/docs/guides/database/extensions/pg_plan_filter#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)