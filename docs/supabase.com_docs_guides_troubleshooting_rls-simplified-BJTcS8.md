---
url: "https://supabase.com/docs/guides/troubleshooting/rls-simplified-BJTcS8"
title: "Supabase Docs | Troubleshooting | RLS Simplified"
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

1. [Troubleshooting](https://supabase.com/docs/guides/troubleshooting)

# RLS Simplified

Last edited: 2/21/2025

* * *

### Basic summary [\#](https://supabase.com/docs/guides/troubleshooting/rls-simplified-BJTcS8\#basic-summary)

Row-Level Security (RLS) Policy: A `WHERE` or `CHECK` condition applied automatically to database queries

Key features:

- Applies without being explicitly added to each query, which makes it good for policing row access from unknown entities, such as those leveraging the anon or authenticated roles.
- Can be set for specific actions (e.g., SELECT, INSERT)
- Can target particular database roles (e.g., "anon", "authenticated")

Contrast with regular conditions:

- Regular conditions: Apply to all roles and must be added manually to each query
- RLS policies: Applied automatically to specified actions and roles

## Hands on walk-through for conditions [\#](https://supabase.com/docs/guides/troubleshooting/rls-simplified-BJTcS8\#hands-on-walk-through-for-conditions)

### USING: [\#](https://supabase.com/docs/guides/troubleshooting/rls-simplified-BJTcS8\#using)

The `USING` keyword inspects the value of row to see if it should be made visible to the query.

When you SELECT, UPDATE, or DELETE, you have to use a WHERE statement to search for specific rows:

```
1
-- select
2
select *
3
from some_table
4
where id = 5;
5

6
-- update
7
update some_table
8
set id = 6
9
where id = 5;
10

11
-- delete
12
delete from some_table
13
where id = 6;
```

Even when you don't use a WHERE statement, there's still an implicit one:

```
1
-- ...your query
2
WHERE true;
```

The `USING` clause appends more to the WHERE statement:

```
1
-- Your Using condition
2
USING (
3
  (select auth.uid()) = user_id
4
);
5

6
-- Your query without RLS:
7
SELECT * FROM some_table
8
WHERE id = 5 OR id = 6;
9

10
-- Your query after RLS
11
SELECT * FROM some_table
12
WHERE
13
  (id = 5 OR id = 6)
14
    AND
15
  (select auth.uid()) = user_id) -- <--- added by the USING clause;
```

### WITH CHECK: [\#](https://supabase.com/docs/guides/troubleshooting/rls-simplified-BJTcS8\#with-check)

Let's say you have a profile table. Well, you don't want user's to be able to modify their user\_id when they make an insert, do you?

The `WITH CHECK` condition inspects values that are being added or modified. For INSERT you'd use it by itself. There's no need for a using clause:

```
1
-- Allow users to add to table, but make sure their user_id matches the one in their JWT:
2

3
create policy "Allow user to add posts"
4
on "public"."posts"
5
as PERMISSIVE
6
for INSERT
7
to authenticated
8
with check(
9
  (select auth.uid()) = user_id
10
);
11

12
-- Example: failing insert
13
INSERT INTO posts
14
VALUES (<false id>, <comment>);
15

16
-- Example: successful insert
17
INSERT INTO posts
18
VALUES (<real id>, <comment>);
```

INSERTs do not rely on WHERE clauses, but they can have constraints. In this case, the RLS acts as a CHECK constraint against a column, e.g.:

```
1
ALTER TABLE table_name
2
ADD CONSTRAINT constraint_name CHECK (condition);
```

What distinguishes it from normal `CHECK` constraints is that it is only activate for certain roles or methods.

### UPDATEs: [\#](https://supabase.com/docs/guides/troubleshooting/rls-simplified-BJTcS8\#updates)

UPDATE both filters for rows to change and then adds new values to the table, so it requires both USING and WITH CHECK conditions:

```
1
create policy "Allow user to edit their stuff"
2
on "public"."<SOME TABLE NAME>"
3
as RESTRICTIVE
4
for UPDATE
5
to authenticated
6
using (
7
  (select auth.uid()) = user_id
8
)
9
with check(
10
  (select auth.uid()) = user_id
11
);
```

## Metadata

* * *

### Products

[Database](https://supabase.com/docs/guides/troubleshooting?products=database) [Auth](https://supabase.com/docs/guides/troubleshooting?products=auth)

* * *

### Keywords

[rls](https://supabase.com/docs/guides/troubleshooting?tags=rls) [sql](https://supabase.com/docs/guides/troubleshooting?tags=sql) [policy](https://supabase.com/docs/guides/troubleshooting?tags=policy)

* * *

### Is this helpful?

NoYes

* * *

[View discussion on GitHub](https://github.com/orgs/supabase/discussions/29114)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)