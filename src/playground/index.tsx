"use client";

import { useState, useCallback, useDeferredValue } from "react";
import CustomTest from "./CustomTest.tsx";
import ExcalidrawWrapper from "./ExcalidrawWrapper.tsx";
import Testcases from "./Testcases.tsx";
import { parseMermaid } from "../core/parseMermaid.ts";
import GitHubCorner from "./GitHubCorner.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export interface MermaidData {
  definition: string;
  output: Awaited<ReturnType<typeof parseMermaid>> | null;
  error: string | null;
}

export type ActiveTestCaseIndex = number | "custom" | null;

const App = () => {
  const [mermaidData, setMermaidData] = useState<MermaidData>({
    definition: "",
    error: null,
    output: null,
  });

  const [activeTestCaseIndex, setActiveTestCaseIndex] =
    useState<ActiveTestCaseIndex>(null);
  const deferredMermaidData = useDeferredValue(mermaidData);

  const handleOnChange = useCallback(
    async (
      definition: MermaidData["definition"],
      activeTestCaseIndex: ActiveTestCaseIndex
    ) => {
      try {
        setActiveTestCaseIndex(activeTestCaseIndex);

        const mermaid = await parseMermaid(definition);

        setMermaidData({
          definition,
          output: mermaid,
          error: null,
        });
      } catch (error) {
        setMermaidData({
          definition,
          output: null,
          error: String(error),
        });
      }
    },
    []
  );

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen rounded-lg border"
      >
        <ResizablePanel defaultSize={40} minSize={10}>
          <div className="flex h-full flex-col gap-4 p-6 overflow-y-auto">
            <CustomTest
              activeTestCaseIndex={activeTestCaseIndex}
              mermaidData={deferredMermaidData}
              onChange={handleOnChange}
            />
            <Testcases
              activeTestCaseIndex={activeTestCaseIndex}
              onChange={handleOnChange}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60} minSize={40}>
          <ExcalidrawWrapper
            mermaidDefinition={deferredMermaidData.definition}
            mermaidOutput={deferredMermaidData.output}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default App;
