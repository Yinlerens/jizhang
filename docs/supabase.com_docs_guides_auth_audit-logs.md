---
url: "https://supabase.com/docs/guides/auth/audit-logs"
title: "Auth Audit Logs | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/audit-logs)

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
5. [Audit Logs](https://supabase.com/docs/guides/auth/audit-logs)

# Auth Audit Logs

## Monitor and track authentication events with audit logging.

* * *

Auth audit logs provide comprehensive tracking of authentication events in your Supabase project. Audit logs are automatically captured for all authentication events and help you monitor user authentication activities, detect suspicious behavior, and maintain compliance with security requirements.

## What gets logged [\#](https://supabase.com/docs/guides/auth/audit-logs\#what-gets-logged)

Supabase auth audit logs automatically capture all authentication events including:

- User signups and logins
- Password changes and resets
- Email verification events
- Token refresh and logout events

## Storage options [\#](https://supabase.com/docs/guides/auth/audit-logs\#storage-options)

By default, audit logs are stored in two places:

1. **Your project's Postgres database** \- Stored in the `auth.audit_log_entries` table, searchable via SQL but uses database storage
2. **External log storage** \- Cost-efficient storage accessible through the dashboard

You can disable Postgres storage to reduce database storage costs while keeping the external log storage.

### Configuring audit log storage [\#](https://supabase.com/docs/guides/auth/audit-logs\#configuring-audit-log-storage)

1. Navigate to your project’s dashboard
2. Go to **Authentication**
3. Find the **Audit Logs** under **Configuration** section
4. Toggle on "Disable writing auth audit logs to project database" to disable database storage

Disabling Postgres storage reduces your database storage costs. Audit logs will still be available through the dashboard.

## Log format [\#](https://supabase.com/docs/guides/auth/audit-logs\#log-format)

Audit logs contain detailed information about each authentication event:

```
1
{
2
  "timestamp": "2025-08-01T10:30:00Z",
3
  "user_id": "uuid",
4
  "action": "user_signedup",
5
  "ip_address": "192.168.1.1",
6
  "user_agent": "Mozilla/5.0...",
7
  "metadata": {
8
    "provider": "email"
9
  }
10
}
```

### Log actions reference [\#](https://supabase.com/docs/guides/auth/audit-logs\#log-actions-reference)

| Action | Description |
| --- | --- |
| `login` | User login attempt |
| `logout` | User logout |
| `invite_accepted` | Team invitation accepted |
| `user_signedup` | New user registration |
| `user_invited` | User invitation sent |
| `user_deleted` | User account deleted |
| `user_modified` | User profile updated |
| `user_recovery_requested` | Password reset request |
| `user_reauthenticate_requested` | User reauthentication required |
| `user_confirmation_requested` | Email/phone confirmation requested |
| `user_repeated_signup` | Duplicate signup attempt |
| `user_updated_password` | Password change completed |
| `token_revoked` | Refresh token revoked |
| `token_refreshed` | Refresh token used to obtain new tokens |
| `generate_recovery_codes` | MFA recovery codes generated |
| `factor_in_progress` | MFA factor enrollment started |
| `factor_unenrolled` | MFA factor removed |
| `challenge_created` | MFA challenge initiated |
| `verification_attempted` | MFA verification attempt |
| `factor_deleted` | MFA factor deleted |
| `recovery_codes_deleted` | MFA recovery codes deleted |
| `factor_updated` | MFA factor settings updated |
| `mfa_code_login` | Login with MFA code |
| `identity_unlinked` | An identity unlinked from account |

## Limitations [\#](https://supabase.com/docs/guides/auth/audit-logs\#limitations)

- There may be a short delay before logs appear
- Query capabilities are limited to the dashboard interface

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/audit-logs.mdx)

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