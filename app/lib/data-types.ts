export interface Neuron {
    id: string,
}

export interface Layer {
    id: string,
    type: string,
    order: number,
    neurons: Neuron[],
}

export interface HyperparameterSet {
    epochs: string,
    learningRate: string,
    batchSize: string,
    optimizer: string,
}

export interface Dataset {
    id: string,
    name: string,
}

export interface ModelSet {
    [id: string]: {
        name: string,
        layers: Layer[],
    }
}

export interface Network {
    dataset: any,
    modelId: string,
    // hyperparams: HyperparameterSet,
}
