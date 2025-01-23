import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Toaster } from "@/components/ui/toaster";

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
