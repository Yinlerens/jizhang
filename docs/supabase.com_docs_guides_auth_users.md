---
url: "https://supabase.com/docs/guides/auth/users"
title: "Users | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/users)

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

Auth

1. Auth
3. Concepts
5. [Users](https://supabase.com/docs/guides/auth/users)

# Users

* * *

A **user** in Supabase Auth is someone with a user ID, stored in the Auth schema. Once someone is a user, they can be issued an Access Token, which can be used to access Supabase endpoints. The token is tied to the user, so you can restrict access to resources via [RLS policies](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Permanent and anonymous users [\#](https://supabase.com/docs/guides/auth/users\#permanent-and-anonymous-users)

Supabase distinguishes between permanent and anonymous users.

- **Permanent users** are tied to a piece of Personally Identifiable Information (PII), such as an email address, a phone number, or a third-party identity. They can use these identities to sign back into their account after signing out.
- **Anonymous users** aren't tied to any identities. They have a user ID and a personalized Access Token, but they have no way of signing back in as the same user if they are signed out.

Anonymous users are useful for:

- E-commerce applications, to create shopping carts before checkout
- Full-feature demos without collecting personal information
- Temporary or throw-away accounts

See the [Anonymous Signins guide](https://supabase.com/docs/guides/auth/auth-anonymous) to learn more about anonymous users.

##### Anonymous users do not use the anon role

Just like permanent users, anonymous users use the **authenticated** role for database access.

The **anon** role is for those who aren't signed in at all and are not tied to any user ID. We refer to these as unauthenticated or public users.

## The user object [\#](https://supabase.com/docs/guides/auth/users\#the-user-object)

The user object stores all the information related to a user in your application. The user object can be retrieved using one of these methods:

1. [`supabase.auth.getUser()`](https://supabase.com/docs/reference/javascript/auth-getuser)
2. Retrieve a user object as an admin using [`supabase.auth.admin.getUserById()`](https://supabase.com/docs/reference/javascript/auth-admin-listusers)

A user can sign in with one of the following methods:

- Password-based method (with email or phone)
- Passwordless method (with email or phone)
- OAuth
- SAML SSO

An identity describes the authentication method that a user can use to sign in. A user can have multiple identities. These are the types of identities supported:

- Email
- Phone
- OAuth
- SAML

A user with an email or phone identity will be able to sign in with either a password or passwordless method (e.g. use a one-time password (OTP) or magic link). By default, a user with an unverified email or phone number will not be able to sign in.

The user object contains the following attributes:

| Attributes | Type | Description |
| --- | --- | --- |
| id | `string` | The unique id of the identity of the user. |
| aud | `string` | The audience claim. |
| role | `string` | The role claim used by Postgres to perform Row Level Security (RLS) checks. |
| email | `string` | The user's email address. |
| email\_confirmed\_at | `string` | The timestamp that the user's email was confirmed. If null, it means that the user's email is not confirmed. |
| phone | `string` | The user's phone number. |
| phone\_confirmed\_at | `string` | The timestamp that the user's phone was confirmed. If null, it means that the user's phone is not confirmed. |
| confirmed\_at | `string` | The timestamp that either the user's email or phone was confirmed. If null, it means that the user does not have a confirmed email address and phone number. |
| last\_sign\_in\_at | `string` | The timestamp that the user last signed in. |
| app\_metadata | `object` | The `provider` attribute indicates the first provider that the user used to sign up with. The `providers` attribute indicates the list of providers that the user can use to login with. |
| user\_metadata | `object` | Defaults to the first provider's identity data but can contain additional custom user metadata if specified. Refer to [**User Identity**](https://supabase.com/docs/guides/auth/auth-identity-linking#the-user-identity) for more information about the identity object. Don't rely on the order of information in this field. Do not use it in security sensitive context (such as in RLS policies or authorization logic), as this value is editable by the user without any checks. |
| identities | `UserIdentity[]` | Contains an object array of identities linked to the user. |
| created\_at | `string` | The timestamp that the user was created. |
| updated\_at | `string` | The timestamp that the user was last updated. |
| is\_anonymous | `boolean` | Is true if the user is an anonymous user. |

## Resources [\#](https://supabase.com/docs/guides/auth/users\#resources)

- [User Management guide](https://supabase.com/docs/guides/auth/managing-user-data)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/users.mdx)

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