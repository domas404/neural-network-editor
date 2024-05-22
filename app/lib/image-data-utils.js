import * as tf from '@tensorflow/tfjs';

export async function showExamples(data) {
    // const surface = tfvis.visor().surface({ name: 'Input Data Examples', tab: 'Input Data'});
    const examples = data.nextTestBatch(32);
    const numExamples = examples.xs.shape[0];
    const labels = examples.labels.arraySync();
    const images = [];

    for (let i = 0; i < numExamples; i++) {
        const imageTensor = tf.tidy(() => {
            return examples.xs
                .slice([i, 0], [1, examples.xs.shape[1]])
                .reshape([28, 28, 1]);
        });
    
        const canvas = document.createElement('canvas');
        canvas.width = 28;
        canvas.height = 28;
        await tf.browser.toPixels(imageTensor, canvas);
        images.push(canvas);
        // document.getElementById("image-canvas").appendChild(canvas);
        // console.log(canvas);
        // surface.drawArea.appendChild(canvas);

        imageTensor.dispose();
    }
    // console.log("examples:", labels.arraySync());
    return [images, labels];
}