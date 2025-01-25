import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Toaster } from "@/components/ui/toaster";
import { scan } from "react-scan"; // import this BEFORE react

if (typeof window !== "undefined") {
  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  });
}

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <NuqsAdapter>
        <App />
        <Toaster />
      </NuqsAdapter>
    </React.StrictMode>
  );
}
