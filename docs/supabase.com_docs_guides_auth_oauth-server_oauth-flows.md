---
url: "https://supabase.com/docs/guides/auth/oauth-server/oauth-flows"
title: "OAuth 2.1 Flows | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows)

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
3. OAuth 2.1 Server
5. [OAuth Flows](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows)

# OAuth 2.1 Flows

* * *

Supabase Auth implements OAuth 2.1 with OpenID Connect (OIDC), supporting the authorization code flow with PKCE and refresh token flow. This guide explains how these flows work in detail.

This guide explains the OAuth 2.1 flows for **third-party client applications** that authenticate with your Supabase project. These flows require custom implementation and are not available in the `@supabase/supabase-js` library. The `supabase-js` library is for authenticating **with** Supabase Auth as an identity provider, not for building your own OAuth server.

## Supported grant types [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#supported-grant-types)

Supabase Auth supports two OAuth 2.1 grant types:

1. **Authorization Code with PKCE** (`authorization_code`) \- For obtaining initial access tokens
2. **Refresh Token** (`refresh_token`) \- For obtaining new access tokens without re-authentication

Other grant types like `client_credentials` or `password` are not supported.

## Authorization code flow with PKCE [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#authorization-code-flow-with-pkce)

The authorization code flow with PKCE (Proof Key for Code Exchange) is the recommended flow for all OAuth clients, including single-page applications, mobile apps, and server-side applications.

### How it works [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#how-it-works)

The flow consists of several steps:

1. **Client initiates authorization** \- Third-party app redirects user to Supabase Auth's authorize endpoint
2. **Supabase validates and redirects** \- Supabase Auth validates OAuth parameters and redirects user to your configured authorization URL
3. **User authenticates and authorizes** \- Your frontend checks if user is logged in, shows consent screen, and handles approval/denial
4. **Authorization code issued** \- Supabase Auth generates a short-lived authorization code and redirects back to client
5. **Code exchange** \- Client exchanges the code for tokens
6. **Access granted** \- Client receives access token, refresh token, and ID token

### Flow diagram [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#flow-diagram)

Here's a visual representation of the complete authorization code flow:

```
1
┌─────────────┐              ┌──────────────────┐              ┌──────────────────┐
2
│             │              │                  │              │                  │
3
│   Client    │              │   Your Auth UI   │              │  Supabase Auth   │
4
│     App     │              │   (Frontend)     │              │                  │
5
│             │              │                  │              │                  │
6
└──────┬──────┘              └────────┬─────────┘              └────────┬─────────┘
7
       │                              │                                 │
8
       │  1. Generate PKCE params                                       │
9
       │     (code_verifier, code_challenge)                            │
10
       │                              │                                 │
11
       │  2. Redirect to /oauth/authorize with code_challenge           │
12
       ├────────────────────────────────────────────────────────────────>│
13
       │                              │                                 │
14
       │                              │  3. Validate params & redirect  │
15
       │                              │     to authorization_path       │
16
       │                              │<────────────────────────────────┤
17
       │                              │                                 │
18
       │                              │  4. getAuthorizationDetails()   │
19
       │                              ├────────────────────────────────>│
20
       │                              │  Return client info             │
21
       │                              │<────────────────────────────────┤
22
       │                              │                                 │
23
       │                              │  5. User login & consent        │
24
       │                              │                                 │
25
       │                              │  6. approveAuthorization()      │
26
       │                              ├────────────────────────────────>│
27
       │                              │  Return redirect_to with code   │
28
       │                              │<────────────────────────────────┤
29
       │                              │                                 │
30
       │  7. Redirect to client callback with code                      │
31
       │<───────────────────────────────────────────────────────────────┤
32
       │                              │                                 │
33
       │  8. Exchange code for tokens (POST /oauth/token)               │
34
       │     with code_verifier                                         │
35
       ├────────────────────────────────────────────────────────────────>│
36
       │                              │                                 │
37
       │  9. Return tokens (access, refresh, ID)                        │
38
       │<────────────────────────────────────────────────────────────────┤
39
       │                              │                                 │
40
       │  10. Access resources with access_token                        │
41
       │                              │                                 │
42
       │  11. Refresh tokens (POST /oauth/token with refresh_token)     │
43
       ├────────────────────────────────────────────────────────────────>│
44
       │                              │                                 │
45
       │  12. Return new tokens                                         │
46
       │<────────────────────────────────────────────────────────────────┤
47
       │                              │                                 │
```

