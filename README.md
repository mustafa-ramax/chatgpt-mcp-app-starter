# ChatGPT MCP App Starter

[![Build and typecheck](https://github.com/mustafa-ramax/chatgpt-mcp-app-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/mustafa-ramax/chatgpt-mcp-app-starter/actions/workflows/ci.yml) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**A minimal TypeScript + Next.js starter template for building ChatGPT MCP Apps, sidebar plugins, conversation side panels and inline widgets.**

Build a custom ChatGPT plugin using the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), [MCP Apps](https://modelcontextprotocol.io/docs/extensions/apps), and [OpenAI Plugin Extensions](https://developers.openai.com/plugins/build/extensions). Start with one working Hello World tool and UI resource, then replace them with your own app.

> **This is a community starter template, not an official OpenAI product.** The example is intentionally tiny and read-only. ChatGPT surfaces and installation controls depend on the host and account. No platform-wide compatibility or approval is guaranteed.

## What this ChatGPT MCP starter supports

| Surface | What users can do | How it works |
| --- | --- | --- |
| **Inline widget** | Invoke the tool from a conversation and see its HTML UI in chat | MCP Apps UI resource associated with the tool |
| **Conversation side panel** | Open the widget beside an active conversation, where supported | OpenAI `thread` entrypoint |
| **Left-sidebar app** | Launch a dedicated fullscreen UI, where supported | OpenAI `global` entrypoint |

One read-only tool, one HTML resource, one `/api/mcp` endpoint. No database, account login, paid API, scraper, background job or framework-specific UI bundle required for this demo.

## Tech stack

- **TypeScript** and **Next.js App Router** for the HTTP MCP endpoint.
- **`mcp-handler`** for Streamable HTTP hosting.
- **`@modelcontextprotocol/ext-apps`** to register the MCP App tool and UI resource.
- **Zod** for tool input validation.
- **Vercel-compatible deployment**, but no Vercel-only code: adapt the HTTP handler to another compatible host.

## Quick start: use this GitHub template

1. Select **Use this template → Create a new repository** on GitHub (once this repo has the Template setting enabled).
2. Clone your new repository and install Node.js 20+.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. The web information page is at `http://localhost:3000`; the MCP Streamable HTTP endpoint is **`http://localhost:3000/api/mcp`**.
5. Optional: use [MCP Inspector](https://github.com/modelcontextprotocol/inspector) against the Streamable HTTP URL to check `tools/list`, `tools/call` and the advertised UI metadata.

### Deploy to Vercel

1. Import **your own new repository** into [Vercel](https://vercel.com/new), or deploy to another supported hosting provider.
2. Deploy using the detected Next.js configuration.
3. Use your deployment's MCP URL: **`https://YOUR-DEPLOYMENT-HOST/api/mcp`**.
4. Make sure ChatGPT can access the endpoint. Vercel Deployment Protection or an authentication redirect can prevent MCP clients from connecting.
5. Keep free-tier limits, permitted usage and upstream API restrictions in mind before sharing a public MCP endpoint.

**Never use someone else's demo deployment as your app backend.** Each template user should supply their own hosted endpoint. This repository contains no hardcoded maintainer MCP URL.

### Connect your custom MCP app to ChatGPT

1. In a ChatGPT account with custom MCP plugin support, open the plugin configuration / custom MCP connection workflow. See the current [OpenAI app quickstart](https://developers.openai.com/plugins/build/app-quickstart) for the applicable controls.
2. Add the complete, publicly accessible HTTPS endpoint, ending in **`/api/mcp`**.
3. Install the plugin for personal testing. Public Plugin Directory submission is a separate process, not required just to self-test where custom plugins are enabled.
4. Invoke **Open Starter Hello World** in a conversation. The read-only tool should return **“Hello from your MCP App!”** and display the example UI inline.
5. For the **conversation panel**, use the host's conversation-side tools/content tab to open the `thread` entrypoint.
6. For the **left sidebar**, check a host that supports the `global` entrypoint. Different ChatGPT clients may expose different UI surfaces; reinstall or refresh plugin metadata if changed.

**Success criteria:** A working MCP response does not by itself prove that an inline widget, side panel, or global/sidebar app has rendered. Verify each surface visually in the specific ChatGPT client.

## Customize your first ChatGPT plugin

In [`app/api/mcp/route.ts`](app/api/mcp/route.ts):

1. Rename `open_starter_hello` and its title/description to match your product.
2. Replace the HTML in `HELLO_HTML`, or move to a separately bundled HTML/React UI resource as your app grows.
3. Rename `UI_URI` to a URI unique to your app. Keep the same URI in `registerAppResource` and `ui.resourceUri`.
4. Keep or remove the relevant `"openai/ui"` entrypoints: `thread` for conversation panels, `global` for sidebar apps.
5. Replace the static tool response with a validated read-only API call or your actual workflow. Only add credentials, user accounts, and permission-sensitive tools when required.

The MCP endpoint URL belongs in **your deployment and your plugin registration**, not as a maintainer-specific default in reusable source code.

## Project structure

```text
app/
  api/mcp/route.ts      # MCP server, Hello World tool, and HTML UI resource
  layout.tsx            # Generic page metadata
  page.tsx              # Minimal deployment landing page
docs/
  HOW_IT_WORKS.md       # MCP Apps, sidebar, conversation panel architecture
  DEPLOYMENT.md         # Hosting and custom plugin setup notes
  TROUBLESHOOTING.md    # Debugging connection and UI visibility
CONTRIBUTING.md
LICENSE
.github/workflows/ci.yml # GitHub Actions build and TypeScript checks
README.md
package.json
tsconfig.json
```

## Troubleshooting common MCP App issues

- **The MCP endpoint responds, but no UI appears:** Verify that `tools/list` includes `ui.resourceUri`, that the UI resource can be read, and that you're invoking a tool that links to it. See [troubleshooting](docs/TROUBLESHOOTING.md).
- **The widget appears inline, but not as a side panel:** A model-invoked tool may render inline. Look for the host's conversation-side panel action. Check whether the host supports the `thread` extension.
- **No left-sidebar entry appears:** Confirm `"openai/ui".entrypoints` includes `global`, refresh the plugin after deployment, and test on a supported ChatGPT client.
- **Plugin connection returns 401/403:** Check deployment protection, auth redirects and whether your endpoint is publicly reachable.
- **Build fails:** Run `npm run build` and inspect the first TypeScript/build error. Start from the minimal working metadata rather than adding optional icon or presentation fields.

More detail: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md).

## Frequently asked questions

### What is an MCP App for ChatGPT?

An MCP App is an MCP server that exposes tools and can attach an interactive UI resource. In supporting ChatGPT clients, that UI can render alongside tool results or through additional extension entrypoints.

### Can I build a ChatGPT sidebar plugin using TypeScript or Next.js?

Yes. This starter registers an MCP App tool with a `global` sidebar entrypoint using TypeScript and Next.js. The UI must also be supported and enabled in the ChatGPT client where you test.

### What's the difference between an MCP tool, inline widget and ChatGPT conversation panel?

An **MCP tool** performs an action or returns data. An **inline widget** displays a linked UI within a conversation. A **conversation panel** is a separate `thread` entrypoint beside the conversation. They are related, but independently verifiable surfaces.

### Do I need OpenAI approval or a paid API key to test?

You do not need OpenAI Plugin Directory approval for personal development with a supported custom MCP plugin workflow. A hosted endpoint and compatible ChatGPT account are still required. This Hello World example uses no OpenAI API key.

### Do people who use this GitHub template connect to my MCP server?

No, unless they deliberately register your endpoint. A new repository from this template contains only reusable code. Each developer should deploy their own MCP URL, preventing accidental traffic to the template maintainer's hosting account.

### Can I deploy somewhere other than Vercel?

Yes. Vercel is convenient for the Next.js example, but the important requirement is hosting a compatible public HTTPS Streamable HTTP MCP endpoint. Other hosting targets may require adapting your app server or routing.

## Documentation and references

- [OpenAI Plugin Extensions: sidebar and conversation panels](https://developers.openai.com/plugins/build/extensions)
- [OpenAI MCP App quickstart](https://developers.openai.com/plugins/build/app-quickstart)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP Apps examples and conventions](https://github.com/modelcontextprotocol/ext-apps)
- [Vercel MCP Handler](https://github.com/vercel-labs/mcp-handler)
- [GitHub: Create a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

## Contributing and license

Suggestions and bug fixes are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md). Licensed under the [MIT License](LICENSE).