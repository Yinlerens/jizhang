---
url: "https://supabase.com/docs/guides/local-development/cli/getting-started"
title: "Supabase CLI | Supabase Docs"
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
3. CLI
5. [Getting started](https://supabase.com/docs/guides/local-development/cli/getting-started)

# Supabase CLI

## Develop locally, deploy to the Supabase Platform, and set up CI/CD workflows

* * *

The Supabase CLI enables you to run the entire Supabase stack locally, on your machine or in a CI environment. With just two commands, you can set up and start a new local project:

1. `supabase init` to create a new local project
2. `supabase start` to launch the Supabase services

## Installing the Supabase CLI [\#](https://supabase.com/docs/guides/local-development/cli/getting-started\#installing-the-supabase-cli)

macOSWindowsLinuxnodejs

Run the CLI by prefixing each command with `npx` or `bunx`:

```
1
npx supabase --help
```

The Supabase CLI requires **Node.js 20 or later** when run via `npx` or `npm`. Older Node.js versions, such as 16, are not supported and fail to start the CLI.

You can also install the CLI as dev dependency via [npm](https://www.npmjs.com/package/supabase):

```
1
npm install supabase --save-dev
```

## Updating the Supabase CLI [\#](https://supabase.com/docs/guides/local-development/cli/getting-started\#updating-the-supabase-cli)

When a new [version](https://github.com/supabase/cli/releases) is released, you can update the CLI using the same methods.

macOSWindowsLinuxnodejs

If you have installed the CLI as dev dependency via [npm](https://www.npmjs.com/package/supabase), you can update it with:

```
1
npm update supabase --save-dev
```

If you have any Supabase containers running locally, stop them and delete their data volumes before proceeding with the upgrade. This ensures that Supabase managed services can apply new migrations on a clean state of the local database.

##### Backup and stop running containers

Remember to save any local schema and data changes before stopping because the `--no-backup` flag will delete them.

```
1
supabase db diff -f my_schema
2
supabase db dump --local --data-only > supabase/seed.sql
3
supabase stop --no-backup
```

## Running Supabase locally [\#](https://supabase.com/docs/guides/local-development/cli/getting-started\#running-supabase-locally)

The Supabase CLI uses Docker containers to manage the local development stack. Follow the official guide to install and configure [Docker Desktop](https://docs.docker.com/desktop):

macOSWindows

![Docker settings on Mac: Select Integrated, Virtualization Framework, and osxfs](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fguides%2Fcli%2Fdocker-mac-light.png&w=3840&q=75)

Alternately, you can use a different container tool that offers Docker compatible APIs.

- [Rancher Desktop](https://rancherdesktop.io/) (macOS, Windows, Linux)
- [Podman](https://podman.io/) (macOS, Windows, Linux)
- [OrbStack](https://orbstack.dev/) (macOS)
- [colima](https://github.com/abiosoft/colima) (macOS)

Inside the folder where you want to create your project, run:

```
1
supabase init
```

This will create a new `supabase` folder. It's safe to commit this folder to your version control system.

Now, to start the Supabase stack, run:

```
1
supabase start
```

This takes time on your first run because the CLI needs to download the Docker images to your local machine. The CLI includes the entire Supabase toolset, and a few additional images that are useful for local development (like a local SMTP server and a database diff tool).

## Access your project's services [\#](https://supabase.com/docs/guides/local-development/cli/getting-started\#access-your-projects-services)

Once all of the Supabase services are running, you'll see output containing your local Supabase credentials. It should look like this, with urls and keys that you'll use in your local project:

```
1
Started supabase local development setup.
2

3
         API URL: http://localhost:54321
4
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
5
      Studio URL: http://localhost:54323
6
     Mailpit URL: http://localhost:54324
7
        anon key: eyJh......
8
service_role key: eyJh......
```

StudioPostgresAPI GatewayAnalytics

```
1
# Default URL:
2
http://localhost:54323
```

The local development environment includes Supabase Studio, a graphical interface for working with your database.

![Local Studio](https://supabase.com/docs/img/guides/cli/local-studio.png)

## Stopping local services [\#](https://supabase.com/docs/guides/local-development/cli/getting-started\#stopping-local-services)

When you are finished working on your Supabase project, you can stop the stack (without resetting your local database):

```
1
supabase stop
```

## Learn more [\#](https://supabase.com/docs/guides/local-development/cli/getting-started\#learn-more)

- [CLI configuration](https://supabase.com/docs/guides/local-development/cli/config)
- [CLI reference](https://supabase.com/docs/reference/cli)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/local-development/cli/getting-started.mdx)

### Is this helpful?

NoYes

### On this page

[Installing the Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started#installing-the-supabase-cli) [Updating the Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started#updating-the-supabase-cli) [Running Supabase locally](https://supabase.com/docs/guides/local-development/cli/getting-started#running-supabase-locally) [Access your project's services](https://supabase.com/docs/guides/local-development/cli/getting-started#access-your-projects-services) [Stopping local services](https://supabase.com/docs/guides/local-development/cli/getting-started#stopping-local-services) [Learn more](https://supabase.com/docs/guides/local-development/cli/getting-started#learn-more)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)