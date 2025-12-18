---
url: "https://supabase.com/docs/guides/functions/kysely-postgres"
title: "Type-Safe SQL with Kysely | Supabase Docs"
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
3. Third-Party Tools
5. [Type-Safe SQL with Kysely](https://supabase.com/docs/guides/functions/kysely-postgres)

# Type-Safe SQL with Kysely

* * *

Type-Safe SQL on the Edge with Kysely - YouTube

[Photo image of Supabase](https://www.youtube.com/channel/UCNTVzV1InxHV-YR0fSajqPQ?embeds_referring_euri=https%3A%2F%2Fsupabase.com%2F)

Supabase

70.4K subscribers

[Type-Safe SQL on the Edge with Kysely](https://www.youtube.com/watch?v=zd9a_Lk3jAc)

Supabase

Search

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

Watch later

Share

Copy link

Watch on

0:00

/

•Live

•

Supabase Edge Functions can [connect directly to your Postgres database](https://supabase.com/docs/guides/functions/connect-to-postgres) to execute SQL queries. [Kysely](https://github.com/kysely-org/kysely#kysely) is a type-safe and autocompletion-friendly typescript SQL query builder.

Combining Kysely with Deno Postgres gives you a convenient developer experience for interacting directly with your Postgres database.

## Code [\#](https://supabase.com/docs/guides/functions/kysely-postgres\#code)

Find the example on [GitHub](https://github.com/supabase/supabase/tree/master/examples/edge-functions/supabase/functions/kysely-postgres)

Get your database connection credentials from the project's [**Connect** panel](https://supabase.com/dashboard/project/_/?showConnect=true) and store them in an `.env` file:

```
1
DB_HOSTNAME=
2
DB_PASSWORD=
3
DB_SSL_CERT="-----BEGIN CERTIFICATE-----
4
GET YOUR CERT FROM YOUR PROJECT DASHBOARD
5
-----END CERTIFICATE-----"
```

Create a `DenoPostgresDriver.ts` file to manage the connection to Postgres via [deno-postgres](https://deno-postgres.com/):

```
1
import {
2
  CompiledQuery,
3
  DatabaseConnection,
4
  Driver,
5
  PostgresCursorConstructor,
6
  QueryResult,
7
  TransactionSettings,
8
} from 'https://esm.sh/kysely@0.23.4'
9
import { freeze, isFunction } from 'https://esm.sh/kysely@0.23.4/dist/esm/util/object-utils.js'
10
import { extendStackTrace } from 'https://esm.sh/kysely@0.23.4/dist/esm/util/stack-trace-utils.js'
11
import { Pool, PoolClient } from 'https://deno.land/x/postgres@v0.17.0/mod.ts'
12

13
export interface PostgresDialectConfig {
14
  pool: Pool | (() => Promise<Pool>)
15
  cursor?: PostgresCursorConstructor
16
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
17
}
18

19
const PRIVATE_RELEASE_METHOD = Symbol()
20

21
export class PostgresDriver implements Driver {
22
  readonly #config: PostgresDialectConfig
23
  readonly #connections = new WeakMap<PoolClient, DatabaseConnection>()
24
  #pool?: Pool
25

26
  constructor(config: PostgresDialectConfig) {
27
    this.#config = freeze({ ...config })
28
  }
29

30
  async init(): Promise<void> {
31
    this.#pool = isFunction(this.#config.pool) ? await this.#config.pool() : this.#config.pool
32
  }
33

34
  async acquireConnection(): Promise<DatabaseConnection> {
35
    const client = await this.#pool!.connect()
36
    let connection = this.#connections.get(client)
37

38
    if (!connection) {
39
      connection = new PostgresConnection(client, {
40
        cursor: this.#config.cursor ?? null,
41
      })
42
      this.#connections.set(client, connection)
43

44
      // The driver must take care of calling `onCreateConnection` when a new
45
      // connection is created. The `pg` module doesn't provide an async hook
46
      // for the connection creation. We need to call the method explicitly.
47
      if (this.#config?.onCreateConnection) {
48
        await this.#config.onCreateConnection(connection)
49
      }
50
    }
51

52
    return connection
53
  }
54

55
  async beginTransaction(
56
    connection: DatabaseConnection,
57
    settings: TransactionSettings
58
  ): Promise<void> {
59
    if (settings.isolationLevel) {
60
      await connection.executeQuery(
61
        CompiledQuery.raw(`start transaction isolation level ${settings.isolationLevel}`)
62
      )
63
    } else {
64
      await connection.executeQuery(CompiledQuery.raw('begin'))
65
    }
66
  }
67

68
  async commitTransaction(connection: DatabaseConnection): Promise<void> {
69
    await connection.executeQuery(CompiledQuery.raw('commit'))
70
  }
71

72
  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
73
    await connection.executeQuery(CompiledQuery.raw('rollback'))
74
  }
75

76
  async releaseConnection(connection: PostgresConnection): Promise<void> {
77
    connection[PRIVATE_RELEASE_METHOD]()
78
  }
79

80
  async destroy(): Promise<void> {
81
    if (this.#pool) {
82
      const pool = this.#pool
83
      this.#pool = undefined
84
      await pool.end()
85
    }
86
  }
87
}
88

89
interface PostgresConnectionOptions {
90
  cursor: PostgresCursorConstructor | null
91
}
92

93
class PostgresConnection implements DatabaseConnection {
94
  #client: PoolClient
95
  #options: PostgresConnectionOptions
96

97
  constructor(client: PoolClient, options: PostgresConnectionOptions) {
98
    this.#client = client
99
    this.#options = options
100
  }
101

102
  async executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>> {
103
    try {
104
      const result = await this.#client.queryObject<O>(compiledQuery.sql, [\
105\
        ...compiledQuery.parameters,\
106\
      ])
107

108
      if (
109
        result.command === 'INSERT' ||
110
        result.command === 'UPDATE' ||
111
        result.command === 'DELETE'
112
      ) {
113
        const numAffectedRows = BigInt(result.rowCount || 0)
114

115
        return {
116
          numUpdatedOrDeletedRows: numAffectedRows,
117
          numAffectedRows,
118
          rows: result.rows ?? [],
119
        } as any
120
      }
121

122
      return {
123
        rows: result.rows ?? [],
124
      }
125
    } catch (err) {
126
      throw extendStackTrace(err, new Error())
127
    }
128
  }
129

130
  async *streamQuery<O>(
131
    _compiledQuery: CompiledQuery,
132
    chunkSize: number
133
  ): AsyncIterableIterator<QueryResult<O>> {
134
    if (!this.#options.cursor) {
135
      throw new Error(
136
        "'cursor' is not present in your postgres dialect config. It's required to make streaming work in postgres."
137
      )
138
    }
139

140
    if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
141
      throw new Error('chunkSize must be a positive integer')
142
    }
143

144
    // stream not available
145
    return null
146
  }
147

148
  [PRIVATE_RELEASE_METHOD](): void {
149
    this.#client.release()
150
  }
151
}
```

Create an `index.ts` file to execute a query on incoming requests:

```
1
import { serve } from 'https://deno.land/std@0.175.0/http/server.ts'
2
import { Pool } from 'https://deno.land/x/postgres@v0.17.0/mod.ts'
3
import {
4
  Kysely,
5
  Generated,
6
  PostgresAdapter,
7
  PostgresIntrospector,
8
  PostgresQueryCompiler,
9
} from 'https://esm.sh/kysely@0.23.4'
10
import { PostgresDriver } from './DenoPostgresDriver.ts'
11

12
console.log(`Function "kysely-postgres" up and running!`)
13

14
interface AnimalTable {
15
  id: Generated<bigint>
16
  animal: string
17
  created_at: Date
18
}
19

20
// Keys of this interface are table names.
21
interface Database {
22
  animals: AnimalTable
23
}
24

25
// Create a database pool with one connection.
26
const pool = new Pool(
27
  {
28
    tls: { caCertificates: [Deno.env.get('DB_SSL_CERT')!] },
29
    database: 'postgres',
30
    hostname: Deno.env.get('DB_HOSTNAME'),
31
    user: 'postgres',
32
    port: 5432,
33
    password: Deno.env.get('DB_PASSWORD'),
34
  },
35
  1
36
)
37

38
// You'd create one of these when you start your app.
39
const db = new Kysely<Database>({
40
  dialect: {
41
    createAdapter() {
42
      return new PostgresAdapter()
43
    },
44
    createDriver() {
45
      return new PostgresDriver({ pool })
46
    },
47
    createIntrospector(db: Kysely<unknown>) {
48
      return new PostgresIntrospector(db)
49
    },
50
    createQueryCompiler() {
51
      return new PostgresQueryCompiler()
52
    },
53
  },
54
})
55

56
serve(async (_req) => {
57
  try {
58
    // Run a query
59
    const animals = await db.selectFrom('animals').select(['id', 'animal', 'created_at']).execute()
60

61
    // Neat, it's properly typed \o/
62
    console.log(animals[0].created_at.getFullYear())
63

64
    // Encode the result as pretty printed JSON
65
    const body = JSON.stringify(
66
      animals,
67
      (key, value) => (typeof value === 'bigint' ? value.toString() : value),
68
      2
69
    )
70

71
    // Return the response with the correct content type header
72
    return new Response(body, {
73
      status: 200,
74
      headers: {
75
        'Content-Type': 'application/json; charset=utf-8',
76
      },
77
    })
78
  } catch (err) {
79
    console.error(err)
80
    return new Response(String(err?.message ?? err), { status: 500 })
81
  }
82
})
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/kysely-postgres.mdx)

### Is this helpful?

NoYes

### On this page

[Code](https://supabase.com/docs/guides/functions/kysely-postgres#code)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)