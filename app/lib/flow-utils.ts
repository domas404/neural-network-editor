import { Position, MarkerType } from "reactflow";
import type { Node, Edge } from "reactflow";
import { v4 } from "uuid";
import { Layer } from "@/app/lib/data-types";

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
            nodes.push({
                id: layers[i].neurons[j].id,
                position: { x:28, y:topMargin+j*60 },
                data: {
                    type: layers[i].type,
                },
                parentNode: layers[i].id,
                type: "customNode",
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
