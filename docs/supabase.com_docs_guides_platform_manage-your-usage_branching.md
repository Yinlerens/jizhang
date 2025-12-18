---
url: "https://supabase.com/docs/guides/platform/manage-your-usage/branching"
title: "Manage Branching usage | Supabase Docs"
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

[Overview](https://supabase.com/docs/guides/platform/manage-your-usage)
[Compute](https://supabase.com/docs/guides/platform/manage-your-usage/compute)
[Egress](https://supabase.com/docs/guides/platform/manage-your-usage/egress)
[Disk Size](https://supabase.com/docs/guides/platform/manage-your-usage/disk-size)
[Disk Throughput](https://supabase.com/docs/guides/platform/manage-your-usage/disk-throughput)
[Disk IOPS](https://supabase.com/docs/guides/platform/manage-your-usage/disk-iops)
[Monthly Active Users](https://supabase.com/docs/guides/platform/manage-your-usage/monthly-active-users)
[Monthly Active Third-Party Users](https://supabase.com/docs/guides/platform/manage-your-usage/monthly-active-users-third-party)
[Monthly Active SSO Users](https://supabase.com/docs/guides/platform/manage-your-usage/monthly-active-users-sso)
[Storage Size](https://supabase.com/docs/guides/platform/manage-your-usage/storage-size)
[Storage Image Transformations](https://supabase.com/docs/guides/platform/manage-your-usage/storage-image-transformations)
[Edge Function Invocations](https://supabase.com/docs/guides/platform/manage-your-usage/edge-function-invocations)
[Realtime Messages](https://supabase.com/docs/guides/platform/manage-your-usage/realtime-messages)
[Realtime Peak Connections](https://supabase.com/docs/guides/platform/manage-your-usage/realtime-peak-connections)
[Custom Domains](https://supabase.com/docs/guides/platform/manage-your-usage/custom-domains)
[Point-in-Time Recovery](https://supabase.com/docs/guides/platform/manage-your-usage/point-in-time-recovery)
[IPv4](https://supabase.com/docs/guides/platform/manage-your-usage/ipv4)
[MFA Phone](https://supabase.com/docs/guides/platform/manage-your-usage/advanced-mfa-phone)
[Read Replicas](https://supabase.com/docs/guides/platform/manage-your-usage/read-replicas)
[Branching](https://supabase.com/docs/guides/platform/manage-your-usage/branching)
[Log Drains](https://supabase.com/docs/guides/platform/manage-your-usage/log-drains)

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
3. More
5. [Manage your usage](https://supabase.com/docs/guides/platform/manage-your-usage)
7. [Branching](https://supabase.com/docs/guides/platform/manage-your-usage/branching)

# Manage Branching usage

* * *

## What you are charged for [\#](https://supabase.com/docs/guides/platform/manage-your-usage/branching\#what-you-are-charged-for)

Each [Preview branch](https://supabase.com/docs/guides/deployment/branching) is a separate environment with all Supabase services (Database, Auth, Storage, etc.). You're charged for usage within that environment—such as [Compute](https://supabase.com/docs/guides/platform/manage-your-usage/compute), [Disk Size](https://supabase.com/docs/guides/platform/manage-your-usage/disk-size), [Egress](https://supabase.com/docs/guides/platform/manage-your-usage/egress), and [Storage](https://supabase.com/docs/guides/platform/manage-your-usage/storage-size)—just like the project you branched from.

Usage by Preview branches counts toward your subscription plan's quota.

## How charges are calculated [\#](https://supabase.com/docs/guides/platform/manage-your-usage/branching\#how-charges-are-calculated)

Refer to individual [usage items](https://supabase.com/docs/guides/platform/manage-your-usage) for details on how charges are calculated. Branching charges are the sum of all these items.

### Usage on your invoice [\#](https://supabase.com/docs/guides/platform/manage-your-usage/branching\#usage-on-your-invoice)

Compute incurred by Preview branches is shown as "Branching Compute Hours" on your invoice. Other usage items are not shown separately for branches and are rolled up into the project.

## Pricing [\#](https://supabase.com/docs/guides/platform/manage-your-usage/branching\#pricing)

There is no fixed fee for a Preview branch. You only pay for the usage it incurs. A branch running on the default Micro Compute size starts at $0.01344 per hour.

## Billing examples [\#](https://supabase.com/docs/guides/platform/manage-your-usage/branching\#billing-examples)

The project has a Preview branch "XYZ", that runs for 30 hours, incurring Compute and Egress costs. Disk Size usage remains within the 8 GB included in the subscription plan, so no additional charges apply.

| Line Item | Costs |
| --- | --- |
| Pro Plan | $25 |
|  |  |
| Compute Hours Small Project 1 | $15 |
| Egress Project 1 | $7 |
| Disk Size Project 1 | $3 |
|  |  |
| Compute Hours Micro Branch XYZ | $0.4 |
| Egress Branch XYZ | $1 |
| Disk Size Branch XYZ | $0 |
|  |  |
| **Subtotal** | **$51.4** |
| Compute Credits | -$10 |
| **Total** | **$41.4** |

## View usage [\#](https://supabase.com/docs/guides/platform/manage-your-usage/branching\#view-usage)

You can view Branching usage on the [organization's usage page](https://supabase.com/dashboard/org/_/usage). The page shows the usage of all projects by default. To view the usage for a specific project, select it from the dropdown. You can also select a different time period.

![Usage page navigation bar](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fguides%2Fplatform%2Fusage-navbar--light.png&w=3840&q=75)

In the Usage Summary section, you can see how many hours your Preview branches existed during the selected time period. Hover over "Branching Compute Hours" for a detailed breakdown.

![Usage summary Branching Compute Hours](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fguides%2Fplatform%2Fusage-summary-branch-hours--light.png&w=3840&q=75)

## Optimize usage [\#](https://supabase.com/docs/guides/platform/manage-your-usage/branching\#optimize-usage)

- Merge Preview branches as soon as they are ready
- Delete Preview branches that are no longer in use
- Check whether your [persistent branches](https://supabase.com/docs/guides/deployment/branching#persistent-branches) need to be defined as persistent, or if they can be ephemeral instead. Persistent branches will remain active even after the underlying PR is closed.

## FAQ [\#](https://supabase.com/docs/guides/platform/manage-your-usage/branching\#faq)

### Do Compute Credits apply to Branching Compute? [\#](https://supabase.com/docs/guides/platform/manage-your-usage/branching\#do-compute-credits-apply-to-branching-compute)

No, Compute Credits do not apply to Branching Compute.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/manage-your-usage/branching.mdx)

### Is this helpful?

NoYes

### On this page

[What you are charged for](https://supabase.com/docs/guides/platform/manage-your-usage/branching#what-you-are-charged-for) [How charges are calculated](https://supabase.com/docs/guides/platform/manage-your-usage/branching#how-charges-are-calculated) [Usage on your invoice](https://supabase.com/docs/guides/platform/manage-your-usage/branching#usage-on-your-invoice) [Pricing](https://supabase.com/docs/guides/platform/manage-your-usage/branching#pricing) [Billing examples](https://supabase.com/docs/guides/platform/manage-your-usage/branching#billing-examples) [View usage](https://supabase.com/docs/guides/platform/manage-your-usage/branching#view-usage) [Optimize usage](https://supabase.com/docs/guides/platform/manage-your-usage/branching#optimize-usage) [FAQ](https://supabase.com/docs/guides/platform/manage-your-usage/branching#faq) [Do Compute Credits apply to Branching Compute?](https://supabase.com/docs/guides/platform/manage-your-usage/branching#do-compute-credits-apply-to-branching-compute)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)