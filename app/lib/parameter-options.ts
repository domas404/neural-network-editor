const parameterOptions = [
    {
        id: "epochs",
        name: "epochs",
        options: ["1", "5", "10", "20", "50", "100", "200", "500"]
    },
    {
        id: "batchSize",
        name: "batch size",
        options: ["1", "2", "4", "8", "16", "24", "32", "64"]
    },
    {
        id: "learningRate",
        name: "learning rate",
        options: ["0.001", "0.01", "0.05" , "0.1", "0.3", "0.5", "1", "5", "10"]
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
    },
    {
        id: "loss",
        name: "loss",
        options: ["Absolute Difference", "Mean Squared Error", "Hinge", "Sigmoid Cross Entropy"]
    },
    // {
    //     id: "regularization",
    //     name: "regularization",
    //     options: ["L1", "L2"]
    // }
];

export default parameterOptions;