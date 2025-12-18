---
url: "https://supabase.com/docs/guides/troubleshooting/42501--permission-denied-for-table-httprequestqueue-KnozmQ"
title: "Supabase Docs | Troubleshooting | 42501 : permission denied for table http_request_queue"
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

# 42501 : permission denied for table http\_request\_queue

Last edited: 9/9/2025

* * *

If you're currently blocked by the above error, run the following in your Supabase SQL editor:

- Check `select * from net.http_request_queue` and make sure it's empty.
- Try `drop extension pg_net; create extension pg_net schema extensions;`
- If that doesn't work (e.g. because some objects depend on it), then [contact support](https://supabase.com/support).

## Metadata

* * *

### Products

[Database](https://supabase.com/docs/guides/troubleshooting?products=database)

* * *

### Related error codes

[42501](https://supabase.com/docs/guides/troubleshooting?errorCodes=42501)

* * *

### Keywords

[permission](https://supabase.com/docs/guides/troubleshooting?tags=permission) [pg\_net](https://supabase.com/docs/guides/troubleshooting?tags=pg_net) [http\_request\_queue](https://supabase.com/docs/guides/troubleshooting?tags=http_request_queue)

* * *

### Is this helpful?

NoYes

* * *

[View discussion on GitHub](https://github.com/orgs/supabase/discussions/21450)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)