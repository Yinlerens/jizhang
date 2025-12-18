---
url: "https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook"
title: "Custom Access Token Hook | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook)

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

[Overview](https://supabase.com/docs/guides/auth/auth-hooks)
[Custom access token hook](https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook)
[Send SMS hook](https://supabase.com/docs/guides/auth/auth-hooks/send-sms-hook)
[Send email hook](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook)
[MFA verification hook](https://supabase.com/docs/guides/auth/auth-hooks/mfa-verification-hook)
[Password verification hook](https://supabase.com/docs/guides/auth/auth-hooks/password-verification-hook)
[Before User Created hook](https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook)

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
3. More
5. [Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks)
7. [Custom access token hook](https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook)

# Custom Access Token Hook

## Customize the access token issued by Supabase Auth

* * *

The custom access token hook runs before a token is issued and allows you to add additional claims based on the authentication method used.

Claims returned must conform to our specification. Supabase Auth will check for these claims after the hook is run and return an error if they are not present.

These are the fields currently available on an access token:

Required Claims: `iss`, `aud`, `exp`, `iat`, `sub`, `role`, `aal`, `session_id`, `email`, `phone`, `is_anonymous`

Optional Claims: `jti`, `nbf`, `app_metadata`, `user_metadata`, `amr`,

**Inputs**

| Field | Type | Description |
| --- | --- | --- |
| `user_id` | `string` | Unique identifier for the user attempting to sign in. |
| `claims` | `object` | Claims which are included in the access token. |
| `authentication_method` | `string` | The authentication method used to request the access token. Possible values include: `oauth`, `password`, `otp`, `totp`, `recovery`, `invite`, `sso/saml`, `magiclink`, `email/signup`, `email_change`, `token_refresh`, `oauth_provider/authorization_code`, `anonymous`. |

JSONJSON Schema

```
1
{
2
  "user_id": "8ccaa7af-909f-44e7-84cb-67cdccb56be6",
3
  "claims": {
4
    "aud": "authenticated",
5
    "exp": 1715690221,
6
    "iat": 1715686621,
7
    "sub": "8ccaa7af-909f-44e7-84cb-67cdccb56be6",
8
    "email": "",
9
    "phone": "",
10
    "app_metadata": {},
11
    "user_metadata": {},
12
    "role": "authenticated",
13
    "aal": "aal1",
14
    "amr": [ { "method": "anonymous", "timestamp": 1715686621 } ],
15
    "session_id": "4b938a09-5372-4177-a314-cfa292099ea2",
16
    "is_anonymous": true,
17
    "client_id": "oauth-client-id-if-oauth-flow"
18
  },
19
  "authentication_method": "anonymous"
20
}
```

**Outputs**

Return these only if your hook processed the input without errors.

| Field | Type | Description |
| --- | --- | --- |
| `claims` | `object` | The updated claims after the hook has been run. |

SQLHTTP

Minimal JWTAdd admin roleRestrict access to SSO users

Sometimes the size of the JWT can be a problem especially if you're using a [Server-Side Rendering framework](https://supabase.com/docs/guides/auth/server-side). Common situations where the JWT can get too large include:

- The user has a particularly large name, email address or phone number
- The default JWT has too many claims coming from OAuth providers
- A large avatar URL is included

To lower the size of the JWT you can define a Custom Access Token hook like the one below which will instruct the Auth server to issue a JWT with only the listed claims. Check the documentation above on what JWT claims must be present and cannot be removed.

Refer to the [Postgres JSON functions](https://www.postgresql.org/docs/current/functions-json.html) on how to manipulate `jsonb` objects.

```
1
create or replace function public.custom_access_token_hook(event jsonb)
2
returns jsonb
3
language plpgsql
4
as $$
5
  declare
6
    original_claims jsonb;
7
    new_claims jsonb;
8
    claim text;
9
  begin
10
    original_claims = event->'claims';
11
    new_claims = '{}'::jsonb;
12

13
    foreach claim in array array[\
14\
      -- add claims you want to keep here\
15\
      'iss',\
16\
      'aud',\
17\
      'exp',\
18\
      'iat',\
19\
      'sub',\
20\
      'role',\
21\
      'aal',\
22\
      'session_id',\
23\
      'email',\
24\
      'phone',\
25\
      'is_anonymous'\
26\
   ] loop
27
      if original_claims ? claim then
28
        -- original_claims contains one of the listed claims, set it on new_claims
29
        new_claims = jsonb_set(new_claims, array[claim], original_claims->claim);
30
      end if;
31
    end loop;
32

33
    return jsonb_build_object('claims', new_claims);
34
  end
35
$$;
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-hooks/custom-access-token-hook.mdx)

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