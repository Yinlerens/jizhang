---
url: "https://supabase.com/docs/guides/troubleshooting/migrating-auth-users-between-projects"
title: "Supabase Docs | Troubleshooting | Migrating Auth Users Between Supabase Projects"
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

1. [Troubleshooting](https://supabase.com/docs/guides/troubleshooting)

# Migrating Auth Users Between Supabase Projects

Last edited: 9/9/2025

* * *

You can migrate all tables in the auth schema—including users and their hashed passwords—from one Supabase project to another. This means users do not need to reset or recreate their passwords after migration.

## Important: JWT secret and token validity [\#](https://supabase.com/docs/guides/troubleshooting/migrating-auth-users-between-projects\#important-jwt-secret-and-token-validity)

Each project is provisioned with a unique JWT secret used to sign and verify auth tokens. This has two key implications:

- If the JWT secret is different in the new project, existing tokens will become invalid, and users will be required to log in again to get new tokens.
- If you reuse the original JWT secret in the new project, existing tokens will remain valid and users will not need to re-authenticate.

You can configure a custom JWT secret in the new project by going to:
[Settings > API > JWT Secret](https://supabase.com/dashboard/project/_/settings/api)

Note: Updating the JWT secret will regenerate your anon and service\_role API keys in the new project.

## How to migrate Auth data [\#](https://supabase.com/docs/guides/troubleshooting/migrating-auth-users-between-projects\#how-to-migrate-auth-data)

We don’t currently provide a one-size-fits-all script for migrating only the auth schema, but the process is covered in our general migration guide. You can use either:

- A full .backup file from the dashboard, or
- SQL export/import via the Supabase CLI (e.g., pg\_dump and psql)

[View Full Migration Guide](https://supabase.com/docs/guides/platform/migrating-within-supabase)

## Metadata

* * *

### Products

[Auth](https://supabase.com/docs/guides/troubleshooting?products=auth)

* * *

### Keywords

[migration](https://supabase.com/docs/guides/troubleshooting?tags=migration) [users](https://supabase.com/docs/guides/troubleshooting?tags=users)

* * *

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