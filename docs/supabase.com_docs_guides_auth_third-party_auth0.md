---
url: "https://supabase.com/docs/guides/auth/third-party/auth0"
title: "Auth0 | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/third-party/auth0)

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

Auth

1. Auth
3. Third-party auth
5. [Auth0](https://supabase.com/docs/guides/auth/third-party/auth0)

# Auth0

## Use Auth0 with your Supabase project

* * *

Auth0 can be used as a third-party authentication provider alongside Supabase Auth, or standalone, with your Supabase project.

## Getting started [\#](https://supabase.com/docs/guides/auth/third-party/auth0\#getting-started)

1. First you need to add an integration to connect your Supabase project with your Auth0 tenant. You will need your tenant ID (and in some cases region ID).
2. Add a new Third-party Auth integration in your project's [Authentication settings](https://supabase.com/dashboard/project/_/auth/third-party).
3. Assign the `role: 'authenticated'` custom claim to all JWTs by using an Auth0 Action.
4. Finally setup the Supabase client in your application.

## Setup the Supabase client library [\#](https://supabase.com/docs/guides/auth/third-party/auth0\#setup-the-supabase-client-library)

TypeScriptSwift (iOS)FlutterKotlin

```
1
import { createClient } from '@supabase/supabase-js'
2
import Auth0Client from '@auth0/auth0-spa-js'
3

4
const auth0 = new Auth0Client({
5
  domain: '<AUTH0_DOMAIN>',
6
  clientId: '<AUTH0_CLIENT_ID>',
7
  authorizationParams: {
8
    redirect_uri: '<MY_CALLBACK_URL>',
9
  },
10
})
11

12
const supabase = createClient(
13
  'https://<supabase-project>.supabase.co',
14
  'SUPABASE_PUBLISHABLE_KEY',
15
  {
16
    accessToken: async () => {
17
      const accessToken = await auth0.getTokenSilently()
18

19
      // Alternatively you can use (await auth0.getIdTokenClaims()).__raw to
20
      // use an ID token instead.
21

22
      return accessToken
23
    },
24
  }
25
)
```

## Add a new Third-Party Auth integration to your project [\#](https://supabase.com/docs/guides/auth/third-party/auth0\#add-a-new-third-party-auth-integration-to-your-project)

In the dashboard navigate to your project's [Authentication settings](https://supabase.com/dashboard/project/_/auth/third-party) and find the Third-Party Auth section to add a new integration.

In the CLI add the following config to your `supabase/config.toml` file:

```
1
[auth.third_party.auth0]
2
enabled = true
3
tenant = "<id>"
4
tenant_region = "<region>" # if your tenant has a region
```

## Use an Auth0 Action to assign the authenticated role [\#](https://supabase.com/docs/guides/auth/third-party/auth0\#use-an-auth0-action-to-assign-the-authenticated-role)

Your Supabase project inspects the `role` claim present in all JWTs sent to it, to assign the correct Postgres role when using the Data API, Storage or Realtime authorization.

By default, Auth0 JWTs (both access token and ID token) do not contain a `role` claim in them. If you were to send such a JWT to your Supabase project, the `anon` role would be assigned when executing the Postgres query. Most of your app's logic will be accessible by the `authenticated` role.

A recommended approach to do this is to configure the [`onExecutePostLogin` Auth0 Action](https://auth0.com/docs/secure/tokens/json-web-tokens/create-custom-claims#create-custom-claims) which will add the custom claim:

```
1
exports.onExecutePostLogin = async (event, api) => {
2
  api.accessToken.setCustomClaim('role', 'authenticated')
3
}
```

## Limitations [\#](https://supabase.com/docs/guides/auth/third-party/auth0\#limitations)

At this time, Auth0 tenants with the following [signing algorithms](https://auth0.com/docs/get-started/applications/signing-algorithms) are not supported:

- HS256 (HMAC with SHA-256) -- also known as symmetric JWTs
- PS256 (RSA-PSS with SHA-256)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/third-party/auth0.mdx)

### Is this helpful?

NoYes

### On this page

[Getting started](https://supabase.com/docs/guides/auth/third-party/auth0#getting-started) [Setup the Supabase client library](https://supabase.com/docs/guides/auth/third-party/auth0#setup-the-supabase-client-library) [Add a new Third-Party Auth integration to your project](https://supabase.com/docs/guides/auth/third-party/auth0#add-a-new-third-party-auth-integration-to-your-project) [Use an Auth0 Action to assign the authenticated role](https://supabase.com/docs/guides/auth/third-party/auth0#use-an-auth0-action-to-assign-the-authenticated-role) [Limitations](https://supabase.com/docs/guides/auth/third-party/auth0#limitations)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)