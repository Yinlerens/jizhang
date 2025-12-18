---
url: "https://supabase.com/docs/guides/queues/expose-self-hosted-queues"
title: "Expose Queues for local and self-hosted Supabase | Supabase Docs"
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

[Queues](https://supabase.com/docs/guides/queues)

[Overview](https://supabase.com/docs/guides/queues)

Getting Started[Quickstart](https://supabase.com/docs/guides/queues/quickstart)
[Consuming Messages with Edge Functions](https://supabase.com/docs/guides/queues/consuming-messages-with-edge-functions)
[Expose Queues for local and self-hosted Supabase](https://supabase.com/docs/guides/queues/expose-self-hosted-queues)

References[API](https://supabase.com/docs/guides/queues/api)
[PGMQ Extension](https://supabase.com/docs/guides/queues/pgmq)

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

Queues

1. [Queues](https://supabase.com/docs/guides/queues)
3. Getting Started
5. [Expose Queues for local and self-hosted Supabase](https://supabase.com/docs/guides/queues/expose-self-hosted-queues)

# Expose Queues for local and self-hosted Supabase

## Learn how to expose Queues when running Supabase with Supabase CLI or Docker Compose

* * *

By default, local and self-hosted Supabase instances expose only core schemas like public and graphql\_public.
To allow client-side consumers to use your queues, you have to add `pgmq_public` schema to the list of exposed schemas.

Before continuing, complete the step [Expose queues to client-side consumers](https://supabase.com/docs/guides/queues/quickstart#expose-queues-to-client-side-consumers) from the Queues Quickstart guide. This creates the `pgmq_public` schema, which must exist before it can be exposed through the API.

You only need to expose the `pgmq_public` schema manually when running Supabase locally with the Supabase CLI or self-hosting using Docker Compose.

## Expose Queues with Supabase CLI [\#](https://supabase.com/docs/guides/queues/expose-self-hosted-queues\#expose-queues-with-supabase-cli)

When running Supabase locally with Supabase CLI, update your project's `config.toml` file.
Locate the `[api]` section and add `pgmq_public` to the list of schemas.

```
1
[api]
2
enabled = true
3
port = 54321
4
schemas = ["public", "graphql_public", "pgmq_public"]
```

Then restart your local Supabase stack.

```
1
supabase stop && supabase start
```

## Expose queues with Docker compose [\#](https://supabase.com/docs/guides/queues/expose-self-hosted-queues\#expose-queues-with-docker-compose)

When running Supabase with Docker Compose, locate the `PGRST_DB_SCHEMAS` variable inside your `.env` file and add `pgmq_public` to it. This environment variable is passed to the `rest` service inside `docker-compose.yml`.

```
1
PGRST_DB_SCHEMAS=public,graphql_public,pgmq_public
```

Restart your containers for the changes to take effect.

```
1
docker compose down
2
docker compose up -d
```

## Stop exposing queues [\#](https://supabase.com/docs/guides/queues/expose-self-hosted-queues\#stop-exposing-queues)

If you no longer want to expose the `pgmq_public` schema, you can remove it from your configuration.

- For Supabase CLI, remove `pgmq_public` from the `[api]` schemas list in your `config.toml` file.
- For Docker Compose, remove `pgmq_public` from the `PGRST_DB_SCHEMAS` variable in your `.env` file.

After updating your configuration, restart your containers for the changes to take effect.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/queues/expose-self-hosted-queues.mdx)

### Is this helpful?

NoYes

### On this page

[Expose Queues with Supabase CLI](https://supabase.com/docs/guides/queues/expose-self-hosted-queues#expose-queues-with-supabase-cli) [Expose queues with Docker compose](https://supabase.com/docs/guides/queues/expose-self-hosted-queues#expose-queues-with-docker-compose) [Stop exposing queues](https://supabase.com/docs/guides/queues/expose-self-hosted-queues#stop-exposing-queues)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)