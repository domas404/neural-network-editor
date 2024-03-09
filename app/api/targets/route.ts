import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextApiRequest, NextApiResponse } from "next";

let db = null;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    
    const { searchParams } = new URL(req.url!);
    const column = searchParams.get("columnName");
    const query = `SELECT DISTINCT ${column} FROM irisdata;`;

    if(!db) {
        db = await open({
            filename: "./datasets.db",
            driver: sqlite3.Database,
        });
    }

    const items = await db.all(query);

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}