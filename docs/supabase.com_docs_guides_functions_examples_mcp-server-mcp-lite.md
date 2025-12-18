---
url: "https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite"
title: "Building an MCP Server with mcp-lite | Supabase Docs"
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
5. [Building an MCP Server with mcp-lite](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite)

# Building an MCP Server with mcp-lite

* * *

The [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) enables Large Language Models (LLMs) to interact with external tools and data sources. With `mcp-lite`, you can build lightweight MCP servers that run on Supabase Edge Functions, giving your AI assistants the ability to execute custom tools at the edge.

This guide shows you how to scaffold, develop, and deploy an MCP server using mcp-lite on Supabase Edge Functions.

## What is mcp-lite? [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#what-is-mcp-lite)

[mcp-lite](https://github.com/fiberplane/mcp-lite) is a lightweight, zero-dependency TypeScript framework for building MCP servers. It works everywhere the Fetch API is available, including Node, Bun, Cloudflare Workers, Deno, and Supabase Edge Functions.

## Why Supabase Edge Functions + mcp-lite? [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#why-supabase-edge-functions--mcp-lite)

This combination offers several advantages:

- **Zero cold starts**: Edge Functions stay warm for fast responses
- **Global distribution**: Deploy once and run everywhere
- **Direct database access**: Connect directly to your Supabase Postgres
- **Minimal footprint**: mcp-lite has zero runtime dependencies
- **Full type safety**: TypeScript support in Deno
- **Simple deployment**: One command to production

## Prerequisites [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#prerequisites)

You need:

- [Docker](https://docs.docker.com/get-docker/) (to run Supabase locally)
- [Deno](https://deno.land/) (Supabase Edge Functions runtime)
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

## Create a new MCP server [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#create-a-new-mcp-server)

Starting with `create-mcp-lite@0.3.0`, you can scaffold a complete MCP server that runs on Supabase Edge Functions:

```
1
npm create mcp-lite@latest
```

When prompted, select **Supabase Edge Functions (MCP server)** from the template options.

The template creates a focused structure for Edge Functions development:

```
1
my-mcp-server/
2
├── supabase/
3
│   ├── config.toml                    # Minimal Supabase config (Edge Functions only)
4
│   └── functions/
5
│       └── mcp-server/
6
│           ├── index.ts               # MCP server implementation
7
│           └── deno.json              # Deno imports and configuration
8
├── package.json
9
└── tsconfig.json
```

## Understanding the project structure [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#understanding-the-project-structure)

### Minimal config.toml [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#minimal-configtoml)

The template includes a minimal `config.toml` that runs only Edge Functions - no database, storage, or Studio UI. This keeps your local setup lightweight:

```
1
# Minimal config for running only Edge Functions (no DB, storage, or studio)
2
project_id = "starter-mcp-supabase"
3

4
[api]
5
enabled = true
6
port = 54321
7

8
[edge_runtime]
9
enabled = true
10
policy = "per_worker"
11
deno_version = 2
```

You can always add more services as needed.

### Two Hono apps pattern [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#two-hono-apps-pattern)

The template uses a specific pattern required by Supabase Edge Functions:

```
1
// Root handler - matches the function name
2
const app = new Hono()
3

4
// MCP protocol handler
5
const mcpApp = new Hono()
6

7
mcpApp.get('/', (c) => {
8
  return c.json({
9
    message: 'MCP Server on Supabase Edge Functions',
10
    endpoints: {
11
      mcp: '/mcp',
12
      health: '/health',
13
    },
14
  })
15
})
16

17
mcpApp.all('/mcp', async (c) => {
18
  const response = await httpHandler(c.req.raw)
19
  return response
20
})
21

22
// Mount at /mcp-server (the function name)
23
app.route('/mcp-server', mcpApp)
```

This is required because Supabase routes all requests to `/<function-name>/*`. The outer `app` handles the function-level routing, while `mcpApp` handles your actual MCP endpoints.

### Deno import maps [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#deno-import-maps)

The template uses Deno's import maps in `deno.json` to manage dependencies:

```
1
{
2
  "compilerOptions": {
3
    "lib": ["deno.window", "deno.ns"],
4
    "strict": true
5
  },
6
  "imports": {
7
    "hono": "npm:hono@^4.6.14",
8
    "mcp-lite": "npm:mcp-lite@0.8.2",
9
    "zod": "npm:zod@^4.1.12"
10
  }
11
}
```

This gives you npm package access while staying in the Deno ecosystem.

## Local development [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#local-development)

### Start Supabase [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#start-supabase)

Navigate to your project directory and start Supabase services:

```
1
supabase start
```

### Serve your function [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#serve-your-function)

In a separate terminal, serve your MCP function locally:

```
1
supabase functions serve --no-verify-jwt mcp-server
```

Or use the npm script (which runs the same command):

```
1
npm run dev
```

Your MCP server is available at:

```
1
http://localhost:54321/functions/v1/mcp-server/mcp
```

### Testing your server [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#testing-your-server)

Test the MCP server by adding it to your Claude Code, Claude Desktop, Cursor, or your preferred MCP client.

Using Claude Code:

```
1
claude mcp add my-mcp-server -t http http://localhost:54321/functions/v1/mcp-server/mcp
```

You can also test it using the MCP inspector:

```
1
npx @modelcontextprotocol/inspector
```

Then add the MCP endpoint URL in the inspector UI.

## How it works [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#how-it-works)

The MCP server setup is straightforward:

```
1
import { McpServer, StreamableHttpTransport } from 'mcp-lite'
2
import { z } from 'zod'
3

4
// Create MCP server instance
5
const mcp = new McpServer({
6
  name: 'starter-mcp-supabase-server',
7
  version: '1.0.0',
8
  schemaAdapter: (schema) => z.toJSONSchema(schema as z.ZodType),
9
})
10

11
// Define a tool
12
mcp.tool('sum', {
13
  description: 'Adds two numbers together',
14
  inputSchema: z.object({
15
    a: z.number(),
16
    b: z.number(),
17
  }),
18
  handler: (args: { a: number; b: number }) => ({
19
    content: [{ type: 'text', text: String(args.a + args.b) }],
20
  }),
21
})
22

23
// Bind to HTTP transport
24
const transport = new StreamableHttpTransport()
25
const httpHandler = transport.bind(mcp)
```

## Adding more tools [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#adding-more-tools)

Extend your MCP server by adding tools directly to the `mcp` instance. Here's an example of adding a database search tool:

```
1
mcp.tool('searchDatabase', {
2
  description: 'Search your Supabase database',
3
  inputSchema: z.object({
4
    table: z.string(),
5
    query: z.string(),
6
  }),
7
  handler: async (args) => {
8
    // Access Supabase client here
9
    // const { data } = await supabase.from(args.table).select('*')
10
    return {
11
      content: [{ type: 'text', text: `Searching ${args.table}...` }],
12
    }
13
  },
14
})
```

You can add tools that:

- Query your Supabase database
- Access Supabase Storage for file operations
- Call external APIs
- Process data with custom logic
- Integrate with other Supabase features

## Deploy to production [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#deploy-to-production)

When ready, deploy to Supabase's global edge network:

```
1
supabase functions deploy --no-verify-jwt mcp-server
```

Or use the npm script:

```
1
npm run deploy
```

Your MCP server will be live at:

```
1
https://your-project-ref.supabase.co/functions/v1/mcp-server/mcp
```

## Authentication considerations [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#authentication-considerations)

The template uses `--no-verify-jwt` for quick development. This means authentication is not enforced by Supabase's JWT layer.

For production, you should implement authentication at the MCP server level following the [MCP Authorization specification](https://modelcontextprotocol.io/specification/draft/basic/authorization). This gives you control over who can access your MCP tools.

### Security best practices [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#security-best-practices)

When deploying MCP servers:

- **Don't expose sensitive data**: Use the server in development environments with non-production data
- **Implement authentication**: Add proper authentication for production deployments
- **Validate inputs**: Always validate and sanitize tool inputs
- **Limit tool scope**: Only expose tools that are necessary for your use case
- **Monitor usage**: Track tool calls and monitor for unusual activity

For more security guidance, see the [MCP security guide](https://supabase.com/guides/getting-started/mcp#security-risks).

## What's next [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#whats-next)

With your MCP server running on Supabase Edge Functions, you can:

- Connect it to your Supabase database for data-driven tools
- Use Supabase Auth to secure your endpoints
- Access Supabase Storage for file operations
- Deploy to multiple regions automatically
- Scale to handle production traffic
- Integrate with AI assistants like Claude, Cursor, or custom MCP clients

## Resources [\#](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite\#resources)

- [mcp-lite on GitHub](https://github.com/fiberplane/mcp-lite)
- [Model Context Protocol Spec](https://modelcontextprotocol.io/)
- [Supabase Edge Functions Docs](https://supabase.com/guides/functions)
- [Deno Runtime Documentation](https://deno.land/)
- [Fiberplane tutorial](https://blog.fiberplane.com/blog/mcp-lite-supabase-edge-functions/)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/examples/mcp-server-mcp-lite.mdx)

### Is this helpful?

NoYes

### On this page

[What is mcp-lite?](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#what-is-mcp-lite) [Why Supabase Edge Functions + mcp-lite?](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#why-supabase-edge-functions--mcp-lite) [Prerequisites](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#prerequisites) [Create a new MCP server](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#create-a-new-mcp-server) [Understanding the project structure](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#understanding-the-project-structure) [Minimal config.toml](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#minimal-configtoml) [Two Hono apps pattern](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#two-hono-apps-pattern) [Deno import maps](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#deno-import-maps) [Local development](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#local-development) [Start Supabase](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#start-supabase) [Serve your function](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#serve-your-function) [Testing your server](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#testing-your-server) [How it works](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#how-it-works) [Adding more tools](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#adding-more-tools) [Deploy to production](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#deploy-to-production) [Authentication considerations](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#authentication-considerations) [Security best practices](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#security-best-practices) [What's next](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#whats-next) [Resources](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)