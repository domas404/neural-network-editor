import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    const column = req.url.split("/").pop();
    const query = `SELECT DISTINCT ${column} FROM irisdata;`;

    const db = await open({
        filename: "./datasets.db",
        driver: sqlite3.Database,
    });

    const items = await db.all(query);

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json", "Cache-control": "no-store" },
        status: 200,
    });
}