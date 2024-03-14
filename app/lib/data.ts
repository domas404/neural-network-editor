import { sql } from '@vercel/postgres';
import { type NextRequest, type NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchAllData(datasetName: string, columnLabelName: string) {
    noStore();
    try {
        const data = await sql`SELECT * FROM ${datasetName}`;
        console.log(data);
        // const labels = await sql`SELECT DISTINCT ${columnLabelName} FROM ${datasetName}`;
        // return { ...data, ...labels };
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Failed to fetch data from ${datasetName}.`);
    }
}

export async function fetchAllLabels() {
    // console.log(iris);
}

export async function fetchFilteredData(req: NextRequest, res: NextResponse) {

}