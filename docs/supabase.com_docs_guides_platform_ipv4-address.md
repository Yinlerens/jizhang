---
url: "https://supabase.com/docs/guides/platform/ipv4-address"
title: "Dedicated IPv4 Address for Ingress | Supabase Docs"
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
3. Add-ons
5. [IPv4 Address](https://supabase.com/docs/guides/platform/ipv4-address)

# Dedicated IPv4 Address for Ingress

## Attach an IPv4 address to your database

* * *

The Supabase IPv4 add-on provides a dedicated IPv4 address for your Postgres database connection. It can be configured in the [Add-ons Settings](https://supabase.com/dashboard/project/_/settings/addons).

## Understanding IP addresses [\#](https://supabase.com/docs/guides/platform/ipv4-address\#understanding-ip-addresses)

The Internet Protocol (IP) addresses devices on the internet. There are two main versions:

- **IPv4**: The older version, with a limited address space.
- **IPv6**: The newer version, offering a much larger address space and the future-proof option.

## When you need the IPv4 add-on: [\#](https://supabase.com/docs/guides/platform/ipv4-address\#when-you-need-the-ipv4-add-on)

IPv4 addresses are guaranteed to be static for ingress traffic. If your database is making outbound connections, the outbound IP address is not static and cannot be guaranteed.

- When using the direct connection string in an IPv6-incompatible network instead of Supavisor or client libraries.
- When you need a dedicated IP address for your direct connection string

## Enabling the IPv4 add-on [\#](https://supabase.com/docs/guides/platform/ipv4-address\#enabling-the-ipv4-add-on)

You can enable the IPv4 add-on in your project's [add-ons settings](https://supabase.com/dashboard/project/_/settings/addons).

You can also manage the IPv4 add-on using the Management API:

```
1
# Get your access token from https://supabase.com/dashboard/account/tokens
2
export SUPABASE_ACCESS_TOKEN="your-access-token"
3
export PROJECT_REF="your-project-ref"
4

5
# Get current IPv4 add-on status
6
curl -X GET "https://api.supabase.com/v1/projects/$PROJECT_REF/billing/addons" \
7
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN"
8

9
# Enable IPv4 add-on
10
curl -X POST "https://api.supabase.com/v1/projects/$PROJECT_REF/addons" \
11
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
12
  -H "Content-Type: application/json" \
13
  -d '{
14
    "addon_type": "ipv4"
15
  }'
16

17
# Disable IPv4 add-on
18
curl -X DELETE "https://api.supabase.com/v1/projects/$PROJECT_REF/billing/addons/ipv4" \
19
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN"
```

Note that direct database connections can experience a short amount of downtime when toggling the add-on due to DNS reconfiguration and propagation. Generally, this should be less than a minute.

## Read replicas and IPv4 add-on [\#](https://supabase.com/docs/guides/platform/ipv4-address\#read-replicas-and-ipv4-add-on)

When using the add-on, each database (including read replicas) receives an IPv4 address. Each replica adds to the total IPv4 cost.

## Changes and updates [\#](https://supabase.com/docs/guides/platform/ipv4-address\#changes-and-updates)

- While the IPv4 address generally remains the same, actions like pausing/unpausing the project or enabling/disabling the add-on can lead to a new IPv4 address.

## Supabase and IPv6 compatibility [\#](https://supabase.com/docs/guides/platform/ipv4-address\#supabase-and-ipv6-compatibility)

By default, Supabase Postgres use IPv6 addresses. If your system doesn't support IPv6, you have the following options:

1. **Supavisor Connection Strings**: The Supavisor connection strings are IPv4-compatible alternatives to direct connections
2. **Supabase Client Libraries**: These libraries are compatible with IPv4
3. **Dedicated IPv4 Add-On (Pro Plans+)**: For a guaranteed IPv4 and static database address for the direct connection, enable this paid add-on.

### Checking your network IPv6 support [\#](https://supabase.com/docs/guides/platform/ipv4-address\#checking-your-network-ipv6-support)

You can check if your personal network is IPv6 compatible at [https://test-ipv6.com](https://test-ipv6.com/).

### Checking platforms for IPv6 support: [\#](https://supabase.com/docs/guides/platform/ipv4-address\#checking-platforms-for-ipv6-support)

The majority of services are IPv6 compatible. However, there are a few prominent ones that only accept IPv4 connections:

- [Retool](https://retool.com/)
- [Vercel](https://vercel.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Render](https://render.com/)

## Finding your database's IP address [\#](https://supabase.com/docs/guides/platform/ipv4-address\#finding-your-databases-ip-address)

Use an IP lookup website or this command (replace `<PROJECT_REF>`):

```
1
nslookup db.<PROJECT_REF>.supabase.co
```

## Identifying your connections [\#](https://supabase.com/docs/guides/platform/ipv4-address\#identifying-your-connections)

The pooler and direct connection strings can be found in the [project connect page](https://supabase.com/dashboard/project/_?showConnect=true):

#### Direct connection [\#](https://supabase.com/docs/guides/platform/ipv4-address\#direct-connection)

IPv6 unless IPv4 Add-On is enabled

```
1
# Example direct connection string
2
postgresql://postgres:[YOUR-PASSWORD]@db.ajrbwkcuthywfihaarmflo.supabase.co:5432/postgres
```

#### Supavisor in transaction mode (port 6543) [\#](https://supabase.com/docs/guides/platform/ipv4-address\#supavisor-in-transaction-mode-port-6543)

Always uses an IPv4 address

```
1
# Example transaction string
2
postgresql://postgres.ajrbwkcuthywddfihrmflo:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

#### Supavisor in session mode (port 5432) [\#](https://supabase.com/docs/guides/platform/ipv4-address\#supavisor-in-session-mode-port-5432)

Always uses an IPv4 address

```
1
# Example session string
2
postgresql://postgres.ajrbwkcuthywfddihrmflo:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

## Pricing [\#](https://supabase.com/docs/guides/platform/ipv4-address\#pricing)

For a detailed breakdown of how charges are calculated, refer to [Manage IPv4 usage](https://supabase.com/docs/guides/platform/manage-your-usage/ipv4).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/ipv4-address.mdx)

### Is this helpful?

NoYes

### On this page

[Understanding IP addresses](https://supabase.com/docs/guides/platform/ipv4-address#understanding-ip-addresses) [When you need the IPv4 add-on:](https://supabase.com/docs/guides/platform/ipv4-address#when-you-need-the-ipv4-add-on) [Enabling the IPv4 add-on](https://supabase.com/docs/guides/platform/ipv4-address#enabling-the-ipv4-add-on) [Read replicas and IPv4 add-on](https://supabase.com/docs/guides/platform/ipv4-address#read-replicas-and-ipv4-add-on) [Changes and updates](https://supabase.com/docs/guides/platform/ipv4-address#changes-and-updates) [Supabase and IPv6 compatibility](https://supabase.com/docs/guides/platform/ipv4-address#supabase-and-ipv6-compatibility) [Checking your network IPv6 support](https://supabase.com/docs/guides/platform/ipv4-address#checking-your-network-ipv6-support) [Checking platforms for IPv6 support:](https://supabase.com/docs/guides/platform/ipv4-address#checking-platforms-for-ipv6-support) [Finding your database's IP address](https://supabase.com/docs/guides/platform/ipv4-address#finding-your-databases-ip-address) [Identifying your connections](https://supabase.com/docs/guides/platform/ipv4-address#identifying-your-connections) [Pricing](https://supabase.com/docs/guides/platform/ipv4-address#pricing)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)