import React, { useEffect } from "react";
import ReactFlow, { Background, useNodesState, useEdgesState, EdgeTypes } from 'reactflow';
import 'reactflow/dist/base.css';

import FloatingEdge from "@/app/ui/model/playground/floating-edge";
import CustomNode from '@/app/ui/model/playground/custom-node';
import CustomNodeGroup from '@/app/ui/model/playground/custom-node-group';
import { createNodesAndEdges } from "@/app/lib/flow-utils";
import { v4 } from "uuid";

import "./index.css";

import { useAppSelector, AppDispatch } from "@/app/lib/redux/store";
import { useDispatch } from "react-redux";
import { updateInputLayer, updateOutputLayer } from "@/app/lib/redux/features/model-slice";

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
    const dataset = useAppSelector((state) => state.datasetReducer);
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);

    const initialModel = currentModel[currentModelId].layers;

    const dispatch = useDispatch<AppDispatch>();

    const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(initialModel);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        dispatch(updateInputLayer({ modelName: "default", neuronCount: dataset[datasetId].featuresCount }));
        dispatch(updateOutputLayer({ modelName: "default", neuronCount: dataset[datasetId].labelsCount }));
    }, [datasetId])

    useEffect(() => {
        let chosenModel = currentModel[currentModelId].layers;
        let { nodes: newNodes, edges: newEdges } = createNodesAndEdges(chosenModel);
        setNodes(newNodes);
        setEdges(newEdges);
    }, [currentModel, currentModelId]);

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
