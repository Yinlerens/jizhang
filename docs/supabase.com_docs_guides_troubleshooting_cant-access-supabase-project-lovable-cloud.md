---
url: "https://supabase.com/docs/guides/troubleshooting/cant-access-supabase-project-lovable-cloud"
title: "Supabase Docs | Troubleshooting | Can’t Access Supabase Project When Using Lovable Cloud"
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

1. [Troubleshooting](https://supabase.com/docs/guides/troubleshooting)

# Can’t Access Supabase Project When Using Lovable Cloud

Last edited: 12/16/2025

* * *

## Problem [\#](https://supabase.com/docs/guides/troubleshooting/cant-access-supabase-project-lovable-cloud\#problem)

Your Lovable project has **Lovable Cloud** enabled, and you’re trying to connect directly to your Supabase project.

However, you don’t see the project listed on your [Supabase Dashboard](https://supabase.com/dashboard), or you’re unable to access it through your Supabase account.

## Why this occurs [\#](https://supabase.com/docs/guides/troubleshooting/cant-access-supabase-project-lovable-cloud\#why-this-occurs)

When you create a project connected to **Lovable Cloud**, the underlying Supabase instance is provisioned and managed entirely by **Lovable**.

These projects are not owned by your Supabase account, so they **don't appear on your Supabase Dashboard** or be accessible using your Supabase credentials.

## How to diagnose [\#](https://supabase.com/docs/guides/troubleshooting/cant-access-supabase-project-lovable-cloud\#how-to-diagnose)

You might be affected by this if:

- You recently created a project on Lovable and enabled the backend from the chat interface. By default, the Lovable platform uses **Lovable Cloud** for backend hosting.
- You see Supabase references in your project’s configuration but **can’t access the project** from your [Supabase Dashboard](https://supabase.com/dashboard).
- The project ID or credentials used in your Lovable setup don’t match any project under your Supabase account.

## How to fix [\#](https://supabase.com/docs/guides/troubleshooting/cant-access-supabase-project-lovable-cloud\#how-to-fix)

There is **no automated way** to transfer a Supabase project from Lovable Cloud to your own Supabase account.

However, you can manually clone your project backend and migrate your data following Lovable’s official guide: [Self-Hosting Guide (Lovable Docs)](https://docs.lovable.dev/tips-tricks/self-hosting)

This process allows you to create a new Supabase project under your own account and connect it independently.

There are certain limitations described in Lovable’s documentation, so review the guide carefully before proceeding.

## How to prevent [\#](https://supabase.com/docs/guides/troubleshooting/cant-access-supabase-project-lovable-cloud\#how-to-prevent)

If you want direct access to your Supabase project from the start, make sure to:

- Avoid enabling Lovable Cloud if you plan to manage your Supabase project independently.
- Create your project directly from the [Supabase Dashboard](https://supabase.com/dashboard) and then **manually connect your Lovable project to your Supabase project**, or **start your Lovable project already connected** to your own Supabase project from the beginning.

## Additional resources [\#](https://supabase.com/docs/guides/troubleshooting/cant-access-supabase-project-lovable-cloud\#additional-resources)

For more information, read [the Lovable Cloud FAQ](https://docs.lovable.dev/features/cloud#faq)

## Frequently asked questions [\#](https://supabase.com/docs/guides/troubleshooting/cant-access-supabase-project-lovable-cloud\#frequently-asked-questions)

Can I get access to the Supabase SQL editor when using Lovable Cloud?

Why doesn't my Supabase project appear on my dashboard?

Can I disconnect my project from Lovable Cloud and connect it to my own Supabase account?

I can't get my database URL to connect from an external tool (like BI tools or Postgres connectors).

I can't get my service role key to integrate an external service (like n8n or Make.com).

## Metadata

* * *

### Products

[Ai](https://supabase.com/docs/guides/troubleshooting?products=ai)

* * *

### Keywords

[lovable](https://supabase.com/docs/guides/troubleshooting?tags=lovable) [lovable cloud](https://supabase.com/docs/guides/troubleshooting?tags=lovable+cloud)

* * *

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