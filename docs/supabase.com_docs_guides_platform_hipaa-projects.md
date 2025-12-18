---
url: "https://supabase.com/docs/guides/platform/hipaa-projects"
title: "HIPAA Projects | Supabase Docs"
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

[Platform](https://supabase.com/docs/guides/platform)

Add-ons[Custom Domains](https://supabase.com/docs/guides/platform/custom-domains)
[Database Backups](https://supabase.com/docs/guides/platform/backups)
[IPv4 Address](https://supabase.com/docs/guides/platform/ipv4-address)
[Read Replicas](https://supabase.com/docs/guides/platform/read-replicas)

Upgrades & Migrations[Upgrading](https://supabase.com/docs/guides/platform/upgrading)

Migrating within Supabase

Migrating to Supabase

Project & Account Management[Access Control](https://supabase.com/docs/guides/platform/access-control)

Multi-factor Authentication

[Transfer Project](https://supabase.com/docs/guides/platform/project-transfer)
[Restore to a new project](https://supabase.com/docs/guides/platform/clone-project)

Single Sign-On

Platform Configuration[Regions](https://supabase.com/docs/guides/platform/regions)
[Compute and Disk](https://supabase.com/docs/guides/platform/compute-and-disk)
[Database Size](https://supabase.com/docs/guides/platform/database-size)
[HIPAA Projects](https://supabase.com/docs/guides/platform/hipaa-projects)
[Network Restrictions](https://supabase.com/docs/guides/platform/network-restrictions)
[Performance Tuning](https://supabase.com/docs/guides/platform/performance)
[SSL Enforcement](https://supabase.com/docs/guides/platform/ssl-enforcement)
[Default Platform Permissions](https://supabase.com/docs/guides/platform/permissions)
[PrivateLink](https://supabase.com/docs/guides/platform/privatelink)

Billing[About billing on Supabase](https://supabase.com/docs/guides/platform/billing-on-supabase)
[Get set up for billing](https://supabase.com/docs/guides/platform/get-set-up-for-billing)
[Manage your subscription](https://supabase.com/docs/guides/platform/manage-your-subscription)

Manage your usage

[Your monthly invoice](https://supabase.com/docs/guides/platform/your-monthly-invoice)
[Control your costs](https://supabase.com/docs/guides/platform/cost-control)
[Credits](https://supabase.com/docs/guides/platform/credits)

AWS Marketplace

[Billing FAQ](https://supabase.com/docs/guides/platform/billing-faq)

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

Platform

1. [Platform](https://supabase.com/docs/guides/platform)
3. Platform Configuration
5. [HIPAA Projects](https://supabase.com/docs/guides/platform/hipaa-projects)

# HIPAA Projects

* * *

You can use Supabase to store and process Protected Health Information (PHI). If you want to start developing healthcare apps on Supabase, reach out to the Supabase team [here](https://forms.supabase.com/hipaa2) to sign the Business Associate Agreement (BAA).

Organizations must have a signed BAA with Supabase and have the Health Insurance Portability and Accountability Act (HIPAA) add-on enabled when dealing with PHI.

## Configuring a HIPAA project [\#](https://supabase.com/docs/guides/platform/hipaa-projects\#configuring-a-hipaa-project)

When the HIPAA add-on is enabled on an organization, projects within the organization can be configured as _High Compliance_. This configuration can be found in the [General Project Settings page](https://supabase.com/dashboard/project/_/settings) of the dashboard.
Once enabled, additional security checks will be run against the project to ensure the deployed configuration is compliant. These checks are performed on a continual basis and security warnings will appear in the [Security Advisor](https://supabase.com/dashboard/project/_/advisors/security) if a non-compliant setting is detected.

The required project configuration is outlined in the [shared responsibility model](https://supabase.com/docs/guides/deployment/shared-responsibility-model#managing-healthcare-data) for managing healthcare data.

These include:

- Enabling [Point in Time Recovery](https://supabase.com/docs/guides/platform/backups#point-in-time-recovery) which requires at least a [small compute add-on](https://supabase.com/docs/guides/platform/compute-add-ons).
- Turning on [SSL Enforcement](https://supabase.com/docs/guides/platform/ssl-enforcement).
- Enabling [Network Restrictions](https://supabase.com/docs/guides/platform/network-restrictions).

Additional security checks and controls will be added as the security advisor is extended and additional security controls are made available.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/hipaa-projects.mdx)

### Is this helpful?

NoYes

### On this page

[Configuring a HIPAA project](https://supabase.com/docs/guides/platform/hipaa-projects#configuring-a-hipaa-project)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)