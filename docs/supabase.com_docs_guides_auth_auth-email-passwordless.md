---
url: "https://supabase.com/docs/guides/auth/auth-email-passwordless"
title: "Passwordless email logins | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-email-passwordless)

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
3. Flows (How-tos)
5. [Email (Magic Link or OTP)](https://supabase.com/docs/guides/auth/auth-email-passwordless)

# Passwordless email logins

## Email logins using Magic Links or One-Time Passwords (OTPs)

* * *

Supabase Auth provides several passwordless login methods. Passwordless logins allow users to sign in without a password, by clicking a confirmation link or entering a verification code.

Passwordless login can:

- Improve the user experience by not requiring users to create and remember a password
- Increase security by reducing the risk of password-related security breaches
- Reduce support burden of dealing with password resets and other password-related flows

Supabase Auth offers two passwordless login methods that use the user's email address:

- [Magic Link](https://supabase.com/docs/guides/auth/auth-email-passwordless#with-magic-link)
- [OTP](https://supabase.com/docs/guides/auth/auth-email-passwordless#with-otp)

## With Magic Link [\#](https://supabase.com/docs/guides/auth/auth-email-passwordless\#with-magic-link)

Magic Links are a form of passwordless login where users click on a link sent to their email address to log in to their accounts. Magic Links only work with email addresses and are one-time use only.

### Enabling Magic Link [\#](https://supabase.com/docs/guides/auth/auth-email-passwordless\#enabling-magic-link)

Email authentication methods, including Magic Links, are enabled by default.

Configure the Site URL and any additional redirect URLs. These are the only URLs that are allowed as redirect destinations after the user clicks a Magic Link. You can change the URLs on the [URL Configuration page](https://supabase.com/dashboard/project/_/auth/url-configuration) for hosted projects, or in the [configuration file](https://supabase.com/docs/guides/cli/config#auth.additional_redirect_urls) for self-hosted projects.

By default, a user can only request a magic link once every 60 seconds and they expire after 1 hour.

### Signing in with Magic Link [\#](https://supabase.com/docs/guides/auth/auth-email-passwordless\#signing-in-with-magic-link)

Call the "sign in with OTP" method from the client library.

Though the method is labelled "OTP", it sends a Magic Link by default. The two methods differ only in the content of the confirmation email sent to the user.

If the user hasn't signed up yet, they are automatically signed up by default. To prevent this, set the `shouldCreateUser` option to `false`.

JavaScriptExpo React NativeDartSwiftKotlinPython

```
1
async function signInWithEmail() {
2
  const { data, error } = await supabase.auth.signInWithOtp({
3
    email: 'valid.email@supabase.io',
4
    options: {
5
      // set this to false if you do not want the user to be automatically signed up
6
      shouldCreateUser: false,
7
      emailRedirectTo: 'https://example.com/welcome',
8
    },
9
  })
10
}
```

That's it for the implicit flow.

If you're using PKCE flow, edit the Magic Link [email template](https://supabase.com/docs/guides/auth/auth-email-templates) to send a token hash:

```
1
<h2>Magic Link</h2>
2

3
<p>Follow this link to login:</p>
4
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Log In</a></p>
```

At the `/auth/confirm` endpoint, exchange the hash for the session:

```
1
const { error } = await supabase.auth.verifyOtp({
2
  token_hash: 'hash',
3
  type: 'email',
4
})
```

## With OTP [\#](https://supabase.com/docs/guides/auth/auth-email-passwordless\#with-otp)

Email one-time passwords (OTP) are a form of passwordless login where users key in a six digit code sent to their email address to log in to their accounts.

### Enabling email OTP [\#](https://supabase.com/docs/guides/auth/auth-email-passwordless\#enabling-email-otp)

Email authentication methods, including Email OTPs, are enabled by default.

Email OTPs share an implementation with Magic Links. To send an OTP instead of a Magic Link, alter the **Magic Link** email template. For a hosted Supabase project, go to [Email Templates](https://supabase.com/dashboard/project/_/auth/templates) in the Dashboard. For a self-hosted project or local development, see the [Email Templates guide](https://supabase.com/docs/guides/auth/auth-email-templates).

Modify the template to include the `{{ .Token }}` variable, for example:

```
1
<h2>One time login code</h2>
2

3
<p>Please enter this code: {{ .Token }}</p>
```

By default, a user can only request an OTP once every 60 seconds and they expire after 1 hour. This is configurable via `Auth > Providers > Email > Email OTP Expiration`. An expiry duration of more than 86400 seconds (one day) is disallowed to guard against brute force attacks. The longer an OTP remains valid, the more time an attacker has to attempt brute force attacks. If the OTP is valid for several days, an attacker might have more opportunities to guess the correct OTP through repeated attempts.

### Signing in with email OTP [\#](https://supabase.com/docs/guides/auth/auth-email-passwordless\#signing-in-with-email-otp)

#### Step 1: Send the user an OTP code [\#](https://supabase.com/docs/guides/auth/auth-email-passwordless\#step-1-send-the-user-an-otp-code)

Get the user's email and call the "sign in with OTP" method from your client library.

If the user hasn't signed up yet, they are automatically signed up by default. To prevent this, set the `shouldCreateUser` option to `false`.

JavaScriptDartSwiftKotlinPython

```
1
const { data, error } = await supabase.auth.signInWithOtp({
2
  email: 'valid.email@supabase.io',
3
  options: {
4
    // set this to false if you do not want the user to be automatically signed up
5
    shouldCreateUser: false,
6
  },
7
})
```

If the request is successful, you receive a response with `error: null` and a `data` object where both `user` and `session` are null. Let the user know to check their email inbox.

```
1
{
2
  "data": {
3
    "user": null,
4
    "session": null
5
  },
6
  "error": null
7
}
```

#### Step 2: Verify the OTP to create a session [\#](https://supabase.com/docs/guides/auth/auth-email-passwordless\#step-2-verify-the-otp-to-create-a-session)

Provide an input field for the user to enter their one-time code.

Call the "verify OTP" method from your client library with the user's email address, the code, and a type of `email`:

JavaScriptSwiftKotlinPython

```
1
const {
2
  data: { session },
3
  error,
4
} = await supabase.auth.verifyOtp({
5
  email: 'email@example.com',
6
  token: '123456',
7
  type: 'email',
8
})
```

If successful, the user is now logged in, and you receive a valid session that looks like:

```
1
{
2
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjI3MjkxNTc3LCJzdWIiOiJmYTA2NTQ1Zi1kYmI1LTQxY2EtYjk1NC1kOGUyOTg4YzcxOTEiLCJlbWFpbCI6IiIsInBob25lIjoiNjU4NzUyMjAyOSIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6InBob25lIn0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.1BqRi0NbS_yr1f6hnr4q3s1ylMR3c1vkiJ4e_N55dhM",
3
  "token_type": "bearer",
4
  "expires_in": 3600,
5
  "refresh_token": "LSp8LglPPvf0DxGMSj-vaQ",
6
  "user": {...}
7
}
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-email-passwordless.mdx)

### Is this helpful?

NoYes

### On this page

[With Magic Link](https://supabase.com/docs/guides/auth/auth-email-passwordless#with-magic-link) [Enabling Magic Link](https://supabase.com/docs/guides/auth/auth-email-passwordless#enabling-magic-link) [Signing in with Magic Link](https://supabase.com/docs/guides/auth/auth-email-passwordless#signing-in-with-magic-link) [With OTP](https://supabase.com/docs/guides/auth/auth-email-passwordless#with-otp) [Enabling email OTP](https://supabase.com/docs/guides/auth/auth-email-passwordless#enabling-email-otp) [Signing in with email OTP](https://supabase.com/docs/guides/auth/auth-email-passwordless#signing-in-with-email-otp)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)