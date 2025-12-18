---
url: "https://supabase.com/docs/guides/getting-started/quickstarts/refine"
title: "Use Supabase with Refine | Supabase Docs"
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
5. [Refine](https://supabase.com/docs/guides/getting-started/quickstarts/refine)

# Use Supabase with Refine

## Learn how to create a Supabase project, add some sample data to your database, and query the data from a Refine app.

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

### Create a Refine app

Create a [Refine](https://github.com/refinedev/refine) app using the [create refine-app](https://refine.dev/docs/getting-started/quickstart/).

The `refine-supabase` preset adds `@refinedev/supabase` supplementary package that supports Supabase in a Refine app. `@refinedev/supabase` out-of-the-box includes the Supabase dependency: [supabase-js](https://github.com/supabase/supabase-js).

###### Terminal

```
1
npm create refine-app@latest -- --preset refine-supabase my-app
```

3

### Open your Refine app in VS Code

You will develop your app, connect to the Supabase backend and run the Refine app in VS Code.

###### Terminal

```
1
cd my-app
2
code .
```

4

### Start the app

Start the app, go to [http://localhost:5173](http://localhost:5173/) in a browser, and you should be greeted with the Refine Welcome page.

###### Terminal

```
1
npm run dev
```

![Refine welcome page](https://supabase.com/docs/img/refine-qs-welcome-page.png)

5

### Update \`supabaseClient\`

You now have to update the `supabaseClient` with the `SUPABASE_URL` and `SUPABASE_KEY` of your Supabase API. The `supabaseClient` is used in auth provider and data provider methods that allow the Refine app to connect to your Supabase backend.

###### Project URL

No project found

To get your Project URL, [log in](https://supabase.com/dashboard).

###### Publishable key

No project found

To get your Publishable key, [log in](https://supabase.com/dashboard).

###### Anon key

No project found

To get your Anon key, [log in](https://supabase.com/dashboard).

###### src/utility/supabaseClient.ts

```
1
import { createClient } from "@refinedev/supabase";
2

3
const SUPABASE_URL = YOUR_SUPABASE_URL;
4
const SUPABASE_KEY = YOUR_SUPABASE_KEY
5

6
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
7
  db: {
8
    schema: "public",
9
  },
10
  auth: {
11
    persistSession: true,
12
  },
13
});
```

You can also get the Project URL and key from [the project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=refine).

##### Changes to API keys

Supabase is changing the way keys work to improve project security and developer experience. You can [read the full announcement](https://github.com/orgs/supabase/discussions/29260), but in the transition period, you can use both the current `anon` and `service_role` keys and the new publishable key with the form `sb_publishable_xxx` which will replace the older keys.

In most cases, you can get the correct key from [the Project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=refine), but if you want a specific key, you can find all keys in [the API Keys section of a Project's Settings page](https://supabase.com/dashboard/project/_/settings/api-keys/):

- **For legacy keys**, copy the `anon` key for client-side operations and the `service_role` key for server-side operations from the **Legacy API Keys** tab.
- **For new keys**, open the **API Keys** tab, if you don't have a publishable key already, click **Create new API Keys**, and copy the value from the **Publishable key** section.

[Read the API keys docs](https://supabase.com/docs/guides/api/api-keys) for a full explanation of all key types and their uses.

6

### Add instruments resource and pages

You have to then configure resources and define pages for `instruments` resource.

Use the following command to automatically add resources and generate code for pages for `instruments` using Refine Inferencer.

This defines pages for `list`, `create`, `show` and `edit` actions inside the `src/pages/instruments/` directory with `<HeadlessInferencer />` component.

The `<HeadlessInferencer />` component depends on `@refinedev/react-table` and `@refinedev/react-hook-form` packages. In order to avoid errors, you should install them as dependencies with `npm install @refinedev/react-table @refinedev/react-hook-form`.

The `<HeadlessInferencer />` is a Refine Inferencer component that automatically generates necessary code for the `list`, `create`, `show` and `edit` pages.

More on [how the Inferencer works is available in the docs here](https://refine.dev/docs/packages/documentation/inferencer/).

###### Terminal

```
1
npm run refine create-resource instruments
```

7

### Add routes for instruments pages

Add routes for the `list`, `create`, `show`, and `edit` pages.

You should remove the `index` route for the Welcome page presented with the `<Welcome />` component.

###### src/App.tsx

```
1
import { Refine } from "@refinedev/core";
2
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
3
import routerProvider, {
4
  DocumentTitleHandler,
5
  NavigateToResource,
6
  UnsavedChangesNotifier,
7
} from "@refinedev/react-router";
8
import { dataProvider, liveProvider } from "@refinedev/supabase";
9
import { BrowserRouter, Route, Routes } from "react-router-dom";
10

11
import "./App.css";
12
import authProvider from "./authProvider";
13
import { supabaseClient } from "./utility";
14
import { InstrumentsCreate, InstrumentsEdit, InstrumentsList, InstrumentsShow } from "./pages/instruments";
15

16
function App() {
17
  return (
18
    <BrowserRouter>
19
      <RefineKbarProvider>
20
        <Refine
21
          dataProvider={dataProvider(supabaseClient)}
22
          liveProvider={liveProvider(supabaseClient)}
23
          authProvider={authProvider}
24
          routerProvider={routerProvider}
25
          options={{
26
            syncWithLocation: true,
27
            warnWhenUnsavedChanges: true,
28
          }}
29
          resources={[{\
30\
            name: "instruments",\
31\
            list: "/instruments",\
32\
            create: "/instruments/create",\
33\
            edit: "/instruments/edit/:id",\
34\
            show: "/instruments/show/:id"\
35\
          }]}>
36
          <Routes>
37
            <Route index
38
              element={<NavigateToResource resource="instruments" />}
39
            />
40
            <Route path="/instruments">
41
              <Route index element={<InstrumentsList />} />
42
              <Route path="create" element={<InstrumentsCreate />} />
43
              <Route path="edit/:id" element={<InstrumentsEdit />} />
44
              <Route path="show/:id" element={<InstrumentsShow />} />
45
            </Route>
46
          </Routes>
47
          <RefineKbar />
48
          <UnsavedChangesNotifier />
49
          <DocumentTitleHandler />
50
        </Refine>
51
      </RefineKbarProvider>
52
    </BrowserRouter>
53
  );
54
}
55

56
export default App;
```

8

### View instruments pages

Now you should be able to see the instruments pages along the `/instruments` routes. You may now edit and add new instruments using the Inferencer generated UI.

The Inferencer auto-generated code gives you a good starting point on which to keep building your `list`, `create`, `show` and `edit` pages. They can be obtained by clicking the `Show the auto-generated code` buttons in their respective pages.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/getting-started/quickstarts/refine.mdx)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)