**Key points:**

- Third-party client redirects user to **Supabase Auth's authorize endpoint** (not directly to your UI)
- Supabase Auth validates OAuth parameters and redirects to **your authorization path**
- Your frontend UI handles authentication and consent using `supabase-js` OAuth methods
- Supabase Auth handles all backend OAuth logic (code generation, token issuance)

### Step 1: Generate PKCE parameters [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#step-1-generate-pkce-parameters)

Before initiating the flow, the client must generate PKCE parameters:

```
1
// Generate a random code verifier (43-128 characters)
2
function generateCodeVerifier() {
3
  const array = new Uint8Array(32)
4
  crypto.getRandomValues(array)
5
  return base64URLEncode(array)
6
}
7

8
// Create code challenge from verifier
9
async function generateCodeChallenge(verifier) {
10
  const encoder = new TextEncoder()
11
  const data = encoder.encode(verifier)
12
  const hash = await crypto.subtle.digest('SHA-256', data)
13
  return base64URLEncode(new Uint8Array(hash))
14
}
15

16
function base64URLEncode(buffer) {
17
  return btoa(String.fromCharCode(...buffer))
18
    .replace(/\+/g, '-')
19
    .replace(/\//g, '_')
20
    .replace(/=/g, '')
21
}
22

23
// Generate and store verifier (you'll need it later)
24
const codeVerifier = generateCodeVerifier()
25
sessionStorage.setItem('code_verifier', codeVerifier)
26

27
// Generate challenge to send in authorization request
28
const codeChallenge = await generateCodeChallenge(codeVerifier)
```

### Step 2: Authorization request [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#step-2-authorization-request)

The client redirects the user to your authorization endpoint with the following parameters:

```
1
https://<project-ref>.supabase.co/auth/v1/oauth/authorize?
2
  response_type=code
3
  &client_id=<client-id>
4
  &redirect_uri=<configured-redirect-uri>
5
  &state=<random-state>
6
  &code_challenge=<code-challenge>
7
  &code_challenge_method=S256
```

#### Required parameters [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#required-parameters)

| Parameter | Description |
| --- | --- |
| `response_type` | Must be `code` for authorization code flow |
| `client_id` | The client ID from registration |
| `redirect_uri` | Must exactly match a registered redirect URI |
| `code_challenge` | The generated code challenge |
| `code_challenge_method` | Must be `S256` (SHA-256) |

#### Optional parameters [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#optional-parameters)

| Parameter | Description |
| --- | --- |
| `state` | Random string to prevent CSRF attacks (highly recommended) |
| `scope` | Space-separated list of scopes (e.g., `openid email profile phone`). Requested scopes will be included in the access token and control what information is returned by the UserInfo endpoint. Default scope when none provided is `email`. If the `openid` scope is requested, an ID token will be included in the response. |
| `nonce` | Random string for replay attack protection. If provided, will be included in the ID token. |

Always include a `state` parameter to protect against CSRF attacks. Generate a random string, store it in session storage, and verify it matches when the user returns.

### Step 3: User authentication and consent [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#step-3-user-authentication-and-consent)

After receiving the authorization request, Supabase Auth validates the OAuth parameters (client\_id, redirect\_uri, PKCE, etc.) and then redirects the user to your configured **authorization path** (e.g., `https://example.com/oauth/consent?authorization_id=<id>`).

The URL will contain an `authorization_id` query parameter that identifies this authorization request.

Your frontend application at the authorization path should:

1. **Extract authorization\_id** \- Get the `authorization_id` from the URL query parameters
2. **Fetch authorization details** \- Call `supabase.auth.oauth.getAuthorizationDetails(authorization_id)` to retrieve information about the OAuth client and request parameters
3. **Check user authentication** \- Verify if the user is logged in; if not, redirect to your login page (preserving the full authorization path including the `authorization_id`). After successful login, redirect the user back to the authorization path with the same `authorization_id` query parameter
4. **Display consent screen** \- Show the user information about the requesting client (name, redirect URI, scopes)
5. **Handle user decision**\- When the user approves or denies:
   - Call `supabase.auth.oauth.approveAuthorization(authorization_id)` to approve
   - Call `supabase.auth.oauth.denyAuthorization(authorization_id)` to deny
   - Redirect user to the returned `redirect_to` URL

