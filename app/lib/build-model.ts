import * as tf from '@tensorflow/tfjs';
import { HyperparameterSet, Layer, Network, ModelSet, DatasetProps } from "@/app/lib/data-types";

interface DataRow {
    [key: string]: any;
}

function getFeaturesAndLabels(dataset: DatasetProps) {
    const features: number[][] = [];
    const labels: number[] = [];
    
    const labelName: string = dataset.columns[dataset.columns.length-1];
    const labelMap = new Map();
    let labelIndex = 0;

    dataset.dataset.forEach((row: DataRow) => {
        const featureArray: number[] = [];
        for (const key in row) {
            if (dataset.features.includes(key)) {
                featureArray.push(parseFloat(row[key]));
            }
        }
        const label = row[labelName];
        if (!labelMap.has(label)) {
            labelMap.set(label, labelIndex);  
            labelIndex++;
        }
        features.push(featureArray);
        labels.push(labelMap.get(label));
    });

    return { features: features, labels: labels };
}

function getNormalizedFeatures(features: number[][]) {
    const featuresTensor = tf.tensor(features);
    const normalizedFeatures = featuresTensor.div(featuresTensor.max());
    return normalizedFeatures;
}

export async function PrepareData(dataset: DatasetProps) {
    
    const { features, labels } = getFeaturesAndLabels(dataset);
    tf.util.shuffleCombo(features, labels);
    const normalizedFeatures = getNormalizedFeatures(features);
    const oneHotLabels = tf.oneHot(labels, dataset.targets.length);

    const trainSize = Math.floor(0.8 * features.length);
    const valSize = features.length - trainSize;
    
    const [trainFeatures, valFeatures] = tf.split(normalizedFeatures, [trainSize, valSize]);
    const [trainLabels, valLabels] = tf.split(oneHotLabels, [trainSize, valSize]);
    
    return [trainFeatures, valFeatures, trainLabels, valLabels];
}

export async function BuildModel(
    layers: Layer[],
    hyperparams: HyperparameterSet,
) {
    const model = tf.sequential();
    
    //hidden layers
    for (let i=1; i<layers.length-1; i++){
        model.add(tf.layers.dense({units: layers[i].neurons.length, inputShape: [layers[i-1].neurons.length], activation: layers[i].activation as any}));
    }

    // output layer    
    model.add(tf.layers.dense({units: layers[layers.length-1].neurons.length, inputShape: [layers[layers.length-2].neurons.length], activation: layers[layers.length-1].activation as any}));

    model.compile({
        loss: 'meanSquaredError',
        optimizer: tf.train.sgd(parseFloat(hyperparams.learningRate)),
        metrics: ['accuracy']
    });

    console.log(model.summary());
    
    return model;
}

export async function Train(
    model: tf.Sequential,
    hyperparams: HyperparameterSet,
    trainFeatures: tf.Tensor<tf.Rank>,
    valFeatures: tf.Tensor<tf.Rank>,
    trainLabels: tf.Tensor<tf.Rank>,
    valLabels: tf.Tensor<tf.Rank>
) {
    let results = await model.fit(trainFeatures, trainLabels, {
        batchSize: parseInt(hyperparams.batchSize),
        epochs: parseInt(hyperparams.epochs),
        validationData: [valFeatures, valLabels]
    });

    return results;
}

export async function ExecuteTraining(
    dataset: DatasetProps,
    model: ModelSet,
    hyperparams: HyperparameterSet,
    network: Network
) {
    const [trainFeatures, valFeatures, trainLabels, valLabels] = await PrepareData(dataset);
    const modelLayers = model[network.modelId].layers;
    const createdModel = await BuildModel(modelLayers, hyperparams);

    const history = await Train(createdModel, hyperparams, trainFeatures, valFeatures, trainLabels, valLabels);
    const accuracy = history.history.acc.map((value) => Number(value));
    const loss = history.history.loss.map((value) => Number(value));
    const val_acc = history.history.val_acc.map((value) => Number(value));
    const val_loss = history.history.val_loss.map((value) => Number(value));

    return { epoch: history.epoch, history: { acc: accuracy, loss: loss, val_acc: val_acc, val_loss: val_loss }, validation: history };
}