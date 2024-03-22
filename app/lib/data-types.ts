export interface Neuron {
    id: string,
}

export interface Layer {
    id: string,
    type: string,
    order: number,
    neurons: Neuron[],
    activation: string,
}

export interface HyperparameterSet {
    epochs: string,
    learningRate: string,
    batchSize: string,
    optimizer: string,
}

export type Dataset = Map<string, DatasetProps>

export interface DatasetProps {
    loaded: boolean,
    dataset: [{}],
    columns: string[],
    features: string[],
    targets: string[],
    selectedFeatures: boolean[],
    selectedTargets: boolean[],
    featuresCount: number,
    labelsCount: number
}

export interface ModelSet {
    [id: string]: {
        name: string,
        layers: Layer[],
    }
}

export interface Model {
    name: string,
    layers: Layer[]
}

export type ModelProps = Map<string, Model>;

export interface Network {
    dataset: any,
    modelId: string,
}

export interface TrainHistory {
    epoch: number[],
    history: {
        acc: number[],
        loss: number[],
        val_acc: number[],
        val_loss: number[],
    },
    confusionMatrix: number[][]
}