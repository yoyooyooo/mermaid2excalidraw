"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ScrollProgress from "@/components/ui/scroll-progress";
import { useToast } from "@/hooks/use-toast";
import { compressCode, decompressCode } from "@/lib/compress";
import { useQueryState } from "nuqs";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { parseMermaid } from "../core/parseMermaid";
import CustomTest from "./CustomTest";
import ExcalidrawWrapper from "./ExcalidrawWrapper";
import GitHubCorner from "./GitHubCorner";
import Testcases from "./Testcases";

export interface MermaidData {
  definition: string;
  output: Awaited<ReturnType<typeof parseMermaid>> | null;
  error: string | null;
}

export type ActiveTestCaseIndex = number | "custom" | null;

const App = () => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useQueryState("code");
  const [mermaidData, setMermaidData] = useState<MermaidData>({
    definition: code ? decompressCode(code) || "" : "",
    error: null,
    output: null,
  });

  const [activeTestCaseIndex, setActiveTestCaseIndex] =
    useState<ActiveTestCaseIndex>(code ? "custom" : null);
  const deferredMermaidData = useDeferredValue(mermaidData);

  // Update useEffect to handle initial parsing
  useEffect(() => {
    const initializeFromUrl = async () => {
      if (!code) return;

      const decompressed = decompressCode(code);
      console.log(decompressed, "decompressed");
      if (!decompressed) return;

      try {
        const mermaid = await parseMermaid(decompressed);
        console.log(mermaid, "mermaid");
        setMermaidData({
          definition: decompressed,
          output: mermaid,
          error: null,
        });
      } catch (error) {
        setMermaidData({
          definition: decompressed,
          output: null,
          error: String(error),
        });
      }
    };

    initializeFromUrl();
  }, [code]);

  const handleOnChange = useCallback(
    async (
      definition: MermaidData["definition"],
      activeTestCaseIndex: ActiveTestCaseIndex
    ) => {
      try {
        setActiveTestCaseIndex(activeTestCaseIndex);
        const mermaid = await parseMermaid(definition);
        console.log(mermaid, 123);
        setMermaidData({
          definition,
          output: mermaid,
          error: null,
        });

        // Update URL for any valid definition, not just custom test cases
        const compressed = definition ? compressCode(definition) : null;
        setCode(compressed);
      } catch (error) {
        console.error(error);
        setMermaidData({
          definition,
          output: null,
          error: String(error),
        });
      }
    },
    [setCode]
  );

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen rounded-lg border"
      >
        <ResizablePanel defaultSize={40} minSize={10}>
          <div
            ref={containerRef}
            className="flex h-full flex-col gap-4 overflow-y-auto relative"
          >
            <ScrollProgress containerRef={containerRef} />
            <GitHubCorner />
            <CustomTest
              activeTestCaseIndex={activeTestCaseIndex}
              mermaidData={deferredMermaidData}
              onChange={handleOnChange}
              value={mermaidData.definition}
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
