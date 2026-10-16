# ChatGPT MCP App troubleshooting: sidebar missing, inline-only UI, and failed builds

This page addresses common issues with a custom **ChatGPT MCP plugin**, **MCP Apps widget** and **OpenAI UI entrypoints**.

## MCP connects but the widget does not render

1. Verify the actual URL ends in `/api/mcp` and is reachable by the ChatGPT host.
2. Check `tools/list` for `open_starter_hello`.
3. Check tool metadata for `ui: { resourceUri: "ui://starter/hello.html" }`.
4. Confirm the resource can be read and uses the required MCP Apps MIME type.
5. Invoke the tool in ChatGPT. An MCP tool returning text is not proof that the widget rendered.

## Why does the widget appear inside the conversation, not on the right?

A tool invoked by the assistant often renders inline. The separate conversation-side panel is exposed through the `thread` entrypoint on supporting hosts. In a conversation, look for a content tab or tools control on the right. It may require a manual launch action.

## Why does the ChatGPT left sidebar not show my app?

- Confirm the tool advertises `"openai/ui": { "entrypoints": [{ "type": "global" }] }` (or includes both `global` and `thread`).
- Ensure the latest deployment built successfully and the installed ChatGPT plugin refreshed its discovered tools/metadata.
- Some ChatGPT surfaces do not offer the same extension entrypoints. Test with a host known to support global/sidebar apps.
- Remove/re-add the personal custom plugin if the host has no refresh mechanism, but don't repeatedly reinstall without checking the above.

## 401, 403 or redirected login page

Your hosting provider may have deployment protection or a login wall. Test with an external MCP client and confirm that your intended read-only MCP endpoint is accessible. For production apps with private data, implement supported authentication instead of broadly disabling protection.

## Build error after changing UI metadata

Run `npm run build` and fix the first reported TypeScript error. Optional tool metadata (e.g. custom icon fields) may not match the versions of your MCP SDK/handler in use. Begin from the working two-entrypoint metadata and add extra fields only when validated against SDK types.

## Changes to app UI are not reflected

Confirm Vercel deployed the desired commit. Then refresh the custom MCP integration and relaunch the UI panel. The UI may be cached by the host and/or the server.

References: [OpenAI Plugin Extensions](https://developers.openai.com/plugins/build/extensions) and [MCP Apps](https://github.com/modelcontextprotocol/ext-apps).
