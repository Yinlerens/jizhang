---
url: "https://supabase.com/docs/guides/deployment/branching/troubleshooting"
title: "Troubleshooting | Supabase Docs"
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
5. [Troubleshooting](https://supabase.com/docs/guides/deployment/branching/troubleshooting)

# Troubleshooting

## Common issues and solutions for Supabase branching

* * *

This guide covers common issues you might encounter when using Supabase branching and how to resolve them.

## Monitoring deployments [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#monitoring-deployments)

To check deployment status and troubleshoot failures:

1. Go to your project dashboard
2. Navigate to "Manage Branches"
3. Click on your branch to view deployment logs
4. Check the "View logs" section for detailed error messages

For programmatic monitoring, you can use the [Management API](https://api.supabase.com/api/v1#tag/environments/post/v1/projects/%7Bref%7D/branches) to poll branch status.

For detailed troubleshooting guidance, see our [Troubleshooting guide](https://supabase.com/docs/guides/deployment/branching/troubleshooting).

## Common issues [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#common-issues)

### Rolling back migrations [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#rolling-back-migrations)

You might want to roll back changes you've made in an earlier migration change. For example, you may have pushed a migration file containing schema changes you no longer want.

To fix this, push the latest changes, then delete the preview branch in Supabase and reopen it.

The new preview branch is reseeded from the `./supabase/seed.sql` file by default. Any additional data changes made on the old preview branch are lost. This is equivalent to running `supabase db reset` locally. All migrations are rerun in sequential order.

### Deployment failures [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#deployment-failures)

A deployment might fail for various reasons, including invalid SQL statements and schema conflicts in migrations, errors within the `config.toml` config, or something else.

To check the error message, see the Supabase workflow run for your branch under the [View logs](https://supabase.com/dashboard/project/_/branches) section.

### Schema drift between preview branches [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#schema-drift-between-preview-branches)

If multiple preview branches exist, each preview branch might contain different schema changes. This is similar to Git branches, where each branch might contain different code changes.

When a preview branch is merged into the production branch, it creates a schema drift between the production branch and the preview branches that haven't been merged yet.

These conflicts can be resolved in the same way as normal Git Conflicts: merge or rebase from the production Git branch to the preview Git branch. Since migrations are applied sequentially, ensure that migration files are timestamped correctly after the rebase. Changes that build on top of earlier changes should always have later timestamps.

### Changing production branch [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#changing-production-branch)

It's not possible to change the Git branch used as the Production branch for Supabase Branching. The only way to change it is to disable and re-enable branching. See [Disable Branching](https://supabase.com/docs/guides/deployment/branching/troubleshooting#disable-branching).

## Migration issues [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#migration-issues)

### Failed migrations [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#failed-migrations)

When migrations fail, check:

1. **SQL syntax**: Ensure your migration files contain valid SQL
2. **Dependencies**: Check if migrations depend on objects that don't exist
3. **Permissions**: Verify the migration doesn't require superuser privileges

To debug:

```
1
# Test migrations locally first
2
supabase db reset
3

4
# Check migration logs in the dashboard
5
# Navigate to Branches > Your Branch > View Logs
```

### Migration order problems [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#migration-order-problems)

Migrations must run in the correct order. Common issues:

1. **Timestamp conflicts**: Ensure migration files have unique timestamps
2. **Dependency issues**: Later migrations depending on earlier ones
3. **Rebase problems**: Timestamps getting out of order after Git rebase

Fix by:

```
1
# Rename migration files to fix timestamp order
2
mv 20240101000000_old.sql 20240102000000_old.sql
3

4
# Reset local database to test
5
supabase db reset
```

## Connection issues [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#connection-issues)

### Cannot connect to preview branch [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#cannot-connect-to-preview-branch)

If you can't connect to a preview branch:

1. **Check credentials**: Ensure you're using the correct branch-specific credentials
2. **Auto-pause**: The branch might be paused. It will resume on the first request
3. **Network restrictions**: Check if network restrictions are blocking access

### Connection timeouts [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#connection-timeouts)

Preview branches auto-pause after inactivity. First connections after pause may timeout:

1. **Retry**: The branch will wake up after the first request
2. **Persistent branches**: Convert frequently-used branches to persistent

## Configuration problems [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#configuration-problems)

### Config.toml not applying [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#configtoml-not-applying)

If configuration changes aren't applying:

1. **Syntax errors**: Validate your `config.toml` syntax
2. **Git sync**: Ensure changes are committed and pushed
3. **Branch refresh**: Try deleting and recreating the branch

### Secrets not available [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#secrets-not-available)

If secrets aren't working in your branch:

1. **Branch-specific**: Remember secrets are set per branch
2. **Syntax**: Use correct syntax: `env(SECRET_NAME)`
3. **CLI version**: Ensure you're using the latest CLI version

## Performance issues [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#performance-issues)

### Slow branch creation [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#slow-branch-creation)

Branch creation might be slow due to:

1. **Large migrations**: Many or complex migration files
2. **Seed data**: Large seed files take time to process
3. **Network latency**: Geographic distance from the branch region

### Query performance [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#query-performance)

Preview branches may have different performance characteristics:

1. **Cold starts**: First queries after auto-pause are slower
2. **Resource limits**: Preview branches have different resource allocations
3. **Indexing**: Ensure proper indexes exist in your migrations

## Data issues [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#data-issues)

### Seed data not loading [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#seed-data-not-loading)

If seed data isn't loading:

1. **File location**: Ensure `seed.sql` is in `./supabase/` directory
2. **SQL errors**: Check for syntax errors in seed file
3. **Dependencies**: Seed data might reference non-existent tables

### Data persistence [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#data-persistence)

Remember that preview branch data:

1. **Is temporary**: Data is lost when branch is deleted
2. **Isn't migrated**: Data doesn't move between branches
3. **Resets on recreation**: Deleting and recreating branch loses data

## Getting help [\#](https://supabase.com/docs/guides/deployment/branching/troubleshooting\#getting-help)

If you're still experiencing issues:

1. **Check logs**: Review branch logs in the dashboard
2. **Community**: Ask in [GitHub discussions](https://github.com/orgs/supabase/discussions/18937)
3. **Support**: Contact support for project-specific issues
4. **Documentation**: Review the latest documentation for updates

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/deployment/branching/troubleshooting.mdx)

### Is this helpful?

NoYes

### On this page

[Monitoring deployments](https://supabase.com/docs/guides/deployment/branching/troubleshooting#monitoring-deployments) [Common issues](https://supabase.com/docs/guides/deployment/branching/troubleshooting#common-issues) [Rolling back migrations](https://supabase.com/docs/guides/deployment/branching/troubleshooting#rolling-back-migrations) [Deployment failures](https://supabase.com/docs/guides/deployment/branching/troubleshooting#deployment-failures) [Schema drift between preview branches](https://supabase.com/docs/guides/deployment/branching/troubleshooting#schema-drift-between-preview-branches) [Changing production branch](https://supabase.com/docs/guides/deployment/branching/troubleshooting#changing-production-branch) [Migration issues](https://supabase.com/docs/guides/deployment/branching/troubleshooting#migration-issues) [Failed migrations](https://supabase.com/docs/guides/deployment/branching/troubleshooting#failed-migrations) [Migration order problems](https://supabase.com/docs/guides/deployment/branching/troubleshooting#migration-order-problems) [Connection issues](https://supabase.com/docs/guides/deployment/branching/troubleshooting#connection-issues) [Cannot connect to preview branch](https://supabase.com/docs/guides/deployment/branching/troubleshooting#cannot-connect-to-preview-branch) [Connection timeouts](https://supabase.com/docs/guides/deployment/branching/troubleshooting#connection-timeouts) [Configuration problems](https://supabase.com/docs/guides/deployment/branching/troubleshooting#configuration-problems) [Config.toml not applying](https://supabase.com/docs/guides/deployment/branching/troubleshooting#configtoml-not-applying) [Secrets not available](https://supabase.com/docs/guides/deployment/branching/troubleshooting#secrets-not-available) [Performance issues](https://supabase.com/docs/guides/deployment/branching/troubleshooting#performance-issues) [Slow branch creation](https://supabase.com/docs/guides/deployment/branching/troubleshooting#slow-branch-creation) [Query performance](https://supabase.com/docs/guides/deployment/branching/troubleshooting#query-performance) [Data issues](https://supabase.com/docs/guides/deployment/branching/troubleshooting#data-issues) [Seed data not loading](https://supabase.com/docs/guides/deployment/branching/troubleshooting#seed-data-not-loading) [Data persistence](https://supabase.com/docs/guides/deployment/branching/troubleshooting#data-persistence) [Getting help](https://supabase.com/docs/guides/deployment/branching/troubleshooting#getting-help)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)