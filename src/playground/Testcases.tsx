import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Fragment } from "react";
import SingleTestCase, { TestCase } from "./SingleTestCase.tsx";
import type { ActiveTestCaseIndex, MermaidData } from "./index.tsx";
import { CLASS_DIAGRAM_TESTCASES } from "./testcases/class.ts";
import { FLOWCHART_DIAGRAM_TESTCASES } from "./testcases/flowchart";
import { SEQUENCE_DIAGRAM_TESTCASES } from "./testcases/sequence.ts";
import { UNSUPPORTED_DIAGRAM_TESTCASES } from "./testcases/unsupported.ts";

interface TestcasesProps {
  onChange: (
    definition: MermaidData["definition"],
    activeTestCaseIndex: number | "custom" | null
  ) => void;
  activeTestCaseIndex: ActiveTestCaseIndex;
}

const Testcases = ({ onChange }: TestcasesProps) => {
  const testcaseTypes: { name: string; testcases: TestCase[] }[] = [
    { name: "Flowchart", testcases: FLOWCHART_DIAGRAM_TESTCASES },
    { name: "Sequence", testcases: SEQUENCE_DIAGRAM_TESTCASES },
    { name: "Class", testcases: CLASS_DIAGRAM_TESTCASES },
    { name: "Unsupported", testcases: UNSUPPORTED_DIAGRAM_TESTCASES },
  ];

  const allTestCases = testcaseTypes.flatMap((type) => type.testcases);

  let testCaseIndex = 0;
  return (
    <>
      <Separator className="my-1" />

      <div className="p-4">
        <CardTitle className="mb-2">Mermaid Examples</CardTitle>

        <Accordion type="single" collapsible className="w-full">
          {testcaseTypes.map(({ name, testcases }) => {
            const baseId = name.toLowerCase();
            return (
              <AccordionItem key={baseId} value={baseId}>
                <AccordionTrigger className="text-lg font-semibold">
                  {name} Diagrams
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    id={`${baseId}-container`}
                    className="testcase-container space-y-4"
                  >
                    {testcases.map((testcase, index) => {
                      return (
                        <SingleTestCase
                          key={`${testcase.type}-${index}`}
                          index={testCaseIndex++}
                          onChange={(index) => {
                            const { definition } = allTestCases[index];
                            onChange(definition, index);
                          }}
                          testcase={testcase}
                        />
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};

export default Testcases;
