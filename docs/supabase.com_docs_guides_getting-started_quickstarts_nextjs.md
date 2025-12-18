---
url: "https://supabase.com/docs/guides/getting-started/quickstarts/nextjs"
title: "Use Supabase with Next.js | Supabase Docs"
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
5. [Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

# Use Supabase with Next.js

## Learn how to create a Supabase project, add some sample data, and query from a Next.js app.

* * *

1

### Create a Supabase project

Go to [database.new](https://database.new/) and create a new Supabase project.

Alternatively, you can create a project using the Management API:

```
1
# First, get your access token from https://supabase.com/dashboard/account/tokens
2
export SUPABASE_ACCESS_TOKEN="your-access-token"
3

4
# List your organizations to get the organization ID
5
curl -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
6
  https://api.supabase.com/v1/organizations
7

8
# Create a new project (replace <org-id> with your organization ID)
9
curl -X POST https://api.supabase.com/v1/projects \
10
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
11
  -H "Content-Type: application/json" \
12
  -d '{
13
    "organization_id": "<org-id>",
14
    "name": "My Project",
15
    "region": "us-east-1",
16
    "db_pass": "<your-secure-password>"
17
  }'
```

When your project is up and running, go to the [Table Editor](https://supabase.com/dashboard/project/_/editor), create a new table and insert some data.

Alternatively, you can run the following snippet in your project's [SQL Editor](https://supabase.com/dashboard/project/_/sql/new). This will create a `instruments` table with some sample data.

```
1
-- Create the table
2
create table instruments (
3
  id bigint primary key generated always as identity,
4
  name text not null
5
);
6
-- Insert some sample data into the table
7
insert into instruments (name)
8
values
9
  ('violin'),
10
  ('viola'),
11
  ('cello');
12

13
alter table instruments enable row level security;
```

Make the data in your table publicly readable by adding an RLS policy:

```
1
create policy "public can read instruments"
2
on public.instruments
3
for select to anon
4
using (true);
```

2

### Create a Next.js app

Use the `create-next-app` command and the `with-supabase` template, to create a Next.js app pre-configured with:

- [Cookie-based Auth](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=package-manager&package-manager=npm&queryGroups=framework&framework=nextjs&queryGroups=environment&environment=server)

- [TypeScript](https://www.typescriptlang.org/)

- [Tailwind CSS](https://tailwindcss.com/)







##### Explore drop-in UI components for your Supabase app.





UI components built on shadcn/ui that connect to Supabase via a single command.

[Explore Components](https://supabase.com/ui)


```
1
npx create-next-app -e with-supabase
```

3

### Declare Supabase Environment Variables

Rename `.env.example` to `.env.local` and populate with your Supabase connection variables:

###### Project URL

No project found

To get your Project URL, [log in](https://supabase.com/dashboard).

###### Publishable key

No project found

To get your Publishable key, [log in](https://supabase.com/dashboard).

###### Anon key

No project found

To get your Anon key, [log in](https://supabase.com/dashboard).

.env.local

```
1
NEXT_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
2
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<SUBSTITUTE_SUPABASE_PUBLISHABLE_KEY>
```

You can also get the Project URL and key from [the project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=nextjs).

##### Changes to API keys

Supabase is changing the way keys work to improve project security and developer experience. You can [read the full announcement](https://github.com/orgs/supabase/discussions/29260), but in the transition period, you can use both the current `anon` and `service_role` keys and the new publishable key with the form `sb_publishable_xxx` which will replace the older keys.

In most cases, you can get the correct key from [the Project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=nextjs), but if you want a specific key, you can find all keys in [the API Keys section of a Project's Settings page](https://supabase.com/dashboard/project/_/settings/api-keys/):

- **For legacy keys**, copy the `anon` key for client-side operations and the `service_role` key for server-side operations from the **Legacy API Keys** tab.
- **For new keys**, open the **API Keys** tab, if you don't have a publishable key already, click **Create new API Keys**, and copy the value from the **Publishable key** section.

[Read the API keys docs](https://supabase.com/docs/guides/api/api-keys) for a full explanation of all key types and their uses.

4

### Query Supabase data from Next.js

Create a new file at `app/instruments/page.tsx` and populate with the following.

This selects all the rows from the `instruments` table in Supabase and render them on the page.

app/instruments/page.tsx

```
1
import { createClient } from "@/lib/supabase/server";
2
import { Suspense } from "react";
3

4
async function InstrumentsData() {
5
  const supabase = await createClient();
6
  const { data: instruments } = await supabase.from("instruments").select();
7

8
  return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
9
}
10

11
export default function Instruments() {
12
  return (
13
    <Suspense fallback={<div>Loading instruments...</div>}>
14
      <InstrumentsData />
15
    </Suspense>
16
  );
17
}
```

5

### Start the app

Run the development server, go to [http://localhost:3000/instruments](http://localhost:3000/instruments) in a browser and you should see the list of instruments.

```
1
npm run dev
```

## Next steps [\#](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs\#next-steps)

- Set up [Auth](https://supabase.com/docs/guides/auth) for your app
- [Insert more data](https://supabase.com/docs/guides/database/import-data) into your database
- Upload and serve static files using [Storage](https://supabase.com/docs/guides/storage)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/getting-started/quickstarts/nextjs.mdx)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)