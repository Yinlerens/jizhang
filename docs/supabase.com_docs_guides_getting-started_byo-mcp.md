---
url: "https://supabase.com/docs/guides/getting-started/byo-mcp"
title: "Deploy MCP servers | Supabase Docs"
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

[Start with Supabase](https://supabase.com/docs/guides/getting-started)

[Features](https://supabase.com/docs/guides/getting-started/features)

[Architecture](https://supabase.com/docs/guides/getting-started/architecture)

Framework Quickstarts[Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
[React](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
[Nuxt](https://supabase.com/docs/guides/getting-started/quickstarts/nuxtjs)
[Vue](https://supabase.com/docs/guides/getting-started/quickstarts/vue)
[Hono](https://supabase.com/docs/guides/getting-started/quickstarts/hono)
[Expo React Native](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native)
[Flutter](https://supabase.com/docs/guides/getting-started/quickstarts/flutter)
[iOS SwiftUI](https://supabase.com/docs/guides/getting-started/quickstarts/ios-swiftui)
[Android Kotlin](https://supabase.com/docs/guides/getting-started/quickstarts/kotlin)
[SvelteKit](https://supabase.com/docs/guides/getting-started/quickstarts/sveltekit)
[Flask (Python)](https://supabase.com/docs/guides/getting-started/quickstarts/flask)
[TanStack Start](https://supabase.com/docs/guides/getting-started/quickstarts/tanstack)
[Laravel PHP](https://supabase.com/docs/guides/getting-started/quickstarts/laravel)
[Ruby on Rails](https://supabase.com/docs/guides/getting-started/quickstarts/ruby-on-rails)
[SolidJS](https://supabase.com/docs/guides/getting-started/quickstarts/solidjs)
[RedwoodJS](https://supabase.com/docs/guides/getting-started/quickstarts/redwoodjs)
[Refine](https://supabase.com/docs/guides/getting-started/quickstarts/refine)

Web app demos[Next.js](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
[React](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
[Vue 3](https://supabase.com/docs/guides/getting-started/tutorials/with-vue-3)
[Nuxt 3](https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3)
[Angular](https://supabase.com/docs/guides/getting-started/tutorials/with-angular)
[RedwoodJS](https://supabase.com/docs/guides/getting-started/tutorials/with-redwoodjs)
[SolidJS](https://supabase.com/docs/guides/getting-started/tutorials/with-solidjs)
[Svelte](https://supabase.com/docs/guides/getting-started/tutorials/with-svelte)
[SvelteKit](https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit)
[Refine](https://supabase.com/docs/guides/getting-started/tutorials/with-refine)

Mobile tutorials[Flutter](https://supabase.com/docs/guides/getting-started/tutorials/with-flutter)
[Expo React Native](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
[Android Kotlin](https://supabase.com/docs/guides/getting-started/tutorials/with-kotlin)
[Ionic React](https://supabase.com/docs/guides/getting-started/tutorials/with-ionic-react)
[Ionic Vue](https://supabase.com/docs/guides/getting-started/tutorials/with-ionic-vue)
[Ionic Angular](https://supabase.com/docs/guides/getting-started/tutorials/with-ionic-angular)
[Swift](https://supabase.com/docs/guides/getting-started/tutorials/with-swift)

AI Tools

Prompts

[Supabase MCP server](https://supabase.com/docs/guides/getting-started/mcp)
[Deploy MCP servers](https://supabase.com/docs/guides/getting-started/byo-mcp)

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

Getting Started

1. [Start with Supabase](https://supabase.com/docs/guides/getting-started)
3. AI Tools
5. [Deploy MCP servers](https://supabase.com/docs/guides/getting-started/byo-mcp)

# Deploy MCP servers

* * *

Build and deploy [Model Context Protocol](https://modelcontextprotocol.io/specification/2025-11-25) (MCP) servers on Supabase using [Edge Functions](https://supabase.com/docs/guides/functions).

This guide covers MCP servers that do not require authentication. Auth support for MCP on Edge Functions is coming soon.

## Deploy your MCP server [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#deploy-your-mcp-server)

### Prerequisites [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#prerequisites)

Before you begin, make sure you have:

- [Docker](https://docs.docker.com/get-docker/) installed (required for local Supabase development)
- [Deno](https://deno.land/) installed (Supabase Edge Functions runtime)
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) installed

### Create a new project [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#create-a-new-project)

Start by creating a new Supabase project:

```
1
mkdir my-mcp-server
2
cd my-mcp-server
3
supabase init
```

### Create the MCP server function [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#create-the-mcp-server-function)

Create a new Edge Function for your MCP server:

```
1
supabase functions new mcp
```

Create a `deno.json` file in `supabase/functions/mcp/` with the required dependencies:

```
1
{
2
  "imports": {
3
    "@hono/mcp": "npm:@hono/mcp@^0.1.1",
4
    "@modelcontextprotocol/sdk": "npm:@modelcontextprotocol/sdk@^1.24.3",
5
    "hono": "npm:hono@^4.9.2",
6
    "zod": "npm:zod@^4.1.13"
7
  }
8
}
```

This tutorial uses the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk), but you can use any MCP framework that's compatible with the [Edge Runtime](https://supabase.com/docs/guides/functions), such as [mcp-lite](https://github.com/fiberplane/mcp-lite), [mcp-use](https://github.com/mcp-use/mcp-use), or [mcp-handler](https://github.com/vercel/mcp-handler).

Replace the contents of `supabase/functions/mcp/index.ts` with:

```
1
// Setup type definitions for built-in Supabase Runtime APIs
2
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
3

4
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
5
import { StreamableHTTPTransport } from '@hono/mcp'
6
import { Hono } from 'hono'
7
import { z } from 'zod'
8

9
// Create Hono app
10
const app = new Hono()
11

12
// Create your MCP server
13
const server = new McpServer({
14
  name: 'mcp',
15
  version: '0.1.0',
16
})
17

18
// Register a simple addition tool
19
server.registerTool(
20
  'add',
21
  {
22
    title: 'Addition Tool',
23
    description: 'Add two numbers together',
24
    inputSchema: { a: z.number(), b: z.number() },
25
  },
26
  ({ a, b }) => ({
27
    content: [{ type: 'text', text: String(a + b) }],
28
  })
29
)
30

31
// Handle MCP requests at the root path
32
app.all('/', async (c) => {
33
  const transport = new StreamableHTTPTransport()
34
  await server.connect(transport)
35
  return transport.handleRequest(c)
36
})
37

38
Deno.serve(app.fetch)
```

### Local development [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#local-development)

Start the Supabase local development stack:

```
1
supabase start
```

In a separate terminal, serve your function:

```
1
supabase functions serve --no-verify-jwt mcp
```

Your MCP server is now running at:

```
1
http://localhost:54321/functions/v1/mcp
```

The `--no-verify-jwt` flag disables JWT verification at the Edge Function layer so your MCP server can accept unauthenticated requests. Authenticated MCP support is coming soon.

### Test your MCP server [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#test-your-mcp-server)

Test your server with the official [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```
1
npx -y @modelcontextprotocol/inspector
```

Use the local endpoint `http://localhost:54321/functions/v1/mcp` in the inspector UI to explore available tools and test them interactively.

### Deploy to production [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#deploy-to-production)

When you're ready to deploy, link your project and deploy the function:

```
1
supabase link --project-ref <your-project-ref>
2
supabase functions deploy --no-verify-jwt mcp
```

Your MCP server will be available at:

```
1
https://<your-project-ref>.supabase.co/functions/v1/mcp
```

Update your MCP client configuration to use the production URL.

## Adding more tools [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#adding-more-tools)

Extend your MCP server by registering additional tools. Here's an example that queries your Supabase database:

```
1
import { createClient } from 'jsr:@supabase/supabase-js@2'
2

3
// Create Supabase client
4
const supabase = createClient(
5
  Deno.env.get('SUPABASE_URL')!,
6
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
7
)
8

9
server.registerTool(
10
  'list_users',
11
  {
12
    title: 'List Users',
13
    description: 'Get a list of users from the database',
14
    inputSchema: { limit: z.number().optional().default(10) },
15
  },
16
  async ({ limit }) => {
17
    const { data, error } = await supabase
18
      .from('users')
19
      .select('id, email, created_at')
20
      .limit(limit)
21

22
    if (error) {
23
      return {
24
        content: [{ type: 'text', text: `Error: ${error.message}` }],
25
        isError: true,
26
      }
27
    }
28

29
    return {
30
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
31
    }
32
  }
33
)
```

## Examples [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#examples)

You can find ready-to-use MCP server implementations here:

- [MCP server examples on GitHub](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/mcp/)

## Resources [\#](https://supabase.com/docs/guides/getting-started/byo-mcp\#resources)

- [Model Context Protocol Specification](https://modelcontextprotocol.io/specification/2025-11-25)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [OAuth 2.1 Server](https://supabase.com/docs/guides/auth/oauth-server)
- [MCP Authentication](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication)
- [MCP server examples on GitHub](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/mcp)
- [Building MCP servers with mcp-lite](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite) \- Alternative lightweight framework

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/getting-started/byo-mcp.mdx)

### Is this helpful?

NoYes

### On this page

[Deploy your MCP server](https://supabase.com/docs/guides/getting-started/byo-mcp#deploy-your-mcp-server) [Prerequisites](https://supabase.com/docs/guides/getting-started/byo-mcp#prerequisites) [Create a new project](https://supabase.com/docs/guides/getting-started/byo-mcp#create-a-new-project) [Create the MCP server function](https://supabase.com/docs/guides/getting-started/byo-mcp#create-the-mcp-server-function) [Local development](https://supabase.com/docs/guides/getting-started/byo-mcp#local-development) [Test your MCP server](https://supabase.com/docs/guides/getting-started/byo-mcp#test-your-mcp-server) [Deploy to production](https://supabase.com/docs/guides/getting-started/byo-mcp#deploy-to-production) [Adding more tools](https://supabase.com/docs/guides/getting-started/byo-mcp#adding-more-tools) [Examples](https://supabase.com/docs/guides/getting-started/byo-mcp#examples) [Resources](https://supabase.com/docs/guides/getting-started/byo-mcp#resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)