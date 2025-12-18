---
url: "https://supabase.com/docs/guides/local-development/customizing-email-templates"
title: "Customizing email templates | Supabase Docs"
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

[Local Dev / CLI](https://supabase.com/docs/guides/local-development)

[Overview](https://supabase.com/docs/guides/local-development)

CLI[Getting started](https://supabase.com/docs/guides/local-development/cli/getting-started)
[Configuration](https://supabase.com/docs/guides/local-development/cli/config)
[CLI commands](https://supabase.com/docs/reference/cli)

Local development[Getting started](https://supabase.com/docs/guides/local-development/overview)
[Declarative database schemas](https://supabase.com/docs/guides/local-development/declarative-database-schemas)
[Seeding your database](https://supabase.com/docs/guides/local-development/seeding-your-database)
[Managing config and secrets](https://supabase.com/docs/guides/local-development/managing-config)
[Restoring downloaded backup](https://supabase.com/docs/guides/local-development/restoring-downloaded-backup)
[Customizing email templates](https://supabase.com/docs/guides/local-development/customizing-email-templates)

Testing[Getting started](https://supabase.com/docs/guides/local-development/testing/overview)
[pgTAP advanced guide](https://supabase.com/docs/guides/local-development/testing/pgtap-extended)
[Database testing](https://supabase.com/docs/guides/database/testing)
[RLS policies testing](https://supabase.com/docs/guides/database/extensions/pgtap#testing-rls-policies)

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

Local Development

1. [Local Dev / CLI](https://supabase.com/docs/guides/local-development)
3. Local development
5. [Customizing email templates](https://supabase.com/docs/guides/local-development/customizing-email-templates)

# Customizing email templates

## Customize local email templates via the config file.

* * *

You can customize the email templates for local development by [editing the `config.toml` file](https://supabase.com/docs/guides/local-development/cli/config#auth-config).

## Configuring templates [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#configuring-templates)

You should provide a relative URL to the `content_path` parameter, pointing to an HTML file which contains the template. For example:

### Authentication email templates [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authentication-email-templates)

supabase/config.tomlsupabase/templates/invite.html

```
1
[auth.email.template.invite]
2
subject = "You are invited to Acme Inc"
3
content_path = "./supabase/templates/invite.html"
```

### Security notification email templates [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#security-notification-email-templates)

supabase/config.tomltemplates/password\_changed\_notification.html

```
1
[auth.email.notification.password_changed]
2
enabled = true
3
subject = "Your password has been changed"
4
content_path = "./templates/password_changed_notification.html"
```

## Available authentication email templates [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#available-authentication-email-templates)

There are several authentication-related email templates which can be configured. Each template serves a specific authentication flow:

### `auth.email.template.invite` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailtemplateinvite)

**Default subject**: "You have been invited"
**When sent**: When a user is invited to join your application via email invitation
**Purpose**: Invite users who don't yet have an account to sign up
**Content**: Contains a link for the invited user to accept the invitation and create their account

### `auth.email.template.confirmation` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailtemplateconfirmation)

**Default subject**: "Confirm Your Signup"
**When sent**: When a user signs up and needs to verify their email address
**Purpose**: Ask users to confirm their email address after signing up
**Content**: Contains a confirmation link to verify the user's email address

### `auth.email.template.recovery` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailtemplaterecovery)

**Default subject**: "Reset Your Password"
**When sent**: When a user requests a password reset
**Purpose**: Allow users to reset their password if they forget it
**Content**: Contains a link to reset the user's password

### `auth.email.template.magic_link` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailtemplatemagiclink)

**Default subject**: "Your Magic Link"
**When sent**: When a user requests a magic link for passwordless authentication
**Purpose**: Allow users to sign in via a one-time link sent to their email
**Content**: Contains a secure link that automatically logs the user in when clicked

### `auth.email.template.email_change` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailtemplateemailchange)

**Default subject**: "Confirm Email Change"
**When sent**: When a user requests to change their email address
**Purpose**: Ask users to verify their new email address after changing it
**Content**: Contains a confirmation link to verify the new email address

### `auth.email.template.reauthentication` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailtemplatereauthentication)

**Default subject**: "Confirm Reauthentication"
**When sent**: When a user needs to re-authenticate for sensitive operations
**Purpose**: Ask users to re-authenticate before performing a sensitive action
**Content**: Contains a 6-digit OTP code for verification

## Available security notification email templates [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#available-security-notification-email-templates)

There are several security notification email templates which can be configured. These emails are only sent to users if the respective security notifications have been enabled at the project-level:

### `auth.email.notification.password_changed` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailnotificationpasswordchanged)

**Default subject**: "Your password has been changed"
**When sent**: When a user's password is changed
**Purpose**: Notify users when their password has changed
**Content**: Confirms that the password for the account has been changed

### `auth.email.notification.email_changed` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailnotificationemailchanged)

**Default subject**: "Your email address has been changed"
**When sent**: When a user's email address is changed
**Purpose**: Notify users when their email address has changed
**Content**: Confirms the change from the old email to the new email address

### `auth.email.notification.phone_changed` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailnotificationphonechanged)

**Default subject**: "Your phone number has been changed"
**When sent**: When a user's phone number is changed
**Purpose**: Notify users when their phone number has changed
**Content**: Confirms the change from the old phone number to the new phone number

### `auth.email.notification.mfa_factor_enrolled` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailnotificationmfafactorenrolled)

**Default subject**: "A new MFA factor has been enrolled"
**When sent**: When a new MFA factor is added to the user's account
**Purpose**: Notify users when a new multi-factor authentication method has been added to their account
**Content**: Confirms that a new MFA factor type has been enrolled

### `auth.email.notification.mfa_factor_unenrolled` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailnotificationmfafactorunenrolled)

**Default subject**: "An MFA factor has been unenrolled"
**When sent**: When an MFA factor is removed from the user's account
**Purpose**: Notify users when a multi-factor authentication method has been removed from their account
**Content**: Confirms that an MFA factor type has been unenrolled

### `auth.email.notification.identity_linked` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailnotificationidentitylinked)

**Default subject**: "A new identity has been linked"
**When sent**: When a new identity is linked to the account
**Purpose**: Notify users when a new identity has been linked to their account
**Content**: Confirms that a new identity has been linked

### `auth.email.notification.identity_unlinked` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#authemailnotificationidentityunlinked)

**Default subject**: "An identity has been unlinked"
**When sent**: When an identity has been unlinked from the account
**Purpose**: Notify users when an identity has been unlinked from their account
**Content**: Confirms that an identity has been unlinked

## Template variables [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#template-variables)

The templating system provides the following variables for use:

### `ConfirmationURL` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#confirmationurl)

Contains the confirmation URL. For example, a signup confirmation URL would look like:

```
1
https://project-ref.supabase.co/auth/v1/verify?token={{ .TokenHash }}&type=email&redirect_to=https://example.com/path
```

**Usage**

```
1
<p>Click here to confirm: {{ .ConfirmationURL }}</p>
```

### `Token` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#token)

Contains a 6-digit One-Time-Password (OTP) that can be used instead of the `ConfirmationURL`.

**Usage**

```
1
<p>Here is your one time password: {{ .Token }}</p>
```

### `TokenHash` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#tokenhash)

Contains a hashed version of the `Token`. This is useful for constructing your own email link in the email template.

**Usage**

```
1
<p>Follow this link to confirm your user:</p>
2
<p>
3
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email"
4
    >Confirm your email</a
5
  >
6
</p>
```

### `SiteURL` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#siteurl)

Contains your application's Site URL. This can be configured in your project's [authentication settings](https://supabase.com/dashboard/project/_/auth/url-configuration).

**Usage**

```
1
<p>Visit <a href="{{ .SiteURL }}">here</a> to log in.</p>
```

### `Email` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#email)

Contains the user's email address.

**Usage**

```
1
<p>A recovery request was sent to {{ .Email }}.</p>
```

### `NewEmail` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#newemail)

Contains the new user's email address. This is only available in the `email_change` email template.

**Usage**

```
1
<p>You are requesting to update your email address to {{ .NewEmail }}.</p>
```

### `OldEmail` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#oldemail)

Contains the user's old email address. This is only available in the `email_changed_notification` email template.

**Usage**

```
1
<p>The email address for your account has been changed from {{ .OldEmail }} to {{ .Email }}.</p>
```

### `Phone` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#phone)

Contains the user's new phone number. This is only available in the `phone_changed_notification` email template.

**Usage**

```
1
<p>The phone number for your account has been changed from {{ .OldPhone }} to {{ .Phone }}.</p>
```

### `OldPhone` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#oldphone)

Contains the user's old phone number. This is only available in the `phone_changed_notification` email template.

**Usage**

```
1
<p>The phone number for your account has been changed from {{ .OldPhone }} to {{ .Phone }}.</p>
```

### `Provider` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#provider)

Contains the provider of the newly linked/unlinked identity. This is only available in the `identity_linked_notification` and `identity_unlinked_notification` email templates.

**Usage**

```
1
<p>A new identity ({{ .Provider }}) has been linked to your account.</p>
```

### `FactorType` [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#factortype)

Contains the type of the newly enrolled/unenrolled MFA factor. This is only available in the `mfa_factor_enrolled_notification` and `mfa_factor_unenrolled_notification` email templates.

**Usage**

```
1
<p>A new factor ({{ .FactorType }}) has been enrolled for your account.</p>
```

## Deploying email templates [\#](https://supabase.com/docs/guides/local-development/customizing-email-templates\#deploying-email-templates)

These settings are for local development. To apply the changes locally, stop and restart the Supabase containers:

```
1
supabase stop && supabase start
```

For hosted projects managed by Supabase, copy the templates into the [Email Templates](https://supabase.com/dashboard/project/_/auth/templates) section of the Dashboard.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/local-development/customizing-email-templates.mdx)

### Is this helpful?

NoYes

### On this page

[Configuring templates](https://supabase.com/docs/guides/local-development/customizing-email-templates#configuring-templates) [Authentication email templates](https://supabase.com/docs/guides/local-development/customizing-email-templates#authentication-email-templates) [Security notification email templates](https://supabase.com/docs/guides/local-development/customizing-email-templates#security-notification-email-templates) [Available authentication email templates](https://supabase.com/docs/guides/local-development/customizing-email-templates#available-authentication-email-templates) [auth.email.template.invite](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailtemplateinvite) [auth.email.template.confirmation](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailtemplateconfirmation) [auth.email.template.recovery](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailtemplaterecovery) [auth.email.template.magic\_link](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailtemplatemagiclink) [auth.email.template.email\_change](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailtemplateemailchange) [auth.email.template.reauthentication](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailtemplatereauthentication) [Available security notification email templates](https://supabase.com/docs/guides/local-development/customizing-email-templates#available-security-notification-email-templates) [auth.email.notification.password\_changed](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailnotificationpasswordchanged) [auth.email.notification.email\_changed](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailnotificationemailchanged) [auth.email.notification.phone\_changed](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailnotificationphonechanged) [auth.email.notification.mfa\_factor\_enrolled](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailnotificationmfafactorenrolled) [auth.email.notification.mfa\_factor\_unenrolled](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailnotificationmfafactorunenrolled) [auth.email.notification.identity\_linked](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailnotificationidentitylinked) [auth.email.notification.identity\_unlinked](https://supabase.com/docs/guides/local-development/customizing-email-templates#authemailnotificationidentityunlinked) [Template variables](https://supabase.com/docs/guides/local-development/customizing-email-templates#template-variables) [ConfirmationURL](https://supabase.com/docs/guides/local-development/customizing-email-templates#confirmationurl) [Token](https://supabase.com/docs/guides/local-development/customizing-email-templates#token) [TokenHash](https://supabase.com/docs/guides/local-development/customizing-email-templates#tokenhash) [SiteURL](https://supabase.com/docs/guides/local-development/customizing-email-templates#siteurl) [Email](https://supabase.com/docs/guides/local-development/customizing-email-templates#email) [NewEmail](https://supabase.com/docs/guides/local-development/customizing-email-templates#newemail) [OldEmail](https://supabase.com/docs/guides/local-development/customizing-email-templates#oldemail) [Phone](https://supabase.com/docs/guides/local-development/customizing-email-templates#phone) [OldPhone](https://supabase.com/docs/guides/local-development/customizing-email-templates#oldphone) [Provider](https://supabase.com/docs/guides/local-development/customizing-email-templates#provider) [FactorType](https://supabase.com/docs/guides/local-development/customizing-email-templates#factortype) [Deploying email templates](https://supabase.com/docs/guides/local-development/customizing-email-templates#deploying-email-templates)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)