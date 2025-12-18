---
url: "https://supabase.com/docs/guides/auth/auth-mfa/phone"
title: "Multi-Factor Authentication (Phone) | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-mfa/phone)

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

Auth

1. Auth
3. More
5. [Multi-Factor Authentication](https://supabase.com/docs/guides/auth/auth-mfa)
7. [Phone](https://supabase.com/docs/guides/auth/auth-mfa/phone)

# Multi-Factor Authentication (Phone)

* * *

## How does phone multi-factor-authentication work? [\#](https://supabase.com/docs/guides/auth/auth-mfa/phone\#how-does-phone-multi-factor-authentication-work)

Phone multi-factor authentication involves a shared code generated by Supabase Auth and the end user. The code is delivered via a messaging channel, such as SMS or WhatsApp, and the user uses the code to authenticate to Supabase Auth.

The phone messaging configuration for MFA is shared with [phone auth login](https://supabase.com/docs/guides/auth/phone-login). The same provider configuration that is used for phone login is used for MFA. You can also use the [Send SMS Hook](https://supabase.com/docs/guides/auth/auth-hooks/send-sms-hook) if you need to use an MFA (Phone) messaging provider different from what is supported natively.

Below is a flow chart illustrating how the Enrollment and Verify APIs work in the context of MFA (Phone).

### Add enrollment flow [\#](https://supabase.com/docs/guides/auth/auth-mfa/phone\#add-enrollment-flow)

An enrollment flow provides a UI for users to set up additional authentication factors. Most applications add the enrollment flow in two places within their app:

1. Right after login or sign up.
This allows users quickly set up Multi Factor Authentication (MFA) post login or account creation. Where possible, encourage all users to set up MFA. Many applications offer this as an opt-in step in an
effort to reduce onboarding friction.
2. From within a settings page.
Allows users to set up, disable or modify their MFA settings.

As far as possible, maintain a generic flow that you can reuse in both cases with minor modifications.

Enrolling a factor for use with MFA takes three steps for phone MFA:

1. Call `supabase.auth.mfa.enroll()`.
2. Calling the `supabase.auth.mfa.challenge()` API. This sends a code via SMS or WhatsApp and prepares Supabase Auth to accept a verification code from the user.
3. Calling the `supabase.auth.mfa.verify()` API. `supabase.auth.mfa.challenge()` returns a challenge ID.
This verifies that the code issued by Supabase Auth matches the code input by the user. If the verification succeeds, the factor
immediately becomes active for the user account. If not, you should repeat
steps 2 and 3.

#### Example: React [\#](https://supabase.com/docs/guides/auth/auth-mfa/phone\#example-react)

Below is an example that creates a new `EnrollMFA` component that illustrates the important pieces of the MFA enrollment flow.

- When the component appears on screen, the `supabase.auth.mfa.enroll()` API is
called once to start the process of enrolling a new factor for the current
user.
- A challenge is created using the `supabase.auth.mfa.challenge()` API and the
code from the user is submitted for verification using the
`supabase.auth.mfa.verify()` challenge.
- `onEnabled` is a callback that notifies the other components that enrollment
has completed.
- `onCancelled` is a callback that notifies the other components that the user
has clicked the `Cancel` button.

```
1
export function EnrollMFA({
2
  onEnrolled,
3
  onCancelled,
4
}: {
5
  onEnrolled: () => void
6
  onCancelled: () => void
7
}) {
8
  const [phoneNumber, setPhoneNumber] = useState('')
9
  const [factorId, setFactorId] = useState('')
10
  const [verifyCode, setVerifyCode] = useState('')
11
  const [error, setError] = useState('')
12
  const [challengeId, setChallengeId] = useState('')
13

14
  const onEnableClicked = () => {
15
    setError('')
16
    ;(async () => {
17
      const verify = await auth.mfa.verify({
18
        factorId,
19
        challengeId,
20
        code: verifyCode,
21
      })
22
      if (verify.error) {
23
        setError(verify.error.message)
24
        throw verify.error
25
      }
26

27
      onEnrolled()
28
    })()
29
  }
30
  const onEnrollClicked = async () => {
31
    setError('')
32
    try {
33
      const factor = await auth.mfa.enroll({
34
        phone: phoneNumber,
35
        factorType: 'phone',
36
      })
37
      if (factor.error) {
38
        setError(factor.error.message)
39
        throw factor.error
40
      }
41

42
      setFactorId(factor.data.id)
43
    } catch (error) {
44
      setError('Failed to Enroll the Factor.')
45
    }
46
  }
47

48
  const onSendOTPClicked = async () => {
49
    setError('')
50
    try {
51
      const challenge = await auth.mfa.challenge({ factorId })
52
      if (challenge.error) {
53
        setError(challenge.error.message)
54
        throw challenge.error
55
      }
56

57
      setChallengeId(challenge.data.id)
58
    } catch (error) {
59
      setError('Failed to resend the code.')
60
    }
61
  }
62

63
  return (
64
    <>
65
      {error && <div className="error">{error}</div>}
66
      <input
67
        type="text"
68
        placeholder="Phone Number"
69
        value={phoneNumber}
70
        onChange={(e) => setPhoneNumber(e.target.value.trim())}
71
      />
72
      <input
73
        type="text"
74
        placeholder="Verification Code"
75
        value={verifyCode}
76
        onChange={(e) => setVerifyCode(e.target.value.trim())}
77
      />
78
      <input type="button" value="Enroll" onClick={onEnrollClicked} />
79
      <input type="button" value="Submit Code" onClick={onEnableClicked} />
80
      <input type="button" value="Send OTP Code" onClick={onSendOTPClicked} />
81
      <input type="button" value="Cancel" onClick={onCancelled} />
82
    </>
83
  )
84
}
```

### Add a challenge step to login [\#](https://supabase.com/docs/guides/auth/auth-mfa/phone\#add-a-challenge-step-to-login)

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

#### Example: React [\#](https://supabase.com/docs/guides/auth/auth-mfa/phone\#example-react)

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
  const [factorId, setFactorId] = useState('')
5
  const [challengeId, setChallengeId] = useState('')
6
  const [phoneNumber, setPhoneNumber] = useState('')
7

8
  const startChallenge = async () => {
9
    setError('')
10
    try {
11
      const factors = await supabase.auth.mfa.listFactors()
12
      if (factors.error) {
13
        throw factors.error
14
      }
15

16
      const phoneFactor = factors.data.phone[0]
17

18
      if (!phoneFactor) {
19
        throw new Error('No phone factors found!')
20
      }
21

22
      const factorId = phoneFactor.id
23
      setFactorId(factorId)
24
      setPhoneNumber(phoneFactor.phone)
25

26
      const challenge = await supabase.auth.mfa.challenge({ factorId })
27
      if (challenge.error) {
28
        setError(challenge.error.message)
29
        throw challenge.error
30
      }
31

32
      setChallengeId(challenge.data.id)
33
    } catch (error) {
34
      setError(error.message)
35
    }
36
  }
37

38
  const verifyCode = async () => {
39
    setError('')
40
    try {
41
      const verify = await supabase.auth.mfa.verify({
42
        factorId,
43
        challengeId,
44
        code: verifyCode,
45
      })
46
      if (verify.error) {
47
        setError(verify.error.message)
48
        throw verify.error
49
      }
50
    } catch (error) {
51
      setError(error.message)
52
    }
53
  }
54

55
  return (
56
    <>
57
      <div>Please enter the code sent to your phone.</div>
58
      {phoneNumber && <div>Phone number: {phoneNumber}</div>}
59
      {error && <div className="error">{error}</div>}
60
      <input
61
        type="text"
62
        value={verifyCode}
63
        onChange={(e) => setVerifyCode(e.target.value.trim())}
64
      />
65
      {!challengeId ? (
66
        <input type="button" value="Start Challenge" onClick={startChallenge} />
67
      ) : (
68
        <input type="button" value="Verify Code" onClick={verifyCode} />
69
      )}
70
    </>
71
  )
72
}
```

- You can extract the available MFA factors for the user by calling
`supabase.auth.mfa.listFactors()`. Don't worry this method is also very quick
and rarely uses the network.
- If `listFactors()` returns more than one factor (or of a different type) you
should present the user with a choice. For simplicity this is not shown in
the example.
- Phone numbers are unique per user. Users can only have one verified phone factor with a given phone number.
Attempting to enroll a new phone factor alongside an existing verified factor with the same number will result in an error.
- Each time the user presses the "Submit" button a new challenge is created for
the chosen factor (in this case the first one)
- On successful verification, the client library will refresh the session in
the background automatically and finally call the `onSuccess` callback, which
will show the authenticated `App` component on screen.

### Security configuration [\#](https://supabase.com/docs/guides/auth/auth-mfa/phone\#security-configuration)

Each code is valid for up to 5 minutes, after which a new one can be sent. Successive codes remain valid until expiry. When possible choose the longest code length acceptable to your use case, at a minimum of 6. This can be configured in the [Authentication Settings](https://supabase.com/dashboard/project/_/auth/mfa).

Be aware that Phone MFA is vulnerable to SIM swap attacks where an attacker will call a mobile provider and ask to port the target's phone number to a new SIM card and then use the said SIM card to intercept an MFA code. Evaluate the your application's tolerance for such an attack. You can read more about SIM swapping attacks [here](https://en.wikipedia.org/wiki/SIM_swap_scam)

## Pricing [\#](https://supabase.com/docs/guides/auth/auth-mfa/phone\#pricing)

$0.1027 per hour ($75 per month) for the first project. $0.0137 per
hour ($10 per month) for every additional project.

| Plan | Project 1 per month | Project 2 per month | Project 3 per month |
| --- | --- | --- | --- |
| Pro | $75 | $10 | $10 |
| Team | $75 | $10 | $10 |
| Enterprise | Custom | Custom | Custom |

For a detailed breakdown of how charges are calculated, refer to [Manage Advanced MFA Phone usage](https://supabase.com/docs/guides/platform/manage-your-usage/advanced-mfa-phone).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-mfa/phone.mdx)

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