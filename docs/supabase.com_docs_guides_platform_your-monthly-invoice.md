---
url: "https://supabase.com/docs/guides/platform/your-monthly-invoice"
title: "Your monthly invoice | Supabase Docs"
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
3. Billing
5. [Your monthly invoice](https://supabase.com/docs/guides/platform/your-monthly-invoice)

# Your monthly invoice

* * *

## Billing cycle [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#billing-cycle)

When you sign up for a paid plan you get charged once a month at the beginning of the billing cycle. A billing cycle starts with the creation of a Supabase organization. If you create an organization on the sixth of January your billing cycle resets on the sixth of each month. If the anchored day is not present in the current month, then the last day of the month is used.

## Your invoice explained [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#your-invoice-explained)

When your billing cycle resets an invoice gets issued. That invoice contains line items from both the current and the previous billing cycle. Fixed fees for the current billing cycle, usage based fees for the previous billing cycle.

### Fixed fees [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#fixed-fees)

Fixed fees are independent of usage and paid in-advance. Whether you have one or several projects, hundreds or millions of active users, the fee is always the same, and doesn't vary. Examples are the subscription fee, the fee for HIPAA and for priority support.

### Usage based fees [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#usage-based-fees)

Fees vary depending on usage and are paid in arrears. The more usage you have, the higher the fee. Examples are fees for monthly active users and storage size.

### Discounted line items [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#discounted-line-items)

Paid plans come with a usage quota for certain line items. You only pay for usage that goes beyond the quota. The quota for Storage for example is 100 GB. If you use 105 GB, you pay for 5 GB. If you use 95 GB, you pay nothing. This quota is declared as a discount on your invoice.

#### Compute Credits [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#compute-credits)

Paid plans come with $10 in Compute Credits per month. This suffices for a single project using a Nano or Micro compute instance. Every additional project adds compute fees to your monthly invoice though.

### Example invoice [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#example-invoice)

The following invoice was issued on January 6, 2025 with the previous billing cycle from December 6, 2024 - January 5, 2025, and the current billing cycle from January 6 - February 5, 2025.

![Example Invoice](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fguides%2Fplatform%2Fexample-invoice.png&w=3840&q=75)

1. The final amount due
2. Fixed subscription fee for the current billing cycle
3. Usage based fee for Compute for the previous billing cycle. There were two projects (`wsmmedyqtlrvbcesxdew`, `wwxdpovgtfcmcnxwsaad`) running 744 hours (24 hours \* 31 days). These projects incurred $10 in Compute fees each. With $10 in Compute Credits deducted, the final Compute fees are $10.
4. Usage based fee for Custom Domain for the previous billing cycle. There is no free usage quota for Custom Domain. You get charged for the 744 hours (24 hours \* 31 days) a Custom Domain was active. The final Custom Domain fees are $10.19.
5. Usage based fee for Egress for the previous billing cycle. There is a free usage quota of 250 GB for Egress. You get charged for usage beyond 250 GB only, meaning for 2,119.47 GB. The final Egress fees are $190.75.
6. Usage based fee for Monthly Active Users for the previous billing cycle. There is a free usage quota of 100,000 users. With 141 users there is no charge for this line item.

### Why is my invoice more than $25? [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#why-is-my-invoice-more-than-$,25-)

The amount due of your invoice being higher than the $25 subscription fee for the Pro Plan can have several reasons.

- **Running several projects:** You had more than one project running in the previous billing cycle. Supabase provides a dedicated server and database for every project. That means that every project you launch incurs compute costs. While the $10 Compute Credits cover a single project using a Nano or Micro compute instance, every additional project adds at least $10 compute costs to your invoice.
- **Usage beyond quota:** You exceeded the included usage quota for one or more line items in the previous billing cycle while having the Spend Cap disabled.
- **Usage that is not covered by the Spend Cap:** You had usage in the previous billing cycle that is not covered by the [Spend Cap](https://supabase.com/docs/guides/platform/cost-control#spend-cap). For example using an IPv4 address or a custom domain.

## How to settle your invoices [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#how-to-settle-your-invoices)

Monthly invoices are auto-collected by charging the payment method marked as "active" for an organization.

### Payment failure [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#payment-failure)

If your payment fails, Supabase retries the charge several times. We send you a Payment Failure email with the reason for the failure. Follow the steps outlined in this email. You can manually trigger a charge at any time via

- the link in the Payment Failure email
- the "Pay now" button on the [organization's invoices page](https://supabase.com/dashboard/org/_/billing#invoices)

## Where to find your invoices [\#](https://supabase.com/docs/guides/platform/your-monthly-invoice\#where-to-find-your-invoices)

Your invoice is sent to you via email. You can also find your invoices on the [organization's invoices page](https://supabase.com/dashboard/org/_/billing#invoices).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/your-monthly-invoice.mdx)

### Is this helpful?

NoYes

### On this page

[Billing cycle](https://supabase.com/docs/guides/platform/your-monthly-invoice#billing-cycle) [Your invoice explained](https://supabase.com/docs/guides/platform/your-monthly-invoice#your-invoice-explained) [Fixed fees](https://supabase.com/docs/guides/platform/your-monthly-invoice#fixed-fees) [Usage based fees](https://supabase.com/docs/guides/platform/your-monthly-invoice#usage-based-fees) [Discounted line items](https://supabase.com/docs/guides/platform/your-monthly-invoice#discounted-line-items) [Example invoice](https://supabase.com/docs/guides/platform/your-monthly-invoice#example-invoice) [Why is my invoice more than $25?](https://supabase.com/docs/guides/platform/your-monthly-invoice#why-is-my-invoice-more-than-$,25-) [How to settle your invoices](https://supabase.com/docs/guides/platform/your-monthly-invoice#how-to-settle-your-invoices) [Payment failure](https://supabase.com/docs/guides/platform/your-monthly-invoice#payment-failure) [Where to find your invoices](https://supabase.com/docs/guides/platform/your-monthly-invoice#where-to-find-your-invoices)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)