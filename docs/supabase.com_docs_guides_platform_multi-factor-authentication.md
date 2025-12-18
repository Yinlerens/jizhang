---
url: "https://supabase.com/docs/guides/platform/multi-factor-authentication"
title: "Multi-factor Authentication | Supabase Docs"
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

[Overview](https://supabase.com/docs/guides/platform/multi-factor-authentication)
[Enforce MFA on organization](https://supabase.com/docs/guides/platform/mfa/org-mfa-enforcement)

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
3. More
5. [Multi-factor Authentication](https://supabase.com/docs/guides/platform/multi-factor-authentication)
7. [Overview](https://supabase.com/docs/guides/platform/multi-factor-authentication)

# Multi-factor Authentication

## Enable multi-factor authentication (MFA) to keep your account secure.

* * *

This guide is for adding MFA to your Supabase user account. If you want to enable MFA for users in your Supabase project, refer to [**this guide**](https://supabase.com/docs/guides/auth/auth-mfa) instead.

Multi-factor authentication (MFA) adds an additional layer of security to your user account, by requiring a second factor to verify your user identity. Supabase allows users to enable MFA on their account and set it as a requirement for subsequent logins.

## Supported authentication factors [\#](https://supabase.com/docs/guides/platform/multi-factor-authentication\#supported-authentication-factors)

Currently, Supabase supports adding a unique time-based one-time password (TOTP) to your user account as an additional security factor. You can manage your TOTP factor using apps such as 1Password, Authy, Google Authenticator or Apple's Keychain.

## Enable MFA [\#](https://supabase.com/docs/guides/platform/multi-factor-authentication\#enable-mfa)

You can enable MFA for your user account under your [Supabase account settings](https://supabase.com/dashboard/account/security). Enabling MFA will result in all other user sessions to be automatically logged out and forced to sign-in again with MFA.

Supabase does not return recovery codes. Instead, we recommend that you register a backup TOTP factor to use in an event that you lose access to your primary TOTP factor. Make sure you use a different device and app, or store the secret in a secure location different than your primary one.

For security reasons, we will not be able to restore access to your account if you lose all your two-factor authentication credentials. Do register a backup factor if necessary.

## Login with MFA [\#](https://supabase.com/docs/guides/platform/multi-factor-authentication\#login-with-mfa)

Once you've enabled MFA for your Supabase user account, you will be prompted to enter your second factor challenge code as seen in your preferred TOTP app.

If you are an organization owner and on the Pro, Team or Enterprise plan, you can enforce that all organization members [must have MFA enabled](https://supabase.com/docs/guides/platform/mfa/org-mfa-enforcement).

## Disable MFA [\#](https://supabase.com/docs/guides/platform/multi-factor-authentication\#disable-mfa)

You can disable MFA for your user account under your [Supabase account settings](https://supabase.com/dashboard/account/security). On subsequent login attempts, you will not be prompted to enter a MFA code.

We strongly recommend that you do not disable MFA to avoid unauthorized access to your user account.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/multi-factor-authentication.mdx)

### Is this helpful?

NoYes

### On this page

[Supported authentication factors](https://supabase.com/docs/guides/platform/multi-factor-authentication#supported-authentication-factors) [Enable MFA](https://supabase.com/docs/guides/platform/multi-factor-authentication#enable-mfa) [Login with MFA](https://supabase.com/docs/guides/platform/multi-factor-authentication#login-with-mfa) [Disable MFA](https://supabase.com/docs/guides/platform/multi-factor-authentication#disable-mfa)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)