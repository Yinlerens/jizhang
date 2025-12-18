---
url: "https://supabase.com/docs/guides/auth/oauth-server/token-security"
title: "Token Security and Row Level Security | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/oauth-server/token-security)

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
5. [Token Security & RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security)

# Token Security and Row Level Security

* * *

When you enable OAuth 2.1 in your Supabase project, third-party applications can access user data on their behalf. Row Level Security (RLS) policies are crucial for controlling exactly what data each OAuth client can access.

**Scopes control OIDC data, not database access**

The OAuth scopes (`openid`, `email`, `profile`, `phone`) control what user information is included in ID tokens and returned by the UserInfo endpoint. They do **not** control access to your database tables or API endpoints.

Use RLS to define which OAuth clients can access which data, regardless of the scopes they requested.

## How OAuth tokens work with RLS [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#how-oauth-tokens-work-with-rls)

OAuth access tokens issued by Supabase Auth are JWTs that include all standard Supabase claims plus OAuth-specific claims. This means your existing RLS policies continue to work, and you can add OAuth-specific logic to create granular access controls.

### Token structure [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#token-structure)

Every OAuth access token includes:

```
1
{
2
  "sub": "user-uuid",
3
  "role": "authenticated",
4
  "aud": "authenticated",
5
  "user_id": "user-uuid",
6
  "email": "user@example.com",
7
  "client_id": "9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d",
8
  "aal": "aal1",
9
  "amr": [{ "method": "password", "timestamp": 1735815600 }],
10
  "session_id": "session-uuid",
11
  "iss": "https://<project-ref>.supabase.co/auth/v1",
12
  "iat": 1735815600,
13
  "exp": 1735819200
14
}
```

The key OAuth-specific claim is:

| Claim | Description |
| --- | --- |
| `client_id` | Unique identifier of the OAuth client that obtained this token |

You can use this claim in RLS policies to grant different permissions to different clients.

## Extracting OAuth claims in RLS [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#extracting-oauth-claims-in-rls)

Use the `auth.jwt()` function to access token claims in your policies:

```
1
-- Get the client ID from the token
2
(auth.jwt() ->> 'client_id')
3

4
-- Check if the token is from an OAuth client
5
(auth.jwt() ->> 'client_id') IS NOT NULL
6

7
-- Check if the token is from a specific client
8
(auth.jwt() ->> 'client_id') = 'mobile-app-client-id'
```

## Common RLS patterns for OAuth [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#common-rls-patterns-for-oauth)

### Pattern 1: Grant specific client full access [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#pattern-1-grant-specific-client-full-access)

Allow a specific OAuth client to access all user data:

```
1
CREATE POLICY "Mobile app can access user data"
2
ON user_data FOR ALL
3
USING (
4
  auth.uid() = user_id AND
5
  (auth.jwt() ->> 'client_id') = 'mobile-app-client-id'
6
);
```

### Pattern 2: Grant multiple clients read-only access [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#pattern-2-grant-multiple-clients-read-only-access)

Allow several OAuth clients to read data, but not modify it:

```
1
CREATE POLICY "Third-party apps can read profiles"
2
ON profiles FOR SELECT
3
USING (
4
  auth.uid() = user_id AND
5
  (auth.jwt() ->> 'client_id') IN (
6
    'analytics-client-id',
7
    'reporting-client-id',
8
    'dashboard-client-id'
9
  )
10
);
```

### Pattern 3: Restrict sensitive data from OAuth clients [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#pattern-3-restrict-sensitive-data-from-oauth-clients)

Prevent OAuth clients from accessing sensitive data:

```
1
CREATE POLICY "OAuth clients cannot access payment info"
2
ON payment_methods FOR ALL
3
USING (
4
  auth.uid() = user_id AND
5
  (auth.jwt() ->> 'client_id') IS NULL  -- Only direct user sessions
6
);
```

### Pattern 4: Client-specific data access [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#pattern-4-client-specific-data-access)

Different clients access different subsets of data:

```
1
-- Analytics client can only read aggregated data
2
CREATE POLICY "Analytics client reads summaries"
3
ON user_metrics FOR SELECT
4
USING (
5
  auth.uid() = user_id AND
6
  (auth.jwt() ->> 'client_id') = 'analytics-client-id'
7
);
8

9
-- Admin client can read and modify all data
10
CREATE POLICY "Admin client full access"
11
ON user_data FOR ALL
12
USING (
13
  auth.uid() = user_id AND
14
  (auth.jwt() ->> 'client_id') = 'admin-client-id'
15
);
```

