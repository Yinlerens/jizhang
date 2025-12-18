---
url: "https://supabase.com/docs/guides/auth/quickstarts/react"
title: "Use Supabase Auth with React | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/quickstarts/react)

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
5. [React](https://supabase.com/docs/guides/auth/quickstarts/react)

# Use Supabase Auth with React

## Learn how to use Supabase Auth with React.js.

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

Create a React app using a [Vite](https://vitejs.dev/guide/) template.

###### Terminal

```
1
npm create vite@latest my-app -- --template react
```

3

### Install the Supabase client library

Navigate to the React app and install the Supabase libraries.

###### Terminal

```
1
cd my-app && npm install @supabase/supabase-js
```

4

### Declare Supabase Environment Variables

Rename `.env.example` to `.env.local` and populate with your Supabase connection variables:

###### Project URL

No project found

To get your Project URL, [log in](https://supabase.com/dashboard).

###### Publishable key

No project found

To get your Publishable key, [log in](https://supabase.com/dashboard).

###### Anon key

No project found

To get your Anon key, [log in](https://supabase.com/dashboard).

###### .env.local

```
1
VITE_SUPABASE_URL=your-project-url
2
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_... or anon key
```

You can also get the Project URL and key from [the project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=react).

##### Changes to API keys

Supabase is changing the way keys work to improve project security and developer experience. You can [read the full announcement](https://github.com/orgs/supabase/discussions/29260), but in the transition period, you can use both the current `anon` and `service_role` keys and the new publishable key with the form `sb_publishable_xxx` which will replace the older keys.

In most cases, you can get the correct key from [the Project's **Connect** dialog](https://supabase.com/dashboard/project/_?showConnect=true&connectTab=frameworks&framework=react), but if you want a specific key, you can find all keys in [the API Keys section of a Project's Settings page](https://supabase.com/dashboard/project/_/settings/api-keys/):

- **For legacy keys**, copy the `anon` key for client-side operations and the `service_role` key for server-side operations from the **Legacy API Keys** tab.
- **For new keys**, open the **API Keys** tab, if you don't have a publishable key already, click **Create new API Keys**, and copy the value from the **Publishable key** section.

[Read the API keys docs](https://supabase.com/docs/guides/api/api-keys) for a full explanation of all key types and their uses.

5

### Set up your login component

##### Explore drop-in UI components for your Supabase app.

UI components built on shadcn/ui that connect to Supabase via a single command.

[Explore Components](https://supabase.com/ui)

In `App.jsx`, create a Supabase client using your Project URL and key.

You can configure the Auth component to display whenever there is no session inside `supabase.auth.getSession()`

###### src/App.jsx

```
1
import "./index.css";
2
import { useState, useEffect } from "react";
3
import { createClient } from "@supabase/supabase-js";
4

5
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);
6

7
export default function App() {
8
    const [loading, setLoading] = useState(false);
9
    const [email, setEmail] = useState("");
10
    const [session, setSession] = useState(null);
11

12
    // Check URL params on initial render
13
    const params = new URLSearchParams(window.location.search);
14
    const hasTokenHash = params.get("token_hash");
15

16
    const [verifying, setVerifying] = useState(!!hasTokenHash);
17
    const [authError, setAuthError] = useState(null);
18
    const [authSuccess, setAuthSuccess] = useState(false);
19

20
    useEffect(() => {
21
        // Check if we have token_hash in URL (magic link callback)
22
        const params = new URLSearchParams(window.location.search);
23
        const token_hash = params.get("token_hash");
24
        const type = params.get("type");
25

26
        if (token_hash) {
27
            // Verify the OTP token
28
            supabase.auth.verifyOtp({
29
                token_hash,
30
                type: type || "email",
31
            }).then(({ error }) => {
32
                if (error) {
33
                    setAuthError(error.message);
34
                } else {
35
                    setAuthSuccess(true);
36
                    // Clear URL params
37
                    window.history.replaceState({}, document.title, "/");
38
                }
39
                setVerifying(false);
40
            });
41
        }
42

43
        // Check for existing session
44
        supabase.auth.getSession().then(({ data: { session } }) => {
45
            setSession(session);
46
        });
47

48
        // Listen for auth changes
49
        const {
50
            data: { subscription },
51
        } = supabase.auth.onAuthStateChange((_event, session) => {
52
            setSession(session);
53
        });
54

55
        return () => subscription.unsubscribe();
56
    }, []);
57

58
    const handleLogin = async (event) => {
59
        event.preventDefault();
60
        setLoading(true);
61
        const { error } = await supabase.auth.signInWithOtp({
62
            email,
63
            options: {
64
                emailRedirectTo: window.location.origin,
65
            }
66
        });
67
        if (error) {
68
            alert(error.error_description || error.message);
69
        } else {
70
            alert("Check your email for the login link!");
71
        }
72
        setLoading(false);
73
    };
74

75
    const handleLogout = async () => {
76
        await supabase.auth.signOut();
77
        setSession(null);
78
    };
79

80
    // Show verification state
81
    if (verifying) {
82
        return (
83
            <div>
84
                <h1>Authentication</h1>
85
                <p>Confirming your magic link...</p>
86
                <p>Loading...</p>
87
            </div>
88
        );
89
    }
90

91
    // Show auth error
92
    if (authError) {
93
        return (
94
            <div>
95
                <h1>Authentication</h1>
96
                <p>✗ Authentication failed</p>
97
                <p>{authError}</p>
98
                <button
99
                    onClick={() => {
100
                        setAuthError(null);
101
                        window.history.replaceState({}, document.title, "/");
102
                    }}
103
                >
104
                    Return to login
105
                </button>
106
            </div>
107
        );
108
    }
109

110
    // Show auth success (briefly before session loads)
111
    if (authSuccess && !session) {
112
        return (
113
            <div>
114
                <h1>Authentication</h1>
115
                <p>✓ Authentication successful!</p>
116
                <p>Loading your account...</p>
117
            </div>
118
        );
119
    }
120

121
    // If user is logged in, show welcome screen
122
    if (session) {
123
        return (
124
            <div>
125
                <h1>Welcome!</h1>
126
                <p>You are logged in as: {session.user.email}</p>
127
                <button onClick={handleLogout}>
128
                    Sign Out
129
                </button>
130
            </div>
131
        );
132
    }
133

134
    // Show login form
135
    return (
136
        <div>
137
            <h1>Supabase + React</h1>
138
            <p>Sign in via magic link with your email below</p>
139
            <form onSubmit={handleLogin}>
140
                <input
141
                    type="email"
142
                    placeholder="Your email"
143
                    value={email}
144
                    required={true}
145
                    onChange={(e) => setEmail(e.target.value)}
146
                />
147
                <button disabled={loading}>
148
                    {loading ? <span>Loading</span> : <span>Send magic link</span>}
149
                </button>
150
            </form>
151
        </div>
152
    );
153
}
```

6

### Customize email template

Before proceeding, change the email template to support support a server-side authentication flow that sends a token hash:

- Go to the [Auth templates](https://supabase.com/dashboard/project/_/auth/templates) page in your dashboard.
- Select the Confirm sign up template.
- Change `{{ .ConfirmationURL }}` to `{{ .SiteURL }}?token_hash={{ .TokenHash }}&type=email`.
- Change your [Site URL](https://supabase.com/dashboard/project/_/auth/url-configuration) to `https://localhost:5173`

7

### Start the app

Start the app, go to [http://localhost:5173](http://localhost:5173/) in a browser, and open the browser console and you should be able to register and log in.

###### Terminal

```
1
npm run dev
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/quickstarts/react.mdx)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)