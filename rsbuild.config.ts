import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

export default defineConfig({
  html: {
    title: "Mermaid to Excalidraw",
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
});
