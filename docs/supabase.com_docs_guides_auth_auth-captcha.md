---
url: "https://supabase.com/docs/guides/auth/auth-captcha"
title: "Enable CAPTCHA Protection | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-captcha)

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
3. Security
5. [Bot Detection (CAPTCHA)](https://supabase.com/docs/guides/auth/auth-captcha)

# Enable CAPTCHA Protection

* * *

Supabase provides you with the option of adding CAPTCHA to your sign-in, sign-up, and password reset forms. This keeps your website safe from bots and malicious scripts. Supabase authentication has support for [hCaptcha](https://www.hcaptcha.com/) and [Cloudflare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/).

## Sign up for CAPTCHA [\#](https://supabase.com/docs/guides/auth/auth-captcha\#sign-up-for-captcha)

HCaptchaTurnstile

Go to the [hCaptcha](https://www.hcaptcha.com/) website and sign up for an account. On the Welcome page, copy the **Sitekey** and **Secret key**.

If you have already signed up and didn't copy this information from the Welcome page, you can get the **Secret key** from the Settings page.

![site_secret_settings.png](https://supabase.com/docs/img/guides/auth-captcha/site_secret_settings.png)

The **Sitekey** can be found in the **Settings** of the active site you created.

![sites_dashboard.png](https://supabase.com/docs/img/guides/auth-captcha/sites_dashboard.png)

In the Settings page, look for the **Sitekey** section and copy the key.

![sitekey_settings.png](https://supabase.com/docs/img/guides/auth-captcha/sitekey_settings.png)

## Enable CAPTCHA protection for your Supabase project [\#](https://supabase.com/docs/guides/auth/auth-captcha\#enable-captcha-protection-for-your-supabase-project)

Navigate to the **[Auth](https://supabase.com/dashboard/project/_/auth/protection)** section of your Project Settings in the Supabase Dashboard and find the **Enable CAPTCHA protection** toggle under Settings > Authentication > Bot and Abuse Protection > Enable CAPTCHA protection.

Select your CAPTCHA provider from the dropdown, enter your CAPTCHA **Secret key**, and click **Save**.

## Add the CAPTCHA frontend component [\#](https://supabase.com/docs/guides/auth/auth-captcha\#add-the-captcha-frontend-component)

The frontend requires some changes to provide the CAPTCHA on-screen for the user. This example uses React and the corresponding CAPTCHA React component, but both CAPTCHA providers can be used with any JavaScript framework.

HCaptchaTurnstile

Install `@hcaptcha/react-hcaptcha` in your project as a dependency.

```
1
npm install @hcaptcha/react-hcaptcha
```

Now import the `HCaptcha` component from the `@hcaptcha/react-hcaptcha` library.

```
1
import HCaptcha from '@hcaptcha/react-hcaptcha'
```

Let's create a empty state to store our `captchaToken`

```
1
const [captchaToken, setCaptchaToken] = useState()
```

Now lets add the `HCaptcha` component to the JSX section of our code

```
1
<HCaptcha />
```

We will pass it the sitekey we copied from the hCaptcha website as a property along with a `onVerify` property which takes a callback function. This callback function will have a token as one of its properties. Let's set the token in the state using `setCaptchaToken`

```
1
<HCaptcha
2
  sitekey="your-sitekey"
3
  onVerify={(token) => {
4
    setCaptchaToken(token)
5
  }}
6
/>
```

Now lets use the CAPTCHA token we receive in our Supabase signUp function.

```
1
await supabase.auth.signUp({
2
  email,
3
  password,
4
  options: { captchaToken },
5
})
```

We will also need to reset the CAPTCHA challenge after we have made a call to the function above.

Create a ref to use on our `HCaptcha` component.

```
1
const captcha = useRef()
```

Let's add a ref attribute on the `HCaptcha` component and assign the `captcha` constant to it.

```
1
<HCaptcha
2
  ref={captcha}
3
  sitekey="your-sitekey"
4
  onVerify={(token) => {
5
    setCaptchaToken(token)
6
  }}
7
/>
```

Reset the `captcha` after the signUp function is called using the following code:

```
1
captcha.current.resetCaptcha()
```

In order to test that this works locally we will need to use something like [ngrok](https://ngrok.com/) or add an entry to your hosts file. You can read more about this in the [hCaptcha docs](https://docs.hcaptcha.com/#local-development).

Run the application and you should now be provided with a CAPTCHA challenge.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-captcha.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2Fem1cpOAXknM%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Sign up for CAPTCHA](https://supabase.com/docs/guides/auth/auth-captcha#sign-up-for-captcha) [Enable CAPTCHA protection for your Supabase project](https://supabase.com/docs/guides/auth/auth-captcha#enable-captcha-protection-for-your-supabase-project) [Add the CAPTCHA frontend component](https://supabase.com/docs/guides/auth/auth-captcha#add-the-captcha-frontend-component)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)