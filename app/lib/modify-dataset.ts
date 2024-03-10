
export async function initializeDataset() {
    const data = await fetch("/api", {
        method: "GET",
        headers: { "Content-Type": "application/json", },
    });

    return data.json();
}

export async function initializeTargets() {
    const data = await fetch("/api/targets?columnName=Species", {
        method: "GET",
        headers: { "Content-Type": "application/json", },
    });

    return data.json();
}