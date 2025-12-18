---
url: "https://supabase.com/docs/guides/functions/architecture"
title: "Edge Functions Architecture | Supabase Docs"
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
3. Getting started
5. [Architecture](https://supabase.com/docs/guides/functions/architecture)

# Edge Functions Architecture

## Understanding the Architecture of Supabase Edge Functions

* * *

This guide explains the architecture and inner workings of Supabase Edge Functions, based on the concepts demonstrated in the video "Supabase Edge Functions Explained". Edge functions are serverless compute resources that run at the edge of the network, close to users, enabling low-latency execution for tasks like API endpoints, webhooks, and real-time data processing. This guide breaks down Edge Functions into key sections: an example use case, deployment process, global distribution, and execution mechanics.

## 1\. Understanding Edge Functions through an example: Image filtering [\#](https://supabase.com/docs/guides/functions/architecture\#1-understanding-edge-functions-through-an-example-image-filtering)

To illustrate how edge functions operate, consider a photo-sharing app where users upload images and apply filters (e.g., grayscale or sepia) before saving them.

- **Workflow Overview**:
  - A user uploads an original image to Supabase Storage.
  - When the user selects a filter, the client-side app (using the Supabase JavaScript SDK) invokes an edge function named something like "apply-filter."
  - The edge function:
    1. Downloads the original image from Supabase Storage.
    2. Applies the filter using a library like ImageMagick.
    3. Uploads the processed image back to Storage.
    4. Returns the path to the filtered image to the client.
- **Why Edge Functions?**:
  - They handle compute-intensive tasks without burdening the client device or the database.
  - Execution happens server-side but at the edge, ensuring speed and scalability.
  - Developers define the function in a simple JavaScript file within the Supabase functions directory.

This example highlights edge functions as lightweight, on-demand code snippets that integrate seamlessly with Supabase services like Storage and Auth.

## 2\. Deployment process [\#](https://supabase.com/docs/guides/functions/architecture\#2-deployment-process)

Deploying an edge function is straightforward and automated, requiring no manual server setup.

- **Steps to Deploy**:
1. Write the function code in your local Supabase project (e.g., in `supabase/functions/apply-filter/index.ts`).
2. Run the command `supabase functions deploy apply-filter` via the Supabase CLI.
3. The CLI bundles the function and its dependencies into an **ESZip file**—a compact format created by Deno that includes a complete module graph for quick loading and execution.
4. The bundled file is uploaded to Supabase's backend.
5. Supabase generates a unique URL for the function, making it accessible globally.
- **Key Benefits of Deployment**:
  - Automatic handling of dependencies and bundling.
  - No need to manage infrastructure; Supabase distributes the function across its global edge network.

Once deployed, the function is ready for invocation from anywhere, with Supabase handling scaling and availability.

## 3\. Global distribution and routing [\#](https://supabase.com/docs/guides/functions/architecture\#3-global-distribution-and-routing)

Edge functions leverage a distributed architecture to minimize latency by running code close to the user.

- **Architecture Components**:
  - **Global API Gateway**: Acts as the entry point for all requests. It uses the requester's IP address to determine geographic location and routes the request to the nearest edge location (e.g., routing a request from Amsterdam to Frankfurt).
  - **Edge Locations**: Supabase's network of data centers worldwide where functions are replicated. The ESZip bundle is automatically distributed to these locations upon deployment.
  - **Routing Logic**: Based on geolocation mapping, ensuring the function executes as close as possible to the user for optimal performance.
- **How Distribution Works**:
  - Post-deployment, the function is propagated to all edge nodes.
  - This setup eliminates the need for developers to configure CDNs or regional servers manually.

This global edge network is what makes edge functions "edge-native," providing consistent performance regardless of user location.

## 4\. Execution mechanics: Fast and isolated [\#](https://supabase.com/docs/guides/functions/architecture\#4-execution-mechanics-fast-and-isolated)

The core of edge functions' efficiency lies in their execution environment, which prioritizes speed, isolation, and scalability.

- **Request Handling**:
1. A client sends an HTTP request (e.g., POST) to the function's URL, including parameters like auth headers, image ID, and filter type.
2. The global API gateway routes it to the nearest edge location.
3. At the edge, Supabase's **edge runtime** validates the request (e.g., checks authorization).
- **Execution Environment**:
  - A new **V8 isolate** is spun up for each invocation. V8 is the JavaScript engine used by Chrome and Node.js, providing a lightweight, sandboxed environment.
  - Each isolate has its own memory heap and execution thread, ensuring complete isolation—no interference between concurrent requests.
  - The ESZip bundle is loaded into the isolate, and the function code runs.
  - After execution, the response (e.g., filtered image path) is sent back to the client.
- **Performance Optimizations**:
  - **Cold Starts**: Even initial executions are fast (milliseconds) due to the compact ESZip format and minimal Deno runtime overhead.
  - **Warm Starts**: Isolates can remain active for a period (plan-dependent) to handle subsequent requests without restarting.
  - **Concurrency**: Multiple isolates can run simultaneously in the same edge location, supporting high traffic.
- **Isolation and Security**:
  - Isolates prevent side effects from one function affecting others, enhancing reliability.
  - No persistent state; each run is stateless, ideal for ephemeral tasks.

Compared to traditional serverless or monolithic architectures, this setup offers lower latency, automatic scaling, and no infrastructure management, making it perfect for global apps.

## Benefits and use cases [\#](https://supabase.com/docs/guides/functions/architecture\#benefits-and-use-cases)

- **Advantages**:
  - **Low Latency**: Proximity to users reduces round-trip times.
  - **Scalability**: Handles variable loads without provisioning servers.
  - **Developer-Friendly**: Focus on code; Supabase manages the rest.
  - **Cost-Effective**: Pay-per-use model, with fast execution minimizing costs.
- **Common Use Cases**:
  - Real-time data transformations (e.g., image processing).
  - API integrations and webhooks.
  - Personalization and A/B testing at the edge.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/architecture.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2Fza_loEtS4gs%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[1\. Understanding Edge Functions through an example: Image filtering](https://supabase.com/docs/guides/functions/architecture#1-understanding-edge-functions-through-an-example-image-filtering) [2\. Deployment process](https://supabase.com/docs/guides/functions/architecture#2-deployment-process) [3\. Global distribution and routing](https://supabase.com/docs/guides/functions/architecture#3-global-distribution-and-routing) [4\. Execution mechanics: Fast and isolated](https://supabase.com/docs/guides/functions/architecture#4-execution-mechanics-fast-and-isolated) [Benefits and use cases](https://supabase.com/docs/guides/functions/architecture#benefits-and-use-cases)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)