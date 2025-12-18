---
url: "https://supabase.com/docs/guides/auth/sessions/pkce-flow"
title: "PKCE flow | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/sessions/pkce-flow)

[Overview](https://supabase.com/docs/guides/auth)

[Architecture](https://supabase.com/docs/guides/auth/architecture)

Getting Started[Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
[React](https://supabase.com/docs/guides/auth/quickstarts/react)
[React Native](https://supabase.com/docs/guides/auth/quickstarts/react-native)
[React Native with Expo & Social Auth](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth)

Concepts[Users](https://supabase.com/docs/guides/auth/users)
[Identities](https://supabase.com/docs/guides/auth/identities)

Sessions

[User sessions](https://supabase.com/docs/guides/auth/sessions)
[Implicit flow](https://supabase.com/docs/guides/auth/sessions/implicit-flow)
[PKCE flow](https://supabase.com/docs/guides/auth/sessions/pkce-flow)

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
3. More
5. [Sessions](https://supabase.com/docs/guides/auth/sessions)
7. [PKCE flow](https://supabase.com/docs/guides/auth/sessions/pkce-flow)

# PKCE flow

## About authenticating with PKCE flow.

* * *

The Proof Key for Code Exchange (PKCE) flow is one of two ways that a user can authenticate and your app can receive the necessary access and refresh tokens.

The flow is an implementation detail handled for you by Supabase Auth, but understanding the difference between PKCE and [implicit flow](https://supabase.com/docs/guides/auth/sessions/implicit-flow) is important for understanding the difference between client-only and server-side auth.

## How it works [\#](https://supabase.com/docs/guides/auth/sessions/pkce-flow\#how-it-works)

After a successful verification, the user is redirected to your app with a URL that looks like this:

```
1
https://yourapp.com/...?code=<...>
```

The `code` parameter is commonly known as the Auth Code and can be exchanged for an access token by calling `exchangeCodeForSession(code)`.

For security purposes, the code has a validity of 5 minutes and can only be exchanged for an access token once. You will need to restart the authentication flow from scratch if you wish to obtain a new access token.

As the flow is run server side, `localStorage` may not be available. You may configure the client library to use a custom storage adapter and an alternate backing storage such as cookies by setting the `storage` option to an object with the following methods:

```
1
const customStorageAdapter: SupportedStorage = {
2
    getItem: (key) => {
3
    if (!supportsLocalStorage()) {
4
        // Configure alternate storage
5
        return null
6
    }
7
    return globalThis.localStorage.getItem(key)
8
    },
9
    setItem: (key, value) => {
10
    if (!supportsLocalStorage()) {
11
        // Configure alternate storage here
12
        return
13
    }
14
    globalThis.localStorage.setItem(key, value)
15
    },
16
    removeItem: (key) => {
17
    if (!supportsLocalStorage()) {
18
        // Configure alternate storage here
19
        return
20
    }
21
    globalThis.localStorage.removeItem(key)
22
    },
23
}
```

You may also configure the client library to automatically exchange it for a session after a successful redirect. This can be done by setting the `detectSessionInUrl` option to `true`.

Putting it all together, your client library initialization may look like this:

```
1
const supabase = createClient('https://xyzcompany.supabase.co', 'publishable-or-anon-key', {
2
  // ...
3
  auth: {
4
    // ...
5
    detectSessionInUrl: true,
6
    flowType: 'pkce',
7
    storage: {
8
      getItem: () => Promise.resolve('FETCHED_TOKEN'),
9
      setItem: () => {},
10
      removeItem: () => {},
11
    },
12
  },
13
  // ...
14
})
```

## Limitations [\#](https://supabase.com/docs/guides/auth/sessions/pkce-flow\#limitations)

Behind the scenes, the code exchange requires a code verifier. Both the code in the URL and the code verifier are sent back to the Auth server for a successful exchange.

The code verifier is created and stored locally when the Auth flow is first initiated. That means the code exchange must be initiated on the same browser and device where the flow was started.

## Resources [\#](https://supabase.com/docs/guides/auth/sessions/pkce-flow\#resources)

- [OAuth 2.0 guide](https://oauth.net/2/pkce/) to PKCE flow

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/sessions/pkce-flow.mdx)

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