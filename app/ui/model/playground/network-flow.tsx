import React, { useContext, useEffect } from "react";
import ReactFlow, { Background, useNodesState, useEdgesState, EdgeTypes } from 'reactflow';
import 'reactflow/dist/base.css';

import FloatingEdge from "@/app/ui/model/playground/floating-edge";
import CustomNode from '@/app/ui/model/playground/custom-node';
import CustomNodeGroup from '@/app/ui/model/playground/custom-node-group';
import { createNodesAndEdges } from "@/app/lib/flow-utils";

import "./index.css";

import { useAppSelector } from "@/app/lib/redux/store";

const edgeTypes: EdgeTypes = {
    floating: FloatingEdge,
};

const nodeTypes = {
    customNode: CustomNode,
    customNodeGroup: CustomNodeGroup,
};

const Flow = () => {

    const currentModelId = useAppSelector((state) => state.networkReducer.modelId);
    const currentModel = useAppSelector((state) => state.modelsReducer);
    // const currentModel = useAppSelector((state) => state.modelsReducer);

    const initialModel = currentModel[currentModelId].layers;
    const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(initialModel);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        let chosenModel = currentModel[currentModelId].layers;
        let { nodes: newNodes, edges: newEdges } = createNodesAndEdges(chosenModel);
        setNodes(newNodes);
        setEdges(newEdges);
    }, [currentModel, currentModelId]);

    const handleClick = () => {
        console.log("Clicked");
    }

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
