const parameterOptions = [
    {
        id: "epochs",
        name: "epochs",
        options: ["1", "5", "10", "20", "50", "100", "200", "500"]
    },
    {
        id: "learningRate",
        name: "learning rate",
        options: ["0.0001", "0.001", "0.01", "0.1", "1", "5", "10"]
    },
    {
        id: "batchSize",
        name: "batch size",
        options: ["1", "2", "4", "8", "16", "24", "32", "64"]
    },
    {
        id: "optimizer",
        name: "optimizer",
        options: ["SGD", "Adam", "Adagrad"]
    },
    {
        id: "trainTestRatio",
        name: "train/test ratio",
        options: ["0.5", "0.6", "0.7", "0.8", "0.9"]
    }
];

export default parameterOptions;