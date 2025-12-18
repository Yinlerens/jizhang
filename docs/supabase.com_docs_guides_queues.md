---
url: "https://supabase.com/docs/guides/queues"
title: "Supabase Queues | Supabase Docs"
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

Main menu

[Queues](https://supabase.com/docs/guides/queues)

[Overview](https://supabase.com/docs/guides/queues)

Getting Started[Quickstart](https://supabase.com/docs/guides/queues/quickstart)
[Consuming Messages with Edge Functions](https://supabase.com/docs/guides/queues/consuming-messages-with-edge-functions)
[Expose Queues for local and self-hosted Supabase](https://supabase.com/docs/guides/queues/expose-self-hosted-queues)

References[API](https://supabase.com/docs/guides/queues/api)
[PGMQ Extension](https://supabase.com/docs/guides/queues/pgmq)

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

Queues

1. [Queues](https://supabase.com/docs/guides/queues)
3. [Overview](https://supabase.com/docs/guides/queues)

# Supabase Queues

## Durable Message Queues with Guaranteed Delivery in Postgres

* * *

Supabase Queues is a Postgres-native durable Message Queue system with guaranteed delivery built on the [pgmq database extension](https://github.com/tembo-io/pgmq). It offers developers a seamless way to persist and process Messages in the background while improving the resiliency and scalability of their applications and services.

Queues couples the reliability of Postgres with the simplicity Supabase's platform and developer experience, enabling developers to manage Background Tasks with zero configuration.

## Features [\#](https://supabase.com/docs/guides/queues\#features)

- **Postgres Native**

Built on top of the `pgmq` database extension, create and manage Queues with any Postgres tooling.
- **Guaranteed Message Delivery**

Messages added to Queues are guaranteed to be delivered to your consumers.
- **Exactly Once Message Delivery**

A Message is delivered exactly once to a consumer within a customizable visibility window.
- **Message Durability and Archival**

Messages are stored in Postgres and you can choose to archive them for analytical or auditing purposes.
- **Granular Authorization**

Control client-side consumer access to Queues with API permissions and Row Level Security (RLS) policies.
- **Queue Management and Monitoring**

Create, manage, and monitor Queues and Messages in the Supabase Dashboard.

## Resources [\#](https://supabase.com/docs/guides/queues\#resources)

- [Quickstart](https://supabase.com/docs/guides/queues/quickstart)
- [API Reference](https://supabase.com/docs/guides/queues/api)
- [`pgmq` GitHub Repository](https://github.com/tembo-io/pgmq)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/queues.mdx)

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