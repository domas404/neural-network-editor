"use server";

import { sql } from '@vercel/postgres';
import { type NextRequest, type NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchAllData(datasetName: string) {
    // noStore();
    try {
        const queryAll = `SELECT * FROM ${datasetName}`;
        const data = await sql.query(queryAll);
        const columnLabelName = data.fields[data.fields.length-1].name;

        const queryLabels = `SELECT DISTINCT ${columnLabelName} FROM ${datasetName}`;
        const labels = await sql.query(queryLabels);

        return [data.rows, labels.rows];
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Failed to fetch data from ${datasetName}.`);
    }
}

export async function fetchFilteredData(datasetName: string, labelColumnName: string, selectedColumns: string[], selectedLabels: string[]) {
    try {
        let labelsIn = selectedLabels.map((item) => {
            return `'${item}'`;
        })
        const queryFiltered = `
            SELECT id,${selectedColumns.toString()},${labelColumnName}
            FROM ${datasetName}
            WHERE ${labelColumnName} IN (${labelsIn.toString()})
        `;
        const data = await sql.query(queryFiltered);

        return data.rows;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Failed to fetch data from ${datasetName}.`);
    }
}