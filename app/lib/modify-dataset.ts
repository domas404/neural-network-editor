import { unstable_noStore as noStore } from 'next/cache';

export async function fetchDataset() {
    noStore();
    try {
        console.log('Fetching dataset...');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await fetch("https://neural-network-editor-beta.vercel.app/api/irisdata", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        return data.json();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch dataset.');
    }
}

export async function fetchTargets() {
    try {
        console.log('Fetching targets...');
        const data = await fetch("/api/irisdata/Species", {
            method: "GET",
            headers: { "Content-Type": "application/json", },
        });
        return data.json();
    } catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch targets.');
    }
}