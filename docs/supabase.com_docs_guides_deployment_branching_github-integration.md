---
url: "https://supabase.com/docs/guides/deployment/branching/github-integration"
title: "GitHub integration | Supabase Docs"
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

[Deployment & Branching](https://supabase.com/docs/guides/deployment)

[Overview](https://supabase.com/docs/guides/deployment)

Environments[Managing environments](https://supabase.com/docs/guides/deployment/managing-environments)
[Database migrations](https://supabase.com/docs/guides/deployment/database-migrations)

Branching[Overview](https://supabase.com/docs/guides/deployment/branching)
[Branching via GitHub](https://supabase.com/docs/guides/deployment/branching/github-integration)
[Branching via dashboard](https://supabase.com/docs/guides/deployment/branching/dashboard)
[Working with branches](https://supabase.com/docs/guides/deployment/branching/working-with-branches)
[Configuration](https://supabase.com/docs/guides/deployment/branching/configuration)
[Integrations](https://supabase.com/docs/guides/deployment/branching/integrations)
[Troubleshooting](https://supabase.com/docs/guides/deployment/branching/troubleshooting)
[Billing](https://supabase.com/docs/guides/platform/manage-your-usage/branching)

Terraform[Terraform provider](https://supabase.com/docs/guides/deployment/terraform)
[Terraform tutorial](https://supabase.com/docs/guides/deployment/terraform/tutorial)
[Terraform reference](https://supabase.com/docs/guides/deployment/terraform/reference)

Production readiness[Shared responsibility model](https://supabase.com/docs/guides/deployment/shared-responsibility-model)
[Maturity model](https://supabase.com/docs/guides/deployment/maturity-model)
[Production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)
[SOC 2 compliance](https://supabase.com/docs/guides/security/soc-2-compliance)

CI/CD[Generate types from your database](https://supabase.com/docs/guides/deployment/ci/generating-types)
[Automated testing](https://supabase.com/docs/guides/deployment/ci/testing)
[Back up your database](https://supabase.com/docs/guides/deployment/ci/backups)

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

Home

1. [Deployment & Branching](https://supabase.com/docs/guides/deployment)
3. Branching
5. [Branching via GitHub](https://supabase.com/docs/guides/deployment/branching/github-integration)

# GitHub integration

## Connect with GitHub to sync branches with your repository

* * *

Supabase Branching uses the Supabase GitHub integration to read files from your GitHub repository. With this integration, Supabase watches all commits, branches, and pull requests of your GitHub repository.

## Installation [\#](https://supabase.com/docs/guides/deployment/branching/github-integration\#installation)

In the Supabase Dashboard:

1. Go to **Project Settings** \> [**Integrations**](https://supabase.com/dashboard/project/_/settings/integrations).
2. Under **GitHub Integration**, click **Authorize GitHub**.
3. You are redirected to a GitHub authorization page. Click **Authorize Supabase**.
4. You are redirected back to the Integrations page. Choose a GitHub repository to connect your project to.
5. Fill in the relative path to the Supabase directory from your repository root.
6. Configure the other options as needed to automate your GitHub connection.
7. Click **Enable integration**.

## Preparing your Git repository [\#](https://supabase.com/docs/guides/deployment/branching/github-integration\#preparing-your-git-repository)

You will be using the [Supabase CLI](https://supabase.com/docs/guides/cli) to initialise your local `./supabase` directory:

1

### Initialize Supabase locally

If you don't have a `./supabase` directory, you can create one:

```
1
supabase init
```

2

### Pull your database migration

Pull your database changes using `supabase db pull`. To get your database connection string, go to your project dashboard, click [Connect](https://supabase.com/dashboard/project/_?showConnect=true&method=session) and look for the Session pooler connection string.

```
1
supabase db pull --db-url <db_connection_string>
2

3
# Your Database connection string will look like this:
4
# postgres://postgres.xxxx:password@xxxx.pooler.supabase.com:5432/postgres
```

If you're in an [IPv6 environment](https://github.com/orgs/supabase/discussions/27034) or have the IPv4 Add-On, you can use the direct connection string instead of Supavisor in Session mode.

3

### Commit the \`supabase\` directory to Git

Commit the `supabase` directory to Git, and push your changes to your remote repository.

```
1
git add supabase
2
git commit -m "Initial migration"
3
git push
```

## Syncing GitHub branches [\#](https://supabase.com/docs/guides/deployment/branching/github-integration\#syncing-github-branches)

Enable the **Automatic branching** option in your GitHub Integration configuration to automatically sync GitHub branches with Supabase branches.

When a new branch is created in GitHub, a corresponding branch is created in Supabase. (You can enable the **Supabase changes only** option to only create Supabase branches when Supabase files change.)

### Configuration [\#](https://supabase.com/docs/guides/deployment/branching/github-integration\#configuration)

You can test configuration changes on your Preview Branch by configuring the `config.toml` file in your Supabase directory. See the [Configuration docs](https://supabase.com/docs/guides/deployment/branching/configuration) for more information.

A comment is added to your PR with the deployment status of your preview branch.

### Migrations [\#](https://supabase.com/docs/guides/deployment/branching/github-integration\#migrations)

The migrations in the `migrations` subdirectory of your Supabase directory are automatically run.

### Seeding [\#](https://supabase.com/docs/guides/deployment/branching/github-integration\#seeding)

No production data is copied to your Preview branch. This is meant to protect your sensitive production data.

You can seed your Preview Branch with sample data using the `seed.sql` file in your Supabase directory. See the [Seeding docs](https://supabase.com/docs/guides/local-development/seeding-your-database) for more information.

Data changes in your seed files are not merged to production.

## Deploying changes to production [\#](https://supabase.com/docs/guides/deployment/branching/github-integration\#deploying-changes-to-production)

Enable the **Deploy to production** option in your GitHub Integration configuration to automatically deploy changes when you push or merge to production branch.

The following changes are deployed:

- New migrations are applied
- Edge Functions declared in `config.toml` are deployed
- Storage buckets declared in `config.toml` are deployed

All other configurations, including API, Auth, and seed files, are ignored by default.

## Preventing migration failures [\#](https://supabase.com/docs/guides/deployment/branching/github-integration\#preventing-migration-failures)

We highly recommend turning on a 'required check' for the Supabase integration. You can do this from your GitHub repository settings. This prevents PRs from being merged when migration checks fail, and stops invalid migrations from being merged into your production branch.

![Check the "Require status checks to pass before merging" option.](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fguides%2Fplatform%2Fbranching%2Fgithub-required-check.jpg%3Fv%3D1&w=3840&q=75)

Check the "Require status checks to pass before merging" option.

### Email notifications [\#](https://supabase.com/docs/guides/deployment/branching/github-integration\#email-notifications)

To catch failures early, we also recommend subscribing to email notifications on your branch. Common errors include migration conflict, function deployment failure, or invalid configuration file.

You can setup a custom GitHub Action to monitor the status of any Supabase Branch.

###### .github/workflows/notify-failure.yaml

```
1
name: Branch Status
2

3
on:
4
  pull_request:
5
    types:
6
      - opened
7
      - reopened
8
      - synchronize
9
    branches:
10
      - main
11
      - develop
12
    paths:
13
      - 'supabase/**'
14

15
jobs:
16
  failed:
17
    runs-on: ubuntu-latest
18
    steps:
19
      - uses: fountainhead/action-wait-for-check@v1.2.0
20
        id: check
21
        with:
22
          checkName: Supabase Preview
23
          ref: ${{ github.event.pull_request.head.sha || github.sha }}
24
          token: ${{ secrets.GITHUB_TOKEN }}
25

26
      - if: ${{ steps.check.outputs.conclusion == 'failure' }}
27
        run: exit 1
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/deployment/branching/github-integration.mdx)

### Is this helpful?

NoYes

### On this page

[Installation](https://supabase.com/docs/guides/deployment/branching/github-integration#installation) [Preparing your Git repository](https://supabase.com/docs/guides/deployment/branching/github-integration#preparing-your-git-repository) [Syncing GitHub branches](https://supabase.com/docs/guides/deployment/branching/github-integration#syncing-github-branches) [Configuration](https://supabase.com/docs/guides/deployment/branching/github-integration#configuration) [Migrations](https://supabase.com/docs/guides/deployment/branching/github-integration#migrations) [Seeding](https://supabase.com/docs/guides/deployment/branching/github-integration#seeding) [Deploying changes to production](https://supabase.com/docs/guides/deployment/branching/github-integration#deploying-changes-to-production) [Preventing migration failures](https://supabase.com/docs/guides/deployment/branching/github-integration#preventing-migration-failures) [Email notifications](https://supabase.com/docs/guides/deployment/branching/github-integration#email-notifications)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)