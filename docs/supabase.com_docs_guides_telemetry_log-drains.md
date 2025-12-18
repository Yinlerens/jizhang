---
url: "https://supabase.com/docs/guides/telemetry/log-drains"
title: "Log Drains | Supabase Docs"
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

[Telemetry](https://supabase.com/docs/guides/telemetry)

[Overview](https://supabase.com/docs/guides/telemetry)

Logging & observability[Logging](https://supabase.com/docs/guides/telemetry/logs)
[Advanced log filtering](https://supabase.com/docs/guides/telemetry/advanced-log-filtering)
[Log drains](https://supabase.com/docs/guides/telemetry/log-drains)
[Reports](https://supabase.com/docs/guides/telemetry/reports)

Metrics

[Sentry integration](https://supabase.com/docs/guides/telemetry/sentry-monitoring)

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

Telemetry

1. [Telemetry](https://supabase.com/docs/guides/telemetry)
3. Logging & observability
5. [Log drains](https://supabase.com/docs/guides/telemetry/log-drains)

# Log Drains

* * *

Log drains will send all logs of the Supabase stack to one or more desired destinations. It is only available for customers on Team and Enterprise Plans. Log drains is available in the dashboard under [Project Settings > Log Drains](https://supabase.com/dashboard/project/_/settings/log-drains).

You can read about the initial announcement [here](https://supabase.com/blog/log-drains) and vote for your preferred drains in [this discussion](https://github.com/orgs/supabase/discussions/28324?sort=top).

# Supported destinations

The following table lists the supported destinations and the required setup configuration:

| Destination | Transport Method | Configuration |
| --- | --- | --- |
| Generic HTTP endpoint | HTTP | URL <br> HTTP Version <br> Gzip <br> Headers |
| DataDog | HTTP | API Key <br> Region |
| Loki | HTTP | URL <br> Headers |
| Sentry | HTTP | DSN |

HTTP requests are batched with a max of 250 logs or 1 second intervals, whichever happens first. Logs are compressed via Gzip if the destination supports it.

## Generic HTTP endpoint [\#](https://supabase.com/docs/guides/telemetry/log-drains\#generic-http-endpoint)

Logs are sent as a POST request with a JSON body. Both HTTP/1 and HTTP/2 protocols are supported.
Custom headers can optionally be configured for all requests.

Note that requests are **unsigned**.

Unsigned requests to HTTP endpoints are temporary and all requests will signed in the near future.

Edge Function Walkthrough (Uncompressed)

Edge Function Gzip Example

## DataDog logs [\#](https://supabase.com/docs/guides/telemetry/log-drains\#datadog-logs)

Logs sent to DataDog have the name of the log source set on the `service` field of the event and the source set to `Supabase`. Logs are gzipped before they are sent to DataDog.

The payload message is a JSON string of the raw log event, prefixed with the event timestamp.

To setup DataDog log drain, generate a DataDog API key [here](https://app.datadoghq.com/organization-settings/api-keys) and the location of your DataDog site.

Walkthrough

Example destination configuration

If you are interested in other log drains, upvote them [here](https://github.com/orgs/supabase/discussions/28324)

## Loki [\#](https://supabase.com/docs/guides/telemetry/log-drains\#loki)

Logs sent to the Loki HTTP API are specifically formatted according to the HTTP API requirements. See the official Loki HTTP API documentation for [more details](https://grafana.com/docs/loki/latest/reference/loki-http-api/#ingest-logs).

Events are batched with a maximum of 250 events per request.

The log source and product name will be used as stream labels.

The `event_message` and `timestamp` fields will be dropped from the events to avoid duplicate data.

Loki must be configured to accept **structured metadata**, and it is advised to increase the default maximum number of structured metadata fields to at least 500 to accommodate large log event payloads of different products.

## Sentry [\#](https://supabase.com/docs/guides/telemetry/log-drains\#sentry)

Logs are sent to Sentry as part of [Sentry's Logging Product](https://docs.sentry.io/product/explore/logs/). Ingesting Supabase logs as Sentry errors is currently not supported.

To setup the Sentry log drain, you need to do the following:

1. Grab your DSN from your [Sentry project settings](https://docs.sentry.io/concepts/key-terms/dsn-explainer/). It should be of the format `{PROTOCOL}://{PUBLIC_KEY}:{SECRET_KEY}@{HOST}{PATH}/{PROJECT_ID}`.
2. Create log drain in [Supabase dashboard](https://supabase.com/dashboard/project/_/settings/log-drains)
3. Watch for events in the [Sentry Logs page](https://sentry.io/explore/logs/)

All fields from the log event are attached as attributes to the Sentry log, which can be used for filtering and grouping in the Sentry UI. There are no limits to cardinality or the number of attributes that can be attached to a log.

If you are self-hosting Sentry, Sentry Logs are only supported in self-hosted version [25.9.0](https://github.com/getsentry/self-hosted/releases/tag/25.9.0) and later.

## Pricing [\#](https://supabase.com/docs/guides/telemetry/log-drains\#pricing)

For a detailed breakdown of how charges are calculated, refer to [Manage Log Drain usage](https://supabase.com/docs/guides/platform/manage-your-usage/log-drains).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/telemetry/log-drains.mdx)

### Is this helpful?

NoYes

### On this page

[Generic HTTP endpoint](https://supabase.com/docs/guides/telemetry/log-drains#generic-http-endpoint) [DataDog logs](https://supabase.com/docs/guides/telemetry/log-drains#datadog-logs) [Loki](https://supabase.com/docs/guides/telemetry/log-drains#loki) [Sentry](https://supabase.com/docs/guides/telemetry/log-drains#sentry) [Pricing](https://supabase.com/docs/guides/telemetry/log-drains#pricing)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)