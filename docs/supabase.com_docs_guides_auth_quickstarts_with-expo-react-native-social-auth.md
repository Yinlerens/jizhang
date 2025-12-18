---
url: "https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth"
title: "Build a Social Auth App with Expo React Native | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth)

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
3. Getting Started
5. [React Native with Expo & Social Auth](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth)

# Build a Social Auth App with Expo React Native

* * *

This tutorial demonstrates how to build a React Native app with [Expo](https://expo.dev/) that implements social authentication. The app showcases a complete authentication flow with protected navigation using:

- [Supabase Database](https://supabase.com/docs/guides/database) \- a Postgres database for storing your user data with [Row Level Security](https://supabase.com/docs/guides/auth#row-level-security) to ensure data is protected and users can only access their own information.
- [Supabase Auth](https://supabase.com/docs/guides/auth) \- enables users to log in through social authentication providers (Apple and Google).

![Supabase Social Auth example](https://supabase.com/docs/img/supabase-expo-social-auth-login.png)

If you get stuck while working through this guide, refer to the [full example on GitHub](https://github.com/supabase/supabase/tree/master/examples/auth/expo-social-auth).

## Project setup [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#project-setup)

Before you start building you need to set up the Database and API. You can do this by starting a new Project in Supabase and then creating a "schema" inside the database.

### Create a project [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#create-a-project)

1. [Create a new project](https://supabase.com/dashboard) in the Supabase Dashboard.
2. Enter your project details.
3. Wait for the new database to launch.

### Set up the database schema [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#set-up-the-database-schema)

Now set up the database schema. You can use the "User Management Starter" quickstart in the SQL Editor, or you can copy/paste the SQL from below and run it.

DashboardSQL

1. Go to the [SQL Editor](https://supabase.com/dashboard/project/_/sql) page in the Dashboard.
2. Click **User Management Starter** under the **Community > Quickstarts** tab.
3. Click **Run**.

You can pull the database schema down to your local project by running the `db pull` command. Read the [local development docs](https://supabase.com/docs/guides/cli/local-development#link-your-project) for detailed instructions.

```
1
supabase link --project-ref <project-id>
2
# You can get <project-id> from your project's dashboard URL: https://supabase.com/dashboard/project/<project-id>
3
supabase db pull
```

### Get API details [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#get-api-details)

Now that you've created some database tables, you are ready to insert data using the auto-generated API.

To do this, you need to get the Project URL and key from [the project **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=mobiles&framework=exporeactnative).

##### Changes to API keys

Supabase is changing the way keys work to improve project security and developer experience. You can [read the full announcement](https://github.com/orgs/supabase/discussions/29260), but in the transition period, you can use both the current `anon` and `service_role` keys and the new publishable key with the form `sb_publishable_xxx` which will replace the older keys.

In most cases, you can get the correct key from [the Project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=mobiles&framework=exporeactnative), but if you want a specific key, you can find all keys in [the API Keys section of a Project's Settings page](https://supabase.com/dashboard/project/_/settings/api-keys/):

- **For legacy keys**, copy the `anon` key for client-side operations and the `service_role` key for server-side operations from the **Legacy API Keys** tab.
- **For new keys**, open the **API Keys** tab, if you don't have a publishable key already, click **Create new API Keys**, and copy the value from the **Publishable key** section.

[Read the API keys docs](https://supabase.com/docs/guides/api/api-keys) for a full explanation of all key types and their uses.

## Building the app [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#building-the-app)

Start by building the React Native app from scratch.

### Initialize a React Native app [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#initialize-a-react-native-app)

Use [Expo](https://docs.expo.dev/get-started/create-a-project/) to initialize an app called `expo-social-auth` with the [standard template](https://docs.expo.dev/more/create-expo/#--template):

```
1
npx create-expo-app@latest
2

3
cd expo-social-auth
```

Install the additional dependencies:

- [supabase-js](https://github.com/supabase/supabase-js)
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) \- A key-value store for React Native.
- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) \- Provides a way to securely store key-value pairs locally on the device.
- [expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/) \- Provides a way to programmatically manage the splash screen.

```
1
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage expo-secure-store expo-splash-screen
```

Now, create a helper file to initialize the Supabase client for both web and React Native platforms using platform-specific [storage adapters](https://docs.expo.dev/develop/user-interface/store-data/): [Expo SecureStore](https://docs.expo.dev/develop/user-interface/store-data/#secure-storage) for mobile and [AsyncStorage](https://docs.expo.dev/develop/user-interface/store-data/#async-storage) for web.

AsyncStorageSecureStore

lib/supabase.web.ts

```
1
import AsyncStorage from '@react-native-async-storage/async-storage';
2
import { createClient } from '@supabase/supabase-js';
3
import 'react-native-url-polyfill/auto';
4

5
const ExpoWebSecureStoreAdapter = {
6
  getItem: (key: string) => {
7
    console.debug("getItem", { key })
8
    return AsyncStorage.getItem(key)
9
  },
10
  setItem: (key: string, value: string) => {
11
    return AsyncStorage.setItem(key, value)
12
  },
13
  removeItem: (key: string) => {
14
    return AsyncStorage.removeItem(key)
15
  },
16
};
17

18
export const supabase = createClient(
19
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
20
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
21
  {
22
    auth: {
23
      storage: ExpoWebSecureStoreAdapter,
24
      autoRefreshToken: true,
25
      persistSession: true,
26
      detectSessionInUrl: false,
27
    },
28
  },
29
);
```

### Set up environment variables [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#set-up-environment-variables)

You need the API URL and the `anon` key copied [earlier](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#get-the-api-keys).
These variables are safe to expose in your Expo app since Supabase has [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) enabled on your database.

Create a `.env` file containing these variables:

.env

```
1
EXPO_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
2
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Set up protected navigation [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#set-up-protected-navigation)

Next, you need to protect app navigation to prevent unauthenticated users from accessing protected routes. Use the [Expo `SplashScreen`](https://docs.expo.dev/versions/latest/sdk/splash-screen/) to display a loading screen while fetching the user profile and verifying authentication status.

#### Create the `AuthContext` [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#create-the-authcontext)

Create [a React context](https://react.dev/learn/passing-data-deeply-with-context) to manage the authentication session, making it accessible from any component:

hooks/use-auth-context.tsx

```
1
import { Session } from '@supabase/supabase-js'
2
import { createContext, useContext } from 'react'
3

4
export type AuthData = {
5
  session?: Session | null
6
  profile?: any | null
7
  isLoading: boolean
8
  isLoggedIn: boolean
9
}
10

11
export const AuthContext = createContext<AuthData>({
12
  session: undefined,
13
  profile: undefined,
14
  isLoading: true,
15
  isLoggedIn: false,
16
})
17

18
export const useAuthContext = () => useContext(AuthContext)
```

#### Create the `AuthProvider` [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#create-the-authprovider)

Next, create a provider component to manage the authentication session throughout the app:

providers/auth-provider.tsx

```
1
import { AuthContext } from '@/hooks/use-auth-context'
2
import { supabase } from '@/lib/supabase'
3
import type { Session } from '@supabase/supabase-js'
4
import { PropsWithChildren, useEffect, useState } from 'react'
5

6
export default function AuthProvider({ children }: PropsWithChildren) {
7
  const [session, setSession] = useState<Session | undefined | null>()
8
  const [profile, setProfile] = useState<any>()
9
  const [isLoading, setIsLoading] = useState<boolean>(true)
10

11
  // Fetch the session once, and subscribe to auth state changes
12
  useEffect(() => {
13
    const fetchSession = async () => {
14
      setIsLoading(true)
15

16
      const {
17
        data: { session },
18
        error,
19
      } = await supabase.auth.getSession()
20

21
      if (error) {
22
        console.error('Error fetching session:', error)
23
      }
24

25
      setSession(session)
26
      setIsLoading(false)
27
    }
28

29
    fetchSession()
30

31
    const {
32
      data: { subscription },
33
    } = supabase.auth.onAuthStateChange((_event, session) => {
34
      console.log('Auth state changed:', { event: _event, session })
35
      setSession(session)
36
    })
37

38
    // Cleanup subscription on unmount
39
    return () => {
40
      subscription.unsubscribe()
41
    }
42
  }, [])
43

44
  // Fetch the profile when the session changes
45
  useEffect(() => {
46
    const fetchProfile = async () => {
47
      setIsLoading(true)
48

49
      if (session) {
50
        const { data } = await supabase
51
          .from('profiles')
52
          .select('*')
53
          .eq('id', session.user.id)
54
          .single()
55

56
        setProfile(data)
57
      } else {
58
        setProfile(null)
59
      }
60

61
      setIsLoading(false)
62
    }
63

64
    fetchProfile()
65
  }, [session])
66

67
  return (
68
    <AuthContext.Provider
69
      value={{
70
        session,
71
        isLoading,
72
        profile,
73
        isLoggedIn: session != undefined,
74
      }}
75
    >
76
      {children}
77
    </AuthContext.Provider>
78
  )
79
}
```

#### Create the `SplashScreenController` [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#create-the-splashscreencontroller)

Create a `SplashScreenController` component to display the [Expo `SplashScreen`](https://docs.expo.dev/versions/latest/sdk/splash-screen/) while the authentication session is loading:

components/splash-screen-controller.tsx

```
1
import { useAuthContext } from '@/hooks/use-auth-context'
2
import { SplashScreen } from 'expo-router'
3

4
SplashScreen.preventAutoHideAsync()
5

6
export function SplashScreenController() {
7
  const { isLoading } = useAuthContext()
8

9
  if (!isLoading) {
10
    SplashScreen.hideAsync()
11
  }
12

13
  return null
14
}
```

### Create a logout component [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#create-a-logout-component)

Create a logout button component to handle user sign-out:

components/social-auth-buttons/sign-out-button.tsx

```
1
import { supabase } from '@/lib/supabase'
2
import React from 'react'
3
import { Button } from 'react-native'
4

5
async function onSignOutButtonPress() {
6
  const { error } = await supabase.auth.signOut()
7

8
  if (error) {
9
    console.error('Error signing out:', error)
10
  }
11
}
12

13
export default function SignOutButton() {
14
  return <Button title="Sign out" onPress={onSignOutButtonPress} />
15
}
```

And add it to the `app/(tabs)/index.tsx` file used to display the user profile data and the logout button:

app/(tabs)/index.tsx

```
1
import { Image } from 'expo-image'
2
import { StyleSheet } from 'react-native'
3

4
import { HelloWave } from '@/components/hello-wave'
5
import ParallaxScrollView from '@/components/parallax-scroll-view'
6
import { ThemedText } from '@/components/themed-text'
7
import { ThemedView } from '@/components/themed-view'
8
import SignOutButton from '@/components/social-auth-buttons/sign-out-button'
9
import { useAuthContext } from '@/hooks/use-auth-context'
10

11
export default function HomeScreen() {
12
  const { profile } = useAuthContext()
13

14
  return (
15
    <ParallaxScrollView
16
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
17
      headerImage={
18
        <Image
19
          source={require('@/assets/images/partial-react-logo.png')}
20
          style={styles.reactLogo}
21
        />
22
      }
23
    >
24
      <ThemedView style={styles.titleContainer}>
25
        <ThemedText type="title">Welcome!</ThemedText>
26
        <HelloWave />
27
      </ThemedView>
28
      <ThemedView style={styles.stepContainer}>
29
        <ThemedText type="subtitle">Username</ThemedText>
30
        <ThemedText>{profile?.username}</ThemedText>
31
        <ThemedText type="subtitle">Full name</ThemedText>
32
        <ThemedText>{profile?.full_name}</ThemedText>
33
      </ThemedView>
34
      <SignOutButton />
35
    </ParallaxScrollView>
36
  )
37
}
38

39
const styles = StyleSheet.create({
40
  titleContainer: {
41
    flexDirection: 'row',
42
    alignItems: 'center',
43
    gap: 8,
44
  },
45
  stepContainer: {
46
    gap: 8,
47
    marginBottom: 8,
48
  },
49
  reactLogo: {
50
    height: 178,
51
    width: 290,
52
    bottom: 0,
53
    left: 0,
54
    position: 'absolute',
55
  },
56
})
```

### Create a login screen [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#create-a-login-screen)

Next, create a basic login screen component:

app/login.tsx

```
1
import { Link, Stack } from 'expo-router'
2
import { StyleSheet } from 'react-native'
3

4
import { ThemedText } from '@/components/themed-text'
5
import { ThemedView } from '@/components/themed-view'
6

7
export default function LoginScreen() {
8
  return (
9
    <>
10
      <Stack.Screen options={{ title: 'Login' }} />
11
      <ThemedView style={styles.container}>
12
        <ThemedText type="title">Login</ThemedText>
13
        <Link href="/" style={styles.link}>
14
          <ThemedText type="link">Try to navigate to home screen!</ThemedText>
15
        </Link>
16
      </ThemedView>
17
    </>
18
  )
19
}
20

21
const styles = StyleSheet.create({
22
  container: {
23
    flex: 1,
24
    alignItems: 'center',
25
    justifyContent: 'center',
26
    padding: 20,
27
  },
28
  link: {
29
    marginTop: 15,
30
    paddingVertical: 15,
31
  },
32
})
```

#### Implement protected routes [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#implement-protected-routes)

Wrap the navigation with the `AuthProvider` and `SplashScreenController`.

Using [Expo Router's protected routes](https://docs.expo.dev/router/advanced/authentication/#using-protected-routes), you can secure navigation:

app/\_layout.tsx

```
1
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
2
import { useFonts } from 'expo-font'
3
import { Stack } from 'expo-router'
4
import { StatusBar } from 'expo-status-bar'
5
import 'react-native-reanimated'
6

7
import { SplashScreenController } from '@/components/splash-screen-controller'
8

9
import { useAuthContext } from '@/hooks/use-auth-context'
10
import { useColorScheme } from '@/hooks/use-color-scheme'
11
import AuthProvider from '@/providers/auth-provider'
12

13
// Separate RootNavigator so we can access the AuthContext
14
function RootNavigator() {
15
  const { isLoggedIn } = useAuthContext()
16

17
  return (
18
    <Stack>
19
      <Stack.Protected guard={isLoggedIn}>
20
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
21
      </Stack.Protected>
22
      <Stack.Protected guard={!isLoggedIn}>
23
        <Stack.Screen name="login" options={{ headerShown: false }} />
24
      </Stack.Protected>
25
      <Stack.Screen name="+not-found" />
26
    </Stack>
27
  )
28
}
29

30
export default function RootLayout() {
31
  const colorScheme = useColorScheme()
32

33
  const [loaded] = useFonts({
34
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
35
  })
36

37
  if (!loaded) {
38
    // Async font loading only occurs in development.
39
    return null
40
  }
41

42
  return (
43
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
44
      <AuthProvider>
45
        <SplashScreenController />
46
        <RootNavigator />
47
        <StatusBar style="auto" />
48
      </AuthProvider>
49
    </ThemeProvider>
50
  )
51
}
```

You can now test the app by running:

```
1
npx expo prebuild
2
npx expo start --clear
```

Verify that the app works as expected. The splash screen displays while fetching the user profile, and the login page appears even when attempting to navigate to the home screen using the `Link` button.

By default Supabase Auth requires email verification before a session is created for the user. To support email verification you need to [implement deep link handling](https://supabase.com/docs/guides/auth/native-mobile-deep-linking?platform=react-native)!

While testing, you can disable email confirmation in your [project's email auth provider settings](https://supabase.com/dashboard/project/_/auth/providers).

## Integrate social authentication [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#integrate-social-authentication)

Now integrate social authentication with Supabase Auth, starting with Apple authentication.
If you only need to implement Google authentication, you can skip to the [Google authentication](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#google-authentication) section.

### Apple authentication [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#apple-authentication)

Start by adding the button inside the login screen:

app/login.tsx

```
1
...
2
import AppleSignInButton from '@/components/social-auth-buttons/apple/apple-sign-in-button';
3
...
4
export default function LoginScreen() {
5
  return (
6
    <>
7
      <Stack.Screen options={{ title: 'Login' }} />
8
      <ThemedView style={styles.container}>
9
        ...
10
        <AppleSignInButton />
11
        ...
12
      </ThemedView>
13
    </>
14
  );
15
}
16
...
```

For Apple authentication, you can choose between:

- [Invertase's React Native Apple Authentication library](https://github.com/invertase/react-native-apple-authentication) \- that supports iOS, Android
- [react-apple-signin-auth](https://react-apple-signin-auth.ahmedtokyo.com/) \- that supports Web, also suggested by Invertase
- [Expo's AppleAuthentication library](https://docs.expo.dev/versions/latest/sdk/apple-authentication/) \- that supports iOS only

For either option, you need to obtain a Service ID from the [Apple Developer Console](https://supabase.com/docs/guides/auth/social-login/auth-apple?queryGroups=framework&framework=nextjs&queryGroups=platform&platform=web#configuration-web).

To enable Apple sign-up on Android and Web, you also need to register the tunnelled URL (e.g., `https://arnrer1-anonymous-8081.exp.direct`) obtained by running:

```
1
npx expo start --tunnel
```

And add it to the **Redirect URLs** field in [your Supabase dashboard Authentication configuration](https://supabase.com/dashboard/project/_/auth/url-configuration).

For more information, follow the [Supabase Login with Apple](https://supabase.com/docs/guides/auth/social-login/auth-apple) guide.

InvertaseWebExpo

#### Prerequisites [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#prerequisites)

Before proceeding, ensure you have followed the Invertase prerequisites documented in the [Invertase Initial Setup Guide](https://github.com/invertase/react-native-apple-authentication/blob/main/docs/INITIAL_SETUP.md) and the [Invertase Android Setup Guide](https://github.com/invertase/react-native-apple-authentication/blob/main/docs/ANDROID_EXTRA.md).

You need to add two new environment variables to the `.env` file:

```
1
EXPO_PUBLIC_APPLE_AUTH_SERVICE_ID="YOUR_APPLE_AUTH_SERVICE_ID"
2
EXPO_PUBLIC_APPLE_AUTH_REDIRECT_URI="YOUR_APPLE_AUTH_REDIRECT_URI"
```

#### iOS [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#ios)

Install the `@invertase/react-native-apple-authentication` library:

```
1
npx expo install @invertase/react-native-apple-authentication
```

Then create the iOS specific button component `AppleSignInButton`:

components/social-auth-buttons/apple/apple-sign-in-button.ios.tsx

```
1
import { supabase } from '@/lib/supabase';
2
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
3
import type { SignInWithIdTokenCredentials } from '@supabase/supabase-js';
4
import { router } from 'expo-router';
5
import { Platform } from 'react-native';
6

7
async function onAppleButtonPress() {
8
  // Performs login request
9
  const appleAuthRequestResponse = await appleAuth.performRequest({
10
    requestedOperation: appleAuth.Operation.LOGIN,
11
    // Note: it appears putting FULL_NAME first is important, see issue #293
12
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
13
  });
14

15
  // Get the current authentication state for user
16
  // Note: This method must be tested on a real device. On the iOS simulator it always throws an error.
17
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
18

19
  console.log('Apple sign in successful:', { credentialState, appleAuthRequestResponse });
20

21
  if (credentialState === appleAuth.State.AUTHORIZED && appleAuthRequestResponse.identityToken && appleAuthRequestResponse.authorizationCode) {
22
    const signInWithIdTokenCredentials: SignInWithIdTokenCredentials = {
23
      provider: 'apple',
24
      token: appleAuthRequestResponse.identityToken,
25
      nonce: appleAuthRequestResponse.nonce,
26
      access_token: appleAuthRequestResponse.authorizationCode,
27
    };
28

29
    const { data, error } = await supabase.auth.signInWithIdToken(signInWithIdTokenCredentials);
30

31
    if (error) {
32
      console.error('Error signing in with Apple:', error);
33
    }
34

35
    if (data) {
36
      console.log('Apple sign in successful:', data);
37
      router.navigate('/(tabs)/explore');
38
    }
39
  }
40
}
41

42
export default function AppleSignInButton() {
43
  if (Platform.OS !== 'ios') { return <></>; }
44

45
  return <AppleButton
46
    buttonStyle={AppleButton.Style.BLACK}
47
    buttonType={AppleButton.Type.SIGN_IN}
48
    style={{ width: 160, height: 45 }}
49
    onPress={() => onAppleButtonPress()}
50
  />;
51
}
```

To test functionality on the simulator, remove the `getCredentialStateForUser` check:

components/social-auth-buttons/apple/apple-sign-in-button.ios.tsx

```
1
...
2
const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
3
...
```

Enable the Apple authentication capability in iOS:

app.json

```
1
{
2
  "expo": {
3
    ...
4
    "ios": {
5
      ...
6
      "usesAppleSignIn": true
7
      ...
8
    },
9
    ...
10
  }
11
}
```

Add the capabilities to the `Info.plist` file by following the [Expo documentation](https://docs.expo.dev/build-reference/ios-capabilities/#xcode).

Before testing the app, if you've already built the iOS app, clean the project artifacts:

```
1
npx react-native-clean-project clean-project-auto
```

If issues persist, try completely cleaning the cache, as reported by many users in this [closed issue](https://github.com/invertase/react-native-apple-authentication/issues/23).

Finally, update the iOS project by installing the Pod library and running the Expo prebuild command:

```
1
cd ios
2
pod install
3
cd ..
4
npx expo prebuild
```

Now test the application on a physical device:

```
1
npx expo run:ios --no-build-cache --device
```

You should see the login screen with the Apple authentication button.

If you get stuck while working through this guide, refer to the [full Invertase example on GitHub](https://github.com/invertase/react-native-apple-authentication?tab=readme-ov-file#react-native-apple-authentication).

#### Android [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#android)

Install the required libraries:

```
1
npx expo install @invertase/react-native-apple-authentication react-native-get-random-values uuid
```

Next, create the Android-specific `AppleSignInButton` component:

components/social-auth-buttons/apple/apple-sign-in-button.android.tsx

```
1
import { supabase } from '@/lib/supabase';
2
import { appleAuthAndroid, AppleButton } from '@invertase/react-native-apple-authentication';
3
import { SignInWithIdTokenCredentials } from '@supabase/supabase-js';
4
import { Platform } from 'react-native';
5
import 'react-native-get-random-values';
6
import { v4 as uuid } from 'uuid';
7

8
async function onAppleButtonPress() {
9
  // Generate secure, random values for state and nonce
10
  const rawNonce = uuid();
11
  const state = uuid();
12

13
  // Configure the request
14
  appleAuthAndroid.configure({
15
    // The Service ID you registered with Apple
16
    clientId: process.env.EXPO_PUBLIC_APPLE_AUTH_SERVICE_ID ?? '',
17

18
    // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
19
    // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
20
    redirectUri: process.env.EXPO_PUBLIC_APPLE_AUTH_REDIRECT_URI ?? '',
21

22
    // The type of response requested - code, id_token, or both.
23
    responseType: appleAuthAndroid.ResponseType.ALL,
24

25
    // The amount of user information requested from Apple.
26
    scope: appleAuthAndroid.Scope.ALL,
27

28
    // Random nonce value that will be SHA256 hashed before sending to Apple.
29
    nonce: rawNonce,
30

31
    // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
32
    state,
33
  });
34

35
  // Open the browser window for user sign in
36
  const credentialState = await appleAuthAndroid.signIn();
37
  console.log('Apple sign in successful:', credentialState);
38

39
  if (credentialState.id_token && credentialState.code && credentialState.nonce) {
40
    const signInWithIdTokenCredentials: SignInWithIdTokenCredentials = {
41
      provider: 'apple',
42
      token: credentialState.id_token,
43
      nonce: credentialState.nonce,
44
      access_token: credentialState.code,
45
    };
46

47
    const { data, error } = await supabase.auth.signInWithIdToken(signInWithIdTokenCredentials);
48

49
    if (error) {
50
      console.error('Error signing in with Apple:', error);
51
    }
52

53
    if (data) {
54
      console.log('Apple sign in successful:', data);
55
    }
56
  }
57
}
58

59
export default function AppleSignInButton() {
60
  if (Platform.OS !== 'android' || appleAuthAndroid.isSupported !== true) { return <></> }
61

62
  return <AppleButton
63
    buttonStyle={AppleButton.Style.BLACK}
64
    buttonType={AppleButton.Type.SIGN_IN}
65
    onPress={() => onAppleButtonPress()}
66
  />;
67
}
```

You should now be able to test the authentication by running it on a physical device or simulator:

```
1
npx expo run:android --no-build-cache
```

### Google authentication [\#](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth\#google-authentication)

Start by adding the button to the login screen:

app/login.tsx

```
1
...
2
import GoogleSignInButton from '@/components/social-auth-buttons/google/google-sign-in-button';
3
...
4
export default function LoginScreen() {
5
  return (
6
    <>
7
      <Stack.Screen options={{ title: 'Login' }} />
8
      <ThemedView style={styles.container}>
9
        ...
10
        <GoogleSignInButton />
11
        ...
12
      </ThemedView>
13
    </>
14
  );
15
}
16
...
```

For Google authentication, you can choose between the following options:

- [GN Google Sign In Premium](https://react-native-google-signin.github.io/docs/install#sponsor-only-version) \- that supports iOS, Android, and Web by using the latest Google's One Tap sign-in (but [it requires a subscription](https://universal-sign-in.com/))
- [@react-oauth/google](https://github.com/MomenSherif/react-oauth#googlelogin) \- that supports Web (so it's not a good option for mobile, but it works)
- Relying on the [\`\`signInWithOAuth](https://supabase.com/docs/reference/javascript/auth-signinwithoauth) function of the Supabase Auth - that also supports iOS, Android and Web (useful also to manage any other OAuth provider)

The [GN Google Sign In Free](https://react-native-google-signin.github.io/docs/install#public-version-free) doesn't support iOS or Android, as [it doesn't allow to pass a custom nonce](https://github.com/react-native-google-signin/google-signin/issues/1176) to the sign-in request.

For either option, you need to obtain a Web Client ID from the Google Cloud Engine, as explained in the [Google Sign In](https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=react-native#react-native) guide.

This guide only uses the [@react-oauth/google@latest](https://github.com/MomenSherif/react-oauth#googlelogin) option for the Web, and the [`signInWithOAuth`](https://supabase.com/docs/reference/javascript/auth-signinwithoauth) for the mobile platforms.

Before proceeding, add a new environment variable to the `.env` file:

```
1
EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID="YOUR_GOOGLE_AUTH_WEB_CLIENT_ID"
```

MobileWeb

Install the `@react-oauth/google` library:

```
1
npx expo install @react-oauth/google
```

Enable the `expo-web-browser` plugin in `app.json`:

app.json

```
1
{
2
  "expo": {
3
    ...
4
    "plugins": {
5
      ...
6
      [\
7\
        "expo-web-browser",\
8\
        {\
9\
          "experimentalLauncherActivity": false\
10\
        }\
11\
      ]
12
      ...
13
    },
14
    ...
15
  }
16
}
```

Then create the iOS specific button component `GoogleSignInButton`:

components/social-auth-buttons/google/google-sign-in-button.web.tsx

```
1
import { supabase } from '@/lib/supabase';
2
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
3
import { SignInWithIdTokenCredentials } from '@supabase/supabase-js';
4
import { useEffect, useState } from 'react';
5

6
import 'react-native-get-random-values';
7

8
export default function GoogleSignInButton() {
9

10
  // Generate secure, random values for state and nonce
11
  const [nonce, setNonce] = useState('');
12
  const [sha256Nonce, setSha256Nonce] = useState('');
13

14
  async function onGoogleButtonSuccess(authRequestResponse: CredentialResponse) {
15
    console.debug('Google sign in successful:', { authRequestResponse });
16
    if (authRequestResponse.clientId && authRequestResponse.credential) {
17
      const signInWithIdTokenCredentials: SignInWithIdTokenCredentials = {
18
        provider: 'google',
19
        token: authRequestResponse.credential,
20
        nonce: nonce,
21
      };
22

23
      const { data, error } = await supabase.auth.signInWithIdToken(signInWithIdTokenCredentials);
24

25
      if (error) {
26
        console.error('Error signing in with Google:', error);
27
      }
28

29
      if (data) {
30
        console.log('Google sign in successful:', data);
31
      }
32
    }
33
  }
34

35
  function onGoogleButtonFailure() {
36
    console.error('Error signing in with Google');
37
  }
38

39
  useEffect(() => {
40
    function generateNonce(): string {
41
      const array = new Uint32Array(1);
42
      window.crypto.getRandomValues(array);
43
      return array[0].toString();
44
    }
45

46
    async function generateSha256Nonce(nonce: string): Promise<string> {
47
      const buffer = await window.crypto.subtle.digest('sha-256', new TextEncoder().encode(nonce));
48
      const array = Array.from(new Uint8Array(buffer));
49
      return array.map(b => b.toString(16).padStart(2, '0')).join('');
50
    }
51

52
    let nonce = generateNonce();
53
    setNonce(nonce);
54

55
    generateSha256Nonce(nonce)
56
      .then((sha256Nonce) => { setSha256Nonce(sha256Nonce) });
57
  }, []);
58

59
  return (
60
    <GoogleOAuthProvider
61
      clientId={process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID ?? ''}
62
      nonce={sha256Nonce}
63
    >
64
      <GoogleLogin
65
        nonce={sha256Nonce}
66
        onSuccess={onGoogleButtonSuccess}
67
        onError={onGoogleButtonFailure}
68
        useOneTap={true}
69
        auto_select={true}
70
      />
71
    </GoogleOAuthProvider>
72
  );
73
}
```

Test the authentication in your browser using the tunnelled HTTPS URL:

```
1
npx expo start --tunnel
```

To allow the Google Sign In to work, as you did before for Apple, you need to register the tunnelled URL (e.g., `https://arnrer1-anonymous-8081.exp.direct`) obtained to the Authorized JavaScript origins list of your [Google Cloud Console's OAuth 2.0 Client IDs](https://console.cloud.google.com/auth/clients/) configuration.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/quickstarts/with-expo-react-native-social-auth.mdx)

### Is this helpful?

NoYes

### On this page

[Project setup](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#project-setup) [Create a project](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#create-a-project) [Set up the database schema](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#set-up-the-database-schema) [Get API details](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#get-api-details) [Building the app](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#building-the-app) [Initialize a React Native app](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#initialize-a-react-native-app) [Set up environment variables](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#set-up-environment-variables) [Set up protected navigation](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#set-up-protected-navigation) [Create a logout component](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#create-a-logout-component) [Create a login screen](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#create-a-login-screen) [Integrate social authentication](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#integrate-social-authentication) [Apple authentication](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#apple-authentication) [Google authentication](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth#google-authentication)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)