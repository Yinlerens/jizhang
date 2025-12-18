---
url: "https://supabase.com/docs/guides/auth/oauth-server"
title: "OAuth 2.1 Server | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/oauth-server)

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
3. OAuth 2.1 Server
5. [Overview](https://supabase.com/docs/guides/auth/oauth-server)

# OAuth 2.1 Server

* * *

Supabase Auth can act as an OAuth 2.1 and OpenID Connect (OIDC) identity provider. This allows other applications and services to use your Supabase project as their authentication provider, just like "Sign in with Google" or "Sign in with GitHub".

You can use this to build "Sign in with \[Your App\]" experiences, authenticate AI agents through the Model Context Protocol (MCP), power developer platforms with third-party integrations, or implement standards-compliant enterprise SSO.

## Use cases [\#](https://supabase.com/docs/guides/auth/oauth-server\#use-cases)

There are several reasons why you might want to enable OAuth 2.1 Server in your Supabase project:

- **Developer platforms and marketplaces**: Allow third-party developers to build integrations and apps for your platform. Partners can offer "Sign in with \[Your App\]" to their users, with your control over data access through Row Level Security policies.

- **AI agents and automation**: Authenticate AI agents, LLM tools, and MCP servers that need to access user data. The Model Context Protocol provides automatic OAuth discovery and client registration for AI applications.

- **Mobile and desktop apps**: Issue OAuth tokens to your own mobile apps, desktop applications, or other first-party clients. All tokens respect your existing Row Level Security policies and work with Custom Access Token Hooks.

- **Enterprise SSO**: Provide OpenID Connect (OIDC) authentication for enterprise customers who need standards-compliant identity federation across multiple services.


## Overview [\#](https://supabase.com/docs/guides/auth/oauth-server\#overview)

Supabase Auth implements the OAuth 2.1 authorization code flow with PKCE (Proof Key for Code Exchange). When a third-party application wants to access user data:

1. The application redirects the user to your authorization endpoint
2. Supabase Auth validates the request and redirects to your custom authorization UI
3. The user authenticates (using any of your enabled auth methods) and approves access
4. Supabase Auth issues an authorization code
5. The application exchanges the code for access and refresh tokens
6. The application uses the access token to make authenticated API requests

Access tokens are standard Supabase JWTs that include `user_id`, `role`, and `client_id` claims. Your existing Row Level Security policies automatically apply to OAuth tokens, giving you fine-grained control over what each client can access.

### Supported standards [\#](https://supabase.com/docs/guides/auth/oauth-server\#supported-standards)

- **OAuth 2.1**: Latest OAuth specification with mandatory PKCE
- **OpenID Connect**: ID tokens (with `openid` scope), UserInfo endpoint, and OIDC discovery
- **Standard scopes**: `openid`, `email`, `profile`, and `phone` scopes for controlling data access
- **Dynamic client registration**: Automatic registration for MCP-compatible clients
- **JWKS endpoint**: Public keys for third parties to validate tokens

### Integration with existing auth [\#](https://supabase.com/docs/guides/auth/oauth-server\#integration-with-existing-auth)

OAuth 2.1 Server works seamlessly with your existing Supabase Auth configuration:

- Users can authenticate using any enabled method (password, magic link, social providers, MFA, phone)
- [Custom Access Token Hooks](https://supabase.com/guides/auth/auth-hooks/access-token-hook) apply to OAuth tokens, allowing you to customize claims like `audience` or add client-specific permissions
- Row Level Security policies control data access using the `client_id` claim in tokens
- All standard Supabase features (email templates, hooks, rate limiting) continue to work

## Set up OAuth 2.1 server [\#](https://supabase.com/docs/guides/auth/oauth-server\#set-up-oauth-21-server)

To enable OAuth 2.1 Server in your project, follow these guides:

[Getting Started\\
\\
Enable OAuth 2.1, configure your authorization endpoint, and register your first client.](https://supabase.com/docs/guides/auth/oauth-server/getting-started)

[OAuth Flows\\
\\
Detailed walkthrough of authorization code and refresh token flows.](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows)

[MCP Authentication\\
\\
Authenticate AI agents and LLM tools using Model Context Protocol.](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication)

[Token Security & RLS\\
\\
Control data access with Row Level Security policies for OAuth clients.](https://supabase.com/docs/guides/auth/oauth-server/token-security)

## Resources [\#](https://supabase.com/docs/guides/auth/oauth-server\#resources)

- [GitHub Discussion](https://github.com/orgs/supabase/discussions/38022) \- Share your use cases and help shape the roadmap
- [Discord Community](https://discord.supabase.com/) \- Get help and share what you're building

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/oauth-server.mdx)

### Is this helpful?

NoYes

### On this page

[Use cases](https://supabase.com/docs/guides/auth/oauth-server#use-cases) [Overview](https://supabase.com/docs/guides/auth/oauth-server#overview) [Supported standards](https://supabase.com/docs/guides/auth/oauth-server#supported-standards) [Integration with existing auth](https://supabase.com/docs/guides/auth/oauth-server#integration-with-existing-auth) [Set up OAuth 2.1 server](https://supabase.com/docs/guides/auth/oauth-server#set-up-oauth-21-server) [Resources](https://supabase.com/docs/guides/auth/oauth-server#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)