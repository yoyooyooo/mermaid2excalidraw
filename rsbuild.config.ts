import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import ReactComponentName from "react-scan/react-component-name/rspack";

export default defineConfig({
  html: {
    title: "Mermaid to Excalidraw",
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
  tools: {
    rspack: {
      plugins: [ReactComponentName({})],
    },
  },
});
