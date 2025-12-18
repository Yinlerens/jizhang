---
url: "https://supabase.com/docs/guides/auth/third-party/clerk"
title: "Clerk | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/third-party/clerk)

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

Auth UI[Auth UI (Deprecated)](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
[Flutter Auth UI](https://supabase.com/docs/guides/auth/auth-helpers/flutter-auth-ui)

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
5. [Clerk](https://supabase.com/docs/guides/auth/third-party/clerk)

# Clerk

## Use Clerk with your Supabase project

* * *

Clerk can be used as a third-party authentication provider alongside Supabase Auth, or standalone, with your Supabase project.

## Getting started [\#](https://supabase.com/docs/guides/auth/third-party/clerk\#getting-started)

Getting started is incredibly easy. Start off by visiting [Clerk's Connect with Supabase page](https://dashboard.clerk.com/setup/supabase) to configure your Clerk instance for Supabase compatibility.

Finally add a [new Third-Party Auth integration with Clerk](https://supabase.com/dashboard/project/_/auth/third-party) in the Supabase dashboard.

### Configure for local development or self-hosting [\#](https://supabase.com/docs/guides/auth/third-party/clerk\#configure-for-local-development-or-self-hosting)

When developing locally or self-hosting with the Supabase CLI, add the following config to your `supabase/config.toml` file:

```
1
[auth.third_party.clerk]
2
enabled = true
3
domain = "example.clerk.accounts.dev"
```

You will still need to configure your Clerk instance for Supabase compatibility.

### Manually configuring your Clerk instance [\#](https://supabase.com/docs/guides/auth/third-party/clerk\#manually-configuring-your-clerk-instance)

If you are not able to use [Clerk's Connect with Supabase page](https://dashboard.clerk.com/setup/supabase) to configure your Clerk instance for working with Supabase, follow these steps.

1. Add the `role` claim to [Clerk session tokens](https://clerk.com/docs/backend-requests/resources/session-tokens) by [customizing them](https://clerk.com/docs/backend-requests/custom-session-token). End-users who are authenticated should have the `authenticated` value for the claim. If you have an advanced Postgres setup where authenticated end-users use different Postgres roles to access the database, adjust the value to use the correct role name.
2. Once all Clerk session tokens for your instance contain the `role` claim, add a [new Third-Party Auth integration with Clerk](https://supabase.com/dashboard/project/_/auth/third-party) in the Supabase dashboard or register it in the CLI as instructed above.

## Setup the Supabase client library [\#](https://supabase.com/docs/guides/auth/third-party/clerk\#setup-the-supabase-client-library)

TypeScriptFlutterSwift (iOS)

```
1
const supabaseClient = createClient(
2
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
3
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
4
    {
5
      // Session accessed from Clerk SDK, either as Clerk.session (vanilla
6
      // JavaScript) or useSession (React)
7
      accessToken: async () => session?.getToken() ?? null,
8
    }
9
  )
```

[View source](https://github.com/supabase/supabase/blob/be90135d82e032214bdda5f899c1c7064ceff8ee/examples/clerk/hooks/useSupabaseClient.ts)

## Using RLS policies [\#](https://supabase.com/docs/guides/auth/third-party/clerk\#using-rls-policies)

Once you've configured the Supabase client library to use Clerk session tokens, you can use RLS policies to secure access to your project's database, Storage objects and Realtime channels.

The recommended way to design RLS policies with Clerk is to use claims present in your Clerk session token to allow or reject access to your project's data. Check [Clerk's docs](https://clerk.com/docs/backend-requests/resources/session-tokens) on the available JWT claims and their values.

### Example: Check user organization role [\#](https://supabase.com/docs/guides/auth/third-party/clerk\#example-check-user-organization-role)

```
1
create policy "Only organization admins can insert in table"
2
on secured_table
3
for insert
4
to authenticated
5
with check (
6
  (((select auth.jwt()->>'org_role') = 'org:admin') or ((select auth.jwt()->'o'->>'rol') = 'admin'))
7
    and
8
  (organization_id = (select coalesce(auth.jwt()->>'org_id', auth.jwt()->'o'->>'id')))
9
);
```

[View source](https://github.com/supabase/supabase/blob/be90135d82e032214bdda5f899c1c7064ceff8ee/examples/clerk/supabase/migrations/20250501155648_setup_database.sql)

This RLS policy checks that the newly inserted row in the table has the user's declared organization ID in the `organization_id` column. Additionally it ensures that they're an `org:admin`.

This way only organization admins can add rows to the table, for organizations they're a member of.

### Example: Check user has passed second factor verification [\#](https://supabase.com/docs/guides/auth/third-party/clerk\#example-check-user-has-passed-second-factor-verification)

```
1
create policy "Only users that have passed second factor verification can read from table"
2
on secured_table
3
as restrictive
4
for select
5
to authenticated
6
using (
7
  ((select auth.jwt()->'fva'->>1) != '-1')
8
);
```

[View source](https://github.com/supabase/supabase/blob/be90135d82e032214bdda5f899c1c7064ceff8ee/examples/clerk/supabase/migrations/20250501155648_setup_database.sql)

This example uses a restrictive RLS policy checks that the [second factor verification](https://clerk.com/docs/guides/reverification) age element in the `fva` claim is not `'-1'` indicating the user has passed through second factor verification.

## Deprecated integration with JWT templates [\#](https://supabase.com/docs/guides/auth/third-party/clerk\#deprecated-integration-with-jwt-templates)

As of 1st April 2025 the previously available [Clerk Integration with Supabase](https://supabase.com/partners/integrations/clerk) is considered deprecated and is no longer recommended for use. All projects using the deprecated integration will be excluded from Third-Party Monthly Active User (TP-MAU) charges until at least 1st January 2026.

This integration used low-level primitives that are still available in Supabase and Clerk, such as a [configurable JWT secret](https://supabase.com/dashboard/project/_/settings/api) and [JWT templates from Clerk](https://clerk.com/docs/backend-requests/jwt-templates). This enables you to keep using it in an unofficial manner, though only limited support will be provided from Supabase.

Deprecation is done for the following reasons:

- Sharing your project's JWT secret with a third-party is a problematic security practice
- Rotating the project's JWT secret in this case almost always results in significant downtime for your application
- Additional latency to [generate a new JWT](https://clerk.com/docs/backend-requests/jwt-templates#generate-a-jwt) for use with Supabase, instead of using the Clerk [session tokens](https://clerk.com/docs/backend-requests/resources/session-tokens)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/third-party/clerk.mdx)

### Is this helpful?

NoYes

### On this page

[Getting started](https://supabase.com/docs/guides/auth/third-party/clerk#getting-started) [Configure for local development or self-hosting](https://supabase.com/docs/guides/auth/third-party/clerk#configure-for-local-development-or-self-hosting) [Manually configuring your Clerk instance](https://supabase.com/docs/guides/auth/third-party/clerk#manually-configuring-your-clerk-instance) [Setup the Supabase client library](https://supabase.com/docs/guides/auth/third-party/clerk#setup-the-supabase-client-library) [Using RLS policies](https://supabase.com/docs/guides/auth/third-party/clerk#using-rls-policies) [Example: Check user organization role](https://supabase.com/docs/guides/auth/third-party/clerk#example-check-user-organization-role) [Example: Check user has passed second factor verification](https://supabase.com/docs/guides/auth/third-party/clerk#example-check-user-has-passed-second-factor-verification) [Deprecated integration with JWT templates](https://supabase.com/docs/guides/auth/third-party/clerk#deprecated-integration-with-jwt-templates)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)