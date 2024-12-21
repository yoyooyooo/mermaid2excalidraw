import { ExcalidrawConfig } from "./index";
import { FlowchartToExcalidrawSkeletonConverter } from "./converter/types/flowchart";
import { GraphImageConverter } from "./converter/types/graphImage";
import { GraphImage, MermaidToExcalidrawResult } from "./interfaces";
import { SequenceToExcalidrawSkeletonConvertor } from "./converter/types/sequence";
import { Sequence } from "./parser/sequence";
import { Flowchart } from "./parser/flowchart";
import { Class } from "./parser/class";
import { classToExcalidrawSkeletonConvertor } from "./converter/types/class";

export const graphToExcalidraw = (
  graph: Flowchart | GraphImage | Sequence | Class,
  options: ExcalidrawConfig = {}
): MermaidToExcalidrawResult => {
  switch (graph.type) {
    case "graphImage": {
      return GraphImageConverter.convert(graph, options);
    }

    case "flowchart": {
      return FlowchartToExcalidrawSkeletonConverter.convert(graph, options);
    }

    case "sequence": {
      return SequenceToExcalidrawSkeletonConvertor.convert(graph, options);
    }

    case "class": {
      return classToExcalidrawSkeletonConvertor.convert(graph, options);
    }

    default: {
      throw new Error(
        `graphToExcalidraw: unknown graph type "${
          (graph as any).type
        }, only flowcharts are supported!"`
      );
    }
  }
};
