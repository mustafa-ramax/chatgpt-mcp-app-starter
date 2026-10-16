# Deploy a ChatGPT MCP App to Vercel or another HTTPS host

This starter demonstrates a Next.js **Streamable HTTP MCP server** with **MCP Apps UI resources**. You can test the server locally, but ChatGPT custom MCP installation requires a compatible publicly reachable endpoint.

## Local development

```bash
npm install
npm run dev
npm run build
```

Local tool endpoint: `http://localhost:3000/api/mcp`.

Use an MCP Inspector or compatible MCP SDK client for `initialize`, `tools/list` and `tools/call`. A normal browser GET request may return 405 for a stateless MCP endpoint; this is not automatically an error.

## Vercel deployment

1. Create a **new independent repository** from this starter's GitHub template.
2. Import that new repository into Vercel. This starter was designed around the Next.js preset.
3. Let the project build and check that deployment state is `READY`.
4. Check deployment protection: ChatGPT must be able to access `https://YOUR-DEPLOYMENT-HOST/api/mcp` from outside your Vercel account. Don't accidentally expose protected data when making a production server public.
5. Register your URL in ChatGPT's supported custom MCP/plugin interface.
6. Verify tool invocation, inline widget rendering, the `thread` panel and the `global` sidebar separately.

## Other hosts

`mcp-handler` is compatible with Fetch-style HTTP frameworks. You may adapt the hosting wrapper to another Node or serverless platform. Preserve the MCP tool definitions and resource metadata.

## Privacy and costs

There are no external API calls in the demo. The hosted endpoint can still consume hosting resources when clients connect. On public release, apply request limits and caching for any upstream integrations. Check your hosting provider's quotas, costs and acceptable-use rules. Deploy the template on your own account; do not reuse another developer's production URL.

Reference: [Vercel's MCP Handler](https://github.com/vercel-labs/mcp-handler).