This is a **frontend implementation** using `supabase-js`. Supabase Auth handles all the backend OAuth logic (generating authorization codes, validating requests, etc.) after you call the approve/deny methods.

See the [Getting Started guide](https://supabase.com/docs/guides/auth/oauth-server/getting-started#example-authorization-ui) for complete implementation examples.

### Step 4: Authorization code issued [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#step-4-authorization-code-issued)

If the user approves access, Supabase Auth redirects back to the client's redirect URI with an authorization code:

```
1
https://client-app.com/callback?
2
  code=<authorization-code>
3
  &state=<state-from-request>
```

The authorization code is:

- **Short-lived** \- Valid for 10 minutes
- **Single-use** \- Can only be exchanged once
- **Bound to PKCE** \- Can only be exchanged with the correct code verifier

If the user denies access, Supabase Auth redirects with error information in query parameters:

```
1
https://client-app.com/callback?
2
  error=access_denied
3
  &error_description=The+user+denied+the+authorization+request
4
  &state=<state-from-request>
```

The error parameters allow clients to display relevant error messages to users:

| Parameter | Description |
| --- | --- |
| `error` | Error code (e.g., `access_denied`, `invalid_request`, `server_error`) |
| `error_description` | Human-readable error description explaining what went wrong |
| `state` | The state parameter from the original request (for CSRF protection) |

### Step 5: Token exchange [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#step-5-token-exchange)

The client exchanges the authorization code for tokens by making a POST request to the token endpoint:

```
1
curl -X POST 'https://<project-ref>.supabase.co/auth/v1/oauth/token' \
2
  -H 'Content-Type: application/x-www-form-urlencoded' \
3
  -d 'grant_type=authorization_code' \
4
  -d 'code=<authorization-code>' \
5
  -d 'client_id=<client-id>' \
6
  -d 'redirect_uri=<redirect-uri>' \
7
  -d 'code_verifier=<code-verifier>'
```

For confidential clients (with client secret):

```
1
curl -X POST 'https://<project-ref>.supabase.co/auth/v1/oauth/token' \
2
  -H 'Content-Type: application/x-www-form-urlencoded' \
3
  -d 'grant_type=authorization_code' \
4
  -d 'code=<authorization-code>' \
5
  -d 'client_id=<client-id>' \
6
  -d 'client_secret=<client-secret>' \
7
  -d 'redirect_uri=<redirect-uri>' \
8
  -d 'code_verifier=<code-verifier>'
```

#### Example in JavaScript [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#example-in-javascript)

```
1
// Retrieve the code verifier from storage
2
const codeVerifier = sessionStorage.getItem('code_verifier')
3

4
// Exchange code for tokens
5
const response = await fetch(`https://<project-ref>.supabase.co/auth/v1/oauth/token`, {
6
  method: 'POST',
7
  headers: {
8
    'Content-Type': 'application/x-www-form-urlencoded',
9
  },
10
  body: new URLSearchParams({
11
    grant_type: 'authorization_code',
12
    code: authorizationCode,
13
    client_id: '<client-id>',
14
    redirect_uri: '<redirect-uri>',
15
    code_verifier: codeVerifier,
16
  }),
17
})
18

