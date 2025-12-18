---
url: "https://supabase.com/docs/guides/platform/clone-project"
title: "Restore to a new project | Supabase Docs"
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
3. Project & Account Management
5. [Restore to a new project](https://supabase.com/docs/guides/platform/clone-project)

# Restore to a new project

## How to clone your existing Supabase project

* * *

##### Beta Version

You can clone your Supabase project by restoring your data from an existing project into a completely new one. This process creates a database-only copy and requires manual reconfiguration to fully replicate your original project.

**What will be transferred?**

- Database schema (tables, views, procedures)
- All data and indexes
- Database roles, permissions and users
- Auth user data (user accounts, hashed passwords, and authentication records from the auth schema)

**What needs manual reconfiguration?**

- Storage objects & settings (Your S3/storage files and bucket configurations are **NOT** copied)
- Edge Functions
- Auth settings & API keys
- Realtime settings
- Database extensions and settings
- Read replicas

Whether you're using physical backups or Point-in-Time recovery (PITR), this feature allows you to duplicate project data with ease, perform testing safely, or recover data for analysis. Access to this feature is exclusive to users on paid plans and requires that physical backups are enabled for the source project.

PITR is an additional add-on available for organizations on a paid plan with physical backups enabled.

To begin, switch to the source project—the project containing the data you wish to restore—and go to the [database backups](https://supabase.com/dashboard/project/_/database/backups/restore-to-new-project) page. Select the **Restore to a New Project** tab.

A list of available backups is displayed. Select the backup you want to use and click the "Restore" button. For projects with PITR enabled, use the date and time selector to specify the exact point in time from which you wish to restore data.

Once you’ve made your choice, Supabase takes care of the rest. A new project is automatically created, replicating key configurations from the original, including the compute instance size, disk attributes, SSL enforcement settings, and network restrictions. The data will remain in the same region as the source project to ensure compliance with data residency requirements. The entire process is fully automated.

The time required to complete the restoration can vary depending largely on the volume of data involved. If you have a large amount of data you can opt for higher performing disk attributes on the source project _before_ starting a clone operation. These disk attributes will be replicated to the new project. This incurs additional costs which will be displayed before starting.

There are a few important restrictions to be aware of with the "Restore to a New Project" process:

- Projects that are created through the restoration process cannot themselves be used as a source for further clones at this time.
- The feature is only accessible to paid plan users with physical backups enabled, ensuring that the necessary resources and infrastructure are available for the restore process.

Before starting the restoration, you’ll be presented with an overview of the costs associated with creating the new project. The new project will incur additional monthly expenses based on the mirrored resources from the source project. It’s important to review these costs carefully before proceeding.

Once the restoration is complete, the new project will be available in your dashboard and will include all data, tables, schemas, and selected settings from the chosen backup source. It is recommended to thoroughly review the new project and perform any necessary tests to ensure everything has been restored as expected.

New projects are completely independent of their source, and as such can be modified and used as desired.

As the entire database is copied to the new project, this will include all extensions that were enabled at the source. If the source project included extensions that are configured to carry out external operations—for example pg\_net, pg\_cron, wrappers—these should be disabled once the copy process has completed to avoid any unwanted actions from taking place.

Restoring to a new project is an excellent way to manage environments more effectively. You can use this feature to create staging environments for testing, experiment with changes without risk to production data, or swiftly recover from unexpected data loss scenarios.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/clone-project.mdx)

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