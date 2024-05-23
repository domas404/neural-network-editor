import * as tf from '@tensorflow/tfjs';
import { HyperparameterSet, Layer, Network, ModelSet, DatasetProps, ConvolutionLayer, PoolingLayer } from "@/app/lib/data-types";

interface DataRow {
    [key: string]: any;
}

const lossMap = new Map<string, any>([
    ["Absolute Difference", tf.losses.absoluteDifference],
    ["Mean Squared Error", tf.losses.meanSquaredError],
    ["Sigmoid Cross Entropy", tf.losses.sigmoidCrossEntropy],
    ["Hinge", tf.losses.hingeLoss]
]);

const trainTestRatioMap = new Map<string, number>([
    ["50/50", 0.5],
    ["60/40", 0.6],
    ["70/30", 0.7],
    ["80/20", 0.8],
    ["90/10", 0.9]
])

const measureTime = (fnCall: Function, name: string) => function(this: any, ...args: any[]) {
    const start = performance.now();
    const result = fnCall.apply(this, args);
    const end = performance.now();
    console.log(`${name} elapsed ${(end - start)/1000} seconds`);
    return result;
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

export async function PrepareData(dataset: any, trainTestRatio: number) {
    
    const TRAIN_DATA_SIZE = 5500;
    const TEST_DATA_SIZE = 1000;
  
    const [trainFeatures, trainLabels] = tf.tidy(() => {
        const d = dataset.nextTrainBatch(TRAIN_DATA_SIZE);
        return [
            d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
            d.labels
        ];
    });
  
    const [valFeatures, valLabels] = tf.tidy(() => {
        const d = dataset.nextTestBatch(TEST_DATA_SIZE);
        return [
            d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
            d.labels
        ];
    });
    
    return [trainFeatures, valFeatures, trainLabels, valLabels];
}

function getWeightsAndBias(inputShape: number, outputShape: number, seed: number) {
    let weights = tf.variable(tf.randomNormal([inputShape, outputShape], 0, 0.05, "float32", seed));
    let bias = tf.variable(tf.randomNormal([outputShape], 0, 0.05, "float32", seed));
    return [weights, bias];
}

export async function BuildModel(
    layers: (Layer | ConvolutionLayer | PoolingLayer)[],
    hyperparams: HyperparameterSet,
) {

    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const IMAGE_CHANNELS = 1;
    const NUM_OUTPUT_CLASSES = 10;

    const model = tf.sequential();
    let optimizer: string | tf.Optimizer = tf.train.sgd(parseFloat(hyperparams.learningRate));
    let loss = lossMap.get(hyperparams.loss);

    if (hyperparams.optimizer === "Adam") {
        optimizer = tf.train.adam(parseFloat(hyperparams.learningRate));
    } else if (hyperparams.optimizer === "Adagrad") {
        optimizer = tf.train.adagrad(parseFloat(hyperparams.learningRate));
    }

    // first convolution
    if (layers[1].type != "convolution") return;
    const layer = layers[1] as ConvolutionLayer;
    model.add(tf.layers.conv2d({
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
        kernelSize: layer.kernelSize,
        filters: layer.itemCount,
        strides: layer.stride,
        padding: layer.padding === 0 ? 'valid' : 'same',
        activation: layer.activation as any,
    }));
    
    // convolution and pooling
    let i=2;
    while (layers[i].type === "convolution" || layers[i].type === "pooling") {
        if (layers[i].type === "convolution") {
            const layer = layers[i] as ConvolutionLayer;
            model.add(tf.layers.conv2d({
                kernelSize: layer.kernelSize,
                filters: layer.itemCount,
                strides: layer.stride,
                padding: layer.padding === 0 ? 'valid' : 'same',
                activation: layer.activation as any,
            }));
        } else if (layers[i].type === "pooling") {
            const layer = layers[i] as PoolingLayer;
            if (layer.poolType === "average") {
                model.add(tf.layers.averagePooling2d({
                    poolSize: layer.poolSize,
                    strides: layer.stride,
                    padding: layer.padding === 0 ? 'valid' : 'same'
                }));
            } else {
                model.add(tf.layers.maxPooling2d({
                    poolSize: layer.poolSize,
                    strides: layer.stride,
                }));
            }
        }
        i++;
    }
    
    // flatten
    model.add(tf.layers.flatten());

    // dense  (fully-connected)
    if (i < layers.length-1) {
        for (let j=i; j<layers.length-1; j++){
            const layer = layers[j] as Layer;
            model.add(tf.layers.dense({
                units: layer.neurons.length,
                activation: layer.activation as any,
            }));
        }

    }

    // output
    const outputLayer = layers[layers.length-1] as Layer;
    model.add(tf.layers.dense({
        units: NUM_OUTPUT_CLASSES,
        activation: outputLayer.activation as any,
    }));

    model.compile({
        loss: loss,
        optimizer: optimizer,
        metrics: ['accuracy']
    });

    console.log(model.summary());
    console.log("countParams", model.countParams());
    
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
        validationData: [valFeatures, valLabels],
        shuffle: false
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
    dataset: any,
    model: ModelSet,
    hyperparams: HyperparameterSet,
    network: Network
) {
    const trainTestRatioValue = trainTestRatioMap.get(hyperparams.trainTestRatio);
    const wrappedPrepareData = measureTime(PrepareData, "PrepareData");
    const [trainFeatures, valFeatures, trainLabels, valLabels] = await wrappedPrepareData(dataset, trainTestRatioValue);

    const modelLayers = model[network.modelId].layers;

    const wrappedBuildModel = measureTime(BuildModel, "BuildModel");
    const createdModel = await wrappedBuildModel(modelLayers, hyperparams);
    
    const start = performance.now();
    const history = await Train(createdModel, hyperparams, trainFeatures, valFeatures, trainLabels, valLabels);
    const end = performance.now();
    console.log(`Train elapsed ${(end - start)/1000} seconds`);

    const accuracy = history.history.acc.map((value) => Number(value));
    const loss = history.history.loss.map((value) => Number(value));
    const val_acc = history.history.val_acc.map((value) => Number(value));
    const val_loss = history.history.val_loss.map((value) => Number(value));

    console.log(accuracy, loss, val_acc, val_loss);

    const confusionMatrix = await getConfusionMatrix(createdModel, valFeatures, valLabels, 10);
    const { precision, recall } = await calculatePrecisionAndRecall(confusionMatrix, 10);

    console.log(confusionMatrix, precision, recall);

    await createdModel.save('localstorage://my-model');
    // await createdModel.save('downloads://my-model');

    return {
        epoch: history.epoch,
        history: { acc: accuracy, loss: loss, val_acc: val_acc, val_loss: val_loss, precision: precision, recall: recall },
        confusionMatrix: confusionMatrix,
        model: createdModel
    };
}