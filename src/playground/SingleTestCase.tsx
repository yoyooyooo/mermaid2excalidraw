import { MermaidDiagram } from "./MermaidDiagram";
import ShinyButton from "@/components/ui/shiny-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TestCase {
  type: "class" | "flowchart" | "sequence" | "unsupported";
  name: string;
  definition: string;
}

export interface SingleTestCaseProps {
  testcase: TestCase;
  onChange: (activeTestcaseIndex: number) => void;
  index: number;
  activeTestcaseIndex?: number;
}

const SingleTestCase = ({ testcase, onChange, index }: SingleTestCaseProps) => {
  const { name, definition, type } = testcase;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pink-500">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col">
        <pre className="p-4 bg-muted rounded-lg">{definition}</pre>
        <ShinyButton
          onClick={() => {
            onChange(index);
          }}
        >
          Render to Excalidraw
        </ShinyButton>
      </CardContent>
    </Card>
  );
};

export default SingleTestCase;
