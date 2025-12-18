---
url: "https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook"
title: "Send Email Hook | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook)

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

[Sign up](https://supabase.com/dashboard)

Auth

1. Auth
3. More
5. [Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks)
7. [Send email hook](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook)

# Send Email Hook

## Use your own email service to send authentication emails.

* * *

The Send Email Hook replaces Supabase's built-in email sending. You can use this hook to:

- Send emails using your own email provider
- Add internationalization or custom logic
- Fall back to another provider if your primary one fails

**Inputs**

| Field | Type | Description |
| --- | --- | --- |
| `user` | [`User`](https://supabase.com/docs/guides/auth/users#the-user-object) | The user account taking the action |
| `email` | `object` | Metadata specific to the email sending process |

JSONJSON Schema

```
1
{
2
  "user": {
3
    "id": "8484b834-f29e-4af2-bf42-80644d154f76",
4
    "aud": "authenticated",
5
    "role": "authenticated",
6
    "email": "valid.email@supabase.io",
7
    "phone": "",
8
    "app_metadata": {
9
      "provider": "email",
10
      "providers": ["email"]
11
    },
12
    "user_metadata": {
13
      "email": "valid.email@supabase.io",
14
      "email_verified": false,
15
      "phone_verified": false,
16
      "sub": "8484b834-f29e-4af2-bf42-80644d154f76"
17
    },
18
    "identities": [\
19\
      {\
20\
        "identity_id": "bc26d70b-517d-4826-bce4-413a5ff257e7",\
21\
        "id": "8484b834-f29e-4af2-bf42-80644d154f76",\
22\
        "user_id": "8484b834-f29e-4af2-bf42-80644d154f76",\
23\
        "identity_data": {\
24\
          "email": "valid.email@supabase.io",\
25\
          "email_verified": false,\
26\
          "phone_verified": false,\
27\
          "sub": "8484b834-f29e-4af2-bf42-80644d154f76"\
28\
        },\
29\
        "provider": "email",\
30\
        "last_sign_in_at": "2024-05-14T12:56:33.824231484Z",\
31\
        "created_at": "2024-05-14T12:56:33.824261Z",\
32\
        "updated_at": "2024-05-14T12:56:33.824261Z",\
33\
        "email": "valid.email@supabase.io"\
34\
      }\
35\
    ],
36
    "created_at": "2024-05-14T12:56:33.821567Z",
37
    "updated_at": "2024-05-14T12:56:33.825595Z",
38
    "is_anonymous": false
39
  },
40
  "email_data": {
41
    "token": "305805",
42
    "token_hash": "7d5b7b1964cf5d388340a7f04f1dbb5eeb6c7b52ef8270e1737a58d0",
43
    "redirect_to": "http://localhost:3000/",
44
    "email_action_type": "signup",
45
    "site_url": "http://localhost:9999",
46
    "token_new": "",
47
    "token_hash_new": "",
48
    "old_email": "",
49
    "old_phone": "",
50
    "provider": "",
51
    "factor_type": ""
52
  }
53
}
```

**Outputs**

- No outputs are required. An empty response with a status code of 200 is taken as a successful response.

## Email sending behavior [\#](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook\#email-sending-behavior)

Email sending depends on two settings: Email Provider and Auth Hook status.

| Email Provider | Auth Hook | Result |
| --- | --- | --- |
| Enabled | Enabled | Auth Hook handles email sending (SMTP not used) |
| Enabled | Disabled | SMTP handles email sending (custom if configured, default otherwise) |
| Disabled | Enabled | Email signups disabled |
| Disabled | Disabled | Email signups disabled |

## Email change behavior and token hash mapping [\#](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook\#email-change-behavior-and-token-hash-mapping)

When `email_action_type` is `email_change`, the hook payload can include one or two OTPs and their hashes. This depends on your [Secure Email Change](https://supabase.com/dashboard/project/_/auth/providers?provider=Email) setting.

- Secure Email Change enabled: two OTPs are generated, one for the current email (`user.email`) and one for the new email (`user.email_new`). You must send two emails.
- Secure Email Change disabled: only one OTP is generated for the new email. You send a single email.

##### Counterintuitive field naming

The token hash field names are reversed due to backward compatibility. Pay careful attention to which token/hash pair goes with which email address:

- `token_hash_new` → use with the **current** email address (`user.email`) and `token`
- `token_hash` → use with the **new** email address (`user.email_new`) and `token_new`

Do not assume the `_new` suffix refers to the new email address.

### What to send [\#](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook\#what-to-send)

When Secure Email Change is enabled (both token/hash pairs present):

- Send to **current** email address (`user.email`): use `token` with `token_hash_new`
- Send to **new** email address (`user.email_new`): use `token_new` with `token_hash`

When Secure Email Change is **disabled** (only one token/hash pair present):

- Send a single email to the **new** email address. Use `token` with `token_hash` or `token_new` with `token_hash`, depending on which fields are present in the payload.

SQLHTTP

Use Resend as an email providerAdd Internationalization for Email Templates

You can configure [Resend](https://resend.com/) as the custom email provider through the "Send Email" hook. This allows you to take advantage of Resend's developer-friendly APIs to send emails and leverage [React Email](https://react.email/) for managing your email templates. For a more advanced React Email tutorial, refer to [this guide](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend).

If you want to send emails through the Supabase Resend integration, which uses Resend's SMTP server, check out [this integration](https://supabase.com/partners/integrations/resend) instead.

Create a `.env` file with the following environment variables:

```
1
RESEND_API_KEY="your_resend_api_key"
2
SEND_EMAIL_HOOK_SECRET="v1,whsec_<base64_secret>"
```

You can generate the secret in the [Auth Hooks](https://supabase.com/dashboard/project/_/auth/hooks) section of the Supabase dashboard.

Set the secrets in your Supabase project:

```
1
supabase secrets set --env-file .env
```

Create a new edge function:

```
1
supabase functions new send-email
```

Add the following code to your edge function:

```
1
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";
2
import { Resend } from "npm:resend";
3

4
const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);
5
const hookSecret = (Deno.env.get("SEND_EMAIL_HOOK_SECRET") as string).replace("v1,whsec_", "");
6

7
Deno.serve(async (req) => {
8
  if (req.method !== "POST") {
9
    return new Response("not allowed", { status: 400 });
10
  }
11

12
  const payload = await req.text();
13
  const headers = Object.fromEntries(req.headers);
14
  const wh = new Webhook(hookSecret);
15
  try {
16
    const { user, email_data } = wh.verify(payload, headers) as {
17
      user: {
18
        email: string;
19
      };
20
      email_data: {
21
        token: string;
22
        token_hash: string;
23
        redirect_to: string;
24
        email_action_type: string;
25
        site_url: string;
26
        token_new: string;
27
        token_hash_new: string;
28
      };
29
    };
30

31
    const { error } = await resend.emails.send({
32
      from: "welcome <onboarding@example.com>",
33
      to: [user.email],
34
      subject: "Welcome to my site!",
35
      text: `Confirm you signup with this code: ${email_data.token}`,
36
    });
37
    if (error) {
38
      throw error;
39
    }
40
  } catch (error) {
41
    return new Response(
42
      JSON.stringify({
43
        error: {
44
          http_code: error.code,
45
          message: error.message,
46
        },
47
      }),
48
      {
49
        status: 401,
50
        headers: { "Content-Type": "application/json" },
51
      },
52
    );
53
  }
54

55
  const responseHeaders = new Headers();
56
  responseHeaders.set("Content-Type", "application/json");
57
  return new Response(JSON.stringify({}), {
58
    status: 200,
59
    headers: responseHeaders,
60
  });
61
});
```

Deploy your edge function and [configure it as a hook](https://supabase.com/dashboard/project/_/auth/hooks):

```
1
supabase functions deploy send-email --no-verify-jwt
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-hooks/send-email-hook.mdx)

### Is this helpful?

NoYes

### On this page

[Email sending behavior](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook#email-sending-behavior) [Email change behavior and token hash mapping](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook#email-change-behavior-and-token-hash-mapping) [What to send](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook#what-to-send)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)