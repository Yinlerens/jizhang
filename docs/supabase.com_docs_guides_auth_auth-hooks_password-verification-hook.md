---
url: "https://supabase.com/docs/guides/auth/auth-hooks/password-verification-hook"
title: "Password Verification Hook | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-hooks/password-verification-hook)

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
7. [Password verification hook](https://supabase.com/docs/guides/auth/auth-hooks/password-verification-hook)

# Password Verification Hook

* * *

Your company wishes to increase security beyond the requirements of the default password implementation in order to fulfill security or compliance requirements. You plan to track the status of a password sign-in attempt and take action via an email or a restriction on logins where necessary.

As this hook runs on unauthenticated requests, malicious users can abuse the hook by calling it multiple times. Pay extra care when using the hook as you can unintentionally block legitimate users from accessing your application.

Check if a password is valid prior to taking any additional action to ensure the user is legitimate. Where possible, send an email or notification instead of blocking the user.

**Inputs**

| Field | Type | Description |
| --- | --- | --- |
| `user_id` | `string` | Unique identifier for the user attempting to sign in. Correlate this to the `auth.users` table. |
| `valid` | `boolean` | Whether the password verification attempt was valid. |

JSONJSON Schema

```
1
{
2
  "user_id": "3919cb6e-4215-4478-a960-6d3454326cec",
3
  "valid": true
4
}
```

**Outputs**

Return these only if your hook processed the input without errors.

| Field | Type | Description |
| --- | --- | --- |
| `decision` | `string` | The decision on whether to allow authentication to move forward. Use `reject` to deny the verification attempt and log the user out of all active sessions. Use `continue` to use the default Supabase Auth behavior. |
| `message` | `string` | The message to show the user if the decision was `reject`. |
| `should_logout_user` | `boolean` | Whether to log out the user if a `reject` decision is issued. Has no effect when a `continue` decision is issued. |

```
1
{
2
  "decision": "reject",
3
  "message": "You have exceeded maximum number of password sign-in attempts.",
4
  "should_logout_user": "false"
5
}
```

SQL

Limit failed password verification attemptsSend email notification on failed password attempts

As part of new security measures within the company, users can only input an incorrect password every 10 seconds and not more than that. You want to write a hook to enforce this.

Create a table to record each user's last incorrect password verification attempt.

```
1
create table public.password_failed_verification_attempts (
2
  user_id uuid not null,
3
  last_failed_at timestamp not null default now(),
4
  primary key (user_id)
5
);
```

Create a hook to read and write information to this table. For example:

```
1
create function public.hook_password_verification_attempt(event jsonb)
2
returns jsonb
3
language plpgsql
4
as $$
5
  declare
6
    last_failed_at timestamp;
7
  begin
8
    if event->'valid' is true then
9
      -- password is valid, accept it
10
      return jsonb_build_object('decision', 'continue');
11
    end if;
12

13
    select last_failed_at into last_failed_at
14
      from public.password_failed_verification_attempts
15
      where
16
        user_id = event->'user_id';
17

18
    if last_failed_at is not null and now() - last_failed_at < interval '10 seconds' then
19
      -- last attempt was done too quickly
20
      return jsonb_build_object(
21
        'error', jsonb_build_object(
22
          'http_code', 429,
23
          'message',   'Please wait a moment before trying again.'
24
        )
25
      );
26
    end if;
27

28
    -- record this failed attempt
29
    insert into public.password_failed_verification_attempts
30
      (
31
        user_id,
32
        last_failed_at
33
      )
34
      values
35
      (
36
        event->'user_id',
37
        now()
38
      )
39
      on conflict do update
40
        set last_failed_at = now();
41

42
    -- finally let Supabase Auth do the default behavior for a failed attempt
43
    return jsonb_build_object('decision', 'continue');
44
  end;
45
$$;
46

47
-- Assign appropriate permissions
48
grant all
49
  on table public.password_failed_verification_attempts
50
  to supabase_auth_admin;
51

52
revoke all
53
  on table public.password_failed_verification_attempts
54
  from authenticated, anon, public;
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-hooks/password-verification-hook.mdx)

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