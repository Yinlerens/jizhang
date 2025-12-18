---
url: "https://supabase.com/docs/guides/auth/password-security"
title: "Password security | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/password-security)

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
3. Security
5. [Password Security](https://supabase.com/docs/guides/auth/password-security)

# Password security

## Help your users to protect their password security

* * *

A password is more secure if it is harder to guess or brute-force. In theory, a password is harder to guess if it is longer. It is also harder to guess if it uses a larger set of characters (for example, digits, lowercase and uppercase letters, and symbols).

This table shows the _minimum_ number of guesses that need to be tried to access a user's account:

| Required characters | Length | Guesses |
| --- | --- | --- |
| Digits only | 8 | ~ 227 |
| Digits and letters | 8 | ~ 241 |
| Digits, lower and uppercase letters | 8 | ~ 248 |
| Digits, lower and uppercase letters, symbols | 8 | ~ 252 |

In reality though, passwords are not always generated at random. They often contain variations of names, words, dates, and common phrases. Malicious actors can use these properties to guess a password in fewer attempts.

There are hundreds of millions (and growing!) known passwords out there. Malicious actors can use these lists of leaked passwords to automate login attempts (known as credential stuffing) and steal or access sensitive user data.

## Password strength and leaked password protection [\#](https://supabase.com/docs/guides/auth/password-security\#password-strength-and-leaked-password-protection)

To help protect your users, Supabase Auth allows you fine-grained control over the strength of the passwords used on your project. You can configure these in your project's [Auth settings](https://supabase.com/dashboard/project/_/auth/providers?provider=Email):

- Set a large minimum password length. Anything less than 8 characters is not recommended.
- Set the required characters that must appear at least once in a user's password. Use the strongest option of requiring digits, lowercase and uppercase letters, and symbols. The allowed symbols are: ``!@#$%^&*()_+-=[]{};'\:"|<>?,./`~``
- Prevent the use of leaked passwords. Supabase Auth uses the open-source [HaveIBeenPwned.org Pwned Passwords API](https://haveibeenpwned.com/Passwords) to reject passwords that have been leaked and are known by malicious actors.

Leaked password protection is available on the Pro Plan and above.

## Additional recommendations [\#](https://supabase.com/docs/guides/auth/password-security\#additional-recommendations)

In addition to choosing suitable password strength settings and preventing the use of leaked passwords, consider asking your users to:

- Use a password manager to store and generate passwords.
- Avoid password reuse across websites and apps.
- Avoid using personal information in passwords.
- Use [Multi-Factor Authentication](https://supabase.com/docs/guides/auth/auth-mfa).

## Frequently asked questions [\#](https://supabase.com/docs/guides/auth/password-security\#frequently-asked-questions)

### How are passwords stored? [\#](https://supabase.com/docs/guides/auth/password-security\#how-are-passwords-stored)

Supabase Auth uses [bcrypt](https://en.wikipedia.org/wiki/Bcrypt), a strong password hashing function, to store hashes of users' passwords. Only hashed passwords are stored. You cannot impersonate a user with the password hash. Each hash is accompanied by a randomly generated salt parameter for extra security.

The hash is stored in the `encrypted_password` column of the `auth.users` table. The column's name is a misnomer (cryptographic hashing is not encryption), but is kept for backward compatibility.

### How will strengthened password requirements affect current users? [\#](https://supabase.com/docs/guides/auth/password-security\#how-will-strengthened-password-requirements-affect-current-users)

Existing users can still sign in with their current password even if it doesn't meet the new, strengthened password requirements. However, if their password falls short of these updated standards, they will encounter a `WeakPasswordError` during the `signInWithPassword` process, explaining why it's considered weak. This change is also applicable to new users and existing users changing their passwords, ensuring everyone adheres to the enhanced security standards.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/password-security.mdx)

### Is this helpful?

NoYes

### On this page

[Password strength and leaked password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection) [Additional recommendations](https://supabase.com/docs/guides/auth/password-security#additional-recommendations) [Frequently asked questions](https://supabase.com/docs/guides/auth/password-security#frequently-asked-questions) [How are passwords stored?](https://supabase.com/docs/guides/auth/password-security#how-are-passwords-stored) [How will strengthened password requirements affect current users?](https://supabase.com/docs/guides/auth/password-security#how-will-strengthened-password-requirements-affect-current-users)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)