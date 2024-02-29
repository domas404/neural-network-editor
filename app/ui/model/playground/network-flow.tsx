import React, { useContext, useEffect } from "react";
import ReactFlow, { Background, useNodesState, useEdgesState, EdgeTypes } from 'reactflow';
import 'reactflow/dist/base.css';

import FloatingEdge from "@/app/ui/model/playground/floating-edge";
import CustomNode from '@/app/ui/model/playground/custom-node';
import CustomNodeGroup from '@/app/ui/model/playground/custom-node-group';
import { createNodesAndEdges } from "@/app/lib/flow-utils";
import { NetworkContext } from "@/app/ui/model/main";

import "./index.css";

const edgeTypes: EdgeTypes = {
    floating: FloatingEdge,
};

const nodeTypes = {
    customNode: CustomNode,
    customNodeGroup: CustomNodeGroup,
};

const Flow = () => {
    const networkContext = useContext(NetworkContext)!;
    const initialModel = networkContext.models[networkContext.network.modelId].layers;
    const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(initialModel);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        let chosenModel = networkContext.models[networkContext.network.modelId].layers;
        let { nodes: newNodes, edges: newEdges } = createNodesAndEdges(chosenModel);
        setNodes(newNodes);
        setEdges(newEdges);
    }, [networkContext]);

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
