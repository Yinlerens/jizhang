---
url: "https://supabase.com/docs/guides/platform/network-restrictions"
title: "Network Restrictions | Supabase Docs"
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
5. [Network Restrictions](https://supabase.com/docs/guides/platform/network-restrictions)

# Network Restrictions

* * *

If you can't find the Network Restrictions section at the bottom of your [Database Settings](https://supabase.com/dashboard/project/_/database/settings), update your version of Postgres in the [Infrastructure Settings](https://supabase.com/dashboard/project/_/settings/infrastructure).

Each Supabase project comes with configurable restrictions on the IP ranges that are allowed to connect to Postgres and its pooler ("your database"). These restrictions are enforced before traffic reaches your database. If a connection is not restricted by IP, it still needs to authenticate successfully with valid database credentials.

If direct connections to your database [resolve to a IPv6 address](https://supabase.com/dashboard/project/_/database/settings), you need to add both IPv4 and IPv6 CIDRs to the list of allowed CIDRs. Network Restrictions will be applied to all database connection routes, whether pooled or direct. You will need to add both the IPv4 and IPv6 networks you want to allow. There are two exceptions: If you have been granted an extension on the IPv6 migration OR if you have purchased the [IPv4 add-on](https://supabase.com/dashboard/project/_/settings/addons), you need only add IPv4 CIDRs.

## To get started via the Dashboard: [\#](https://supabase.com/docs/guides/platform/network-restrictions\#to-get-started-via-the-dashboard)

Network restrictions can be configured in the [Database Settings](https://supabase.com/dashboard/project/_/database/settings) page. Ensure that you have [Owner or Admin permissions](https://supabase.com/docs/guides/platform/access-control#manage-team-members) for the project that you are enabling network restrictions.

## To get started via the Management API: [\#](https://supabase.com/docs/guides/platform/network-restrictions\#to-get-started-via-the-management-api)

You can also manage network restrictions using the Management API:

```
1
# Get your access token from https://supabase.com/dashboard/account/tokens
2
export SUPABASE_ACCESS_TOKEN="your-access-token"
3
export PROJECT_REF="your-project-ref"
4

5
# Get current network restrictions
6
curl -X GET "https://api.supabase.com/v1/projects/$PROJECT_REF/network-restrictions" \
7
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN"
8

9
# Update network restrictions
10
curl -X POST "https://api.supabase.com/v1/projects/$PROJECT_REF/network-restrictions/apply" \
11
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
12
  -H "Content-Type: application/json" \
13
  -d '{
14
    "db_allowed_cidrs": [\
15\
      "192.168.0.1/24",\
16\
    ]
17
  }'
```

## To get started via the CLI: [\#](https://supabase.com/docs/guides/platform/network-restrictions\#to-get-started-via-the-cli)

1. [Install](https://supabase.com/docs/guides/cli) the Supabase CLI 1.22.0+.
2. [Log in](https://supabase.com/docs/guides/cli/local-development#log-in-to-the-supabase-cli) to your Supabase account using the CLI.
3. If your project was created before 23rd December 2022, it will need to be [upgraded to the latest Supabase version](https://supabase.com/docs/guides/platform/migrating-and-upgrading-projects) before Network Restrictions can be used.
4. Ensure that you have [Owner or Admin permissions](https://supabase.com/docs/guides/platform/access-control#manage-team-members) for the project that you are enabling network restrictions.

### Check restrictions [\#](https://supabase.com/docs/guides/platform/network-restrictions\#check-restrictions)

You can use the `get` subcommand of the CLI to retrieve the restrictions currently in effect.

If restrictions have been applied, the output of the `get` command will reflect the IP ranges allowed to connect:

```
1
> supabase network-restrictions --project-ref {ref} get --experimental
2
DB Allowed IPv4 CIDRs: &[183.12.1.1/24]
3
DB Allowed IPv6 CIDRs: &[2001:db8:3333:4444:5555:6666:7777:8888/64]
4
Restrictions applied successfully: true
```

If restrictions have never been applied to your project, the list of allowed CIDRs will be empty, but they will also not have been applied ("Restrictions applied successfully: false"). As a result, all IPs are allowed to connect to your database:

```
1
> supabase network-restrictions --project-ref {ref} get --experimental
2
DB Allowed IPv4 CIDRs: []
3
DB Allowed IPv6 CIDRs: []
4
Restrictions applied successfully: false
```

### Update restrictions [\#](https://supabase.com/docs/guides/platform/network-restrictions\#update-restrictions)

The `update` subcommand is used to apply network restrictions to your project:

```
1
> supabase network-restrictions --project-ref {ref} update --db-allow-cidr 183.12.1.1/24 --db-allow-cidr 2001:db8:3333:4444:5555:6666:7777:8888/64 --experimental
2
DB Allowed IPv4 CIDRs: &[183.12.1.1/24]
3
DB Allowed IPv6 CIDRs: &[2001:db8:3333:4444:5555:6666:7777:8888/64]
4
Restrictions applied successfully: true
```

The restrictions specified (in the form of CIDRs) replaces any restrictions that might have been applied in the past.
To add to the existing restrictions, you must include the existing restrictions within the list of CIDRs provided to the `update` command.

### Remove restrictions [\#](https://supabase.com/docs/guides/platform/network-restrictions\#remove-restrictions)

To remove all restrictions on your project, you can use the `update` subcommand with the CIDR `0.0.0.0/0`:

```
1
> supabase network-restrictions --project-ref {ref} update --db-allow-cidr 0.0.0.0/0 --db-allow-cidr ::/0 --experimental
2
DB Allowed IPv4 CIDRs: &[0.0.0.0/0]
3
DB Allowed IPv6 CIDRs: &[::/0]
4
Restrictions applied successfully: true
```

## Limitations [\#](https://supabase.com/docs/guides/platform/network-restrictions\#limitations)

- The current iteration of Network Restrictions applies to connections to Postgres and the database pooler; it doesn't currently apply to APIs offered over HTTPS (e.g., PostgREST, Storage, and Auth). This includes using Supabase client libraries like [supabase-js](https://supabase.com/docs/reference/javascript).
- If network restrictions are enabled, direct access to your database from Edge Functions will always be blocked. Using the Supabase client library [supabase-js](https://supabase.com/docs/reference/javascript) is recommended to connect to a database with network restrictions from Edge Functions.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/network-restrictions.mdx)

### Is this helpful?

NoYes

### On this page

[To get started via the Dashboard:](https://supabase.com/docs/guides/platform/network-restrictions#to-get-started-via-the-dashboard) [To get started via the Management API:](https://supabase.com/docs/guides/platform/network-restrictions#to-get-started-via-the-management-api) [To get started via the CLI:](https://supabase.com/docs/guides/platform/network-restrictions#to-get-started-via-the-cli) [Check restrictions](https://supabase.com/docs/guides/platform/network-restrictions#check-restrictions) [Update restrictions](https://supabase.com/docs/guides/platform/network-restrictions#update-restrictions) [Remove restrictions](https://supabase.com/docs/guides/platform/network-restrictions#remove-restrictions) [Limitations](https://supabase.com/docs/guides/platform/network-restrictions#limitations)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)