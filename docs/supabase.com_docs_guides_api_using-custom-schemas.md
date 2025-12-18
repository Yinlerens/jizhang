---
url: "https://supabase.com/docs/guides/api/using-custom-schemas"
title: "Using Custom Schemas | Supabase Docs"
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

[Sign up](https://supabase.com/dashboard)

REST API

1. [REST API](https://supabase.com/docs/guides/api)
3. [Using the Data APIs](https://supabase.com/docs/guides/api/data-apis)
5. [Using custom schemas](https://supabase.com/docs/guides/api/using-custom-schemas)

# Using Custom Schemas

* * *

By default, your database has a `public` schema which is automatically exposed on data APIs.

## Creating custom schemas [\#](https://supabase.com/docs/guides/api/using-custom-schemas\#creating-custom-schemas)

You can create your own custom schema/s by running the following SQL, substituting `myschema` with the name you want to use for your schema:

```
1
CREATE SCHEMA myschema;
```

## Exposing custom schemas [\#](https://supabase.com/docs/guides/api/using-custom-schemas\#exposing-custom-schemas)

You can expose custom database schemas - to do so you need to follow these steps:

1. Go to [API settings](https://supabase.com/dashboard/project/_/settings/api) and add your custom schema to "Exposed schemas".
2. Run the following SQL, substituting `myschema` with your schema name:

```
1
GRANT USAGE ON SCHEMA myschema TO anon, authenticated, service_role;
2
GRANT ALL ON ALL TABLES IN SCHEMA myschema TO anon, authenticated, service_role;
3
GRANT ALL ON ALL ROUTINES IN SCHEMA myschema TO anon, authenticated, service_role;
4
GRANT ALL ON ALL SEQUENCES IN SCHEMA myschema TO anon, authenticated, service_role;
5
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA myschema GRANT ALL ON TABLES TO anon, authenticated, service_role;
6
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA myschema GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
7
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA myschema GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
```

Now you can access these schemas from data APIs:

JavaScriptDartcURL

```
1
// Initialize the JS client
2
import { createClient } from '@supabase/supabase-js'
3
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
4
  db: { schema: 'myschema' },
5
})
6

7
// Make a request
8
const { data: todos, error } = await supabase.from('todos').select('*')
9

10
// You can also change the target schema on a per-query basis
11
const { data: todos, error } = await supabase.schema('myschema').from('todos').select('*')
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/api/using-custom-schemas.mdx)

### Is this helpful?

NoYes

### On this page

[Creating custom schemas](https://supabase.com/docs/guides/api/using-custom-schemas#creating-custom-schemas) [Exposing custom schemas](https://supabase.com/docs/guides/api/using-custom-schemas#exposing-custom-schemas)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)