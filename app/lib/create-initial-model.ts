import { v4 } from "uuid";

interface NeuronStructure {
    id: string;
}

interface LayerStructure {
    id: string;
    type: string;
    neurons: NeuronStructure[];
}

interface InitialModelProps {
    layerCount: number;
    neuronCount: number[];
    layerTypes: string[];
}

export function createInitialModel({ layerCount, layerTypes, neuronCount }: InitialModelProps) {
    let newModel: LayerStructure[] = [];

    for (let i=0; i<layerCount; i++) {
        let neurons: NeuronStructure[] = [];
        for (let j=0; j<neuronCount[i]; j++) {
            neurons.push({
                id: v4(),
            });
        }
        newModel.push({
            id: v4(),
            type: layerTypes[i],
            neurons: neurons
        })
    }

    // console.log(newModel);

    return newModel;
}