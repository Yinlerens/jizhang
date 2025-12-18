---
url: "https://supabase.com/docs/guides/self-hosting/auth/config"
title: "Auth Self-hosting Config | Supabase Docs"
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
3. Auth Server
5. [Configuration](https://supabase.com/docs/guides/self-hosting/auth/config)

# Auth Self-hosting Config

* * *

In a self-hosted environment, you do not have access to the Auth configuration such as third party OAuth provider settings through the Supabase dashboard. Instead, you configure them through the `docker-compose.yml` file. You can read more about the configuration in the [Self-hosting guide](https://supabase.com/docs/guides/self-hosting/docker#configuring-services).

You can find the complete list of available configuration parameters on the README of the [Auth repository](https://github.com/supabase/auth?tab=readme-ov-file#configuration).

## General

General settings.

##### Parameters

GOTRUE\_SITE\_URL

Required

no type

The base URL of your website. Used as an allow-list for redirects and for constructing URLs used in emails.

GOTRUE\_EXTERNAL\_GITHUB\_ENABLED

Required

no type

Whether the external provider, GitHub in this case, is enabled or not.

GOTRUE\_EXTERNAL\_GITHUB\_CLIENT\_ID

Required

no type

The OAuth2 Client ID registered with the external provider.

GOTRUE\_EXTERNAL\_GITHUB\_SECRET

Required

no type

The OAuth2 Client Secret provided by the external provider when you registered.

GOTRUE\_EXTERNAL\_GITHUB\_REDIRECT\_URI

Required

no type

The URI a OAuth2 provider will redirect to with the `code` and `state` values.

GOTRUE\_URI\_ALLOW\_LIST

Required

no type

A comma separated list of URIs (e.g. `"https://foo.example.com,https://*.foo.example.com,https://bar.example.com"`) which are permitted as valid `redirect_to` destinations.

GOTRUE\_JWT\_EXP

Required

no type

How long tokens are valid for, in seconds. Defaults to 3600 (1 hour), maximum 604,800 seconds (one week).

GOTRUE\_DISABLE\_SIGNUP

Required

no type

Allow/disallow new user signups to your project.

GOTRUE\_EXTERNAL\_EMAIL\_ENABLED

Required

no type

Allow/disallow new user signups via email to your project.

GOTRUE\_MAILER\_SECURE\_EMAIL\_CHANGE\_ENABLED

Required

no type

If enabled, a user will be required to confirm any email change on both the old, and new email addresses. If disabled, only the new email is required to confirm.

GOTRUE\_MAILER\_AUTOCONFIRM

Required

no type

If enabled, users need to confirm their email address before signing in.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/app/guides/(with-sidebar)/self-hosting/auth/config/page.tsx)

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