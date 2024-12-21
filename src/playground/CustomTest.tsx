"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown } from "lucide-react";
import { MermaidDiagram } from "./MermaidDiagram.tsx";
import type { ActiveTestCaseIndex, MermaidData } from "./index.tsx";

interface CustomTestProps {
  onChange: (
    definition: MermaidData["definition"],
    activeTestCaseIndex: ActiveTestCaseIndex
  ) => void;
  mermaidData: MermaidData;
  activeTestCaseIndex: ActiveTestCaseIndex;
}

const CustomTest = ({
  onChange,
  mermaidData,
  activeTestCaseIndex,
}: CustomTestProps) => {
  const isActive = activeTestCaseIndex === "custom";

  return (
    <>
      <div className="h-screen flex-shrink-0 flex flex-col">
        <CardHeader>
          <CardTitle>Mermaid Diagram</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              onChange(
                formData.get("mermaid-input")?.toString() || "",
                "custom"
              );
            }}
            className="h-full space-y-4 flex flex-col"
          >
            <Textarea
              id="mermaid-input"
              name="mermaid-input"
              rows={10}
              placeholder="Input Mermaid Syntax"
              className="font-mono flex-1"
              onChange={(e) => {
                if (!isActive) return;
                onChange(e.target.value, "custom");
              }}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  const form = e.currentTarget.form;
                  if (form) form.requestSubmit();
                }
              }}
            />

            <RainbowButton
              type="submit"
              id="render-excalidraw-btn"
              className="w-full rounded-lg"
            >
              Render to Excalidraw
            </RainbowButton>
          </form>
        </CardContent>
      </div>
      {isActive && (
        <div className="mt-6 space-y-4">
          <MermaidDiagram
            definition={mermaidData.definition}
            id="custom-diagram"
          />

          <Collapsible>
            <CollapsibleTrigger asChild>
              <div className="px-4">
                <Button
                  variant="ghost"
                  className="justify-start"
                  id="parsed-data-details"
                >
                  <ChevronDown className="h-4 w-4 ml-2 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                  Parsed data from parseMermaid
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4">
              <pre
                id="custom-parsed-data"
                className="p-4 bg-secondary rounded-md overflow-auto"
              >
                {JSON.stringify(mermaidData.output, null, 2)}
              </pre>
              {mermaidData.error && (
                <div
                  id="error"
                  className="p-4 mt-2 text-destructive bg-destructive/10 rounded-md"
                >
                  {mermaidData.error}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </>
  );
};

export default CustomTest;
