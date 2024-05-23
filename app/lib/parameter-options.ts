const parameterOptions = [
    {
        id: "epochs",
        name: "epochs",
        options: ["1", "5", "10", "20", "50", "100", "200", "500"]
    },
    {
        id: "batchSize",
        name: "batch size",
        options: ["1", "4", "16", "32", "64", "128", "256", "512"]
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
        options: ["50/50", "60/40", "70/30", "80/20", "90/10"]
    },
    {
        id: "loss",
        name: "loss function",
        options: ["Absolute Difference", "Mean Squared Error", "Hinge", "Sigmoid Cross Entropy"]
    },
    // {
    //     id: "regularization",
    //     name: "regularization",
    //     options: ["L1", "L2"]
    // }
];

export default parameterOptions;