---
url: "https://supabase.com/docs/guides/platform/ssl-enforcement"
title: "Postgres SSL Enforcement | Supabase Docs"
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
5. [SSL Enforcement](https://supabase.com/docs/guides/platform/ssl-enforcement)

# Postgres SSL Enforcement

* * *

Your Supabase project supports connecting to the Postgres DB without SSL enabled to maximize client compatibility. For increased security, you can prevent clients from connecting if they're not using SSL.

Disabling SSL enforcement only applies to connections to Postgres and Supavisor ("Connection Pooler"); all HTTP APIs offered by Supabase (e.g., PostgREST, Storage, Auth) automatically enforce SSL on all incoming connections.

Projects need to be at least on Postgres 13.3.0 to enable SSL enforcement. You can find the Postgres version of your project in the [Infrastructure Settings page](https://supabase.com/dashboard/project/_/settings/infrastructure). If your project is on an older version, you will need to [upgrade](https://supabase.com/docs/guides/platform/migrating-and-upgrading-projects#upgrade-your-project) to use this feature.

## Manage SSL enforcement via the dashboard [\#](https://supabase.com/docs/guides/platform/ssl-enforcement\#manage-ssl-enforcement-via-the-dashboard)

SSL enforcement can be configured via the "Enforce SSL on incoming connections" setting under the SSL Configuration section in [Database Settings page](https://supabase.com/dashboard/project/_/database/settings) of the dashboard.

## Manage SSL enforcement via the Management API [\#](https://supabase.com/docs/guides/platform/ssl-enforcement\#manage-ssl-enforcement-via-the-management-api)

You can also manage SSL enforcement using the Management API:

```
1
# Get your access token from https://supabase.com/dashboard/account/tokens
2
export SUPABASE_ACCESS_TOKEN="your-access-token"
3
export PROJECT_REF="your-project-ref"
4

5
# Get current SSL enforcement status
6
curl -X GET "https://api.supabase.com/v1/projects/$PROJECT_REF/ssl-enforcement" \
7
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN"
8

9
# Enable SSL enforcement
10
curl -X PUT "https://api.supabase.com/v1/projects/$PROJECT_REF/ssl-enforcement" \
11
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
12
  -H "Content-Type: application/json" \
13
  -d '{
14
    "requestedConfig": {
15
      "database": true
16
    }
17
  }'
18

19
# Disable SSL enforcement
20
curl -X PUT "https://api.supabase.com/v1/projects/$PROJECT_REF/ssl-enforcement" \
21
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
22
  -H "Content-Type: application/json" \
23
  -d '{
24
    "requestedConfig": {
25
      "database": false
26
    }
27
  }'
```

## Manage SSL enforcement via the CLI [\#](https://supabase.com/docs/guides/platform/ssl-enforcement\#manage-ssl-enforcement-via-the-cli)

To get started:

1. [Install](https://supabase.com/docs/guides/cli) the Supabase CLI 1.37.0+.
2. [Log in](https://supabase.com/docs/guides/getting-started/local-development#log-in-to-the-supabase-cli) to your Supabase account using the CLI.
3. Ensure that you have [Owner or Admin permissions](https://supabase.com/docs/guides/platform/access-control#manage-team-members) for the project that you are enabling SSL enforcement.

### Check enforcement status [\#](https://supabase.com/docs/guides/platform/ssl-enforcement\#check-enforcement-status)

You can use the `get` subcommand of the CLI to check whether SSL is currently being enforced:

```
1
supabase ssl-enforcement --project-ref {ref} get --experimental
```

Response if SSL is being enforced:

```
1
SSL is being enforced.
```

Response if SSL is not being enforced:

```
1
SSL is *NOT* being enforced.
```

### Update enforcement [\#](https://supabase.com/docs/guides/platform/ssl-enforcement\#update-enforcement)

The `update` subcommand is used to change the SSL enforcement status for your project:

```
1
supabase ssl-enforcement --project-ref {ref} update --enable-db-ssl-enforcement --experimental
```

Similarly, to disable SSL enforcement:

```
1
supabase ssl-enforcement --project-ref {ref} update --disable-db-ssl-enforcement --experimental
```

### A note about Postgres SSL modes [\#](https://supabase.com/docs/guides/platform/ssl-enforcement\#a-note-about-postgres-ssl-modes)

Postgres supports [multiple SSL modes](https://www.postgresql.org/docs/current/libpq-ssl.html#LIBPQ-SSL-PROTECTION) on the client side. These modes provide different levels of protection. Depending on your needs, it is important to verify that the SSL mode in use is performing the required level of enforcement and verification of SSL connections.

The strongest mode offered by Postgres is `verify-full` and this is the mode you most likely want to use when SSL enforcement is enabled. To use `verify-full` you will need to download the Supabase CA certificate for your database. The certificate is available through the dashboard under the SSL Configuration section in the [Database Settings page](https://supabase.com/dashboard/project/_/database/settings).

Once the CA certificate has been downloaded, add it to the certificate authority list used by Postgres.

```
1
cat {location of downloaded prod-ca-2021.crt} >> ~/.postgres/root.crt
```

With the CA certificate added to the trusted certificate authorities list, use `psql` or your client library to connect to Supabase:

```
1
psql "postgresql://aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=verify-full" -U postgres.<user>
```

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/ssl-enforcement.mdx)

### Is this helpful?

NoYes

### On this page

[Manage SSL enforcement via the dashboard](https://supabase.com/docs/guides/platform/ssl-enforcement#manage-ssl-enforcement-via-the-dashboard) [Manage SSL enforcement via the Management API](https://supabase.com/docs/guides/platform/ssl-enforcement#manage-ssl-enforcement-via-the-management-api) [Manage SSL enforcement via the CLI](https://supabase.com/docs/guides/platform/ssl-enforcement#manage-ssl-enforcement-via-the-cli) [Check enforcement status](https://supabase.com/docs/guides/platform/ssl-enforcement#check-enforcement-status) [Update enforcement](https://supabase.com/docs/guides/platform/ssl-enforcement#update-enforcement) [A note about Postgres SSL modes](https://supabase.com/docs/guides/platform/ssl-enforcement#a-note-about-postgres-ssl-modes)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)