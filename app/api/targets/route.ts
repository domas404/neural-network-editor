import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function GET(req: Request, res: Response) {
    
    const { searchParams } = new URL(req.url!);
    const column = searchParams.get("columnName");
    const query = `SELECT DISTINCT ${column} FROM irisdata;`;

    const db = await open({
        filename: "./datasets.db",
        driver: sqlite3.Database,
    });

    const items = await db.all(query);

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}