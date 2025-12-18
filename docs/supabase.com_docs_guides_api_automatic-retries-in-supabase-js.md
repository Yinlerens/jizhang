---
url: "https://supabase.com/docs/guides/api/automatic-retries-in-supabase-js"
title: "How to do automatic retries with `supabase-js` | Supabase Docs"
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

[REST API](https://supabase.com/docs/guides/api)

[Overview](https://supabase.com/docs/guides/api)

[Quickstart](https://supabase.com/docs/guides/api/quickstart)

[Client Libraries](https://supabase.com/docs/guides/api/rest/client-libs)

[Auto-generated Docs](https://supabase.com/docs/guides/api/rest/auto-generated-docs)

[Generating TypeScript Types](https://supabase.com/docs/guides/api/rest/generating-types)

Tools[SQL to REST API Translator](https://supabase.com/docs/guides/api/sql-to-rest)

Guides[Creating API routes](https://supabase.com/docs/guides/api/creating-routes)
[How API Keys work](https://supabase.com/docs/guides/api/api-keys)
[Securing your API](https://supabase.com/docs/guides/api/securing-your-api)

Using the Data APIs[Managing tables, views, and data](https://supabase.com/docs/guides/database/tables)
[Querying joins and nested tables](https://supabase.com/docs/guides/database/joins-and-nesting)
[JSON and unstructured data](https://supabase.com/docs/guides/database/json)
[Managing database functions](https://supabase.com/docs/guides/database/functions)
[Using full-text search](https://supabase.com/docs/guides/database/full-text-search)
[Debugging performance issues](https://supabase.com/docs/guides/database/debugging-performance)
[Using custom schemas](https://supabase.com/docs/guides/api/using-custom-schemas)
[Converting from SQL to JavaScript API](https://supabase.com/docs/guides/api/sql-to-api)

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

REST API

# How to do automatic retries with `supabase-js`

## Learn how to add automatic retries to your Supabase API requests using `fetch-retry`.

* * *

##### Important

You should only enable retries if your requests fail with network errors (e.g. 520 status from Cloudflare). A high number of retries have the potential to exhaust the Data API connection pool, which could result in lower throughput and failed requests.

The `fetch-retry` package allows you to add retry logic to `fetch` requests, making it a useful tool for enhancing the resilience of API calls in your Supabase applications. Here's a step-by-step guide on how to integrate `fetch-retry` with the `supabase-js` library.

## 1\. Install dependencies [\#](https://supabase.com/docs/guides/api/automatic-retries-in-supabase-js\#1-install-dependencies)

To get started, ensure you have both `supabase-js` and `fetch-retry` installed in your project:

```
1
npm install @supabase/supabase-js fetch-retry
```

## 2\. Wrap the fetch function [\#](https://supabase.com/docs/guides/api/automatic-retries-in-supabase-js\#2-wrap-the-fetch-function)

The `fetch-retry` package works by wrapping the native `fetch` function. You can create a custom fetch instance with retry logic and pass it to the `supabase-js` client.

```
1
import { createClient } from '@supabase/supabase-js'
2
import fetchRetry from 'fetch-retry'
3

4
// Wrap the global fetch with fetch-retry
5
const fetchWithRetry = fetchRetry(fetch)
6

7
// Create a Supabase client instance with the custom fetch
8
const supabase = createClient(
9
  'https://your-supabase-url.supabase.co',
10
  'sb_publishable_... or anon key',
11
  {
12
    global: {
13
      fetch: fetchWithRetry,
14
    },
15
  }
16
)
```

## 3\. Configure retry options [\#](https://supabase.com/docs/guides/api/automatic-retries-in-supabase-js\#3-configure-retry-options)

You can configure `fetch-retry` options to control retry behavior, such as the number of retries, retry delay, and which errors should trigger a retry.

Here is an example with custom retry options:

```
1
const fetchWithRetry = fetchRetry(fetch, {
2
  retries: 3, // Number of retry attempts
3
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
4
  retryOn: [520], // Retry only on Cloudflare errors
5
})
```

In this example, the `retryDelay` function implements an exponential backoff strategy, and retries are triggered only for specific HTTP status codes.

## 4\. Using the Supabase client [\#](https://supabase.com/docs/guides/api/automatic-retries-in-supabase-js\#4-using-the-supabase-client)

With `fetch-retry` integrated, you can use the Supabase client as usual. The retry logic will automatically apply to all network requests made by `supabase-js`.

```
1
async function fetchData() {
2
  const { data, error } = await supabase.from('your_table').select('*')
3

4
  if (error) {
5
    console.error('Error fetching data:', error)
6
  } else {
7
    console.log('Fetched data:', data)
8
  }
9
}
10

11
fetchData()
```

## 5\. Fine-Tuning retries for specific requests [\#](https://supabase.com/docs/guides/api/automatic-retries-in-supabase-js\#5-fine-tuning-retries-for-specific-requests)

If you need different retry logic for certain requests, you can use the `retryOn` with a custom function to inspect the URL or response and decide whether to retry the request.

```
1
const fetchWithRetry = fetchRetry(fetch, {
2
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
3
  retryOn: (attempt, error, response) => {
4
    const shouldRetry
5
      = (attempt: number, error: Error | null, response: Response | null) =>
6
        attempt < 3
7
          && response
8
          && response.status == 520 // Cloudflare errors
9
          && response.url.includes('rpc/your_stored_procedure')
10

11
    if (shouldRetry(attempt, error, response)) {
12
      console.log(`Retrying request... Attempt #${attempt}`, response)
13
      return true
14
    }
15

16
    return false
17
  }
18
})
19

20
async function yourStoredProcedure() {
21
  const { data, error } = await supabase
22
    .rpc('your_stored_procedure', { param1: 'value1' });
23

24
  if (error) {
25
    console.log('Error executing RPC:', error);
26
  } else {
27
    console.log('Response:', data);
28
  }
29
}
30

31
yourStoredProcedure();
```

By using `retryOn` with a custom function, you can define specific conditions for retrying requests. In this example, the retry logic is applied only to requests targeting a specific stored procedure.

## Conclusion [\#](https://supabase.com/docs/guides/api/automatic-retries-in-supabase-js\#conclusion)

Integrating `fetch-retry` with `supabase-js` is a straightforward way to add robustness to your Supabase API requests. By handling transient errors and implementing retry strategies, you can improve the reliability of your application while maintaining a seamless user experience.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/api/automatic-retries-in-supabase-js.mdx)

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