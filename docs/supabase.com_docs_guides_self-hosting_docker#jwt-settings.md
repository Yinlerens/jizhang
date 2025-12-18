---
url: "https://supabase.com/docs/guides/self-hosting/docker#jwt-settings"
title: "Self-Hosting with Docker | Supabase Docs"
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
3. [Self-Hosting with Docker](https://supabase.com/docs/guides/self-hosting/docker)

# Self-Hosting with Docker

## Learn how to configure and deploy Supabase with Docker.

* * *

Docker is the easiest way to get started with self-hosted Supabase. It should take you less than 30 minutes to get up and running.

## Contents [\#](https://supabase.com/docs/guides/self-hosting/docker\#contents)

1. [Before you begin](https://supabase.com/docs/guides/self-hosting/docker#before-you-begin)
2. [System requirements](https://supabase.com/docs/guides/self-hosting/docker#system-requirements)
3. [Installing Supabase](https://supabase.com/docs/guides/self-hosting/docker#installing-supabase)
4. [Configuring and securing Supabase](https://supabase.com/docs/guides/self-hosting/docker#configuring-and-securing-supabase)
5. [Starting and stopping](https://supabase.com/docs/guides/self-hosting/docker#starting-and-stopping)
6. [Accessing Supabase services](https://supabase.com/docs/guides/self-hosting/docker#accessing-supabase-services)
7. [Updating](https://supabase.com/docs/guides/self-hosting/docker#updating)
8. [Uninstalling](https://supabase.com/docs/guides/self-hosting/docker#uninstalling)
9. [Advanced topics](https://supabase.com/docs/guides/self-hosting/docker#advanced-topics)

## Before you begin [\#](https://supabase.com/docs/guides/self-hosting/docker\#before-you-begin)

This guide assumes you're comfortable with:

- Linux server administration basics
- Docker and Docker Compose
- Networking fundamentals (ports, DNS, firewalls)

If you're new to these topics, consider starting with [managed Supabase](https://supabase.com/dashboard) for free, or try [local development with the CLI](https://supabase.com/docs/guides/local-development).

You need the following installed on your system:

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/manuals/):
  - **Linux server/VPS**: Install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
  - **Linux desktop**: Install [Docker Desktop](https://docs.docker.com/desktop/setup/install/linux/)
  - **macOS**: Install [Docker Desktop](https://docs.docker.com/desktop/install/mac-install/)
  - **Windows**: Install [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)

## System requirements [\#](https://supabase.com/docs/guides/self-hosting/docker\#system-requirements)

Minimum requirements for running all Supabase components, suitable for development and small to medium production workloads:

| Resource | Minimum | Recommended |
| --- | --- | --- |
| RAM | 4 GB | 8 GB+ |
| CPU | 2 cores | 4 cores+ |
| Disk | 50 GB SSD | 80 GB+ SSD |

If you don't need specific services, such as Logflare (Analytics), Realtime, Storage, imgproxy, or Edge Runtime (Functions), you can remove the corresponding sections and dependencies from `docker-compose.yml` to reduce resource requirements.

## Installing Supabase [\#](https://supabase.com/docs/guides/self-hosting/docker\#installing-supabase)

Follow these steps to start Supabase on your machine:

GeneralAdvanced

```
1
# Get the code
2
git clone --depth 1 https://github.com/supabase/supabase
3

4
# Make your new supabase project directory
5
mkdir supabase-project
6

7
# Tree should look like this
8
# .
9
# ├── supabase
10
# └── supabase-project
11

12
# Copy the compose files over to your project
13
cp -rf supabase/docker/* supabase-project
14

15
# Copy the fake env vars
16
cp supabase/docker/.env.example supabase-project/.env
17

18
# Switch to your project directory
19
cd supabase-project
20

21
# Pull the latest images
22
docker compose pull
```

If you are using rootless Docker, edit `.env` and set `DOCKER_SOCKET_LOCATION` to your docker socket location. For example: `/run/user/1000/docker.sock`. Otherwise, you will see an error like `container supabase-vector exited (0)`.

## Configuring and securing Supabase [\#](https://supabase.com/docs/guides/self-hosting/docker\#configuring-and-securing-supabase)

While we provided example placeholder passwords and keys in the `.env.example` file, you should NEVER start your self-hosted Supabase using these defaults.

Follow all of the steps in this section to ensure you have a secure setup, and only then start all services.

### Configure database password [\#](https://supabase.com/docs/guides/self-hosting/docker\#configure-database-password)

Change the placeholder password in the `.env` file **before** starting your Supabase for the first time.

- `POSTGRES_PASSWORD`: the password for the `postgres` and `supabase_admin` database roles

Follow the [password guidelines](https://supabase.com/docs/guides/database/postgres/roles#passwords) for choosing a secure password. For easier configuration, **use only letters and numbers** to avoid URL encoding issues in connection strings.

### Generate and configure API keys [\#](https://supabase.com/docs/guides/self-hosting/docker\#generate-and-configure-api-keys)

Use the key generator below to obtain and configure the following secure keys in `.env`:

- `JWT_SECRET`: Used by PostgREST and GoTrue to sign and verify JWTs.
- `ANON_KEY`: Client-side API key with limited permissions (`anon` role). Use this in your frontend applications.
- `SERVICE_ROLE_KEY`: Server-side API key with full database access (`service_role` role). Never expose this in client code.

JWT\_SECRET

```bash
4cAYShku9AU4BUTsOjePNBdV1zphEzNF7ekfKan8
```

ANON\_KEY

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzY1OTQ3NjAwLCJleHAiOjE5MjM3MTQwMDB9.PtDYnQMEOvP156D0wFjI5c6NmSBZm9l_5J2bxv-1JKs
```

SERVICE\_ROLE\_KEY

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NjU5NDc2MDAsImV4cCI6MTkyMzcxNDAwMH0.5k2wmuRdZAIq4Pb61l23bMEjSIhoAsEjDPJiCoX_ZVI
```

Generate new

1. Copy the generated value and update `JWT_SECRET` in the `.env` file. Do not share this secret publicly or commit it to version control.
2. Copy the generated value and update `ANON_KEY` in the `.env` file.
3. Copy the generated value and update `SERVICE_ROLE_KEY` in the `.env` file.

The generated keys expire in 5 years. You can verify them at [jwt.io](https://jwt.io/) using the saved value of `JWT_SECRET`.

### Configure other keys, and important URLs [\#](https://supabase.com/docs/guides/self-hosting/docker\#configure-other-keys-and-important-urls)

Edit the following settings in the `.env` file:

- `SECRET_KEY_BASE`: encryption key for securing Realtime and Supavisor communications. (Must be at least 64 characters; generate with `openssl rand -base64 48`)
- `VAULT_ENC_KEY`: encryption key used by Supavisor for storing encrypted configuration. (Must be exactly 32 characters; generate with `openssl rand -hex 16`)
- `PG_META_CRYPTO_KEY`: encryption key for securing connection strings used by Studio against postgres-meta. (Must be at least 32 characters; generate with `openssl rand -base64 24`)
- `LOGFLARE_PUBLIC_ACCESS_TOKEN`: API token for log ingestion and querying. Used by Vector and Studio to send and query logs. (Must be at least 32 characters; generate with `openssl rand -base64 24`)
- `LOGFLARE_PRIVATE_ACCESS_TOKEN`: API token for Logflare management operations. Used by Studio for administrative tasks. Never expose client-side. (Must be at least 32 characters; generate with `openssl rand -base64 24`)

Review and change URL environment variables:

- `SUPABASE_PUBLIC_URL`: the base URL for accessing your Supabase via the Internet, e.g, `http://example.com:8000`
- `API_EXTERNAL_URL`: the base URL for API requests, e.g., `http://example.com:8000`
- `SITE_URL`: the base URL of your site, e.g., `http://example.com:3000`

If you are only using self-hosted Supabase locally, you can use `localhost`.

### Studio authentication [\#](https://supabase.com/docs/guides/self-hosting/docker\#studio-authentication)

Access to Studio dashboard and internal API is protected with **HTTP basic authentication**.

The default password MUST be changed before starting Supabase.

Change the password in the `.env` file:

- `DASHBOARD_PASSWORD`: password for Studio / dashboard

The password must include at least one letter (do not use numbers only).

Optionally change the user:

- `DASHBOARD_USERNAME`: username for Studio / dashboard

## Starting and stopping [\#](https://supabase.com/docs/guides/self-hosting/docker\#starting-and-stopping)

You can start all services by using the following command in the same directory as your `docker-compose.yml` file:

```
1
# Start the services (in detached mode)
2
docker compose up -d
```

After all the services have started you can see them running in the background:

```
1
docker compose ps
```

After a minute or less, all services should have a status `Up [...] (healthy)`. If you see a status such as `created` but not `Up`, try inspecting the Docker logs for a specific container, e.g.,

```
1
docker compose logs analytics
```

To stop Supabase, use:

```
1
docker compose down
```

## Accessing Supabase services [\#](https://supabase.com/docs/guides/self-hosting/docker\#accessing-supabase-services)

After the Supabase services are configured and running, you can access the dashboard, connect to the database, and use edge functions.

### Accessing Supabase Studio [\#](https://supabase.com/docs/guides/self-hosting/docker\#accessing-supabase-studio)

You can access Supabase Studio through the API gateway on port `8000`.

For example: `http://example.com:8000`, or `http://<your-ip>:8000` (or `localhost:8000` if you are running Docker Compose locally).

You will be prompted for a username and password. Use the credentials that you set up earlier in [Studio authentication](https://supabase.com/docs/guides/self-hosting/docker#studio-authentication).

### Accessing Postgres [\#](https://supabase.com/docs/guides/self-hosting/docker\#accessing-postgres)

By default, the Supabase stack provides the [Supavisor](https://supabase.github.io/supavisor/development/docs/) connection pooler for accessing Postgres and managing database connections.

You can connect to the Postgres database via Supavisor using the methods described below. Use your domain name, your server IP, or `localhost` depending on whether you are running self-hosted Supabase on a VPS, or locally.

The default POOLER\_TENANT\_ID is `your-tenant-id` (can be changed in `.env`), and the password is the one you set previously in [Configure database password](https://supabase.com/docs/guides/self-hosting/docker#configure-database-password).

For session-based connections (equivalent to a direct Postgres connection):

```
1
psql 'postgres://postgres.[POOLER_TENANT_ID]:[POSTGRES_PASSWORD]@[your-domain]:5432/postgres'
```

For pooled transactional connections:

```
1
psql 'postgres://postgres.[POOLER_TENANT_ID]:[POSTGRES_PASSWORD]@[your-domain]:6543/postgres'
```

When using `psql` with command-line parameters instead of a connection string to connect to Supavisor, the `-U` parameter should also be `postgres.[POOLER_TENANT_ID]`, and not just `postgres`.

If for some reason you need to configure Postgres to be directly accessible from the Internet, read [Exposing your Postgres database](https://supabase.com/docs/guides/self-hosting/docker#exposing-your-postgres-database) below.

### Accessing Edge Functions [\#](https://supabase.com/docs/guides/self-hosting/docker\#accessing-edge-functions)

Edge Functions are stored in `volumes/functions`. The default setup has a `hello` function that you can invoke on `http://<your-domain>:8000/functions/v1/hello`.

You can add new Functions as `volumes/functions/<FUNCTION_NAME>/index.ts`. Restart the `functions` service to pick up the changes: `docker compose restart functions --no-deps`

### Accessing the APIs [\#](https://supabase.com/docs/guides/self-hosting/docker\#accessing-the-apis)

Each of the APIs is available through the same API gateway:

- REST: `http://<your-domain>:8000/rest/v1/`
- Auth: `http://<your-domain>:8000/auth/v1/`
- Storage: `http://<your-domain>:8000/storage/v1/`
- Realtime: `http://<your-domain>:8000/realtime/v1/`

## Updating [\#](https://supabase.com/docs/guides/self-hosting/docker\#updating)

We publish stable releases of the Docker Compose setup approximately once a month. To update, apply the latest changes from the repository and restart the services. If you want to run different versions of individual services, you can change the image tags in the Docker Compose file, but compatibility is not guaranteed. All Supabase images are available on [Docker Hub](https://hub.docker.com/u/supabase).

To follow the changes and updates, refer to the self-hosted Supabase [changelog](https://github.com/supabase/supabase/blob/master/docker/CHANGELOG.md).

You need to restart services to pick up the changes, which may result in downtime for your applications and users.

**Example:**
You'd like to update or rollback the Studio image. Follow the steps below:

1. Check the [supabase/studio](https://hub.docker.com/r/supabase/studio/tags) images on [Supabase Docker Hub](https://hub.docker.com/u/supabase)
2. Find the latest version (tag) number. It looks something like `2025.11.26-sha-8f096b5`
3. Update the `image` field in the `docker-compose.yml` file. It should look like this: `image: supabase/studio:2025.11.26-sha-8f096b5`
4. Run `docker compose pull`, followed by `docker compose down && docker compose up -d` to restart Supabase.

## Uninstalling [\#](https://supabase.com/docs/guides/self-hosting/docker\#uninstalling)

Be careful — the following destroys all data, including the database and storage volumes!

To uninstall, stop Supabase (while in the same directory as your `docker-compose.yml` file):

```
1
# Stop docker and remove volumes:
2
docker compose down -v
```

Optionally, ensure removal of all Postgres data:

```
1
rm -rf volumes/db/data
```

and all Storage data:

```
1
rm -rf volumes/storage
```

## Advanced topics [\#](https://supabase.com/docs/guides/self-hosting/docker\#advanced-topics)

Everything beyond this point in the guide helps you understand how the system works and how you can modify it to suit your needs.

### Architecture [\#](https://supabase.com/docs/guides/self-hosting/docker\#architecture)

Supabase is a combination of open source tools specifically developed for enterprise-readiness.

If the tools and communities already exist, with an MIT, Apache 2, or equivalent open source license, we will use and support that tool. If the tool doesn't exist, we build and open source it ourselves.

![Diagram showing the architecture of Supabase. The Kong API gateway sits in front of 7 services: GoTrue, PostgREST, Realtime, Storage, pg_meta, Functions, and pg_graphql. All the services talk to a single Postgres instance.](https://supabase.com/docs/img/supabase-architecture--light.svg)

- **[Studio](https://github.com/supabase/supabase/tree/master/apps/studio)** \- A dashboard for managing your self-hosted Supabase project
- **[Kong](https://github.com/Kong/kong)** \- Kong API gateway
- **[Auth](https://github.com/supabase/auth)** \- JWT-based authentication API for user sign-ups, logins, and session management
- **[PostgREST](https://github.com/PostgREST/postgrest)** \- Web server that turns your Postgres database directly into a RESTful API
- **[Realtime](https://github.com/supabase/realtime)** \- Elixir server that listens to Postgres database changes and broadcasts them to subscribed clients
- **[Storage](https://github.com/supabase/storage)** \- RESTful API for managing files in S3, with Postgres handling permissions

- **[imgproxy](https://github.com/imgproxy/imgproxy)** \- Fast and secure image processing server
- **[postgres-meta](https://github.com/supabase/postgres-meta)** \- RESTful API for managing Postgres (fetch tables, add roles, run queries)

- **[PostgreSQL](https://github.com/supabase/postgres)** \- Object-relational database with over 30 years of active development
- **[Edge Runtime](https://github.com/supabase/edge-runtime)** \- Web server based on Deno runtime for running JavaScript, TypeScript, and WASM services
- **[Logflare](https://github.com/Logflare/logflare)** \- Log management and event analytics platform
- **[Vector](https://github.com/vectordotdev/vector)** \- High-performance observability data pipeline for logs
- **[Supavisor](https://github.com/supabase/supavisor)** \- Supabase's Postgres connection pooler

Multiple services require specific configuration within the Postgres database. Refer to the documentation describing the [default roles](https://supabase.com/docs/guides/database/postgres/roles#supabase-roles) to learn more.

You can find all the default extensions inside the [schema migration scripts repo](https://github.com/supabase/postgres/tree/develop/migrations). These scripts are mounted at `/docker-entrypoint-initdb.d` to run automatically when starting the database container.

### Configuring services [\#](https://supabase.com/docs/guides/self-hosting/docker\#configuring-services)

Each service has a number of configuration options you can find in the related documentation.

Configuration options are generally added to the `.env` file and referenced in `docker-compose.yml` service definitions, e.g.,

docker-compose.yml.env

```
1
services:
2
  rest:
3
    image: postgrest/postgrest
4
    environment:
5
      PGRST_JWT_SECRET: ${JWT_SECRET}
```

### Common configuration tasks [\#](https://supabase.com/docs/guides/self-hosting/docker\#common-configuration-tasks)

You can configure each Supabase service separately through environment variables and configuration files. Below are the most common configuration options.

#### Configuring an email server [\#](https://supabase.com/docs/guides/self-hosting/docker\#configuring-an-email-server)

You will need to use a production-ready SMTP server for sending emails. You can configure the SMTP server by updating the following environment variables:

```
1
SMTP_ADMIN_EMAIL=
2
SMTP_HOST=
3
SMTP_PORT=
4
SMTP_USER=
5
SMTP_PASS=
6
SMTP_SENDER_NAME=
```

We recommend using [AWS SES](https://aws.amazon.com/ses/). It's extremely cheap and reliable. Restart all services to pick up the new configuration.

#### Configuring S3 Storage [\#](https://supabase.com/docs/guides/self-hosting/docker\#configuring-s3-storage)

By default all files are stored locally on the server. You can configure the Storage service to use S3 by updating the following environment variables:

```
1
storage:
2
  environment: STORAGE_BACKEND=s3
3
    GLOBAL_S3_BUCKET=name-of-your-s3-bucket
4
    REGION=region-of-your-s3-bucket
```

You can find all the available options in the [storage repository](https://github.com/supabase/storage-api/blob/master/.env.sample). Restart the `storage` service to pick up the changes: `docker compose restart storage --no-deps`

#### Configuring Supabase AI Assistant [\#](https://supabase.com/docs/guides/self-hosting/docker\#configuring-supabase-ai-assistant)

Configuring the Supabase AI Assistant is optional. By adding your own `OPENAI_API_KEY`, you can enable AI services, which help with writing SQL queries, statements, and policies.

docker-compose.yml.env

```
1
services:
2
  studio:
3
    image: supabase/studio
4
    environment:
5
      OPENAI_API_KEY: ${OPENAI_API_KEY:-}
```

#### Setting database's `log_min_messages` [\#](https://supabase.com/docs/guides/self-hosting/docker\#setting-databases-logminmessages)

By default, `docker compose` sets the database's `log_min_messages` configuration to `fatal` to prevent redundant logs generated by Realtime. You can configure `log_min_messages` using any of the Postgres [Severity Levels](https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-SEVERITY-LEVELS).

#### Accessing Postgres through Supavisor [\#](https://supabase.com/docs/guides/self-hosting/docker\#accessing-postgres-through-supavisor)

By default, Postgres connections go through the Supavisor connection pooler for efficient connection management. Two ports are available:

- `POSTGRES_PORT` (default: 5432) – Session mode, behaves like a direct Postgres connection
- `POOLER_PROXY_PORT_TRANSACTION` (default: 6543) – Transaction mode, uses connection pooling

For more information on configuring and using Supavisor, see the [Supavisor documentation](https://supabase.github.io/supavisor/).

#### Exposing your Postgres database [\#](https://supabase.com/docs/guides/self-hosting/docker\#exposing-your-postgres-database)

By default, Postgres is only accessible through Supavisor. If you need direct access to the database (bypassing the connection pooler), you need to disable Supavisor and expose the Postgres port.

Exposing Postgres directly bypasses connection pooling and exposes your database to the network. Configure firewall rules or network policies to restrict access to trusted IPs only.

Edit `docker-compose.yml`:

1. **Disable Supavisor** \- Comment out or remove the entire `supavisor` service section
2. **Expose Postgres port** \- Add the port mapping to the `db` service, it should look like the example below:

```
1
db:
2
  ports:
3
    - ${POSTGRES_PORT}:${POSTGRES_PORT}
4
  container_name: supabase-db
```

After restarting, you can connect to the database directly using a standard Postgres connection string:

```
1
postgres://postgres:[POSTGRES_PASSWORD]@[your-server-ip]:5432/[POSTGRES_DB]
```

#### File storage backend on macOS [\#](https://supabase.com/docs/guides/self-hosting/docker\#file-storage-backend-on-macos)

By default, Storage backend is set to `file`, which is to use local files as the storage backend. For macOS compatibility, you need to choose `VirtioFS` as the Docker container file sharing implementation (in Docker Desktop -> Preferences -> General).

## Managing your secrets [\#](https://supabase.com/docs/guides/self-hosting/docker\#managing-your-secrets)

Many components inside Supabase use secure secrets and passwords. These are kept in the `.env` file, but we strongly recommend using a secrets manager when deploying to production.

Some suggested systems include:

- [Doppler](https://www.doppler.com/)
- [Infisical](https://infisical.com/)
- [Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/general/overview) by Azure (Microsoft)
- [Secrets Manager](https://aws.amazon.com/secrets-manager/) by AWS
- [Secrets Manager](https://cloud.google.com/secret-manager) by GCP
- [Vault](https://www.hashicorp.com/products/vault) by HashiCorp

* * *

## Demo [\#](https://supabase.com/docs/guides/self-hosting/docker\#demo)

Self-hosting Supabase on Ubuntu with Digital Ocean - YouTube

[Photo image of Supabase](https://www.youtube.com/channel/UCNTVzV1InxHV-YR0fSajqPQ?embeds_referring_euri=https%3A%2F%2Fsupabase.com%2F)

Supabase

70.3K subscribers

[Self-hosting Supabase on Ubuntu with Digital Ocean](https://www.youtube.com/watch?v=FqiQKRKsfZE)

Supabase

Search

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

Watch later

Share

Copy link

[Why am I seeing this?](https://support.google.com/youtube/answer/9004474?hl=en)

Watch on

0:00

/

•Live

•

1. The VPS instance is a DigitalOcean droplet. (For server requirements refer to [System requirements](https://supabase.com/docs/guides/self-hosting/docker#system-requirements))
2. To access Studio, use the IPv4 IP address of your Droplet.
3. If you're unable to use Studio, run `docker compose ps` to see if all services are up and healthy.

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/self-hosting/docker.mdx)

Watch video guide

![Video guide preview](https://supabase.com/docs/_next/image?url=https%3A%2F%2Fimg.youtube.com%2Fvi%2FFqiQKRKsfZE%2F0.jpg&w=3840&q=75)

### Is this helpful?

NoYes

### On this page

[Contents](https://supabase.com/docs/guides/self-hosting/docker#contents) [Before you begin](https://supabase.com/docs/guides/self-hosting/docker#before-you-begin) [System requirements](https://supabase.com/docs/guides/self-hosting/docker#system-requirements) [Installing Supabase](https://supabase.com/docs/guides/self-hosting/docker#installing-supabase) [Configuring and securing Supabase](https://supabase.com/docs/guides/self-hosting/docker#configuring-and-securing-supabase) [Configure database password](https://supabase.com/docs/guides/self-hosting/docker#configure-database-password) [Generate and configure API keys](https://supabase.com/docs/guides/self-hosting/docker#generate-and-configure-api-keys) [Configure other keys, and important URLs](https://supabase.com/docs/guides/self-hosting/docker#configure-other-keys-and-important-urls) [Studio authentication](https://supabase.com/docs/guides/self-hosting/docker#studio-authentication) [Starting and stopping](https://supabase.com/docs/guides/self-hosting/docker#starting-and-stopping) [Accessing Supabase services](https://supabase.com/docs/guides/self-hosting/docker#accessing-supabase-services) [Accessing Supabase Studio](https://supabase.com/docs/guides/self-hosting/docker#accessing-supabase-studio) [Accessing Postgres](https://supabase.com/docs/guides/self-hosting/docker#accessing-postgres) [Accessing Edge Functions](https://supabase.com/docs/guides/self-hosting/docker#accessing-edge-functions) [Accessing the APIs](https://supabase.com/docs/guides/self-hosting/docker#accessing-the-apis) [Updating](https://supabase.com/docs/guides/self-hosting/docker#updating) [Uninstalling](https://supabase.com/docs/guides/self-hosting/docker#uninstalling) [Advanced topics](https://supabase.com/docs/guides/self-hosting/docker#advanced-topics) [Architecture](https://supabase.com/docs/guides/self-hosting/docker#architecture) [Configuring services](https://supabase.com/docs/guides/self-hosting/docker#configuring-services) [Common configuration tasks](https://supabase.com/docs/guides/self-hosting/docker#common-configuration-tasks) [Managing your secrets](https://supabase.com/docs/guides/self-hosting/docker#managing-your-secrets) [Demo](https://supabase.com/docs/guides/self-hosting/docker#demo)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)