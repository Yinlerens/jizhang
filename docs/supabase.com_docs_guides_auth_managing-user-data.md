---
url: "https://supabase.com/docs/guides/auth/managing-user-data"
title: "User Management | Supabase Docs"
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

[Auth](https://supabase.com/docs/guides/auth/managing-user-data)

[Overview](https://supabase.com/docs/guides/auth)

[Architecture](https://supabase.com/docs/guides/auth/architecture)

Getting Started[Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
[React](https://supabase.com/docs/guides/auth/quickstarts/react)
[React Native](https://supabase.com/docs/guides/auth/quickstarts/react-native)
[React Native with Expo & Social Auth](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth)

Concepts[Users](https://supabase.com/docs/guides/auth/users)
[Identities](https://supabase.com/docs/guides/auth/identities)

Sessions

Flows (How-tos)

Server-Side Rendering

[Password-based](https://supabase.com/docs/guides/auth/passwords)
[Email (Magic Link or OTP)](https://supabase.com/docs/guides/auth/auth-email-passwordless)
[Phone Login](https://supabase.com/docs/guides/auth/phone-login)

Social Login (OAuth)

Enterprise SSO

[Anonymous Sign-Ins](https://supabase.com/docs/guides/auth/auth-anonymous)
[Web3 (Ethereum or Solana)](https://supabase.com/docs/guides/auth/auth-web3)
[Mobile Deep Linking](https://supabase.com/docs/guides/auth/native-mobile-deep-linking)
[Identity Linking](https://supabase.com/docs/guides/auth/auth-identity-linking)

Multi-Factor Authentication

[Signout](https://supabase.com/docs/guides/auth/signout)

Debugging[Error Codes](https://supabase.com/docs/guides/auth/debugging/error-codes)
[Troubleshooting](https://supabase.com/docs/guides/auth/troubleshooting)

OAuth 2.1 Server[Overview](https://supabase.com/docs/guides/auth/oauth-server)
[Getting Started](https://supabase.com/docs/guides/auth/oauth-server/getting-started)
[OAuth Flows](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows)
[MCP Authentication](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication)
[Token Security & RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security)

Third-party auth[Overview](https://supabase.com/docs/guides/auth/third-party/overview)
[Clerk](https://supabase.com/docs/guides/auth/third-party/clerk)
[Firebase Auth](https://supabase.com/docs/guides/auth/third-party/firebase-auth)
[Auth0](https://supabase.com/docs/guides/auth/third-party/auth0)
[AWS Cognito (Amplify)](https://supabase.com/docs/guides/auth/third-party/aws-cognito)
[WorkOS](https://supabase.com/docs/guides/auth/third-party/workos)

Configuration[General Configuration](https://supabase.com/docs/guides/auth/general-configuration)
[Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
[Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)

Auth Hooks

[Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp)
[User Management](https://supabase.com/docs/guides/auth/managing-user-data)

Security[Password Security](https://supabase.com/docs/guides/auth/password-security)
[Rate Limits](https://supabase.com/docs/guides/auth/rate-limits)
[Bot Detection (CAPTCHA)](https://supabase.com/docs/guides/auth/auth-captcha)
[Audit Logs](https://supabase.com/docs/guides/auth/audit-logs)

JSON Web Tokens (JWT)

[JWT Signing Keys](https://supabase.com/docs/guides/auth/signing-keys)
[Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
[Column Level Security](https://supabase.com/docs/guides/database/postgres/column-level-security)
[Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)

Auth UI[Auth UI (Deprecated)](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
[Flutter Auth UI](https://supabase.com/docs/guides/auth/auth-helpers/flutter-auth-ui)

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

Auth

1. Auth
3. Configuration
5. [User Management](https://supabase.com/docs/guides/auth/managing-user-data)

# User Management

## View, delete, and export user information.

* * *

You can view your users on the [Users page](https://supabase.com/dashboard/project/_/auth/users) of the Dashboard. You can also view the contents of the Auth schema in the [Table Editor](https://supabase.com/dashboard/project/_/editor).

## Accessing user data via API [\#](https://supabase.com/docs/guides/auth/managing-user-data\#accessing-user-data-via-api)

For security, the Auth schema is not exposed in the auto-generated API. If you want to access users data via the API, you can create your own user tables in the `public` schema.

Make sure to protect the table by enabling [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security). Reference the `auth.users` table to ensure data integrity. Specify `on delete cascade` in the reference. For example, a `public.profiles` table might look like this:

```
1
create table public.profiles (
2
  id uuid not null references auth.users on delete cascade,
3
  first_name text,
4
  last_name text,
5

6
  primary key (id)
7
);
8

9
alter table public.profiles enable row level security;
```

Only use primary keys as [foreign key references](https://www.postgresql.org/docs/current/tutorial-fk.html) for schemas and tables like `auth.users` which are managed by Supabase. Postgres lets you specify a foreign key reference for columns backed by a unique index (not necessarily primary keys).

Primary keys are **guaranteed not to change**. Columns, indices, constraints or other database objects managed by Supabase **may change at any time** and you should be careful when referencing them directly.

To update your `public.profiles` table every time a user signs up, set up a trigger. If the trigger fails, it could block signups, so test your code thoroughly.

```
1
-- inserts a row into public.profiles
2
create function public.handle_new_user()
3
returns trigger
4
language plpgsql
5
security definer set search_path = ''
6
as $$
7
begin
8
  insert into public.profiles (id, first_name, last_name)
9
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
10
  return new;
11
end;
12
$$;
13

14
-- trigger the function every time a user is created
15
create trigger on_auth_user_created
16
  after insert on auth.users
17
  for each row execute procedure public.handle_new_user();
```

## Adding and retrieving user metadata [\#](https://supabase.com/docs/guides/auth/managing-user-data\#adding-and-retrieving-user-metadata)

You can assign metadata to users on sign up:

JavaScriptDartSwiftKotlin

```
1
const { data, error } = await supabase.auth.signUp({
2
  email: 'valid.email@supabase.io',
3
  password: 'example-password',
4
  options: {
5
    data: {
6
      first_name: 'John',
7
      age: 27,
8
    },
9
  },
10
})
```

User metadata is stored on the `raw_user_meta_data` column of the `auth.users` table. To view the metadata:

JavaScriptDartSwiftKotlin

```
1
const {
2
  data: { user },
3
} = await supabase.auth.getUser()
4
let metadata = user?.user_metadata
```

## Deleting users [\#](https://supabase.com/docs/guides/auth/managing-user-data\#deleting-users)

You may delete users directly or via the management console at Authentication > Users. Note that deleting a user from the `auth.users` table does not automatically sign out a user. As Supabase makes use of JSON Web Tokens (JWT), a user's JWT will remain "valid" until it has expired.

You cannot delete a user if they are the owner of any objects in Supabase Storage.

You will encounter an error when you try to delete an Auth user that owns any Storage objects. If this happens, try deleting all the objects for that user, or reassign ownership to another user.

## Exporting users [\#](https://supabase.com/docs/guides/auth/managing-user-data\#exporting-users)

As Supabase is built on top of Postgres, you can query the `auth.users` and `auth.identities` table via the `SQL Editor` tab to extract all users:

```
1
select * from auth.users;
```

You can then export the results as CSV.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/managing-user-data.mdx)

### Is this helpful?

NoYes

### On this page

[Accessing user data via API](https://supabase.com/docs/guides/auth/managing-user-data#accessing-user-data-via-api) [Adding and retrieving user metadata](https://supabase.com/docs/guides/auth/managing-user-data#adding-and-retrieving-user-metadata) [Deleting users](https://supabase.com/docs/guides/auth/managing-user-data#deleting-users) [Exporting users](https://supabase.com/docs/guides/auth/managing-user-data#exporting-users)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)