19
const tokens = await response.json()
```

### Step 6: Token response [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#step-6-token-response)

On success, Supabase Auth returns a JSON response with tokens:

```
1
{
2
  "access_token": "eyJhbGc...",
3
  "token_type": "bearer",
4
  "expires_in": 3600,
5
  "refresh_token": "MXff...",
6
  "scope": "openid email profile",
7
  "id_token": "eyJhbGc..."
8
}
```

| Field | Description |
| --- | --- |
| `access_token` | JWT access token for accessing resources |
| `token_type` | Always `bearer` |
| `expires_in` | Token lifetime in seconds (default: 3600) |
| `refresh_token` | Token for obtaining new access tokens |
| `scope` | Granted scopes from the authorization request |
| `id_token` | OpenID Connect ID token (included only if `openid` scope was requested in the authorization request) |

## Access token structure [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#access-token-structure)

Access tokens are JWTs containing standard Supabase claims plus OAuth-specific claims:

```
1
{
2
  "aud": "authenticated",
3
  "exp": 1735819200,
4
  "iat": 1735815600,
5
  "iss": "https://<project-ref>.supabase.co/auth/v1",
6
  "sub": "user-uuid",
7
  "email": "user@example.com",
8
  "phone": "",
9
  "app_metadata": {
10
    "provider": "email",
11
    "providers": ["email"]
12
  },
13
  "user_metadata": {},
14
  "role": "authenticated",
15
  "aal": "aal1",
16
  "amr": [\
17\
    {\
18\
      "method": "password",\
19\
      "timestamp": 1735815600\
20\
    }\
21\
  ],
22
  "session_id": "session-uuid",
23
  "client_id": "9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d"
24
}
```

### OAuth-specific claims [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#oauth-specific-claims)

| Claim | Description |
| --- | --- |
| `client_id` | The OAuth client ID that obtained this token |

All other claims follow the standard [Supabase JWT structure](https://supabase.com/docs/guides/auth/jwts).

### Available scopes [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#available-scopes)

The following scopes are currently supported:

| Scope | Description |
| --- | --- |
| `openid` | Enables OpenID Connect. When requested, an ID token will be included in the response. |
| `email` | Grants access to email and email\_verified claims |
| `profile` | Grants access to profile information (name, picture, etc.) |
| `phone` | Grants access to phone\_number and phone\_number\_verified claims |

**Default scope:** When no scope is specified in the authorization request, the default scope is `email`.

Scopes affect what information is included in ID tokens and returned by the UserInfo endpoint. All OAuth access tokens have full access to user data (same as regular session tokens), with the addition of the `client_id` claim. Use Row Level Security policies with the `client_id` claim to control which data each OAuth client can access.

**Custom scopes are not currently supported.** Only the standard scopes listed above are available. Support for custom scopes is planned for a future release, which will allow you to define application-specific permissions and fine-grained access control.

## Refresh token flow [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#refresh-token-flow)

Refresh tokens allow clients to obtain new access tokens without requiring the user to re-authenticate.

### When to refresh [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#when-to-refresh)

Clients should refresh access tokens when:

- The access token is expired (check the `exp` claim)
- The access token is about to expire (proactive refresh)
- An API call returns a 401 Unauthorized error

### Refresh request [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#refresh-request)

Make a POST request to the token endpoint with the refresh token:

```
1
curl -X POST 'https://<project-ref>.supabase.co/auth/v1/oauth/token' \
2
  -H 'Content-Type: application/x-www-form-urlencoded' \
3
  -d 'grant_type=refresh_token' \
4
  -d 'refresh_token=<refresh-token>' \
5
  -d 'client_id=<client-id>'
```

For confidential clients:

```
1
curl -X POST 'https://<project-ref>.supabase.co/auth/v1/oauth/token' \
2
  -H 'Content-Type: application/x-www-form-urlencoded' \
3
  -d 'grant_type=refresh_token' \
4
  -d 'refresh_token=<refresh-token>' \
5
  -d 'client_id=<client-id>' \
6
  -d 'client_secret=<client-secret>'
