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
import { useToast } from "@/hooks/use-toast";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { MermaidDiagram } from "./MermaidDiagram.tsx";
import type { ActiveTestCaseIndex, MermaidData } from "./index.tsx";

interface CustomTestProps {
  defaultValue?: string;
  value?: string;
  onChange: (
    definition: MermaidData["definition"],
    activeTestCaseIndex: ActiveTestCaseIndex
  ) => void;
  mermaidData: MermaidData;
  activeTestCaseIndex: ActiveTestCaseIndex;
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

const CustomTest = ({
  defaultValue,
  value,
  onChange,
  mermaidData,
  activeTestCaseIndex,
}: CustomTestProps) => {
  const { toast } = useToast();
  const isActive = activeTestCaseIndex === "custom";

  useEffect(() => {
    if (mermaidData.definition) {
      setTimeout(() => {
        onChange(mermaidData.definition, "custom");
      }, 1000);
    }
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "You can share this link with others",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="h-screen flex-shrink-0 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Mermaid Diagram
            {activeTestCaseIndex === "custom" && mermaidData.definition && (
              <Button
                onClick={handleShare}
                className="flex items-center gap-2 mr-10"
                variant="outline"
                size="sm"
              >
                <ShareIcon className="w-4 h-4" />
                Share
              </Button>
            )}
          </CardTitle>
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
              defaultValue={defaultValue}
              value={value}
              onChange={(e) => {
                // if (!isActive) return;
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
