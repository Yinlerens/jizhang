---
url: "https://supabase.com/docs/guides/cron/install"
title: "Install | Supabase Docs"
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

[Cron](https://supabase.com/docs/guides/cron)

[Overview](https://supabase.com/docs/guides/cron)

Getting Started[Install](https://supabase.com/docs/guides/cron/install)
[Quickstart](https://supabase.com/docs/guides/cron/quickstart)

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

Cron

1. [Cron](https://supabase.com/docs/guides/cron)
3. Getting Started
5. [Install](https://supabase.com/docs/guides/cron/install)

# Install

* * *

Install the Supabase Cron Postgres Module to begin scheduling recurring Jobs.

DashboardSQL

1. Go to the [Cron Postgres Module](https://supabase.com/dashboard/project/_/integrations/cron/overview) under Integrations in the Dashboard.
2. Enable the `pg_cron` extension.

## Uninstall [\#](https://supabase.com/docs/guides/cron/install\#uninstall)

Uninstall Supabase Cron by disabling the `pg_cron` extension:

```
1
drop extension if exists pg_cron;
```

Disabling the `pg_cron` extension will permanently delete all Jobs.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/cron/install.mdx)

### Is this helpful?

NoYes

### On this page

[Uninstall](https://supabase.com/docs/guides/cron/install#uninstall)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)