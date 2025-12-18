---
url: "https://supabase.com/docs/guides/security/platform-security"
title: "Secure configuration of Supabase platform | Supabase Docs"
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
5. [Platform configuration](https://supabase.com/docs/guides/security/platform-security)

# Secure configuration of Supabase platform

* * *

The Supabase hosted platform provides a secure by default configuration. Some organizations may however require further security controls to meet their own security policies or compliance requirements.

Access to additional security controls can be found under the [security tab](https://supabase.com/dashboard/org/_/security) for organizations.

## Available controls [\#](https://supabase.com/docs/guides/security/platform-security\#available-controls)

Additional security controls are under active development. Any changes will be published here and
in our [changelog](https://supabase.com/changelog).

### Enforce multi-factor authentication (MFA) [\#](https://supabase.com/docs/guides/security/platform-security\#enforce-multi-factor-authentication-mfa)

Organization owners can choose to enforce MFA for all team members.

For configuration information, see [Enforce MFA on Organization](https://supabase.com/docs/guides/platform/mfa/org-mfa-enforcement)

### SSO for organizations [\#](https://supabase.com/docs/guides/security/platform-security\#sso-for-organizations)

Supabase offers single sign-on (SSO) as a login option to provide additional account security for your team. This allows company administrators to enforce the use of an identity provider when logging into Supabase.

For configuration information, see [Enable SSO for Your Organization](https://supabase.com/docs/guides/platform/sso).

### Postgres SSL enforcement [\#](https://supabase.com/docs/guides/security/platform-security\#postgres-ssl-enforcement)

Supabase projects support connecting to the Postgres DB without SSL enforced to maximize client compatibility. For increased security, you can prevent clients from connecting if they're not using SSL.

For configuration information, see [Postgres SSL Enforcement](https://supabase.com/docs/guides/platform/ssl-enforcement)

Controlling this at the organization level is on our roadmap.

### Network restrictions [\#](https://supabase.com/docs/guides/security/platform-security\#network-restrictions)

Each Supabase project comes with configurable restrictions on the IP ranges that are allowed to connect to Postgres and its pooler ("your database"). These restrictions are enforced before traffic reaches the database. If a connection is not restricted by IP, it still needs to authenticate successfully with valid database credentials.

For configuration information, see [Network Restrictions](https://supabase.com/docs/guides/platform/network-restrictions)

Controlling this at the organization level is on our roadmap.

### PrivateLink [\#](https://supabase.com/docs/guides/security/platform-security\#privatelink)

PrivateLink provides enterprise-grade private network connectivity between your AWS VPC and your Supabase database using AWS VPC Lattice. This eliminates exposure to the public internet by creating a secure, private connection that keeps your database traffic within the AWS network backbone.

For configuration information, see [PrivateLink](https://supabase.com/docs/guides/platform/privatelink)

PrivateLink is currently in alpha and available exclusively to Enterprise customers.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/security/platform-security.mdx)

### Is this helpful?

NoYes

### On this page

[Available controls](https://supabase.com/docs/guides/security/platform-security#available-controls) [Enforce multi-factor authentication (MFA)](https://supabase.com/docs/guides/security/platform-security#enforce-multi-factor-authentication-mfa) [SSO for organizations](https://supabase.com/docs/guides/security/platform-security#sso-for-organizations) [Postgres SSL enforcement](https://supabase.com/docs/guides/security/platform-security#postgres-ssl-enforcement) [Network restrictions](https://supabase.com/docs/guides/security/platform-security#network-restrictions) [PrivateLink](https://supabase.com/docs/guides/security/platform-security#privatelink)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)