
export async function initializeDataset() {
    const data = await fetch("/api", { method: "GET" });
    if (data === undefined) {
        return "";
    } else {
        return data.json();
    }
}

export async function initializeTargets() {
    try {
        const data = await fetch("/api/targets?columnName=Species", {
            method: "GET",
            headers: { "Content-Type": "application/json", },
        });
        if (!data.ok) {
            throw new Error(`${data.status} ${data.statusText}`);
        }
        return data.json();
    } catch(error) {
        console.log(error);
    }
    // return data.json();
}