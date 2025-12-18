---
url: "https://supabase.com/docs/guides/security/platform-audit-logs"
title: "Platform Audit Logs | Supabase Docs"
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

[Security](https://supabase.com/docs/guides/security)

[Overview](https://supabase.com/docs/guides/security)

Product security[Platform configuration](https://supabase.com/docs/guides/security/platform-security)
[Product configuration](https://supabase.com/docs/guides/security/product-security)
[Security testing](https://supabase.com/docs/guides/security/security-testing)
[Platform Audit Logs](https://supabase.com/docs/guides/security/platform-audit-logs)

Compliance[SOC 2](https://supabase.com/docs/guides/security/soc-2-compliance)
[HIPAA](https://supabase.com/docs/guides/security/hipaa-compliance)

Guides[Production Checklist](https://supabase.com/docs/guides/deployment/going-into-prod)
[Shared Responsibility Model](https://supabase.com/docs/guides/deployment/shared-responsibility-model)
[Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
[Hardening the Data API](https://supabase.com/docs/guides/database/hardening-data-api)

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

Security

1. [Security](https://supabase.com/docs/guides/security)
3. Product security
5. [Platform Audit Logs](https://supabase.com/docs/guides/security/platform-audit-logs)

# Platform Audit Logs

* * *

Any [Platform API](https://supabase.com/docs/reference/api/introduction) or [dashboard](https://supabase.com/dashboard) actions performed by organization members are logged automatically for auditing and security purposes. This includes actions such as creating a new project, inviting members, modifying an edge function or changing project settings.

Besides Platform Audit Logs, Supabase Auth also provides [Auth Audit Logs](https://supabase.com/docs/guides/auth/audit-logs) to monitor authentication-related activities within your projects.

Platform Audit Logs are only available on the [Team and Enterprise plans](https://supabase.com/pricing).

## Accessing audit logs [\#](https://supabase.com/docs/guides/security/platform-audit-logs\#accessing-audit-logs)

Platform Audit Logs can be found under your [organization's audit logs](https://supabase.com/dashboard/org/_/audit).

![Platform audit logs](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Fguides%2Fsecurity%2Fplatform-audit-logs--light.png&w=3840&q=75)

For each audit log, you can see additional details by clicking on the log entry:

- Timestamp of action
- Actor who performed the action
  - IP address
  - Email
  - Token Type
- Action performed
  - Name
  - Metadata such as route and response status
- Action Target (Project, organization, Edge Function, ...)

## Limitations [\#](https://supabase.com/docs/guides/security/platform-audit-logs\#limitations)

- There is currently no way to export the logs via dashboard
- There is currently no way to set up a log drain of platform audit logs
- Retention periods depend on your plan

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/security/platform-audit-logs.mdx)

### Is this helpful?

NoYes

### On this page

[Accessing audit logs](https://supabase.com/docs/guides/security/platform-audit-logs#accessing-audit-logs) [Limitations](https://supabase.com/docs/guides/security/platform-audit-logs#limitations)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)