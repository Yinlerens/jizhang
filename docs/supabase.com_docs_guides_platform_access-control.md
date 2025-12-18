---
url: "https://supabase.com/docs/guides/platform/access-control"
title: "Access Control | Supabase Docs"
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
3. Project & Account Management
5. [Access Control](https://supabase.com/docs/guides/platform/access-control)

# Access Control

* * *

Supabase provides granular access controls to manage permissions across your organizations and projects.

For each organization and project, a member can have one of the following roles:

- **Owner**: full access to everything in organization and project resources.
- **Administrator**: full access to everything in organization and project resources **except** updating organization settings, transferring projects outside of the organization, and adding new owners.
- **Developer**: read-only access to organization resources and content access to project resources but cannot change any project settings.
- **Read-Only**: read-only access to organization and project resources.

Read-Only role is only available on the [Team and Enterprise plans](https://supabase.com/pricing).

When you first create an account, a default organization is created for you and you'll be assigned as the **Owner**. Any organizations you create will assign you as **Owner** as well.

## Manage organization members [\#](https://supabase.com/docs/guides/platform/access-control\#manage-organization-members)

To invite others to collaborate, visit your organization's team [settings](https://supabase.com/dashboard/org/_/team) to send an invite link to another user's email. The invite is valid for 24 hours. For project scoped roles, you may only assign a role to a single project for the user when sending the invite. You can assign roles to multiple projects after the user accepts the invite.

Invites sent from a SAML SSO account can only be accepted by another SAML SSO account from the same identity provider.

This is a security measure to prevent accidental invites to accounts not managed by your enterprise's identity provider.

### Viewing organization members using the Management API [\#](https://supabase.com/docs/guides/platform/access-control\#viewing-organization-members-using-the-management-api)

You can also view organization members using the Management API:

```
1
# Get your access token from https://supabase.com/dashboard/account/tokens
2
export SUPABASE_ACCESS_TOKEN="your-access-token"
3
export ORG_ID="your-organization-id"
4

5
# List organization members
6
curl "https://api.supabase.com/v1/organizations/$ORG_ID/members" \
7
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN"
```

### Transferring ownership of an organization [\#](https://supabase.com/docs/guides/platform/access-control\#transferring-ownership-of-an-organization)

Each Supabase organization must have at least one owner. If your organization has other owners then you can relinquish ownership and leave the organization by clicking **Leave team** in your organization's team [settings](https://supabase.com/dashboard/org/_/team).

Otherwise, you'll need to invite a user as **Owner**, and they need to accept the invitation, or promote an existing organization member to **Owner** before you can leave the organization.

### Organization scoped roles vs project scoped roles [\#](https://supabase.com/docs/guides/platform/access-control\#organization-scoped-roles-vs-project-scoped-roles)

Project scoped roles are only available on the [Team and Enterprise plans](https://supabase.com/pricing).

Each member in the organization can be assigned a role that is scoped either to the entire organization or to specific projects.

- If a member has an organization-level role, they will have the corresponding permissions across all current and future projects within that organization.
- If a member is assigned a project-scoped role, they will only have access to the specific projects they've been assigned to. They will not be able to view, access, or even see other projects within the organization on the Supabase Dashboard.

This allows for more granular control, ensuring that users only have visibility and access to the projects relevant to their role.

### Organization permissions across roles [\#](https://supabase.com/docs/guides/platform/access-control\#organization-permissions-across-roles)

The table below shows the actions each role can take on the resources belonging to the organization.

| Resource | Action | Owner | Administrator | Developer | Read-Only[1](https://supabase.com/docs/guides/platform/access-control#user-content-fn-1) |
| --- | --- | :-: | :-: | :-: | :-: |
| [**Organization**](https://supabase.com/docs/guides/platform/access-control#org-permissions) |  |  |  |  |  |
| Organization Management | Update |  |  |  |  |
|  | Delete |  |  |  |  |
| OpenAI Telemetry Configuration[2](https://supabase.com/docs/guides/platform/access-control#user-content-fn-2) | Update |  |  |  |  |
| [**Members**](https://supabase.com/docs/guides/platform/access-control#member-permissions) |  |  |  |  |  |
| Organization Members | List |  |  |  |  |
| Owner | Add |  |  |  |  |
|  | Remove |  |  |  |  |
| Administrator | Add |  |  |  |  |
|  | Remove |  |  |  |  |
| Developer | Add |  |  |  |  |
|  | Remove |  |  |  |  |
| Owner (Project-Scoped) | Add |  |  |  |  |
|  | Remove |  |  |  |  |
| Administrator (Project-Scoped) | Add |  |  |  |  |
|  | Remove |  |  |  |  |
| Developer (Project-Scoped) | Add |  |  |  |  |
|  | Remove |  |  |  |  |
| Invite | Revoke |  |  |  |  |
|  | Resend |  |  |  |  |
|  | Accept[3](https://supabase.com/docs/guides/platform/access-control#user-content-fn-3) |  |  |  |  |
| [**Billing**](https://supabase.com/docs/guides/platform/access-control#billing-permissions) |  |  |  |  |  |
| Invoices | List |  |  |  |  |
| Billing Email | View |  |  |  |  |
|  | Update |  |  |  |  |
| Subscription | View |  |  |  |  |
|  | Update |  |  |  |  |
| Billing Address | View |  |  |  |  |
|  | Update |  |  |  |  |
| Tax Codes | View |  |  |  |  |
|  | Update |  |  |  |  |
| Payment Methods | View |  |  |  |  |
|  | Update |  |  |  |  |
| Usage | View |  |  |  |  |
| [**Integrations (Org Settings)**](https://supabase.com/docs/guides/platform/access-control#org-integration-permissions) |  |  |  |  |  |
| Authorize GitHub | - |  |  |  |  |
| Add GitHub Repositories | - |  |  |  |  |
| GitHub Connections | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | View |  |  |  |  |
| Vercel Connections | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | View |  |  |  |  |
| [**OAuth Apps**](https://supabase.com/docs/guides/platform/access-control#oauth-permissions) |  |  |  |  |  |
| OAuth Apps | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | List |  |  |  |  |
| [**Audit Logs**](https://supabase.com/docs/guides/platform/access-control#audit-permissions) |  |  |  |  |  |
| View Audit logs | - |  |  |  |  |
| [**Legal Documents**](https://supabase.com/docs/guides/platform/access-control#legal-docs-permissions) |  |  |  |  |  |
| SOC2 Type 2 Report | Download |  |  |  |  |
| Security Questionnaire | Download |  |  |  |  |

### Project permissions across roles [\#](https://supabase.com/docs/guides/platform/access-control\#project-permissions-across-roles)

The table below shows the actions each role can take on the resources belonging to the project.

| Resource | Action | Owner | Admin | Developer | Read-Only[4](https://supabase.com/docs/guides/platform/access-control#user-content-fn-4)[5](https://supabase.com/docs/guides/platform/access-control#user-content-fn-6) |
| --- | --- | :-: | :-: | :-: | :-: |
| [**Project**](https://supabase.com/docs/guides/platform/access-control#project-permissions) |  |  |  |  |  |
| Project Management | Transfer |  |  |  |  |
|  | Create |  |  |  |  |
|  | Delete |  |  |  |  |
|  | Update (Name) |  |  |  |  |
|  | Pause |  |  |  |  |
|  | Restore |  |  |  |  |
|  | Restart |  |  |  |  |
| Custom Domains | View |  |  |  |  |
|  | Update |  |  |  |  |
| Data (Database) | View |  |  |  |  |
|  | Manage |  |  |  |  |
| [**Infrastructure**](https://supabase.com/docs/guides/platform/access-control#infrastructure-permissions) |  |  |  |  |  |
| Read Replicas | List |  |  |  |  |
|  | Create |  |  |  |  |
|  | Delete |  |  |  |  |
| Add-ons | Update |  |  |  |  |
| [**Integrations**](https://supabase.com/docs/guides/platform/access-control#proj-integrations-permissions) |  |  |  |  |  |
| Authorize GitHub | - |  |  |  |  |
| Add GitHub Repositories | - |  |  |  |  |
| GitHub Connections | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | View |  |  |  |  |
| Vercel Connections | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | View |  |  |  |  |
| [**Database Configuration**](https://supabase.com/docs/guides/platform/access-control#database-config-permissions) |  |  |  |  |  |
| Reset Password | - |  |  |  |  |
| Pooling Settings | View |  |  |  |  |
|  | Update |  |  |  |  |
| SSL Configuration | View |  |  |  |  |
|  | Update |  |  |  |  |
| Disk Size Configuration | View |  |  |  |  |
|  | Update |  |  |  |  |
| Network Restrictions | View |  |  |  |  |
|  | Create |  |  |  |  |
|  | Delete |  |  |  |  |
| Network Bans | View |  |  |  |  |
|  | Unban |  |  |  |  |
| [**API Configuration**](https://supabase.com/docs/guides/platform/access-control#api-config-permissions) |  |  |  |  |  |
| API Keys | Read service key |  |  |  |  |
|  | Read anon key |  |  |  |  |
| JWT Secret | View |  |  |  |  |
|  | Generate new |  |  |  |  |
| API settings | View |  |  |  |  |
|  | Update |  |  |  |  |
| [**Auth Configuration**](https://supabase.com/docs/guides/platform/access-control#auth-config-permissions) |  |  |  |  |  |
| Auth Settings | View |  |  |  |  |
|  | Update |  |  |  |  |
| SMTP Settings | View |  |  |  |  |
|  | Update |  |  |  |  |
| Advanced Settings | View |  |  |  |  |
|  | Update |  |  |  |  |
| [**Storage Configuration**](https://supabase.com/docs/guides/platform/access-control#storage-config-permissions) |  |  |  |  |  |
| Upload Limit | View |  |  |  |  |
|  | Update |  |  |  |  |
| S3 Access Keys | View |  |  |  |  |
|  | Create |  |  |  |  |
|  | Delete |  |  |  |  |
| [**Edge Functions Configuration**](https://supabase.com/docs/guides/platform/access-control#edge-config-permissions) |  |  |  |  |  |
| Secrets | View |  |  |  | [6](https://supabase.com/docs/guides/platform/access-control#user-content-fn-5) |
|  | Create |  |  |  |  |
|  | Delete |  |  |  |  |
| [**SQL Editor**](https://supabase.com/docs/guides/platform/access-control#sql-editor-permissions) |  |  |  |  |  |
| Queries | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | View |  |  |  |  |
|  | List |  |  |  |  |
|  | Run |  |  |  | [7](https://supabase.com/docs/guides/platform/access-control#user-content-fn-7) |
| [**Database**](https://supabase.com/docs/guides/platform/access-control#database-permissions) |  |  |  |  |  |
| Scheduled Backups | View |  |  |  |  |
|  | Download |  |  |  |  |
|  | Restore |  |  |  |  |
| Physical backups (PITR) | View |  |  |  |  |
|  | Restore |  |  |  |  |
| [**Authentication**](https://supabase.com/docs/guides/platform/access-control#auth-permissions) |  |  |  |  |  |
| Users | Create |  |  |  |  |
|  | Delete |  |  |  |  |
|  | List |  |  |  |  |
|  | Send OTP |  |  |  |  |
|  | Send password recovery |  |  |  |  |
|  | Send magic link |  |  |  |  |
|  | Remove MFA factors |  |  |  |  |
| Providers | View |  |  |  |  |
|  | Update |  |  |  |  |
| Rate Limits | View |  |  |  |  |
|  | Update |  |  |  |  |
| Email Templates | View |  |  |  |  |
|  | Update |  |  |  |  |
| URL Configuration | View |  |  |  |  |
|  | Update |  |  |  |  |
| Hooks | View |  |  |  |  |
|  | Create |  |  |  |  |
|  | Delete |  |  |  |  |
| [**Storage**](https://supabase.com/docs/guides/platform/access-control#storage-permissions) |  |  |  |  |  |
| Buckets | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | View |  |  |  |  |
|  | List |  |  |  |  |
| Files | Create (Upload) |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | List |  |  |  |  |
| [**Edge Functions**](https://supabase.com/docs/guides/platform/access-control#edge-permissions) |  |  |  |  |  |
| Edge Functions | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | View |  |  |  |  |
|  | List |  |  |  |  |
| [**Reports**](https://supabase.com/docs/guides/platform/access-control#proj-reports-permissions) |  |  |  |  |  |
| Custom Report | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | View |  |  |  |  |
|  | List |  |  |  |  |
| [**Logs & Analytics**](https://supabase.com/docs/guides/platform/access-control#proj-logs-permissions) |  |  |  |  |  |
| Queries | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |
|  | View |  |  |  |  |
|  | List |  |  |  |  |
|  | Run |  |  |  |  |
| [**Branching**](https://supabase.com/docs/guides/platform/access-control#branching-permissions) |  |  |  |  |  |
| Production Branch | Read |  |  |  |  |
|  | Write |  |  |  |  |
| Development Branches | List |  |  |  |  |
|  | Create |  |  |  |  |
|  | Update |  |  |  |  |
|  | Delete |  |  |  |  |

## Footnotes [\#](https://supabase.com/docs/guides/platform/access-control\#footnote-label)

1. Available on the Team and Enterprise Plans. [↩](https://supabase.com/docs/guides/platform/access-control#user-content-fnref-1)

2. Sending anonymous data to OpenAI is opt in and can improve Studio AI Assistant's responses. [↩](https://supabase.com/docs/guides/platform/access-control#user-content-fnref-2)

3. Invites sent from a SSO account can only be accepted by another SSO account coming from the same identity provider. This is a security measure that prevents accidental invites to accounts not managed by your company's enterprise systems. [↩](https://supabase.com/docs/guides/platform/access-control#user-content-fnref-3)

4. Available on the Team and Enterprise Plans. [↩](https://supabase.com/docs/guides/platform/access-control#user-content-fnref-4)

5. Listed permissions are for the API and Dashboard. [↩](https://supabase.com/docs/guides/platform/access-control#user-content-fnref-6)

6. Read-Only role is able to access secrets. [↩](https://supabase.com/docs/guides/platform/access-control#user-content-fnref-5)

7. Limited to executing SELECT queries. SQL Query Snippets run by the Read-Only role are run against the database using the **supabase\_read\_only\_user**. This role has the [predefined Postgres role pg\_read\_all\_data](https://www.postgresql.org/docs/current/predefined-roles.html). [↩](https://supabase.com/docs/guides/platform/access-control#user-content-fnref-7)


[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/access-control.mdx)

### Is this helpful?

NoYes

### On this page

[Manage organization members](https://supabase.com/docs/guides/platform/access-control#manage-organization-members) [Viewing organization members using the Management API](https://supabase.com/docs/guides/platform/access-control#viewing-organization-members-using-the-management-api) [Transferring ownership of an organization](https://supabase.com/docs/guides/platform/access-control#transferring-ownership-of-an-organization) [Organization scoped roles vs project scoped roles](https://supabase.com/docs/guides/platform/access-control#organization-scoped-roles-vs-project-scoped-roles) [Organization permissions across roles](https://supabase.com/docs/guides/platform/access-control#organization-permissions-across-roles) [Project permissions across roles](https://supabase.com/docs/guides/platform/access-control#project-permissions-across-roles) [Footnotes](https://supabase.com/docs/guides/platform/access-control#footnote-label)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)