---
url: "https://supabase.com/docs/guides/self-hosting/realtime/config"
title: "Realtime Self-hosting Config | Supabase Docs"
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

[Self-Hosting](https://supabase.com/docs/guides/self-hosting)

[Overview](https://supabase.com/docs/guides/self-hosting)

[Self-Hosting with Docker](https://supabase.com/docs/guides/self-hosting/docker)

Configuration[Enabling MCP server](https://supabase.com/docs/guides/self-hosting/enable-mcp)

Auth Server[Reference](https://supabase.com/docs/reference/self-hosting-auth/introduction)
[Configuration](https://supabase.com/docs/guides/self-hosting/auth/config)

Storage Server[Reference](https://supabase.com/docs/reference/self-hosting-storage/introduction)
[Configuration](https://supabase.com/docs/guides/self-hosting/storage/config)

Realtime Server[Reference](https://supabase.com/docs/reference/self-hosting-realtime/introduction)
[Configuration](https://supabase.com/docs/guides/self-hosting/realtime/config)

Analytics Server[Reference](https://supabase.com/docs/reference/self-hosting-analytics/introduction)
[Configuration](https://supabase.com/docs/guides/self-hosting/analytics/config)

Functions Server[Reference](https://supabase.com/docs/reference/self-hosting-functions/introduction)

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

Self-Hosting

1. [Self-Hosting](https://supabase.com/docs/guides/self-hosting)
3. Realtime Server
5. [Configuration](https://supabase.com/docs/guides/self-hosting/realtime/config)

# Realtime Self-hosting Config

* * *

You can use Environment Variables to configure your Realtime Server.

## General Settings

General server settings.

##### Parameters

PORT

Required

no type

Port which you can connect your client/listeners

REPLICATION\_MODE

Required

no type

Connect to database via either IPv4 or IPv6. Disregarded if database host is an IP address (e.g. '127.0.0.1') and recommended if database host is a name (e.g. 'db.abcd.supabase.co') to prevent potential non-existent domain (NXDOMAIN) errors.

SLOT\_NAME

Required

no type

A unique name for Postgres to track the Write-Ahead Logging (WAL). If the Realtime server dies then this slot can keep the changes since the last committed position.

TEMPORARY\_SLOT

Required

no type

Start logical replication slot as either temporary or permanent

REALTIME\_IP\_VERSION

Required

no type

Bind realtime via either IPv4 or IPv6

PUBLICATIONS

Required

no type

JSON encoded array of publication names. Realtime RLS currently accepts one publication.

SECURE\_CHANNELS

Required

no type

Enable/Disable channels authorization via JWT verification

JWT\_SECRET

Required

no type

HS algorithm octet key (e.g. "95x0oR8jq9unl9pOIx")

JWT\_CLAIM\_VALIDATORS

Required

no type

Expected claim key/value pairs compared to JWT claims via equality checks in order to validate JWT. e.g. '{"iss": "Issuer", "nbf": 1610078130}'.

EXPOSE\_METRICS

Required

no type

Expose Prometheus metrics at '/metrics' endpoint.

DB\_RECONNECT\_BACKOFF\_MIN

Required

no type

Specify the minimum amount of time to wait before reconnecting to database

DB\_RECONNECT\_BACKOFF\_MAX

Required

no type

Specify the maximum amount of time to wait before reconnecting to database

REPLICATION\_POLL\_INTERVAL

Required

no type

Specify how often Realtime RLS should poll the replication slot for changes

SUBSCRIPTION\_SYNC\_INTERVAL

Required

no type

Specify how often Realtime RLS should confirm connected subscribers and the tables they're listening to

MAX\_CHANGES

Required

no type

Soft limit for the number of database changes to fetch per replication poll

MAX\_RECORD\_BYTES

Required

no type

Controls the maximum size of a WAL record

## Database Settings

Connecting to your database.

##### Parameters

DB\_HOST

Required

no type

Database host URL

DB\_NAME

Required

no type

Database name

DB\_USER

Required

no type

Database user

DB\_PASSWORD

Required

no type

Database password

DB\_PORT

Required

no type

Database port

DB\_SSL

Required

no type

Database SSL connection

DB\_IP\_VERSION

Required

no type

Connect to database via either IPv4 or IPv6. Disregarded if database host is an IP address (e.g. '127.0.0.1') and recommended if database host is a name (e.g. 'db.abcd.supabase.co') to prevent potential non-existent domain (NXDOMAIN) errors.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/app/guides/(with-sidebar)/self-hosting/realtime/config/page.tsx)

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