---
url: "https://supabase.com/docs/guides/auth/auth-identity-linking"
title: "Identity Linking | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-identity-linking)

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
5. [Identity Linking](https://supabase.com/docs/guides/auth/auth-identity-linking)

# Identity Linking

## Manage the identities associated with your user

* * *

## Identity linking strategies [\#](https://supabase.com/docs/guides/auth/auth-identity-linking\#identity-linking-strategies)

Currently, Supabase Auth supports 2 strategies to link an identity to a user:

1. [Automatic Linking](https://supabase.com/docs/guides/auth/auth-identity-linking#automatic-linking)
2. [Manual Linking](https://supabase.com/docs/guides/auth/auth-identity-linking#manual-linking-beta)

### Automatic linking [\#](https://supabase.com/docs/guides/auth/auth-identity-linking\#automatic-linking)

Supabase Auth automatically links identities with the same email address to a single user. This helps to improve the user experience when multiple OAuth login options are presented since the user does not need to remember which OAuth account they used to sign up with. When a new user signs in with OAuth, Supabase Auth will attempt to look for an existing user that uses the same email address. If a match is found, the new identity is linked to the user.

In order for automatic linking to correctly identify the user for linking, Supabase Auth needs to ensure that all user emails are unique. It would also be an insecure practice to automatically link an identity to a user with an unverified email address since that could lead to pre-account takeover attacks. To prevent this from happening, when a new identity can be linked to an existing user, Supabase Auth will remove any other unconfirmed identities linked to an existing user.

Users that signed up with [SAML SSO](https://supabase.com/docs/guides/auth/sso/auth-sso-saml) will not be considered as targets for automatic linking.

### Manual linking (beta) [\#](https://supabase.com/docs/guides/auth/auth-identity-linking\#manual-linking-beta)

JavaScriptDartSwiftKotlinPython

Supabase Auth allows a user to initiate identity linking with a different email address when they are logged in. To link an OAuth identity to the user, call [`linkIdentity()`](https://supabase.com/docs/reference/javascript/auth-linkidentity):

```
1
const { data, error } = await supabase.auth.linkIdentity({ provider: 'google' })
```

In the example above, the user will be redirected to Google to complete the OAuth2.0 flow. Once the OAuth2.0 flow has completed successfully, the user will be redirected back to the application and the Google identity will be linked to the user. You can enable manual linking from your project's authentication [configuration options](https://supabase.com/dashboard/project/_/auth/providers) or by setting the environment variable `GOTRUE_SECURITY_MANUAL_LINKING_ENABLED: true` when self-hosting.

### Link identity with native OAuth (ID token) [\#](https://supabase.com/docs/guides/auth/auth-identity-linking\#link-identity-with-native-oauth-id-token)

JavaScriptDart

For native mobile applications, you can link an identity using an ID token obtained from a third-party OAuth provider. This is useful when you want to use native OAuth flows (like Google Sign-In or Sign in with Apple) rather than web-based OAuth redirects.

```
1
// Example with Google Sign-In (using a native Google Sign-In library)
2
const idToken = 'ID_TOKEN_FROM_GOOGLE'
3
const accessToken = 'ACCESS_TOKEN_FROM_GOOGLE'
4

5
const { data, error } = await supabase.auth.linkIdentity({
6
  provider: 'google',
7
  token: idToken,
8
  access_token: accessToken,
9
})
```

## Unlink an identity [\#](https://supabase.com/docs/guides/auth/auth-identity-linking\#unlink-an-identity)

JavaScriptDartSwiftKotlinPython

You can use [`getUserIdentities()`](https://supabase.com/docs/reference/javascript/auth-getuseridentities) to fetch all the identities linked to a user. Then, call [`unlinkIdentity()`](https://supabase.com/docs/reference/javascript/auth-unlinkidentity) to unlink the identity. The user needs to be logged in and have at least 2 linked identities in order to unlink an existing identity.

```
1
// retrieve all identities linked to a user
2
const { data: identities, error: identitiesError } = await supabase.auth.getUserIdentities()
3

4
if (!identitiesError) {
5
  // find the google identity linked to the user
6
  const googleIdentity = identities.identities.find((identity) => identity.provider === 'google')
7

8
  if (googleIdentity) {
9
    // unlink the google identity from the user
10
    const { data, error } = await supabase.auth.unlinkIdentity(googleIdentity)
11
  }
12
}
```

## Frequently asked questions [\#](https://supabase.com/docs/guides/auth/auth-identity-linking\#frequently-asked-questions)

### How to add email/password login to an OAuth account? [\#](https://supabase.com/docs/guides/auth/auth-identity-linking\#how-to-add-emailpassword-login-to-an-oauth-account)

Call the `updateUser({ password: 'validpassword'})` to add email with password authentication to an account created with an OAuth provider (Google, GitHub, etc.).

### Can you sign up with email if already using OAuth? [\#](https://supabase.com/docs/guides/auth/auth-identity-linking\#can-you-sign-up-with-email-if-already-using-oauth)

If you try to create an email account after previously signing up with OAuth using the same email, you'll receive an obfuscated user response with no verification email sent. This prevents user enumeration attacks.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-identity-linking.mdx)

### Is this helpful?

NoYes

### On this page

[Identity linking strategies](https://supabase.com/docs/guides/auth/auth-identity-linking#identity-linking-strategies) [Automatic linking](https://supabase.com/docs/guides/auth/auth-identity-linking#automatic-linking) [Manual linking (beta)](https://supabase.com/docs/guides/auth/auth-identity-linking#manual-linking-beta) [Link identity with native OAuth (ID token)](https://supabase.com/docs/guides/auth/auth-identity-linking#link-identity-with-native-oauth-id-token) [Unlink an identity](https://supabase.com/docs/guides/auth/auth-identity-linking#unlink-an-identity) [Frequently asked questions](https://supabase.com/docs/guides/auth/auth-identity-linking#frequently-asked-questions) [How to add email/password login to an OAuth account?](https://supabase.com/docs/guides/auth/auth-identity-linking#how-to-add-emailpassword-login-to-an-oauth-account) [Can you sign up with email if already using OAuth?](https://supabase.com/docs/guides/auth/auth-identity-linking#can-you-sign-up-with-email-if-already-using-oauth)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)