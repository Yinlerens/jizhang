---
url: "https://supabase.com/docs/guides/auth/general-configuration"
title: "General configuration | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/general-configuration)

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
3. Configuration
5. [General Configuration](https://supabase.com/docs/guides/auth/general-configuration)

# General configuration

## General configuration options for Supabase Auth

* * *

This section covers the [general configuration options](https://supabase.com/dashboard/project/_/auth) for Supabase Auth. If you are looking for another type of configuration, you may be interested in one of the following sections:

- [Policies](https://supabase.com/dashboard/project/_/auth/policies) to manage Row Level Security policies for your tables.
- [Sign In / Providers](https://supabase.com/dashboard/project/_/auth/providers) to configure authentication providers and login methods for your users.
- [Third Party Auth](https://supabase.com/dashboard/project/_/auth/third-party) to use third-party authentication (TPA) systems based on JWTs to access your project.
- [Sessions](https://supabase.com/dashboard/project/_/auth/sessions) to configure settings for user sessions and refresh tokens.
- [Rate limits](https://supabase.com/dashboard/project/_/auth/rate-limits) to safeguard against bursts of incoming traffic to prevent abuse and maximize stability.
- [Email Templates](https://supabase.com/dashboard/project/_/auth/templates) to configure what emails your users receive.
- [Custom SMTP](https://supabase.com/dashboard/project/_/auth/smtp) to configure how emails are sent.
- [Multi-Factor](https://supabase.com/dashboard/project/_/auth/mfa) to require users to provide additional verification factors to authenticate.
- [URL Configuration](https://supabase.com/dashboard/project/_/auth/url-configuration) to configure site URL and redirect URLs for authentication. Read more [in the redirect URLs documentation](https://supabase.com/docs/guides/auth/redirect-urls).
- [Attack Protection](https://supabase.com/dashboard/project/_/auth/protection) to configure security settings to protect your project from attacks.
- [Auth Hooks (BETA)](https://supabase.com/dashboard/project/_/auth/auth-hooks) to use Postgres functions or HTTP endpoints to customize the behavior of Supabase Auth to meet your needs.
- [Audit Logs (BETA)](https://supabase.com/dashboard/project/_/auth/audit-logs) to track and monitor auth events in your project.
- [Performance](https://supabase.com/dashboard/project/_/auth/performance) to configure and optimize authentication server settings.

Supabase Auth provides these [general configuration options](https://supabase.com/dashboard/project/_/settings/auth) to control user access to your application:

- **Allow new users to sign up**: Users will be able to sign up. If this config is disabled, only existing users can sign in.

- **Confirm Email**: Users will need to confirm their email address before signing in for the first time.
  - Having **Confirm Email** disabled assumes that the user's email does not need to be verified in order to login and implicitly confirms the user's email in the database.
  - This option can be found in the email provider under the provider-specific configuration.
- **Allow anonymous sign-ins**: Allow anonymous users to be created.

- **Allow manual linking**: Allow users to link their accounts manually.


[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/general-configuration.mdx)

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