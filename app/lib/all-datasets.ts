interface datasetInfo {
    id: string,
    name: string
}

const allDatasets: datasetInfo[] = [
    { id: "irisdata", name: "Iris data" },
    { id: "penguins", name: "Penguin data" },
    { id: "wine", name: "Wine data"}
];

export default allDatasets;