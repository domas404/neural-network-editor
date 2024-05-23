import { Position, MarkerType } from "reactflow";
import type { Node, Edge } from "reactflow";
import { v4 } from "uuid";
import { ConvolutionLayer, Layer, PoolingLayer } from "@/app/lib/data-types";

function createFullyConnectedLayer(layer: Layer, topMargin: number) {
    const nodes: Node[] = [];
    for (let j=0; j<layer.itemCount; j++) {
        let nodeType = "customHiddenNode";
        if (layer.type === "input") {
            nodeType = "customInputNode";
        } else if (layer.type === "output") {
            nodeType = "customOutputNode";
        }
        nodes.push({
            id: layer.neurons[j].id,
            position: { x:28, y:topMargin+j*60 },
            data: {
                type: layer.type,
                activation: layer.activation
            },
            parentNode: layer.id,
            type: nodeType,
            extent: "parent",
            draggable: false,
            zIndex: 3,
            className: "rounded-full",
            style: {
                pointerEvents: "none",
            }
        });
    }
    return nodes;
}

function createConvolutionLayer(layer: ConvolutionLayer, topMargin: number) {
    const nodes: Node[] = [];
    for (let j=0; j<layer.itemCount; j++) {
        let nodeType = "customConvolutionFilterNode";
        nodes.push({
            id: layer.filters[j].id,
            position: { x:28, y:topMargin+j*60 },
            data: {
                type: layer.type,
                activation: layer.activation
            },
            parentNode: layer.id,
            type: nodeType,
            extent: "parent",
            draggable: false,
            zIndex: 3,
            className: "rounded-full",
            style: {
                pointerEvents: "none",
            }
        });
    }
    return nodes;
}

function createPoolingLayer(layer: PoolingLayer, topMargin: number) {
    const nodes: Node[] = [];
    for (let j=0; j<layer.itemCount; j++) {
        let nodeType = "customPoolNode";
        nodes.push({
            id: layer.pools[j].id,
            position: { x:28, y:topMargin+j*60 },
            data: {
                type: layer.type,
                activation: ""
            },
            parentNode: layer.id,
            type: nodeType,
            extent: "parent",
            draggable: false,
            zIndex: 3,
            className: "rounded-full",
            style: {
                pointerEvents: "none",
            }
        });
    }
    return nodes;
}

function createEdgesFromConvolutionToConvolution(sourceLayer: ConvolutionLayer, targetLayer: ConvolutionLayer) {
    let edges: Edge[] = [];
    for (let j=0; j<sourceLayer.itemCount; j++) {
        for (let k=0; k<targetLayer.itemCount; k++) {
            edges.push({
                id: `${sourceLayer.filters[j].id}-${targetLayer.filters[k].id}`,
                source: sourceLayer.filters[j].id,
                target: targetLayer.filters[k].id,
                type: "floating",
                style: {
                    zIndex: 2,
                },
            });
        }
    }
    return edges;
}

function createEdgesFromConvolutionToPooling(sourceLayer: ConvolutionLayer, targetLayer: PoolingLayer) {
    let edges: Edge[] = [];
    let count = Math.min(sourceLayer.itemCount, targetLayer.itemCount);
    for (let j=0; j<count; j++) {
        edges.push({
            id: `${sourceLayer.filters[j].id}-${sourceLayer.filters[j].id}`,
            source: sourceLayer.filters[j].id,
            target: targetLayer.pools[j].id,
            type: "floating",
            style: {
                zIndex: 2,
            },
        });
    }
    return edges;
}

function createEdgesFromConvolutionToFullyConnected(sourceLayer: ConvolutionLayer, targetLayer: Layer) {
    let edges: Edge[] = [];
    for (let j=0; j<sourceLayer.itemCount; j++) {
        for (let k=0; k<targetLayer.itemCount; k++) {
            edges.push({
                id: `${sourceLayer.filters[j].id}-${targetLayer.neurons[k].id}`,
                source: sourceLayer.filters[j].id,
                target: targetLayer.neurons[k].id,
                type: "floating",
                style: {
                    zIndex: 2,
                },
            });
        }
    }
    return edges;
}

function createEdgesFromFullyConnectedToFullyConnected(sourceLayer: Layer, targetLayer: Layer) {
    let edges: Edge[] = [];
    for (let j=0; j<sourceLayer.itemCount; j++) {
        for (let k=0; k<targetLayer.itemCount; k++) {
            edges.push({
                id: `${sourceLayer.neurons[j].id}-${targetLayer.neurons[k].id}`,
                source: sourceLayer.neurons[j].id,
                target: targetLayer.neurons[k].id,
                type: "floating",
                style: {
                    zIndex: 2,
                },
            });
        }
    }
    return edges;
}

