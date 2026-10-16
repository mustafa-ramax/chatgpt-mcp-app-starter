import { createMcpHandler } from "mcp-handler";
import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";

// Minimal, reusable MCP Apps Hello World example.
// No upstream APIs, authentication, storage, background jobs or maintainer-hosted dependency.
const UI_URI = "ui://starter/hello.html";

const HELLO_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ChatGPT MCP App Starter</title>
    <style>
      :root { color-scheme: light dark; font-family: system-ui, -apple-system, sans-serif; }
      body { margin: 0; padding: 22px; background: Canvas; color: CanvasText; }
      main { border: 1px solid color-mix(in srgb, CanvasText 15%, transparent); border-radius: 16px; padding: 24px; }
      .eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; opacity: .65; }
      h1 { font-size: 23px; margin: 16px 0 8px; }
      p { line-height: 1.5; margin: 0; }
      .dot { display: inline-block; width: 9px; height: 9px; background: #36a86e; border-radius: 50%; margin-right: 6px; }
      .foot { font-size: 12px; opacity: .7; margin-top: 18px; }
    </style>
  </head>
  <body>
    <main>
      <div class="eyebrow"><span class="dot"></span>ChatGPT MCP App Starter</div>
      <h1>Hello from your MCP App! 👋</h1>
      <p>This demo supports an <strong>inline widget</strong>, a conversation <strong>side panel</strong>, and a <strong>left-sidebar app</strong> in compatible ChatGPT hosts.</p>
      <p class="foot">Read-only Hello World · No API calls · No background polling</p>
    </main>
  </body>
</html>`;

const handler = createMcpHandler(
  (server) => {
    registerAppResource(server, "Starter Hello World UI", UI_URI, {}, async () => ({
      contents: [{ uri: UI_URI, mimeType: RESOURCE_MIME_TYPE, text: HELLO_HTML }],
    }));

    registerAppTool(
      server,
      "open_starter_hello",
      {
        title: "Open Starter Hello World",
        description: "Show a read-only Hello World MCP App in ChatGPT: inline, side panel or sidebar where supported. No external requests.",
        inputSchema: z.object({}),
        annotations: { readOnlyHint: true, openWorldHint: false },
        _meta: {
          ui: { resourceUri: UI_URI },
          "openai/ui": { entrypoints: [{ type: "thread" }, { type: "global" }] },
        },
      },
      async () => ({
        content: [{ type: "text", text: "Starter Hello World opened. No external data was fetched." }],
        structuredContent: { message: "Hello from your MCP App!", stage: "hello-world" },
      }),
    );
  },
  { serverInfo: { name: "chatgpt-mcp-app-starter", version: "0.1.0" } },
);

export { handler as GET, handler as POST };
