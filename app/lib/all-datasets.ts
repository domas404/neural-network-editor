interface datasetInfo {
    id: string,
    name: string,
    type: string
}

const allDatasets: datasetInfo[] = [
    { id: "irisdata", name: "Iris data", type: "tabular" },
    { id: "penguins", name: "Penguin data", type: "tabular" },
    { id: "wine", name: "Wine data", type: "tabular" },
    { id: "mnist", name: "MNIST", type: "image" }
];

export default allDatasets;