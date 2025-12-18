---
url: "https://supabase.com/docs/guides/security/product-security"
title: "Secure configuration of Supabase products | Supabase Docs"
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
5. [Product configuration](https://supabase.com/docs/guides/security/product-security)

# Secure configuration of Supabase products

* * *

The Supabase [production checklist](https://supabase.com/docs/guides/deployment/going-into-prod) provides detailed advice on preparing an app for production. While our [SOC 2](https://supabase.com/docs/guides/security/soc-2-compliance) and [HIPAA](https://supabase.com/docs/guides/security/hipaa-compliance) compliance documents outline the roles and responsibilities for building a secure and compliant app.

Various products at Supabase have their own hardening and configuration guides, below is a definitive list of these to help guide your way.

## Auth [\#](https://supabase.com/docs/guides/security/product-security\#auth)

- [Password security](https://supabase.com/docs/guides/auth/password-security)
- [Rate limits](https://supabase.com/docs/guides/auth/rate-limits)
- [Bot detection / Prevention](https://supabase.com/docs/guides/auth/auth-captcha)
- [JWTs](https://supabase.com/docs/guides/auth/jwts)

## Database [\#](https://supabase.com/docs/guides/security/product-security\#database)

- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Column Level Security](https://supabase.com/docs/guides/database/postgres/column-level-security)
- [Hardening the Data API](https://supabase.com/docs/guides/database/hardening-data-api)
- [Additional security controls for the Data API](https://supabase.com/docs/guides/api/securing-your-api)
- [Custom claims and role based access control](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
- [Managing Postgres roles](https://supabase.com/docs/guides/database/postgres/roles)
- [Managing secrets with Vault](https://supabase.com/docs/guides/database/vault)
- [Superuser access and unsupported operations](https://supabase.com/docs/guides/security/docs/guides/database/postgres/roles-superuser)

## Storage [\#](https://supabase.com/docs/guides/security/product-security\#storage)

- [Object ownership](https://supabase.com/docs/guides/storage/security/ownership)
- [Access control](https://supabase.com/docs/guides/storage/security/access-control)
  - The Storage API docs contain hints about required [RLS policy permissions](https://supabase.com/docs/reference/javascript/storage-createbucket)
- [Custom roles with the storage schema](https://supabase.com/docs/guides/storage/schema/custom-roles)

## Realtime [\#](https://supabase.com/docs/guides/security/product-security\#realtime)

- [Authorization](https://supabase.com/docs/guides/security/docs/guides/realtime/authorization)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/security/product-security.mdx)

### Is this helpful?

NoYes

### On this page

[Auth](https://supabase.com/docs/guides/security/product-security#auth) [Database](https://supabase.com/docs/guides/security/product-security#database) [Storage](https://supabase.com/docs/guides/security/product-security#storage) [Realtime](https://supabase.com/docs/guides/security/product-security#realtime)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)