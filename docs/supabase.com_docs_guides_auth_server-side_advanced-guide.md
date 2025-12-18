---
url: "https://supabase.com/docs/guides/auth/server-side/advanced-guide"
title: "Advanced guide | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/server-side/advanced-guide)

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

[Creating a client](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
[Migrating from Auth Helpers](https://supabase.com/docs/guides/auth/server-side/migrating-to-ssr-from-auth-helpers)
[Advanced guide](https://supabase.com/docs/guides/auth/server-side/advanced-guide)

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
3. More
5. [Server-Side Rendering](https://supabase.com/docs/guides/auth/server-side)
7. [Advanced guide](https://supabase.com/docs/guides/auth/server-side/advanced-guide)

# Advanced guide

## Details about SSR Auth flows and implementation for advanced users.

* * *

When a user authenticates with Supabase Auth, two pieces of information are issued by the server:

1. **Access token** in the form of a JWT.
2. **Refresh token** which is a randomly generated string.

The default behavior if you're not using SSR is to store this information in local storage. Local storage isn't accessible by the server, so for SSR, the tokens instead need to be stored in a secure cookie. The cookie can then be passed back and forth between your app code in the client and your app code in the server.

If you're not using SSR, you might also be using the [implicit flow](https://supabase.com/docs/guides/auth/sessions/implicit-flow) to get the access and refresh tokens. The server can't access the tokens in this flow, so for SSR, you should change to the [PKCE flow](https://supabase.com/docs/guides/auth/sessions/pkce-flow). You can change the flow type when initiating your Supabase client if your client library provides this option.

In the `@supabase/ssr` package, Supabase clients are initiated to use the PKCE flow by default. They are also automatically configured to handle the saving and retrieval of session information in cookies.

## How it works [\#](https://supabase.com/docs/guides/auth/server-side/advanced-guide\#how-it-works)

In the PKCE flow, a redirect is made to your app, with an Auth Code contained in the URL. When you exchange this code using `exchangeCodeForSession`, you receive the session information, which contains the access and refresh tokens.

To maintain the session, these tokens must be stored in a storage medium securely shared between client and server, which is traditionally cookies. Whenever the session is refreshed, the auth and refresh tokens in the shared storage medium must be updated. Supabase client libraries provide a customizable `storage` option when a client is initiated, allowing you to change where tokens are stored.

## Frequently asked questions [\#](https://supabase.com/docs/guides/auth/server-side/advanced-guide\#frequently-asked-questions)

### No session on the server side with Next.js route prefetching? [\#](https://supabase.com/docs/guides/auth/server-side/advanced-guide\#no-session-on-the-server-side-with-nextjs-route-prefetching)

When you use route prefetching in Next.js using `<Link href="/...">` components or the `Router.push()` APIs can send server-side requests before the browser processes the access and refresh tokens. This means that those requests may not have any cookies set and your server code will render unauthenticated content.

To improve experience for your users, we recommend redirecting users to one specific page after sign-in that does not include any route prefetching from Next.js. Once the Supabase client library running in the browser has obtained the access and refresh tokens from the URL fragment, you can send users to any pages that use prefetching.

### How do I make the cookies `HttpOnly`? [\#](https://supabase.com/docs/guides/auth/server-side/advanced-guide\#how-do-i-make-the-cookies-httponly-)

This is not necessary. Both the access token and refresh token are designed to be passed around to different components in your application. The browser-based side of your application needs access to the refresh token to properly maintain a browser session anyway.

### My server is getting invalid refresh token errors. What's going on? [\#](https://supabase.com/docs/guides/auth/server-side/advanced-guide\#my-server-is-getting-invalid-refresh-token-errors-whats-going-on)

It is likely that the refresh token sent from the browser to your server is stale. Make sure the `onAuthStateChange` listener callback is free of bugs and is registered relatively early in your application's lifetime

When you receive this error on the server-side, try to defer rendering to the browser where the client library can access an up-to-date refresh token and present the user with a better experience.

### Should I set a shorter `Max-Age` parameter on the cookies? [\#](https://supabase.com/docs/guides/auth/server-side/advanced-guide\#should-i-set-a-shorter-max-age-parameter-on-the-cookies)

The `Max-Age` or `Expires` cookie parameters only control whether the browser sends the value to the server. Since a refresh token represents the long-lived authentication session of the user on that browser, setting a short `Max-Age` or `Expires` parameter on the cookies only results in a degraded user experience.

The only way to ensure that a user has logged out or their session has ended is to get the user's details with `getUser()`. The `getClaims()` method only checks local JWT validation (signature and expiration), but it doesn't verify with the auth server whether the session is still valid or if the user has logged out server-side.

### What should I use for the `SameSite` property? [\#](https://supabase.com/docs/guides/auth/server-side/advanced-guide\#what-should-i-use-for-the-samesite-property)

Make sure you [understand the behavior of the property in different situations](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) as some properties can degrade the user experience.

A good default is to use `Lax` which sends cookies when users are navigating to your site. Cookies typically require the `Secure` attribute, which only sends them over HTTPS. However, this can be a problem when developing on `localhost`.

### Can I use server-side rendering with a CDN or cache? [\#](https://supabase.com/docs/guides/auth/server-side/advanced-guide\#can-i-use-server-side-rendering-with-a-cdn-or-cache)

Yes, but you need to be careful to include at least the refresh token cookie value in the cache key. Otherwise you may be accidentally serving pages with data belonging to different users!

Also be sure you set proper cache control headers. We recommend invalidating cache keys every hour or less.

### Which authentication flows have PKCE support? [\#](https://supabase.com/docs/guides/auth/server-side/advanced-guide\#which-authentication-flows-have-pkce-support)

At present, PKCE is supported on the Magic Link, OAuth, Sign Up, and Password Recovery routes. These correspond to the `signInWithOtp`, `signInWithOAuth`, `signUp`, and `resetPasswordForEmail` methods on the Supabase client library. When using PKCE with Phone and Email OTPs, there is no behavior change with respect to the implicit flow - an access token will be returned in the body when a request is successful.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/server-side/advanced-guide.mdx)

### Is this helpful?

NoYes

### On this page

[How it works](https://supabase.com/docs/guides/auth/server-side/advanced-guide#how-it-works) [Frequently asked questions](https://supabase.com/docs/guides/auth/server-side/advanced-guide#frequently-asked-questions) [No session on the server side with Next.js route prefetching?](https://supabase.com/docs/guides/auth/server-side/advanced-guide#no-session-on-the-server-side-with-nextjs-route-prefetching) [How do I make the cookies HttpOnly?](https://supabase.com/docs/guides/auth/server-side/advanced-guide#how-do-i-make-the-cookies-httponly-) [My server is getting invalid refresh token errors. What's going on?](https://supabase.com/docs/guides/auth/server-side/advanced-guide#my-server-is-getting-invalid-refresh-token-errors-whats-going-on) [Should I set a shorter Max-Age parameter on the cookies?](https://supabase.com/docs/guides/auth/server-side/advanced-guide#should-i-set-a-shorter-max-age-parameter-on-the-cookies) [What should I use for the SameSite property?](https://supabase.com/docs/guides/auth/server-side/advanced-guide#what-should-i-use-for-the-samesite-property) [Can I use server-side rendering with a CDN or cache?](https://supabase.com/docs/guides/auth/server-side/advanced-guide#can-i-use-server-side-rendering-with-a-cdn-or-cache) [Which authentication flows have PKCE support?](https://supabase.com/docs/guides/auth/server-side/advanced-guide#which-authentication-flows-have-pkce-support)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)