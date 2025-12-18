---
url: "https://supabase.com/docs/guides/deployment/branching/working-with-branches"
title: "Working with branches | Supabase Docs"
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

[Deployment & Branching](https://supabase.com/docs/guides/deployment)

[Overview](https://supabase.com/docs/guides/deployment)

Environments[Managing environments](https://supabase.com/docs/guides/deployment/managing-environments)
[Database migrations](https://supabase.com/docs/guides/deployment/database-migrations)

Branching[Overview](https://supabase.com/docs/guides/deployment/branching)
[Branching via GitHub](https://supabase.com/docs/guides/deployment/branching/github-integration)
[Branching via dashboard](https://supabase.com/docs/guides/deployment/branching/dashboard)
[Working with branches](https://supabase.com/docs/guides/deployment/branching/working-with-branches)
[Configuration](https://supabase.com/docs/guides/deployment/branching/configuration)
[Integrations](https://supabase.com/docs/guides/deployment/branching/integrations)
[Troubleshooting](https://supabase.com/docs/guides/deployment/branching/troubleshooting)
[Billing](https://supabase.com/docs/guides/platform/manage-your-usage/branching)

Terraform[Terraform provider](https://supabase.com/docs/guides/deployment/terraform)
[Terraform tutorial](https://supabase.com/docs/guides/deployment/terraform/tutorial)
[Terraform reference](https://supabase.com/docs/guides/deployment/terraform/reference)

Production readiness[Shared responsibility model](https://supabase.com/docs/guides/deployment/shared-responsibility-model)
[Maturity model](https://supabase.com/docs/guides/deployment/maturity-model)
[Production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)
[SOC 2 compliance](https://supabase.com/docs/guides/security/soc-2-compliance)

CI/CD[Generate types from your database](https://supabase.com/docs/guides/deployment/ci/generating-types)
[Automated testing](https://supabase.com/docs/guides/deployment/ci/testing)
[Back up your database](https://supabase.com/docs/guides/deployment/ci/backups)

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

Home

1. [Deployment & Branching](https://supabase.com/docs/guides/deployment)
3. Branching
5. [Working with branches](https://supabase.com/docs/guides/deployment/branching/working-with-branches)

# Working with branches

## Learn how to develop and manage your Supabase branches

* * *

This guide covers how to work with Supabase branches effectively, including migration management, seeding behavior, and development workflows.

## Subscribing to notifications [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#subscribing-to-notifications)

You can subscribe to webhook notifications when an action run completes on a persistent branch. The payload format follows the [webhook standards](https://www.standardwebhooks.com/).

```
1
{
2
  "type": "run.completed",
3
  "timestamp": "2025-10-17T02:27:18.705861793Z",
4
  "data": {
5
    "project_ref": "xuqpsshjxdecrwdyuxvs",
6
    "details_url": "https://supabase.com/dashboard/project/xuqpsshjxdecrwdyuxvs/branches",
7
    "action_run": {
8
      "id": "d5f8b4298d0a4d37b99e255c7837e7af",
9
      "created_at": "2025-10-17T02:27:10.133329324Z"
10
      "steps": [\
11\
        {\
12\
          "name": "clone",\
13\
          "status": "exited",\
14\
          "updated_at": "2025-10-17T02:27:10.788435466Z"\
15\
        },\
16\
        {\
17\
          "name": "pull",\
18\
          "status": "exited",\
19\
          "updated_at": "2025-10-17T02:27:11.701742857Z"\
20\
        },\
21\
        {\
22\
          "name": "health",\
23\
          "status": "exited",\
24\
          "updated_at": "2025-10-17T02:27:12.79205717Z"\
25\
        },\
26\
        {\
27\
          "name": "configure",\
28\
          "status": "exited",\
29\
          "updated_at": "2025-10-17T02:27:13.726839657Z"\
30\
        },\
31\
        {\
32\
          "name": "migrate",\
33\
          "status": "exited",\
34\
          "updated_at": "2025-10-17T02:27:14.97017507Z"\
35\
        },\
36\
        {\
37\
          "name": "seed",\
38\
          "status": "exited",\
39\
          "updated_at": "2025-10-17T02:27:15.637684921Z"\
40\
        },\
41\
        {\
42\
          "name": "deploy",\
43\
          "status": "exited",\
44\
          "updated_at": "2025-10-17T02:27:18.604193114Z"\
45\
        }\
46\
      ]
47
    }
48
  }
49
}
```

We recommend registering a single webhooks processor that dispatches events to downstream services based on the payload type. The easiest way to do that is by deploying an Edge Function. For example, the following Edge Function listens for run completed events to notify a Slack channel.

###### supabase/functions/notify-slack/index.ts

```
1
// Setup type definitions for built-in Supabase Runtime APIs
2
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
3

4
console.log('Branching notification booted!')
5
const slack = Deno.env.get('SLACK_WEBHOOK_URL') ?? ''
6

7
Deno.serve(async (request) => {
8
  const body = await request.json()
9
  const blocks = [\
10\
    {\
11\
      type: 'header',\
12\
      text: {\
13\
        type: 'plain_text',\
14\
        text: `Action run ${body.data.action_run.failure ? 'failed' : 'completed'}`,\
15\
        emoji: true,\
16\
      },\
17\
    },\
18\
    {\
19\
      type: 'section',\
20\
      fields: [\
21\
        {\
22\
          type: 'mrkdwn',\
23\
          text: `*Branch ref:*\n${body.data.project_ref}`,\
24\
        },\
25\
        {\
26\
          type: 'mrkdwn',\
27\
          text: `*Run ID:*\n${body.data.action_run.id}`,\
28\
        },\
29\
      ],\
30\
    },\
31\
    {\
32\
      type: 'section',\
33\
      fields: [\
34\
        {\
35\
          type: 'mrkdwn',\
36\
          text: `*Started at:*\n${body.data.action_run.created_at}`,\
37\
        },\
38\
        {\
39\
          type: 'mrkdwn',\
40\
          text: `*Completed at:*\n${body.timestamp}`,\
41\
        },\
42\
      ],\
43\
    },\
44\
    {\
45\
      type: 'section',\
46\
      text: {\
47\
        type: 'mrkdwn',\
48\
        text: `<${body.data.details_url}|View logs>`,\
49\
      },\
50\
    },\
51\
  ]
52
  const resp = await fetch(slack, {
53
    method: 'POST',
54
    body: JSON.stringify({
55
      blocks,
56
    }),
57
  })
58
  const message = await resp.text()
59
  return new Response(
60
    JSON.stringify({
61
      message,
62
    }),
63
    {
64
      status: 200,
65
    }
66
  )
67
})
```

1

### Setup Slack webhook URL

Create a [Slack webhook URL](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/) and set it as Function secrets.

```
1
supabase secrets set --project-ref <branch-ref> SLACK_WEBHOOK_URL=<your-webhook-url>
```

2

### Deploy your webhooks processor

Create and deploy an Edge Function to process webhooks.

```
1
supabase functions deploy --project-ref <branch-ref> --use-api notify-slack
```

3

### Update branch notification URL

Update the notification URL of your target branch to point to your Edge Function.

```
1
supabase branches update <branch-ref> --notify-url https://<branch-ref>.supabase.co/functions/v1/notify-slack
```

After completing the steps above, you should receive a Slack message whenever an action run completes on your target branch.

## Migration and seeding behavior [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#migration-and-seeding-behavior)

Migrations are run in sequential order. Each migration builds upon the previous one.

The preview branch has a record of which migrations have been applied, and only applies new migrations for each commit. This can create an issue when rolling back migrations.

### Using ORM or custom seed scripts [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#using-orm-or-custom-seed-scripts)

If you want to use your own ORM for managing migrations and seed scripts, you will need to run them in GitHub Actions after the preview branch is ready. The branch credentials can be fetched using the following example GHA workflow.

###### .github/workflows/custom-orm.yaml

```
1
name: Custom ORM
2

3
on:
4
  pull_request:
5
    types:
6
      - opened
7
      - reopened
8
      - synchronize
9
    branches:
10
      - main
11
    paths:
12
      - 'supabase/**'
13

14
jobs:
15
  wait:
16
    runs-on: ubuntu-latest
17
    outputs:
18
      status: ${{ steps.check.outputs.conclusion }}
19
    steps:
20
      - uses: fountainhead/action-wait-for-check@v1.2.0
21
        id: check
22
        with:
23
          checkName: Supabase Preview
24
          ref: ${{ github.event.pull_request.head.sha || github.sha }}
25
          token: ${{ secrets.GITHUB_TOKEN }}
26

27
  migrate:
28
    needs:
29
      - wait
30
    if: ${{ needs.wait.outputs.status == 'success' }}
31
    runs-on: ubuntu-latest
32
    env:
33
      SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
34
      SUPABASE_PROJECT_ID: ${{ secrets.SUPABASE_PROJECT_ID }}
35
    steps:
36
      - uses: supabase/setup-cli@v1
37
        with:
38
          version: latest
39
      - run: supabase --experimental branches get "$GITHUB_HEAD_REF" -o env >> $GITHUB_ENV
40
      - name: Custom ORM migration
41
        run: psql "$POSTGRES_URL_NON_POOLING" -c 'select 1'
```

### Rolling back migrations [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#rolling-back-migrations)

You might want to roll back changes you've made in an earlier migration change. For example, you may have pushed a migration file containing schema changes you no longer want.

To fix this, push the latest changes, then delete the preview branch in Supabase and reopen it.

The new preview branch is reseeded from the `./supabase/seed.sql` file by default. Any additional data changes made on the old preview branch are lost. This is equivalent to running `supabase db reset` locally. All migrations are rerun in sequential order.

### Seeding behavior [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#seeding-behavior)

Your Preview Branches are seeded with sample data using the same as [local seeding behavior](https://supabase.com/docs/guides/local-development/seeding-your-database).

The database is only seeded once, when the preview branch is created. To rerun seeding, delete the preview branch and recreate it by closing, and reopening your pull request.

## Developing with branches [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#developing-with-branches)

You can develop with branches using either local or remote development workflows.

### Local development workflow [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#local-development-workflow)

1. Create a new Git branch for your feature
2. Make schema changes using the Supabase CLI
3. Generate migration files with `supabase db diff`
4. Test your changes locally
5. Commit and push to GitHub
6. Open a pull request to create a preview branch

### Remote development workflow [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#remote-development-workflow)

1. Create a preview branch in the Supabase dashboard
2. Switch to the branch using the branch dropdown
3. Make schema changes in the dashboard
4. Pull changes locally using `supabase db pull`
5. Commit the generated migration files
6. Push to your Git repository

## Managing branch environments [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#managing-branch-environments)

### Switching between branches [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#switching-between-branches)

Use the branch dropdown in the Supabase dashboard to switch between different branches. Each branch has its own:

- Database instance
- API endpoints
- Authentication settings
- Storage buckets

### Accessing branch credentials [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#accessing-branch-credentials)

Each branch has unique credentials that you can find in the dashboard:

1. Switch to your desired branch
2. Navigate to Settings > API
3. Copy the branch-specific URLs and keys

### Branch isolation [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#branch-isolation)

Branches are completely isolated from each other. Changes made in one branch don't affect others, including:

- Database schema and data
- Storage objects
- Edge Functions
- Auth configurations

## Next steps [\#](https://supabase.com/docs/guides/deployment/branching/working-with-branches\#next-steps)

- Learn about [branch configuration](https://supabase.com/docs/guides/deployment/branching/configuration)
- Explore [integrations](https://supabase.com/docs/guides/deployment/branching/integrations)
- Review [troubleshooting guide](https://supabase.com/docs/guides/deployment/branching/troubleshooting)

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/deployment/branching/working-with-branches.mdx)

### Is this helpful?

NoYes

### On this page

[Subscribing to notifications](https://supabase.com/docs/guides/deployment/branching/working-with-branches#subscribing-to-notifications) [Migration and seeding behavior](https://supabase.com/docs/guides/deployment/branching/working-with-branches#migration-and-seeding-behavior) [Using ORM or custom seed scripts](https://supabase.com/docs/guides/deployment/branching/working-with-branches#using-orm-or-custom-seed-scripts) [Rolling back migrations](https://supabase.com/docs/guides/deployment/branching/working-with-branches#rolling-back-migrations) [Seeding behavior](https://supabase.com/docs/guides/deployment/branching/working-with-branches#seeding-behavior) [Developing with branches](https://supabase.com/docs/guides/deployment/branching/working-with-branches#developing-with-branches) [Local development workflow](https://supabase.com/docs/guides/deployment/branching/working-with-branches#local-development-workflow) [Remote development workflow](https://supabase.com/docs/guides/deployment/branching/working-with-branches#remote-development-workflow) [Managing branch environments](https://supabase.com/docs/guides/deployment/branching/working-with-branches#managing-branch-environments) [Switching between branches](https://supabase.com/docs/guides/deployment/branching/working-with-branches#switching-between-branches) [Accessing branch credentials](https://supabase.com/docs/guides/deployment/branching/working-with-branches#accessing-branch-credentials) [Branch isolation](https://supabase.com/docs/guides/deployment/branching/working-with-branches#branch-isolation) [Next steps](https://supabase.com/docs/guides/deployment/branching/working-with-branches#next-steps)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)