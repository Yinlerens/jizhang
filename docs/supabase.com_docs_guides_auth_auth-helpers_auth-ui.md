---
url: "https://supabase.com/docs/guides/auth/auth-helpers/auth-ui"
title: "Auth UI | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)

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
3. Auth UI
5. [Auth UI (Deprecated)](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)

# Auth UI

* * *

As of 7th Feb 2024, [this repository](https://github.com/supabase-community/auth-ui) is no longer maintained by the Supabase Team. At the moment, the team does not have capacity to give the expected level of care to this repository. We may revisit Auth UI in the future but regrettably have to leave it on hold for now as we focus on other priorities such as improving the Server-Side Rendering (SSR) package and advanced Auth primitives.

As an alternative you can use the [Supabase UI Library](https://supabase.com/ui) which has auth ready blocks to use in your projects.

Auth UI is a pre-built React component for authenticating users.
It supports custom themes and extensible styles to match your brand and aesthetic.

## Set up Auth UI [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#set-up-auth-ui)

Install the latest version of [supabase-js](https://supabase.com/docs/reference/javascript) and the Auth UI package:

```
1
npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared
```

### Import the Auth component [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#import-the-auth-component)

Pass `supabaseClient` from `@supabase/supabase-js` as a prop to the component.

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3

4
const supabase = createClient('<INSERT PROJECT URL>', '<INSERT PROJECT ANON API KEY>')
5

6
const App = () => <Auth supabaseClient={supabase} />
```

This renders the Auth component without any styling.
We recommend using one of the predefined themes to style the UI.
Import the theme you want to use and pass it to the `appearance.theme` prop.

```
1
import { Auth } from '@supabase/auth-ui-react'
2
import {
3
  // Import predefined theme
4
  ThemeSupa,
5
} from '@supabase/auth-ui-shared'
6

7
const supabase = createClient(
8
  '<INSERT PROJECT URL>',
9
  '<INSERT PROJECT ANON API KEY>'
10
)
11

12
const App = () => (
13
  <Auth
14
    supabaseClient={supabase}
15
    {/* Apply predefined theme */}
16
    appearance={{ theme: ThemeSupa }}
17
  />
18
)
```

### Social providers [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#social-providers)

The Auth component also supports login with [official social providers](https://supabase.com/docs/guides/auth#providers).

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3
import { ThemeSupa } from '@supabase/auth-ui-shared'
4

5
const supabase = createClient('<INSERT PROJECT URL>', '<INSERT PROJECT ANON API KEY>')
6

7
const App = () => (
8
  <Auth
9
    supabaseClient={supabase}
10
    appearance={{ theme: ThemeSupa }}
11
    providers={['google', 'facebook', 'twitter']}
12
  />
13
)
```

### Options [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#options)

Options are available via `queryParams`:

```
1
<Auth
2
  supabaseClient={supabase}
3
  providers={['google']}
4
  queryParams={{
5
    access_type: 'offline',
6
    prompt: 'consent',
7
    hd: 'domain.com',
8
  }}
9
  onlyThirdPartyProviders
10
/>
```

### Provider scopes [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#provider-scopes)

Provider Scopes can be requested through `providerScope`;

```
1
<Auth
2
  supabaseClient={supabase}
3
  providers={['google']}
4
  queryParams={{
5
    access_type: 'offline',
6
    prompt: 'consent',
7
    hd: 'domain.com',
8
  }}
9
  providerScopes={{
10
    google: 'https://www.googleapis.com/auth/calendar.readonly',
11
  }}
12
/>
```

### Supported views [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#supported-views)

The Auth component is currently shipped with the following views:

- [Email Login](https://supabase.com/docs/guides/auth/auth-email)
- [Magic Link login](https://supabase.com/docs/guides/auth/auth-magic-link)
- [Social Login](https://supabase.com/docs/guides/auth/social-login)
- Update password
- Forgotten password

We are planning on adding more views in the future. Follow along on that [repo](https://github.com/supabase/auth-ui).

## Customization [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#customization)

There are several ways to customize Auth UI:

- Use one of the [predefined themes](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#predefined-themes) that comes with Auth UI
- Extend a theme by [overriding the variable tokens](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#override-themes) in a theme
- [Create your own theme](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#create-theme)
- [Use your own CSS classes](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#custom-css-classes)
- [Use inline styles](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#custom-inline-styles)
- [Use your own labels](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#custom-labels)

### Predefined themes [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#predefined-themes)

Auth UI comes with several themes to customize the appearance. Each predefined theme comes with at least two variations, a `default` variation, and a `dark` variation. You can switch between these themes using the `theme` prop. Import the theme you want to use and pass it to the `appearance.theme` prop.

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3
import { ThemeSupa } from '@supabase/auth-ui-shared'
4

5
const supabase = createClient(
6
  '<INSERT PROJECT URL>',
7
  '<INSERT PROJECT ANON API KEY>'
8
)
9

10
const App = () => (
11
  <Auth
12
    supabaseClient={supabase}
13
    {/* Apply predefined theme */}
14
    appearance={{ theme: ThemeSupa }}
15
  />
16
)
```

Currently there is only one predefined theme available, but we plan to add more.

### Switch theme variations [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#switch-theme-variations)

Auth UI comes with two theme variations: `default` and `dark`. You can switch between these themes with the `theme` prop.

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3
import { ThemeSupa } from '@supabase/auth-ui-shared'
4

5
const supabase = createClient(
6
  '<INSERT PROJECT URL>',
7
  '<INSERT PROJECT ANON API KEY>'
8
)
9

10
const App = () => (
11
  <Auth
12
    supabaseClient={supabase}
13
    appearance={{ theme: ThemeSupa }}
14
    {/* Set theme to dark */}
15
    theme="dark"
16
  />
17
)
```

If you don't pass a value to `theme` it uses the `"default"` theme. You can pass `"dark"` to the theme prop to switch to the `dark` theme. If your theme has other variations, use the name of the variation in this prop.

### Override themes [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#override-themes)

Auth UI themes can be overridden using variable tokens. See the [list of variable tokens](https://github.com/supabase/auth-ui/blob/main/packages/shared/src/theming/Themes.ts).

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3
import { ThemeSupa } from '@supabase/auth-ui-shared'
4

5
const supabase = createClient('<INSERT PROJECT URL>', '<INSERT PROJECT ANON API KEY>')
6

7
const App = () => (
8
  <Auth
9
    supabaseClient={supabase}
10
    appearance={{
11
      theme: ThemeSupa,
12
      variables: {
13
        default: {
14
          colors: {
15
            brand: 'red',
16
            brandAccent: 'darkred',
17
          },
18
        },
19
      },
20
    }}
21
  />
22
)
```

If you created your own theme, you may not need to override any of them.

### Create your own theme [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#create-theme)

You can create your own theme by following the same structure within a `appearance.theme` property.
See the list of [tokens within a theme](https://github.com/supabase/auth-ui/blob/main/packages/shared/src/theming/Themes.ts).

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3

4
const supabase = createClient('<INSERT PROJECT URL>', '<INSERT PROJECT ANON API KEY>')
5

6
const customTheme = {
7
  default: {
8
    colors: {
9
      brand: 'hsl(153 60.0% 53.0%)',
10
      brandAccent: 'hsl(154 54.8% 45.1%)',
11
      brandButtonText: 'white',
12
      // ..
13
    },
14
  },
15
  dark: {
16
    colors: {
17
      brandButtonText: 'white',
18
      defaultButtonBackground: '#2e2e2e',
19
      defaultButtonBackgroundHover: '#3e3e3e',
20
      //..
21
    },
22
  },
23
  // You can also add more theme variations with different names.
24
  evenDarker: {
25
    colors: {
26
      brandButtonText: 'white',
27
      defaultButtonBackground: '#1e1e1e',
28
      defaultButtonBackgroundHover: '#2e2e2e',
29
      //..
30
    },
31
  },
32
}
33

34
const App = () => (
35
  <Auth
36
    supabaseClient={supabase}
37
    theme="default" // can also be "dark" or "evenDarker"
38
    appearance={{ theme: customTheme }}
39
  />
40
)
```

You can switch between different variations of your theme with the ["theme" prop](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#switch-theme-variations).

### Custom CSS classes [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#custom-css-classes)

You can use custom CSS classes for the following elements:
`"button"`, `"container"`, `"anchor"`, `"divider"`, `"label"`, `"input"`, `"loader"`, `"message"`.

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3

4
const supabase = createClient('<INSERT PROJECT URL>', '<INSERT PROJECT ANON API KEY>')
5

6
const App = () => (
7
  <Auth
8
    supabaseClient={supabase}
9
    appearance={{
10
      // If you want to extend the default styles instead of overriding it, set this to true
11
      extend: false,
12
      // Your custom classes
13
      className: {
14
        anchor: 'my-awesome-anchor',
15
        button: 'my-awesome-button',
16
        //..
17
      },
18
    }}
19
  />
20
)
```

### Custom inline CSS [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#custom-inline-styles)

You can use custom CSS inline styles for the following elements:
`"button"`, `"container"`, `"anchor"`, `"divider"`, `"label"`, `"input"`, `"loader"`, `"message"`.

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3

4
const supabase = createClient('<INSERT PROJECT URL>', '<INSERT PROJECT ANON API KEY>')
5

6
const App = () => (
7
  <Auth
8
    supabaseClient={supabase}
9
    appearance={{
10
      style: {
11
        button: { background: 'red', color: 'white' },
12
        anchor: { color: 'blue' },
13
        //..
14
      },
15
    }}
16
  />
17
)
```

### Custom labels [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#custom-labels)

You can use custom labels with `localization.variables` like so:

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3

4
const supabase = createClient('<INSERT PROJECT URL>', '<INSERT PROJECT ANON API KEY>')
5

6
const App = () => (
7
  <Auth
8
    supabaseClient={supabase}
9
    localization={{
10
      variables: {
11
        sign_in: {
12
          email_label: 'Your email address',
13
          password_label: 'Your strong password',
14
        },
15
      },
16
    }}
17
  />
18
)
```

A full list of the available variables is below:

Sign UpSign InMagic LinkForgotten PasswordUpdate PasswordVerify OTP

| Label Tag | Default Label |
| --- | --- |
| `email_label` | Email address |
| `password_label` | Create a Password |
| `email_input_placeholder` | Your email address |
| `password_input_placeholder` | Your password |
| `button_label` | Sign up |
| `loading_button_label` | Signing up ... |
| `social_provider_text` | Sign in with `{{provider}}` |
| `link_text` | Don't have an account? Sign up |
| `confirmation_text` | Check your email for the confirmation link |

Currently, translating error messages (e.g. "Invalid credentials") is not supported. Check [related issue.](https://github.com/supabase-community/auth-ui/issues/86)

### Hiding links [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#hiding-links)

You can hide links by setting the `showLinks` prop to `false`

```
1
import { createClient } from '@supabase/supabase-js'
2
import { Auth } from '@supabase/auth-ui-react'
3

4
const supabase = createClient('<INSERT PROJECT URL>', '<INSERT PROJECT ANON API KEY>')
5

6
const App = () => <Auth supabaseClient={supabase} showLinks={false} />
```

Setting `showLinks` to `false` will hide the following links:

- Don't have an account? Sign up
- Already have an account? Sign in
- Send a magic link email
- Forgot your password?

### Sign in and sign up views [\#](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui\#sign-in-and-sign-up-views)

Add `sign_in` or `sign_up` views with the `view` prop:

```
1
<Auth
2
  supabaseClient={supabase}
3
  view="sign_up"
4
/>
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/auth-helpers/auth-ui.mdx)

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