---
url: "https://supabase.com/docs/guides/deployment/branching/integrations"
title: "Integrations | Supabase Docs"
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
5. [Integrations](https://supabase.com/docs/guides/deployment/branching/integrations)

# Integrations

## Use Supabase branching with hosting providers and other tools

* * *

Branching works with hosting providers that support preview deployments. Learn how to integrate Supabase branching with various platforms and tools.

## Hosting providers [\#](https://supabase.com/docs/guides/deployment/branching/integrations\#hosting-providers)

With the Supabase branching integration, you can sync the Git branch used by the hosting provider with the corresponding Supabase preview branch. This means that the preview deployment built by your hosting provider is matched to the correct database schema, edge functions, and other Supabase configurations.

### Vercel [\#](https://supabase.com/docs/guides/deployment/branching/integrations\#vercel)

Install the Vercel integration:

- From the [Vercel marketplace](https://vercel.com/integrations/supabase) or
- By clicking the blue `Deploy` button in a Supabase example app's `README` file

##### Vercel GitHub integration also required.

For branching to work with Vercel, you also need the [Vercel GitHub integration](https://vercel.com/docs/deployments/git/vercel-for-github).

And make sure you have [connected](https://supabase.com/dashboard/org/_/integrations) your Supabase project to your Vercel project.

Supabase automatically updates your Vercel project with the correct environment variables for the corresponding preview branches. The synchronization happens at the time of Pull Request being opened, not at the time of branch creation.

As branching integration is tied to the Preview Deployments feature in Vercel, there are possible race conditions between Supabase setting correct variables, and Vercel running a deployment process. Because of that, Supabase is always automatically re-deploying the most recent deployment of the given pull request.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/deployment/branching/integrations.mdx)

### Is this helpful?

NoYes

### On this page

[Hosting providers](https://supabase.com/docs/guides/deployment/branching/integrations#hosting-providers) [Vercel](https://supabase.com/docs/guides/deployment/branching/integrations#vercel)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)