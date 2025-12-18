---
url: "https://supabase.com/docs/guides/self-hosting/enable-mcp"
title: "Enabling MCP Server Access | Supabase Docs"
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
3. Configuration
5. [Enabling MCP server](https://supabase.com/docs/guides/self-hosting/enable-mcp)

# Enabling MCP Server Access

## Configure secure access to the MCP server in your self-hosted Supabase instance.

* * *

The MCP (Model Context Protocol) server in [self-hosted Supabase](https://supabase.com/docs/guides/self-hosting/docker) runs behind the internal API. Currently, it does not offer OAuth 2.1 authentication, and is not intended to be exposed to the Internet. The corresponding API route has to be protected by restricting network connections from the outside. By default, all connections to the MCP server are denied.

This guide explains how to securely enable access to your self-hosted MCP server.

## Security considerations [\#](https://supabase.com/docs/guides/self-hosting/enable-mcp\#security-considerations)

Do not allow connections to the self-hosted MCP server from the Internet. Only access it via:

- A VPN connection to the server running the Studio container
- An SSH tunnel from your local machine

## Accessing via SSH tunnel [\#](https://supabase.com/docs/guides/self-hosting/enable-mcp\#accessing-via-ssh-tunnel)

### Step 1: Determine the local IP address that will be used to access the MCP server [\#](https://supabase.com/docs/guides/self-hosting/enable-mcp\#step-1-determine-the-local-ip-address-that-will-be-used-to-access-the-mcp-server)

When connecting via an SSH tunnel to the Studio Docker container, the source IP will be that of the Docker bridge gateway. You need to allow connections from this IP address.

Determine the Docker bridge gateway IP on the host running your Supabase containers:

```
1
docker inspect supabase-kong \
2
  --format '{{range .NetworkSettings.Networks}}{{println .Gateway}}{{end}}'
```

This command will output an IP address, e.g., `172.18.0.1`.

### Step 2: Allow connections from the gateway IP [\#](https://supabase.com/docs/guides/self-hosting/enable-mcp\#step-2-allow-connections-from-the-gateway-ip)

Add the IP address you discovered to the Kong configuration by editing the following section in `./volumes/api/kong.yml`:

1. Comment out the request-termination section
2. Remove the # symbols from the entire section starting with `- name: cors`, including `deny: []`
3. Add your local IP to the 'allow' list.
4. Your edited configuration should look like the example below.

```
1
## MCP endpoint - local access
2
- name: mcp
3
  _comment: 'MCP: /mcp -> http://studio:3000/api/mcp (local access)'
4
  url: http://studio:3000/api/mcp
5
  routes:
6
    - name: mcp
7
      strip_path: true
8
      paths:
9
        - /mcp
10
  plugins:
11
    # Block access to /mcp by default
12
    #- name: request-termination
13
    #  config:
14
    #    status_code: 403
15
    #    message: "Access is forbidden."
16
    # Enable local access (danger zone!)
17
    # 1. Comment out the 'request-termination' section above
18
    # 2. Uncomment the entire section below, including 'deny'
19
    # 3. Add your local IPs to the 'allow' list
20
    - name: cors
21
    - name: ip-restriction
22
      config:
23
        allow:
24
          - 127.0.0.1
25
          - ::1
26
          # Add your Docker bridge gateway IP below
27
          - 172.18.0.1
28
        # Do not remove deny!
29
        deny: []
```

### Step 3: Restart API gateway [\#](https://supabase.com/docs/guides/self-hosting/enable-mcp\#step-3-restart-api-gateway)

After you've added the local IP address as above, restart the Kong container:

```
1
docker compose restart kong
```

### Step 4: Create the SSH tunnel [\#](https://supabase.com/docs/guides/self-hosting/enable-mcp\#step-4-create-the-ssh-tunnel)

From your local machine, create an SSH tunnel to your Supabase host:

```
1
ssh -L localhost:8080:localhost:8000 you@your-supabase-host
```

This command forwards local port `8080` to port `8000` on your Supabase host.

### Step 5: Configure your MCP client [\#](https://supabase.com/docs/guides/self-hosting/enable-mcp\#step-5-configure-your-mcp-client)

Edit the settings for your MCP client and add the following to `"mcpServers": {}` or `"servers": {}`:

```
1
{
2
  "mcpServers": {
3
    "supabase-self-hosted": {
4
      "url": "http://localhost:8080/mcp"
5
    }
6
  }
7
}
```

### Step 6: Start using the self-hosted MCP server [\#](https://supabase.com/docs/guides/self-hosting/enable-mcp\#step-6-start-using-the-self-hosted-mcp-server)

From your local machine, check that the MCP server is reachable:

```
1
curl http://localhost:8080/mcp \
2
  -X POST \
3
  -H "Content-Type: application/json" \
4
  -H "Accept: application/json, text/event-stream" \
5
  -H "MCP-Protocol-Version: 2025-06-18" \
6
  -d '{
7
    "jsonrpc": "2.0",
8
    "id": 1,
9
    "method": "initialize",
10
    "params": {
11
      "protocolVersion": "2025-06-18",
12
      "capabilities": {
13
        "elicitation": {}
14
      },
15
      "clientInfo": {
16
        "name": "test-client",
17
        "title": "Test Client",
18
        "version": "1.0.0"
19
      }
20
    }
21
  }'
```

Start your MCP client (Claude Code, Cursor, etc.) and verify access to the MCP tools. For example, you can ask: "What is Supabase anon key? Use the Supabase MCP server tools."

## Troubleshooting [\#](https://supabase.com/docs/guides/self-hosting/enable-mcp\#troubleshooting)

If you are unable to connect to the MCP server:

1. Update Kong configuration file to the [latest version](https://github.com/supabase/supabase/blob/master/docker/volumes/api/kong.yml) and edit carefully
2. Confirm the Docker bridge gateway IP is correctly added in `./volumes/api/kong.yml`
3. Check Kong's logs for errors: `docker compose logs kong`
4. Make sure your SSH tunnel is active

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/self-hosting/enable-mcp.mdx)

### Is this helpful?

NoYes

### On this page

[Security considerations](https://supabase.com/docs/guides/self-hosting/enable-mcp#security-considerations) [Accessing via SSH tunnel](https://supabase.com/docs/guides/self-hosting/enable-mcp#accessing-via-ssh-tunnel) [Step 1: Determine the local IP address that will be used to access the MCP server](https://supabase.com/docs/guides/self-hosting/enable-mcp#step-1-determine-the-local-ip-address-that-will-be-used-to-access-the-mcp-server) [Step 2: Allow connections from the gateway IP](https://supabase.com/docs/guides/self-hosting/enable-mcp#step-2-allow-connections-from-the-gateway-ip) [Step 3: Restart API gateway](https://supabase.com/docs/guides/self-hosting/enable-mcp#step-3-restart-api-gateway) [Step 4: Create the SSH tunnel](https://supabase.com/docs/guides/self-hosting/enable-mcp#step-4-create-the-ssh-tunnel) [Step 5: Configure your MCP client](https://supabase.com/docs/guides/self-hosting/enable-mcp#step-5-configure-your-mcp-client) [Step 6: Start using the self-hosted MCP server](https://supabase.com/docs/guides/self-hosting/enable-mcp#step-6-start-using-the-self-hosted-mcp-server) [Troubleshooting](https://supabase.com/docs/guides/self-hosting/enable-mcp#troubleshooting)

- Need some help?
[Contact support](https://supabase.com/support)
- Latest product updates?
[See Changelog](https://supabase.com/changelog)
- Something's not right?
[Check system status](https://status.supabase.com/)

* * *

[© Supabase Inc](https://supabase.com/)— [Contributing](https://github.com/supabase/supabase/blob/master/apps/docs/DEVELOPERS.md) [Author Styleguide](https://github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md) [Open Source](https://supabase.com/open-source) [SupaSquad](https://supabase.com/supasquad) Privacy Settings

[Twitter](https://twitter.com/supabase) [GitHub](https://github.com/supabase) [Discord](https://discord.supabase.com/) [Youtube](https://youtube.com/c/supabase)