import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function GET(req: Request, res: Response) {
    
    const { searchParams } = new URL(req.url);
    const column = searchParams.get("columnName");
    const query = `SELECT DISTINCT ${column} FROM irisdata;`;
    
    if (!db) {
        db = await open({
            filename: "./datasets.db",
            driver: sqlite3.Database,
        });
    }

    const items = await db.all(query);

    console.log(items);

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}