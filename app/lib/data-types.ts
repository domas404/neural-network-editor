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
    trainTestRatio: string,
    loss: string
}

export interface Dataset {
    [id: string]: DatasetProps
}

export interface DatasetProps {
    loaded: boolean,
    dataset: [{}],
    columns: string[],
    features: string[],
    labels: string[],
    selectedFeatures: boolean[],
    selectedLabels: boolean[],
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
    dataset: string,
    modelId: string,
}

export interface TrainHistory {
    epoch: number[],
    history: {
        acc: number[],
        loss: number[],
        val_acc: number[],
        val_loss: number[],
        precision: number,
        recall: number
    },
    confusionMatrix: number[][]
}