```

#### Example in JavaScript [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#example-in-javascript)

```
1
async function refreshAccessToken(refreshToken) {
2
  const response = await fetch(`https://<project-ref>.supabase.co/auth/v1/oauth/token`, {
3
    method: 'POST',
4
    headers: {
5
      'Content-Type': 'application/x-www-form-urlencoded',
6
    },
7
    body: new URLSearchParams({
8
      grant_type: 'refresh_token',
9
      refresh_token: refreshToken,
10
      client_id: '<client-id>',
11
    }),
12
  })
13

14
  if (!response.ok) {
15
    throw new Error('Failed to refresh token')
16
  }
17

18
  return await response.json()
19
}
```

### Refresh response [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#refresh-response)

The response contains a new access token and optionally a new refresh token:

```
1
{
2
  "access_token": "eyJhbGc...",
3
  "token_type": "bearer",
4
  "expires_in": 3600,
5
  "refresh_token": "v1.MXff...",
6
  "scope": "openid email profile"
7
}
```

Refresh tokens may be rotated (a new refresh token is issued). Always update your stored refresh token when a new one is provided.

## OpenID Connect (OIDC) [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#openid-connect-oidc)

Supabase Auth supports OpenID Connect, an identity layer on top of OAuth 2.1.

**ID tokens are only included when the `openid` scope is requested.** To receive an ID token, include `openid` in the space-separated list of scopes in your authorization request. ID tokens are valid for 1 hour.

### ID tokens [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#id-tokens)

ID tokens are JWTs that contain user identity information. They are signed by Supabase Auth and can be verified by clients.

The claims included in the ID token depend on the scopes requested during authorization. For example, requesting `openid email profile` will include email and profile-related claims, while requesting only `openid email` will include only email-related claims.

#### Example ID token [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#example-id-token)

```
1
{
2
  "iss": "https://<project-ref>.supabase.co/auth/v1",
3
  "sub": "user-uuid",
4
  "aud": "client-id",
5
  "exp": 1735819200,
6
  "iat": 1735815600,
7
  "auth_time": 1735815600,
8
  "nonce": "random-nonce-from-request",
9
  "email": "user@example.com",
10
  "email_verified": true,
11
  "phone_number": "+1234567890",
12
  "phone_number_verified": false,
13
  "name": "John Doe",
14
  "picture": "https://example.com/avatar.jpg"
15
}
```

#### Standard OIDC claims [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#standard-oidc-claims)

| Claim | Description |
| --- | --- |
| `sub` | Subject (user ID) |
| `nonce` | The nonce value from the authorization request (if provided) |
| `email` | User's email address |
| `email_verified` | Whether the email is verified |
| `phone_number` | User's phone number |
| `phone_number_verified` | Whether the phone is verified |
| `name` | User's full name |
| `picture` | User's profile picture URL |

### UserInfo endpoint [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#userinfo-endpoint)

Clients can retrieve user information by calling the UserInfo endpoint with an access token:

```
1
curl 'https://<project-ref>.supabase.co/auth/v1/oauth/userinfo' \
2
  -H 'Authorization: Bearer <access-token>'
```

The information returned depends on the scopes granted in the access token. For example:

**With `email` scope:**

```
1
{
2
  "sub": "user-uuid",
3
  "email": "user@example.com",
4
  "email_verified": true
5
}
```

**With `email profile phone` scopes:**

```
1
{
2
  "sub": "user-uuid",
3
  "email": "user@example.com",
4
  "email_verified": true,
5
  "phone_number": "+1234567890",
6
  "phone_number_verified": false,
7
  "name": "John Doe",
8
  "picture": "https://example.com/avatar.jpg"
9
}
```

### OIDC discovery [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#oidc-discovery)

Supabase Auth exposes OpenID Connect and OAuth 2.1 discovery endpoints that describe its capabilities:

```
1
https://<project-ref>.supabase.co/auth/v1/.well-known/openid-configuration
2
https://<project-ref>.supabase.co/auth/v1/.well-known/oauth-authorization-server
```

Both endpoints return the same metadata and can be used interchangeably. They are provided for compatibility with different OAuth and OIDC clients that may expect one or the other.

These endpoints return metadata about:

- Available endpoints (authorization, token, userinfo, JWKS)
- Supported grant types and response types
- Supported scopes and claims
- Token signing algorithms

This enables automatic integration with OIDC-compliant libraries and tools.

## Token validation [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#token-validation)

Third-party clients should validate access tokens to ensure they're authentic and not tampered with.

**Recommended: Use asymmetric JWT signing keys**

For OAuth implementations, we strongly recommend using asymmetric signing algorithms (RS256 or ES256) instead of the default HS256. With asymmetric keys, third-party clients can validate JWTs using the public key from your JWKS endpoint without needing access to your JWT secret. This is more secure, scalable, and follows OAuth best practices.

Learn how to [configure asymmetric JWT signing keys](https://supabase.com/docs/guides/auth/signing-keys) in your project.

**ID tokens require asymmetric signing algorithms**

If you request the `openid` scope to receive ID tokens, your project must be configured to use asymmetric signing algorithms (RS256 or ES256). ID token generation will fail with an error if your project is still using the default HS256 symmetric algorithm. This is a security requirement of the OpenID Connect specification.

### JWKS endpoint [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#jwks-endpoint)

Supabase Auth exposes a JSON Web Key Set (JWKS) endpoint containing public keys for token verification:

```
1
https://<project-ref>.supabase.co/auth/v1/.well-known/jwks.json
```

Example response:

```
1
{
2
  "keys": [\
3\
    {\
4\
      "kty": "RSA",\
5\
      "kid": "key-id",\
6\
      "use": "sig",\
7\
      "alg": "RS256",\
8\
      "n": "...",\
9\
      "e": "AQAB"\
10\
    }\
11\
  ]
12
}
```

### Validating tokens [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#validating-tokens)

Use a JWT library to verify tokens:

Node.jsPythonGo

```
1
import { createRemoteJWKSet, jwtVerify } from 'jose'
2

