import ReactFlow, {
    Background,
    useNodesState,
    useEdgesState,
    EdgeTypes
} from 'reactflow';
import 'reactflow/dist/base.css';

import FloatingEdge from "@/app/ui/model/playground/floating-edge";
import CustomNode from '@/app/ui/model/playground/custom-node';
import CustomNodeGroup from '@/app/ui/model/playground/custom-node-group';
import { createNodesAndEdges } from "@/app/lib/flow-utils";

import { createInitialModel } from "@/app/lib/create-initial-model";

import "./index.css";

const edgeTypes: EdgeTypes = {
    floating: FloatingEdge,
};

const nodeTypes = {
    customNode: CustomNode,
    customNodeGroup: CustomNodeGroup,
};

const Flow = () => {

    const initialStructure = createInitialModel({
        layerCount: 3,
        neuronCount: [4, 3, 3],
        layerTypes: ["input", "hidden", "output"]
    });
    const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(initialStructure);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            className="bg-white rounded-xl"
        >
            <Background gap={24} />
        </ReactFlow>
    );
};

export default Flow;