function createEdgesFromFullyConnectedToConvolution(sourceLayer: Layer, targetLayer: ConvolutionLayer) {
    let edges: Edge[] = [];
    for (let j=0; j<sourceLayer.itemCount; j++) {
        for (let k=0; k<targetLayer.itemCount; k++) {
            edges.push({
                id: `${sourceLayer.neurons[j].id}-${targetLayer.filters[k].id}`,
                source: sourceLayer.neurons[j].id,
                target: targetLayer.filters[k].id,
                type: "floating",
                style: {
                    zIndex: 2,
                },
            });
        }
    }
    return edges;
}

function createEdgesFromPoolingToFullyConnected(sourceLayer: PoolingLayer, targetLayer: Layer) {
    let edges: Edge[] = [];
    for (let j=0; j<sourceLayer.itemCount; j++) {
        for (let k=0; k<targetLayer.itemCount; k++) {
            edges.push({
                id: `${sourceLayer.pools[j].id}-${targetLayer.neurons[k].id}`,
                source: sourceLayer.pools[j].id,
                target: targetLayer.neurons[k].id,
                type: "floating",
                style: {
                    zIndex: 2,
                },
            });
        }
    }
    return edges;
}

function createEdgesFromPoolingToConvolution(sourceLayer: PoolingLayer, targetLayer: ConvolutionLayer) {
    let edges: Edge[] = [];
    for (let j=0; j<sourceLayer.itemCount; j++) {
        for (let k=0; k<targetLayer.itemCount; k++) {
            edges.push({
                id: `${sourceLayer.pools[j].id}-${targetLayer.filters[k].id}`,
                source: sourceLayer.pools[j].id,
                target: targetLayer.filters[k].id,
                type: "floating",
                style: {
                    zIndex: 2,
                },
            });
        }
    }
    return edges;
}

function createEdgesFromPoolingToPooling(sourceLayer: PoolingLayer, targetLayer: PoolingLayer) {
    let edges: Edge[] = [];
    let count = Math.min(sourceLayer.itemCount, targetLayer.itemCount);
    for (let j=0; j<count; j++) {
        edges.push({
            id: `${sourceLayer.pools[j].id}-${sourceLayer.pools[j].id}`,
            source: sourceLayer.pools[j].id,
            target: targetLayer.pools[j].id,
            type: "floating",
            style: {
                zIndex: 2,
            },
        });
    }
    return edges;
}

export function createNodesAndEdgesForCNN(layers: (Layer | ConvolutionLayer | PoolingLayer)[]) {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const widestLayer = layers.reduce((prev, current) => current.itemCount > prev.itemCount ? current : prev);
    const height = (widestLayer.itemCount + 2)*60;

    // background
    nodes.push({
        id: v4(),
        position: { x:0, y:0 },
        data: {},
        type: "group",
        zIndex: 0,
        style: {
            width: `${(layers.length+1)*120-24}px`,
            height: `${height}px`,
            border: "none",
        }
    });

    // nodes
    for (let i=0; i<layers.length; i++) {
        // layer
        nodes.push({
            id: layers[i].id,
            position: { x:i*120+60, y:0 },
            data: {
                id: layers[i].id,
            },
            type: "customNodeGroup",
            parentNode: nodes[0].id,
            extent: "parent",
            zIndex: 1,
            style: {
                height: `${height}px`,
                // width: "96px",
                // borderRadius: "0.75rem",
            }
        });
        // layer insertion component
        if (i < layers.length-1) {
            const addLayerId = v4();
            nodes.push({
                id: addLayerId,
                position: { x:i*120+60+88, y:0 },
                data: {
                    layerId: layers[i].id,
                },
                type: "customAddLayer",
                parentNode: nodes[0].id,
                extent: "parent",
                zIndex: 1,
                style: {
                    height: `${height}px`,
                }
            });
        }
        // individual neurons / filters
        let topMargin = (height - (layers[i].itemCount*40 + (layers[i].itemCount-1)*20))/2;
        if (layers[i].type === "convolution") {
            const nodesToAdd: Node[] = createConvolutionLayer(layers[i] as ConvolutionLayer, topMargin);
            nodes.push(...nodesToAdd);
        } else if (layers[i].type === "pooling") {
            const nodesToAdd: Node[] = createPoolingLayer(layers[i] as PoolingLayer, topMargin);
            nodes.push(...nodesToAdd);
        } else {
            const nodesToAdd: Node[] = createFullyConnectedLayer(layers[i] as Layer, topMargin);
            // console.log("nodesToAdd", nodesToAdd.length);
            nodes.push(...nodesToAdd);
        }
    }
    // console.log(nodes.length);

    // edges
    for (let i=0; i<layers.length-1; i++) {
        if (layers[i].type === "convolution" && layers[i+1].type === "convolution") {
            const edgesToAdd = createEdgesFromConvolutionToConvolution(layers[i] as ConvolutionLayer, layers[i+1] as ConvolutionLayer);
            // console.log(edgesToAdd);
            edges.push(...edgesToAdd);
        } else if (layers[i].type === "convolution" && (layers[i+1].type === "hidden" || layers[i+1].type === "output")) {
            const edgesToAdd = createEdgesFromConvolutionToFullyConnected(layers[i] as ConvolutionLayer, layers[i+1] as Layer);
            edges.push(...edgesToAdd);
        } else if (layers[i].type === "input" && layers[i+1].type === "convolution") {
            const edgesToAdd = createEdgesFromFullyConnectedToConvolution(layers[i] as Layer, layers[i+1] as ConvolutionLayer);
            edges.push(...edgesToAdd);
        } else if (layers[i].type === "convolution" && layers[i+1].type === "pooling") {
            const edgesToAdd = createEdgesFromConvolutionToPooling(layers[i] as ConvolutionLayer, layers[i+1] as PoolingLayer);
            edges.push(...edgesToAdd);
        } else if (layers[i].type === "pooling" && layers[i+1].type === "convolution") {
            const edgesToAdd = createEdgesFromPoolingToConvolution(layers[i] as PoolingLayer, layers[i+1] as ConvolutionLayer);
            edges.push(...edgesToAdd);
        } else if (layers[i].type === "pooling" && layers[i+1].type === "pooling") {
            const edgesToAdd = createEdgesFromPoolingToPooling(layers[i] as PoolingLayer, layers[i+1] as PoolingLayer);
            edges.push(...edgesToAdd);
        } else if (layers[i].type === "pooling" && (layers[i+1].type === "hidden" || layers[i+1].type === "output")) {
            const edgesToAdd = createEdgesFromPoolingToFullyConnected(layers[i] as PoolingLayer, layers[i+1] as Layer);
            edges.push(...edgesToAdd);
        } else {
            const edgesToAdd = createEdgesFromFullyConnectedToFullyConnected(layers[i] as Layer, layers[i+1] as Layer);
            edges.push(...edgesToAdd);
        }
    }

    return { nodes, edges }
}

