---
url: "https://supabase.com/docs/guides/local-development/declarative-database-schemas"
title: "Declarative database schemas | Supabase Docs"
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

[Local Dev / CLI](https://supabase.com/docs/guides/local-development)

[Overview](https://supabase.com/docs/guides/local-development)

CLI[Getting started](https://supabase.com/docs/guides/local-development/cli/getting-started)
[Configuration](https://supabase.com/docs/guides/local-development/cli/config)
[CLI commands](https://supabase.com/docs/reference/cli)

Local development[Getting started](https://supabase.com/docs/guides/local-development/overview)
[Declarative database schemas](https://supabase.com/docs/guides/local-development/declarative-database-schemas)
[Seeding your database](https://supabase.com/docs/guides/local-development/seeding-your-database)
[Managing config and secrets](https://supabase.com/docs/guides/local-development/managing-config)
[Restoring downloaded backup](https://supabase.com/docs/guides/local-development/restoring-downloaded-backup)
[Customizing email templates](https://supabase.com/docs/guides/local-development/customizing-email-templates)

Testing[Getting started](https://supabase.com/docs/guides/local-development/testing/overview)
[pgTAP advanced guide](https://supabase.com/docs/guides/local-development/testing/pgtap-extended)
[Database testing](https://supabase.com/docs/guides/database/testing)
[RLS policies testing](https://supabase.com/docs/guides/database/extensions/pgtap#testing-rls-policies)

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

Local Development

1. [Local Dev / CLI](https://supabase.com/docs/guides/local-development)
3. Local development
5. [Declarative database schemas](https://supabase.com/docs/guides/local-development/declarative-database-schemas)

# Declarative database schemas

## Manage your database schemas in one place and generate versioned migrations.

* * *

## Overview [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#overview)

Declarative schemas provide a developer-friendly way to maintain schema migrations.

[Migrations](https://supabase.com/docs/guides/deployment/database-migrations) are traditionally managed imperatively (you provide the instructions on how exactly to change the database). This can lead to related information being scattered over multiple migration files. With declarative schemas, you instead declare the state you want your database to be in, and the instructions are generated for you.

## Schema migrations [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#schema-migrations)

Schema migrations are SQL statements written in Data Definition Language. They are versioned in your `supabase/migrations` directory to ensure schema consistency between local and remote environments.

### Declaring your schema [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#declaring-your-schema)

1

### Create your first schema file

Create a SQL file in `supabase/schemas` directory that defines an `employees` table.

supabase/schemas/employees.sql

```
1
create table "employees" (
2
  "id" integer not null,
3
  "name" text
4
);
```

2

### Generate a migration file

Generate a migration file by diffing against your declared schema.

Terminal

```
1
supabase db diff -f create_employees_table
```

3

### Start the local database and apply migrations

Start the local database first. Then, apply the migration manually to see your schema changes in the local Dashboard.

Terminal

```
1
supabase start
2
supabase migration up
```

### Updating your schema [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#updating-your-schema)

1

### Add a new column

Edit `supabase/schemas/employees.sql` file to add a new column to `employees` table.

supabase/schemas/employees.sql

```
1
create table "employees" (
2
  "id" integer not null,
3
  "name" text,
4
  "age" smallint not null
5
);
```

Some entities like views and enums expect columns to be declared in a specific order. To avoid messy diffs, always append new columns to the end of the table.

2

### Generate a new migration

Diff existing migrations against your declared schema.

Terminal

```
1
supabase db diff -f add_age
```

3

### Review the generated migration

Verify that the generated migration contain a single incremental change.

supabase/migrations/<timestamp>\_add\_age.sql

```
1
alter table "public"."employees" add column "age" smallint not null;
```

4

### Apply the pending migration

Start the database locally and apply the pending migration.

Terminal

```
1
supabase migration up
```

### Deploying your schema changes [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#deploying-your-schema-changes)

1

### Log in to the Supabase CLI

[Log in](https://supabase.com/docs/reference/cli/supabase-login) via the Supabase CLI.

Terminal

```
1
supabase login
```

2

### Link your remote project

Follow the on-screen prompts to [link](https://supabase.com/docs/reference/cli/supabase-link) your remote project.

Terminal

```
1
supabase link
```

3

### Deploy database changes

[Push](https://supabase.com/docs/reference/cli/supabase-db-push) your changes to the remote database.

Terminal

```
1
supabase db push
```

### Managing dependencies [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#managing-dependencies)

As your database schema evolves, you will probably start using more advanced entities like views and functions. These entities are notoriously verbose to manage using plain migrations because the entire body must be recreated whenever there is a change. Using declarative schema, you can now edit them in-place so it’s much easier to review.

supabase/schemas/employees.sql

```
1
create table "employees" (
2
  "id" integer not null,
3
  "name" text,
4
  "age" smallint not null
5
);
6

7
create view "profiles" as
8
  select id, name from "employees";
9

10
create function "get_age"(employee_id integer) RETURNS smallint
11
  LANGUAGE "sql"
12
AS $$
13
  select age
14
  from employees
15
  where id = employee_id;
16
$$;
```

Your schema files are run in lexicographic order by default. The order is important when you have foreign keys between multiple tables as the parent table must be created first. For example, your `supabase` directory may end up with the following structure.

```
1
.
2
└── supabase/
3
    ├── schemas/
4
    │   ├── employees.sql
5
    │   └── managers.sql
6
    └── migrations/
7
        ├── 20241004112233_create_employees_table.sql
8
        ├── 20241005112233_add_employee_age.sql
9
        └── 20241006112233_add_managers_table.sql
```

For small projects with only a few tables, the default schema order may be sufficient. However, as your project grows, you might need more control over the order in which schemas are applied. To specify a custom order for applying the schemas, you can declare them explicitly in `config.toml`. Any glob patterns will evaluated, deduplicated, and sorted in lexicographic order. For example, the following pattern ensures `employees.sql` is always executed first.

supabase/config.toml

```
1
[db.migrations]
2
schema_paths = [\
3\
  "./schemas/employees.sql",\
4\
  "./schemas/*.sql",\
5\
]
```

### Pulling in your production schema [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#pulling-in-your-production-schema)

To set up declarative schemas on a existing project, you can pull in your production schema by running:

Terminal

```
1
supabase db dump > supabase/schemas/prod.sql
```

From there, you can start breaking down your schema into smaller files and generate migrations. You can do this all at once, or incrementally as you make changes to your schema.

### Rolling back a schema change [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#rolling-back-a-schema-change)

During development, you may want to rollback a migration to keep your new schema changes in a single migration file. This can be done by resetting your local database to a previous version.

Terminal

```
1
supabase db reset --version 20241005112233
```

After a reset, you can [edit the schema](https://supabase.com/docs/guides/local-development/declarative-database-schemas#updating-your-schema) and regenerate a new migration file. Note that you should not reset a version that's already deployed to production.

If you need to rollback a migration that's already deployed, you should first revert changes to the schema files. Then you can generate a new migration file containing the down migration. This ensures your production migrations are always rolling forward.

SQL statements generated in a down migration are usually destructive. You must review them carefully to avoid unintentional data loss.

## Known caveats [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#known-caveats)

The `migra` diff tool used for generating schema diff is capable of tracking most database changes. However, there are edge cases where it can fail.

If you need to use any of the entities below, remember to add them through [versioned migrations](https://supabase.com/docs/guides/deployment/database-migrations) instead.

### Data manipulation language [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#data-manipulation-language)

- DML statements such as `insert`, `update`, `delete`, etc., are not captured by schema diff

### View ownership [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#view-ownership)

- [view owner and grants](https://github.com/djrobstep/migra/issues/160#issuecomment-1702983833)
- [security invoker on views](https://github.com/djrobstep/migra/issues/234)
- [materialized views](https://github.com/djrobstep/migra/issues/194)
- doesn’t recreate views when altering column type

### RLS policies [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#rls-policies)

- [alter policy statements](https://github.com/djrobstep/schemainspect/blob/master/schemainspect/pg/obj.py#L228)
- [column privileges](https://github.com/djrobstep/schemainspect/pull/67)

### Other entities [\#](https://supabase.com/docs/guides/local-development/declarative-database-schemas\#other-entities)

- schema privileges are not tracked because each schema is diffed separately
- [comments are not tracked](https://github.com/djrobstep/migra/issues/69)
- [partitions are not tracked](https://github.com/djrobstep/migra/issues/186)
- [`alter publication ... add table ...`](https://github.com/supabase/cli/issues/883)
- [create domain statements are ignored](https://github.com/supabase/cli/issues/2137)
- [grant statements are duplicated from default privileges](https://github.com/supabase/cli/issues/1864)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/local-development/declarative-database-schemas.mdx)

### Is this helpful?

NoYes

### On this page

[Overview](https://supabase.com/docs/guides/local-development/declarative-database-schemas#overview) [Schema migrations](https://supabase.com/docs/guides/local-development/declarative-database-schemas#schema-migrations) [Declaring your schema](https://supabase.com/docs/guides/local-development/declarative-database-schemas#declaring-your-schema) [Updating your schema](https://supabase.com/docs/guides/local-development/declarative-database-schemas#updating-your-schema) [Deploying your schema changes](https://supabase.com/docs/guides/local-development/declarative-database-schemas#deploying-your-schema-changes) [Managing dependencies](https://supabase.com/docs/guides/local-development/declarative-database-schemas#managing-dependencies) [Pulling in your production schema](https://supabase.com/docs/guides/local-development/declarative-database-schemas#pulling-in-your-production-schema) [Rolling back a schema change](https://supabase.com/docs/guides/local-development/declarative-database-schemas#rolling-back-a-schema-change) [Known caveats](https://supabase.com/docs/guides/local-development/declarative-database-schemas#known-caveats) [Data manipulation language](https://supabase.com/docs/guides/local-development/declarative-database-schemas#data-manipulation-language) [View ownership](https://supabase.com/docs/guides/local-development/declarative-database-schemas#view-ownership) [RLS policies](https://supabase.com/docs/guides/local-development/declarative-database-schemas#rls-policies) [Other entities](https://supabase.com/docs/guides/local-development/declarative-database-schemas#other-entities)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)