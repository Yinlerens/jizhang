---
url: "https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs"
title: "Build a User Management App with Next.js | Supabase Docs"
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

Getting Started

1. [Start with Supabase](https://supabase.com/docs/guides/getting-started)
3. Web app demos
5. [Next.js](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

# Build a User Management App with Next.js

* * *

##### Explore drop-in UI components for your Supabase app.

UI components built on shadcn/ui that connect to Supabase via a single command.

[Explore Components](https://supabase.com/ui)

This tutorial demonstrates how to build a basic user management app. The app authenticates and identifies the user, stores their profile information in the database, and allows the user to log in, update their profile details, and upload a profile photo. The app uses:

- [Supabase Database](https://supabase.com/docs/guides/database) \- a Postgres database for storing your user data and [Row Level Security](https://supabase.com/docs/guides/auth#row-level-security) so data is protected and users can only access their own information.
- [Supabase Auth](https://supabase.com/docs/guides/auth) \- allow users to sign up and log in.
- [Supabase Storage](https://supabase.com/docs/guides/storage) \- allow users to upload a profile photo.

![Supabase User Management example](https://supabase.com/docs/img/user-management-demo.png)

If you get stuck while working through this guide, refer to the [full example on GitHub](https://github.com/supabase/supabase/tree/master/examples/user-management/nextjs-user-management).

## Project setup [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#project-setup)

Before you start building you need to set up the Database and API. You can do this by starting a new Project in Supabase and then creating a "schema" inside the database.

### Create a project [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#create-a-project)

1. [Create a new project](https://supabase.com/dashboard) in the Supabase Dashboard.
2. Enter your project details.
3. Wait for the new database to launch.

### Set up the database schema [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#set-up-the-database-schema)

Now set up the database schema. You can use the "User Management Starter" quickstart in the SQL Editor, or you can copy/paste the SQL from below and run it.

DashboardSQL

1. Go to the [SQL Editor](https://supabase.com/dashboard/project/_/sql) page in the Dashboard.
2. Click **User Management Starter** under the **Community > Quickstarts** tab.
3. Click **Run**.

You can pull the database schema down to your local project by running the `db pull` command. Read the [local development docs](https://supabase.com/docs/guides/cli/local-development#link-your-project) for detailed instructions.

```
1
supabase link --project-ref <project-id>
2
# You can get <project-id> from your project's dashboard URL: https://supabase.com/dashboard/project/<project-id>
3
supabase db pull
```

### Get API details [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#get-api-details)

Now that you've created some database tables, you are ready to insert data using the auto-generated API.

To do this, you need to get the Project URL and key from [the project **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=nextjs).

##### Changes to API keys

Supabase is changing the way keys work to improve project security and developer experience. You can [read the full announcement](https://github.com/orgs/supabase/discussions/29260), but in the transition period, you can use both the current `anon` and `service_role` keys and the new publishable key with the form `sb_publishable_xxx` which will replace the older keys.

In most cases, you can get the correct key from [the Project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=nextjs), but if you want a specific key, you can find all keys in [the API Keys section of a Project's Settings page](https://supabase.com/dashboard/project/_/settings/api-keys/):

- **For legacy keys**, copy the `anon` key for client-side operations and the `service_role` key for server-side operations from the **Legacy API Keys** tab.
- **For new keys**, open the **API Keys** tab, if you don't have a publishable key already, click **Create new API Keys**, and copy the value from the **Publishable key** section.

[Read the API keys docs](https://supabase.com/docs/guides/api/api-keys) for a full explanation of all key types and their uses.

## Building the app [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#building-the-app)

Start building the Next.js app from scratch.

### Initialize a Next.js app [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#initialize-a-nextjs-app)

Use [`create-next-app`](https://nextjs.org/docs/getting-started) to initialize an app called `supabase-nextjs`:

```
1
npx create-next-app@latest --ts --use-npm supabase-nextjs
2
cd supabase-nextjs
```

Then install the Supabase client library: [supabase-js](https://github.com/supabase/supabase-js)

```
1
npm install @supabase/supabase-js
```

Save the environment variables in a `.env.local` file at the root of the project, and paste the API URL and the key that you copied [earlier](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#get-api-details).

```
1
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
2
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

### App styling (optional) [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#app-styling-optional)

An optional step is to update the CSS file `app/globals.css` to make the app look nice.
You can find the full contents of this file [in the example repository](https://raw.githubusercontent.com/supabase/supabase/master/examples/user-management/nextjs-user-management/app/globals.css).

### Supabase Server-Side Auth [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#supabase-server-side-auth)

Next.js is a highly versatile framework offering pre-rendering at build time (SSG), server-side rendering at request time (SSR), API routes, and proxy edge-functions.

To better integrate with the framework, we've created the `@supabase/ssr` package for Server-Side Auth. It has all the functionalities to quickly configure your Supabase project to use cookies for storing user sessions. Read the [Next.js Server-Side Auth guide](https://supabase.com/docs/guides/auth/server-side/nextjs) for more information.

Install the package for Next.js.

```
1
npm install @supabase/ssr
```

### Supabase utilities [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#supabase-utilities)

There are two different types of clients in Supabase:

1. **Client Component client** \- To access Supabase from Client Components, which run in the browser.
2. **Server Component client** \- To access Supabase from Server Components, Server Actions, and Route Handlers, which run only on the server.

It is recommended to create the following essential utilities files for creating clients, and organize them within `lib/supabase` at the root of the project.

Create a `client.ts` and a `server.ts` with the following functionalities for client-side Supabase and server-side Supabase, respectively.

lib/supabase/client.tslib/supabase/server.ts

```
1
import { createBrowserClient } from "@supabase/ssr";
2

3
export function createClient() {
4
  // Create a supabase client on the browser with project's credentials
5
  return createBrowserClient(
6
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
7
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
8
  );
9
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/lib/supabase/client.ts)

### Next.js proxy [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#nextjs-proxy)

Since Server Components can't write cookies, you need [Proxy](https://nextjs.org/docs/app/getting-started/proxy) to refresh expired Auth tokens and store them. This is accomplished by:

- Refreshing the Auth token with the call to `supabase.auth.getUser`.
- Passing the refreshed Auth token to Server Components through `request.cookies.set`, so they don't attempt to refresh the same token themselves.
- Passing the refreshed Auth token to the browser, so it replaces the old token. This is done with `response.cookies.set`.

You could also add a matcher, so that the Proxy only runs on routes that access Supabase. For more information, read [the Next.js matcher documentation](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher).

Be careful when protecting pages. The server gets the user session from the cookies, which anyone can spoof.

Always use `supabase.auth.getUser()` to protect pages and user data.

_Never_ trust `supabase.auth.getSession()` inside server code such as proxy. It isn't guaranteed to revalidate the Auth token.

It's safe to trust `getUser()` because it sends a request to the Supabase Auth server every time to revalidate the Auth token.

Create a `proxy.ts` file at the project root and another one within the `lib/supabase` folder. The `lib/supabase` file contains the logic for updating the session. This is used by the `proxy.ts` file, which is a Next.js convention.

proxy.tslib/supabase/proxy.ts

```
1
import { type NextRequest } from 'next/server'
2
import { updateSession } from '@/lib/supabase/proxy'
3

4
export async function proxy(request: NextRequest) {
5
  // update user's auth session
6
  return await updateSession(request)
7
}
8

9
export const config = {
10
  matcher: [\
11\
    /*\
12\
     * Match all request paths except for the ones starting with:\
13\
     * - _next/static (static files)\
14\
     * - _next/image (image optimization files)\
15\
     * - favicon.ico (favicon file)\
16\
     * Feel free to modify this pattern to include more paths.\
17\
     */\
18\
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',\
19\
  ],
20
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/proxy.ts)

## Set up a login page [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#set-up-a-login-page)

### Login and signup form [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#login-and-signup-form)

In order to add login/signup page for your application:

Create a new folder named `login`, containing a `page.tsx` file with a login/signup form.

app/login/page.tsx

```
1
import { login, signup } from './actions'
2

3
export default function LoginPage() {
4
  return (
5
    <form>
6
      <label htmlFor="email">Email:</label>
7
      <input id="email" name="email" type="email" required />
8
      <label htmlFor="password">Password:</label>
9
      <input id="password" name="password" type="password" required />
10
      <button formAction={login}>Log in</button>
11
      <button formAction={signup}>Sign up</button>
12
    </form>
13
  )
14
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/app/login/page.tsx)

Next, you need to create the login/signup actions to hook up the form to the function. Which does the following:

- Retrieve the user's information.
- Send that information to Supabase as a signup request, which in turns sends a confirmation email.
- Handle any error that arises.

The `cookies` method is called before any calls to Supabase, which takes fetch calls out of Next.js's caching. This is important for authenticated data fetches, to ensure that users get access only to their own data.

Read the Next.js docs to learn more about [opting out of data caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching).

Create the `action.ts` file in the `app/login` folder, which contains the login and signup functions and the `error/page.tsx` file, which displays an error message if the login or signup fails.

app/login/actions.tsapp/error/page.tsx

```
1
'use server'
2

3
import { revalidatePath } from 'next/cache'
4
import { redirect } from 'next/navigation'
5

6
import { createClient } from '@/lib/supabase/server'
7

8
export async function login(formData: FormData) {
9
  const supabase = await createClient()
10

11
  // type-casting here for convenience
12
  // in practice, you should validate your inputs
13
  const data = {
14
    email: formData.get('email') as string,
15
    password: formData.get('password') as string,
16
  }
17

18
  const { error } = await supabase.auth.signInWithPassword(data)
19

20
  if (error) {
21
    redirect('/error')
22
  }
23

24
  revalidatePath('/', 'layout')
25
  redirect('/account')
26
}
27

28
export async function signup(formData: FormData) {
29
  const supabase = await createClient()
30

31
  // type-casting here for convenience
32
  // in practice, you should validate your inputs
33
  const data = {
34
    email: formData.get('email') as string,
35
    password: formData.get('password') as string,
36
  }
37

38
  const { error } = await supabase.auth.signUp(data)
39

40
  if (error) {
41
    redirect('/error')
42
  }
43

44
  revalidatePath('/', 'layout')
45
  redirect('/account')
46
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/app/login/actions.ts)

### Email template [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#email-template)

Before proceeding, change the email template to support support a server-side authentication flow that sends a token hash:

- Go to the [Auth templates](https://supabase.com/dashboard/project/_/auth/templates) page in your dashboard.
- Select the **Confirm signup** template.
- Change `{{ .ConfirmationURL }}` to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`.

**Did you know?** You can also customize other emails sent out to new users, including the email's looks, content, and query parameters. Check out the [settings of your project](https://supabase.com/dashboard/project/_/auth/templates).

### Confirmation endpoint [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#confirmation-endpoint)

As you are working in a server-side rendering (SSR) environment, you need to create a server endpoint responsible for exchanging the `token_hash` for a session.

The code performs the following steps:

- Retrieves the code sent back from the Supabase Auth server using the `token_hash` query parameter.
- Exchanges this code for a session, which you store in your chosen storage mechanism (in this case, cookies).
- Finally, redirects the user to the `account` page.

###### app/auth/confirm/route.ts

```
1
import { type EmailOtpType } from '@supabase/supabase-js'
2
import { type NextRequest, NextResponse } from 'next/server'
3
import { createClient } from '@/lib/supabase/server'
4

5
// Creating a handler to a GET request to route /auth/confirm
6
export async function GET(request: NextRequest) {
7
  const { searchParams } = new URL(request.url)
8
  const token_hash = searchParams.get('token_hash')
9
  const type = searchParams.get('type') as EmailOtpType | null
10
  const next = '/account'
11

12
  // Create redirect link without the secret token
13
  const redirectTo = request.nextUrl.clone()
14
  redirectTo.pathname = next
15
  redirectTo.searchParams.delete('token_hash')
16
  redirectTo.searchParams.delete('type')
17

18
  if (token_hash && type) {
19
    const supabase = await createClient()
20

21
    const { error } = await supabase.auth.verifyOtp({
22
      type,
23
      token_hash,
24
    })
25
    if (!error) {
26
      redirectTo.searchParams.delete('next')
27
      return NextResponse.redirect(redirectTo)
28
    }
29
  }
30

31
  // return the user to an error page with some instructions
32
  redirectTo.pathname = '/error'
33
  return NextResponse.redirect(redirectTo)
34
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/app/auth/confirm/route.ts)

### Account page [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#account-page)

After a user signs in, allow them to edit their profile details and manage their account.

Create a new component for that called `AccountForm` within the `app/account` folder.

###### app/account/account-form.tsx

```
1
'use client'
2
import { useCallback, useEffect, useState } from 'react'
3
import { createClient } from '@/lib/supabase/client'
4
import { type User } from '@supabase/supabase-js'
5

6
// ...
7

8
export default function AccountForm({ user }: { user: User | null }) {
9
  const supabase = createClient()
10
  const [loading, setLoading] = useState(true)
11
  const [fullname, setFullname] = useState<string | null>(null)
12
  const [username, setUsername] = useState<string | null>(null)
13
  const [website, setWebsite] = useState<string | null>(null)
14
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
15

16
  const getProfile = useCallback(async () => {
17
    try {
18
      setLoading(true)
19

20
      const { data, error, status } = await supabase
21
        .from('profiles')
22
        .select(`full_name, username, website, avatar_url`)
23
        .eq('id', user?.id)
24
        .single()
25

26
      if (error && status !== 406) {
27
        console.log(error)
28
        throw error
29
      }
30

31
      if (data) {
32
        setFullname(data.full_name)
33
        setUsername(data.username)
34
        setWebsite(data.website)
35
        setAvatarUrl(data.avatar_url)
36
      }
37
    } catch (error) {
38
      alert('Error loading user data!')
39
    } finally {
40
      setLoading(false)
41
    }
42
  }, [user, supabase])
43

44
  useEffect(() => {
45
    getProfile()
46
  }, [user, getProfile])
47

48
  async function updateProfile({
49
    username,
50
    website,
51
    avatar_url,
52
  }: {
53
    username: string | null
54
    fullname: string | null
55
    website: string | null
56
    avatar_url: string | null
57
  }) {
58
    try {
59
      setLoading(true)
60

61
      const { error } = await supabase.from('profiles').upsert({
62
        id: user?.id as string,
63
        full_name: fullname,
64
        username,
65
        website,
66
        avatar_url,
67
        updated_at: new Date().toISOString(),
68
      })
69
      if (error) throw error
70
      alert('Profile updated!')
71
    } catch (error) {
72
      alert('Error updating the data!')
73
    } finally {
74
      setLoading(false)
75
    }
76
  }
77

78
  return (
79
    <div className="form-widget">
80

81
      {/* ... */}
82

83
      <div>
84
        <label htmlFor="email">Email</label>
85
        <input id="email" type="text" value={user?.email} disabled />
86
      </div>
87
      <div>
88
        <label htmlFor="fullName">Full Name</label>
89
        <input
90
          id="fullName"
91
          type="text"
92
          value={fullname || ''}
93
          onChange={(e) => setFullname(e.target.value)}
94
        />
95
      </div>
96
      <div>
97
        <label htmlFor="username">Username</label>
98
        <input
99
          id="username"
100
          type="text"
101
          value={username || ''}
102
          onChange={(e) => setUsername(e.target.value)}
103
        />
104
      </div>
105
      <div>
106
        <label htmlFor="website">Website</label>
107
        <input
108
          id="website"
109
          type="url"
110
          value={website || ''}
111
          onChange={(e) => setWebsite(e.target.value)}
112
        />
113
      </div>
114

115
      <div>
116
        <button
117
          className="button primary block"
118
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
119
          disabled={loading}
120
        >
121
          {loading ? 'Loading ...' : 'Update'}
122
        </button>
123
      </div>
124

125
      <div>
126
        <form action="/auth/signout" method="post">
127
          <button className="button block" type="submit">
128
            Sign out
129
          </button>
130
        </form>
131
      </div>
132
    </div>
133
  )
134
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/app/account/account-form.tsx)

Create an account page for the `AccountForm` component you just created

###### app/account/page.tsx

```
1
import AccountForm from './account-form'
2
import { createClient } from '@/lib/supabase/server'
3

4
export default async function Account() {
5
  const supabase = await createClient()
6

7
  const {
8
    data: { user },
9
  } = await supabase.auth.getUser()
10

11
  return <AccountForm user={user} />
12
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/app/account/page.tsx)

### Sign out [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#sign-out)

Create a route handler to handle the sign out from the server side, making sure to check if the user is logged in first.

###### app/auth/signout/route.ts

```
1
import { createClient } from "@/lib/supabase/server";
2
import { revalidatePath } from "next/cache";
3
import { type NextRequest, NextResponse } from "next/server";
4

5
export async function POST(req: NextRequest) {
6
  const supabase = await createClient();
7

8
  // Check if a user's logged in
9
  const {
10
    data: { user },
11
  } = await supabase.auth.getUser();
12

13
  if (user) {
14
    await supabase.auth.signOut();
15
  }
16

17
  revalidatePath("/", "layout");
18
  return NextResponse.redirect(new URL("/login", req.url), {
19
    status: 302,
20
  });
21
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/app/auth/signout/route.ts)

### Launch [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#launch)

Now you have all the pages, route handlers, and components in place, run the following in a terminal window:

```
1
npm run dev
```

And then open the browser to [localhost:3000/login](http://localhost:3000/login) and you should see the completed app.

When you enter your email and password, you will receive an email with the title **Confirm Your Signup**. Congrats 🎉!!!

## Bonus: Profile photos [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#bonus-profile-photos)

Every Supabase project is configured with [Storage](https://supabase.com/docs/guides/storage) for managing large files like
photos and videos.

### Create an upload widget [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#create-an-upload-widget)

Create an avatar widget for the user so that they can upload a profile photo. Start by creating a new component:

###### app/account/avatar.tsx

```
1
'use client'
2
import React, { useEffect, useState } from 'react'
3
import { createClient } from '@/lib/supabase/client'
4
import Image from 'next/image'
5

6
export default function Avatar({
7
  uid,
8
  url,
9
  size,
10
  onUpload,
11
}: {
12
  uid: string | null
13
  url: string | null
14
  size: number
15
  onUpload: (url: string) => void
16
}) {
17
  const supabase = createClient()
18
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
19
  const [uploading, setUploading] = useState(false)
20

21
  useEffect(() => {
22
    async function downloadImage(path: string) {
23
      try {
24
        const { data, error } = await supabase.storage.from('avatars').download(path)
25
        if (error) {
26
          throw error
27
        }
28

29
        const url = URL.createObjectURL(data)
30
        setAvatarUrl(url)
31
      } catch (error) {
32
        console.log('Error downloading image: ', error)
33
      }
34
    }
35

36
    if (url) downloadImage(url)
37
  }, [url, supabase])
38

39
  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
40
    try {
41
      setUploading(true)
42

43
      if (!event.target.files || event.target.files.length === 0) {
44
        throw new Error('You must select an image to upload.')
45
      }
46

47
      const file = event.target.files[0]
48
      const fileExt = file.name.split('.').pop()
49
      const filePath = `${uid}-${Math.random()}.${fileExt}`
50

51
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
52

53
      if (uploadError) {
54
        throw uploadError
55
      }
56

57
      onUpload(filePath)
58
    } catch (error) {
59
      alert('Error uploading avatar!')
60
    } finally {
61
      setUploading(false)
62
    }
63
  }
64

65
  return (
66
    <div>
67
      {avatarUrl ? (
68
        <Image
69
          width={size}
70
          height={size}
71
          src={avatarUrl}
72
          alt="Avatar"
73
          className="avatar image"
74
          style={{ height: size, width: size }}
75
        />
76
      ) : (
77
        <div className="avatar no-image" style={{ height: size, width: size }} />
78
      )}
79
      <div style={{ width: size }}>
80
        <label className="button primary block" htmlFor="single">
81
          {uploading ? 'Uploading ...' : 'Upload'}
82
        </label>
83
        <input
84
          style={{
85
            visibility: 'hidden',
86
            position: 'absolute',
87
          }}
88
          type="file"
89
          id="single"
90
          accept="image/*"
91
          onChange={uploadAvatar}
92
          disabled={uploading}
93
        />
94
      </div>
95
    </div>
96
  )
97
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/app/account/avatar.tsx)

### Add the new widget [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#add-the-new-widget)

Then add the widget to the `AccountForm` component:

###### app/account/account-form.tsx

```
1
// ...
2

3
import Avatar from './avatar'
4

5
  // ...
6

7
  return (
8
    <div className="form-widget">
9
      <Avatar
10
        uid={user?.id ?? null}
11
        url={avatar_url}
12
        size={150}
13
        onUpload={(url) => {
14
          setAvatarUrl(url)
15
          updateProfile({ fullname, username, website, avatar_url: url })
16
        }}
17
      />
18

19
    {/* ... */}
20

21
    </div>
22
  )
23
}
```

[View source](https://github.com/supabase/supabase/blob/f98cf908b1cd90dde2395d82aa730c423e450351/examples/user-management/nextjs-user-management/app/account/account-form.tsx)

At this stage you have a fully functional application!

## See also [\#](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs\#see-also)

- See the complete [example on GitHub](https://github.com/supabase/supabase/tree/master/examples/user-management/nextjs-user-management) and deploy it to Vercel
- [Build a Twitter Clone with the Next.js App Router and Supabase - free egghead course](https://egghead.io/courses/build-a-twitter-clone-with-the-next-js-app-router-and-supabase-19bebadb)
- Explore the [pre-built Auth components](https://supabase.com/ui/docs/nextjs/password-based-auth)
- Explore the [Supabase Cache Helpers](https://github.com/psteinroe/supabase-cache-helpers)
- See the [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments) template on GitHub

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/getting-started/tutorials/with-nextjs.mdx)

### Is this helpful?

NoYes

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)