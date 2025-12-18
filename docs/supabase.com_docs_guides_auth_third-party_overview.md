---
url: "https://supabase.com/docs/guides/auth/third-party/overview"
title: "Third-party auth | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/third-party/overview)

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
5. [Overview](https://supabase.com/docs/guides/auth/third-party/overview)

# Third-party auth

## First-class support for authentication providers

* * *

Supabase has first-class support for these third-party authentication providers:

- [Clerk](https://supabase.com/docs/guides/auth/third-party/clerk)
- [Firebase Auth](https://supabase.com/docs/guides/auth/third-party/firebase-auth)
- [Auth0](https://supabase.com/docs/guides/auth/third-party/auth0)
- [AWS Cognito (with or without AWS Amplify)](https://supabase.com/docs/guides/auth/third-party/aws-cognito)
- [WorkOS](https://supabase.com/docs/guides/auth/third-party/workos)

You can use these providers alongside Supabase Auth, or on their own, to access the [Data API (REST and GraphQL)](https://supabase.com/docs/guides/database), [Storage](https://supabase.com/docs/guides/storage), [Realtime](https://supabase.com/docs/guides/storage) and [Functions](https://supabase.com/docs/guides/functions) from your existing apps.

If you already have production apps using one of these authentication providers, and would like to use a Supabase feature, you no longer need to migrate your users to Supabase Auth or use workarounds like translating JWTs into the Supabase Auth format and using your project's signing secret.

## How does it work? [\#](https://supabase.com/docs/guides/auth/third-party/overview\#how-does-it-work)

To use Supabase products like Data APIs for your Postgres database, Storage or Realtime, you often need to send access tokens or JWTs via the Supabase client libraries or via the REST API. Third-party auth support means that when you add a new integration with one of these providers, the API will trust JWTs issued by the provider similar to how it trusts JWTs issued by Supabase Auth.

This is made possible if the providers are using JWTs signed with asymmetric keys, which means that the Supabase APIs will be able to only verify but not create JWTs.

## Limitations [\#](https://supabase.com/docs/guides/auth/third-party/overview\#limitations)

There are some limitations you should be aware of when using third-party authentication providers with Supabase.

1. The third-party provider must use asymmetrically signed JWTs (exposed as an OIDC Issuer Discovery URL by the third-party authentication provider). The signed JWTs must have a `kid` header parameter to identify which key must be used. Using symmetrically signed JWTs is not possible at this time.
2. The JWT signing keys from the third-party provider are stored in the configuration of your project, and are checked for changes periodically. If you are rotating your keys (when supported) allow up to 30 minutes for the change to be picked up.
3. It is not possible to disable Supabase Auth at this time.

## Pricing [\#](https://supabase.com/docs/guides/auth/third-party/overview\#pricing)

$0.00325 per Third-Party MAU. You are only charged for usage exceeding your subscription
plan's quota.

For a detailed breakdown of how charges are calculated, refer to [Manage Monthly Active Third-Party Users usage](https://supabase.com/docs/guides/platform/manage-your-usage/monthly-active-users-third-party).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/third-party/overview.mdx)

### Is this helpful?

NoYes

### On this page

[How does it work?](https://supabase.com/docs/guides/auth/third-party/overview#how-does-it-work) [Limitations](https://supabase.com/docs/guides/auth/third-party/overview#limitations) [Pricing](https://supabase.com/docs/guides/auth/third-party/overview#pricing)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)