## Real-world examples [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#real-world-examples)

### Example 1: Multi-platform application [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#example-1-multi-platform-application)

You have a web app, mobile app, and third-party integrations:

```
1
-- Web app: Full access
2
CREATE POLICY "Web app full access"
3
ON profiles FOR ALL
4
USING (
5
  auth.uid() = user_id AND
6
  (
7
    (auth.jwt() ->> 'client_id') = 'web-app-client-id'
8
    OR (auth.jwt() ->> 'client_id') IS NULL  -- Direct user sessions
9
  )
10
);
11

12
-- Mobile app: Read-only access to profiles
13
CREATE POLICY "Mobile app reads profiles"
14
ON profiles FOR SELECT
15
USING (
16
  auth.uid() = user_id AND
17
  (auth.jwt() ->> 'client_id') = 'mobile-app-client-id'
18
);
19

20
-- Third-party integration: Limited data access
21
CREATE POLICY "Integration reads public data"
22
ON profiles FOR SELECT
23
USING (
24
  auth.uid() = user_id AND
25
  (auth.jwt() ->> 'client_id') = 'integration-client-id' AND
26
  is_public = true
27
);
```

## Custom access token hooks [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#custom-access-token-hooks)

[Custom Access Token Hooks](https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook) work with OAuth tokens, allowing you to inject custom claims based on the OAuth client. This is particularly useful for customizing standard JWT claims like `audience` (`aud`) or adding client-specific metadata.

Custom Access Token Hooks are triggered for **all** token issuance. Use `client_id` or `authentication_method` (`oauth_provider/authorization_code` for OAuth flows) to differentiate OAuth from regular authentication.

### Customizing the audience claim [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#customizing-the-audience-claim)

A common use case is customizing the `audience` claim for different OAuth clients. This allows third-party services to validate that tokens were issued specifically for them:

```
1
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
2

3
serve(async (req) => {
4
  const { user, claims, client_id } = await req.json()
5

6
  // Customize audience based on OAuth client
7
  if (client_id === 'mobile-app-client-id') {
8
    return new Response(
9
      JSON.stringify({
10
        claims: {
11
          aud: 'https://api.myapp.com',
12
          app_version: '2.0.0',
13
        },
14
      }),
15
      { headers: { 'Content-Type': 'application/json' } }
16
    )
17
  }
18

19
  if (client_id === 'analytics-partner-id') {
20
    return new Response(
21
      JSON.stringify({
22
        claims: {
23
          aud: 'https://analytics.partner.com',
24
          access_level: 'read-only',
25
        },
26
      }),
27
      { headers: { 'Content-Type': 'application/json' } }
28
    )
29
  }
30

31
  // Default audience for non-OAuth flows
32
  return new Response(JSON.stringify({ claims: {} }), {
33
    headers: { 'Content-Type': 'application/json' },
34
  })
35
})
```

The `audience` claim is especially important for:

- **JWT validation by third parties**: Services can verify tokens were issued for their specific API
- **Multi-tenant applications**: Different audiences for different client applications
- **Compliance**: Meeting security requirements that mandate audience validation

### Adding client-specific claims [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#adding-client-specific-claims)

You can also add custom claims and metadata based on the OAuth client:

```
1
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
2
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
3

4
serve(async (req) => {
5
  const { user, claims, client_id } = await req.json()
6

7
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SECRET_KEY')!)
8

9
  // Add custom claims based on OAuth client
10
  let customClaims = {}
11

12
  if (client_id === 'mobile-app-client-id') {
13
    customClaims.aud = 'https://mobile.myapp.com'
14
    customClaims.app_version = '2.0.0'
15
    customClaims.platform = 'mobile'
16
  } else if (client_id === 'analytics-client-id') {
17
    customClaims.aud = 'https://analytics.myapp.com'
18
    customClaims.read_only = true
19
    customClaims.data_retention_days = 90
20
  } else if (client_id?.startsWith('mcp-')) {
21
    // MCP AI agents
22
    const { data: agent } = await supabase
23
      .from('approved_ai_agents')
24
      .select('name, max_data_retention_days')
25
      .eq('client_id', client_id)
26
      .single()
27

28
    customClaims.aud = `https://mcp.myapp.com/${client_id}`
29
    customClaims.ai_agent = true
30
    customClaims.agent_name = agent?.name
