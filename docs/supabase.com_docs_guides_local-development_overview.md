---
url: "https://supabase.com/docs/guides/local-development/overview"
title: "Local development with schema migrations | Supabase Docs"
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
5. [Getting started](https://supabase.com/docs/guides/local-development/overview)

# Local development with schema migrations

## Develop locally with the Supabase CLI and schema migrations.

* * *

Supabase is a flexible platform that lets you decide how you want to build your projects. You can use the Dashboard directly to get up and running quickly, or use a proper local setup. We suggest you work locally and deploy your changes to a linked project on the [Supabase Platform](https://app.supabase.io/).

Develop locally using the CLI to run a local Supabase stack. You can use the integrated Studio Dashboard to make changes, then capture your changes in schema migration files, which can be saved in version control.

Alternatively, if you're comfortable with migration files and SQL, you can write your own migrations and push them to the local database for testing before sharing your changes.

## Database migrations [\#](https://supabase.com/docs/guides/local-development/overview\#database-migrations)

Database changes are managed through "migrations." Database migrations are a common way of tracking changes to your database over time.

How to Manage Database Migration Using Supabase CLI - SupabaseTips - YouTube

[Photo image of Supabase](https://www.youtube.com/channel/UCNTVzV1InxHV-YR0fSajqPQ?embeds_referring_euri=https%3A%2F%2Fsupabase.com%2F)

Supabase

70.4K subscribers

[How to Manage Database Migration Using Supabase CLI - SupabaseTips](https://www.youtube.com/watch?v=Kx5nHBmIxyQ)

Supabase

Search

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

Watch later

Share

Copy link

[Why am I seeing this?](https://support.google.com/youtube/answer/9004474?hl=en)

Watch on

0:00

/

•Live

•

For this guide, we'll create a table called `employees` and see how we can make changes to it.

1

### Create your first migration file

To get started, generate a [new migration](https://supabase.com/docs/reference/cli/supabase-migration-new) to store the SQL needed to create our `employees` table

###### Terminal

```
1
supabase migration new create_employees_table
```

2

### Add the SQL to your migration file

This creates a new migration: supabase/migrations/<timestamp>
\_create\_employees\_table.sql.

To that file, add the SQL to create this `employees` table

###### 20250101000000\_create\_employees\_table.sql

```
1
create table employees (
2
  id bigint primary key generated always as identity,
3
  name text,
4
  email text,
5
  created_at timestamptz default now()
6
);
```

3

### Apply your migration

Now that you have a migration file, you can run this migration and create the `employees` table.

Use the `reset` command here to reset the database to the current migrations

###### Terminal

```
1
supabase db reset
```

4

### Modify your employees table

Now you can visit your new `employees` table in the Dashboard.

Next, modify your `employees` table by adding a column for department. Create a new migration file for that.

###### Terminal

```
1
supabase migration new add_department_to_employees_table
```

5

### Add a new column to your table

This creates a new migration file: supabase/migrations/<timestamp>
\_add\_department\_to\_employees\_table.sql.

To that file, add the SQL to create a new department column

###### 20250101000001\_add\_department\_to\_employees\_table.sql

```
1
alter table if exists public.employees
2
add department text default 'Hooli';
```

### Add sample data [\#](https://supabase.com/docs/guides/local-development/overview\#add-sample-data)

Now that you are managing your database with migrations scripts, it would be great have some seed data to use every time you reset the database.

For this, you can create a seed script in `supabase/seed.sql`.

1

### Populate your table

Insert data into your `employees` table with your `supabase/seed.sql` file.

###### supabase/seed.sql

```
1
insert into public.employees
2
  (name)
3
values
4
  ('Erlich Bachman'),
5
  ('Richard Hendricks'),
6
  ('Monica Hall');
```

2

### Reset your database

Reset your database (apply current migrations), and populate with seed data

###### Terminal

```
1
supabase db reset
```

You should now see the `employees` table, along with your seed data in the Dashboard! All of your database changes are captured in code, and you can reset to a known state at any time, complete with seed data.

### Diffing changes [\#](https://supabase.com/docs/guides/local-development/overview\#diffing-changes)

This workflow is great if you know SQL and are comfortable creating tables and columns. If not, you can still use the Dashboard to create tables and columns, and then use the CLI to diff your changes and create migrations.

Create a new table called `cities`, with columns `id`, `name` and `population`. To see the corresponding SQL for this, you can use the `supabase db diff --schema public` command. This will show you the SQL that will be run to create the table and columns. The output of `supabase db diff` will look something like this:

```
1
Diffing schemas: public
2
Finished supabase db diff on branch main.
3

4
create table "public"."cities" (
5
    "id" bigint primary key generated always as identity,
6
    "name" text,
7
    "population" bigint
8
);
```

Alternately, you can view your table definitions directly from the Table Editor:

![SQL Definition](https://supabase.com/docs/img/guides/cli/sql-definitions.png)

You can then copy this SQL into a new migration file, and run `supabase db reset` to apply the changes.

The last step is deploying these changes to a live Supabase project.

## Deploy your project [\#](https://supabase.com/docs/guides/local-development/overview\#deploy-your-project)

You've been developing your project locally, making changes to your tables via migrations. It's time to deploy your project to the Supabase Platform and start scaling up to millions of users! Head over to [Supabase](https://supabase.com/dashboard) and create a new project to deploy to.

### Log in to the Supabase CLI [\#](https://supabase.com/docs/guides/local-development/overview\#log-in-to-the-supabase-cli)

Terminalnpx

```
1
supabase login
```

### Link your project [\#](https://supabase.com/docs/guides/local-development/overview\#link-your-project)

Associate your project with your remote project using [`supabase link`](https://supabase.com/docs/reference/cli/usage#supabase-link).

```
1
supabase link --project-ref <project-id>
2
# You can get <project-id> from your project's dashboard URL: https://supabase.com/dashboard/project/<project-id>
3

4
supabase db pull
5
# Capture any changes that you have made to your remote database before you went through the steps above
6
# If you have not made any changes to the remote database, skip this step
```

`supabase/migrations` is now populated with a migration in `<timestamp>_remote_schema.sql`.
This migration captures any changes required for your local database to match the schema of your remote Supabase project.

Review the generated migration file and once happy, apply the changes to your local instance:

```
1
# To apply the new migration to your local database:
2
supabase migration up
3

4
# To reset your local database completely:
5
supabase db reset
```

There are a few commands required to link your project. We are in the process of consolidating these commands into a single command. Bear with us!

### Deploy database changes [\#](https://supabase.com/docs/guides/local-development/overview\#deploy-database-changes)

Deploy any local database migrations using [`db push`](https://supabase.com/docs/reference/cli/usage#supabase-db-push):

```
1
supabase db push
```

Visiting your live project on [Supabase](https://supabase.com/dashboard), you'll see a new `employees` table, complete with the `department` column you added in the second migration above.

### Deploy Edge Functions [\#](https://supabase.com/docs/guides/local-development/overview\#deploy-edge-functions)

If your project uses Edge Functions, you can deploy these using [`functions deploy`](https://supabase.com/docs/reference/cli/usage#supabase-functions-deploy):

```
1
supabase functions deploy <function_name>
```

### Use Auth locally [\#](https://supabase.com/docs/guides/local-development/overview\#use-auth-locally)

To use Auth locally, update your project's `supabase/config.toml` file that gets created after running `supabase init`. Add any providers you want, and set enabled to `true`.

```
1
[auth.external.github]
2
enabled = true
3
client_id = "env(SUPABASE_AUTH_GITHUB_CLIENT_ID)"
4
secret = "env(SUPABASE_AUTH_GITHUB_SECRET)"
5
redirect_uri = "http://localhost:54321/auth/v1/callback"
```

As a best practice, any secret values should be loaded from environment variables. You can add them to `.env` file in your project's root directory for the CLI to automatically substitute them.

```
1
SUPABASE_AUTH_GITHUB_CLIENT_ID="redacted"
2
SUPABASE_AUTH_GITHUB_SECRET="redacted"
```

For these changes to take effect, you need to run `supabase stop` and `supabase start` again.

If you have additional triggers or RLS policies defined on your `auth` schema, you can pull them as a migration file locally.

```
1
supabase db pull --schema auth
```

### Sync storage buckets [\#](https://supabase.com/docs/guides/local-development/overview\#sync-storage-buckets)

Your RLS policies on storage buckets can be pulled locally by specifying `storage` schema. For example,

```
1
supabase db pull --schema storage
```

The buckets and objects themselves are rows in the storage tables so they won't appear in your schema. You can instead define them via `supabase/config.toml` file. For example,

```
1
[storage.buckets.images]
2
public = false
3
file_size_limit = "50MiB"
4
allowed_mime_types = ["image/png", "image/jpeg"]
5
objects_path = "./images"
```

This will upload files from `supabase/images` directory to a bucket named `images` in your project with one command.

```
1
supabase seed buckets
```

### Sync any schema with `--schema` [\#](https://supabase.com/docs/guides/local-development/overview\#sync-any-schema-with---schema)

You can synchronize your database with a specific schema using the `--schema` option as follows:

```
1
supabase db pull --schema <schema_name>
```

Using `--schema`

If the local `supabase/migrations` directory is empty, the `db pull` command will ignore the `--schema` parameter.

To fix this, you can pull twice:

```
1
supabase db pull
2
supabase db pull --schema <schema_name>
```

## Limitations and considerations [\#](https://supabase.com/docs/guides/local-development/overview\#limitations-and-considerations)

The local development environment is not as feature-complete as the Supabase Platform. Here are some of the differences:

- You cannot update your project settings in the Dashboard. This must be done using the local config file.
- The CLI version determines the local version of Studio used, so make sure you keep your local [Supabase CLI up to date](https://github.com/supabase/cli#getting-started). We're constantly adding new features and bug fixes.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/local-development/overview.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FvyHyYpvjaks%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Database migrations](https://supabase.com/docs/guides/local-development/overview#database-migrations) [Add sample data](https://supabase.com/docs/guides/local-development/overview#add-sample-data) [Diffing changes](https://supabase.com/docs/guides/local-development/overview#diffing-changes) [Deploy your project](https://supabase.com/docs/guides/local-development/overview#deploy-your-project) [Log in to the Supabase CLI](https://supabase.com/docs/guides/local-development/overview#log-in-to-the-supabase-cli) [Link your project](https://supabase.com/docs/guides/local-development/overview#link-your-project) [Deploy database changes](https://supabase.com/docs/guides/local-development/overview#deploy-database-changes) [Deploy Edge Functions](https://supabase.com/docs/guides/local-development/overview#deploy-edge-functions) [Use Auth locally](https://supabase.com/docs/guides/local-development/overview#use-auth-locally) [Sync storage buckets](https://supabase.com/docs/guides/local-development/overview#sync-storage-buckets) [Sync any schema with --schema](https://supabase.com/docs/guides/local-development/overview#sync-any-schema-with---schema) [Limitations and considerations](https://supabase.com/docs/guides/local-development/overview#limitations-and-considerations)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)