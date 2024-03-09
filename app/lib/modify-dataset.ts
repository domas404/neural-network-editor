
export async function initializeDataset() {
    const data = await fetch("http://localhost:3000/api", {
        method: "GET",
        headers: { "Content-Type": "application/json", },
    });

    return data.json();
}

export async function initializeTargets() {
    const data = await fetch("http://localhost:3000/api/targets?columnName=Species", {
        method: "GET",
        headers: { "Content-Type": "application/json", },
    });

    return data.json();
}