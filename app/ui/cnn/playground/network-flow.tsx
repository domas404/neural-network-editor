import React, { useEffect } from "react";
import ReactFlow, { Background, useNodesState, useEdgesState, EdgeTypes, useReactFlow } from 'reactflow';
import 'reactflow/dist/base.css';

import FloatingEdge from "@/app/ui/model/playground/custom-elements/floating-edge";
import CustomNode from '@/app/ui/model/playground/custom-elements/custom-node';
import CustomNodeGroup from '@/app/ui/model/playground/custom-elements/custom-node-group';
import { createNodesAndEdgesForCNN } from "@/app/lib/flow-utils";

import "./custom-elements/index.css";

import { useAppSelector, AppDispatch } from "@/app/lib/redux/store";
import { useDispatch } from "react-redux";
import { updateInputLayer, updateOutputLayer } from "@/app/lib/redux/features/model-slice";
import customAddLayer from "./custom-elements/custom-add-layer";
import customInputNode from "./custom-elements/custom-input-node";
import customHiddenNode from "./custom-elements/custom-hidden-node";
import customOutputNode from "./custom-elements/custom-output-node";
import customConvolutionFilterNode from "./custom-elements/custom-convolution-filter";
import customPoolNode from "./custom-elements/custom-pool-node";
import { changeToDefaultModel } from "@/app/lib/redux/features/network-slice";

const edgeTypes: EdgeTypes = {
    floating: FloatingEdge,
};

const nodeTypes = {
    // customNode: CustomNode,
    customNodeGroup: CustomNodeGroup,
    customAddLayer,
    customInputNode,
    customHiddenNode,
    customOutputNode,
    customConvolutionFilterNode,
    customPoolNode
};

const Flow = () => {

    const currentModelId = useAppSelector((state) => state.networkReducer.modelId);
    const currentModel = useAppSelector((state) => state.modelsReducer);
    const dataset = useAppSelector((state) => state.datasetReducer);
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const dispatch = useDispatch<AppDispatch>();

    const initialModel = currentModel[currentModelId].layers;

    if (currentModel[currentModelId].type !== "cnn") {
        dispatch(changeToDefaultModel("cnn"));
    }

    const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdgesForCNN(initialModel);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const { fitView } = useReactFlow();

    useEffect(() => {
        // dispatch(updateInputLayer({ modelName: currentModelId, neuronCount: dataset[datasetId].featuresCount }));
        // dispatch(updateOutputLayer({ modelName: currentModelId, neuronCount: dataset[datasetId].labelsCount }));
    }, [datasetId, currentModelId]);

    useEffect(() => {
        let chosenModel = currentModel[currentModelId].layers;
        let { nodes: newNodes, edges: newEdges } = createNodesAndEdgesForCNN(chosenModel);
        setNodes(newNodes);
        setEdges(newEdges);
    }, [currentModel, currentModelId]);

    const fitModelToScreen = () => {
        fitView({duration: 500});
    }

    useEffect(() => {
        fitModelToScreen();
    }, [nodes]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            className="bg-white dark:bg-slate-800 rounded-md"
            panOnDrag={false}
            nodesDraggable={false}
            zoomOnScroll={false}
        >
            {/* <Background gap={28} color="#64748b" /> */}
        </ReactFlow>
    );
};

export default Flow;
