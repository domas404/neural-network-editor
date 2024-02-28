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

import React, { useContext, useEffect } from "react";
import { NetworkContext } from "@/app/ui/model/main";

const edgeTypes: EdgeTypes = {
    floating: FloatingEdge,
};

const nodeTypes = {
    customNode: CustomNode,
    customNodeGroup: CustomNodeGroup,
};

const Flow = () => {

    const { network, models } = useContext(NetworkContext);

    const initialModel = models[network.modelId].layers;

    const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(initialModel);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        let chosenModel = models[network.modelId].layers;
        let { nodes: newNodes, edges: newEdges } = createNodesAndEdges(chosenModel);
        setNodes(newNodes);
        setEdges(newEdges);
    }, [network])

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
