---
url: "https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend"
title: "Custom Auth Emails with React Email and Resend | Supabase Docs"
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

[Edge Functions](https://supabase.com/docs/guides/functions)

[Overview](https://supabase.com/docs/guides/functions)

Getting started[Quickstart (Dashboard)](https://supabase.com/docs/guides/functions/quickstart-dashboard)
[Quickstart (CLI)](https://supabase.com/docs/guides/functions/quickstart)
[Development Environment](https://supabase.com/docs/guides/functions/development-environment)
[Architecture](https://supabase.com/docs/guides/functions/architecture)

Configuration[Environment Variables](https://supabase.com/docs/guides/functions/secrets)
[Managing Dependencies](https://supabase.com/docs/guides/functions/dependencies)
[Function Configuration](https://supabase.com/docs/guides/functions/function-configuration)

Development[Error Handling](https://supabase.com/docs/guides/functions/error-handling)
[Routing](https://supabase.com/docs/guides/functions/routing)
[Deploy to Production](https://supabase.com/docs/guides/functions/deploy)

Debugging[Local Debugging with DevTools](https://supabase.com/docs/guides/functions/debugging-tools)
[Testing your Functions](https://supabase.com/docs/guides/functions/unit-test)
[Logging](https://supabase.com/docs/guides/functions/logging)
[Troubleshooting](https://supabase.com/docs/guides/functions/troubleshooting)

Platform[Regional invocations](https://supabase.com/docs/guides/functions/regional-invocation)
[Status codes](https://supabase.com/docs/guides/functions/status-codes)
[Limits](https://supabase.com/docs/guides/functions/limits)
[Pricing](https://supabase.com/docs/guides/functions/pricing)

Integrations[Supabase Auth](https://supabase.com/docs/guides/functions/auth)
[Supabase Database (Postgres)](https://supabase.com/docs/guides/functions/connect-to-postgres)
[Supabase Storage](https://supabase.com/docs/guides/functions/storage-caching)

Advanced Features[Background Tasks](https://supabase.com/docs/guides/functions/background-tasks)
[File Storage](https://supabase.com/docs/guides/functions/ephemeral-storage)
[WebSockets](https://supabase.com/docs/guides/functions/websockets)
[Custom Routing](https://supabase.com/docs/guides/functions/routing)
[Wasm Modules](https://supabase.com/docs/guides/functions/wasm)
[AI Models](https://supabase.com/docs/guides/functions/ai-models)

Examples[Auth Send Email Hook](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend)
[Building an MCP Server with mcp-lite](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite)
[CORS support for invoking from the browser](https://supabase.com/docs/guides/functions/cors)
[Scheduling Functions](https://supabase.com/docs/guides/functions/schedule-functions)
[Sending Push Notifications](https://supabase.com/docs/guides/functions/examples/push-notifications)
[Generating AI images](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator)
[Generating OG images](https://supabase.com/docs/guides/functions/examples/og-image)
[Semantic AI Search](https://supabase.com/docs/guides/functions/examples/semantic-search)
[CAPTCHA support with Cloudflare Turnstile](https://supabase.com/docs/guides/functions/examples/cloudflare-turnstile)
[Building a Discord Bot](https://supabase.com/docs/guides/functions/examples/discord-bot)
[Building a Telegram Bot](https://supabase.com/docs/guides/functions/examples/telegram-bot)
[Handling Stripe Webhooks](https://supabase.com/docs/guides/functions/examples/stripe-webhooks)
[Rate-limiting with Redis](https://supabase.com/docs/guides/functions/examples/rate-limiting)
[Taking Screenshots with Puppeteer](https://supabase.com/docs/guides/functions/examples/screenshots)
[Slack Bot responding to mentions](https://supabase.com/docs/guides/functions/examples/slack-bot-mention)
[Image Transformation & Optimization](https://supabase.com/docs/guides/functions/examples/image-manipulation)

Third-Party Tools[Dart Edge on Supabase](https://supabase.com/docs/guides/functions/dart-edge)
[mcp-lite (Model Context Protocol)](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite)
[Browserless.io](https://supabase.com/docs/guides/functions/examples/screenshots)
[Hugging Face](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning)
[Monitoring with Sentry](https://supabase.com/docs/guides/functions/examples/sentry-monitoring)
[OpenAI API](https://supabase.com/docs/guides/ai/examples/openai)
[React Email](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend)
[Sending Emails with Resend](https://supabase.com/docs/guides/functions/examples/send-emails)
[Upstash Redis](https://supabase.com/docs/guides/functions/examples/upstash-redis)
[Type-Safe SQL with Kysely](https://supabase.com/docs/guides/functions/kysely-postgres)
[Text To Speech with ElevenLabs](https://supabase.com/docs/guides/functions/examples/elevenlabs-generate-speech-stream)
[Speech Transcription with ElevenLabs](https://supabase.com/docs/guides/functions/examples/elevenlabs-transcribe-speech)

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

Edge Functions

1. [Edge Functions](https://supabase.com/docs/guides/functions)
3. Examples
5. [Auth Send Email Hook](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend)

# Custom Auth Emails with React Email and Resend

* * *

Use the [send email hook](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook?queryGroups=language&language=http) to send custom auth emails with [React Email](https://react.email/) and [Resend](https://resend.com/) in Supabase Edge Functions.

Prefer to jump straight to the code? [Check out the example on GitHub](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/auth-hook-react-email-resend).

### Prerequisites [\#](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend\#prerequisites)

To get the most out of this guide, you’ll need to:

- [Create a Resend API key](https://resend.com/api-keys)
- [Verify your domain](https://resend.com/domains)

Make sure you have the latest version of the [Supabase CLI](https://supabase.com/docs/guides/cli#installation) installed.

### 1\. Create Supabase function [\#](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend\#1-create-supabase-function)

Create a new function locally:

```
1
supabase functions new send-email
```

### 2\. Edit the handler function [\#](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend\#2-edit-the-handler-function)

Paste the following code into the `index.ts` file:

```
1
import React from 'npm:react@18.3.1'
2
import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
3
import { Resend } from 'npm:resend@4.0.0'
4
import { renderAsync } from 'npm:@react-email/components@0.0.22'
5
import { MagicLinkEmail } from './_templates/magic-link.tsx'
6

7
const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
8
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string
9

10
Deno.serve(async (req) => {
11
  if (req.method !== 'POST') {
12
    return new Response('not allowed', { status: 400 })
13
  }
14

15
  const payload = await req.text()
16
  const headers = Object.fromEntries(req.headers)
17
  const wh = new Webhook(hookSecret)
18
  try {
19
    const {
20
      user,
21
      email_data: { token, token_hash, redirect_to, email_action_type },
22
    } = wh.verify(payload, headers) as {
23
      user: {
24
        email: string
25
      }
26
      email_data: {
27
        token: string
28
        token_hash: string
29
        redirect_to: string
30
        email_action_type: string
31
        site_url: string
32
        token_new: string
33
        token_hash_new: string
34
      }
35
    }
36

37
    const html = await renderAsync(
38
      React.createElement(MagicLinkEmail, {
39
        supabase_url: Deno.env.get('SUPABASE_URL') ?? '',
40
        token,
41
        token_hash,
42
        redirect_to,
43
        email_action_type,
44
      })
45
    )
46

47
    const { error } = await resend.emails.send({
48
      from: 'welcome <onboarding@resend.dev>',
49
      to: [user.email],
50
      subject: 'Supa Custom MagicLink!',
51
      html,
52
    })
53
    if (error) {
54
      throw error
55
    }
56
  } catch (error) {
57
    console.log(error)
58
    return new Response(
59
      JSON.stringify({
60
        error: {
61
          http_code: error.code,
62
          message: error.message,
63
        },
64
      }),
65
      {
66
        status: 401,
67
        headers: { 'Content-Type': 'application/json' },
68
      }
69
    )
70
  }
71

72
  const responseHeaders = new Headers()
73
  responseHeaders.set('Content-Type', 'application/json')
74
  return new Response(JSON.stringify({}), {
75
    status: 200,
76
    headers: responseHeaders,
77
  })
78
})
```

### 3\. Create React Email templates [\#](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend\#3-create-react-email-templates)

Create a new folder `_templates` and create a new file `magic-link.tsx` with the following code:

```
1
import {
2
  Body,
3
  Container,
4
  Head,
5
  Heading,
6
  Html,
7
  Link,
8
  Preview,
9
  Text,
10
} from 'npm:@react-email/components@0.0.22'
11
import * as React from 'npm:react@18.3.1'
12

13
interface MagicLinkEmailProps {
14
  supabase_url: string
15
  email_action_type: string
16
  redirect_to: string
17
  token_hash: string
18
  token: string
19
}
20

21
export const MagicLinkEmail = ({
22
  token,
23
  supabase_url,
24
  email_action_type,
25
  redirect_to,
26
  token_hash,
27
}: MagicLinkEmailProps) => (
28
  <Html>
29
    <Head />
30
    <Preview>Log in with this magic link</Preview>
31
    <Body style={main}>
32
      <Container style={container}>
33
        <Heading style={h1}>Login</Heading>
34
        <Link
35
          href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
36
          target="_blank"
37
          style={{
38
            ...link,
39
            display: 'block',
40
            marginBottom: '16px',
41
          }}
42
        >
43
          Click here to log in with this magic link
44
        </Link>
45
        <Text style={{ ...text, marginBottom: '14px' }}>
46
          Or, copy and paste this temporary login code:
47
        </Text>
48
        <code style={code}>{token}</code>
49
        <Text
50
          style={{
51
            ...text,
52
            color: '#ababab',
53
            marginTop: '14px',
54
            marginBottom: '16px',
55
          }}
56
        >
57
          If you didn&apos;t try to login, you can safely ignore this email.
58
        </Text>
59
        <Text style={footer}>
60
          <Link
61
            href="https://demo.vercel.store/"
62
            target="_blank"
63
            style={{ ...link, color: '#898989' }}
64
          >
65
            ACME Corp
66
          </Link>
67
          , the famouse demo corp.
68
        </Text>
69
      </Container>
70
    </Body>
71
  </Html>
72
)
73

74
export default MagicLinkEmail
75

76
const main = {
77
  backgroundColor: '#ffffff',
78
}
79

80
const container = {
81
  paddingLeft: '12px',
82
  paddingRight: '12px',
83
  margin: '0 auto',
84
}
85

86
const h1 = {
87
  color: '#333',
88
  fontFamily:
89
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
90
  fontSize: '24px',
91
  fontWeight: 'bold',
92
  margin: '40px 0',
93
  padding: '0',
94
}
95

96
const link = {
97
  color: '#2754C5',
98
  fontFamily:
99
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
100
  fontSize: '14px',
101
  textDecoration: 'underline',
102
}
103

104
const text = {
105
  color: '#333',
106
  fontFamily:
107
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
108
  fontSize: '14px',
109
  margin: '24px 0',
110
}
111

112
const footer = {
113
  color: '#898989',
114
  fontFamily:
115
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
116
  fontSize: '12px',
117
  lineHeight: '22px',
118
  marginTop: '12px',
119
  marginBottom: '24px',
120
}
121

122
const code = {
123
  display: 'inline-block',
124
  padding: '16px 4.5%',
125
  width: '90.5%',
126
  backgroundColor: '#f4f4f4',
127
  borderRadius: '5px',
128
  border: '1px solid #eee',
129
  color: '#333',
130
}
```

You can find a selection of React Email templates in the [React Email Examples](https://react.email/examples).

### 4\. Deploy the Function [\#](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend\#4-deploy-the-function)

Deploy function to Supabase:

```
1
supabase functions deploy send-email --no-verify-jwt
```

Note down the function URL, you will need it in the next step!

### 5\. Configure the Send Email Hook [\#](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend\#5-configure-the-send-email-hook)

- Go to the [Auth Hooks](https://supabase.com/dashboard/project/_/auth/hooks) section of the Supabase dashboard and create a new "Send Email hook".
- Select HTTPS as the hook type.
- Paste the function URL in the "URL" field.
- Click "Generate Secret" to generate your webhook secret and note it down.
- Click "Create" to save the hook configuration.

Store these secrets in your `.env` file.

```
1
RESEND_API_KEY=your_resend_api_key
2
SEND_EMAIL_HOOK_SECRET=<base64_secret>
```

You can generate the secret in the [Auth Hooks](https://supabase.com/dashboard/project/_/auth/hooks) section of the Supabase dashboard. Make sure to remove the `v1,whsec_` prefix!

Set the secrets from the `.env` file:

```
1
supabase secrets set --env-file supabase/functions/.env
```

Now your Supabase Edge Function will be triggered anytime an Auth Email needs to be sent to the user!

## More resources [\#](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend\#more-resources)

- [Send Email Hooks](https://supabase.com/docs/guides/auth/auth-hooks/send-email-hook)
- [Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/examples/auth-send-email-hook-react-email-resend.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FtlA7BomSCgU%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Prerequisites](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend#prerequisites) [1\. Create Supabase function](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend#1-create-supabase-function) [2\. Edit the handler function](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend#2-edit-the-handler-function) [3\. Create React Email templates](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend#3-create-react-email-templates) [4\. Deploy the Function](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend#4-deploy-the-function) [5\. Configure the Send Email Hook](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend#5-configure-the-send-email-hook) [More resources](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend#more-resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)