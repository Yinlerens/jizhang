---
url: "https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication"
title: "Model Context Protocol (MCP) Authentication | Supabase Docs"
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

Main menu

[Auth](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication)

[Overview](https://supabase.com/docs/guides/auth)

[Architecture](https://supabase.com/docs/guides/auth/architecture)

Getting Started[Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
[React](https://supabase.com/docs/guides/auth/quickstarts/react)
[React Native](https://supabase.com/docs/guides/auth/quickstarts/react-native)
[React Native with Expo & Social Auth](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth)

Concepts[Users](https://supabase.com/docs/guides/auth/users)
[Identities](https://supabase.com/docs/guides/auth/identities)

Sessions

Flows (How-tos)

Server-Side Rendering

[Password-based](https://supabase.com/docs/guides/auth/passwords)
[Email (Magic Link or OTP)](https://supabase.com/docs/guides/auth/auth-email-passwordless)
[Phone Login](https://supabase.com/docs/guides/auth/phone-login)

Social Login (OAuth)

Enterprise SSO

[Anonymous Sign-Ins](https://supabase.com/docs/guides/auth/auth-anonymous)
[Web3 (Ethereum or Solana)](https://supabase.com/docs/guides/auth/auth-web3)
[Mobile Deep Linking](https://supabase.com/docs/guides/auth/native-mobile-deep-linking)
[Identity Linking](https://supabase.com/docs/guides/auth/auth-identity-linking)

Multi-Factor Authentication

[Signout](https://supabase.com/docs/guides/auth/signout)

Debugging[Error Codes](https://supabase.com/docs/guides/auth/debugging/error-codes)
[Troubleshooting](https://supabase.com/docs/guides/auth/troubleshooting)

OAuth 2.1 Server[Overview](https://supabase.com/docs/guides/auth/oauth-server)
[Getting Started](https://supabase.com/docs/guides/auth/oauth-server/getting-started)
[OAuth Flows](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows)
[MCP Authentication](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication)
[Token Security & RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security)

Third-party auth[Overview](https://supabase.com/docs/guides/auth/third-party/overview)
[Clerk](https://supabase.com/docs/guides/auth/third-party/clerk)
[Firebase Auth](https://supabase.com/docs/guides/auth/third-party/firebase-auth)
[Auth0](https://supabase.com/docs/guides/auth/third-party/auth0)
[AWS Cognito (Amplify)](https://supabase.com/docs/guides/auth/third-party/aws-cognito)
[WorkOS](https://supabase.com/docs/guides/auth/third-party/workos)

Configuration[General Configuration](https://supabase.com/docs/guides/auth/general-configuration)
[Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
[Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)

Auth Hooks

[Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp)
[User Management](https://supabase.com/docs/guides/auth/managing-user-data)

Security[Password Security](https://supabase.com/docs/guides/auth/password-security)
[Rate Limits](https://supabase.com/docs/guides/auth/rate-limits)
[Bot Detection (CAPTCHA)](https://supabase.com/docs/guides/auth/auth-captcha)
[Audit Logs](https://supabase.com/docs/guides/auth/audit-logs)

JSON Web Tokens (JWT)

[JWT Signing Keys](https://supabase.com/docs/guides/auth/signing-keys)
[Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
[Column Level Security](https://supabase.com/docs/guides/database/postgres/column-level-security)
[Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)

Auth UI[Auth UI (Deprecated)](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
[Flutter Auth UI](https://supabase.com/docs/guides/auth/auth-helpers/flutter-auth-ui)

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

Auth

1. Auth
3. OAuth 2.1 Server
5. [MCP Authentication](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication)

# Model Context Protocol (MCP) Authentication

* * *

The Model Context Protocol (MCP) is an open standard for connecting AI agents and LLM tools to data sources and services. While Supabase doesn't provide MCP server functionality, you can build your own MCP servers that connect to your Supabase project and leverage Supabase Auth's OAuth 2.1 capabilities to authenticate AI agents using your existing user base.

## Why use Supabase Auth for MCP? [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#why-use-supabase-auth-for-mcp)

When building MCP servers that connect to your Supabase project, you can leverage your existing Supabase Auth infrastructure to authenticate AI agents:

- **Use your existing user base** \- No need to create separate authentication systems; AI agents authenticate as your existing users
- **Standards-compliant OAuth 2.1** \- Full implementation with PKCE that MCP clients expect
- **Automatic discovery** \- MCP clients auto-configure using Supabase's discovery endpoints
- **Dynamic client registration** \- MCP clients can register themselves automatically with your project
- **Row Level Security** \- Your existing RLS policies automatically apply to MCP clients
- **User authorization** \- Users explicitly approve AI agent access through your authorization flow
- **Token management** \- Automatic refresh token rotation and expiration handled by Supabase

## How MCP authentication works [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#how-mcp-authentication-works)

When you build an MCP server that connects to your Supabase project, authentication flows through Supabase Auth:

1. **Discovery**: The MCP client fetches your OAuth configuration from Supabase's discovery endpoint
2. **Registration** (optional): The client registers itself as an OAuth client in your Supabase project
3. **Authorization**: User is redirected to your authorization endpoint to approve the AI tool's access
4. **Token exchange**: Supabase issues access and refresh tokens for the authenticated user
5. **Authenticated access**: The MCP server can now make requests to your Supabase APIs on behalf of the user

By leveraging Supabase Auth, your MCP server can authenticate AI agents using your existing user accounts without building a separate authentication system.

## Prerequisites [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#prerequisites)

Before setting up MCP authentication:

- [Enable OAuth 2.1 server](https://supabase.com/docs/guides/auth/oauth-server/getting-started) in your Supabase project
- Build an [authorization endpoint](https://supabase.com/docs/guides/auth/oauth-server/getting-started#build-your-authorization-endpoint)
- (Optional) Enable dynamic client registration

## Setting up your MCP server [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#setting-up-your-mcp-server)

Configure your MCP server to use your Supabase Auth server:

```
1
https://<project-ref>.supabase.co/auth/v1
```

Replace `<project-ref>` with your project reference ID from the Supabase dashboard.

MCP clients will automatically discover your OAuth configuration from:

```
1
https://<project-ref>.supabase.co/.well-known/oauth-authorization-server/auth/v1
```

### OAuth client setup [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#oauth-client-setup)

Depending on your MCP server implementation, you have two options:

- **Pre-register an OAuth client** \- Manually register your client by following the [Register an OAuth client](https://supabase.com/docs/guides/auth/oauth-server/getting-started#register-an-oauth-client) guide and use the client credentials in your MCP server
- **Dynamic client registration** \- Enable this in **Authentication** \> **OAuth Server** in your Supabase dashboard to allow MCP clients to register themselves automatically without manual intervention

Dynamic registration allows any MCP client to register with your project. Consider:

- Requiring user approval for all clients
- Monitoring registered clients regularly
- Validating redirect URIs are from trusted domains

## Building an MCP server with Supabase Auth [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#building-an-mcp-server-with-supabase-auth)

When building your own MCP server, integrate with Supabase Auth to authenticate AI agents as your existing users and leverage your RLS policies.

**Looking for an easier way to build MCP servers?**

[FastMCP](https://gofastmcp.com/) provides a streamlined way to build MCP servers with built-in Supabase Auth integration. FastMCP handles OAuth configuration, token management, and authentication flows automatically, letting you focus on building your AI agent's functionality. Check out their [Supabase integration guide](https://gofastmcp.com/integrations/supabase) to get started quickly.

## Handling MCP tokens in your application [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#handling-mcp-tokens-in-your-application)

When your MCP server makes requests to your Supabase APIs on behalf of authenticated users, it will send access tokens issued by Supabase Auth, just like any other OAuth client.

### Validating MCP tokens [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#validating-mcp-tokens)

Use the same token validation as other OAuth clients.

See [Token Security & RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security) for more examples.

## Security considerations [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#security-considerations)

### User approval [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#user-approval)

Always require explicit user approval for MCP clients:

- Show clear information about what the AI agent can access
- Display the client name and description
- List the scopes being requested
- Provide an option to deny access
- Allow users to revoke access later

## Troubleshooting [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#troubleshooting)

### MCP client can't discover OAuth configuration [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#mcp-client-cant-discover-oauth-configuration)

**Problem**: Client shows "OAuth discovery failed" or similar error.

**Solutions**:

- Verify OAuth 2.1 is enabled in your project
- Check that `/.well-known/oauth-authorization-server` returns valid JSON
- Ensure your project URL is accessible

### Dynamic registration fails [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#dynamic-registration-fails)

**Problem**: Client receives 403 or 404 on registration endpoint.

**Solutions**:

- Enable dynamic client registration in project settings
- Verify redirect URIs are valid, complete URLs (protocol, domain, path, and port)
- Check for rate limiting on registration endpoint

### Token exchange fails [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#token-exchange-fails)

**Problem**: Client receives "invalid\_grant" error.

**Solutions**:

- Verify authorization code hasn't expired (10 minutes)
- Ensure code verifier matches code challenge
- Check that redirect URI exactly matches registration
- Confirm client\_id is correct

### RLS policies block MCP access [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#rls-policies-block-mcp-access)

**Problem**: MCP client can't access data despite valid token.

**Solutions**:

- Check RLS policies include the MCP client's `client_id`
- Verify user has necessary permissions
- Test with service role key to isolate RLS issues
- Review [Token Security guide](https://supabase.com/docs/guides/auth/oauth-server/token-security)

## Next steps [\#](https://supabase.com/docs/guides/auth/oauth-server/mcp-authentication\#next-steps)

- [Secure with RLS](https://supabase.com/docs/guides/auth/oauth-server/token-security) \- Create granular policies for MCP clients
- [OAuth flows](https://supabase.com/docs/guides/auth/oauth-server/oauth-flows) \- Deep dive into OAuth implementation
- [MCP Specification](https://modelcontextprotocol.io/docs) \- Official MCP documentation

[Edit this page on GitHub](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/oauth-server/mcp-authentication.mdx)

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