---
url: "https://supabase.com/docs/guides/deployment/ci/backups"
title: "Automated backups using GitHub Actions | Supabase Docs"
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
3. CI/CD
5. [Back up your database](https://supabase.com/docs/guides/deployment/ci/backups)

# Automated backups using GitHub Actions

## Backup your database on a regular basis.

* * *

You can use the Supabase CLI to backup your Postgres database. The steps involve running a series of commands to dump roles, schema, and data separately.
Inside your repository, create a new file inside the `.github/workflows` folder called `backup.yml`. Copy the following snippet inside the file, and the action will run whenever a new PR is created.

Never backup your data to a public repository.

## Backup action [\#](https://supabase.com/docs/guides/deployment/ci/backups\#backup-action)

```
1
name: 'backup-database'
2
on:
3
  pull_request:
4
jobs:
5
  build:
6
    runs-on: ubuntu-latest
7
    env:
8
      supabase_db_url: ${{ secrets.SUPABASE_DB_URL }}   # For example: postgresql://postgres:[YOUR-PASSWORD]@db.<ref>.supabase.co:5432/postgres
9
    steps:
10
      - uses: actions/checkout@v2
11
      - uses: supabase/setup-cli@v1
12
        with:
13
          version: latest
14
      - name: Backup roles
15
        run: supabase db dump --db-url "$supabase_db_url" -f roles.sql --role-only
16
      - name: Backup schema
17
        run: supabase db dump --db-url "$supabase_db_url" -f schema.sql
18
      - name: Backup data
19
        run: supabase db dump --db-url "$supabase_db_url" -f data.sql --data-only --use-copy
```

## Periodic Backups Workflow [\#](https://supabase.com/docs/guides/deployment/ci/backups\#periodic-backups-workflow)

You can use the GitHub Action to run periodic backups of your database. In this example, the Action workflow is triggered by `push` and `pull_request` events on the `main` branch, manually via `workflow_dispatch`, and automatically at midnight every day due to the `schedule` event with a `cron` expression.
The workflow runs on the latest Ubuntu runner and requires write permissions to the repository's contents. It uses the Supabase CLI to dump the roles, schema, and data from your Supabase database, utilizing the `SUPABASE_DB_URL` environment variable that is securely stored in the GitHub secrets.
After the backup is complete, it auto-commits the changes to the repository using the `git-auto-commit-action`. This ensures that the latest backup is always available in your repository. The commit message for these automated commits is "Supabase backup".
This workflow provides an automated solution for maintaining regular backups of your Supabase database. It helps keep your data safe and enables easy restoration in case of any accidental data loss or corruption.

Never backup your data to a public repository.

```
1
name: Supa-backup
2

3
on:
4
  push:
5
    branches: [ main ]
6
  pull_request:
7
    branches: [ main ]
8
  workflow_dispatch:
9
  schedule:
10
    - cron: '0 0 * * *' # Runs every day at midnight
11
jobs:
12
  run_db_backup:
13
    runs-on: ubuntu-latest
14
    permissions:
15
      contents: write
16
    env:
17
      supabase_db_url: ${{ secrets.SUPABASE_DB_URL }}   # For example: postgresql://postgres:[YOUR-PASSWORD]@db.<ref>.supabase.co:5432/postgres
18
    steps:
19
      - uses: actions/checkout@v3
20
        with:
21
          ref: ${{ github.head_ref }}
22
      - uses: supabase/setup-cli@v1
23
        with:
24
          version: latest
25
      - name: Backup roles
26
        run: supabase db dump --db-url "$supabase_db_url" -f roles.sql --role-only
27
      - name: Backup schema
28
        run: supabase db dump --db-url "$supabase_db_url" -f schema.sql
29
      - name: Backup data
30
        run: supabase db dump --db-url "$supabase_db_url" -f data.sql --data-only --use-copy
31

32
      - uses: stefanzweifel/git-auto-commit-action@v4
33
        with:
34
          commit_message: Supabase backup
```

## More resources [\#](https://supabase.com/docs/guides/deployment/ci/backups\#more-resources)

- Backing up and migrating your project: [Migrating and Upgrading](https://supabase.com/docs/guides/platform/migrating-and-upgrading-projects)

[Edit this page on GitHub](https://github.com/supabase/setup-cli/blob/gh-pages/docs/backups.md)

### Is this helpful?

NoYes

### On this page

[Backup action](https://supabase.com/docs/guides/deployment/ci/backups#backup-action) [Periodic Backups Workflow](https://supabase.com/docs/guides/deployment/ci/backups#periodic-backups-workflow) [More resources](https://supabase.com/docs/guides/deployment/ci/backups#more-resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)