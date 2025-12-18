---
url: "https://supabase.com/docs/guides/local-development/seeding-your-database"
title: "Seeding your database | Supabase Docs"
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
5. [Seeding your database](https://supabase.com/docs/guides/local-development/seeding-your-database)

# Seeding your database

## Populate your database with initial data for reproducible environments across local and testing.

* * *

## What is seed data? [\#](https://supabase.com/docs/guides/local-development/seeding-your-database\#what-is-seed-data)

Seeding is the process of populating a database with initial data, typically used to provide sample or default records for testing and development purposes. You can use this to create "reproducible environments" for local development, staging, and production.

## Using seed files [\#](https://supabase.com/docs/guides/local-development/seeding-your-database\#using-seed-files)

Seed files are executed the first time you run `supabase start` and every time you run `supabase db reset`. Seeding occurs _after_ all database migrations have been completed. As a best practice, only include data insertions in your seed files, and avoid adding schema statements.

By default, if no specific configuration is provided, the system will look for a seed file matching the pattern `supabase/seed.sql`. This maintains backward compatibility with earlier versions, where the seed file was placed in the `supabase` folder.

You can add any SQL statements to this file. For example:

```
1
insert into countries
2
  (name, code)
3
values
4
  ('United States', 'US'),
5
  ('Canada', 'CA'),
6
  ('Mexico', 'MX');
```

If you want to manage multiple seed files or organize them across different folders, you can configure additional paths or glob patterns in your `config.toml` (see the [next section](https://supabase.com/docs/guides/local-development/seeding-your-database#splitting-up-your-seed-file) for details).

### Splitting up your seed file [\#](https://supabase.com/docs/guides/local-development/seeding-your-database\#splitting-up-your-seed-file)

For better modularity and maintainability, you can split your seed data into multiple files. For example, you can organize your seeds by table and include files such as `countries.sql` and `cities.sql`. Configure them in `config.toml` like so:

```
1
[db.seed]
2
enabled = true
3
sql_paths = ['./countries.sql', './cities.sql']
```

Or to include all `.sql` files under a specific folder you can do:

```
1
[db.seed]
2
enabled = true
3
sql_paths = ['./seeds/*.sql']
```

The CLI processes seed files in the order they are declared in the `sql_paths` array. If a glob pattern is used and matches multiple files, those files are sorted in lexicographic order to ensure consistent execution. Additionally:

- The base folder for the pattern matching is `supabase` so `./countries.sql` will search for `supabase/countries.sql`
- Files matched by multiple patterns will be deduplicated to prevent redundant seeding.
- If a pattern does not match any files, a warning will be logged to help you troubleshoot potential configuration issues.

## Generating seed data [\#](https://supabase.com/docs/guides/local-development/seeding-your-database\#generating-seed-data)

You can generate seed data for local development using [Snaplet](https://github.com/snaplet/seed).

To use Snaplet, you need to have Node.js and npm installed. You can add Node.js to your project by running `npm init -y` in your project directory.

If this is your first time using Snaplet to seed your project, you'll need to set up Snaplet with the following command:

```
1
npx @snaplet/seed init
```

This command will analyze your database and its structure, and then generate a JavaScript client which can be used to define exactly how your data should be generated using code. The `init` command generates a configuration file, `seed.config.ts` and an example script, `seed.ts`, as a starting point.

During `init` if you are not using an Object Relational Mapper (ORM) or your ORM is not in the supported list, choose `node-postgres`.

In most cases you only want to generate data for specific schemas or tables. This is defined with `select`. Here is an example `seed.config.ts` configuration file:

```
1
export default defineConfig({
2
  adapter: async () => {
3
    const client = new Client({
4
      connectionString: 'postgresql://postgres:postgres@localhost:54322/postgres',
5
    })
6
    await client.connect()
7
    return new SeedPg(client)
8
  },
9
  // We only want to generate data for the public schema
10
  select: ['!*', 'public.*'],
11
})
```

Suppose you have a database with the following schema:

![An example schema](https://supabase.com/docs/img/guides/cli/snaplet-example-schema.png)

You can use the seed script example generated by Snaplet `seed.ts` to define the values you want to generate. For example:

- A `Post` with the title `"There is a lot of snow around here!"`
- The `Post.createdBy` user with an email address ending in `"@acme.org"`
- Three `Post.comments` from three different users.

```
1
import { createSeedClient } from '@snaplet/seed'
2
import { copycat } from '@snaplet/copycat'
3

4
async function main() {
5
  const seed = await createSeedClient({ dryRun: true })
6

7
  await seed.Post([\
8\
    {\
9\
      title: 'There is a lot of snow around here!',\
10\
      createdBy: {\
11\
        email: (ctx) =>\
12\
          copycat.email(ctx.seed, {\
13\
            domain: 'acme.org',\
14\
          }),\
15\
      },\
16\
      Comment: (x) => x(3),\
17\
    },\
18\
  ])
19

20
  process.exit()
21
}
22

23
main()
```

Running `npx tsx seed.ts > supabase/seed.sql` generates the relevant SQL statements inside your `supabase/seed.sql` file:

```
1
-- The `Post.createdBy` user with an email address ending in `"@acme.org"`
2
INSERT INTO "User" (name, email) VALUES ("John Snow", "snow@acme.org")
3

4
--- A `Post` with the title `"There is a lot of snow around here!"`
5
INSERT INTO "Post" (title, content, createdBy) VALUES (
6
  "There is a lot of snow around here!",
7
  "Lorem ipsum dolar",
8
  1)
9

10
--- Three `Post.Comment` from three different users.
11
INSERT INTO "User" (name, email) VALUES ("Stephanie Shadow", "shadow@domain.com")
12
INSERT INTO "Comment" (text, userId, postId) VALUES ("I love cheese", 2, 1)
13

14
INSERT INTO "User" (name, email) VALUES ("John Rambo", "rambo@trymore.dev")
15
INSERT INTO "Comment" (text, userId, postId) VALUES ("Lorem ipsum dolar sit", 3, 1)
16

17
INSERT INTO "User" (name, email) VALUES ("Steven Plank", "s@plank.org")
18
INSERT INTO "Comment" (text, userId, postId) VALUES ("Actually, that's not correct...", 4, 1)
```

Whenever your database structure changes, you will need to regenerate `@snaplet/seed` to keep it in sync with the new structure. You can do this by running:

```
1
npx @snaplet/seed sync
```

You can further enhance your seed script by using Large Language Models to generate more realistic data. To enable this feature, set one of the following environment variables in your `.env` file:

```
1
OPENAI_API_KEY=<your_openai_api_key>
2
GROQ_API_KEY=<your_groq_api_key>
```

After setting the environment variables, run the following commands to sync and generate the seed data:

```
1
npx @snaplet/seed sync
2
npx tsx seed.ts > supabase/seed.sql
```

For more information, check out Snaplet's [seed documentation](https://snaplet-seed.netlify.app/seed/integrations/supabase)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/local-development/seeding-your-database.mdx)

### Is this helpful?

NoYes

### On this page

[What is seed data?](https://supabase.com/docs/guides/local-development/seeding-your-database#what-is-seed-data) [Using seed files](https://supabase.com/docs/guides/local-development/seeding-your-database#using-seed-files) [Splitting up your seed file](https://supabase.com/docs/guides/local-development/seeding-your-database#splitting-up-your-seed-file) [Generating seed data](https://supabase.com/docs/guides/local-development/seeding-your-database#generating-seed-data)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)