31
    customClaims.max_retention = agent?.max_data_retention_days
32
  }
33

34
  return new Response(JSON.stringify({ claims: customClaims }), {
35
    headers: { 'Content-Type': 'application/json' },
36
  })
37
})
```

Use these custom claims in RLS:

```
1
-- Policy based on custom claims
2
CREATE POLICY "Read-only clients cannot modify"
3
ON user_data FOR UPDATE
4
USING (
5
  auth.uid() = user_id AND
6
  (auth.jwt() -> 'user_metadata' ->> 'read_only')::boolean IS NOT TRUE
7
);
8

9
-- Policy based on audience claim
10
CREATE POLICY "Only specific audience can access"
11
ON api_data FOR SELECT
12
USING (
13
  auth.uid() = user_id AND
14
  (auth.jwt() ->> 'aud') IN (
15
    'https://api.myapp.com',
16
    'https://mobile.myapp.com'
17
  )
18
);
```

## Security best practices [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#security-best-practices)

### 1\. Principle of least privilege [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#1-principle-of-least-privilege)

Grant OAuth clients only the minimum permissions they need:

```
1
-- Bad: Grant all access by default
2
CREATE POLICY "OAuth clients full access"
3
ON user_data FOR ALL
4
USING (auth.uid() = user_id);
5

6
-- Good: Grant specific access per client
7
CREATE POLICY "Specific client specific access"
8
ON user_data FOR SELECT
9
USING (
10
  auth.uid() = user_id AND
11
  (auth.jwt() ->> 'client_id') = 'trusted-client-id'
12
);
```

### 2\. Separate policies for OAuth clients [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#2-separate-policies-for-oauth-clients)

Create dedicated policies for OAuth clients rather than mixing them with user policies:

```
1
-- User access
2
CREATE POLICY "Users access their own data"
3
ON user_data FOR ALL
4
USING (
5
  auth.uid() = user_id AND
6
  (auth.jwt() ->> 'client_id') IS NULL
7
);
8

9
-- OAuth client access (separate policy)
10
CREATE POLICY "OAuth clients limited access"
11
ON user_data FOR SELECT
12
USING (
13
  auth.uid() = user_id AND
14
  (auth.jwt() ->> 'client_id') IN ('client-1', 'client-2')
15
);
```

### 3\. Regularly audit OAuth clients [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#3-regularly-audit-oauth-clients)

Track and review which clients have access:

```
1
-- View all active OAuth clients
2
SELECT
3
  oc.client_id,
4
  oc.name,
5
  oc.created_at,
6
  COUNT(DISTINCT s.user_id) as active_users
7
FROM auth.oauth_clients oc
8
LEFT JOIN auth.sessions s ON s.client_id = oc.client_id
9
WHERE s.created_at > NOW() - INTERVAL '30 days'
10
GROUP BY oc.client_id, oc.name, oc.created_at;
```

## Testing your policies [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#testing-your-policies)

Always test your RLS policies before deploying to production:

```
1
-- Test as a specific OAuth client
2
SET request.jwt.claims = '{
3
  "sub": "test-user-uuid",
4
  "role": "authenticated",
5
  "client_id": "test-client-id"
6
}';
7

8
-- Test queries
9
SELECT * FROM user_data WHERE user_id = 'test-user-uuid';
10

11
-- Reset
12
RESET request.jwt.claims;
```

Or use the Supabase Dashboard's [RLS policy tester](https://supabase.com/dashboard/project/_/auth/policies).

## Troubleshooting [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#troubleshooting)

### Policy not working for OAuth client [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#policy-not-working-for-oauth-client)

**Problem**: OAuth client can't access data despite having a valid token.

**Check**:

1. Verify the policy includes the client's `client_id`
2. Ensure RLS is enabled on the table
3. Check for conflicting restrictive policies
4. Test with service role key to isolate RLS issues

```
1
-- Debug: See what client_id is in the token
2
SELECT auth.jwt() ->> 'client_id';
3

