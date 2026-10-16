# Publish this folder as a discoverable GitHub template

This is setup guidance for the template maintainer. You may remove it from forks.

## Repository name

`chatgpt-mcp-app-starter`

## Suggested GitHub About description

`Open-source TypeScript + Next.js MCP Apps starter for ChatGPT sidebar apps, conversation side panels and inline widgets.`

## Suggested GitHub topics

`chatgpt`, `mcp`, `mcp-apps`, `model-context-protocol`, `chatgpt-plugin`, `typescript`, `nextjs`, `vercel`, `starter-template`, `openai`

## Publish

1. The public `chatgpt-mcp-app-starter` GitHub repository is already created and populated. Leave other project repositories unchanged.
2. Keep source files at the repository root (not a nested folder), excluding `node_modules`, `.next` and secrets.
3. Visit **Settings → General** and enable **Template repository**. This exposes **Use this template** to other developers.
4. Set the About description and topics shown above. Don't add irrelevant topics just for ranking.
5. Run the template yourself once (`npm install`, `npm run build`), verify GitHub's generated repo flow, and test a newly deployed fork if possible.
6. For a sustainable public release, maintain docs and dependency updates. Search visibility depends on usefulness, links, community engagement and GitHub's ranking; README keywords cannot guarantee search results.

If your source has local git history, start a new repository rather than pushing Reset Radar's history into the template. The file package contains no `.git` folder.