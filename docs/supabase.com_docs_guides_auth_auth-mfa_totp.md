---
url: "https://supabase.com/docs/guides/auth/auth-mfa/totp"
title: "Multi-Factor Authentication (TOTP) | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-mfa/totp)

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
7. [App Authenticator (TOTP)](https://supabase.com/docs/guides/auth/auth-mfa/totp)

# Multi-Factor Authentication (TOTP)

* * *

## How does app authenticator multi-factor authentication work? [\#](https://supabase.com/docs/guides/auth/auth-mfa/totp\#how-does-app-authenticator-multi-factor-authentication-work)

App Authenticator (TOTP) multi-factor authentication involves a timed one-time password generated from an authenticator app in the control of users. It uses a QR Code which to transmit a shared secret used to generate a One Time Password. A user can scan a QR code with their phone to capture a shared secret required for subsequent authentication.

The use of a QR code was [initially introduced by Google Authenticator](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) but is now universally accepted by all authenticator apps. The QR code has an alternate representation in URI form following the `otpauth` scheme such as: `otpauth://totp/supabase:alice@supabase.com?secret=<secret>&issuer=supabase` which a user can manually input in cases where there is difficulty rendering a QR Code.

Below is a flow chart illustrating how the Enrollment, Challenge, and Verify APIs work in the context of MFA (TOTP).

![Diagram showing the flow of Multi-Factor authentication](https://supabase.com/docs/img/guides/auth-mfa/auth-mfa-flow.svg)

[TOTP MFA API](https://supabase.com/docs/reference/javascript/auth-mfa-api) is free to use and is enabled on all Supabase projects by default.

### Add enrollment flow [\#](https://supabase.com/docs/guides/auth/auth-mfa/totp\#add-enrollment-flow)

An enrollment flow provides a UI for users to set up additional authentication factors. Most applications add the enrollment flow in two places within their app:

1. Right after login or sign up.
This lets users quickly set up MFA immediately after they log in or create an
account. We recommend encouraging all users to set up MFA if that makes sense
for your application. Many applications offer this as an opt-in step in an
effort to reduce onboarding friction.
2. From within a settings page.
Allows users to set up, disable or modify their MFA settings.

Enrolling a factor for use with MFA takes three steps:

1. Call `supabase.auth.mfa.enroll()`.
This method returns a QR code and a secret. Display the QR
code to the user and ask them to scan it with their authenticator application.
If they are unable to scan the QR code, show the secret in plain text which
they can type or paste into their authenticator app.
2. Calling the `supabase.auth.mfa.challenge()` API.
This prepares Supabase Auth to accept a verification code from the user
and returns a challenge ID. In the case of Phone MFA this step also sends the verification code to the user.
3. Calling the `supabase.auth.mfa.verify()` API.
This verifies that the user has indeed added the secret from step (1) into
their app and is working correctly. If the verification succeeds, the factor
immediately becomes active for the user account. If not, you should repeat
steps 2 and 3.

#### Example: React [\#](https://supabase.com/docs/guides/auth/auth-mfa/totp\#example-react)

Below is an example that creates a new `EnrollMFA` component that illustrates the important pieces of the MFA enrollment flow.

- When the component appears on screen, the `supabase.auth.mfa.enroll()` API is
called once to start the process of enrolling a new factor for the current
user.
- This API returns a QR code in the SVG format, which is shown on screen using
a normal `<img>` tag by encoding the SVG as a data URL.
- Once the user has scanned the QR code with their authenticator app, they
should enter the verification code within the `verifyCode` input field and
click on `Enable`.
- A challenge is created using the `supabase.auth.mfa.challenge()` API and the
code from the user is submitted for verification using the
`supabase.auth.mfa.verify()` challenge.
- `onEnabled` is a callback that notifies the other components that enrollment
has completed.
- `onCancelled` is a callback that notifies the other components that the user
has clicked the `Cancel` button.

```
1
/**
2
 * EnrollMFA shows a simple enrollment dialog. When shown on screen it calls
3
 * the `enroll` API. Each time a user clicks the Enable button it calls the
4
 * `challenge` and `verify` APIs to check if the code provided by the user is
5
 * valid.
6
 * When enrollment is successful, it calls `onEnrolled`. When the user clicks
7
 * Cancel the `onCancelled` callback is called.
8
 */
9
export function EnrollMFA({
10
  onEnrolled,
11
  onCancelled,
12
}: {
13
  onEnrolled: () => void
14
  onCancelled: () => void
15
}) {
16
  const [factorId, setFactorId] = useState('')
17
  const [qr, setQR] = useState('') // holds the QR code image SVG
18
  const [verifyCode, setVerifyCode] = useState('') // contains the code entered by the user
19
  const [error, setError] = useState('') // holds an error message
20

21
  const onEnableClicked = () => {
22
    setError('')
23
    ;(async () => {
24
      const challenge = await supabase.auth.mfa.challenge({ factorId })
25
      if (challenge.error) {
26
        setError(challenge.error.message)
27
        throw challenge.error
28
      }
29

30
      const challengeId = challenge.data.id
31

32
      const verify = await supabase.auth.mfa.verify({
33
        factorId,
34
        challengeId,
35
        code: verifyCode,
36
      })
37
      if (verify.error) {
38
        setError(verify.error.message)
39
        throw verify.error
40
      }
41

42
      onEnrolled()
43
    })()
44
  }
45

46
  useEffect(() => {
47
    ;(async () => {
48
      const { data, error } = await supabase.auth.mfa.enroll({
49
        factorType: 'totp',
50
      })
51
      if (error) {
52
        throw error
53
      }
54

55
      setFactorId(data.id)
56

57
      // Supabase Auth returns an SVG QR code which you can convert into a data
58
      // URL that you can place in an <img> tag.
59
      setQR(data.totp.qr_code)
60
    })()
61
  }, [])
62

63
  return (
64
    <>
65
      {error && <div className="error">{error}</div>}
66
      <img src={qr} />
67
      <input
68
        type="text"
69
        value={verifyCode}
70
        onChange={(e) => setVerifyCode(e.target.value.trim())}
71
      />
72
      <input type="button" value="Enable" onClick={onEnableClicked} />
73
      <input type="button" value="Cancel" onClick={onCancelled} />
74
    </>
75
  )
76
}
```

### Add a challenge step to login [\#](https://supabase.com/docs/guides/auth/auth-mfa/totp\#add-a-challenge-step-to-login)

Once a user has logged in via their first factor (email+password, magic link, one time password, social login etc.) you need to perform a check if any additional factors need to be verified.

This can be done by using the `supabase.auth.mfa.getAuthenticatorAssuranceLevel()` API. When the user signs in and is redirected back to your app, you should call this method to extract the user's current and next authenticator assurance level (AAL).

Therefore if you receive a `currentLevel` which is `aal1` but a `nextLevel` of `aal2`, the user should be given the option to go through MFA.

Below is a table that explains the combined meaning.

| Current Level | Next Level | Meaning |
| --: | :-- | :-- |
| `aal1` | `aal1` | User does not have MFA enrolled. |
| `aal1` | `aal2` | User has an MFA factor enrolled but has not verified it. |
| `aal2` | `aal2` | User has verified their MFA factor. |
| `aal2` | `aal1` | User has disabled their MFA factor. (Stale JWT.) |

#### Example: React [\#](https://supabase.com/docs/guides/auth/auth-mfa/totp\#example-react)

Adding the challenge step to login depends heavily on the architecture of your app. However, a fairly common way to structure React apps is to have a large component (often named `App`) which contains most of the authenticated application logic.

This example will wrap this component with logic that will show an MFA challenge screen if necessary, before showing the full application. This is illustrated in the `AppWithMFA` example below.

```
1
function AppWithMFA() {
2
  const [readyToShow, setReadyToShow] = useState(false)
3
  const [showMFAScreen, setShowMFAScreen] = useState(false)
4

5
  useEffect(() => {
6
    ;(async () => {
7
      try {
8
        const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
9
        if (error) {
10
          throw error
11
        }
12

13
        console.log(data)
14

15
        if (data.nextLevel === 'aal2' && data.nextLevel !== data.currentLevel) {
16
          setShowMFAScreen(true)
17
        }
18
      } finally {
19
        setReadyToShow(true)
20
      }
21
    })()
22
  }, [])
23

24
  if (readyToShow) {
25
    if (showMFAScreen) {
26
      return <AuthMFA />
27
    }
28

29
    return <App />
30
  }
31

32
  return <></>
33
}
```

- `supabase.auth.mfa.getAuthenticatorAssuranceLevel()` does return a promise.
Don't worry, this is a very fast method (microseconds) as it rarely uses the
network.
- `readyToShow` only makes sure the AAL check completes before showing any
application UI to the user.
- If the current level can be upgraded to the next one, the MFA screen is
shown.
- Once the challenge is successful, the `App` component is finally rendered on
screen.

Below is the component that implements the challenge and verify logic.

```
1
function AuthMFA() {
2
  const [verifyCode, setVerifyCode] = useState('')
3
  const [error, setError] = useState('')
4

5
  const onSubmitClicked = () => {
6
    setError('')
7
    ;(async () => {
8
      const factors = await supabase.auth.mfa.listFactors()
9
      if (factors.error) {
10
        throw factors.error
11
      }
12

13
      const totpFactor = factors.data.totp[0]
14

15
      if (!totpFactor) {
16
        throw new Error('No TOTP factors found!')
17
      }
18

19
      const factorId = totpFactor.id
20

21
      const challenge = await supabase.auth.mfa.challenge({ factorId })
22
      if (challenge.error) {
23
        setError(challenge.error.message)
24
        throw challenge.error
25
      }
26

27
      const challengeId = challenge.data.id
28

29
      const verify = await supabase.auth.mfa.verify({
30
        factorId,
31
        challengeId,
32
        code: verifyCode,
33
      })
34
      if (verify.error) {
35
        setError(verify.error.message)
36
        throw verify.error
37
      }
38
    })()
39
  }
40

41
  return (
42
    <>
43
      <div>Please enter the code from your authenticator app.</div>
44
      {error && <div className="error">{error}</div>}
45
      <input
46
        type="text"
47
        value={verifyCode}
48
        onChange={(e) => setVerifyCode(e.target.value.trim())}
49
      />
50
      <input type="button" value="Submit" onClick={onSubmitClicked} />
51
    </>
52
  )
53
}
```

- You can extract the available MFA factors for the user by calling
`supabase.auth.mfa.listFactors()`. Don't worry this method is also very quick
and rarely uses the network.
- If `listFactors()` returns more than one factor (or of a different type) you
should present the user with a choice. For simplicity this is not shown in
the example.
- Each time the user presses the "Submit" button a new challenge is created for
the chosen factor (in this case the first one) and it is immediately
verified. Any errors are displayed to the user.
- On successful verification, the client library will refresh the session in
the background automatically and finally call the `onSuccess` callback, which
will show the authenticated `App` component on screen.

## Frequently asked questions [\#](https://supabase.com/docs/guides/auth/auth-mfa/totp\#frequently-asked-questions)

What's inside the QR code?

How long is the TOTP code valid for?

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-mfa/totp.mdx)

### Is this helpful?

NoYes

### On this page

[How does app authenticator multi-factor authentication work?](https://supabase.com/docs/guides/auth/auth-mfa/totp#how-does-app-authenticator-multi-factor-authentication-work) [Add enrollment flow](https://supabase.com/docs/guides/auth/auth-mfa/totp#add-enrollment-flow) [Add a challenge step to login](https://supabase.com/docs/guides/auth/auth-mfa/totp#add-a-challenge-step-to-login) [Frequently asked questions](https://supabase.com/docs/guides/auth/auth-mfa/totp#frequently-asked-questions)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)