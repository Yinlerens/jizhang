---
url: "https://supabase.com/docs/guides/local-development/managing-config"
title: "Managing config and secrets | Supabase Docs"
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

[Local Dev / CLI](https://supabase.com/docs/guides/local-development)

[Overview](https://supabase.com/docs/guides/local-development)

CLI[Getting started](https://supabase.com/docs/guides/local-development/cli/getting-started)
[Configuration](https://supabase.com/docs/guides/local-development/cli/config)
[CLI commands](https://supabase.com/docs/reference/cli)

Local development[Getting started](https://supabase.com/docs/guides/local-development/overview)
[Declarative database schemas](https://supabase.com/docs/guides/local-development/declarative-database-schemas)
[Seeding your database](https://supabase.com/docs/guides/local-development/seeding-your-database)
[Managing config and secrets](https://supabase.com/docs/guides/local-development/managing-config)
[Restoring downloaded backup](https://supabase.com/docs/guides/local-development/restoring-downloaded-backup)
[Customizing email templates](https://supabase.com/docs/guides/local-development/customizing-email-templates)

Testing[Getting started](https://supabase.com/docs/guides/local-development/testing/overview)
[pgTAP advanced guide](https://supabase.com/docs/guides/local-development/testing/pgtap-extended)
[Database testing](https://supabase.com/docs/guides/database/testing)
[RLS policies testing](https://supabase.com/docs/guides/database/extensions/pgtap#testing-rls-policies)

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

Local Development

1. [Local Dev / CLI](https://supabase.com/docs/guides/local-development)
3. Local development
5. [Managing config and secrets](https://supabase.com/docs/guides/local-development/managing-config)

# Managing config and secrets

* * *

The Supabase CLI uses a `config.toml` file to manage local configuration. This file is located in the `supabase` directory of your project.

## Config reference [\#](https://supabase.com/docs/guides/local-development/managing-config\#config-reference)

The `config.toml` file is automatically created when you run `supabase init`.

There are a wide variety of options available, which can be found in the [CLI Config Reference](https://supabase.com/docs/guides/cli/config).

For example, to enable the "Apple" OAuth provider for local development, you can append the following information to `config.toml`:

```
1
[auth.external.apple]
2
enabled = false
3
client_id = ""
4
secret = ""
5
redirect_uri = "" # Overrides the default auth redirectUrl.
```

## Using secrets inside config.toml [\#](https://supabase.com/docs/guides/local-development/managing-config\#using-secrets-inside-configtoml)

You can reference environment variables within the `config.toml` file using the `env()` function. This will detect any values stored in an `.env` file at the root of your project directory. This is particularly useful for storing sensitive information like API keys, and any other values that you don't want to check into version control.

```
1
.
2
├── .env
3
├── .env.example
4
└── supabase
5
    └── config.toml
```

Do NOT commit your `.env` into git. Be sure to configure your `.gitignore` to exclude this file.

For example, if your `.env` contained the following values:

```
1
GITHUB_CLIENT_ID=""
2
GITHUB_SECRET=""
```

Then you would reference them inside of our `config.toml` like this:

```
1
[auth.external.github]
2
enabled = true
3
client_id = "env(GITHUB_CLIENT_ID)"
4
secret = "env(GITHUB_SECRET)"
5
redirect_uri = "" # Overrides the default auth redirectUrl.
```

### Going further [\#](https://supabase.com/docs/guides/local-development/managing-config\#going-further)

For more advanced secrets management workflows, including:

- **Using dotenvx for encrypted secrets**: Learn how to securely manage environment variables across different branches and environments
- **Branch-specific secrets**: Understand how to manage secrets for different deployment environments
- **Encrypted configuration values**: Use encrypted values directly in your `config.toml`

See the [Managing secrets for branches](https://supabase.com/docs/guides/deployment/branching#managing-secrets-for-branches) section in our branching documentation, or check out the [dotenvx example repository](https://github.com/supabase/supabase/blob/master/examples/slack-clone/nextjs-slack-clone-dotenvx/README.md) for a complete implementation.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/local-development/managing-config.mdx)

### Is this helpful?

NoYes

### On this page

[Config reference](https://supabase.com/docs/guides/local-development/managing-config#config-reference) [Using secrets inside config.toml](https://supabase.com/docs/guides/local-development/managing-config#using-secrets-inside-configtoml) [Going further](https://supabase.com/docs/guides/local-development/managing-config#going-further)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)