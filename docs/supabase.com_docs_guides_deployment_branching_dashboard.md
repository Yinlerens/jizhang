---
url: "https://supabase.com/docs/guides/deployment/branching/dashboard"
title: "Branching via the dashboard | Supabase Docs"
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
5. [Branching via dashboard](https://supabase.com/docs/guides/deployment/branching/dashboard)

# Branching via the dashboard

## Create, manage, review, and merge branches directly in the dashboard

* * *

You can create, manage, review, and merge Supabase branches directly via the dashboard. This is useful for quick testing, prototyping, or when you prefer to work in a no-code way. You can also connect a Supabase branch to a GitHub branch at a later time if needed.

##### Public Alpha

Branch management via the dashboard is currently in public alpha. Features and functionality may change.

## How Branching works [\#](https://supabase.com/docs/guides/deployment/branching/dashboard\#how-branching-works)

You can do the following directly from the Supabase dashboard:

- Create preview branches
- Make changes to your public schema or edge functions
- Merge these changes back into production when ready
- Pull in updates from production

## Enable branch management via the dashboard [\#](https://supabase.com/docs/guides/deployment/branching/dashboard\#enable-branch-management-via-the-dashboard)

This functionality is currently in beta and requires opting in. To opt in you must enable the feature preview:

1. Open the user menu by clicking on your user icon in the top right.
2. Select **Branching via dashboard**.
3. Click **Enable feature**.

## Creating a branch [\#](https://supabase.com/docs/guides/deployment/branching/dashboard\#creating-a-branch)

Once you've enabled the feature, you can create a new branch:

1. Click the arrows next to the branch name in the top menu bar. (The top menu bar has the format `YOUR_ORGANIZATION / YOUR_PROJECT / CURRENT_BRANCH_NAME`.)
2. Click `Create branch`.

## Making changes to a branch [\#](https://supabase.com/docs/guides/deployment/branching/dashboard\#making-changes-to-a-branch)

Use the branch selector in the top bar to change to your branch. Any changes you make (including SQL run in the SQL editor, table editor changes, and configuration changes) are now made against the currently selected branch.

You can also use the branch's API keys and connection strings to run changes against the branch from your own code or SQL client.

## Creating a merge request [\#](https://supabase.com/docs/guides/deployment/branching/dashboard\#creating-a-merge-request)

To review and merge changes from a branch back into your production branch, you must first create a merge request. There are two ways to do this.

The first is to click the merge request button next to the branch selector that's located in the top menu. This will create the merge request and redirect you to the merge page where you can review and merge any changes.

The second is to click on manage branches from within the branch selector, then in the left hand navigation you can click on merge requests. From here you can view all open merge requests and create new ones.

## Pulling changes from production into a branch [\#](https://supabase.com/docs/guides/deployment/branching/dashboard\#pulling-changes-from-production-into-a-branch)

When reviewing a merge request you may see a notice at the top of the page asking you to update your branch. This appears when your preview branch has drifted from your production branch. There may be public schema or edge function changes that have been made after your preview branch was created. Clicking update branch will attempt to pull in these changes, but be aware that by doing this your existing edge functions will be replaced. Any new edge functions created on the preview branch will remain untouched.

## Limitations [\#](https://supabase.com/docs/guides/deployment/branching/dashboard\#limitations)

There are a few limitations you should be aware of before deciding to use branching without git.

- Custom roles created through the dashboard are not captured on branch creation
- Branches can only be merged to main; merging between preview branches is not supported
- If your branch is out of date, you can pull in latest changes from main, but keep in mind that all functions will be overwritten
- Deleting functions must be done manually on main branch
- Migration conflicts must be manually resolved on the preview branch
- If you have run migrations on main, new branches will be created from existing migrations instead of a full schema dump

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/deployment/branching/dashboard.mdx)

### Is this helpful?

NoYes

### On this page

[How Branching works](https://supabase.com/docs/guides/deployment/branching/dashboard#how-branching-works) [Enable branch management via the dashboard](https://supabase.com/docs/guides/deployment/branching/dashboard#enable-branch-management-via-the-dashboard) [Creating a branch](https://supabase.com/docs/guides/deployment/branching/dashboard#creating-a-branch) [Making changes to a branch](https://supabase.com/docs/guides/deployment/branching/dashboard#making-changes-to-a-branch) [Creating a merge request](https://supabase.com/docs/guides/deployment/branching/dashboard#creating-a-merge-request) [Pulling changes from production into a branch](https://supabase.com/docs/guides/deployment/branching/dashboard#pulling-changes-from-production-into-a-branch) [Limitations](https://supabase.com/docs/guides/deployment/branching/dashboard#limitations)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)