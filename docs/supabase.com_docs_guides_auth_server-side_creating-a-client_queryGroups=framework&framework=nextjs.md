---
url: "https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs"
title: "Creating a Supabase client for SSR | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs)

[Overview](https://supabase.com/docs/guides/auth)

[Architecture](https://supabase.com/docs/guides/auth/architecture)

Getting Started[Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
[React](https://supabase.com/docs/guides/auth/quickstarts/react)
[React Native](https://supabase.com/docs/guides/auth/quickstarts/react-native)
[React Native with Expo & Social Auth](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth)

Concepts[Users](https://supabase.com/docs/guides/auth/users)
[Identities](https://supabase.com/docs/guides/auth/identities)

Sessions

Flows (How-tos)

Server-Side Rendering

[Creating a client](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
[Migrating from Auth Helpers](https://supabase.com/docs/guides/auth/server-side/migrating-to-ssr-from-auth-helpers)
[Advanced guide](https://supabase.com/docs/guides/auth/server-side/advanced-guide)

[Password-based](https://supabase.com/docs/guides/auth/passwords)
[Email (Magic Link or OTP)](https://supabase.com/docs/guides/auth/auth-email-passwordless)
[Phone Login](https://supabase.com/docs/guides/auth/phone-login)

Social Login (OAuth)

Enterprise SSO

[Anonymous Sign-Ins](https://supabase.com/docs/guides/auth/auth-anonymous)
[Web3 (Ethereum or Solana)](https://supabase.com/docs/guides/auth/auth-web3)
[Mobile Deep Linking](https://supabase.com/docs/guides/auth/native-mobile-deep-linking)
[Identity Linking](https://supabase.com/docs/guides/auth/auth-identity-linking)

Multi-Factor Authentication

[Signout](https://supabase.com/docs/guides/auth/signout)

Debugging[Error Codes](https://supabase.com/docs/guides/auth/debugging/error-codes)
[Troubleshooting](https://supabase.com/docs/guides/auth/troubleshooting)

OAuth 2.1 Server[Overview](https://supabase.com/docs/guides/auth/oauth-server)
[Getting Started](https://supabase.com/docs/guides/auth/oauth-server/getting-started)
[OAuth Flows](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows)
[MCP Authentication](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication)
[Token Security & RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security)

Third-party auth[Overview](https://supabase.com/docs/guides/auth/third-party/overview)
[Clerk](https://supabase.com/docs/guides/auth/third-party/clerk)
[Firebase Auth](https://supabase.com/docs/guides/auth/third-party/firebase-auth)
[Auth0](https://supabase.com/docs/guides/auth/third-party/auth0)
[AWS Cognito (Amplify)](https://supabase.com/docs/guides/auth/third-party/aws-cognito)
[WorkOS](https://supabase.com/docs/guides/auth/third-party/workos)

Configuration[General Configuration](https://supabase.com/docs/guides/auth/general-configuration)
[Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
[Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)

Auth Hooks

[Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp)
[User Management](https://supabase.com/docs/guides/auth/managing-user-data)

Security[Password Security](https://supabase.com/docs/guides/auth/password-security)
[Rate Limits](https://supabase.com/docs/guides/auth/rate-limits)
[Bot Detection (CAPTCHA)](https://supabase.com/docs/guides/auth/auth-captcha)
[Audit Logs](https://supabase.com/docs/guides/auth/audit-logs)

JSON Web Tokens (JWT)

[JWT Signing Keys](https://supabase.com/docs/guides/auth/signing-keys)
[Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
[Column Level Security](https://supabase.com/docs/guides/database/postgres/column-level-security)
[Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)

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

Auth

1. Auth
3. More
5. [Server-Side Rendering](https://supabase.com/docs/guides/auth/server-side)
7. [Creating a client](https://supabase.com/docs/guides/auth/server-side/creating-a-client)

# Creating a Supabase client for SSR

## Configure your Supabase client to use cookies

* * *

To use Server-Side Rendering (SSR) with Supabase, you need to configure your Supabase client to use cookies. The `@supabase/ssr` package helps you do this for JavaScript/TypeScript applications.

## Install [\#](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs\#install)

Install the `@supabase/supabase-js` and `@supabase/ssr` helper packages:

npmyarnpnpm

```
1
npm install @supabase/supabase-js @supabase/ssr
```

## Set environment variables [\#](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs\#set-environment-variables)

Create a `.env.local` file in the project root directory. In the file, set the project's Supabase URL and Key:

###### Project URL

No project found

To get your Project URL, [log in](https://supabase.com/dashboard).

###### Publishable key

No project found

To get your Publishable key, [log in](https://supabase.com/dashboard).

###### Anon key

No project found

To get your Anon key, [log in](https://supabase.com/dashboard).

You can also get the Project URL and key from [the project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=nextjs).

##### Changes to API keys

Supabase is changing the way keys work to improve project security and developer experience. You can [read the full announcement](https://github.com/orgs/supabase/discussions/29260), but in the transition period, you can use both the current `anon` and `service_role` keys and the new publishable key with the form `sb_publishable_xxx` which will replace the older keys.

In most cases, you can get the correct key from [the Project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=nextjs), but if you want a specific key, you can find all keys in [the API Keys section of a Project's Settings page](https://supabase.com/dashboard/project/_/settings/api-keys/):

- **For legacy keys**, copy the `anon` key for client-side operations and the `service_role` key for server-side operations from the **Legacy API Keys** tab.
- **For new keys**, open the **API Keys** tab, if you don't have a publishable key already, click **Create new API Keys**, and copy the value from the **Publishable key** section.

[Read the API keys docs](https://supabase.com/docs/guides/api/api-keys) for a full explanation of all key types and their uses.

Next.jsSvelteKitAstroRemixReact RouterExpressHono

```
1
NEXT_PUBLIC_SUPABASE_URL=supabase_project_url
2
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=supabase_publishable_key
```

## Create a client [\#](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs\#create-a-client)

You need setup code to configure a Supabase client to use cookies. Once you have the utility code, you can use the `createClient` utility functions to get a properly configured Supabase client.

Use the browser client in code that runs on the browser, and the server client in code that runs on the server.

Next.jsSvelteKitAstroRemixReact RouterExpressHono

### Write utility functions to create Supabase clients [\#](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs\#write-utility-functions-to-create-supabase-clients)

To access Supabase from a Next.js app, you need 2 types of Supabase clients:

1. **Client Component client** \- To access Supabase from Client Components, which run in the browser.
2. **Server Component client** \- To access Supabase from Server Components, Server Actions, and Route Handlers, which run only on the server.

Since Next.js Server Components can't write cookies, you need a [Proxy](https://nextjs.org/docs/app/getting-started/proxy) to refresh expired Auth tokens and store them.

The Proxy is responsible for:

1. Refreshing the Auth token by calling `supabase.auth.getClaims()`.
2. Passing the refreshed Auth token to Server Components, so they don't attempt to refresh the same token themselves. This is accomplished with `request.cookies.set`.
3. Passing the refreshed Auth token to the browser, so it replaces the old token. This is accomplished with `response.cookies.set`.

What does the \`cookies\` object do?

Do I need to create a new client for every route?

Create a `lib/supabase` folder at the root of your project, or inside the `./src` folder if you are using one, with a file for each type of client. Then copy the lib utility functions for each client type.

lib/supabase/client.tslib/supabase/server.ts

```
1
import { createBrowserClient } from '@supabase/ssr'
2

3
export function createClient() {
4
  return createBrowserClient(
5
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
6
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
7
  )
8
}
```

[View source](https://github.com/supabase/supabase/blob/2fbb6cb9a7d6fb0a10f74b0a421af33038e557c7/examples/auth/nextjs/lib/supabase/client.ts)

### Hook up proxy [\#](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs\#hook-up-proxy)

The code adds a [matcher](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher) so the Proxy doesn't run on routes that don't access Supabase.

Be careful when protecting pages. The server gets the user session from the cookies, which can be spoofed by anyone.

Always use `supabase.auth.getClaims()` to protect pages and user data.

_Never_ trust `supabase.auth.getSession()` inside server code such as Proxy. It isn't guaranteed to revalidate the Auth token.

It's safe to trust `getClaims()` because it validates the JWT signature against the project's published public keys every time.

proxy.tslib/supabase/proxy.ts

```
1
import { type NextRequest } from "next/server"
2
import { updateSession } from "@/lib/supabase/proxy"
3

4
export async function proxy(request: NextRequest) {
5
  return await updateSession(request)
6
}
7

8
export const config = {
9
  matcher: [\
10\
    /*\
11\
     * Match all request paths except for the ones starting with:\
12\
     * - _next/static (static files)\
13\
     * - _next/image (image optimization files)\
14\
     * - favicon.ico (favicon file)\
15\
     * Feel free to modify this pattern to include more paths.\
16\
     */\
17\
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",\
18\
  ],
19
}
```

[View source](https://github.com/supabase/supabase/blob/2fbb6cb9a7d6fb0a10f74b0a421af33038e557c7/examples/auth/nextjs/proxy.ts)

## Congratulations [\#](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs\#congratulations)

You're done! To recap, you've successfully:

- Called Supabase from a Server Action.
- Called Supabase from a Server Component.
- Set up a Supabase client utility to call Supabase from a Client Component. You can use this if you need to call Supabase from a Client Component, for example to set up a realtime subscription.
- Set up Proxy to automatically refresh the Supabase Auth session.

You can now use any Supabase features from your client or server code!

## Next steps [\#](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs\#next-steps)

- Implement [Authentication using Email and Password](https://supabase.com/docs/guides/auth/server-side/email-based-auth-with-pkce-flow-for-ssr)
- Implement [Authentication using OAuth](https://supabase.com/docs/guides/auth/server-side/oauth-with-pkce-flow-for-ssr)
- [Learn more about SSR](https://supabase.com/docs/guides/auth/server-side-rendering)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/server-side/creating-a-client.mdx)

### Is this helpful?

NoYes

### On this page

[Install](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs#install) [Set environment variables](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs#set-environment-variables) [Create a client](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs#create-a-client) [Write utility functions to create Supabase clients](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs#write-utility-functions-to-create-supabase-clients) [Hook up proxy](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs#hook-up-proxy) [Congratulations](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs#congratulations) [Next steps](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs#next-steps)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)