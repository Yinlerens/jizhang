---
url: "https://supabase.com/docs/guides/auth/quickstarts/react-native"
title: "Use Supabase Auth with React Native | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/quickstarts/react-native)

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
3. Getting Started
5. [React Native](https://supabase.com/docs/guides/auth/quickstarts/react-native)

# Use Supabase Auth with React Native

## Learn how to use Supabase Auth with React Native

* * *

1

### Create a new Supabase project

[Launch a new project](https://supabase.com/dashboard) in the Supabase Dashboard.

Your new database has a table for storing your users. You can see that this table is currently empty by running some SQL in the [SQL Editor](https://supabase.com/dashboard/project/_/sql).

###### SQL\_EDITOR

```
1
select * from auth.users;
```

2

### Create a React app

Create a React app using the `create-expo-app` command.

###### Terminal

```
1
npx create-expo-app -t expo-template-blank-typescript my-app
```

3

### Install the Supabase client library

Install `supabase-js` and the required dependencies.

###### Terminal

```
1
cd my-app && npx expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed react-native-url-polyfill
```

4

### Set up your login component

Create a helper file `lib/supabase.ts` that exports a Supabase client using your Project URL and key.

###### Project URL

No project found

###### Publishable key

No project found

###### Anon key

No project found

###### lib/supabase.ts

```
1
import { AppState, Platform } from 'react-native'
2
import 'react-native-url-polyfill/auto'
3
import AsyncStorage from '@react-native-async-storage/async-storage'
4
import { createClient, processLock } from '@supabase/supabase-js'
5

6
const supabaseUrl = YOUR_REACT_NATIVE_SUPABASE_URL
7
const supabaseAnonKey = YOUR_REACT_NATIVE_SUPABASE_PUBLISHABLE_KEY
8

9
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
10
  auth: {
11
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
12
    autoRefreshToken: true,
13
    persistSession: true,
14
    detectSessionInUrl: false,
15
    lock: processLock,
16
  },
17
})
18

19
// Tells Supabase Auth to continuously refresh the session automatically
20
// if the app is in the foreground. When this is added, you will continue
21
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
22
// `SIGNED_OUT` event if the user's session is terminated. This should
23
// only be registered once.
24
if (Platform.OS !== "web") {
25
  AppState.addEventListener('change', (state) => {
26
    if (state === 'active') {
27
      supabase.auth.startAutoRefresh()
28
    } else {
29
      supabase.auth.stopAutoRefresh()
30
    }
31
  })
32
}
```

You can also get the Project URL and key from [the project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=mobiles&framework=exporeactnative).

##### Changes to API keys

Supabase is changing the way keys work to improve project security and developer experience. You can [read the full announcement](https://github.com/orgs/supabase/discussions/29260), but in the transition period, you can use both the current `anon` and `service_role` keys and the new publishable key with the form `sb_publishable_xxx` which will replace the older keys.

In most cases, you can get the correct key from [the Project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=mobiles&framework=exporeactnative), but if you want a specific key, you can find all keys in [the API Keys section of a Project's Settings page](https://supabase.com/dashboard/project/_/settings/api-keys/):

- **For legacy keys**, copy the `anon` key for client-side operations and the `service_role` key for server-side operations from the **Legacy API Keys** tab.
- **For new keys**, open the **API Keys** tab, if you don't have a publishable key already, click **Create new API Keys**, and copy the value from the **Publishable key** section.

[Read the API keys docs](https://supabase.com/docs/guides/api/api-keys) for a full explanation of all key types and their uses.

5

### Create a login component

Let's set up a React Native component to manage logins and sign ups.

###### components/Auth.tsx

```
1
import React, { useState } from 'react'
2
import { Alert, StyleSheet, View } from 'react-native'
3
import { supabase } from '../lib/supabase'
4
import { Button, Input } from '@rneui/themed'
5

6
export default function Auth() {
7
  const [email, setEmail] = useState('')
8
  const [password, setPassword] = useState('')
9
  const [loading, setLoading] = useState(false)
10

11
  async function signInWithEmail() {
12
    setLoading(true)
13
    const { error } = await supabase.auth.signInWithPassword({
14
      email: email,
15
      password: password,
16
    })
17

18
    if (error) Alert.alert(error.message)
19
    setLoading(false)
20
  }
21

22
  async function signUpWithEmail() {
23
    setLoading(true)
24
    const {
25
      data: { session },
26
      error,
27
    } = await supabase.auth.signUp({
28
      email: email,
29
      password: password,
30
    })
31

32
    if (error) Alert.alert(error.message)
33
    if (!session) Alert.alert('Please check your inbox for email verification!')
34
    setLoading(false)
35
  }
36

37
  return (
38
    <View style={styles.container}>
39
      <View style={[styles.verticallySpaced, styles.mt20]}>
40
        <Input
41
          label="Email"
42
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
43
          onChangeText={(text) => setEmail(text)}
44
          value={email}
45
          placeholder="email@address.com"
46
          autoCapitalize={'none'}
47
        />
48
      </View>
49
      <View style={styles.verticallySpaced}>
50
        <Input
51
          label="Password"
52
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
53
          onChangeText={(text) => setPassword(text)}
54
          value={password}
55
          secureTextEntry={true}
56
          placeholder="Password"
57
          autoCapitalize={'none'}
58
        />
59
      </View>
60
      <View style={[styles.verticallySpaced, styles.mt20]}>
61
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
62
      </View>
63
      <View style={styles.verticallySpaced}>
64
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
65
      </View>
66
    </View>
67
  )
68
}
69

70
const styles = StyleSheet.create({
71
  container: {
72
    marginTop: 40,
73
    padding: 12,
74
  },
75
  verticallySpaced: {
76
    paddingTop: 4,
77
    paddingBottom: 4,
78
    alignSelf: 'stretch',
79
  },
80
  mt20: {
81
    marginTop: 20,
82
  },
83
})
```

6

### Add the Auth component to your app

Add the `Auth` component to your `App.tsx` file. If the user is logged in, print the user id to the screen.

###### App.tsx

```
1
import 'react-native-url-polyfill/auto'
2
import { useState, useEffect } from 'react'
3
import { supabase } from './lib/supabase'
4
import Auth from './components/Auth'
5
import { View, Text } from 'react-native'
6
import { Session } from '@supabase/supabase-js'
7

8
export default function App() {
9
  const [session, setSession] = useState<Session | null>(null)
10

11
  useEffect(() => {
12
    supabase.auth.getSession().then(({ data: { session } }) => {
13
      setSession(session)
14
    })
15

16
    supabase.auth.onAuthStateChange((_event, session) => {
17
      setSession(session)
18
    })
19
  }, [])
20

21
  return (
22
    <View>
23
      <Auth />
24
      {session && session.user && <Text>{session.user.id}</Text>}
25
    </View>
26
  )
27
}
```

7

### Start the app

Start the app, and follow the instructions in the terminal.

###### Terminal

```
1
npm start
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/quickstarts/react-native.mdx)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)