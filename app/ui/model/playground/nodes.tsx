import type { Node, NodeTypes } from "reactflow";

export const initNodes = [
    {
        id: '1',
        type: 'custom',
        data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
        position: { x: 0, y: 50 },
    },
    {
        id: '2',
        type: 'custom',
        data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },

        position: { x: -200, y: 200 },
    },
    {
        id: '3',
        type: 'custom',
        data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
        position: { x: 200, y: 200 },
    },
];

export const nodeTypes = {
  // Add any of your custom nodes here!
} satisfies NodeTypes;
