"use client";

import { useState, useTransition, useEffect } from "react";
import mermaid from "mermaid";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface MermaidProps {
  id: string;
  definition: string;
}

export const MermaidDiagram = ({ definition, id }: MermaidProps) => {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const render = async (id: string, definition: string) => {
      try {
        setError(null);

        const { svg } = await mermaid.render(
          `mermaid-diagram-${id}`,
          definition
        );
        startTransition(() => {
          setSvg(svg);
        });
      } catch (err) {
        setError(String(err));
      }
    };

    render(id, definition);
  }, [definition, id]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer hover:opacity-80 transition-opacity">
            <div
              className="mermaid w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] w-fit max-h-[90vh] min-w-[800px] min-h-[600px]">
          <div
            className="mermaid w-full scale-100 origin-top-left flex justify-center items-center"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </DialogContent>
      </Dialog>
      {error && <div id="error">{error}</div>}
    </>
  );
};
