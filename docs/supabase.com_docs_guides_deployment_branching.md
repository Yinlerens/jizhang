---
url: "https://supabase.com/docs/guides/deployment/branching"
title: "Branching | Supabase Docs"
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

Home

1. [Deployment & Branching](https://supabase.com/docs/guides/deployment)
3. Branching
5. [Overview](https://supabase.com/docs/guides/deployment/branching)

# Branching

## Use Supabase Branches to test and preview changes

* * *

Use branching to safely experiment with changes to your Supabase project.

Supabase branches create separate environments that spin off from your main project. You can use these branching environments to create and test changes like new configurations, database schemas, or features without affecting your production setup. When you're ready to ship your changes, merge your branch to update your production instance with the new changes.

## How branching works [\#](https://supabase.com/docs/guides/deployment/branching\#how-branching-works)

- **Separate Environments**: Each branch is a separate environment with its own Supabase instance and API credentials.
- **Preview Branches**: You can create multiple Preview Branches for testing.
- **Persistent Branches**: Persistent branches are long-lived branches. They aren't automatically paused or deleted due to non-inactivity or merging.
- **Managing Branches**: You can create, review, and merge branches either automatically via our [GitHub integration](https://supabase.com/docs/guides/deployment/branching/github-integration) or directly [through the dashboard](https://supabase.com/docs/guides/deployment/branching/dashboard) (currently in beta). All branches show up in the branches page in the dashboard, regardless of how they were created.
- **Data-less**: New branches do not start with any data from your main project. This is meant to better protect your sensitive production data. To start your branches with data, you can use a [seed file](https://supabase.com/docs/guides/deployment/branching/github-integration#seeding) if using the GitHub integration.

## Deploying to production [\#](https://supabase.com/docs/guides/deployment/branching\#deploying-to-production)

When you merge any branch into your main project, Supabase automatically runs a deployment workflow to deploy your changes to production. The deployment workflow is expressed as a Directed Acyclic Graph where each node represents one of the following deployment steps.

1. **Clone** \- Checks out your repository at the specified git branch (optional for [Branching via Dashboard](https://supabase.com/docs/guides/deployment/branching/dashboard))
2. **Pull** \- Retrieves database migrations from your main project (also initialises the migration history table when Branching via Dashboard)
3. **Health** \- Waits up to 2 minutes for all Supabase services on your branch to be running and healthy, including Auth, API, Database, Storage, and Realtime
4. **Configure** \- Updates service configurations based on your config.toml file (only available for [Branching via GitHub](https://supabase.com/docs/guides/deployment/branching/github-integration))
5. **Migrate** \- Applies pending database migrations and vault secrets to your branch
6. **Seed** \- Runs seed files to populate your branch with initial data (must be [enabled in config.toml](https://supabase.com/docs/guides/deployment/branching/configuration#branch-configuration-with-remotes) for persistent branches)
7. **Deploy** \- Deploys any changed Edge Functions and updates function secrets

If a parent deployment step fails, all dependent children steps will be skipped. For e.g., if your database migrations failed at step 5, our runner will not seed your branch because step 6 is skipped. If you are using GitHub integration, the same deployment workflow will be run on every commit pushed to your git branch.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/deployment/branching.mdx)

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