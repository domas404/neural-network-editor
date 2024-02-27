import * as tf from '@tensorflow/tfjs'

interface Layer {
    activation: string,
    neuronCount: number,
}

interface ModelParams {
    layers: Layer[],
    optimizer: string,
    batchSize: number,
    epochs: number,
    learningRate: number,
}

export async function BuildModel({
    layers,
    batchSize,
    epochs,
    learningRate
}: ModelParams, featureTensor: tf.Tensor<tf.Rank>[], outputTensor: tf.Tensor<tf.Rank>[]) {
    const model = tf.sequential();

    for (let i=0; i<layers.length; i++){
        model.add(tf.layers.dense({units: layers[i].neuronCount, inputShape: [1]}));
    }

    model.compile({
        loss: 'meanSquaredError',
        optimizer: tf.train.sgd(learningRate)
    });

    let results = await model.fit(featureTensor, outputTensor, {
        batchSize: batchSize,
        epochs: epochs
    });

    console.log(results);
}
