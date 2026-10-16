import type { ReactNode } from "react";

export const metadata = {
  title: "ChatGPT MCP App Starter | Sidebar, Panel & Inline Widget",
  description: "A minimal TypeScript and Next.js MCP Apps starter supporting ChatGPT sidebar, side panel, and inline widgets.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
