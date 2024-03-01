import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

export async function GET(req, res) {
    if(!db) {
        db = await open({
            filename: "./datasets.db",
            driver: sqlite3.Database,
        });
    }

    const items = await db.all("SELECT * FROM irisdata");

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}
