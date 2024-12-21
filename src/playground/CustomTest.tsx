"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
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
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Custom Mermaid Diagram</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            onChange(formData.get("mermaid-input")?.toString() || "", "custom");
          }}
          className="space-y-4"
        >
          <Textarea
            id="mermaid-input"
            name="mermaid-input"
            rows={10}
            placeholder="Input Mermaid Syntax"
            className="font-mono"
            onChange={(e) => {
              if (!isActive) return;
              onChange(e.target.value, "custom");
            }}
          />

          <Button type="submit" id="render-excalidraw-btn">
            Render to Excalidraw
          </Button>
        </form>

        {isActive && (
          <div className="mt-6 space-y-4">
            <MermaidDiagram
              definition={mermaidData.definition}
              id="custom-diagram"
            />

            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  id="parsed-data-details"
                >
                  Parsed data from parseMermaid
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
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
      </CardContent>
    </Card>
  );
};

export default CustomTest;
