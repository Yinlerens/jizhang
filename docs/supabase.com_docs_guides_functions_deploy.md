---
url: "https://supabase.com/docs/guides/functions/deploy"
title: "Deploy to Production | Supabase Docs"
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
3. Development
5. [Deploy to Production](https://supabase.com/docs/guides/functions/deploy)

# Deploy to Production

## Deploy your Edge Functions to your remote Supabase Project.

* * *

Once you have developed your Edge Functions locally, you can deploy them to your Supabase project.

Before getting started, make sure you have the Supabase CLI installed. Check out the CLI installation guide for installation methods and troubleshooting.

* * *

## Step 1: Authenticate [\#](https://supabase.com/docs/guides/functions/deploy\#step-1-authenticate)

Log in to the Supabase CLI if you haven't already:

```
1
supabase login
```

* * *

## Step 2: Connect your project [\#](https://supabase.com/docs/guides/functions/deploy\#step-2-connect-your-project)

Get the project ID associated with your function:

```
1
supabase projects list
```

##### Need a new project?

If you haven't yet created a Supabase project, you can do so by visiting [database.new](https://database.new/).

[Link](https://supabase.com/docs/reference/cli/usage#supabase-link) your local project to your remote Supabase project using the ID you just retrieved:

```
1
supabase link --project-ref your-project-id
```

Now you should have your local development environment connected to your production project.

* * *

## Step 3: Deploy Functions [\#](https://supabase.com/docs/guides/functions/deploy\#step-3-deploy-functions)

You can deploy all edge functions within the `functions` folder with a single command:

```
1
supabase functions deploy
```

Or deploy individual Edge Functions by specifying the function name:

```
1
supabase functions deploy hello-world
```

### Deploying public functions [\#](https://supabase.com/docs/guides/functions/deploy\#deploying-public-functions)

By default, Edge Functions require a valid JWT in the authorization header. If you want to deploy Edge Functions without Authorization checks (commonly used for Stripe webhooks), you can pass the `--no-verify-jwt` flag:

```
1
supabase functions deploy hello-world --no-verify-jwt
```

Be careful when using this flag, as it will allow anyone to invoke your Edge Function without a valid JWT. The Supabase client libraries automatically handle authorization.

## Step 4: Verify successful deployment [\#](https://supabase.com/docs/guides/functions/deploy\#step-4-verify-successful-deployment)

🎉 Your function is now live!

When the deployment is successful, your function is automatically distributed to edge locations worldwide. Your edge functions is now running globally at `https://[YOUR_PROJECT_ID].supabase.co/functions/v1/hello-world.`

* * *

## Step 5: Test your live function [\#](https://supabase.com/docs/guides/functions/deploy\#step-5-test-your-live-function)

You can now invoke your Edge Function using the project's `ANON_KEY`, which can be found in the [API settings](https://supabase.com/dashboard/project/_/settings/api) of the Supabase Dashboard. You can invoke it from within your app:

cURLJavaScript

```
1
curl --request POST 'https://<project_id>.supabase.co/functions/v1/hello-world' \
2
  --header 'Authorization: Bearer ANON_KEY' \
3
  --header 'Content-Type: application/json' \
4
  --data '{ "name":"Functions" }'
```

Note that the `SUPABASE_PUBLISHABLE_KEY` is different in development and production. To get your production anon key, you can find it in your Supabase dashboard under Settings > API.

You should now see the expected response:

```
1
{ "message": "Hello Production!" }
```

You can also test the function through the Dashboard. To see how that works, check out the [Dashboard Quickstart guide](https://supabase.com/docs/guides/dashboard/quickstart).

* * *

## CI/CD deployment [\#](https://supabase.com/docs/guides/functions/deploy\#cicd-deployment)

You can use popular CI / CD tools like GitHub Actions, Bitbucket, and GitLab CI to automate Edge Function deployments.

### GitHub Actions [\#](https://supabase.com/docs/guides/functions/deploy\#github-actions)

You can use the official [`setup-cli` GitHub Action](https://github.com/marketplace/actions/supabase-cli-action) to run Supabase CLI commands in your GitHub Actions.

The following GitHub Action deploys all Edge Functions any time code is merged into the `main` branch:

```
1
name: Deploy Function
2

3
on:
4
  push:
5
    branches:
6
      - main
7
  workflow_dispatch:
8

9
jobs:
10
  deploy:
11
    runs-on: ubuntu-latest
12

13
    env:
14
      SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
15
      PROJECT_ID: your-project-id
16

17
    steps:
18
      - uses: actions/checkout@v4
19

20
      - uses: supabase/setup-cli@v1
21
        with:
22
          version: latest
23

24
      - run: supabase functions deploy --project-ref $PROJECT_ID
```

* * *

### GitLab CI [\#](https://supabase.com/docs/guides/functions/deploy\#gitlab-ci)

Here is the sample pipeline configuration to deploy via GitLab CI.

```
1
image: node:20
2

3
# List of stages for jobs, and their order of execution
4
stages:
5
  - setup
6
  - deploy
7

8
# This job runs in the setup stage, which runs first.
9
setup-npm:
10
  stage: setup
11
  script:
12
    - npm i supabase
13
  cache:
14
    paths:
15
      - node_modules/
16
  artifacts:
17
    paths:
18
      - node_modules/
19

20
# This job runs in the deploy stage, which only starts when the job in the build stage completes successfully.
21
deploy-function:
22
  stage: deploy
23
  script:
24
    - npx supabase init
25
    - npx supabase functions deploy --debug
26
  services:
27
    - docker:dind
28
  variables:
29
    DOCKER_HOST: tcp://docker:2375
```

* * *

### Bitbucket Pipelines [\#](https://supabase.com/docs/guides/functions/deploy\#bitbucket-pipelines)

Here is the sample pipeline configuration to deploy via Bitbucket.

```
1
image: node:20
2

3
pipelines:
4
  default:
5
    - step:
6
        name: Setup
7
        caches:
8
          - node
9
        script:
10
          - npm i supabase
11
    - parallel:
12
        - step:
13
            name: Functions Deploy
14
            script:
15
              - npx supabase init
16
              - npx supabase functions deploy --debug
17
            services:
18
              - docker
```

* * *

### Function configuration [\#](https://supabase.com/docs/guides/functions/deploy\#function-configuration)

Individual function configuration like [JWT verification](https://supabase.com/docs/guides/cli/config#functions.function_name.verify_jwt) and [import map location](https://supabase.com/docs/guides/cli/config#functions.function_name.import_map) can be set via the `config.toml` file.

```
1
[functions.hello-world]
2
verify_jwt = false
```

This ensures your function configurations are consistent across all environments and deployments.

* * *

### Example [\#](https://supabase.com/docs/guides/functions/deploy\#example)

This example shows a GitHub Actions workflow that deploys all Edge Functions when code is merged into the `main` branch.

```
1
name: Deploy Function
2

3
on:
4
  push:
5
    branches:
6
      - main
7
  workflow_dispatch:
8

9
jobs:
10
  deploy:
11
    runs-on: ubuntu-latest
12

13
    env:
14
      SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
15
      SUPABASE_PROJECT_ID: ${{ secrets.SUPABASE_PROJECT_ID }}
16

17
    steps:
18
      - uses: actions/checkout@v3
19

20
      - uses: supabase/setup-cli@v1
21
        with:
22
          version: latest
23

24
      - run: supabase functions deploy --project-ref $SUPABASE_PROJECT_ID
```

[View source](https://github.com/supabase/supabase/blob/2fbb6cb9a7d6fb0a10f74b0a421af33038e557c7/examples/edge-functions/.github/workflows/deploy.yaml) [Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/functions/deploy.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2F5OWH9c4u68M%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Step 1: Authenticate](https://supabase.com/docs/guides/functions/deploy#step-1-authenticate) [Step 2: Connect your project](https://supabase.com/docs/guides/functions/deploy#step-2-connect-your-project) [Step 3: Deploy Functions](https://supabase.com/docs/guides/functions/deploy#step-3-deploy-functions) [Deploying public functions](https://supabase.com/docs/guides/functions/deploy#deploying-public-functions) [Step 4: Verify successful deployment](https://supabase.com/docs/guides/functions/deploy#step-4-verify-successful-deployment) [Step 5: Test your live function](https://supabase.com/docs/guides/functions/deploy#step-5-test-your-live-function) [CI/CD deployment](https://supabase.com/docs/guides/functions/deploy#cicd-deployment) [GitHub Actions](https://supabase.com/docs/guides/functions/deploy#github-actions) [GitLab CI](https://supabase.com/docs/guides/functions/deploy#gitlab-ci) [Bitbucket Pipelines](https://supabase.com/docs/guides/functions/deploy#bitbucket-pipelines) [Function configuration](https://supabase.com/docs/guides/functions/deploy#function-configuration) [Example](https://supabase.com/docs/guides/functions/deploy#example)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)