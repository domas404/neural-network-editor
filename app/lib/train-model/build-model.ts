import * as tf from '@tensorflow/tfjs';
import { HyperparameterSet, Layer, Network, ModelSet, DatasetProps } from "@/app/lib/data-types";

interface DataRow {
    [key: string]: any;
}

export function getFeaturesAndLabels(dataset: DatasetProps) {
    const features: any[][] = [];
    const labels: number[] = [];
    
    const labelName: string = dataset.columns[dataset.columns.length-1];
    const labelMap = new Map();
    let labelIndex = 0;

    // const featureTypes: string[] = [];
    const categoricalFeatureMap = new Map();
    const featureIndices = new Map();

    Object.keys(dataset.dataset[0]).forEach((key) => {
        if (dataset.features.includes(key)) {
            const item: DataRow = dataset.dataset[0];
            if (!parseFloat(item[key])) {
                categoricalFeatureMap.set(key, new Map());
                featureIndices.set(key, 0);
                // featureTypes.push("string");
            } else {
                // featureTypes.push("number");
            }
        }
    });

    dataset.dataset.forEach((row: DataRow) => {
        const featureArray: number[] = [];
        for (const key in row) {
            if (dataset.features.includes(key)) {
                let item = parseFloat(row[key]);
                if (!item) {
                    // console.log(key, row[key]);
                    // console.log(categoricalFeatureMap.get(key));
                    if (!categoricalFeatureMap.get(key).has(row[key])) {
                        let index = featureIndices.get(key);
                        // console.log(key, row[key], index, index+1);
                        categoricalFeatureMap.get(key).set(row[key], index);
                        featureIndices.set(key, index+1);
                    }
                    item = categoricalFeatureMap.get(key).get(row[key]);
                }
                featureArray.push(item);
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

    return [features, labels] as const;
}

function getNormalizedFeatures(features: number[][]) {
    const featuresTensor = tf.tensor(features);
    const normalizedFeatures = featuresTensor.div(featuresTensor.max());
    return normalizedFeatures;
}

export function ShuffleData(dataset: [{}]) {
    // const { features, labels } = getFeaturesAndLabels(dataset);
    tf.util.shuffle(dataset);
    console.log("shuffled");
    return dataset;
}

export async function PrepareData(dataset: DatasetProps, trainTestRatio: number) {
    
    const [features, labels] = getFeaturesAndLabels(dataset);

    const normalizedFeatures = getNormalizedFeatures(features);
    const oneHotLabels = tf.oneHot(labels, dataset.labelsCount);

    const trainSize = Math.floor(trainTestRatio * features.length);
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
    let optimizer: string | tf.Optimizer = tf.train.sgd(parseFloat(hyperparams.learningRate));

    if (hyperparams.optimizer === "Adam") {
        optimizer = tf.train.adam(parseFloat(hyperparams.learningRate));
    } else if (hyperparams.optimizer === "Adagrad") {
        optimizer = tf.train.adagrad(parseFloat(hyperparams.learningRate));
    }
    
    //hidden layers
    for (let i=1; i<layers.length-1; i++){
        model.add(tf.layers.dense({units: layers[i].neurons.length, inputShape: [layers[i-1].neurons.length], activation: layers[i].activation as any}));
    }

    // output layer    
    model.add(tf.layers.dense({units: layers[layers.length-1].neurons.length, inputShape: [layers[layers.length-2].neurons.length], activation: layers[layers.length-1].activation as any}));

    model.compile({
        loss: 'meanSquaredError',
        optimizer: optimizer,
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

export async function getConfusionMatrix(
    model: tf.Sequential,
    valFeatures: tf.Tensor<tf.Rank>,
    valLabels: tf.Tensor<tf.Rank>,
    numOfClasses: number
) {
    const predictions = model.predict(valFeatures) as tf.Tensor1D;
    const predictionsArray = await (predictions.argMax(1)).array();
    const realLabelsArray = await (valLabels as tf.Tensor1D).argMax(1).array();

    const matrix = await (tf.math.confusionMatrix(realLabelsArray, predictionsArray, numOfClasses)).array();

    return matrix;
}

export async function calculatePrecisionAndRecall(matrix: number[][], numOfClasses: number) {
    const truePositives = new Array(numOfClasses).fill(0);
    const trueNegatives = new Array(numOfClasses).fill(0);
    const allClassInstances = new Array(numOfClasses).fill(0);
    matrix.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (i === j) {
                truePositives[i] = cell;
            } else {
                trueNegatives[j] += cell;
            }
            allClassInstances[i] += cell;
        });
    });

    let precision = new Array(numOfClasses).fill(0);
    let recall = new Array(numOfClasses).fill(0);

    for (let i=0; i<numOfClasses; i++) {
        let allPredictedInstances = truePositives[i] + trueNegatives[i];
        precision[i] = truePositives[i]/allClassInstances[i];
        recall[i] = truePositives[i]/(allPredictedInstances > 0 ? allPredictedInstances : 1);
    }
    const precisionMacroAverage: number = precision.reduce((sum, item) => sum + item, 0)/numOfClasses;
    const recallMacroAverage: number = recall.reduce((sum, item) => sum + item, 0)/numOfClasses;

    return { precision: precisionMacroAverage, recall: recallMacroAverage };
}

export async function ExecuteTraining(
    dataset: DatasetProps,
    model: ModelSet,
    hyperparams: HyperparameterSet,
    network: Network
) {
    const [trainFeatures, valFeatures, trainLabels, valLabels] = await PrepareData(dataset, parseFloat(hyperparams.trainTestRatio));
    const modelLayers = model[network.modelId].layers;
    const createdModel = await BuildModel(modelLayers, hyperparams);

    const history = await Train(createdModel, hyperparams, trainFeatures, valFeatures, trainLabels, valLabels);
    const accuracy = history.history.acc.map((value) => Number(value));
    const loss = history.history.loss.map((value) => Number(value));
    const val_acc = history.history.val_acc.map((value) => Number(value));
    const val_loss = history.history.val_loss.map((value) => Number(value));

    const confusionMatrix = await getConfusionMatrix(createdModel, valFeatures, valLabels, dataset.labelsCount);
    const { precision, recall } = await calculatePrecisionAndRecall(confusionMatrix, dataset.labelsCount);

    return {
        epoch: history.epoch,
        history: { acc: accuracy, loss: loss, val_acc: val_acc, val_loss: val_loss, precision: precision, recall: recall },
        confusionMatrix: confusionMatrix
    };
}