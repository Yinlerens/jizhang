---
url: "https://supabase.com/docs/guides/security/security-testing"
title: "Security testing of your Supabase projects | Supabase Docs"
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
5. [Security testing](https://supabase.com/docs/guides/security/security-testing)

# Security testing of your Supabase projects

* * *

Supabase customer support policy for penetration testing

Customers of Supabase are permitted to carry out security assessments or penetration tests of their hosted Supabase project components. This testing may be carried out without prior approval for the customer services listed under [permitted services](https://supabase.com/docs/guides/security/security-testing#permitted-services). Supabase does not permit hosting security tooling that may be perceived as malicious or part of a campaign against Supabase customers or external services. This section is covered by the [Supabase Acceptable Use Policy](https://supabase.com/aup) (AUP).

It is the customer’s responsibility to ensure that testing activities are aligned with this policy. Any testing performed outside of the policy will be seen as testing directly against Supabase and may be flagged as abuse behaviour. If Supabase receives an abuse report for activities related to your security testing, we will forward these to you. If you discover a security issue within any of the Supabase products, contact [Supabase Security](mailto:security@supabase.io) immediately.

Furthermore, Supabase runs a [Vulnerability Disclosure Program](https://hackerone.com/ca63b563-9661-4ac3-8d23-7581582ef451/embedded_submissions/new) (VDP) with HackerOne, and external security researchers may report any bugs found within the scope of the aforementioned program. Customer penetration testing does not form part of this VDP.

### Permitted services [\#](https://supabase.com/docs/guides/security/security-testing\#permitted-services)

- Authentication
- Database
- Edge Functions
- Storage
- Realtime
- `https://<customer_project_ref>.supabase.co/*`
- `https://db.<customer_project_ref>.supabase.co/*`

### Prohibited testing and activities [\#](https://supabase.com/docs/guides/security/security-testing\#prohibited-testing-and-activities)

- Any activity contrary to what is listed in the AUP.
- Denial of Service (DoS) and Distributed Denial of Service (DDoS) testing.
- Cross-tenant attacks, testing that directly targets other Supabase customers' accounts, organizations, and projects not under the customer’s control.
- Request flooding.

## Terms and conditions [\#](https://supabase.com/docs/guides/security/security-testing\#terms-and-conditions)

The customer agrees to the following,

Security testing:

- Will be limited to the services within the customer’s project.
- Is subject to the general [Terms of Service](https://supabase.com/terms).
- Is within the [Acceptable Usage Policy](https://supabase.com/aup).
- Will be stopped if contacted by Supabase due to a breach of the above or a negative impact on Supabase and Supabase customers.
- Any vulnerabilities discovered directly in a Supabase product will be reported to Supabase Security within 24 hours of completion of testing.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/security/security-testing.mdx)

### Is this helpful?

NoYes

### On this page

[Permitted services](https://supabase.com/docs/guides/security/security-testing#permitted-services) [Prohibited testing and activities](https://supabase.com/docs/guides/security/security-testing#prohibited-testing-and-activities) [Terms and conditions](https://supabase.com/docs/guides/security/security-testing#terms-and-conditions)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)