---
url: "https://supabase.com/docs/reference/javascript/v1/storage-from-upload"
title: "JavaScript API Reference | Supabase Docs"
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

JavaScript
v1.0

- [Introduction](https://supabase.com/docs/reference/javascript/v1/introduction)
- [Initializing](https://supabase.com/docs/reference/javascript/v1/initializing)
- [Upgrade guide](https://supabase.com/docs/reference/javascript/v1/upgrade-guide)
- * * *


Database

  - [Fetch data](https://supabase.com/docs/reference/javascript/v1/select)
  - [Insert data](https://supabase.com/docs/reference/javascript/v1/insert)
  - [Update data](https://supabase.com/docs/reference/javascript/v1/update)
  - [Upsert data](https://supabase.com/docs/reference/javascript/v1/upsert)
  - [Delete data](https://supabase.com/docs/reference/javascript/v1/delete)
  - [Call a Postgres function](https://supabase.com/docs/reference/javascript/v1/rpc)
  - Using filters

  - Using modifiers
- * * *


Auth

  - [Create a new user](https://supabase.com/docs/reference/javascript/v1/auth-signup)
  - [Listen to auth events](https://supabase.com/docs/reference/javascript/v1/auth-onauthstatechange)
  - [Sign in a user](https://supabase.com/docs/reference/javascript/v1/auth-signin)
  - [Sign out a user](https://supabase.com/docs/reference/javascript/v1/auth-signout)
  - [Send a password reset request](https://supabase.com/docs/reference/javascript/v1/auth-resetpasswordforemail)
  - [Update a user](https://supabase.com/docs/reference/javascript/v1/auth-update)
  - [Update the access token](https://supabase.com/docs/reference/javascript/v1/auth-setauth)
  - [Retrieve a user](https://supabase.com/docs/reference/javascript/v1/auth-user)
  - [Retrieve a session](https://supabase.com/docs/reference/javascript/v1/auth-session)
  - [Retrieve a user](https://supabase.com/docs/reference/javascript/v1/auth-getuser)
- * * *


Edge Functions

  - [Invokes a Supabase Edge Function.](https://supabase.com/docs/reference/javascript/v1/functions-invoke)
- * * *


Realtime

  - [Subscribe to channel](https://supabase.com/docs/reference/javascript/v1/subscribe)
  - [Remove a subscription](https://supabase.com/docs/reference/javascript/v1/removesubscription)
  - [Remove all subscriptions](https://supabase.com/docs/reference/javascript/v1/removeallsubscriptions)
  - [Retrieve subscriptions](https://supabase.com/docs/reference/javascript/v1/getsubscriptions)
- * * *


Storage

  - File Buckets



    [File Buckets](https://supabase.com/docs/reference/javascript/v1/file-buckets) - [List all buckets](https://supabase.com/docs/reference/javascript/v1/storage-listbuckets)
- [Retrieve a bucket](https://supabase.com/docs/reference/javascript/v1/storage-getbucket)
- [Create a bucket](https://supabase.com/docs/reference/javascript/v1/storage-createbucket)
- [Empty a bucket](https://supabase.com/docs/reference/javascript/v1/storage-emptybucket)
- [Update a bucket](https://supabase.com/docs/reference/javascript/v1/storage-updatebucket)
- [Delete a bucket](https://supabase.com/docs/reference/javascript/v1/storage-deletebucket)
- [Upload a file](https://supabase.com/docs/reference/javascript/v1/storage-from-upload)
- [Replace an existing file](https://supabase.com/docs/reference/javascript/v1/storage-from-update)
- [Move an existing file](https://supabase.com/docs/reference/javascript/v1/storage-from-move)
- [Copy an existing file](https://supabase.com/docs/reference/javascript/v1/storage-from-copy)
- [Create a signed URL](https://supabase.com/docs/reference/javascript/v1/storage-from-createsignedurl)
- [Create signed URLs](https://supabase.com/docs/reference/javascript/v1/storage-from-createsignedurls)
- [Retrieve public URL](https://supabase.com/docs/reference/javascript/v1/storage-from-getpublicurl)
- [Download a file](https://supabase.com/docs/reference/javascript/v1/storage-from-download)
- [Delete files in a bucket](https://supabase.com/docs/reference/javascript/v1/storage-from-remove)
- [List all files in a bucket](https://supabase.com/docs/reference/javascript/v1/storage-from-list)

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

Javascript Reference v1.0

##### Version out of date

There's a newer version of this library! Migrate to the [newest version](https://supabase.com/docs/reference/javascript).

# JavaScript Client Library

@supabase/supabase-js [View on GitHub](https://github.com/supabase/supabase-js)

This reference documents every object and method available in Supabase's isomorphic JavaScript library, supabase-js. You can use supabase-js to interact with your Postgres database, listen to database changes, invoke Deno Edge Functions, build login and user management functionality, and manage large files.

* * *

## Initializing

Create a new client for use in the browser.

### Parameters

- supabaseUrlstring



The unique Supabase URL which is supplied when you create a new project in your project dashboard.

- supabaseKeystring



The unique Supabase Key which is supplied when you create a new project in your project dashboard.

- options

Optional

SupabaseClientOptions

Details


Create ClientWith Additional ParametersAPI schemasCustom Fetch Implementation

```
1
import { createClient } from '@supabase/supabase-js'
2

3
  // Create a single supabase client for interacting with your database
4
  const supabase = createClient('https://xyzcompany.supabase.co', 'publishable-or-anon-key')
```

* * *

## Upgrade guide

supabase-js v2 focuses on "quality-of-life" improvements for developers and addresses some of the largest pain points in v1. v2 includes type support, a rebuilt Auth library with async methods, improved errors, and more.

No new features will be added to supabase-js v1 , but we'll continuing merging security fixes to v1, with maintenance patches for the next 3 months.

## Upgrade the client library [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#upgrade-the-client-library)

Install the latest version

```
1
npm install @supabase/supabase-js@2
```

_Optionally_ if you are using custom configuration with `createClient` then follow below:

BeforeAfter

```
1
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
2
  schema: 'custom',
3
  persistSession: false,
4
})
```

Read more about the [constructor options](https://supabase.com/docs/reference/javascript/release-notes#explicit-constructor-options).

### Auth methods [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#auth-methods)

The signIn() method has been deprecated in favor of more explicit method signatures to help with type hinting. Previously it was difficult for developers to know what they were missing (e.g., a lot of developers didn't realize they could use passwordless magic links).

#### Sign in with email and password [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#sign-in-with-email-and-password)

BeforeAfter

```
1
const { user, error } = await supabase
2
  .auth
3
  .signIn({ email, password })
```

#### Sign in with magic link [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#sign-in-with-magic-link)

BeforeAfter

```
1
const { error } = await supabase
2
  .auth
3
  .signIn({ email })
```

#### Sign in with a third-party provider [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#sign-in-with-a-third-party-provider)

BeforeAfter

```
1
const { error } = await supabase
2
  .auth
3
  .signIn({ provider })
```

#### Sign in with phone [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#sign-in-with-phone)

BeforeAfter

```
1
const { error } = await supabase
2
  .auth
3
  .signIn({ phone, password })
```

#### Sign in with phone using OTP [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#sign-in-with-phone-using-otp)

BeforeAfter

```
1
const { error } = await supabase
2
  .auth
3
  .api
4
  .sendMobileOTP(phone)
```

#### Reset password for email [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#reset-password-for-email)

BeforeAfter

```
1
const { data, error } = await supabase
2
  .auth
3
  .api
4
  .resetPasswordForEmail(email)
```

#### Get the user's current session [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#get-the-users-current-session)

Note that `auth.getSession` reads the auth token and the unencoded session data from the local storage medium. It _doesn't_ send a request back to the Supabase Auth server unless the local session is expired.

You should **never** trust the unencoded session data if you're writing server code, since it could be tampered with by the sender. If you need verified, trustworthy user data, call `auth.getUser` instead, which always makes a request to the Auth server to fetch trusted data.

BeforeAfter

```
1
const session = supabase.auth.session()
```

#### Get the logged-in user [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#get-the-logged-in-user)

BeforeAfter

```
1
const user = supabase.auth.user()
```

#### Update user data for a logged-in user [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#update-user-data-for-a-logged-in-user)

BeforeAfter

```
1
const { user, error } = await supabase
2
  .auth
3
  .update({ attributes })
```

#### Use a custom `access_token` JWT with Supabase [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#use-a-custom-accesstoken-jwt-with-supabase)

BeforeAfter

```
1
const { user, error } = supabase.auth.setAuth(access_token)
```

### Cookie methods [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#cookie-methods)

The cookie-related methods like `setAuthCookie` and `getUserByCookie` have been removed.

For Next.js you can use the [Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs) to help you manage cookies.
If you can't use the Auth Helpers, you can use [server-side rendering](https://supabase.com/docs/guides/auth/server-side-rendering).

Some the [PR](https://github.com/supabase/gotrue-js/pull/340) for additional background information.

### Data methods [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#data-methods)

`.insert()` / `.upsert()` / `.update()` / `.delete()` don't return rows by default: [PR](https://github.com/supabase/postgrest-js/pull/276).

Previously, these methods return inserted/updated/deleted rows by default (which caused [some confusion](https://github.com/supabase/supabase/discussions/1548)), and you can opt to not return it by specifying `returning: 'minimal'`. Now the default behavior is to not return rows. To return inserted/updated/deleted rows, add a `.select()` call at the end.

#### Insert and return data [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#insert-and-return-data)

BeforeAfter

```
1
const { data, error } = await supabase
2
  .from('my_table')
3
  .insert({ new_data })
```

#### Update and return data [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#update-and-return-data)

BeforeAfter

```
1
const { data, error } = await supabase
2
  .from('my_table')
3
  .update({ new_data })
4
  .eq('id', id)
```

#### Upsert and return data [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#upsert-and-return-data)

BeforeAfter

```
1
const { data, error } = await supabase
2
  .from('my_table')
3
  .upsert({ new_data })
```

#### Delete and return data [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#delete-and-return-data)

BeforeAfter

```
1
const { data, error } = await supabase
2
  .from('my_table')
3
  .delete()
4
  .eq('id', id)
```

### Realtime methods [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#realtime-methods)

#### Subscribe [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#subscribe)

BeforeAfter

```
1
const userListener = supabase
2
  .from('users')
3
  .on('*', (payload) => handleAllEventsPayload(payload.new))
4
  .subscribe()
```

#### Unsubscribe [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#unsubscribe)

BeforeAfter

```
1
userListener.unsubscribe()
```

* * *

## Fetch data

- By default, Supabase projects will return a maximum of 1,000 rows. This setting can be changed in Project API Settings. It's recommended that you keep it low to limit the payload size of accidental or malicious requests. You can use `range()` queries to paginate through your data.
- `select()` can be combined with [Modifiers](https://supabase.com/docs/reference/javascript/using-modifiers)
- `select()` can be combined with [Filters](https://supabase.com/docs/reference/javascript/using-filters)
- If using the Supabase hosted platform `apikey` is technically a reserved keyword, since the API gateway will pluck it out for authentication. [It should be avoided as a column name](https://github.com/supabase/supabase/issues/5465).

Getting your dataSelecting specific columnsQuery foreign tablesQuery the same foreign table multiple timesFiltering with inner joinsQuerying with count optionQuerying JSON dataReturn data as CSVAborting requests in-flight

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select()
```

* * *

## Insert data

- By default, every time you run `insert()`, the client library will make a `select` to return the full record. This is convenient, but it can also cause problems if your Policies are not configured to allow the `select` operation. If you are using Row Level Security and you are encountering problems, try setting the `returning` param to `minimal`.

Create a recordBulk createUpsert

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .insert([\
4\
    { name: 'The Shire', country_id: 554 }\
5\
  ])
```

* * *

## Update data

- `update()` should always be combined with [Filters](https://supabase.com/docs/reference/javascript/using-filters) to target the item(s) you wish to update.

Updating your dataUpdating JSON data

```
1
const { data, error } = await supabase
2
  .from('characters')
3
  .update({ name: 'Han Solo' })
4
  .match({ name: 'Han' })
```

* * *

## Upsert data

- Primary keys should be included in the data payload in order for an update to work correctly.
- Primary keys must be natural, not surrogate. There are however, [workarounds](https://github.com/PostgREST/postgrest/issues/1118) for surrogate primary keys.
- If you need to insert new data and update existing data at the same time, use [Postgres triggers](https://github.com/supabase/postgrest-js/issues/173#issuecomment-825124550).

Upsert your dataBulk Upsert your dataUpserting into tables with constraintsReturn the exact number of rows

```
1
const { data, error } = await supabase
2
  .from('messages')
3
  .upsert({ id: 3, message: 'foo', username: 'supabot' })
```

* * *

## Delete data

- `delete()` should always be combined with [filters](https://supabase.com/docs/reference/javascript/using-filters) to target the item(s) you wish to delete.
- If you use `delete()` with filters and you have [RLS](https://supabase.com/docs/learn/auth-deep-dive/auth-row-level-security) enabled, only rows visible through `SELECT` policies are deleted. Note that by default no rows are visible, so you need at least one `SELECT`/`ALL` policy that makes the rows visible.

Delete records

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .delete()
4
  .match({ id: 666 })
```

* * *

## Call a Postgres function

You can call Postgres functions as _Remote Procedure Calls_, logic in your database that you can execute from anywhere. Functions are useful when the logic rarely changes—like for password resets and updates.

```
1
create or replace function hello_world() returns text as $$
2
  select 'Hello world';
3
$$ language sql;
```

Call a Postgres function without argumentsCall a Postgres function with argumentsBulk processingCall a Postgres function with filtersCall a Postgres function with a count option

```
1
const { data, error } = await supabase
2
  .rpc('hello_world')
```

* * *

## Using filters

Filters can be used on `select()`, `update()`, and `delete()` queries.

If a Postgres function returns a table response, you can also apply filters.

### Applying Filters [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#applying-filters)

You must apply your filters to the end of your query. For example:

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .eq('name', 'The Shire')    // Correct
5

6
const { data, error } = await supabase
7
  .from('cities')
8
  .eq('name', 'The Shire')    // Incorrect
9
  .select('name, country_id')
```

### Chaining [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#chaining)

Filters can be chained together to produce advanced queries. For example:

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .gte('population', 1000)
5
  .lt('population', 10000)
```

### Conditional Chaining [\#](https://supabase.com/docs/reference/javascript/v1/storage-from-upload\#conditional-chaining)

Filters can be built up one step at a time and then executed. For example:

```
1
const filterByName = null
2
const filterPopLow = 1000
3
const filterPopHigh = 10000
4

5
let query = supabase
6
  .from('cities')
7
  .select('name, country_id')
8

9
if (filterByName)  { query = query.eq('name', filterByName) }
10
if (filterPopLow)  { query = query.gte('population', filterPopLow) }
11
if (filterPopHigh) { query = query.lt('population', filterPopHigh) }
12

13
const { data, error } = await query
```

* * *

## Column is equal to a value

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .eq('name', 'The shire')
```

* * *

## Column is not equal to a value

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .neq('name', 'The shire')
```

* * *

## Column is greater than a value

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .gt('country_id', 250)
```

* * *

## Column is greater than or equal to a value

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .gte('country_id', 250)
```

* * *

## Column is less than a value

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .lt('country_id', 250)
```

* * *

## Column is less than or equal to a value

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .lte('country_id', 250)
```

* * *

## Column matches a pattern

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .like('name', '%la%')
```

* * *

## Column matches a case-insensitive pattern

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .ilike('name', '%la%')
```

* * *

## Column is a value

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .is('name', null)
```

* * *

## Column is in an array

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('characters')
3
  .select('name, book_id')
4
  .in('name', ['Harry', 'Hermione'])
```

* * *

## Column contains every element in a value

- `.contains()` can work on array columns or range columns. It is very useful for finding rows where a tag array contains all the values in the filter array.



```
1
.contains('arraycol',["a","b"]) // You can use a javascript array for an array column
2
.contains('arraycol','{"a","b"}') // You can use a string with Postgres array {} for array column.
3
.contains('rangecol','(1,2]') // Use Postgres range syntax for range column.
4
.contains('rangecol',`(${arr}]`) // You can insert an array into a string.
```


With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('countries')
3
  .select('name, id, main_exports')
4
  .contains('main_exports', ['oil'])
```

* * *

## Contained by value

- `.containedBy()` can work on array columns or range columns.



```
1
.containedBy('arraycol',["a","b"]) // You can use a javascript array for an array column
2
.containedBy('arraycol','{"a","b"}') // You can use a string with Postgres array {} for array column.
3
.containedBy('rangecol','(1,2]') // Use Postgres range syntax for range column.
4
.containedBy('rangecol',`(${arr}]`) // You can insert an array into a string.
```


With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('countries')
3
  .select('name, id, main_exports')
4
  .containedBy('main_exports', ['cars', 'food', 'machine'])
```

* * *

## Greater than a range

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('countries')
3
  .select('name, id, population_range_millions')
4
  .rangeGt('population_range_millions', '[150, 250]')
```

* * *

## Greater than or equal to a range

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('countries')
3
  .select('name, id, population_range_millions')
4
  .rangeGte('population_range_millions', '[150, 250]')
```

* * *

## Less than or equal to a range

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('countries')
3
  .select('name, id, population_range_millions')
4
  .rangeLt('population_range_millions', '[150, 250]')
```

* * *

## Mutually exclusive to a range

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('countries')
3
  .select('name, id, population_range_millions')
4
  .rangeAdjacent('population_range_millions', '[70, 185]')
```

* * *

## With a common element

- `.overlaps()` can work on array columns or range columns.



```
1
.overlaps('arraycol',["a","b"]) // You can use a javascript array for an array column
2
.overlaps('arraycol','{"a","b"}') // You can use a string with Postgres array {} for array column.
3
.overlaps('rangecol','(1,2]') // Use Postgres range syntax for range column.
4
.overlaps('rangecol',`(${arr}]`)  // You can insert an array into a string.
```


With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('countries')
3
  .select('name, id, main_exports')
4
  .overlaps('main_exports', ['computers', 'minerals'])
```

* * *

## Match a string

Text searchBasic normalizationFull normalizationWebsearch

```
1
const { data, error } = await supabase
2
  .from('quotes')
3
  .select('catchphrase')
4
  .textSearch('catchphrase', `'fat' & 'cat'`, {
5
    config: 'english'
6
  })
```

* * *

## Match an associated value

With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('characters')
3
  .select('name, book_id')
4
  .match({name: 'Harry', book_id: 156})
```

* * *

## Don't match the filter

- `.not()` expects you to use the raw [PostgREST syntax](https://postgrest.org/en/stable/api.html#horizontal-filtering-rows) for the filter names and values.



```
1
.not('name','eq','Luke')
2
    .not('arraycol','cs','{"a","b"}') // Use Postgres array {} for array column and 'cs' for contains.
3
    .not('rangecol','cs','(1,2]') // Use Postgres range syntax for range column.
4
    .not('id','in','(6,7)')  // Use Postgres list () for in filter.
5
    .not('id','in',`(${arr})`)  // You can insert a javascript array.
```


With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`

```
1
const { data, error } = await supabase
2
  .from('countries')
3
  .select('name, country_id')
4
  .not('name', 'eq', 'The Shire')
```

* * *

## Match at least one filter

- `.or()` expects you to use the raw [PostgREST syntax](https://postgrest.org/en/stable/api.html#horizontal-filtering-rows) for the filter names and values.



```
1
.or('id.in.(6,7), arraycol.cs.{"a","b"}')  // Use Postgres list () for in filter. Array {} for array column and 'cs' for contains.
2
.or(`id.in.(${arrList}),arraycol.cs.{${arr}}`)	// You can insert a javascipt array for list or array on array column.
3
.or(`id.in.(${arrList}),rangecol.cs.[${arrRange})`)	// You can insert a javascipt array for list or range on a range column.\
```\
\
\
With \`select()\`Use \`or\` with \`and\`Use \`or\` on foreign tables\
\
```\
1\
const { data, error } = await supabase\
2\
  .from('cities')\
3\
  .select('name, country_id')\
4\
  .or('id.eq.20,id.eq.30')\
```\
\
* * *\
\
## Match the filter\
\
- `.filter()` expects you to use the raw [PostgREST syntax](https://postgrest.org/en/stable/api.html#horizontal-filtering-rows) for the filter names and values, so it should only be used as an escape hatch in case other filters don't work.\
\
\
\
```\
1\
.filter('arraycol','cs','{"a","b"}') // Use Postgres array {} for array column and 'cs' for contains.\
2\
    .filter('rangecol','cs','(1,2]') // Use Postgres range syntax for range column.
3
    .filter('id','in','(6,7)')  // Use Postgres list () for in filter.
4
    .filter('id','in',`(${arr})`)  // You can insert a javascript array.
```


With \`select()\`With \`update()\`With \`delete()\`With \`rpc()\`Filter embedded resources

```
1
const { data, error } = await supabase
2
  .from('characters')
3
  .select('name, book_id')
4
  .filter('name', 'in', '("Harry","Hermione")')
```

* * *

## Using modifiers

Modifiers can be used on `select()` queries.

If a Postgres function returns a table response, you can also apply modifiers to the `rpc()` function.

* * *

## Order the results

With \`select()\`With embedded resourcesOrdering multiple columns

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .order('id', { ascending: false })
```

* * *

## Limit the number of rows returned

With \`select()\`With embedded resources

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .limit(1)
```

* * *

## Limit the query to a range

With \`select()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .range(0,3)
```

* * *

## Retrieve one row of data

With \`select()\`

```
1
const { data, error } = await supabase
2
  .from('cities')
3
  .select('name, country_id')
4
  .limit(1)
5
  .single()
```

* * *

## Retrieve zero or one row of data

With \`select()\`

```
1
const { data, error } = await supabase
2
  .from('instruments')
3
  .select('name, section_id')
4
  .eq('name', 'violin')
5
  .maybeSingle()
```

* * *

## Create a new user

- By default, the user will need to verify their email address before logging in. If you would like to change this, you can disable "Email Confirmations" by going to Authentication -> Settings on [supabase.com/dashboard](https://supabase.com/dashboard)
- If "Email Confirmations" is turned on, a `user` is returned but `session` will be null
- If "Email Confirmations" is turned off, both a `user` and a `session` will be returned
- When the user confirms their email address, they will be redirected to localhost:3000 by default. To change this, you can go to Authentication -> Settings on [supabase.com/dashboard](https://supabase.com/dashboard)
- If signUp() is called for an existing confirmed user:
  - If "Enable email confirmations" is enabled on the "Authentication" -> "Settings" page, an obfuscated / fake user object will be returned.
  - If "Enable email confirmations" is disabled, an error with a message "User already registered" will be returned.
- To check if a user already exists, refer to getUser().

Sign up.Sign up with additional user meta data.Sign up with third-party providers.Sign up with Phone.

```
1
const { user, session, error } = await supabase.auth.signUp({
2
  email: 'example@email.com',
3
  password: 'example-password',
4
})
```

* * *

## Listen to auth events

Listen to auth changesListen to sign inListen to sign outListen to token refreshListen to user updatesListen to user deletedListen to password recovery events

```
1
supabase.auth.onAuthStateChange((event, session) => {
2
  console.log(event, session)
3
})
```

* * *

## Sign in a user

- A user can sign up either via email or OAuth.
- If you provide `email` without a `password`, the user will be sent a magic link.
- The magic link's destination URL is determined by the SITE\_URL config variable. To change this, you can go to Authentication -> Settings on [supabase.com/dashboard](https://supabase.com/dashboard)
- Specifying a `provider` will open the browser to the relevant login page.

Sign in with email and passwordSign in with magic link.Sign in using third-party providers.Sign in with phone and passwordSign in using a third-party provider with redirectSign in with scopesSign in using a refresh token (e.g. in React Native).

```
1
const { user, session, error } = await supabase.auth.signIn({
2
  email: 'example@email.com',
3
  password: 'example-password',
4
})
```

* * *

## Sign out a user

Sign out

```
1
const { error } = await supabase.auth.signOut()
```

* * *

## Send a password reset request

Sends a password reset request to an email address.

- When the user clicks the reset link in the email they are redirected back to your application. You can configure the URL that the user is redirected to via the `redirectTo` param. See [redirect URLs and wildcards](https://supabase.com/docs/guides/auth/overview#redirect-urls-and-wildcards) to add additional redirect URLs to your project.
- After the user has been redirected successfully, prompt them for a new password and call `updateUser()`:

```
1
const { data, error } = await supabase.auth.update({
2
  password: new_password,
3
})
```

Reset passwordReset password (React)

```
1
const { data, error } = await supabase.auth.api.resetPasswordForEmail(
2
  email,
3
  { redirectTo: 'https://example.com/update-password' }
4
)
```

* * *

## Update a user

User email: By Default, email updates sends a confirmation link to both the user's current and new email. To only send a confirmation link to the user's new email, disable **Secure email change** in your project's [email auth provider settings](https://supabase.com/dashboard/project/_/auth/providers).

User metadata: It's generally better to store user data in a table within your public schema (i.e., `public.users`). Use the `update()` method if you have data which rarely changes or is specific only to the logged in user.

Update the email for an authenticated userUpdate the password for an authenticated userUpdate the user's metadata

```
1
const { user, error } = await supabase.auth.update({email: 'new@email.com'})
```

Notes

* * *

## Update the access token

Basic example.With Express.

```
1
function apiFunction(req, res) {
2
  // Assuming the access token was sent as a header "X-Supabase-Auth"
3
  const { access_token } = req.get('X-Supabase-Auth')
4

5
  // You can now use it within a Supabase Client
6
  const supabase = createClient("https://xyzcompany.supabase.co", "publishable-or-anon-key")
7
  const { user, error } = supabase.auth.setAuth(access_token)
8

9
  // This client will now send requests as this user
10
  const { data } = await supabase.from('your_table').select()
11
}
```

Notes

* * *

## Retrieve a user

This method gets the user object from memory.

Get the logged in user

```
1
const user = supabase.auth.user()
```

* * *

## Retrieve a session

Get the session data

```
1
const session = supabase.auth.session()
```

* * *

## Retrieve a user

- Fetches the user object from the database instead of local storage.
- Note that user() fetches the user object from local storage which might not be the most updated.
- Requires the user's access\_token.

Fetch the user object using the access\_token jwt.

```
1
const { user, error } = await supabase.auth.api.getUser(
2
  'ACCESS_TOKEN_JWT',
3
)
```

* * *

## Invokes a Supabase Edge Function.

`invoke(functionName, options)`

Invokes a function

Invokes a Supabase Edge Function.

- Requires an Authorization header.
- Invoke params generally match the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) spec.

### Parameters

- functionNamestring



The name of the Function to invoke.

- optionsFunctionInvokeOptions



Options for invoking the Function.



Details


### Return Type

Promise<One of the following options>

Details

- Option 1FunctionsResponseSuccess

- Option 2FunctionsResponseFailure


Basic invocation.Specifying response type.Passing custom headers.

```
1
const { data, error } = await supabase.functions.invoke('hello', {
2
  body: JSON.stringify({ foo: 'bar' })
3
})
```

* * *

## Subscribe to channel

- Realtime is disabled by default for new Projects for better database performance and security. You can turn it on by [managing replication](https://supabase.com/docs/guides/database/api#managing-realtime).
- If you want to receive the "previous" data for updates and deletes, you will need to set `REPLICA IDENTITY` to `FULL`, like this: `ALTER TABLE your_table REPLICA IDENTITY FULL;`

Listen to all database changesListen to a specific tableListen to insertsListen to updatesListen to deletesListen to multiple eventsListen to row level changes

```
1
const mySubscription = supabase
2
  .from('*')
3
  .on('*', payload => {
4
    console.log('Change received!', payload)
5
  })
6
  .subscribe()
```

* * *

## Remove a subscription

- Removing subscriptions is a great way to maintain the performance of your project's database. Supabase will automatically handle cleanup 30 seconds after a user is disconnected, but unused subscriptions may cause degradation as more users are simultaneously subscribed.

Remove a subscription

```
1
supabase.removeSubscription(mySubscription)
```

* * *

## Remove all subscriptions

- Removing subscriptions is a great way to maintain the performance of your project's database. Supabase will automatically handle cleanup 30 seconds after a user is disconnected, but unused subscriptions may cause degradation as more users are simultaneously subscribed.

Removes all subscriptions

```
1
supabase.removeAllSubscriptions()
```

* * *

## Retrieve subscriptions

Get all subscriptions

```
1
const subscriptions = supabase.getSubscriptions()
```

* * *

## File Buckets

This section contains methods for working with File Buckets.

* * *

## List all buckets

- Policy permissions required:
  - `buckets` permissions: `select`
  - `objects` permissions: none

List buckets

```
1
const { data, error } = await supabase
2
  .storage
3
  .listBuckets()
```

* * *

## Retrieve a bucket

- Policy permissions required:
  - `buckets` permissions: `select`
  - `objects` permissions: none

Get bucket

```
1
const { data, error } = await supabase
2
  .storage
3
  .getBucket('avatars')
```

* * *

## Create a bucket

- Policy permissions required:
  - `buckets` permissions: `insert`
  - `objects` permissions: none

Create bucket

```
1
const { data, error } = await supabase
2
  .storage
3
  .createBucket('avatars', { public: false })
```

* * *

## Empty a bucket

- Policy permissions required:
  - `buckets` permissions: `select`
  - `objects` permissions: `select` and `delete`

Empty bucket

```
1
const { data, error } = await supabase
2
  .storage
3
  .emptyBucket('avatars')
```

* * *

## Update a bucket

- Policy permissions required:
  - `buckets` permissions: `update`
  - `objects` permissions: none

Update bucket

```
1
const { data, error } = await supabase
2
  .storage
3
  .updateBucket('avatars', { public: false })
```

* * *

## Delete a bucket

- Policy permissions required:
  - `buckets` permissions: `select` and `delete`
  - `objects` permissions: none

Delete bucket

```
1
const { data, error } = await supabase
2
  .storage
3
  .deleteBucket('avatars')
```

* * *

## Upload a file

- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: `insert`
- For React Native, using either `Blob`, `File` or `FormData` does not work as intended. Upload file using `ArrayBuffer` from base64 file data instead, see example below.

Upload fileUpload file using \`ArrayBuffer\` from base64 file data

```
1
const avatarFile = event.target.files[0]
2
const { data, error } = await supabase
3
  .storage
4
  .from('avatars')
5
  .upload('public/avatar1.png', avatarFile, {
6
    cacheControl: '3600',
7
    upsert: false
8
  })
```

* * *

## Replace an existing file

- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: `update` and `select`
- For React Native, using either `Blob`, `File` or `FormData` does not work as intended. Update file using `ArrayBuffer` from base64 file data instead, see example below.

Update fileUpdate file using \`ArrayBuffer\` from base64 file data

```
1
const avatarFile = event.target.files[0]
2
const { data, error } = await supabase
3
  .storage
4
  .from('avatars')
5
  .update('public/avatar1.png', avatarFile, {
6
    cacheControl: '3600',
7
    upsert: false
8
  })
```

* * *

## Move an existing file

- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: `update` and `select`

Move file

```
1
const { data, error } = await supabase
2
  .storage
3
  .from('avatars')
4
  .move('public/avatar1.png', 'private/avatar2.png')
```

* * *

## Copy an existing file

- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: `insert` and `select`

Copy file

```
1
const { data, error } = await supabase
2
  .storage
3
  .from('avatars')
4
  .copy('public/avatar1.png', 'private/avatar2.png')
```

* * *

## Create a signed URL

- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: `select`

Create Signed URL

```
1
const { signedURL, error } = await supabase
2
  .storage
3
  .from('avatars')
4
  .createSignedUrl('folder/avatar1.png', 60)
```

* * *

## Create signed URLs

- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: `select`

Create Signed URLs

```
1
const { data, error } = await supabase
2
  .storage
3
  .from('avatars')
4
  .createSignedUrls(['folder/avatar1.png', 'folder/avatar2.png'], 60)
```

* * *

## Retrieve public URL

- The bucket needs to be set to public, either via [updateBucket()](https://supabase.com/docs/reference/javascript/storage-updatebucket) or by going to Storage on [supabase.com/dashboard](https://supabase.com/dashboard), clicking the overflow menu on a bucket and choosing "Make public"
- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: none

Returns the URL for an asset in a public bucket

```
1
const { publicURL, error } = supabase
2
  .storage
3
  .from('public-bucket')
4
  .getPublicUrl('folder/avatar1.png')
```

* * *

## Download a file

- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: `select`

Download file

```
1
const { data, error } = await supabase
2
  .storage
3
  .from('avatars')
4
  .download('folder/avatar1.png')
```

* * *

## Delete files in a bucket

- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: `delete` and `select`

Delete file

```
1
const { data, error } = await supabase
2
  .storage
3
  .from('avatars')
4
  .remove(['folder/avatar1.png'])
```

* * *

## List all files in a bucket

- Policy permissions required:
  - `buckets` permissions: none
  - `objects` permissions: `select`

List files in a bucketSearch files in a bucket

```
1
const { data, error } = await supabase
2
  .storage
3
  .from('avatars')
4
  .list('folder', {
5
    limit: 100,
6
    offset: 0,
7
    sortBy: { column: 'name', order: 'asc' },
8
  })
```

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)