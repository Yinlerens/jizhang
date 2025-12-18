---
url: "https://supabase.com/docs/guides/auth/auth-mfa"
title: "Multi-Factor Authentication | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-mfa)

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

[Overview](https://supabase.com/docs/guides/auth/auth-mfa)
[App Authenticator (TOTP)](https://supabase.com/docs/guides/auth/auth-mfa/totp)
[Phone](https://supabase.com/docs/guides/auth/auth-mfa/phone)

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
3. More
5. [Multi-Factor Authentication](https://supabase.com/docs/guides/auth/auth-mfa)
7. [Overview](https://supabase.com/docs/guides/auth/auth-mfa)

# Multi-Factor Authentication

* * *

Multi-factor authentication (MFA), sometimes called two-factor authentication (2FA), adds an additional layer of security to your application by verifying their identity through additional verification steps.

It is considered a best practice to use MFA for your applications.

Users with weak passwords or compromised social login accounts are prone to malicious account takeovers. These can be prevented with MFA because they require the user to provide proof of both of these:

- Something they know.
Password, or access to a social-login account.
- Something they have.
Access to an authenticator app (a.k.a. TOTP) or a mobile phone.

## Overview [\#](https://supabase.com/docs/guides/auth/auth-mfa\#overview)

Supabase Auth implements MFA via two methods: App Authenticator, which makes use of a Time based-one Time Password, and phone messaging, which makes use of a code generated by Supabase Auth.

Applications using MFA require two important flows:

1. **Enrollment flow.**
This lets users set up and control MFA in your app.
2. **Authentication flow.**
This lets users sign in using any factors after the conventional login step.

Supabase Auth provides:

- **Enrollment API** \- build rich user interfaces for adding and removing factors.
- **Challenge and Verify APIs** \- securely verify that the user has access to a factor.
- **List Factors API** \- build rich user interfaces for signing in with additional factors.

You can control access to the Enrollment API as well as the Challenge and Verify APIs via the Supabase Dashboard. A setting of `Verification Disabled` will disable both the challenge API and the verification API.

These sets of APIs let you control the MFA experience that works for you. You can create flows where MFA is optional, mandatory for all, or only specific groups of users.

Once users have enrolled or signed-in with a factor, Supabase Auth adds additional metadata to the user's access token (JWT) that your application can use to allow or deny access.

This information is represented by an [Authenticator Assurance Level](https://pages.nist.gov/800-63-3-Implementation-Resources/63B/AAL/), a standard measure about the assurance of the user's identity Supabase Auth has for that particular session. There are two levels recognized today:

1. **Assurance Level 1: `aal1`**
Means that the user's identity was verified using a conventional login method
such as email+password, magic link, one-time password, phone auth or social
login.
2. **Assurance Level 2: `aal2`**
Means that the user's identity was additionally verified using at least one
second factor, such as a TOTP code or One-Time Password code.

This assurance level is encoded in the `aal` claim in the JWT associated with the user. By decoding this value you can create custom authorization rules in your frontend, backend, and database that will enforce the MFA policy that works for your application. JWTs without an `aal` claim are at the `aal1` level.

## Adding to your app [\#](https://supabase.com/docs/guides/auth/auth-mfa\#adding-to-your-app)

Adding MFA to your app involves these four steps:

1. **Add enrollment flow.**
You need to provide a UI within your app that your users will be able to set-up
MFA in. You can add this right after sign-up, or as part of a separate flow in
the settings portion of your app.
2. **Add unenroll flow.**
You need to support a UI through which users can see existing devices and unenroll
devices which are no longer relevant.
3. **Add challenge step to login.**
If a user has set-up MFA, your app's login flow needs to present a challenge
screen to the user asking them to prove they have access to the additional
factor.
4. **Enforce rules for MFA logins.**
Once your users have a way to enroll and log in with MFA, you need to enforce
authorization rules across your app: on the frontend, backend, API servers or
Row-Level Security policies.

The enrollment flow and the challenge steps differ by factor and are covered on a separate page. Visit the [Phone](https://supabase.com/docs/guides/auth/auth-mfa/phone) or [App Authenticator](https://supabase.com/docs/guides/auth/auth-mfa/totp) pages to see how to add the flows for the respective factors. You can combine both flows and allow for use of both Phone and App Authenticator Factors.

### Add unenroll flow [\#](https://supabase.com/docs/guides/auth/auth-mfa\#add-unenroll-flow)

The unenroll process is the same for both Phone and TOTP factors.

An unenroll flow provides a UI for users to manage and unenroll factors linked to their accounts. Most applications do so via a factor management page where users can view and unlink selected factors.

When a user unenrolls a factor, call `supabase.auth.mfa.unenroll()` with the ID of the factor. For example, call:

```
1
supabase.auth.mfa.unenroll({ factorId: 'd30fd651-184e-4748-a928-0a4b9be1d429' })
```

to unenroll a factor with ID `d30fd651-184e-4748-a928-0a4b9be1d429`.

### Enforce rules for MFA logins [\#](https://supabase.com/docs/guides/auth/auth-mfa\#enforce-rules-for-mfa-logins)

Adding MFA to your app's UI does not in-and-of-itself offer a higher level of security to your users. You also need to enforce the MFA rules in your application's database, APIs, and server-side rendering.

Depending on your application's needs, there are three ways you can choose to enforce MFA.

1. **Enforce for all users (new and existing).**
Any user account will have to enroll MFA to continue using your app.
The application will not allow access without going through MFA first.
2. **Enforce for new users only.**
Only new users will be forced to enroll MFA, while old users will be encouraged
to do so.
The application will not allow access for new users without going through MFA
first.
3. **Enforce only for users that have opted-in.**
Users that want MFA can enroll in it and the application will not allow access
without going through MFA first.

#### Example: React [\#](https://supabase.com/docs/guides/auth/auth-mfa\#example-react)

Below is an example that creates a new `UnenrollMFA` component that illustrates the important pieces of the MFA enrollment flow. Note that users can only unenroll a factor after completing the enrollment flow and obtaining an `aal2` JWT claim. Here are some points of note:

- When the component appears on screen, the `supabase.auth.mfa.listFactors()` endpoint
fetches all existing factors together with their details.
- The existing factors for a user are displayed in a table.
- Once the user has selected a factor to unenroll, they can type in the `factorId` and click **Unenroll**
which creates a confirmation modal.

Unenrolling a factor will downgrade the assurance level from `aal2` to `aal1` only after the refresh interval has lapsed. For an immediate downgrade from `aal2` to `aal1` after enrolling one will need to manually call `refreshSession()`

```
1
/**
2
 * UnenrollMFA shows a simple table with the list of factors together with a button to unenroll.
3
 * When a user types in the factorId of the factor that they wish to unenroll and clicks unenroll
4
 * the corresponding factor will be unenrolled.
5
 */
6
export function UnenrollMFA() {
7
  const [factorId, setFactorId] = useState('')
8
  const [factors, setFactors] = useState([])
9
  const [error, setError] = useState('') // holds an error message
10

11
  useEffect(() => {
12
    ;(async () => {
13
      const { data, error } = await supabase.auth.mfa.listFactors()
14
      if (error) {
15
        throw error
16
      }
17

18
      setFactors([...data.totp, ...data.phone])
19
    })()
20
  }, [])
21

22
  return (
23
    <>
24
      {error && <div className="error">{error}</div>}
25
      <tbody>
26
        <tr>
27
          <td>Factor ID</td>
28
          <td>Friendly Name</td>
29
          <td>Factor Status</td>
30
          <td>Phone Number</td>
31
        </tr>
32
        {factors.map((factor) => (
33
          <tr>
34
            <td>{factor.id}</td>
35
            <td>{factor.friendly_name}</td>
36
            <td>{factor.factor_type}</td>
37
            <td>{factor.status}</td>
38
            <td>{factor.phone}</td>
39
          </tr>
40
        ))}
41
      </tbody>
42
      <input type="text" value={verifyCode} onChange={(e) => setFactorId(e.target.value.trim())} />
43
      <button onClick={() => supabase.auth.mfa.unenroll({ factorId })}>Unenroll</button>
44
    </>
45
  )
46
}
```

#### Database [\#](https://supabase.com/docs/guides/auth/auth-mfa\#database)

Your app should sufficiently deny or allow access to tables or rows based on the user's current and possible authenticator levels.

Postgres has two types of policies: permissive and restrictive. This guide uses restrictive policies. Make sure you don't omit the `as restrictive` clause.

##### Enforce for all users (new and existing)

If your app falls under this case, this is a template Row Level Security policy you can apply to all your tables:

```
1
create policy "Policy name."
2
  on table_name
3
  as restrictive
4
  to authenticated
5
  using ((select auth.jwt()->>'aal') = 'aal2');
```

- Here the policy will not accept any JWTs with an `aal` claim other than
`aal2`, which is the highest authenticator assurance level.
- **Using `as restrictive` ensures this policy will restrict all commands on the**
**table regardless of other policies!**

##### Enforce for new users only

If your app falls under this case, the rules get more complex. User accounts created past a certain timestamp must have a `aal2` level to access the database.

```
1
create policy "Policy name."
2
  on table_name
3
  as restrictive -- very important!
4
  to authenticated
5
  using
6
    (array[(select auth.jwt()->>'aal')] <@ (
7
       select
8
         case
9
           when created_at >= '2022-12-12T00:00:00Z' then array['aal2']
10
           else array['aal1', 'aal2']
11
         end as aal
12
       from auth.users
13
       where (select auth.uid()) = id));
```

- The policy will accept both `aal1` and `aal2` for users with a `created_at`
timestamp prior to 12th December 2022 at 00:00 UTC, but will only accept
`aal2` for all other timestamps.
- The `<@` operator is PostgreSQL's ["contained in"\\
operator.](https://www.postgresql.org/docs/current/functions-array.html)
- **Using `as restrictive` ensures this policy will restrict all commands on the**
**table regardless of other policies!**

##### Enforce only for users that have opted-in

Users that have enrolled MFA on their account are expecting that your
application only works for them if they've gone through MFA.

```
1
create policy "Policy name."
2
  on table_name
3
  as restrictive -- very important!
4
  to authenticated
5
  using (
6
    array[(select auth.jwt()->>'aal')] <@ (
7
      select
8
          case
9
            when count(id) > 0 then array['aal2']
10
            else array['aal1', 'aal2']
11
          end as aal
12
        from auth.mfa_factors
13
        where ((select auth.uid()) = user_id) and status = 'verified'
14
    ));
```

- The policy will only accept only `aal2` when the user has at least one MFA
factor verified.
- Otherwise, it will accept both `aal1` and `aal2`.
- The `<@` operator is PostgreSQL's ["contained in"\\
operator.](https://www.postgresql.org/docs/current/functions-array.html)
- **Using `as restrictive` ensures this policy will restrict all commands on the**
**table regardless of other policies!**

### Server-Side Rendering [\#](https://supabase.com/docs/guides/auth/auth-mfa\#server-side-rendering)

When using the Supabase JavaScript library in a server-side rendering context, make sure you always create a new object for each request! This will prevent you from accidentally rendering and serving content belonging to different users.

It is possible to enforce MFA on the Server-Side Rendering level. However, this can be tricky do to well.

You can use the `supabase.auth.mfa.getAuthenticatorAssuranceLevel()` and `supabase.auth.mfa.listFactors()` APIs to identify the AAL level of the session and any factors that are enabled for a user, similar to how you would use these on the browser.

However, encountering a different AAL level on the server may not actually be a security problem. Consider these likely scenarios:

1. User signed-in with a conventional method but closed their tab on the MFA
flow.
2. User forgot a tab open for a very long time. (This happens more often than
you might imagine.)
3. User has lost their authenticator device and is confused about the next
steps.

We thus recommend you redirect users to a page where they can authenticate using their additional factor, instead of rendering a HTTP 401 Unauthorized or HTTP 403 Forbidden content.

### APIs [\#](https://supabase.com/docs/guides/auth/auth-mfa\#apis)

If your application uses the Supabase Database, Storage or Edge Functions, just using Row Level Security policies will give you sufficient protection. In the event that you have other APIs that you wish to protect, follow these general guidelines:

1. **Use a good JWT verification and parsing library for your language.**
This will let you securely parse JWTs and extract their claims.
2. **Retrieve the `aal` claim from the JWT and compare its value according to**
**your needs.**
If you've encountered an AAL level that can be increased, ask the user to
continue the login process instead of logging them out.
3. **Use the `https://<project-ref>.supabase.co/rest/v1/auth/factors` REST**
**endpoint to identify if the user has enrolled any MFA factors.**
Only `verified` factors should be acted upon.

## Frequently asked questions [\#](https://supabase.com/docs/guides/auth/auth-mfa\#frequently-asked-questions)

How do I check when a user went through MFA?

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-mfa.mdx)

### Is this helpful?

NoYes

### On this page

[Overview](https://supabase.com/docs/guides/auth/auth-mfa#overview) [Adding to your app](https://supabase.com/docs/guides/auth/auth-mfa#adding-to-your-app) [Add unenroll flow](https://supabase.com/docs/guides/auth/auth-mfa#add-unenroll-flow) [Enforce rules for MFA logins](https://supabase.com/docs/guides/auth/auth-mfa#enforce-rules-for-mfa-logins) [Server-Side Rendering](https://supabase.com/docs/guides/auth/auth-mfa#server-side-rendering) [APIs](https://supabase.com/docs/guides/auth/auth-mfa#apis) [Frequently asked questions](https://supabase.com/docs/guides/auth/auth-mfa#frequently-asked-questions)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)