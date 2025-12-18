---
url: "https://supabase.com/docs/guides/functions/status-codes"
title: "Status codes | Supabase Docs"
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

[Edge Functions](https://supabase.com/docs/guides/functions)

[Overview](https://supabase.com/docs/guides/functions)

Getting started[Quickstart (Dashboard)](https://supabase.com/docs/guides/functions/quickstart-dashboard)
[Quickstart (CLI)](https://supabase.com/docs/guides/functions/quickstart)
[Development Environment](https://supabase.com/docs/guides/functions/development-environment)
[Architecture](https://supabase.com/docs/guides/functions/architecture)

Configuration[Environment Variables](https://supabase.com/docs/guides/functions/secrets)
[Managing Dependencies](https://supabase.com/docs/guides/functions/dependencies)
[Function Configuration](https://supabase.com/docs/guides/functions/function-configuration)

Development[Error Handling](https://supabase.com/docs/guides/functions/error-handling)
[Routing](https://supabase.com/docs/guides/functions/routing)
[Deploy to Production](https://supabase.com/docs/guides/functions/deploy)

Debugging[Local Debugging with DevTools](https://supabase.com/docs/guides/functions/debugging-tools)
[Testing your Functions](https://supabase.com/docs/guides/functions/unit-test)
[Logging](https://supabase.com/docs/guides/functions/logging)
[Troubleshooting](https://supabase.com/docs/guides/functions/troubleshooting)

Platform[Regional invocations](https://supabase.com/docs/guides/functions/regional-invocation)
[Status codes](https://supabase.com/docs/guides/functions/status-codes)
[Limits](https://supabase.com/docs/guides/functions/limits)
[Pricing](https://supabase.com/docs/guides/functions/pricing)

Integrations[Supabase Auth](https://supabase.com/docs/guides/functions/auth)
[Supabase Database (Postgres)](https://supabase.com/docs/guides/functions/connect-to-postgres)
[Supabase Storage](https://supabase.com/docs/guides/functions/storage-caching)

Advanced Features[Background Tasks](https://supabase.com/docs/guides/functions/background-tasks)
[File Storage](https://supabase.com/docs/guides/functions/ephemeral-storage)
[WebSockets](https://supabase.com/docs/guides/functions/websockets)
[Custom Routing](https://supabase.com/docs/guides/functions/routing)
[Wasm Modules](https://supabase.com/docs/guides/functions/wasm)
[AI Models](https://supabase.com/docs/guides/functions/ai-models)

Examples[Auth Send Email Hook](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend)
[Building an MCP Server with mcp-lite](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite)
[CORS support for invoking from the browser](https://supabase.com/docs/guides/functions/cors)
[Scheduling Functions](https://supabase.com/docs/guides/functions/schedule-functions)
[Sending Push Notifications](https://supabase.com/docs/guides/functions/examples/push-notifications)
[Generating AI images](https://supabase.com/docs/guides/functions/examples/amazon-bedrock-image-generator)
[Generating OG images](https://supabase.com/docs/guides/functions/examples/og-image)
[Semantic AI Search](https://supabase.com/docs/guides/functions/examples/semantic-search)
[CAPTCHA support with Cloudflare Turnstile](https://supabase.com/docs/guides/functions/examples/cloudflare-turnstile)
[Building a Discord Bot](https://supabase.com/docs/guides/functions/examples/discord-bot)
[Building a Telegram Bot](https://supabase.com/docs/guides/functions/examples/telegram-bot)
[Handling Stripe Webhooks](https://supabase.com/docs/guides/functions/examples/stripe-webhooks)
[Rate-limiting with Redis](https://supabase.com/docs/guides/functions/examples/rate-limiting)
[Taking Screenshots with Puppeteer](https://supabase.com/docs/guides/functions/examples/screenshots)
[Slack Bot responding to mentions](https://supabase.com/docs/guides/functions/examples/slack-bot-mention)
[Image Transformation & Optimization](https://supabase.com/docs/guides/functions/examples/image-manipulation)

Third-Party Tools[Dart Edge on Supabase](https://supabase.com/docs/guides/functions/dart-edge)
[mcp-lite (Model Context Protocol)](https://supabase.com/docs/guides/functions/examples/mcp-server-mcp-lite)
[Browserless.io](https://supabase.com/docs/guides/functions/examples/screenshots)
[Hugging Face](https://supabase.com/docs/guides/ai/examples/huggingface-image-captioning)
[Monitoring with Sentry](https://supabase.com/docs/guides/functions/examples/sentry-monitoring)
[OpenAI API](https://supabase.com/docs/guides/ai/examples/openai)
[React Email](https://supabase.com/docs/guides/functions/examples/auth-send-email-hook-react-email-resend)
[Sending Emails with Resend](https://supabase.com/docs/guides/functions/examples/send-emails)
[Upstash Redis](https://supabase.com/docs/guides/functions/examples/upstash-redis)
[Type-Safe SQL with Kysely](https://supabase.com/docs/guides/functions/kysely-postgres)
[Text To Speech with ElevenLabs](https://supabase.com/docs/guides/functions/examples/elevenlabs-generate-speech-stream)
[Speech Transcription with ElevenLabs](https://supabase.com/docs/guides/functions/examples/elevenlabs-transcribe-speech)

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

Edge Functions

1. [Edge Functions](https://supabase.com/docs/guides/functions)
3. Platform
5. [Status codes](https://supabase.com/docs/guides/functions/status-codes)

# Status codes

## Understand HTTP status codes returned by Edge Functions to properly debug issues and handle responses.

* * *

## Success Responses [\#](https://supabase.com/docs/guides/functions/status-codes\#success-responses)

### 2XX Success [\#](https://supabase.com/docs/guides/functions/status-codes\#2xx-success)

Your Edge Function executed successfully and returned a valid response. This includes any status code in the 200-299 range that your function explicitly returns.

### 3XX Redirect [\#](https://supabase.com/docs/guides/functions/status-codes\#3xx-redirect)

Your Edge Function used the `Response.redirect()` API to redirect the client to a different URL. This is a normal response when implementing authentication flows or URL forwarding.

* * *

## Client Errors [\#](https://supabase.com/docs/guides/functions/status-codes\#client-errors)

These errors indicate issues with the request itself, which typically require changing how the function is called.

### 401 Unauthorized [\#](https://supabase.com/docs/guides/functions/status-codes\#401-unauthorized)

**Cause:** The Edge Function has JWT verification enabled, but the request was made with an invalid or missing JWT token.

**Solution:**

- Ensure you're passing a valid JWT token in the `Authorization` header
- Check that your token hasn't expired
- For webhooks or public endpoints, consider disabling JWT verification

### 404 Not Found [\#](https://supabase.com/docs/guides/functions/status-codes\#404-not-found)

**Cause:** The requested Edge Function doesn't exist or the URL path is incorrect.

**Solution:**

- Verify the function name and project reference in your request URL
- Check that the function has been deployed successfully

### 405 Method Not Allowed [\#](https://supabase.com/docs/guides/functions/status-codes\#405-method-not-allowed)

**Cause:** You're using an unsupported HTTP method. Edge Functions only support: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, and `OPTIONS`.

**Solution:** Update your request to use a supported HTTP method.

* * *

## Server Errors [\#](https://supabase.com/docs/guides/functions/status-codes\#server-errors)

These errors indicate issues with the function execution or underlying platform.

### 500 Internal Server Error [\#](https://supabase.com/docs/guides/functions/status-codes\#500-internal-server-error)

**Cause:** Your Edge Function threw an uncaught exception (`WORKER_ERROR`).

**Common causes:**

- Unhandled JavaScript errors in your function code
- Missing error handling for async operations
- Invalid JSON parsing

**Solution:** Check your Edge Function logs to identify the specific error and add proper error handling to your code.

```
1
// ✅ Good error handling
2
try {
3
  const result = await someAsyncOperation()
4
  return new Response(JSON.stringify(result))
5
} catch (error) {
6
  console.error('Function error:', error)
7
  return new Response('Internal error', { status: 500 })
8
}
```

You can see the output in the [Edge Function Logs](https://supabase.com/docs/guides/functions/logging).

### 503 Service Unavailable [\#](https://supabase.com/docs/guides/functions/status-codes\#503-service-unavailable)

**Cause:** Your Edge Function failed to start (`BOOT_ERROR`).

**Common causes:**

- Syntax errors preventing the function from loading
- Import errors or missing dependencies
- Invalid function configuration

**Solution:** Check your Edge Function logs and verify your function code can be executed locally with `supabase functions serve`.

### 504 Gateway Timeout [\#](https://supabase.com/docs/guides/functions/status-codes\#504-gateway-timeout)

**Cause:** Your Edge Function didn't respond within the [request timeout limit](https://supabase.com/docs/guides/functions/limits).

**Common causes:**

- Long-running database queries
- Slow external API calls
- Infinite loops or blocking operations

**Solution:**

- Optimize slow operations
- Add timeout handling to external requests
- Consider breaking large operations into smaller chunks

### 546 Resource Limit (Custom Error Code) [\#](https://supabase.com/docs/guides/functions/status-codes\#546-resource-limit-custom-error-code)

**Cause:** Your Edge Function execution was stopped due to exceeding resource limits (`WORKER_LIMIT`). Edge Function logs should provide which [resource limit](https://supabase.com/docs/guides/functions/limits) was exceeded.

**Common causes:**

- Memory usage exceeded available limits
- CPU time exceeded execution quotas
- Too many concurrent operations

**Solution:** Check your Edge Function logs to see which resource limit was exceeded, then optimize your function accordingly.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/status-codes.mdx)

### Is this helpful?

NoYes

### On this page

[Success Responses](https://supabase.com/docs/guides/functions/status-codes#success-responses) [2XX Success](https://supabase.com/docs/guides/functions/status-codes#2xx-success) [3XX Redirect](https://supabase.com/docs/guides/functions/status-codes#3xx-redirect) [Client Errors](https://supabase.com/docs/guides/functions/status-codes#client-errors) [401 Unauthorized](https://supabase.com/docs/guides/functions/status-codes#401-unauthorized) [404 Not Found](https://supabase.com/docs/guides/functions/status-codes#404-not-found) [405 Method Not Allowed](https://supabase.com/docs/guides/functions/status-codes#405-method-not-allowed) [Server Errors](https://supabase.com/docs/guides/functions/status-codes#server-errors) [500 Internal Server Error](https://supabase.com/docs/guides/functions/status-codes#500-internal-server-error) [503 Service Unavailable](https://supabase.com/docs/guides/functions/status-codes#503-service-unavailable) [504 Gateway Timeout](https://supabase.com/docs/guides/functions/status-codes#504-gateway-timeout) [546 Resource Limit (Custom Error Code)](https://supabase.com/docs/guides/functions/status-codes#546-resource-limit-custom-error-code)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)