4
-- Debug: Test without RLS
5
SET LOCAL role = service_role;
6
SELECT * FROM your_table;
```

### Policy too permissive [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#policy-too-permissive)

**Problem**: OAuth client has access to data it shouldn't.

**Solution**: Use `AS RESTRICTIVE` policies to add additional constraints:

```
1
-- This policy runs in addition to permissive policies
2
CREATE POLICY "Restrict OAuth clients"
3
ON sensitive_data
4
AS RESTRICTIVE
5
FOR ALL
6
TO authenticated
7
USING (
8
  -- OAuth clients cannot access this table at all
9
  (auth.jwt() ->> 'client_id') IS NULL
10
);
```

### Can't differentiate between users and OAuth clients [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#cant-differentiate-between-users-and-oauth-clients)

**Problem**: Need to apply different logic for direct user sessions vs OAuth.

**Solution**: Check if `client_id` is present:

```
1
-- Direct user sessions (no OAuth)
2
CREATE POLICY "Direct users full access"
3
ON user_data FOR ALL
4
USING (
5
  auth.uid() = user_id AND
6
  (auth.jwt() ->> 'client_id') IS NULL
7
);
8

9
-- OAuth clients (limited access)
10
CREATE POLICY "OAuth clients read only"
11
ON user_data FOR SELECT
12
USING (
13
  auth.uid() = user_id AND
14
  (auth.jwt() ->> 'client_id') IS NOT NULL
15
);
```

## Next steps [\#](https://supabase.com/docs/guides/auth/oauth-server/token-security\#next-steps)

- [Learn about JWTs](https://supabase.com/docs/guides/auth/jwts) \- Deep dive into Supabase token structure
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) \- Complete RLS guide
- [Custom Access Token Hooks](https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook) \- Inject custom claims
- [OAuth flows](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows) \- Understand token issuance

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/oauth-server/token-security.mdx)

### Is this helpful?

NoYes

### On this page

[How OAuth tokens work with RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security#how-oauth-tokens-work-with-rls) [Token structure](https://supabase.com/docs/guides/auth/oauth-server/token-security#token-structure) [Extracting OAuth claims in RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security#extracting-oauth-claims-in-rls) [Common RLS patterns for OAuth](https://supabase.com/docs/guides/auth/oauth-server/token-security#common-rls-patterns-for-oauth) [Pattern 1: Grant specific client full access](https://supabase.com/docs/guides/auth/oauth-server/token-security#pattern-1-grant-specific-client-full-access) [Pattern 2: Grant multiple clients read-only access](https://supabase.com/docs/guides/auth/oauth-server/token-security#pattern-2-grant-multiple-clients-read-only-access) [Pattern 3: Restrict sensitive data from OAuth clients](https://supabase.com/docs/guides/auth/oauth-server/token-security#pattern-3-restrict-sensitive-data-from-oauth-clients) [Pattern 4: Client-specific data access](https://supabase.com/docs/guides/auth/oauth-server/token-security#pattern-4-client-specific-data-access) [Real-world examples](https://supabase.com/docs/guides/auth/oauth-server/token-security#real-world-examples) [Example 1: Multi-platform application](https://supabase.com/docs/guides/auth/oauth-server/token-security#example-1-multi-platform-application) [Custom access token hooks](https://supabase.com/docs/guides/auth/oauth-server/token-security#custom-access-token-hooks) [Customizing the audience claim](https://supabase.com/docs/guides/auth/oauth-server/token-security#customizing-the-audience-claim) [Adding client-specific claims](https://supabase.com/docs/guides/auth/oauth-server/token-security#adding-client-specific-claims) [Security best practices](https://supabase.com/docs/guides/auth/oauth-server/token-security#security-best-practices) [1\. Principle of least privilege](https://supabase.com/docs/guides/auth/oauth-server/token-security#1-principle-of-least-privilege) [2\. Separate policies for OAuth clients](https://supabase.com/docs/guides/auth/oauth-server/token-security#2-separate-policies-for-oauth-clients) [3\. Regularly audit OAuth clients](https://supabase.com/docs/guides/auth/oauth-server/token-security#3-regularly-audit-oauth-clients) [Testing your policies](https://supabase.com/docs/guides/auth/oauth-server/token-security#testing-your-policies) [Troubleshooting](https://supabase.com/docs/guides/auth/oauth-server/token-security#troubleshooting) [Policy not working for OAuth client](https://supabase.com/docs/guides/auth/oauth-server/token-security#policy-not-working-for-oauth-client) [Policy too permissive](https://supabase.com/docs/guides/auth/oauth-server/token-security#policy-too-permissive) [Can't differentiate between users and OAuth clients](https://supabase.com/docs/guides/auth/oauth-server/token-security#cant-differentiate-between-users-and-oauth-clients) [Next steps](https://supabase.com/docs/guides/auth/oauth-server/token-security#next-steps)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)