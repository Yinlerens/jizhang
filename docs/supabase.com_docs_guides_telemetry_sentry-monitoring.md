---
url: "https://supabase.com/docs/guides/telemetry/sentry-monitoring"
title: "Sentry integration | Supabase Docs"
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

[Telemetry](https://supabase.com/docs/guides/telemetry)

[Overview](https://supabase.com/docs/guides/telemetry)

Logging & observability[Logging](https://supabase.com/docs/guides/telemetry/logs)
[Advanced log filtering](https://supabase.com/docs/guides/telemetry/advanced-log-filtering)
[Log drains](https://supabase.com/docs/guides/telemetry/log-drains)
[Reports](https://supabase.com/docs/guides/telemetry/reports)

Metrics

[Sentry integration](https://supabase.com/docs/guides/telemetry/sentry-monitoring)

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

Telemetry

1. [Telemetry](https://supabase.com/docs/guides/telemetry)
3. Logging & observability
5. [Sentry integration](https://supabase.com/docs/guides/telemetry/sentry-monitoring)

# Sentry integration

## Integrate Sentry to monitor errors from a Supabase client

* * *

You can use [Sentry](https://sentry.io/welcome/) to monitor errors thrown from a Supabase JavaScript client. Install the [Supabase Sentry integration](https://github.com/supabase-community/sentry-integration-js) to get started.

The Sentry integration supports browser, Node, and edge environments.

## Installation [\#](https://supabase.com/docs/guides/telemetry/sentry-monitoring\#installation)

Install the Sentry integration using your package manager:

npmyarnpnpm

```
1
npm install @supabase/sentry-js-integration
```

## Use [\#](https://supabase.com/docs/guides/telemetry/sentry-monitoring\#use)

If you are using Sentry JavaScript SDK v7, reference [`supabase-community/sentry-integration-js` repository](https://github.com/supabase-community/sentry-integration-js/blob/master/README-v7.md) instead.

To use the Supabase Sentry integration, add it to your `integrations` list when initializing your Sentry client.

You can supply either the Supabase Client constructor or an already-initiated instance of a Supabase Client.

With constructorWith instance

```
1
import * as Sentry from '@sentry/browser'
2
import { SupabaseClient } from '@supabase/supabase-js'
3
import { supabaseIntegration } from '@supabase/sentry-js-integration'
4

5
Sentry.init({
6
  dsn: SENTRY_DSN,
7
  integrations: [\
8\
    supabaseIntegration(SupabaseClient, Sentry, {\
9\
      tracing: true,\
10\
      breadcrumbs: true,\
11\
      errors: true,\
12\
    }),\
13\
  ],
14
})
```

All available configuration options are available in our [`supabase-community/sentry-integration-js` repository](https://github.com/supabase-community/sentry-integration-js/blob/master/README.md#options).

## Deduplicating spans [\#](https://supabase.com/docs/guides/telemetry/sentry-monitoring\#deduplicating-spans)

If you're already monitoring HTTP errors in Sentry, for example with the HTTP, Fetch, or Undici integrations, you will get duplicate spans for Supabase calls. You can deduplicate the spans by skipping them in your other integration:

```
1
import * as Sentry from '@sentry/browser'
2
import { SupabaseClient } from '@supabase/supabase-js'
3
import { supabaseIntegration } from '@supabase/sentry-js-integration'
4

5
Sentry.init({
6
  dsn: SENTRY_DSN,
7
  integrations: [\
8\
    supabaseIntegration(SupabaseClient, Sentry, {\
9\
      tracing: true,\
10\
      breadcrumbs: true,\
11\
      errors: true,\
12\
    }),\
13\
\
14\
    // @sentry/browser\
15\
    Sentry.browserTracingIntegration({\
16\
      shouldCreateSpanForRequest: (url) => {\
17\
        return !url.startsWith(`${SUPABASE_URL}/rest`)\
18\
      },\
19\
    }),\
20\
\
21\
    // or @sentry/node\
22\
    Sentry.httpIntegration({\
23\
      tracing: {\
24\
        ignoreOutgoingRequests: (url) => {\
25\
          return url.startsWith(`${SUPABASE_URL}/rest`)\
26\
        },\
27\
      },\
28\
    }),\
29\
\
30\
    // or @sentry/node with Fetch support\
31\
    Sentry.nativeNodeFetchIntegration({\
32\
      ignoreOutgoingRequests: (url) => {\
33\
        return url.startsWith(`${SUPABASE_URL}/rest`)\
34\
      },\
35\
    }),\
36\
\
37\
    // or @sentry/WinterCGFetch for Next.js Proxy & Edge Functions\
38\
    Sentry.winterCGFetchIntegration({\
39\
      breadcrumbs: true,\
40\
      shouldCreateSpanForRequest: (url) => {\
41\
        return !url.startsWith(`${SUPABASE_URL}/rest`)\
42\
      },\
43\
    }),\
44\
  ],
45
})
```

## Example Next.js configuration [\#](https://supabase.com/docs/guides/telemetry/sentry-monitoring\#example-nextjs-configuration)

See this example for a setup with Next.js to cover browser, server, and edge environments. First, run through the [Sentry Next.js wizard](https://docs.sentry.io/platforms/javascript/guides/nextjs/#install) to generate the base Next.js configuration. Then add the Supabase Sentry Integration to all your `Sentry.init` calls with the appropriate filters.

BrowserServerProxy & EdgeInstrumentation

```
1
import * as Sentry from '@sentry/nextjs'
2
import { SupabaseClient } from '@supabase/supabase-js'
3
import { supabaseIntegration } from '@supabase/sentry-js-integration'
4

5
Sentry.init({
6
  dsn: SENTRY_DSN,
7
  integrations: [\
8\
    supabaseIntegration(SupabaseClient, Sentry, {\
9\
      tracing: true,\
10\
      breadcrumbs: true,\
11\
      errors: true,\
12\
    }),\
13\
    Sentry.browserTracingIntegration({\
14\
      shouldCreateSpanForRequest: (url) => {\
15\
        return !url.startsWith(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest`)\
16\
      },\
17\
    }),\
18\
  ],
19

20
  // Adjust this value in production, or use tracesSampler for greater control
21
  tracesSampleRate: 1,
22

23
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
24
  debug: true,
25
})
```

Afterwards, build your application (`npm run build`) and start it locally (`npm run start`). You will now see the transactions being logged in the terminal when making supabase-js requests.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/telemetry/sentry-monitoring.mdx)

### Is this helpful?

NoYes

### On this page

[Installation](https://supabase.com/docs/guides/telemetry/sentry-monitoring#installation) [Use](https://supabase.com/docs/guides/telemetry/sentry-monitoring#use) [Deduplicating spans](https://supabase.com/docs/guides/telemetry/sentry-monitoring#deduplicating-spans) [Example Next.js configuration](https://supabase.com/docs/guides/telemetry/sentry-monitoring#example-nextjs-configuration)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)