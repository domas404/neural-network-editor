import type { Edge, EdgeTypes } from "reactflow";

export const initEdges = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
    },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
