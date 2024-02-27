import { Position, MarkerType } from "reactflow";

export function createNodesAndEdges() {
    const nodes = [];
    const edges = [];
    const layers = [
        { id: "1", type: "input", neurons: [{ id: "1_1" }, { id: "1_2" }, { id: "1_3" }] },
        { id: "2", type: "hidden", neurons: [{ id: "2_1" }, { id: "2_2" }, { id: "2_3" }, { id: "2_4" }, { id: "2_5" }] },
        { id: "3", type: "hidden", neurons: [{ id: "3_1" }, { id: "3_2" }, { id: "3_3" }, { id: "3_4" }] },
        { id: "5", type: "output", neurons: [{ id: "5_1" }, { id: "5_2" }, { id: "5_3" }] }
    ];

    const widestLayer = layers.reduce((prev, current) => current.neurons.length > prev.neurons.length ? current : prev);
    const height = (widestLayer.neurons.length + 2)*60

    nodes.push({
        id: "0",
        position: { x:0, y:0 },
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
                // draggable: false,
            });
            // console.log(nodes[nodes.length-1].position);
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
