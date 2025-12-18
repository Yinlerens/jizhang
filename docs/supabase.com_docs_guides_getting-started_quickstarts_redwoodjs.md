---
url: "https://supabase.com/docs/guides/getting-started/quickstarts/redwoodjs"
title: "Use Supabase with RedwoodJS | Supabase Docs"
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

[Start with Supabase](https://supabase.com/docs/guides/getting-started)

[Features](https://supabase.com/docs/guides/getting-started/features)

[Architecture](https://supabase.com/docs/guides/getting-started/architecture)

Framework Quickstarts[Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
[React](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
[Nuxt](https://supabase.com/docs/guides/getting-started/quickstarts/nuxtjs)
[Vue](https://supabase.com/docs/guides/getting-started/quickstarts/vue)
[Hono](https://supabase.com/docs/guides/getting-started/quickstarts/hono)
[Expo React Native](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native)
[Flutter](https://supabase.com/docs/guides/getting-started/quickstarts/flutter)
[iOS SwiftUI](https://supabase.com/docs/guides/getting-started/quickstarts/ios-swiftui)
[Android Kotlin](https://supabase.com/docs/guides/getting-started/quickstarts/kotlin)
[SvelteKit](https://supabase.com/docs/guides/getting-started/quickstarts/sveltekit)
[Flask (Python)](https://supabase.com/docs/guides/getting-started/quickstarts/flask)
[TanStack Start](https://supabase.com/docs/guides/getting-started/quickstarts/tanstack)
[Laravel PHP](https://supabase.com/docs/guides/getting-started/quickstarts/laravel)
[Ruby on Rails](https://supabase.com/docs/guides/getting-started/quickstarts/ruby-on-rails)
[SolidJS](https://supabase.com/docs/guides/getting-started/quickstarts/solidjs)
[RedwoodJS](https://supabase.com/docs/guides/getting-started/quickstarts/redwoodjs)
[Refine](https://supabase.com/docs/guides/getting-started/quickstarts/refine)

Web app demos[Next.js](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
[React](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
[Vue 3](https://supabase.com/docs/guides/getting-started/tutorials/with-vue-3)
[Nuxt 3](https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3)
[Angular](https://supabase.com/docs/guides/getting-started/tutorials/with-angular)
[RedwoodJS](https://supabase.com/docs/guides/getting-started/tutorials/with-redwoodjs)
[SolidJS](https://supabase.com/docs/guides/getting-started/tutorials/with-solidjs)
[Svelte](https://supabase.com/docs/guides/getting-started/tutorials/with-svelte)
[SvelteKit](https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit)
[Refine](https://supabase.com/docs/guides/getting-started/tutorials/with-refine)

Mobile tutorials[Flutter](https://supabase.com/docs/guides/getting-started/tutorials/with-flutter)
[Expo React Native](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
[Android Kotlin](https://supabase.com/docs/guides/getting-started/tutorials/with-kotlin)
[Ionic React](https://supabase.com/docs/guides/getting-started/tutorials/with-ionic-react)
[Ionic Vue](https://supabase.com/docs/guides/getting-started/tutorials/with-ionic-vue)
[Ionic Angular](https://supabase.com/docs/guides/getting-started/tutorials/with-ionic-angular)
[Swift](https://supabase.com/docs/guides/getting-started/tutorials/with-swift)

AI Tools

Prompts

[Supabase MCP server](https://supabase.com/docs/guides/getting-started/mcp)
[Deploy MCP servers](https://supabase.com/docs/guides/getting-started/byo-mcp)

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

Getting Started

1. [Start with Supabase](https://supabase.com/docs/guides/getting-started)
3. Framework Quickstarts
5. [RedwoodJS](https://supabase.com/docs/guides/getting-started/quickstarts/redwoodjs)

# Use Supabase with RedwoodJS

## Learn how to create a Supabase project, add some sample data to your database using Prisma migration and seeds, and query the data from a RedwoodJS app.

* * *

1

### Setup your new Supabase Project

[Create a new project](https://supabase.com/dashboard) in the Supabase Dashboard.

Be sure to make note of the Database Password you used as you will need this later to connect to your database.

![New project for redwoodjs](https://supabase.com/docs/img/guides/getting-started/quickstarts/redwoodjs/new-project.png)

2

### Gather Database Connection Strings

Open the project [**Connect** panel](https://supabase.com/dashboard/project/_?showConnect=true). This quickstart connects using the [**Transaction pooler**](https://supabase.com/dashboard/project/_?showConnect=true&method=transaction) and [**Session pooler**](https://supabase.com/dashboard/project/_?showConnect=true&method=session) mode. Transaction mode is used for application queries and Session mode is used for running migrations with Prisma.

To do this, set the connection mode to `Transaction` in the [Database Settings page](https://supabase.com/dashboard/project/_/database/settings) and copy the connection string and append `?pgbouncer=true&&connection_limit=1`. `pgbouncer=true` disables Prisma from generating prepared statements. This is required since our connection pooler does not support prepared statements in transaction mode yet. The `connection_limit=1` parameter is only required if you are using Prisma from a serverless environment. This is the Transaction mode connection string.

To get the Session mode connection pooler string, change the port of the connection string from the dashboard to 5432.

You will need the Transaction mode connection string and the Session mode connection string to setup environment variables in Step 5.

You can copy and paste these connection strings from the Supabase Dashboard when needed in later steps.

![pooled connection for redwoodjs](https://supabase.com/docs/img/guides/getting-started/quickstarts/redwoodjs/pooled-connection-strings.png)

3

### Create a RedwoodJS app

Create a RedwoodJS app with TypeScript.

The [`yarn` package manager](https://yarnpkg.com/) is required to create a RedwoodJS app. You will use it to run RedwoodJS commands later.

While TypeScript is recommended, If you want a JavaScript app, omit the `--ts` flag.

###### Terminal

```
1
yarn create redwood-app my-app --ts
```

4

### Open your RedwoodJS app in VS Code

You'll develop your app, manage database migrations, and run your app in VS Code.

###### Terminal

```
1
cd my-app
2
code .
```

5

### Configure Environment Variables

In your `.env` file, add the following environment variables for your database connection:

- The `DATABASE_URL` should use the Transaction mode connection string you copied in Step 1.

- The `DIRECT_URL` should use the Session mode connection string you copied in Step 1.


###### .env

```
1
# Transaction mode connection string used for migrations
2
DATABASE_URL="postgres://postgres.[project-ref]:[db-password]@xxx.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
3

4
# Session mode connection string — used by Prisma Client
5
DIRECT_URL="postgres://postgres.[project-ref]:[db-password]@xxx.pooler.supabase.com:5432/postgres"
```

6

### Update your Prisma Schema

By default, RedwoodJS ships with a SQLite database, but we want to use Postgres.

Update your Prisma schema file `api/db/schema.prisma` to use your Supabase Postgres database connection environment variables you setup in Step 5.

###### api/db/schema.prisma

```
1
datasource db {
2
  provider  = "postgresql"
3
  url       = env("DATABASE_URL")
4
  directUrl = env("DIRECT_URL")
5
}
```

7

### Create the Instrument model and apply a schema migration

Create the Instrument model in `api/db/schema.prisma` and then run `yarn rw prisma migrate dev` from your terminal to apply the migration.

###### api/db/schema.prisma

```
1
model Instrument {
2
  id   Int    @id @default(autoincrement())
3
  name String @unique
4
}
```

8

### Update seed script

Let's seed the database with a few instruments.

Update the file `scripts/seeds.ts` to contain the following code:

###### scripts/seed.ts

```
1
import type { Prisma } from '@prisma/client'
2
import { db } from 'api/src/lib/db'
3

4
export default async () => {
5
  try {
6
    const data: Prisma.InstrumentCreateArgs['data'][] = [\
7\
      { name: 'dulcimer' },\
8\
      { name: 'harp' },\
9\
      { name: 'guitar' },\
10\
    ]
11

12
    console.log('Seeding instruments ...')
13

14
    const instruments = await db.instrument.createMany({ data })
15

16
    console.log('Done.', instruments)
17
  } catch (error) {
18
    console.error(error)
19
  }
20
}
```

9

### Seed your database

Run the seed database command to populate the `Instrument` table with the instruments you just created.

The reset database command `yarn rw prisma db reset` will recreate the tables and will also run the seed script.

###### Terminal

```
1
yarn rw prisma db seed
```

10

### Scaffold the Instrument UI

Now, we'll use RedwoodJS generators to scaffold a CRUD UI for the `Instrument` model.

###### Terminal

```
1
yarn rw g scaffold instrument
```

11

### Start the app

Start the app via `yarn rw dev`. A browser will open to the RedwoodJS Splash page.

![RedwoodJS Splash Page](https://supabase.com/docs/img/redwoodjs-qs-splash.png)

12

### View Books UI

Click on `/instruments` to visit [http://localhost:8910/instruments](http://localhost:8910/instruments) where should see the list of instruments.

You may now edit, delete, and add new books using the scaffolded UI.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/getting-started/quickstarts/redwoodjs.mdx)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)