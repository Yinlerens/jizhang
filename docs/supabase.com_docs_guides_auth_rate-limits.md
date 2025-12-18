---
url: "https://supabase.com/docs/guides/auth/rate-limits"
title: "Rate limits | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/rate-limits)

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
3. Security
5. [Rate Limits](https://supabase.com/docs/guides/auth/rate-limits)

# Rate limits

## Rate limits protect your services from abuse

* * *

Supabase Auth enforces rate limits on endpoints to prevent abuse. Some rate limits are [customizable](https://supabase.com/dashboard/project/_/auth/rate-limits).

You can also manage rate limits using the Management API:

```
1
# Get your access token from https://supabase.com/dashboard/account/tokens
2
export SUPABASE_ACCESS_TOKEN="your-access-token"
3
export PROJECT_REF="your-project-ref"
4

5
# Get current rate limits
6
curl -X GET "https://api.supabase.com/v1/projects/$PROJECT_REF/config/auth" \
7
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
8
  | jq 'to_entries | map(select(.key | startswith("rate_limit_"))) | from_entries'
9

10
# Update rate limits
11
curl -X PATCH "https://api.supabase.com/v1/projects/$PROJECT_REF/config/auth" \
12
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
13
  -H "Content-Type: application/json" \
14
  -d '{
15
    "rate_limit_anonymous_users": 10,
16
    "rate_limit_email_sent": 10,
17
    "rate_limit_sms_sent": 10,
18
    "rate_limit_verify": 10,
19
    "rate_limit_token_refresh": 10,
20
    "rate_limit_otp": 10,
21
    "rate_limit_web3": 10
22
  }'
```

| Endpoint | Path | Limited By | Rate Limit |
| --- | --- | --- | --- |
| All endpoints that send emails | `/auth/v1/signup``/auth/v1/recover``/auth/v1/user`[1](https://supabase.com/docs/guides/auth/rate-limits#user-content-fn-1) | Sum of combined requests | Defaults to 4 emails per hour as of 14th July 2023. As of 21 Oct 2023, this has been updated to 2 emails per hour. You can only change this with your own custom SMTP setup. |
| All endpoints that send One-Time-Passwords (OTP) | `/auth/v1/otp` | Sum of combined requests | Defaults to 30 OTPs per hour. Is customizable. |
| Send OTPs or magic links | `/auth/v1/otp` | Last request of the user | Defaults to 60 seconds window before a new request is allowed to the same user. Is customizable. |
| Signup confirmation request | `/auth/v1/signup` | Last request of the user | Defaults to 60 seconds window before a new request is allowed to the same user. Is customizable. |
| Password Reset Request | `/auth/v1/recover` | Last request of the user | Defaults to 60 seconds window before a new request is allowed to the same user. Is customizable. |
| Verification requests | `/auth/v1/verify` | IP Address | 360 requests per hour (with bursts up to 30 requests) |
| Token refresh requests | `/auth/v1/token` | IP Address | 1800 requests per hour (with bursts up to 30 requests) |
| Create or Verify an MFA challenge | `/auth/v1/factors/:id/challenge``/auth/v1/factors/:id/verify` | IP Address | 15 requests per hour (with bursts up to  requests) |
| Anonymous sign-ins | `/auth/v1/signup`[2](https://supabase.com/docs/guides/auth/rate-limits#user-content-fn-2) | IP Address | 30 requests per hour (with bursts up to 30 requests) |

## Footnotes [\#](https://supabase.com/docs/guides/auth/rate-limits\#footnote-label)

1. The rate limit is only applied on `/auth/v1/user` if this endpoint is called to update the user's email address. [↩](https://supabase.com/docs/guides/auth/rate-limits#user-content-fnref-1)

2. The rate limit is only applied on `/auth/v1/signup` if this endpoint is called without passing in an email or phone number in the request body. [↩](https://supabase.com/docs/guides/auth/rate-limits#user-content-fnref-2)


[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/rate-limits.mdx)

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