export function createNodesAndEdges(layers: Layer[]) {

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const widestLayer = layers.reduce((prev, current) => current.neurons.length > prev.neurons.length ? current : prev);
    const height = (widestLayer.neurons.length + 2)*60;

    nodes.push({
        id: v4(),
        position: { x:0, y:0 },
        data: {},
        type: "group",
        zIndex: 0,
        style: {
            width: `${(layers.length+1)*120-24}px`,
            height: `${height}px`,
            border: "none",
        }
    });

    for (let i=0; i<layers.length; i++) {
        nodes.push({
            id: layers[i].id,
            position: { x:i*120+60, y:0 },
            data: {
                id: layers[i].id,
            },
            type: "customNodeGroup",
            parentNode: nodes[0].id,
            extent: "parent",
            zIndex: 1,
            style: {
                height: `${height}px`,
                // width: "96px",
                // borderRadius: "0.75rem",
            }
        });
        if (i < layers.length-1) {
            const addLayerId = v4();
            nodes.push({
                id: addLayerId,
                position: { x:i*120+60+88, y:0 },
                data: {
                    layerId: layers[i].id,
                },
                type: "customAddLayer",
                parentNode: nodes[0].id,
                extent: "parent",
                zIndex: 1,
                style: {
                    height: `${height}px`,
                }
            });
        }
        let topMargin = (height - (layers[i].neurons.length*40 + (layers[i].neurons.length-1)*20))/2;
        for (let j=0; j<layers[i].neurons.length; j++) {
            let nodeType = "customHiddenNode";
            if (layers[i].type === "input") {
                nodeType = "customInputNode";
            } else if (layers[i].type === "output") {
                nodeType = "customOutputNode";
            }
            nodes.push({
                id: layers[i].neurons[j].id,
                position: { x:28, y:topMargin+j*60 },
                data: {
                    type: layers[i].type,
                    activation: layers[i].activation
                },
                parentNode: layers[i].id,
                type: nodeType,
                extent: "parent",
                draggable: false,
                zIndex: 3,
                className: "rounded-full",
                style: {
                    pointerEvents: "none",
                }
            });
        }
    }

    for (let i=0; i<layers.length-1; i++) {
        for (let j=0; j<layers[i].neurons.length; j++) {
            for (let k=0; k<layers[i+1].neurons.length; k++){
            edges.push({
                id: `${layers[i].neurons[j].id}-${layers[i+1].neurons[k].id}`,
                source: layers[i].neurons[j].id,
                target: layers[i+1].neurons[k].id,
                type: "floating",
                style: {
                    zIndex: 2,
                },
                // animated: true,
            });
            }
        }
    }

    return { nodes, edges }
}
