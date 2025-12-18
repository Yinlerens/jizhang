---
url: "https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native"
title: "Use Supabase with Expo React Native | Supabase Docs"
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
5. [Expo React Native](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native)

# Use Supabase with Expo React Native

## Learn how to create a Supabase project, add some sample data to your database, and query the data from an Expo app.

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

### Create an Expo app

Create a minimal Expo app using the `create-expo-app` command with the blank TypeScript template.

##### Explore drop-in UI components for your Supabase app.

UI components built on shadcn/ui that connect to Supabase via a single command.

[Explore Components](https://supabase.com/ui)

###### Terminal

```
1
npx create-expo-app my-app --template blank-typescript
```

3

### Install the Supabase client library

The fastest way to get started is to use the `@supabase/supabase-js` client library which provides a convenient interface for working with Supabase from a React Native app.

Navigate to the Expo app and install `supabase-js` along with the required dependencies for secure storage and URL handling.

###### Terminal

```
1
cd my-app && npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

4

### Declare Supabase Environment Variables

Create a `.env` file in the root of your project and populate it with your Supabase connection variables.

Expo requires environment variables to be prefixed with `EXPO_PUBLIC_` to be accessible in your app code.

###### Project URL

No project found

To get your Project URL, [log in](https://supabase.com/dashboard).

###### Publishable key

No project found

To get your Publishable key, [log in](https://supabase.com/dashboard).

###### Anon key

No project found

To get your Anon key, [log in](https://supabase.com/dashboard).

###### .env

```
1
EXPO_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
2
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<SUBSTITUTE_SUPABASE_PUBLISHABLE_KEY>
```

You can also get the Project URL and key from [the project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=&framework=).

##### Changes to API keys

Supabase is changing the way keys work to improve project security and developer experience. You can [read the full announcement](https://github.com/orgs/supabase/discussions/29260), but in the transition period, you can use both the current `anon` and `service_role` keys and the new publishable key with the form `sb_publishable_xxx` which will replace the older keys.

In most cases, you can get the correct key from [the Project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=&framework=), but if you want a specific key, you can find all keys in [the API Keys section of a Project's Settings page](https://supabase.com/dashboard/project/_/settings/api-keys/):

- **For legacy keys**, copy the `anon` key for client-side operations and the `service_role` key for server-side operations from the **Legacy API Keys** tab.
- **For new keys**, open the **API Keys** tab, if you don't have a publishable key already, click **Create new API Keys**, and copy the value from the **Publishable key** section.

[Read the API keys docs](https://supabase.com/docs/guides/api/api-keys) for a full explanation of all key types and their uses.

5

### Initialize the Supabase client

Create a helper file at `lib/supabase.ts` to initialize the Supabase client using the environment variables.

The code below uses [AsyncStorage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) to persist the user session in your app.

###### lib/supabase.ts

```
1
import 'react-native-url-polyfill/auto'
2
import { createClient } from '@supabase/supabase-js'
3
import AsyncStorage from '@react-native-async-storage/async-storage'
4

5
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
6
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
7

8
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
9
  auth: {
10
    storage: AsyncStorage,
11
    autoRefreshToken: true,
12
    persistSession: true,
13
    detectSessionInUrl: false,
14
  },
15
})
```

6

### Query data from the app

Replace the contents of `App.tsx` with the following code to fetch and display the instruments from your database.

Use `useEffect` to fetch the data when the component mounts and display the query result using React Native components.

###### App.tsx

```
1
import { useEffect, useState } from 'react'
2
import { StyleSheet, View, FlatList, Text } from 'react-native'
3
import { supabase } from './lib/supabase'
4

5
export default function App() {
6
  const [instruments, setInstruments] = useState([])
7

8
  useEffect(() => {
9
    getInstruments()
10
  }, [])
11

12
  async function getInstruments() {
13
    const { data } = await supabase.from('instruments').select()
14
    setInstruments(data)
15
  }
16

17
  return (
18
    <View style={styles.container}>
19
      <FlatList
20
        data={instruments}
21
        keyExtractor={(item) => item.id.toString()}
22
        renderItem={({ item }) => (
23
          <Text style={styles.item}>{item.name}</Text>
24
        )}
25
      />
26
    </View>
27
  )
28
}
29

30
const styles = StyleSheet.create({
31
  container: {
32
    flex: 1,
33
    backgroundColor: '#fff',
34
    paddingTop: 50,
35
    paddingHorizontal: 16,
36
  },
37
  item: {
38
    padding: 16,
39
    borderBottomWidth: 1,
40
    borderBottomColor: '#ccc',
41
  },
42
})
```

7

### Start the app

Run the development server and scan the QR code with the Expo Go app on your phone, or press `i` for iOS simulator or `a` for Android emulator.

###### Terminal

```
1
npx expo start
```

## Next steps [\#](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native\#next-steps)

- Set up [Auth](https://supabase.com/docs/guides/auth) for your app
- [Insert more data](https://supabase.com/docs/guides/database/import-data) into your database
- Upload and serve static files using [Storage](https://supabase.com/docs/guides/storage)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/getting-started/quickstarts/expo-react-native.mdx)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)