export interface Neuron {
    id: string,
}

export interface Layer {
    id: string,
    type: string,
    neurons: Neuron[],
}

export interface HyperparameterSet {
    epochs: number,
    learningRate: number,
    batchSize: number,
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
    hyperparams: HyperparameterSet,
}
