# How ChatGPT MCP Apps work: tools, widgets, side panels and sidebar plugins

This guide explains the three related experiences implemented in the starter, for developers searching for a working **ChatGPT MCP app example**, **MCP Apps UI resource**, **conversation side panel**, or **ChatGPT sidebar plugin**.

## 1. One read-only MCP tool

The MCP server is mounted at `app/api/mcp/route.ts` using `mcp-handler`. The tool is `open_starter_hello` and takes an empty object. Its response includes text and a small `structuredContent` payload.

## 2. A linked MCP Apps HTML resource

The tool's `_meta.ui.resourceUri` points to `ui://starter/hello.html`, served via `registerAppResource` with MIME type `text/html;profile=mcp-app` (`RESOURCE_MIME_TYPE`). This is the UI displayed by supporting MCP Apps hosts.

## 3. OpenAI Plugin Extensions entrypoints

The tool's `_meta["openai/ui"]` declares two additional entrypoints:

```ts
"openai/ui": {
  entrypoints: [{ type: "thread" }, { type: "global" }],
}
```

- `thread` requests a content tab / side panel next to a ChatGPT conversation.
- `global` requests an app accessible from the ChatGPT primary/left sidebar, which opens a dedicated full-page experience.
- A normal tool invocation may render the same UI **inline** in chat, which is not the same as opening a `thread` panel.

Not every ChatGPT surface or account necessarily supports every entrypoint. Desktop, ChatGPT Work, and classic web can differ. Always test on your target host.

## 4. Deployment and registration

MCP clients connect to the HTTPS `/api/mcp` endpoint. The localhost URL works for local SDK/Inspector testing; ChatGPT generally needs a publicly reachable HTTPS endpoint or a suitable development tunnel. The tool's `ui://` URI is an internal MCP resource identifier, not a public website URL.

There is **no hardcoded production MCP origin** in source. The operator configures their own URL when registering the custom plugin.

## 5. Design boundaries

The sample has no user data, authentication, telemetry, external API calls, timers or background polling. A production app needs input validation, sensible error states, limits, careful handling of untrusted tool data and hosting/security review.

Reference: [OpenAI Plugin Extensions](https://developers.openai.com/plugins/build/extensions).
