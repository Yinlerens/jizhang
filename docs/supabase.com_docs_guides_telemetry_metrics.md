---
url: "https://supabase.com/docs/guides/telemetry/metrics"
title: "Metrics API | Supabase Docs"
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

[Overview](https://supabase.com/docs/guides/telemetry/metrics)
[Grafana Cloud](https://supabase.com/docs/guides/telemetry/metrics/grafana-cloud)
[Grafana self-hosted](https://supabase.com/docs/guides/telemetry/metrics/grafana-self-hosted)
[Datadog](https://docs.datadoghq.com/integrations/supabase/)
[Vendor-agnostic setup](https://supabase.com/docs/guides/telemetry/metrics/vendor-agnostic)

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
3. More
5. [Metrics](https://supabase.com/docs/guides/telemetry/metrics)
7. [Overview](https://supabase.com/docs/guides/telemetry/metrics)

# Metrics API

* * *

Every Supabase project exposes a [Prometheus](https://prometheus.io/)-compatible **Metrics API** endpoint that surfaces ~200 Postgres performance and health series. You can scrape it into any observability stack to power custom dashboards, alerting rules, or long-term retention that goes beyond what Supabase Studio provides out of the box.

The Metrics API is currently in beta. Metric names and labels might evolve as we expand the dataset, and the feature is not available in self-hosted Supabase instances.

## What you can do with the Metrics API [\#](https://supabase.com/docs/guides/telemetry/metrics\#what-you-can-do-with-the-metrics-api)

- Stream database CPU, IO, WAL, connection, and query stats into Prometheus-compatible systems.
- Combine Supabase metrics with application signals in Grafana, Datadog, or any other observability vendor.
- Reuse our [supabase-grafana dashboard JSON](https://github.com/supabase/supabase-grafana) to bootstrap over 200 ready-made charts.
- Build your own alerting policies (right-sizing, saturation detection, index regression, and more).

What you can do with the Metrics API

## Choose your monitoring stack [\#](https://supabase.com/docs/guides/telemetry/metrics\#choose-your-monitoring-stack)

Pick the workflow that best matches your tooling. Cards link to Supabase-authored guides or vendor integration docs, and some include a “Community” pill when there’s an accompanying vendor reference.

[Grafana Cloud (SaaS)\\
\\
Use Grafana Cloud’s managed Prometheus (works on Free + Pro tiers) and import the Supabase dashboard without running any infrastructure.\\
\\
Supabase guideCommunity](https://supabase.com/docs/guides/telemetry/metrics/grafana-cloud) [Grafana + self-hosted Prometheus\\
\\
Run Prometheus yourself following the official installation guidance and pair it with Grafana plus our dashboard JSON and alert pack.\\
\\
Supabase guide](https://supabase.com/docs/guides/telemetry/metrics/grafana-self-hosted) [Datadog\\
\\
Scrape the Metrics API with the Datadog Agent or Prometheus remote write and monitor Supabase alongside your app telemetry.\\
\\
Community](https://docs.datadoghq.com/integrations/supabase/) [Vendor-agnostic / BYO Prometheus\\
\\
Connect AWS AMP, Grafana Mimir, VictoriaMetrics, or any Prometheus-compatible SaaS with the same scrape job pattern.\\
\\
Supabase guide](https://supabase.com/docs/guides/telemetry/metrics/vendor-agnostic)

![Supabase Grafana dashboard showcasing database metrics](https://supabase.com/docs/img/guides/platform/supabase-grafana-prometheus.png)

## Additional resources [\#](https://supabase.com/docs/guides/telemetry/metrics\#additional-resources)

- [Supabase Grafana repository](https://github.com/supabase/supabase-grafana) for dashboard JSON and alert examples.
- [Grafana Cloud’s Supabase integration doc](https://grafana.com/docs/grafana-cloud/monitor-infrastructure/integrations/integration-reference/integration-supabase/) (community-maintained, built on this Metrics API).
- [Datadog’s Supabase integration doc](https://docs.datadoghq.com/integrations/supabase/) (community-maintained, built on this Metrics API).
- [Log Drains](https://supabase.com/docs/guides/telemetry/log-drains) for exporting event-based telemetry alongside metrics.
- [Query Performance report](https://supabase.com/dashboard/project/_/observability/query-performance) for built-in visualizations based on the same underlying metrics.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/telemetry/metrics.mdx)

### Is this helpful?

NoYes

### On this page

[What you can do with the Metrics API](https://supabase.com/docs/guides/telemetry/metrics#what-you-can-do-with-the-metrics-api) [Choose your monitoring stack](https://supabase.com/docs/guides/telemetry/metrics#choose-your-monitoring-stack) [Additional resources](https://supabase.com/docs/guides/telemetry/metrics#additional-resources)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)