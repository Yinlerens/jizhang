---
url: "https://supabase.com/docs/guides/database/extensions/rum"
title: "RUM: improved inverted index for full-text search based on GIN index | Supabase Docs"
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
5. [RUM: inverted index for full-text search](https://supabase.com/docs/guides/database/extensions/rum)

# RUM: improved inverted index for full-text search based on GIN index

* * *

[RUM](https://github.com/postgrespro/rum) is an extension which adds a RUM index to Postgres.

RUM index is based on GIN that stores additional per-entry information in a posting tree. For example, positional information of lexemes or timestamps. In comparison to GIN it can use this information to make faster index-only scans for:

- Phrase search
- Text search with ranking by text distance operator
- Text `SELECT`s with ordering by some non-indexed additional column e.g. by timestamp.

RUM works best in scenarios when the possible keys are highly repeatable. I.e. all texts are composed of a
limited amount of words, so per-lexeme indexing gives significant speed-up in searching texts containing word
combinations or phrases.

Main operators for ordering are:

`tsvector``<=>``tsquery` \| `float4` \| Distance between `tsvector` and `tsquery`.
value `<=>` value \| `float8` \| Distance between two values.

Where value is `timestamp`, `timestamptz`, `int2`, `int4`, `int8`, `float4`, `float8`, `money` and `oid`

## Usage [\#](https://supabase.com/docs/guides/database/extensions/rum\#usage)

### Enable the extension [\#](https://supabase.com/docs/guides/database/extensions/rum\#enable-the-extension)

You can get started with rum by enabling the extension in your Supabase dashboard.

DashboardSQL

1. Go to the [Database](https://supabase.com/dashboard/project/_/database/tables) page in the Dashboard.
2. Click on **Extensions** in the sidebar.
3. Search for "rum" and enable the extension.

### Syntax [\#](https://supabase.com/docs/guides/database/extensions/rum\#syntax)

#### For type: `tsvector` [\#](https://supabase.com/docs/guides/database/extensions/rum\#for-type-tsvector)

To understand the following you may need first to see [Official Postgres documentation on text\\
search](https://www.postgresql.org/docs/current/functions-textsearch.html)

`rum_tsvector_ops`

```
1
CREATE TABLE test_rum(t text, a tsvector);
2

3
CREATE TRIGGER tsvectorupdate
4
BEFORE UPDATE OR INSERT ON test_rum
5
FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger('a', 'pg_catalog.english', 't');
6

7
INSERT INTO test_rum(t) VALUES ('The situation is most beautiful');
8
INSERT INTO test_rum(t) VALUES ('It is a beautiful');
9
INSERT INTO test_rum(t) VALUES ('It looks like a beautiful place');
10

11
CREATE INDEX rumidx ON test_rum USING rum (a rum_tsvector_ops);
```

And we can execute `tsvector` selects with ordering by text distance operator:

```
1
SELECT t, a `<=>` to_tsquery('english', 'beautiful | place') AS rank
2
    FROM test_rum
3
    WHERE a @@ to_tsquery('english', 'beautiful | place')
4
    ORDER BY a `<=>` to_tsquery('english', 'beautiful | place');
5
                t                |  rank
6
---------------------------------+---------
7
 It looks like a beautiful place | 8.22467
8
 The situation is most beautiful | 16.4493
9
 It is a beautiful               | 16.4493
10
(3 rows)
```

`rum_tsvector_addon_ops`

```
1
CREATE TABLE tsts (id int, t tsvector, d timestamp);
2
CREATE INDEX tsts_idx ON tsts USING rum (t rum_tsvector_addon_ops, d)
3
    WITH (attach = 'd', to = 't');
```

Now we can execute the selects with ordering distance operator on attached column:

```
1
SELECT id, d, d `<=>` '2016-05-16 14:21:25' FROM tsts WHERE t @@ 'wr&qh' ORDER BY d `<=>` '2016-05-16 14:21:25' LIMIT 5;
2
 id  |                d                |   ?column?
3
-----+---------------------------------+---------------
4
 355 | Mon May 16 14:21:22.326724 2016 |      2.673276
5
 354 | Mon May 16 13:21:22.326724 2016 |   3602.673276
6
 371 | Tue May 17 06:21:22.326724 2016 |  57597.326724
7
 406 | Wed May 18 17:21:22.326724 2016 | 183597.326724
8
 415 | Thu May 19 02:21:22.326724 2016 | 215997.326724
9
(5 rows)
```

#### For type: `anyarray` [\#](https://supabase.com/docs/guides/database/extensions/rum\#for-type-anyarray)

`rum_anyarray_ops`

This operator class stores `anyarray` elements with length of the array. It supports operators `&&`, `@>`, `<@`, `=`, `%` operators. It also supports ordering by `<=>` operator.

```
1
CREATE TABLE test_array (i int2[]);
2
INSERT INTO test_array VALUES ('{}'), ('{0}'), ('{1,2,3,4}'), ('{1,2,3}'), ('{1,2}'), ('{1}');
3
CREATE INDEX idx_array ON test_array USING rum (i rum_anyarray_ops);
```

Now we can execute the query using index scan:

```
1
SELECT * FROM test_array WHERE i && '{1}' ORDER BY i `<=>` '{1}' ASC;
2
     i
3
-----------
4
 {1}
5
 {1,2}
6
 {1,2,3}
7
 {1,2,3,4}
8
(4 rows)
```

`rum_anyarray_addon_ops`

The does the same with `anyarray` index as `rum_tsvector_addon_ops` i.e. allows to order select results using distance
operator by attached column.

## Limitations [\#](https://supabase.com/docs/guides/database/extensions/rum\#limitations)

`RUM` has slower build and insert times than `GIN` due to:

1. It is bigger due to the additional attributes stored in the index.
2. It uses generic WAL records.

## Resources [\#](https://supabase.com/docs/guides/database/extensions/rum\#resources)

- [Official RUM documentation](https://github.com/postgrespro/rum)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/database/extensions/rum.mdx)

### Is this helpful?

NoYes

### On this page

[Usage](https://supabase.com/docs/guides/database/extensions/rum#usage) [Enable the extension](https://supabase.com/docs/guides/database/extensions/rum#enable-the-extension) [Syntax](https://supabase.com/docs/guides/database/extensions/rum#syntax) [Limitations](https://supabase.com/docs/guides/database/extensions/rum#limitations) [Resources](https://supabase.com/docs/guides/database/extensions/rum#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)