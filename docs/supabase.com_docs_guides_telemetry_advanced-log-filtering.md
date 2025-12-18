---
url: "https://supabase.com/docs/guides/telemetry/advanced-log-filtering"
title: "Advanced Log Filtering | Supabase Docs"
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

Telemetry

1. [Telemetry](https://supabase.com/docs/guides/telemetry)
3. Logging & observability
5. [Advanced log filtering](https://supabase.com/docs/guides/telemetry/advanced-log-filtering)

# Advanced Log Filtering

* * *

# Querying the logs

## Understanding field references [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#understanding-field-references)

The log tables are queried with a subset of BigQuery SQL syntax. They all have three columns: `event_message`, `timestamp`, and `metadata`.

| column | description |
| --- | --- |
| timestamp | time event was recorded |
| event\_message | the log's message |
| metadata | information about the event |

The `metadata` column is an array of JSON objects that stores important details about each recorded event. For example, in the Postgres table, the `metadata.parsed.error_severity` field indicates the error level of an event. To work with its values, you need to `unnest` them using a `cross join`.

This approach is commonly used with JSON and array columns, so it might look a bit unfamiliar if you're not used to working with these data types.

```
1
select
2
  event_message,
3
  parsed.error_severity,
4
  parsed.user_name
5
from
6
  postgres_logs
7
  -- extract first layer
8
  cross join unnest(postgres_logs.metadata) as metadata
9
  -- extract second layer
10
  cross join unnest(metadata.parsed) as parsed;
```

## Expanding results [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#expanding-results)

Logs returned by queries may be difficult to read in table format. A row can be double-clicked to expand the results into more readable JSON:

![Expanding log results](https://supabase.com/docs/img/guides/platform/expanded-log-results.png)

## Filtering with [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#filtering-with-regular-expressions)

The Logs use BigQuery Style regular expressions with the [regexp\_contains function](https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions#regexp_contains). In its most basic form, it will check if a string is present in a specified column.

```
1
select
2
  cast(timestamp as datetime) as timestamp,
3
  event_message,
4
  metadata
5
from postgres_logs
6
where regexp_contains(event_message, 'is present');
```

There are multiple operators that you should consider using:

### Find messages that start with a phrase [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#find-messages-that-start-with-a-phrase)

`^` only looks for values at the start of a string

```
1
-- find only messages that start with connection
2
regexp_contains(event_message, '^connection')
```

### Find messages that end with a phrase: [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#find-messages-that-end-with-a-phrase)

`$` only looks for values at the end of the string

```
1
-- find only messages that ends with port=12345
2
regexp_contains(event_message, '$port=12345')
```

### Ignore case sensitivity: [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#ignore-case-sensitivity)

`(?i)` ignores capitalization for all proceeding characters

```
1
-- find all event_messages with the word "connection"
2
regexp_contains(event_message, '(?i)COnnecTion')
```

### Wildcards: [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#wildcards)

`.` can represent any string of characters

```
1
-- find event_messages like "hello<anything>world"
2
regexp_contains(event_message, 'hello.world')
```

### Alphanumeric ranges: [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#alphanumeric-ranges)

`[1-9a-zA-Z]` finds any strings with only numbers and letters

```
1
-- find event_messages that contain a number between 1 and 5 (inclusive)
2
regexp_contains(event_message, '[1-5]')
```

### Repeated values: [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#repeated-values)

`x*` zero or more x
`x+` one or more x
`x?` zero or one x
`x{4,}` four or more x
`x{3}` exactly 3 x

```
1
-- find event_messages that contains any sequence of 3 digits
2
regexp_contains(event_message, '[0-9]{3}')
```

### Escaping reserved characters: [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#escaping-reserved-characters)

`\.` interpreted as period `.` instead of as a wildcard

```
1
-- escapes .
2
regexp_contains(event_message, 'hello world\.')
```

### `or` statements: [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#or-statements)

`x|y` any string with `x` or `y` present

```
1
-- find event_messages that have the word 'started' followed by either the word "host" or "authenticated"
2
regexp_contains(event_message, 'started host|authenticated')
```

### `and`/`or`/`not` statements in SQL: [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#and--or--not-statements-in-sql)

`and`, `or`, and `not` are all native terms in SQL and can be used in conjunction with regular expressions to filter results

```
1
select
2
  cast(timestamp as datetime) as timestamp,
3
  event_message,
4
  metadata
5
from postgres_logs
6
where
7
  (regexp_contains(event_message, 'connection') and regexp_contains(event_message, 'host'))
8
  or not regexp_contains(event_message, 'received');
```

### Filtering and unnesting example [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#filtering-and-unnesting-example)

**Filter for Postgres**

```
1
select
2
  cast(postgres_logs.timestamp as datetime) as timestamp,
3
  parsed.error_severity,
4
  parsed.user_name,
5
  event_message
6
from
7
  postgres_logs
8
  cross join unnest(metadata) as metadata
9
  cross join unnest(metadata.parsed) as parsed
10
where regexp_contains(parsed.error_severity, 'ERROR|FATAL|PANIC')
11
order by timestamp desc
12
limit 100;
```

## Limitations [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#limitations)

### Log tables cannot be joined together [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#log-tables-cannot-be-joined-together)

Each product table operates independently without the ability to join with other log tables. This may change in the future.

### The `with` keyword and subqueries are not supported [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#the-with-keyword-and-subqueries-are-not-supported)

The parser does not yet support `with` and subquery statements.

### The `ilike` and `similar to` keywords are not supported [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#the-ilike-and-similar-to-keywords-are-not-supported)

Although `like` and other comparison operators can be used, `ilike` and `similar to` are incompatible with BigQuery's variant of SQL. `regexp_contains` can be used as an alternative.

### The wildcard operator `*` to select columns is not supported [\#](https://supabase.com/docs/guides/telemetry/advanced-log-filtering\#the-wildcard-operator--to-select-columns-is-not-supported)

The log parser is not able to parse the `*` operator for column selection. Instead, you can access all fields from the `metadata` column:

```
1
select
2
  cast(postgres_logs.timestamp as datetime) as timestamp,
3
  event_message,
4
  metadata
5
from
6
  <log_table_name>
7
order by timestamp desc
8
limit 100;
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/telemetry/advanced-log-filtering.mdx)

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