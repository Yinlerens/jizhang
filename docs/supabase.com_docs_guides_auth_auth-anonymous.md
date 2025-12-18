---
url: "https://supabase.com/docs/guides/auth/auth-anonymous"
title: "Anonymous Sign-Ins | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-anonymous)

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
3. Flows (How-tos)
5. [Anonymous Sign-Ins](https://supabase.com/docs/guides/auth/auth-anonymous)

# Anonymous Sign-Ins

## Create and use anonymous users to authenticate with Supabase

* * *

[Enable Anonymous Sign-Ins](https://supabase.com/dashboard/project/_/auth/providers) to build apps which provide users an authenticated experience without requiring users to enter an email address, password, use an OAuth provider or provide any other PII (Personally Identifiable Information). Later, when ready, the user can link an authentication method to their account.

##### Anonymous user vs the anon key

Calling `signInAnonymously()` creates an anonymous user. It's just like a permanent user, except the user can't access their account if they sign out, clear browsing data, or use another device.

Like permanent users, the `authenticated` Postgres role will be used when using the Data APIs to access your project. JWTs for these users will have an `is_anonymous` claim which you can use to distinguish in RLS policies.

This is different from the `anon` API key which does not create a user and can be used to implement public access to your database as it uses the `anonymous` Postgres role.

Anonymous sign-ins can be used to build:

- E-commerce applications, such as shopping carts before check-out
- Full-feature demos without collecting personal information
- Temporary or throw-away accounts

Review your existing RLS policies before enabling anonymous sign-ins. Anonymous users use the `authenticated` role. To distinguish between anonymous users and permanent users, your policies need to check the `is_anonymous` field of the user's JWT.

See the [Access control section](https://supabase.com/docs/guides/auth/auth-anonymous#access-control) for more details.

##### Use Dynamic Rendering with Next.js

The Supabase team has received reports of user metadata being cached across unique anonymous users as a result of Next.js static page rendering. For the best user experience, utilize dynamic page rendering.

##### Self hosting and local development

For self-hosting, you can update your project configuration using the files and environment variables provided. See the [local development docs](https://supabase.com/docs/guides/cli/config) for more details.

## Sign in anonymously [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#sign-in-anonymously)

JavaScriptFlutterSwiftKotlinPython

Call the [`signInAnonymously()`](https://supabase.com/docs/reference/javascript/auth-signinanonymously) method:

```
1
const { data, error } = await supabase.auth.signInAnonymously()
```

## Convert an anonymous user to a permanent user [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#convert-an-anonymous-user-to-a-permanent-user)

Converting an anonymous user to a permanent user requires [linking an identity](https://supabase.com/docs/guides/auth/auth-identity-linking#manual-linking-beta) to the user. This requires you to [enable manual linking](https://supabase.com/dashboard/project/_/auth/providers) in your Supabase project.

### Link an email / phone identity [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#link-an-email--phone-identity)

JavaScriptFlutterSwiftKotlinPython

You can use the [`updateUser()`](https://supabase.com/docs/reference/javascript/auth-updateuser) method to link an email or phone identity to the anonymous user. To add a password for the anonymous user, the user's email or phone number needs to be verified first.

```
1
const { data: updateEmailData, error: updateEmailError } = await supabase.auth.updateUser({
2
  email: 'valid.email@supabase.io',
3
})
4

5
// verify the user's email by clicking on the email change link
6
// or entering the 6-digit OTP sent to the email address
7

8
// once the user has been verified, update the password
9
const { data: updatePasswordData, error: updatePasswordError } = await supabase.auth.updateUser({
10
  password: 'password',
11
})
```

### Link an OAuth identity [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#link-an-oauth-identity)

JavaScriptFlutterSwiftKotlinPython

You can use the [`linkIdentity()`](https://supabase.com/docs/reference/javascript/auth-linkidentity) method to link an OAuth identity to the anonymous user.

```
1
const { data, error } = await supabase.auth.linkIdentity({ provider: 'google' })
```

## Access control [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#access-control)

An anonymous user assumes the `authenticated` role just like a permanent user. You can use row-level security (RLS) policies to differentiate between an anonymous user and a permanent user by checking for the `is_anonymous` claim in the JWT returned by `auth.jwt()`:

```
1
create policy "Only permanent users can post to the news feed"
2
on news_feed as restrictive for insert
3
to authenticated
4
with check ((select (auth.jwt()->>'is_anonymous')::boolean) is false );
5

6
create policy "Anonymous and permanent users can view the news feed"
7
on news_feed for select
8
to authenticated
9
using ( true );
```

##### Use restrictive policies

RLS policies are permissive by default, which means that they are combined using an "OR" operator when multiple policies are applied. It is important to construct restrictive policies to ensure that the checks for an anonymous user are always enforced when combined with other policies.
Be aware that a single 'restrictive' RLS policy alone will fail unless combined with another policy that returns true, ensuring the combined condition is met.

## Resolving identity conflicts [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#resolving-identity-conflicts)

Depending on your application requirements, data conflicts can arise when an anonymous user is converted to a permanent user. For example, in the context of an e-commerce application, an anonymous user would be allowed to add items to the shopping cart without signing up / signing in. When they decide to sign-in to an existing account, you will need to decide how you want to resolve data conflicts in the shopping cart:

1. Overwrite the items in the cart with those in the existing account
2. Overwrite the items in the cart with those from the anonymous user
3. Merge the items in the cart together

### Linking an anonymous user to an existing account [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#linking-an-anonymous-user-to-an-existing-account)

In some cases, you may need to link an anonymous user to an existing account rather than creating a new permanent account. This process requires manual handling of potential conflicts. Here's a general approach:

```
1
// 1. Sign in anonymously (assuming the user is already signed in anonymously)
2
const { data: anonData, error: anonError } = await supabase.auth.getSession()
3

4
// 2. Attempt to update the user with the existing email
5
const { data: updateData, error: updateError } = await supabase.auth.updateUser({
6
  email: 'valid.email@supabase.io',
7
})
8

9
// 3. Handle the error (since the email belongs to an existing user)
10
if (updateError) {
11
  console.log('This email belongs to an existing user. Please sign in to that account.')
12

13
  // 4. Sign in to the existing account
14
  const {
15
    data: { user: existingUser },
16
    error: signInError,
17
  } = await supabase.auth.signInWithPassword({
18
    email: 'valid.email@supabase.io',
19
    password: 'user_password',
20
  })
21

22
  if (existingUser) {
23
    // 5. Reassign entities tied to the anonymous user
24
    // This step will vary based on your specific use case and data model
25
    const { data: reassignData, error: reassignError } = await supabase
26
      .from('your_table')
27
      .update({ user_id: existingUser.id })
28
      .eq('user_id', anonData.session.user.id)
29

30
    // 6. Implement your chosen conflict resolution strategy
31
    // This could involve merging data, overwriting, or other custom logic
32
    await resolveDataConflicts(anonData.session.user.id, existingUser.id)
33
  }
34
}
35

36
// Helper function to resolve data conflicts (implement based on your strategy)
37
async function resolveDataConflicts(anonymousUserId, existingUserId) {
38
  // Implement your conflict resolution logic here
39
  // This could involve ignoring the anonymous user's metadata, overwriting the existing user's metadata, or merging the data of both the anonymous and existing user.
40
}
```

## Abuse prevention and rate limits [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#abuse-prevention-and-rate-limits)

Since anonymous users are stored in your database, bad actors can abuse the endpoint to increase your database size drastically. It is strongly recommended to [enable invisible CAPTCHA or Cloudflare Turnstile](https://supabase.com/docs/guides/auth/auth-captcha) to prevent abuse for anonymous sign-ins. An IP-based rate limit is enforced at 30 requests per hour which can be modified in your [dashboard](https://supabase.com/dashboard/project/_/auth/rate-limits). You can refer to the full list of rate limits [here](https://supabase.com/docs/guides/platform/going-into-prod#rate-limiting-resource-allocation--abuse-prevention).

## Automatic cleanup [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#automatic-cleanup)

Automatic cleanup of anonymous users is currently not available. Instead, you can delete anonymous users from your project by running the following SQL:

```
1
-- deletes anonymous users created more than 30 days ago
2
delete from auth.users
3
where is_anonymous is true and created_at < now() - interval '30 days';
```

## Resources [\#](https://supabase.com/docs/guides/auth/auth-anonymous\#resources)

- [Supabase - Get started for free](https://supabase.com/)
- [Supabase JS Client](https://github.com/supabase/supabase-js)
- [Supabase Flutter Client](https://github.com/supabase/supabase-flutter)
- [Supabase Kotlin Client](https://github.com/supabase-community/supabase-kt)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-anonymous.mdx)

### Is this helpful?

NoYes

### On this page

[Sign in anonymously](https://supabase.com/docs/guides/auth/auth-anonymous#sign-in-anonymously) [Convert an anonymous user to a permanent user](https://supabase.com/docs/guides/auth/auth-anonymous#convert-an-anonymous-user-to-a-permanent-user) [Link an email / phone identity](https://supabase.com/docs/guides/auth/auth-anonymous#link-an-email--phone-identity) [Link an OAuth identity](https://supabase.com/docs/guides/auth/auth-anonymous#link-an-oauth-identity) [Access control](https://supabase.com/docs/guides/auth/auth-anonymous#access-control) [Resolving identity conflicts](https://supabase.com/docs/guides/auth/auth-anonymous#resolving-identity-conflicts) [Linking an anonymous user to an existing account](https://supabase.com/docs/guides/auth/auth-anonymous#linking-an-anonymous-user-to-an-existing-account) [Abuse prevention and rate limits](https://supabase.com/docs/guides/auth/auth-anonymous#abuse-prevention-and-rate-limits) [Automatic cleanup](https://supabase.com/docs/guides/auth/auth-anonymous#automatic-cleanup) [Resources](https://supabase.com/docs/guides/auth/auth-anonymous#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)