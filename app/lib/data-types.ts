export interface Neuron {
    id: string;
}

export interface Layer {
    id: string;
    type: string;
    neurons: Neuron[];
}

export interface HyperparameterSet {
    epochs: number;
    learningRate: number;
    batchSize: number;
    optimizer: string;
}

export interface Network {
    dataset: any;
    modelName: string;
    layers: Layer[];
    hyperparams: HyperparameterSet;
}
