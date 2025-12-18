---
url: "https://supabase.com/docs/guides/auth/third-party/workos"
title: "WorkOS | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/third-party/workos)

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

[Sign up](https://supabase.com/dashboard)

Auth

1. Auth
3. Third-party auth
5. [WorkOS](https://supabase.com/docs/guides/auth/third-party/workos)

# WorkOS

## Use WorkOS with your Supabase project

* * *

WorkOS can be used as a third-party authentication provider alongside Supabase Auth, or standalone, with your Supabase project.

## Getting started [\#](https://supabase.com/docs/guides/auth/third-party/workos\#getting-started)

1. First you need to add an integration to connect your Supabase project with your WorkOS tenant. You will need your WorkOS issuer. The issuer is `https://api.workos.com/user_management/<your-client-id>`. Substitute your [custom auth domain](https://workos.com/docs/custom-domains/auth-api) for "api.workos.com" if configured.
2. Add a new Third-party Auth integration in your project's [Authentication settings](https://supabase.com/dashboard/project/_/auth/third-party).
3. Set up a JWT template to assign the `role: 'authenticated'` claim to your access token.

## Setup the Supabase client library [\#](https://supabase.com/docs/guides/auth/third-party/workos\#setup-the-supabase-client-library)

TypeScript

```
1
import { createClient } from '@supabase/supabase-js'
2
import { createClient as createAuthKitClient } from '@workos-inc/authkit-js'
3

4
const authkit = await createAuthKitClient('WORKOS_CLIENT_ID', {
5
  apiHostname: '<WORKOS_AUTH_DOMAIN>',
6
})
7

8
const supabase = createClient(
9
  'https://<supabase-project>.supabase.co',
10
  'SUPABASE_PUBLISHABLE_KEY',
11
  {
12
    accessToken: async () => {
13
      return authkit.getAccessToken()
14
    },
15
  }
16
)
```

## Add a new Third-Party Auth integration to your project [\#](https://supabase.com/docs/guides/auth/third-party/workos\#add-a-new-third-party-auth-integration-to-your-project)

In the dashboard navigate to your project's [Authentication settings](https://supabase.com/dashboard/project/_/auth/third-party) and find the Third-Party Auth section to add a new integration.

## Set up a JWT template to add the authenticated role. [\#](https://supabase.com/docs/guides/auth/third-party/workos\#set-up-a-jwt-template-to-add-the-authenticated-role)

Your Supabase project inspects the `role` claim present in all JWTs sent to it, to assign the correct Postgres role when using the Data API, Storage or Realtime authorization.

WorkOS JWTs already contain a `role` claim that corresponds to the user's role in their organization. It is necessary to adjust the `role` claim to be `"authenticated"` like Supabase expects. This can be done using JWT templates (navigate to Authentication -> Sessions -> JWT Template in the WorkOS Dashboard).

This template overrides the `role` claim to meet Supabase's expectations, and adds the WorkOS role in a new `user_role` claim:

```
1
{
2
  "role": "authenticated",
3
  "user_role": {{organization_membership.role}}
4
}
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/third-party/workos.mdx)

### Is this helpful?

NoYes

### On this page

[Getting started](https://supabase.com/docs/guides/auth/third-party/workos#getting-started) [Setup the Supabase client library](https://supabase.com/docs/guides/auth/third-party/workos#setup-the-supabase-client-library) [Add a new Third-Party Auth integration to your project](https://supabase.com/docs/guides/auth/third-party/workos#add-a-new-third-party-auth-integration-to-your-project) [Set up a JWT template to add the authenticated role.](https://supabase.com/docs/guides/auth/third-party/workos#set-up-a-jwt-template-to-add-the-authenticated-role)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)