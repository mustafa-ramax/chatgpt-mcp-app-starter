export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 640, margin: "10vh auto", padding: 24 }}>
      <h1>ChatGPT MCP App Starter</h1>
      <p>A minimal Hello World plugin for a ChatGPT sidebar app, conversation panel, and inline widget.</p>
      <p>The read-only MCP endpoint is at <code>/api/mcp</code>.</p>
      <p>Once connected as a personal ChatGPT plugin, ask: <strong>Open Starter Hello World.</strong></p>
      <p>No reset data, personal information, or background polling is used here.</p>
    </main>
  );
}
