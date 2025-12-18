---
url: "https://supabase.com/docs/guides/api/quickstart"
title: "Build an API route in less than 2 minutes. | Supabase Docs"
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

1. [REST API](https://supabase.com/docs/guides/api)
3. [Quickstart](https://supabase.com/docs/guides/api/quickstart)

# Build an API route in less than 2 minutes.

## Create your first API route by creating a table called `todos` to store tasks.

* * *

Let's create our first REST route which we can query using `cURL` or the browser.

We'll create a database table called `todos` for storing tasks. This creates a corresponding API route `/rest/v1/todos` which can accept `GET`, `POST`, `PATCH`, & `DELETE` requests.

1

### Set up a Supabase project with a 'todos' table

[Create a new project](https://supabase.com/dashboard) in the Supabase Dashboard.

After your project is ready, create a table in your Supabase database. You can do this with either the Table interface or the [SQL Editor](https://supabase.com/dashboard/project/_/sql).

SQLDashboard

```
1
-- Create a table called "todos"
2
-- with a column to store tasks.
3
create table todos (
4
  id serial primary key,
5
  task text
6
);
```

2

### Allow public access

Let's turn on Row Level Security for this table and allow public access.

```
1
-- Turn on security
2
alter table "todos"
3
enable row level security;
4

5
-- Allow anonymous access
6
create policy "Allow public access"
7
  on todos
8
  for select
9
  to anon
10
  using (true);
```

3

### Insert some dummy data

Now we can add some data to our table which we can access through our API.

```
1
insert into todos (task)
2
values
3
  ('Create tables'),
4
  ('Enable security'),
5
  ('Add data'),
6
  ('Fetch data from the API');
```

4

### Fetch the data

Find your API URL and Keys in your Dashboard [API Settings](https://supabase.com/dashboard/project/_/settings/api). You can now query your "todos" table by appending `/rest/v1/todos` to the API URL.

Copy this block of code, substitute `<PROJECT_REF>` and `<ANON_KEY>`, then run it from a terminal.

```
1
curl 'https://<PROJECT_REF>.supabase.co/rest/v1/todos' \
2
-H "apikey: <ANON_KEY>" \
3
-H "Authorization: Bearer <ANON_KEY>"
```

## Bonus [\#](https://supabase.com/docs/guides/api/quickstart\#bonus)

There are several options for accessing your data:

### Browser [\#](https://supabase.com/docs/guides/api/quickstart\#browser)

You can query the route in your browser, by appending the `anon` key as a query parameter:

`https://<PROJECT_REF>.supabase.co/rest/v1/todos?apikey=<ANON_KEY>`

### Client libraries [\#](https://supabase.com/docs/guides/api/quickstart\#client-libraries)

We provide a number of [Client Libraries](https://github.com/supabase/supabase#client-libraries).

JavaScriptDartPythonSwift

```
1
const { data, error } = await supabase.from('todos').select()
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/api/quickstart.mdx)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)