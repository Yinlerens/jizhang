---
url: "https://supabase.com/docs/guides/auth/oauth-server/getting-started"
title: "Getting Started with OAuth 2.1 Server | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/oauth-server/getting-started)

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
3. OAuth 2.1 Server
5. [Getting Started](https://supabase.com/docs/guides/auth/oauth-server/getting-started)

# Getting Started with OAuth 2.1 Server

* * *

This guide will walk you through setting up your Supabase project as an OAuth 2.1 identity provider, from enabling the feature to registering your first client application.

## Prerequisites [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#prerequisites)

Before you begin, make sure you have:

- A Supabase project (create one at [supabase.com](https://supabase.com/))
- Admin access to your project
- (Optional) [Supabase CLI](https://supabase.com/docs/guides/cli) v2.54.11 or higher for local development

## Overview [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#overview)

Setting up OAuth 2.1 in your Supabase project involves these steps:

1. Enable OAuth 2.1 server capabilities in your project
2. Configure your authorization path
3. Build your authorization UI (frontend)
4. Register OAuth client applications

Testing OAuth flows is often easier on a Supabase project since it's already accessible on the web, no tunnel or additional configuration needed.

## Enable OAuth 2.1 server [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#enable-oauth-21-server)

OAuth 2.1 server is currently in beta and free to use during the beta period on all Supabase plans.

CloudCLI

1. Go to your project dashboard
2. Navigate to **Authentication** \> **OAuth Server** in the sidebar
3. Enable OAuth 2.1 server capabilities

Once enabled, your project will expose the necessary OAuth endpoints:

CloudCLI

| Endpoint | URL |
| --- | --- |
| **Authorization endpoint** | `https://<project-ref>.supabase.co/auth/v1/oauth/authorize` |
| **Token endpoint** | `https://<project-ref>.supabase.co/auth/v1/oauth/token` |
| **JWKS endpoint** | `https://<project-ref>.supabase.co/auth/v1/.well-known/jwks.json` |
| **Discovery endpoint** | `https://<project-ref>.supabase.co/.well-known/oauth-authorization-server/auth/v1` |
| **OIDC discovery** | `https://<project-ref>.supabase.co/auth/v1/.well-known/openid-configuration` |

**Use asymmetric JWT signing keys for better security**

By default, Supabase uses HS256 (symmetric) for signing JWTs. For OAuth use cases, we recommend migrating to asymmetric algorithms like RS256 or ES256. Asymmetric keys are more scalable and secure because:

- OAuth clients can validate JWTs using the public key from your JWKS endpoint
- No need to share your JWT secret with third-party applications
- More resilient architecture for distributed systems

Learn more about [configuring JWT signing keys](https://supabase.com/docs/guides/auth/signing-keys).

**Note:** If you plan to use OpenID Connect ID tokens (by requesting the `openid` scope), asymmetric signing algorithms are **required**. ID token generation will fail with HS256.

## Configure your authorization path [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#configure-your-authorization-path)

Before registering clients, you need to configure where your authorization UI will live.

1. In your project dashboard, navigate to **Authentication** \> **OAuth Server**
2. Set the **Authorization Path** (e.g., `/oauth/consent`)

The authorization path is combined with your Site URL (configured in **Authentication** \> **URL Configuration**) to create the full authorization endpoint URL.

Your authorization UI will be at the combined Site URL + Authorization Path. For example:

- Site URL: `https://example.com` (from **Authentication** \> **URL Configuration**)
- Authorization Path: `/oauth/consent` (from **OAuth Server** settings)
- Your authorization UI: `https://example.com/oauth/consent`

When OAuth clients initiate the authorization flow, Supabase Auth will redirect users to this URL with an `authorization_id` query parameter. You'll use [Supabase JavaScript library OAuth methods](https://github.com/supabase/supabase-js/blob/master/packages/core/auth-js/src/GoTrueClient.ts#L2159-L2163) to handle the authorization:

- `supabase.auth.oauth.getAuthorizationDetails(authorization_id)` \- Retrieve client and authorization details
- `supabase.auth.oauth.approveAuthorization(authorization_id)` \- Approve the authorization request
- `supabase.auth.oauth.denyAuthorization(authorization_id)` \- Deny the authorization request

## Build your authorization UI [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#build-your-authorization-ui)

This is where you build the **frontend** for your authorization flow. When third-party apps initiate OAuth, users will be redirected to your authorization path (configured in the previous step) with an `authorization_id` query parameter.

Your authorization UI should:

1. **Extract authorization\_id** \- Get the `authorization_id` from the URL query parameters
2. **Authenticate the user** \- If not already logged in, redirect to your login page (preserving the authorization\_id)
3. **Retrieve authorization details** \- Use `supabase.auth.oauth.getAuthorizationDetails(authorization_id)` to get client information including requested scopes
4. **Display consent screen** \- Show the user what app is requesting access and what scopes/permissions are being requested
5. **Handle user decision** \- Call either `approveAuthorization(authorization_id)` or `denyAuthorization(authorization_id)` based on user choice

The authorization details include a `scopes` field that contains the scopes requested by the client (e.g., `["openid", "email", "profile"]`). You should display these scopes to the user so they understand what information will be shared.

This is a **frontend implementation**. You're building the UI that displays the consent screen and handles user interactions. The actual OAuth token generation is handled by Supabase Auth after you call the approve/deny methods.

### Example authorization UI [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#example-authorization-ui)

Here's how to build a minimal authorization page at your configured path (e.g., `/oauth/consent`):

Next.jsReact (SPA)

```
1
// app/oauth/consent/page.tsx
2
import { createServerClient } from '@supabase/ssr'
3
import { cookies } from 'next/headers'
4
import { redirect } from 'next/navigation'
5

6
export default async function ConsentPage({
7
  searchParams,
8
}: {
9
  searchParams: { authorization_id?: string }
10
}) {
11
  const authorizationId = searchParams.authorization_id
12

13
  if (!authorizationId) {
14
    return <div>Error: Missing authorization_id</div>
15
  }
16

17
  const supabase = createServerClient(
18
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
19
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
20
    {
21
      cookies: {
22
        getAll: async () => (await cookies()).getAll(),
23
        setAll: async (cookiesToSet) => {
24
          const cookieStore = await cookies()
25
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
26
        },
27
      },
28
    }
29
  )
30

31
  // Check if user is authenticated
32
  const {
33
    data: { user },
34
  } = await supabase.auth.getUser()
35

36
  if (!user) {
37
    // Redirect to login, preserving authorization_id
38
    redirect(`/login?redirect=/oauth/consent?authorization_id=${authorizationId}`)
39
  }
40

41
  // Get authorization details using the authorization_id
42
  const { data: authDetails, error } =
43
    await supabase.auth.oauth.getAuthorizationDetails(authorizationId)
44

45
  if (error || !authDetails) {
46
    return <div>Error: {error?.message || 'Invalid authorization request'}</div>
47
  }
48

49
  return (
50
    <div>
51
      <h1>Authorize {authDetails.client.name}</h1>
52
      <p>This application wants to access your account.</p>
53

54
      <div>
55
        <p>
56
          <strong>Client:</strong> {authDetails.client.name}
57
        </p>
58
        <p>
59
          <strong>Redirect URI:</strong> {authDetails.redirect_uri}
60
        </p>
61
        {authDetails.scopes && authDetails.scopes.length > 0 && (
62
          <div>
63
            <strong>Requested permissions:</strong>
64
            <ul>
65
              {authDetails.scopes.map((scope) => (
66
                <li key={scope}>{scope}</li>
67
              ))}
68
            </ul>
69
          </div>
70
        )}
71
      </div>
72

73
      <form action="/api/oauth/decision" method="POST">
74
        <input type="hidden" name="authorization_id" value={authorizationId} />
75
        <button type="submit" name="decision" value="approve">
76
          Approve
77
        </button>
78
        <button type="submit" name="decision" value="deny">
79
          Deny
80
        </button>
81
      </form>
82
    </div>
83
  )
84
}
```

```
1
// app/api/oauth/decision/route.ts
2
import { createServerClient } from '@supabase/ssr'
3
import { cookies } from 'next/headers'
4
import { NextResponse } from 'next/server'
5

6
export async function POST(request: Request) {
7
  const formData = await request.formData()
8
  const decision = formData.get('decision')
9
  const authorizationId = formData.get('authorization_id') as string
10

11
  if (!authorizationId) {
12
    return NextResponse.json({ error: 'Missing authorization_id' }, { status: 400 })
13
  }
14

15
  const supabase = createServerClient(
16
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
17
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
18
    {
19
      cookies: {
20
        getAll: async () => (await cookies()).getAll(),
21
        setAll: async (cookiesToSet) => {
22
          const cookieStore = await cookies()
23
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
24
        },
25
      },
26
    }
27
  )
28

29
  if (decision === 'approve') {
30
    const { data, error } = await supabase.auth.oauth.approveAuthorization(authorizationId)
31

32
    if (error) {
33
      return NextResponse.json({ error: error.message }, { status: 400 })
34
    }
35

36
    // Redirect back to the client with authorization code
37
    return NextResponse.redirect(data.redirect_to)
38
  } else {
39
    const { data, error } = await supabase.auth.oauth.denyAuthorization(authorizationId)
40

41
    if (error) {
42
      return NextResponse.json({ error: error.message }, { status: 400 })
43
    }
44

45
    // Redirect back to the client with error
46
    return NextResponse.redirect(data.redirect_to)
47
  }
48
}
```

### How it works [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#how-it-works)

1. **User navigates to your authorization path** \- When a third-party app initiates OAuth, Supabase Auth redirects the user to your configured authorization path (e.g., `https://example.com/oauth/consent?authorization_id=<id>`)
2. **Extract authorization\_id** \- Your page extracts the `authorization_id` from the URL query parameters
3. **Check authentication** \- Your page checks if the user is logged in, redirecting to login if not (preserving the authorization\_id)
4. **Retrieve details** \- Call `supabase.auth.oauth.getAuthorizationDetails(authorization_id)` to get information about the requesting client
5. **Show consent screen** \- Display a UI asking the user to approve or deny access
6. **Handle decision**\- When the user clicks approve/deny:
   - Call `supabase.auth.oauth.approveAuthorization(authorization_id)` or `denyAuthorization(authorization_id)`
   - These methods handle all OAuth logic internally (generating authorization codes, etc.)
   - They return a `redirect_to` URL
7. **Redirect back** \- Redirect the user to the `redirect_to` URL, which sends them back to the third-party app with either an authorization code (approved) or error (denied)

## Register an OAuth client [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#register-an-oauth-client)

Before third-party applications can use your project as an identity provider, you need to register them as OAuth clients.

DashboardProgrammatically

1. Go to **Authentication** \> **OAuth Apps** (under the **Manage** section)
2. Click **Add a new client**
3. Enter the client details:
   - **Client name**: A friendly name for your application
   - **Redirect URIs**: One or more URLs where users will be redirected after authorization
   - **Client type**: Choose between:
     - **Public** \- For mobile and single-page apps (no client secret)
     - **Confidential** \- For server-side apps (includes client secret)
4. Click **Create**

You'll receive:

- **Client ID**: A unique identifier for the client
- **Client Secret** (for confidential clients): A secret key for authenticating the client

Store the client secret securely. It will only be shown once. If you lose it, you can regenerate a new one from the **OAuth Apps** page.

## Customizing tokens (optional) [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#customizing-tokens-optional)

By default, OAuth access tokens include standard claims like `user_id`, `role`, and `client_id`. If you need to customize tokens—for example, to set a specific `audience` claim for third-party validation or add client-specific metadata—use [Custom Access Token Hooks](https://supabase.com/docs/guides/auth/auth-hooks/access-token-hook).

Custom Access Token Hooks are triggered for all token issuance, including OAuth flows. You can use the `client_id` parameter to customize tokens based on which OAuth client is requesting them.

### Common use cases [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#common-use-cases)

- **Customize `audience` claim**: Set the `aud` claim to the third-party API endpoint for proper JWT validation
- **Add client-specific permissions**: Include custom claims based on which OAuth client is requesting access
- **Implement dynamic scopes**: Add metadata that RLS policies can use for fine-grained access control

For more examples, see [Token Security & RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security#custom-access-token-hooks).

## Redirect URI configuration [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#redirect-uri-configuration)

Redirect URIs are critical for OAuth security. Supabase Auth will only redirect to URIs that are explicitly registered with the client.

**Not to be confused with general redirect URLs**

This section is about **OAuth client redirect URIs** \- where to send users after they authorize third-party apps to access your Supabase project. This is different from the general [Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls) setting, which controls where to send users after they sign in TO your app using social providers.

**Exact matches only - No wildcards or patterns**

OAuth client redirect URIs require exact, complete URL matches. Unlike general redirect URLs (which support wildcards), OAuth client redirect URIs do NOT support wildcards, patterns, or partial URLs. You must register the full, exact callback URL.

### Best practices [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#best-practices)

- **Use HTTPS in production** \- Always use HTTPS for redirect URIs in production
- **Register exact, complete URLs** \- Each redirect URI must be the full URL including protocol, domain, path, and port if needed
- **Use separate OAuth clients per environment** \- Create separate OAuth clients for development, staging, and production. This provides better security isolation, allows independent secret rotation, and improves auditability. If you need to use the same client across environments, you can register multiple redirect URIs, but separate clients are recommended.

## Next steps [\#](https://supabase.com/docs/guides/auth/oauth-server/getting-started\#next-steps)

Now that you've registered your first OAuth client, you're ready to:

- [Understand OAuth flows](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows) \- Learn how the authorization code and refresh token flows work
- [Implement MCP authentication](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication) \- Enable AI agent authentication
- [Secure with RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security) \- Control data access for OAuth clients

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/oauth-server/getting-started.mdx)

### Is this helpful?

NoYes

### On this page

[Prerequisites](https://supabase.com/docs/guides/auth/oauth-server/getting-started#prerequisites) [Overview](https://supabase.com/docs/guides/auth/oauth-server/getting-started#overview) [Enable OAuth 2.1 server](https://supabase.com/docs/guides/auth/oauth-server/getting-started#enable-oauth-21-server) [Configure your authorization path](https://supabase.com/docs/guides/auth/oauth-server/getting-started#configure-your-authorization-path) [Build your authorization UI](https://supabase.com/docs/guides/auth/oauth-server/getting-started#build-your-authorization-ui) [Example authorization UI](https://supabase.com/docs/guides/auth/oauth-server/getting-started#example-authorization-ui) [How it works](https://supabase.com/docs/guides/auth/oauth-server/getting-started#how-it-works) [Register an OAuth client](https://supabase.com/docs/guides/auth/oauth-server/getting-started#register-an-oauth-client) [Customizing tokens (optional)](https://supabase.com/docs/guides/auth/oauth-server/getting-started#customizing-tokens-optional) [Common use cases](https://supabase.com/docs/guides/auth/oauth-server/getting-started#common-use-cases) [Redirect URI configuration](https://supabase.com/docs/guides/auth/oauth-server/getting-started#redirect-uri-configuration) [Best practices](https://supabase.com/docs/guides/auth/oauth-server/getting-started#best-practices) [Next steps](https://supabase.com/docs/guides/auth/oauth-server/getting-started#next-steps)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)