3
const JWKS = createRemoteJWKSet(
4
  new URL('https://<project-ref>.supabase.co/auth/v1/.well-known/jwks.json')
5
)
6

7
async function verifyAccessToken(token) {
8
  try {
9
    const { payload } = await jwtVerify(token, JWKS, {
10
      issuer: 'https://<project-ref>.supabase.co/auth/v1',
11
      audience: 'authenticated',
12
    })
13
    return payload
14
  } catch (error) {
15
    console.error('Token verification failed:', error)
16
    return null
17
  }
18
}
```

### What to validate [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#what-to-validate)

Always verify:

1. **Signature** \- Token is signed by Supabase Auth
2. **Issuer** (`iss`) \- Matches your project URL
3. **Audience** (`aud`) \- Is `authenticated`
4. **Expiration** (`exp`) \- Token is not expired
5. **Client ID** (`client_id`) \- Matches your client (if applicable)

## Managing user grants [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#managing-user-grants)

Users can view and manage the OAuth applications they've authorized to access their account. This is important for transparency and security, allowing users to audit and revoke access when needed.

### Viewing authorized applications [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#viewing-authorized-applications)

Users can retrieve a list of all OAuth clients they've authorized:

```
1
const { data: grants, error } = await supabase.auth.oauth.getUserGrants()
2

3
if (error) {
4
  console.error('Error fetching grants:', error)
5
} else {
6
  console.log('Authorized applications:', grants)
7
}
```

The response includes details about each authorized OAuth client:

```
1
[\
2\
  {\
3\
    "id": "grant-uuid",\
4\
    "client_id": "9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d",\
5\
    "client_name": "My Third-Party App",\
6\
    "scopes": ["email", "profile"],\
7\
    "created_at": "2025-01-15T10:30:00.000Z",\
8\
    "updated_at": "2025-01-15T10:30:00.000Z"\
9\
  }\
10\
]
```

### Revoking access [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#revoking-access)

Users can revoke access for a specific OAuth client at any time. When access is revoked, all active sessions and refresh tokens for that client are immediately invalidated:

```
1
const { error } = await supabase.auth.oauth.revokeGrant(clientId)
2

3
if (error) {
4
  console.error('Error revoking access:', error)
5
} else {
6
  console.log('Access revoked successfully')
7
}
```

After revoking access:

- All refresh tokens for that client are deleted
- The user will need to re-authorize the application to grant access again

**Build a settings page for your users**

It's a good practice to provide a settings page where users can view all authorized applications and revoke access to any they no longer trust or use. This increases transparency and gives users control over their data.

For complete API reference, see the [OAuth methods in supabase-js](https://supabase.com/docs/reference/javascript/auth-oauth).

## Next steps [\#](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows\#next-steps)

- [Implement MCP authentication](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication) \- Enable AI agent authentication
- [Secure with RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security) \- Control data access for OAuth clients
- [Learn about JWTs](https://supabase.com/docs/guides/auth/jwts) \- Understand Supabase token structure

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/oauth-server/oauth-flows.mdx)

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