import * as tf from '@tensorflow/tfjs';
import { HyperparameterSet, Layer, Network, ModelSet, DatasetProps } from "@/app/lib/data-types";

interface DataRow {
    [key: string]: any;
}

export async function PrepareForTraining(
    dataset: DatasetProps,
    model: ModelSet,
    hyperparams: HyperparameterSet,
    network: Network
) {
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

    const numClasses = dataset.targets.length;
    const oneHotLabels = tf.oneHot(labels, numClasses);
    
    const featuresTensor = tf.tensor(features);
    const normalizedFeatures = featuresTensor.div(featuresTensor.max());

    const [trainFeatures, valFeatures] = tf.split(normalizedFeatures, 2);
    const [trainLabels, valLabels] = tf.split(oneHotLabels, 2);

    const modelInfo = model[network.modelId].layers;

    console.log(trainFeatures.shape);

    await BuildModel(modelInfo, hyperparams, trainFeatures, valFeatures, trainLabels, valLabels);

    return ("");
}

export async function BuildModel(
    layers: Layer[],
    hyperparams: HyperparameterSet,
    trainFeatures: tf.Tensor<tf.Rank>,
    valFeatures: tf.Tensor<tf.Rank>,
    trainLabels: tf.Tensor<tf.Rank>,
    valLabels: tf.Tensor<tf.Rank>
) {
    const model = tf.sequential();

    console.log(trainFeatures.shape, trainLabels.shape);

    console.log(trainLabels);

    model.add(tf.layers.dense({units: layers[0].neurons.length, inputShape: [layers[0].neurons.length], activation: "relu"}));
    model.add(tf.layers.dense({units: 3, activation: "softmax"}));

    // for (let i=1; i<layers.length-1; i++){
    //     model.add(tf.layers.dense({units: layers[i].neurons.length, activation: "relu"}));
    // }
    // model.add(tf.layers.dense({units: layers[0].neurons.length, activation: "softmax"}));

    model.compile({
        loss: 'meanSquaredError',
        optimizer: tf.train.sgd(parseFloat(hyperparams.learningRate)),
        metrics: ['accuracy']
    });

    // console.log(model.summary());

    let results = await model.fit(trainFeatures, trainLabels, {
        // batchSize: parseInt(hyperparams.batchSize),
        epochs: parseInt(hyperparams.epochs)
    });

    console.log(results);
}
