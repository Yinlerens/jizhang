---
url: "https://supabase.com/docs/guides/local-development"
title: "Local Development & CLI | Supabase Docs"
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

Local Development

1. [Local Dev / CLI](https://supabase.com/docs/guides/local-development)
3. [Overview](https://supabase.com/docs/guides/local-development)

# Local Development & CLI

## Learn how to develop locally and use the Supabase CLI

* * *

Develop locally while running the Supabase stack on your machine.

As a prerequisite, you must install a container runtime compatible with Docker APIs.

- [Docker Desktop](https://docs.docker.com/desktop/) (macOS, Windows, Linux)
- [Rancher Desktop](https://rancherdesktop.io/) (macOS, Windows, Linux)
- [Podman](https://podman.io/) (macOS, Windows, Linux)
- [OrbStack](https://orbstack.dev/) (macOS)

## Quickstart [\#](https://supabase.com/docs/guides/local-development\#quickstart)

1. Install the Supabase CLI:



npmyarnpnpmbrew







```
1
npm install supabase --save-dev
```

2. In your repo, initialize the Supabase project:



npmyarnpnpmbrew







```
1
npx supabase init
```

3. Start the Supabase stack:



npmyarnpnpmbrew







```
1
npx supabase start
```

4. View your local Supabase instance at [http://localhost:54323](http://localhost:54323/).


If your local development machine is connected to an untrusted public network, you should create a separate docker network and bind to 127.0.0.1 before starting the local development stack. This restricts network access to only your localhost machine.

```
1
docker network create -o 'com.docker.network.bridge.host_binding_ipv4=127.0.0.1' local-network
2
npx supabase start --network-id local-network
```

You should never expose your local development stack publicly.

## Local development [\#](https://supabase.com/docs/guides/local-development\#local-development)

Local development with Supabase allows you to work on your projects in a self-contained environment on your local machine. Working locally has several advantages:

1. Faster development: You can make changes and see results instantly without waiting for remote deployments.
2. Offline work: You can continue development even without an internet connection.
3. Cost-effective: Local development is free and doesn't consume your project's quota.
4. Enhanced privacy: Sensitive data remains on your local machine during development.
5. Easy testing: You can experiment with different configurations and features without affecting your production environment.

To get started with local development, you'll need to install the [Supabase CLI](https://supabase.com/docs/guides/local-development#cli) and Docker. The Supabase CLI allows you to start and manage your local Supabase stack, while Docker is used to run the necessary services.

Once set up, you can initialize a new Supabase project, start the local stack, and begin developing your application using local Supabase services. This includes access to a local Postgres database, Auth, Storage, and other Supabase features.

## CLI [\#](https://supabase.com/docs/guides/local-development\#cli)

The Supabase CLI is a powerful tool that enables developers to manage their Supabase projects directly from the terminal. It provides a suite of commands for various tasks, including:

- Setting up and managing local development environments
- Generating TypeScript types for your database schema
- Handling database migrations
- Managing environment variables and secrets
- Deploying your project to the Supabase platform

With the CLI, you can streamline your development workflow, automate repetitive tasks, and maintain consistency across different environments. It's an essential tool for both local development and CI/CD pipelines.

See the [CLI Getting Started guide](https://supabase.com/docs/guides/local-development/cli/getting-started) for more information.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/local-development.mdx)

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