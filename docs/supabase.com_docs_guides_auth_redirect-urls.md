---
url: "https://supabase.com/docs/guides/auth/redirect-urls"
title: "Redirect URLs | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/redirect-urls)

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
3. Configuration
5. [Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)

# Redirect URLs

## Set up redirect urls with Supabase Auth.

* * *

## Overview [\#](https://supabase.com/docs/guides/auth/redirect-urls\#overview)

Supabase Auth allows you to control how the [user sessions](https://supabase.com/docs/guides/auth/sessions) are handled by your application.

**Looking for OAuth client redirect URIs?**

This guide covers redirect URLs for users signing **into** your application (using social providers like Google, GitHub, etc.). If you're setting up your Supabase project as an **OAuth 2.1 provider** for third-party applications, see the [OAuth Server Redirect URI configuration](https://supabase.com/docs/guides/auth/oauth-server/getting-started#redirect-uri-configuration) instead.

When using [passwordless sign-ins](https://supabase.com/docs/reference/javascript/auth-signinwithotp) or [third-party providers](https://supabase.com/docs/reference/javascript/auth-signinwithoauth#sign-in-using-a-third-party-provider-with-redirect), the Supabase client library provides a `redirectTo` parameter to specify where to redirect the user after authentication. The URL in `redirectTo` should match the [Redirect URLs](https://supabase.com/dashboard/project/_/auth/url-configuration) list configuration.

To configure allowed redirect URLs, go to the [URL Configuration](https://supabase.com/dashboard/project/_/auth/url-configuration) page. Once you've added necessary URLs, you can use the URL you want the user to be redirected to in the `redirectTo` parameter.

The Site URL in [URL Configuration](https://supabase.com/dashboard/project/_/auth/url-configuration) defines the **default redirect URL** when no `redirectTo` is specified in the code. Change this from `http://localhost:3000` to your production URL (e.g., [https://example.com](https://example.com/)). This setting is critical for email confirmations and password resets.

When using [Sign in with Web3](https://supabase.com/docs/guides/auth/auth-web3), the message signed by the user in the Web3 wallet application will indicate the URL on which the signature took place. Supabase Auth will reject messages that are signed for URLs that are not on the allowed list.

In local development or self-hosted projects, use the [configuration file](https://supabase.com/docs/guides/local-development/cli/config#auth.additional_redirect_urls). See below for more information on configuring `SITE_URL` when deploying to Vercel or Netlify.

## Use wildcards in redirect URLs [\#](https://supabase.com/docs/guides/auth/redirect-urls\#use-wildcards-in-redirect-urls)

Supabase allows you to specify wildcards when adding redirect URLs to the [allow list](https://supabase.com/dashboard/project/_/auth/url-configuration). You can use wildcard match patterns to support preview URLs from providers like Netlify and Vercel.

| Wildcard | Description |
| --- | --- |
| `*` | matches any sequence of non-separator characters |
| `**` | matches any sequence of characters |
| `?` | matches any single non-separator character |
| `c` | matches character c (c != `*`, `**`, `?`, `\`, `[`, `{`, `}`) |\
| `\c` | matches character c |\
| `[!{ character-range }]` | matches any sequence of characters not in the `{ character-range }`. For example, `[!a-z]` will not match any characters ranging from a-z. |\
\
The separator characters in a URL are defined as `.` and `/`. Use [this tool](https://www.digitalocean.com/community/tools/glob?comments=true&glob=http%3A%2F%2Flocalhost%3A3000%2F%2A%2A&matches=false&tests=http%3A%2F%2Flocalhost%3A3000&tests=http%3A%2F%2Flocalhost%3A3000%2F&tests=http%3A%2F%2Flocalhost%3A3000%2F%3Ftest%3Dtest&tests=http%3A%2F%2Flocalhost%3A3000%2Ftest-test%3Ftest%3Dtest&tests=http%3A%2F%2Flocalhost%3A3000%2Ftest%2Ftest%3Ftest%3Dtest) to test your patterns.\
\
##### Recommendation\
\
While the "globstar" (`**`) is useful for local development and preview URLs, we recommend setting the exact redirect URL path for your site URL in production.\
\
### Redirect URL examples with wildcards [\#](https://supabase.com/docs/guides/auth/redirect-urls\#redirect-url-examples-with-wildcards)\
\
| Redirect URL | Description |\
| --- | --- |\
| `http://localhost:3000/*` | matches `http://localhost:3000/foo`, `http://localhost:3000/bar` but not `http://localhost:3000/foo/bar` or `http://localhost:3000/foo/` (note the trailing slash) |\
| `http://localhost:3000/**` | matches `http://localhost:3000/foo`, `http://localhost:3000/bar` and `http://localhost:3000/foo/bar` |\
| `http://localhost:3000/?` | matches `http://localhost:3000/a` but not `http://localhost:3000/foo` |\
| `http://localhost:3000/[!a-z]` | matches `http://localhost:3000/1` but not `http://localhost:3000/a` |\
\
## Netlify preview URLs [\#](https://supabase.com/docs/guides/auth/redirect-urls\#netlify-preview-urls)\
\
For deployments with Netlify, set the `SITE_URL` to your official site URL. Add the following additional redirect URLs for local development and deployment previews:\
\
- `http://localhost:3000/**`\
- `https://**--my_org.netlify.app/**`\
\
## Vercel preview URLs [\#](https://supabase.com/docs/guides/auth/redirect-urls\#vercel-preview-urls)\
\
For deployments with Vercel, set the `SITE_URL` to your official site URL. Add the following additional redirect URLs for local development and deployment previews:\
\
- `http://localhost:3000/**`\
- `https://*-<team-or-account-slug>.vercel.app/**`\
\
Vercel provides an environment variable for the URL of the deployment called `NEXT_PUBLIC_VERCEL_URL`. See the [Vercel docs](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables) for more details. You can use this variable to dynamically redirect depending on the environment. You should also set the value of the environment variable called NEXT\_PUBLIC\_SITE\_URL, this should be set to your site URL in production environment to ensure that redirects function correctly.\
\
```\
1\
const getURL = () => {\
2\
  let url =\
3\
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.\
4\
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.\
5\
    'http://localhost:3000/'\
6\
  // Make sure to include `https://` when not localhost.\
7\
  url = url.startsWith('http') ? url : `https://${url}`\
8\
  // Make sure to include a trailing `/`.\
9\
  url = url.endsWith('/') ? url : `${url}/`\
10\
  return url\
11\
}\
12\
\
13\
const { data, error } = await supabase.auth.signInWithOAuth({\
14\
  provider: 'github',\
15\
  options: {\
16\
    redirectTo: getURL(),\
17\
  },\
18\
})\
```\
\
## Email templates when using `redirectTo` [\#](https://supabase.com/docs/guides/auth/redirect-urls\#email-templates-when-using-redirectto)\
\
When using a `redirectTo` option, you may need to replace the `{{ .SiteURL }}` with `{{ .RedirectTo }}` in your email templates. See the [Email Templates guide](https://supabase.com/docs/guides/auth/auth-email-templates) for more information.\
\
For example, change the following:\
\
```\
1\
<!-- Old -->\
2\
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Confirm your mail</a>\
3\
\
4\
<!-- New -->\
5\
<a href="{{ .RedirectTo }}/auth/confirm?token_hash={{ .TokenHash }}&type=email"\
6\
  >Confirm your mail</a\
7\
>\
```\
\
## Mobile deep linking URIs [\#](https://supabase.com/docs/guides/auth/redirect-urls\#mobile-deep-linking-uris)\
\
For mobile applications you can use deep linking URIs. For example, for your `SITE_URL` you can specify something like `com.supabase://login-callback/` and for additional redirect URLs something like `com.supabase.staging://login-callback/` if needed.\
\
Read more about deep linking and find code examples for different frameworks [here](https://supabase.com/docs/guides/auth/native-mobile-deep-linking).\
\
## Error handling [\#](https://supabase.com/docs/guides/auth/redirect-urls\#error-handling)\
\
When authentication fails, the user will still be redirected to the redirect URL provided. However, the error details will be returned as query fragments in the URL. You can parse these query fragments and show a custom error message to the user. For example:\
\
```\
1\
const params = new URLSearchParams(window.location.hash.slice())\
2\
\
3\
if (params.get('error_code').startsWith('4')) {\
4\
  // show error message if error is a 4xx error\
5\
  window.alert(params.get('error_description'))\
6\
}\
```\
\
[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/redirect-urls.mdx)\
\
### Is this helpful?\
\
NoYes\
\
- Need some help?\
[Contact support](https://supabase.com/support)\
- Latest product updates?\
[See Changelog](https://supabase.com/changelog)\
- Something's not right?\
[Check system status](https://status.supabase.com/)\
\
* * *\
\
[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings\
\
[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)