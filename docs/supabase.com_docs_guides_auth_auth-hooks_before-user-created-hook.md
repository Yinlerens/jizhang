---
url: "https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook"
title: "Before User Created Hook | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook)

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
7. [Before User Created hook](https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook)

# Before User Created Hook

## Prevent unwanted signups by inspecting and rejecting user creation requests

* * *

This hook runs before a new user is created. It allows developers to inspect the incoming user object and optionally reject the request. Use this to enforce custom signup policies that Supabase Auth does not handle natively - such as blocking disposable email domains, restricting access by region or IP, or requiring that users belong to a specific email domain.

You can implement this hook using an HTTP endpoint or a Postgres function. If the hook returns an error object, the signup is denied and the user is not created. If the hook responds successfully (HTTP 200 or 204 with no error), the request proceeds as usual. This gives you full control over which users are allowed to register — and the flexibility to apply that logic server-side.

## Inputs [\#](https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook\#inputs)

Supabase Auth will send a payload containing these fields to your hook:

| Field | Type | Description |
| --- | --- | --- |
| `metadata` | `object` | Metadata about the request. Includes IP address, request ID, and hook type. |
| `user` | `object` | The user record that is about to be created. Matches the shape of the `auth.users` table. |

Because the hook is ran just before the insertion into the database, this user will not be found in Postgres at the time the hook is called.

JSONJSON Schema

```
1
{
2
  "metadata": {
3
    "uuid": "8b34dcdd-9df1-4c10-850a-b3277c653040",
4
    "time": "2025-04-29T13:13:24.755552-07:00",
5
    "name": "before-user-created",
6
    "ip_address": "127.0.0.1"
7
  },
8
  "user": {
9
    "id": "ff7fc9ae-3b1b-4642-9241-64adb9848a03",
10
    "aud": "authenticated",
11
    "role": "",
12
    "email": "valid.email@supabase.com",
13
    "phone": "",
14
    "app_metadata": {
15
      "provider": "email",
16
      "providers": ["email"]
17
    },
18
    "user_metadata": {},
19
    "identities": [],
20
    "created_at": "0001-01-01T00:00:00Z",
21
    "updated_at": "0001-01-01T00:00:00Z",
22
    "is_anonymous": false
23
  }
24
}
```

## Outputs [\#](https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook\#outputs)

Your hook must return a response that either allows or blocks the signup request.

| Field | Type | Description |
| --- | --- | --- |
| `error` | `object` | (Optional) Return this to reject the signup. Includes a code, message, and optional HTTP status code. |

Returning an empty object with a `200` or `204` status code allows the request to proceed. Returning a JSON response with an `error` object and a `4xx` status code blocks the request and propagates the error message to the client. See the [error handling documentation](https://supabase.com/docs/guides/auth/auth-hooks#error-handling) for more details.

### Allow the signup [\#](https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook\#allow-the-signup)

```
1
{}
```

or with a `204 No Content` response:

```
1
HTTP/1.1 204 No Content
```

### Reject the signup with an error [\#](https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook\#reject-the-signup-with-an-error)

```
1
{
2
  "error": {
3
    "http_code": 400,
4
    "message": "Only company emails are allowed to sign up."
5
  }
6
}
```

This response will block the user creation and return the error message to the client that attempted signup.

## Examples [\#](https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook\#examples)

Each of the following examples shows how to use the `before-user-created` hook to control signup behavior. Each use case includes both a HTTP implementation (e.g. using an Edge Function) and a SQL implementation (Postgres function).

SQLHTTP

Allow by DomainBlock by OAuth ProviderAllow/Deny by IP or CIDR

Allow signups only from specific domains like supabase.com or example.test. Reject all others. This is useful for private/internal apps, enterprise gating, or invite-only beta access.

The `before-user-created` hook solves this by:

- Detecting that a user is about to be created
- Providing the email address in the `user.email` field

Run the following snippet in your project's [SQL Editor](https://supabase.com/dashboard/project/_/sql/new). This will create a `signup_email_domains` table with some sample data and a `hook_restrict_signup_by_email_domain` function to be called by the `before-user-created` auth hook.

```
1
-- Create ENUM type for domain rule classification
2
do $$ begin
3
  create type signup_email_domain_type as enum ('allow', 'deny');
4
exception
5
  when duplicate_object then null;
6
end $$;
7

8
-- Create the signup_email_domains table
9
create table if not exists public.signup_email_domains (
10
  id serial primary key,
11
  domain text not null,
12
  type signup_email_domain_type not null,
13
  reason text default null,
14
  created_at timestamptz not null default now(),
15
  updated_at timestamptz not null default now()
16
);
17

18
-- Create a trigger to maintain updated_at
19
create or replace function update_signup_email_domains_updated_at()
20
returns trigger as $$
21
begin
22
  new.updated_at = now();
23
  return new;
24
end;
25
$$ language plpgsql;
26

27
drop trigger if exists trg_signup_email_domains_set_updated_at on public.signup_email_domains;
28

29
create trigger trg_signup_email_domains_set_updated_at
30
before update on public.signup_email_domains
31
for each row
32
execute procedure update_signup_email_domains_updated_at();
33

34
-- Seed example data
35
insert into public.signup_email_domains (domain, type, reason) values
36
  ('supabase.com', 'allow', 'Internal signups'),
37
  ('gmail.com', 'deny', 'Public email provider'),
38
  ('yahoo.com', 'deny', 'Public email provider');
39

40
-- Create the function
41
create or replace function public.hook_restrict_signup_by_email_domain(event jsonb)
42
returns jsonb
43
language plpgsql
44
as $$
45
declare
46
  email text;
47
  domain text;
48
  is_allowed int;
49
  is_denied int;
50
begin
51
  email := event->'user'->>'email';
52
  domain := split_part(email, '@', 2);
53

54
  -- Check for allow match
55
  select count(*) into is_allowed
56
  from public.signup_email_domains
57
  where type = 'allow' and lower(domain) = lower($1);
58

59
  if is_allowed > 0 then
60
    return '{}'::jsonb;
61
  end if;
62

63
  -- Check for deny match
64
  select count(*) into is_denied
65
  from public.signup_email_domains
66
  where type = 'deny' and lower(domain) = lower($1);
67

68
  if is_denied > 0 then
69
    return jsonb_build_object(
70
      'error', jsonb_build_object(
71
        'message', 'Signups from this email domain are not allowed.',
72
        'http_code', 403
73
      )
74
    );
75
  end if;
76

77
  -- No match, allow by default
78
  return '{}'::jsonb;
79
end;
80
$$;
81

82
-- Permissions
83
grant execute
84
  on function public.hook_restrict_signup_by_email_domain
85
  to supabase_auth_admin;
86

87
revoke execute
88
  on function public.hook_restrict_signup_by_email_domain
89
  from authenticated, anon, public;
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-hooks/before-user-created-hook.mdx)

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