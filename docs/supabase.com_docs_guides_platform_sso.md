---
url: "https://supabase.com/docs/guides/platform/sso"
title: "Enable SSO for Your Organization | Supabase Docs"
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

[Overview](https://supabase.com/docs/guides/platform/sso)
[SSO with Azure AD](https://supabase.com/docs/guides/platform/sso/azure)
[SSO with Google Workspace](https://supabase.com/docs/guides/platform/sso/gsuite)
[SSO with Okta](https://supabase.com/docs/guides/platform/sso/okta)

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
5. [Single Sign-On](https://supabase.com/docs/guides/platform/sso)
7. [Overview](https://supabase.com/docs/guides/platform/sso)

# Enable SSO for Your Organization

* * *

Looking for docs on how to add Single Sign-On support in your Supabase project? Head on over to [Single Sign-On with SAML 2.0 for Projects](https://supabase.com/docs/guides/auth/enterprise-sso/auth-sso-saml).

Supabase offers single sign-on (SSO) as a login option to provide additional account security for your team. This allows company administrators to enforce the use of an identity provider when logging into Supabase. SSO improves the onboarding and offboarding experience of the company as the employee only needs a single set of credentials to access third-party applications or tools which can also be revoked by an administrator.

Supabase currently provides SAML SSO for [Team and Enterprise Plan customers](https://supabase.com/pricing). If you are an existing Team or Enterprise Plan customer, continue with the setup below.

## Supported providers [\#](https://supabase.com/docs/guides/platform/sso\#supported-providers)

Supabase supports practically all identity providers that support the SAML 2.0 SSO protocol. We've prepared these guides for commonly used identity providers to help you get started. If you use a different provider, our support stands ready to support you.

- [Google Workspaces (formerly G Suite)](https://supabase.com/docs/guides/platform/sso/gsuite)
- [Azure Active Directory](https://supabase.com/docs/guides/platform/sso/azure)
- [Okta](https://supabase.com/docs/guides/platform/sso/okta)

Once configured, you can update your settings anytime via the [SSO tab](https://supabase.com/dashboard/org/_/sso) under **Organization Settings**.

![SSO Example](https://supabase.com/docs/img/sso-dashboard-enabled.png)

## Key configuration options [\#](https://supabase.com/docs/guides/platform/sso\#key-configuration-options)

- **Multiple domains** \- You can associate one or more email domains with your SSO provider. Users with email addresses matching these domains are eligible to sign in via SSO.
- **Auto-join** \- Optionally allow users with a matching domain to be added to your organization automatically when they first sign in, without an invitation.
- **Default role for auto-joined users** \- Choose the role (e.g., `Read-only`, `Developer`, `Administrator`, `Owner`) that automatically joined users receive. Refer to [access control](https://supabase.com/docs/guides/platform/access-control) for more information about roles.

## How SSO works in Supabase [\#](https://supabase.com/docs/guides/platform/sso\#how-sso-works-in-supabase)

When SSO is enabled for an organization:

- Organization invites are restricted to company members belonging to the same identity provider.
- Every user has an organization created by default. They can create as many projects as they want.
- An SSO user will not be able to update or reset their password since the company administrator manages their access via the identity provider.
- If an SSO user with the following email of `alice@foocorp.com` attempts to sign in with a GitHub account that uses the same email, a separate Supabase account is created and will not be linked to the SSO user's account.
- SSO users will only see organizations/projects they've been invited to or auto-joined into. See [access control](https://supabase.com/docs/guides/platform/access-control) for more details.

## Disabling SSO for an organization [\#](https://supabase.com/docs/guides/platform/sso\#disabling-sso-for-an-organization)

If you disable the SSO provider for an organization, **all SSO users will immediately be unable to sign in**. Before disabling SSO, ensure you have at least one non-SSO owner account to prevent being locked out.

## Removing an individual SSO user's access [\#](https://supabase.com/docs/guides/platform/sso\#removing-an-individual-sso-users-access)

To revoke access for a specific SSO user without disabling the provider entirely you may:

- Remove or disable the user's account in your identity provider
- Downgrade or remove their permissions for any organizations in Supabase.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/sso.mdx)

### Is this helpful?

NoYes

### On this page

[Supported providers](https://supabase.com/docs/guides/platform/sso#supported-providers) [Key configuration options](https://supabase.com/docs/guides/platform/sso#key-configuration-options) [How SSO works in Supabase](https://supabase.com/docs/guides/platform/sso#how-sso-works-in-supabase) [Disabling SSO for an organization](https://supabase.com/docs/guides/platform/sso#disabling-sso-for-an-organization) [Removing an individual SSO user's access](https://supabase.com/docs/guides/platform/sso#removing-an-individual-sso-users-access)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)