---
url: "https://supabase.com/docs/guides/functions/websockets"
title: "Handling WebSockets | Supabase Docs"
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
3. Advanced Features
5. [WebSockets](https://supabase.com/docs/guides/functions/websockets)

# Handling WebSockets

## Handle WebSocket connections in Edge Functions.

* * *

Edge Functions supports hosting WebSocket servers that can facilitate bi-directional communications with browser clients.

This allows you to:

- Build real-time applications like chat or live updates
- Create WebSocket relay servers for external APIs
- Establish both incoming and outgoing WebSocket connections

* * *

## Creating WebSocket servers [\#](https://supabase.com/docs/guides/functions/websockets\#creating-websocket-servers)

Here are some basic examples of setting up WebSocket servers using Deno and Node.js APIs.

DenoNode.js

```
1
Deno.serve((req) => {
2
  const upgrade = req.headers.get('upgrade') || ''
3

4
  if (upgrade.toLowerCase() != 'websocket') {
5
    return new Response("request isn't trying to upgrade to WebSocket.", { status: 400 })
6
  }
7

8
  const { socket, response } = Deno.upgradeWebSocket(req)
9

10
  socket.onopen = () => console.log('socket opened')
11
  socket.onmessage = (e) => {
12
    console.log('socket message:', e.data)
13
    socket.send(new Date().toString())
14
  }
15

16
  socket.onerror = (e) => console.log('socket errored:', e.message)
17
  socket.onclose = () => console.log('socket closed')
18

19
  return response
20
})
```

* * *

### Outbound WebSockets [\#](https://supabase.com/docs/guides/functions/websockets\#outbound-websockets)

You can also establish an outbound WebSocket connection to another server from an Edge Function.

Combining it with incoming WebSocket servers, it's possible to use Edge Functions as a WebSocket proxy, for example as a [relay server](https://github.com/supabase-community/openai-realtime-console?tab=readme-ov-file#using-supabase-edge-functions-as-a-relay-server) for the [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime/overview).

```
1
import { createServer } from "node:http";
2
import { WebSocketServer } from "npm:ws";
3
import { RealtimeClient } from "https://raw.githubusercontent.com/openai/openai-realtime-api-beta/refs/heads/main/lib/client.js";
4

5
// ...
6

7
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
8

9
const server = createServer();
10
// Since we manually created the HTTP server,
11
// turn on the noServer mode.
12
const wss = new WebSocketServer({ noServer: true });
13

14
wss.on("connection", async (ws) => {
15
  console.log("socket opened");
16
  if (!OPENAI_API_KEY) {
17
    throw new Error("OPENAI_API_KEY is not set");
18
  }
19
  // Instantiate new client
20
  console.log(`Connecting with key "${OPENAI_API_KEY.slice(0, 3)}..."`);
21
  const client = new RealtimeClient({ apiKey: OPENAI_API_KEY });
22

23
  // Relay: OpenAI Realtime API Event -> Browser Event
24
  client.realtime.on("server.*", (event) => {
25
    console.log(`Relaying "${event.type}" to Client`);
26
    ws.send(JSON.stringify(event));
27
  });
28
  client.realtime.on("close", () => ws.close());
29

30
  // Relay: Browser Event -> OpenAI Realtime API Event
31
  // We need to queue data waiting for the OpenAI connection
32
  const messageQueue = [];
33
  const messageHandler = (data) => {
34
    try {
35
      const event = JSON.parse(data);
36
      console.log(`Relaying "${event.type}" to OpenAI`);
37
      client.realtime.send(event.type, event);
38
    } catch (e) {
39
      console.error(e.message);
40
      console.log(`Error parsing event from client: ${data}`);
41
    }
42
  };
43

44
  ws.on("message", (data) => {
45
    if (!client.isConnected()) {
46
      messageQueue.push(data);
47
    } else {
48
      messageHandler(data);
49
    }
50
  });
51
  ws.on("close", () => client.disconnect());
52

53
  // Connect to OpenAI Realtime API
54
  try {
55
    console.log(`Connecting to OpenAI...`);
56
    await client.connect();
57
  } catch (e) {
58
    console.log(`Error connecting to OpenAI: ${e.message}`);
59
    ws.close();
60
    return;
61
  }
62
  console.log(`Connected to OpenAI successfully!`);
63
  while (messageQueue.length) {
64
    messageHandler(messageQueue.shift());
65
  }
66
});
67

68
server.on("upgrade", (req, socket, head) => {
69
  wss.handleUpgrade(req, socket, head, (ws) => {
70
    wss.emit("connection", ws, req);
71
  });
72
});
73

74
server.listen(8080);
```

[View source](https://github.com/supabase-community/openai-realtime-console/blob/0f93657a71670704fbf77c48cf54d6c9eb956698/supabase/functions/relay/index.ts)

* * *

## Authentication [\#](https://supabase.com/docs/guides/functions/websockets\#authentication)

WebSocket browser clients don't have the option to send custom headers. Because of this, Edge Functions won't be able to perform the usual authorization header check to verify the JWT.

You can skip the default authorization header checks by explicitly providing `--no-verify-jwt` when serving and deploying functions.

To authenticate the user making WebSocket requests, you can pass the JWT in URL query params or via a custom protocol.

Using query paramsUsing custom protocol

```
1
import { createClient } from 'npm:@supabase/supabase-js@2'
2

3
const supabase = createClient(
4
  Deno.env.get('SUPABASE_URL'),
5
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
6
)
7

8
Deno.serve((req) => {
9
  const upgrade = req.headers.get('upgrade') || ''
10
  if (upgrade.toLowerCase() != 'WebSocket') {
11
    return new Response("request isn't trying to upgrade to WebSocket.", { status: 400 })
12
  }
13

14
  // Please be aware query params may be logged in some logging systems.
15
  const url = new URL(req.url)
16
  const jwt = url.searchParams.get('jwt')
17

18
  if (!jwt) {
19
    console.error('Auth token not provided')
20
    return new Response('Auth token not provided', { status: 403 })
21
  }
22

23
  const { error, data } = await supabase.auth.getClaims()
24

25
  if (error) {
26
    console.error(error)
27
    return new Response('Invalid token provided', { status: 403 })
28
  }
29

30
  if (!data.user) {
31
    console.error('user is not authenticated')
32
    return new Response('User is not authenticated', { status: 403 })
33
  }
34

35
  const { socket, response } = Deno.upgradeWebSocket(req)
36

37
  socket.onopen = () => console.log('socket opened')
38
  socket.onmessage = (e) => {
39
    console.log('socket message:', e.data)
40
    socket.send(new Date().toString())
41
  }
42

43
  socket.onerror = (e) => console.log('socket errored:', e.message)
44
  socket.onclose = () => console.log('socket closed')
45

46
  return response
47
})
```

The maximum duration is capped based on the wall-clock, CPU, and memory limits. The Function will shutdown when it reaches one of these [limits](https://supabase.com/docs/guides/functions/limits).

* * *

## Testing WebSockets locally [\#](https://supabase.com/docs/guides/functions/websockets\#testing-websockets-locally)

When testing Edge Functions locally with Supabase CLI, the instances are terminated automatically after a request is completed. This will prevent keeping WebSocket connections open.

To prevent that, you can update the `supabase/config.toml` with the following settings:

```
1
[edge_runtime]
2
policy = "per_worker"
```

When running with `per_worker` policy, Function won't auto-reload on edits. You will need to manually restart it by running `supabase functions serve`.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/websockets.mdx)

### Is this helpful?

NoYes

### On this page

[Creating WebSocket servers](https://supabase.com/docs/guides/functions/websockets#creating-websocket-servers) [Outbound WebSockets](https://supabase.com/docs/guides/functions/websockets#outbound-websockets) [Authentication](https://supabase.com/docs/guides/functions/websockets#authentication) [Testing WebSockets locally](https://supabase.com/docs/guides/functions/websockets#testing-websockets-locally)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)