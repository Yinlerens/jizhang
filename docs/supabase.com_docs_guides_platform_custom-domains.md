---
url: "https://supabase.com/docs/guides/platform/custom-domains"
title: "Custom Domains | Supabase Docs"
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
3. Add-ons
5. [Custom Domains](https://supabase.com/docs/guides/platform/custom-domains)

# Custom Domains

* * *

Custom domains allow you to present a branded experience to your users. These are available as a [paid add-on for projects on a paid plan](https://supabase.com/dashboard/project/_/settings/addons?panel=customDomain).

There are two types of domains supported by Supabase:

1. Custom domains, where you use a domain such as `api.example.com` instead of the project's default domain.
2. Vanity subdomains (experimental), where you can set up a different subdomain on `supabase.co` for your project.

You can choose either a custom domain or vanity subdomain for each project.

## Custom domains [\#](https://supabase.com/docs/guides/platform/custom-domains\#custom-domains)

Custom domains change the way your project's URLs appear to your users. This is useful when:

- You are using [OAuth (Social Login)](https://supabase.com/docs/guides/auth/social-login) with Supabase Auth and the project's URL is shown on the OAuth consent screen.
- You are creating APIs for third-party systems, for example, implementing webhooks or external API calls to your project via [Edge Functions](https://supabase.com/docs/guides/functions).
- You are storing URLs in a database or encoding them in QR codes.

Custom domains help you keep your APIs portable for the long term. By using a custom domain you can migrate from one Supabase project to another, or make it easier to version APIs in the future.

### Limitations [\#](https://supabase.com/docs/guides/platform/custom-domains\#limitations)

- Custom domains are not intended to enable hosting of frontend applications through [Edge Functions](https://supabase.com/docs/guides/functions).
- You can only attach a single custom domain to any given Supabase project. It is not possible to break out your project's resources into multiple custom domains.
- Custom domains can only be powered by CNAME records.

### Configure a custom domain using the Supabase dashboard [\#](https://supabase.com/docs/guides/platform/custom-domains\#configure-a-custom-domain-using-the-supabase-dashboard)

Follow the **Custom Domains** steps in the [General Settings](https://supabase.com/dashboard/project/_/settings/general) page in the Dashboard to set up a custom domain for your project.

### Configure a custom domain using the Supabase CLI [\#](https://supabase.com/docs/guides/platform/custom-domains\#configure-a-custom-domain-using-the-supabase-cli)

This example assumes your Supabase project is `abcdefghijklmnopqrst` with a corresponding API URL `abcdefghijklmnopqrst.supabase.co` and configures a custom domain at `api.example.com`.

To get started:

1. [Install](https://supabase.com/docs/guides/resources/supabase-cli) the latest version of the Supabase CLI.
2. [Log in](https://supabase.com/docs/guides/cli/local-development#log-in-to-the-supabase-cli) to your Supabase account using the CLI.
3. Ensure you have [Owner or Admin permissions](https://supabase.com/docs/guides/platform/access-control#manage-team-members) for the project.
4. Get a custom domain from a DNS provider. Currently, only subdomains are supported.
   - Use `api.example.com` instead of `example.com`.

### Add a CNAME record [\#](https://supabase.com/docs/guides/platform/custom-domains\#add-a-cname-record)

You need to add a CNAME record to your domain's DNS settings to ensure your custom domain points to the Supabase project.

If your project's default domain is `abcdefghijklmnopqrst.supabase.co` you should:

- Create a CNAME record for `api.example.com` that resolves to `abcdefghijklmnopqrst.supabase.co.`.
- Use a low TTL value to quickly propagate changes in case you make a mistake.

### Verify ownership of the domain [\#](https://supabase.com/docs/guides/platform/custom-domains\#verify-ownership-of-the-domain)

Register your domain with Supabase to prove that you own it. You need to download two TXT records and add them to your DNS settings.

In the CLI, run [`domains create`](https://supabase.com/docs/reference/cli/supabase-domains-create) to register the domain and Supabase and get your verification records:

```
1
supabase domains create --project-ref abcdefghijklmnopqrst --custom-hostname api.example.com
```

A single TXT records is returned. For example:

```
1
[...]
2
Required outstanding validation records:
3
        _acme-challenge.api.example.com. TXT -> ca3-F1HvR9i938OgVwpCFwi1jTsbhe1hvT0Ic3efPY3Q
```

Add the record to your domains' DNS settings. Make sure to trim surrounding whitespace. Use a low TTL value so you can quickly change the records if you make a mistake.

Some DNS registrars automatically append your domain name to the DNS entries being created. As such, creating a DNS record for `api.example.com` might instead create a record for `api.example.com.example.com`. In such cases, remove the domain name from the records you're creating; as an example, you would create a TXT record for `api`, instead of `api.example.com`.

### Verify your domain [\#](https://supabase.com/docs/guides/platform/custom-domains\#verify-your-domain)

Make sure you've configured all required DNS settings:

- CNAME for your custom domain pointing to the Supabase project domain.
- TXT record for `_acme-challenge.<your-custom-domain>`.

Use the [`domains reverify`](https://supabase.com/docs/reference/cli/supabase-domains-reverify) command to begin the verification process of your domain. You may need to run this command a few times because DNS records take a while to propagate.

```
1
supabase domains reverify --project-ref abcdefghijklmnopqrst
```

In the background, Supabase will check your DNS records and use [Let's Encrypt](https://letsencrypt.org/) to issue a SSL certificate for your domain. This process can take up to 30 minutes.

### Prepare to activate your domain [\#](https://supabase.com/docs/guides/platform/custom-domains\#prepare-to-activate-your-domain)

Before you activate your domain, prepare your applications and integrations for the domain change:

- The project's Supabase domain remains active.
  - You do not need to change the Supabase URL in your applications immediately.
  - You can use it interchangeably with the custom domain.
- Supabase Auth will use the custom domain immediately once activated.
  - OAuth flows will advertise the custom domain as a callback URL.
  - SAML will use the custom domain instead. This means that the `EntityID` of your project has changed, and this may cause SAML with existing identity providers to stop working.

To prevent issues for your users, follow these steps:

1. For each of your Supabase OAuth providers:
   - In the provider's developer console (not in the Supabase dashboard), find the OAuth application and add the custom domain Supabase Auth callback URL **in addition to the Supabase project URL.** Example:
     - `https://abcdefghijklmnopqrst.supabase.co/auth/v1/callback` **and**
     - `https://api.example.com/auth/v1/callback`
   - [Sign in with Twitter](https://supabase.com/docs/guides/auth/social-login/auth-twitter) uses cookies bound to the project's domain. Make sure your frontend code uses the custom domain instead of the default project's domain.
2. For each of your SAML identity providers:
   - Contact your provider and ask them to update the metadata for the SAML application. They should use `https://api.example.com/auth/v1/...` instead of `https://abcdefghijklmnopqrst.supabase.co/auth/v1/sso/saml/{metadata,acs,slo}`.
   - Once these changes are made, SAML Single Sign-On will likely stop working until the domain is activated. Plan for this ahead of time.

### Activate your domain [\#](https://supabase.com/docs/guides/platform/custom-domains\#activate-your-domain)

Once you've done the necessary preparations to activate the new domain for your project, you can activate it using the [`domains activate`](https://supabase.com/docs/reference/cli/supabase-domains-activate) CLI command.

```
1
supabase domains activate --project-ref abcdefghijklmnopqrst
```

When this step completes, Supabase will serve the requests from your new domain. The Supabase project domain **continues to work** and serve requests so you do not need to rush to change client code URLs.

If you wish to use the new domain in client code, change the URL used in your Supabase client libraries:

```
1
import { createClient } from '@supabase/supabase-js'
2

3
// Use a custom domain as the supabase URL
4
const supabase = createClient('https://api.example.com', 'publishable-or-anon-key')
```

Similarly, your Edge Functions will now be available at `https://api.example.com/functions/v1/your_function_name`, and your Storage objects at `https://api.example.com/storage/v1/object/public/your_file_path.ext`.

### Remove a custom domain [\#](https://supabase.com/docs/guides/platform/custom-domains\#remove-a-custom-domain)

Removing a custom domain may cause some issues when using Supabase Auth with OAuth or SAML. You may have to reverse the changes made in the _[Prepare to activate your domain](https://supabase.com/docs/guides/platform/custom-domains#prepare-to-activate-your-domain)_ step above.

To remove an activated custom domain you can use the [`domains delete`](https://supabase.com/docs/reference/cli/supabase-domains-delete) CLI command.

```
1
supabase domains delete --project-ref abcdefghijklmnopqrst
```

## Vanity subdomains [\#](https://supabase.com/docs/guides/platform/custom-domains\#vanity-subdomains)

Vanity subdomains allow you to present a basic branded experience, compared to custom domains. They allow you to host your services at a custom subdomain on Supabase (e.g., `my-example-brand.supabase.co`) instead of the default, randomly assigned `abcdefghijklmnopqrst.supabase.co`.

To get started:

1. [Install](https://supabase.com/docs/guides/resources/supabase-cli) the latest version of the Supabase CLI.
2. [Log in](https://supabase.com/docs/guides/cli/local-development#log-in-to-the-supabase-cli) to your Supabase account using the CLI.
3. Ensure that you have [Owner or Admin permissions](https://supabase.com/docs/guides/platform/access-control#manage-team-members) for the project you'd like to set up a vanity subdomain for.
4. Ensure that your organization is on a paid plan (Pro/Team/Enterprise Plan) in the [Billing page of the Dashboard](https://supabase.com/dashboard/org/_/billing).

### Configure a vanity subdomain [\#](https://supabase.com/docs/guides/platform/custom-domains\#configure-a-vanity-subdomain)

You can configure vanity subdomains via the CLI only.

Let's assume your Supabase project's domain is `abcdefghijklmnopqrst.supabase.co` and you wish to configure a vanity subdomain at `my-example-brand.supabase.co`.

### Check subdomain availability [\#](https://supabase.com/docs/guides/platform/custom-domains\#check-subdomain-availability)

Use the [`vanity-subdomains check-availability`](https://supabase.com/docs/reference/cli/supabase-vanity-subdomains-check-availability) command of the CLI to check if your desired subdomain is available for use:

```
1
supabase vanity-subdomains --project-ref abcdefghijklmnopqrst check-availability --desired-subdomain my-example-brand --experimental
```

### Prepare to activate the subdomain [\#](https://supabase.com/docs/guides/platform/custom-domains\#prepare-to-activate-the-subdomain)

Before you activate your vanity subdomain, prepare your applications and integrations for the subdomain change:

- The project's Supabase domain remains active and will not go away.
  - You do not need to change the Supabase URL in your applications immediately or at once.
  - You can use it interchangeably with the custom domain.
- Supabase Auth will use the subdomain immediately once activated.
  - OAuth flows will advertise the subdomain as a callback URL.
  - SAML will use the subdomain instead. This means that the `EntityID` of your project has changed, and this may cause SAML with existing identity providers to stop working.

To prevent issues for your users, make sure you have gone through these steps:

1. Go through all of your Supabase OAuth providers:
   - In the provider's developer console (not in the Supabase dashboard!), find the OAuth application and add the subdomain Supabase Auth callback URL **in addition to the Supabase project URL.** Example:
     - `https://abcdefghijklmnopqrst.supabase.co/auth/v1/callback` **and**
     - `https://my-example-brand.supabase.co/auth/v1/callback`
   - [Sign in with Twitter](https://supabase.com/docs/guides/auth/social-login/auth-twitter) uses cookies bound to the project's domain. In this case make sure your frontend code uses the subdomain instead of the default project's domain.
2. Go through all of your SAML identity providers:
   - You will need to reach out via email to all of your existing identity providers and ask them to update the metadata for the SAML application (your project). Use `https://example-brand.supabase.co/auth/v1/...` instead of `https://abcdefghijklmnopqrst.supabase.co/auth/v1/sso/saml/{metadata,acs,slo}`.
   - Once these changes are made, SAML Single Sign-On will likely stop working until the domain is activated. Plan for this ahead of time.

### Activate a subdomain [\#](https://supabase.com/docs/guides/platform/custom-domains\#activate-a-subdomain)

Once you've chosen an available subdomain and have done all the necessary preparations for it, you can reconfigure your Supabase project to start using it.

Use the [`vanity-subdomains activate`](https://supabase.com/docs/reference/cli/supabase-vanity-subdomains-activate) command to activate and claim your subdomain:

```
1
supabase vanity-subdomains --project-ref abcdefghijklmnopqrst activate --desired-subdomain my-example-brand --experimental
```

If you wish to use the new domain in client code, you can set it up like so:

```
1
import { createClient } from '@supabase/supabase-js'
2

3
// Use a custom domain as the supabase URL
4
const supabase = createClient('https://my-example-brand.supabase.co', 'publishable-or-anon-key')
```

When using [Sign in with Twitter](https://supabase.com/docs/guides/auth/social-login/auth-twitter) make sure your frontend code is using the subdomain only.

### Remove a vanity subdomain [\#](https://supabase.com/docs/guides/platform/custom-domains\#remove-a-vanity-subdomain)

Removing a subdomain may cause some issues when using Supabase Auth with OAuth or SAML. You may have to reverse the changes made in the _[Prepare to activate the subdomain](https://supabase.com/docs/guides/platform/custom-domains#prepare-to-activate-the-subdomain)_ step above.

Use the [`vanity-subdomains delete`](https://supabase.com/docs/reference/cli/supabase-vanity-subdomains-delete) command of the CLI to remove the subdomain `my-example-brand.supabase.co` from your project.

```
1
supabase vanity-subdomains delete --project-ref abcdefghijklmnopqrst --experimental
```

## Pricing [\#](https://supabase.com/docs/guides/platform/custom-domains\#pricing)

For a detailed breakdown of how charges are calculated, refer to [Manage Custom Domain usage](https://supabase.com/docs/guides/platform/manage-your-usage/custom-domains).

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/platform/custom-domains.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2F6rcGnW_Mh-0%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Custom domains](https://supabase.com/docs/guides/platform/custom-domains#custom-domains) [Limitations](https://supabase.com/docs/guides/platform/custom-domains#limitations) [Configure a custom domain using the Supabase dashboard](https://supabase.com/docs/guides/platform/custom-domains#configure-a-custom-domain-using-the-supabase-dashboard) [Configure a custom domain using the Supabase CLI](https://supabase.com/docs/guides/platform/custom-domains#configure-a-custom-domain-using-the-supabase-cli) [Add a CNAME record](https://supabase.com/docs/guides/platform/custom-domains#add-a-cname-record) [Verify ownership of the domain](https://supabase.com/docs/guides/platform/custom-domains#verify-ownership-of-the-domain) [Verify your domain](https://supabase.com/docs/guides/platform/custom-domains#verify-your-domain) [Prepare to activate your domain](https://supabase.com/docs/guides/platform/custom-domains#prepare-to-activate-your-domain) [Activate your domain](https://supabase.com/docs/guides/platform/custom-domains#activate-your-domain) [Remove a custom domain](https://supabase.com/docs/guides/platform/custom-domains#remove-a-custom-domain) [Vanity subdomains](https://supabase.com/docs/guides/platform/custom-domains#vanity-subdomains) [Configure a vanity subdomain](https://supabase.com/docs/guides/platform/custom-domains#configure-a-vanity-subdomain) [Check subdomain availability](https://supabase.com/docs/guides/platform/custom-domains#check-subdomain-availability) [Prepare to activate the subdomain](https://supabase.com/docs/guides/platform/custom-domains#prepare-to-activate-the-subdomain) [Activate a subdomain](https://supabase.com/docs/guides/platform/custom-domains#activate-a-subdomain) [Remove a vanity subdomain](https://supabase.com/docs/guides/platform/custom-domains#remove-a-vanity-subdomain) [Pricing](https://supabase.com/docs/guides/platform/custom-domains#pricing)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)