import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function GET(req: Request, res: Response) {

    const db = await open({
        filename: "./datasets.db",
        driver: sqlite3.Database,
    });

    const items = await db.all("SELECT * FROM irisdata;");

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}