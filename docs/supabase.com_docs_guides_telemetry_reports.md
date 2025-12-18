---
url: "https://supabase.com/docs/guides/telemetry/reports"
title: "Reports | Supabase Docs"
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
5. [Reports](https://supabase.com/docs/guides/telemetry/reports)

# Reports

* * *

Supabase Reports provide comprehensive observability for your project through dedicated monitoring dashboards that visualize key metrics across your database, auth, storage, realtime, and API systems. Each report offers self-debugging tools to gain actionable insights for optimizing performance and troubleshooting issues.

Reports are only available for projects hosted on the Supabase Cloud platform and are not available for self-hosted instances.

## Using reports [\#](https://supabase.com/docs/guides/telemetry/reports\#using-reports)

Reports can be filtered by time range to focus your analysis on specific periods. Available time ranges are gated by your organization's plan, with higher-tier plans providing access to longer historical periods.

| Time Range | Free | Pro | Team | Enterprise |
| --- | --- | --- | --- | --- |
| Last 10 minutes | ✅ | ✅ | ✅ | ✅ |
| Last 30 minutes | ✅ | ✅ | ✅ | ✅ |
| Last 60 minutes | ✅ | ✅ | ✅ | ✅ |
| Last 3 hours | ✅ | ✅ | ✅ | ✅ |
| Last 24 hours | ✅ | ✅ | ✅ | ✅ |
| Last 7 days | ❌ | ✅ | ✅ | ✅ |
| Last 14 days | ❌ | ❌ | ✅ | ✅ |
| Last 28 days | ❌ | ❌ | ✅ | ✅ |

* * *

## Database [\#](https://supabase.com/docs/guides/telemetry/reports\#database)

The Database report provides the most comprehensive view into your Postgres instance's health and performance characteristics. These charts help you identify performance bottlenecks, resource constraints, and optimization opportunities at a glance.

The following charts are available for Free and Pro plans:

| Chart | Available Plans | Description | Key Insights |
| --- | --- | --- | --- |
| Memory usage | Free, Pro | RAM usage percentage by the database | Memory pressure and resource utilization |
| CPU usage | Free, Pro | Average CPU usage percentage | CPU-intensive query identification |
| Disk IOPS | Free, Pro | Read/write operations per second with limits | IO bottleneck detection and workload analysis |
| Database connections | Free, Pro | Number of pooler connections to the database | Connection pool monitoring |
| Shared Pooler connections | All | Client connections to the shared pooler | Shared pooler usage patterns |
| Dedicated Pooler connections | All | Client connections to PgBouncer | Dedicated pooler connection monitoring |

### Advanced Telemetry [\#](https://supabase.com/docs/guides/telemetry/reports\#advanced-telemetry)

The following charts provide a more advanced and detailed view of your database performance and are available only for Team, Enterprise, and Platform plans.

### Memory usage [\#](https://supabase.com/docs/guides/telemetry/reports\#memory-usage)

![Memory usage chart](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fdatabase%2Freports%2Fmemory-usage-chart-light.png&w=3840&q=75)

| Component | Description |
| --- | --- |
| **Used** | RAM actively used by Postgres and the operating system |
| **Cache + buffers** | Memory used for page cache and Postgres buffers |
| **Free** | Available unallocated memory |

How it helps debug issues:

| Issue | Description |
| --- | --- |
| Memory pressure detection | Identify when free memory is consistently low |
| Cache effectiveness monitoring | Monitor cache performance for query optimization |
| Memory leak detection | Detect inefficient memory usage patterns |

Actions you can take:

| Action | Description |
| --- | --- |
| [Upgrade compute size](https://supabase.com/docs/guides/platform/compute-and-disk#compute-size) | Increase available memory resources |
| Optimize queries | Reduce memory consumption of expensive queries |
| Tune Postgres configuration | Improve memory management settings |
| Implement application caching | Add query result caching to reduce memory load |

### CPU usage [\#](https://supabase.com/docs/guides/telemetry/reports\#cpu-usage)

![CPU usage chart](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fdatabase%2Freports%2Fcpu-usage-chart-light.png&w=3840&q=75)

| Category | Description |
| --- | --- |
| **System** | CPU time for kernel operations |
| **User** | CPU time for database queries and user processes |
| **IOWait** | CPU time waiting for disk/network IO |
| **IRQs** | CPU time handling interrupts |
| **Other** | CPU time for miscellaneous tasks |

How it helps debug issues:

| Issue | Description |
| --- | --- |
| CPU-intensive query identification | Identify expensive queries when User CPU is high |
| IO bottleneck detection | Detect disk/network issues when IOWait is elevated |
| System overhead monitoring | Monitor resource contention and kernel overhead |

Actions you can take:

| Action | Description |
| --- | --- |
| Optimize CPU-intensive queries | Target queries causing high User CPU usage |
| Address IO bottlenecks | Resolve disk/network issues when IOWait is high |
| [Upgrade compute size](https://supabase.com/docs/guides/platform/compute-and-disk) | Increase available CPU capacity |
| Implement proper indexing | Use [query optimization](https://supabase.com/docs/guides/database/postgres/indexes) techniques |

### Disk input/output operations per second (IOPS) [\#](https://supabase.com/docs/guides/telemetry/reports\#disk-inputoutput-operations-per-second-iops)

![Disk IOPS chart](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fdatabase%2Freports%2Fdisk-iops-chart-light.png&w=3840&q=75)

This chart displays read and write IOPS with a reference line showing your compute size's maximum IOPS capacity.

How it helps debug issues:

| Issue | Description |
| --- | --- |
| Disk IO bottleneck identification | Identify when disk IO becomes a performance constraint |
| Workload pattern analysis | Distinguish between read-heavy vs write-heavy operations |
| Performance correlation | Spot disk activity spikes that correlate with performance issues |

Actions you can take:

| Action | Description |
| --- | --- |
| Optimize indexing | Reduce high read IOPS through better query indexing |
| Consider read replicas | Distribute read-heavy workloads across multiple instances |
| Batch write operations | Reduce write IOPS by grouping database writes |
| [Upgrade compute size](https://supabase.com/docs/guides/platform/compute-and-disk) | Increase IOPS limits with larger compute instances |

### Disk throughput [\#](https://supabase.com/docs/guides/telemetry/reports\#disk-throughput)

Available on Team and Enterprise plans.

This chart displays read and write throughput (bytes per second) with a reference line showing your compute size's maximum disk throughput.

How it helps debug issues:

| Issue | Description |
| --- | --- |
| Throughput bottleneck identification | Spot when disk bandwidth is saturated |
| Workload pattern analysis | Differentiate read-heavy vs write-heavy bandwidth usage |
| Performance correlation | Correlate spikes with query performance changes |

Actions you can take:

| Action | Description |
| --- | --- |
| Optimize query patterns | Reduce large sequential reads/writes |
| Tune caching and batching | Minimize repeated disk access and improve throughput headroom |
| [Upgrade compute size](https://supabase.com/docs/guides/platform/compute-and-disk) | Increase throughput limits for sustained workloads |

### Disk size [\#](https://supabase.com/docs/guides/telemetry/reports\#disk-size)

![Disk Size chart](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fdatabase%2Freports%2Fdisk-size-chart-light.png&w=3840&q=75)

| Component | Description |
| --- | --- |
| **Database** | Space used by your actual database data (tables, indexes) |
| **WAL** | Space used by Write-Ahead Logging |
| **System** | Reserved space for system operations |

How it helps debug issues:

| Issue | Description |
| --- | --- |
| Space consumption monitoring | Track disk usage trends over time |
| Growth pattern identification | Identify rapid growth requiring attention |
| Capacity planning | Plan upgrades before hitting storage limits |

Actions you can take:

| Action | Description |
| --- | --- |
| Run [VACUUM](https://www.postgresql.org/docs/current/sql-vacuum.html) operations | Reclaim dead tuple space and optimize storage |
| Analyze large tables | Use CLI commands like `table-sizes` to identify optimization targets |
| Implement data archival | Archive historical data to reduce active storage needs |
| [Upgrade disk size](https://supabase.com/docs/guides/platform/database-size) | Increase storage capacity when approaching limits |

### Database connections [\#](https://supabase.com/docs/guides/telemetry/reports\#database-connections)

![Database connections chart](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fdatabase%2Freports%2Fdb-connections-chart-light.png&w=3840&q=75)

| Connection Type | Description |
| --- | --- |
| **Postgres** | Direct connections from your application |
| **PostgREST** | Connections from the PostgREST API layer |
| **Reserved** | Administrative connections for Supabase services |
| **Auth** | Connections from Supabase Auth service |
| **Storage** | Connections from Supabase Storage service |
| **Other roles** | Miscellaneous database connections |

How it helps debug issues:

| Issue | Description |
| --- | --- |
| Connection pool exhaustion | Identify when approaching maximum connection limits |
| Connection leak detection | Spot applications not properly closing connections |
| Service distribution monitoring | Monitor connection usage across different Supabase services |

Actions you can take:

| Action | Description |
| --- | --- |
| [Upgrade compute size](https://supabase.com/docs/guides/platform/compute-and-disk#compute-size) | Increase maximum connection limits |
| Implement [connection pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#shared-pooler) | Optimize connection management for high direct connection usage |
| Review application code | Ensure proper connection handling and cleanup |

## Auth [\#](https://supabase.com/docs/guides/telemetry/reports\#auth)

The Auth report focuses on user authentication patterns and behaviors within your Supabase project.

| Chart | Description | Key Insights |
| --- | --- | --- |
| Active Users | Count of unique users performing auth actions | User engagement and retention patterns |
| Sign In Attempts by Type | Breakdown of authentication methods used | Password vs OAuth vs magic link preferences |
| Sign Ups | Total new user registrations | Growth trends and onboarding funnel performance |
| Auth Errors | Error rates grouped by status code | Authentication friction and security issues |
| Password Reset Requests | Volume of password recovery attempts | User experience pain points |

## Storage [\#](https://supabase.com/docs/guides/telemetry/reports\#storage)

The Storage report provides visibility into how your Supabase Storage is being utilized, including request patterns, performance characteristics, and caching effectiveness.

| Chart | Description | Key Insights |
| --- | --- | --- |
| Total Requests | Overall request volume to Storage | Traffic patterns and usage trends |
| Response Speed | Average response time for storage requests | Performance bottlenecks and optimization opportunities |
| Network Traffic | Ingress and egress usage | Data transfer costs and CDN effectiveness |
| Request Caching | Cache hit rates and miss patterns | CDN performance and cost optimization |
| Top Routes | Most frequently accessed storage paths | Popular content and usage patterns |

## Realtime [\#](https://supabase.com/docs/guides/telemetry/reports\#realtime)

The Realtime report tracks WebSocket connections, channel activity, and real-time event patterns in your Supabase project.

| Chart | Description | Key Insights |
| --- | --- | --- |
| Realtime Connections | Active WebSocket connections over time | Concurrent user activity and connection stability |
| Broadcast Events | Broadcast events over time | Real-time feature usage patterns |
| Presence Events | Presence events over time | Real-time feature usage patterns |
| Postgres Changes Events | Postgres Changes events over time | Real-time feature usage patterns |
| Rate of Channel Joins | Frequency of new channel subscriptions | User engagement with real-time features |
| Message Payload Size | Median size of message payloads sent | Payload size that is being transmitted |
| Broadcast From Database Replication Lag | Median latency between database commit and broadcast when using broadcast from database | Latency to Broadcast from the database |
| Read/Write Private Channel Subscription RLS Execution Time | Median time to authorize private channels | `realtime.messages` RLS policies performance |
| Total Requests | HTTP requests to Realtime endpoints | API usage alongside WebSocket activity |
| Response Speed | Performance of Realtime API endpoints | Infrastructure optimization opportunities |

## Edge Functions [\#](https://supabase.com/docs/guides/telemetry/reports\#edge-functions)

The Edge Functions report provides insights into serverless function performance, execution patterns, and regional distribution across Supabase's global edge network.

| Chart | Description | Key Insights |
| --- | --- | --- |
| Execution Status Codes | Function response codes and error rates | Function reliability and error patterns |
| Execution Time | Average function duration and performance | Performance optimization opportunities |
| Invocations by Region | Geographic distribution of function calls | Global usage patterns and latency optimization |

## API gateway [\#](https://supabase.com/docs/guides/telemetry/reports\#api-gateway)

The API Gateway report analyzes traffic patterns and performance characteristics of requests flowing through your Supabase project's API layer.

| Chart | Description | Key Insights |
| --- | --- | --- |
| Total Requests | Overall API request volume | Traffic patterns and growth trends |
| Response Errors | Error rates with 4XX and 5XX status codes | API reliability and user experience issues |
| Response Speed | Average API response times | Performance bottlenecks and optimization targets |
| Network Traffic | Request and response egress usage | Data transfer patterns and cost implications |
| Top Routes | Most frequently accessed API endpoints | Usage patterns and optimization priorities |

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/telemetry/reports.mdx)

### Is this helpful?

NoYes

### On this page

[Using reports](https://supabase.com/docs/guides/telemetry/reports#using-reports) [Database](https://supabase.com/docs/guides/telemetry/reports#database) [Advanced Telemetry](https://supabase.com/docs/guides/telemetry/reports#advanced-telemetry) [Memory usage](https://supabase.com/docs/guides/telemetry/reports#memory-usage) [CPU usage](https://supabase.com/docs/guides/telemetry/reports#cpu-usage) [Disk input/output operations per second (IOPS)](https://supabase.com/docs/guides/telemetry/reports#disk-inputoutput-operations-per-second-iops) [Disk throughput](https://supabase.com/docs/guides/telemetry/reports#disk-throughput) [Disk size](https://supabase.com/docs/guides/telemetry/reports#disk-size) [Database connections](https://supabase.com/docs/guides/telemetry/reports#database-connections) [Auth](https://supabase.com/docs/guides/telemetry/reports#auth) [Storage](https://supabase.com/docs/guides/telemetry/reports#storage) [Realtime](https://supabase.com/docs/guides/telemetry/reports#realtime) [Edge Functions](https://supabase.com/docs/guides/telemetry/reports#edge-functions) [API gateway](https://supabase.com/docs/guides/telemetry/reports#api-gateway)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)