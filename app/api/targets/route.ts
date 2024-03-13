import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { type NextRequest } from "next/server";

// let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function GET(req: NextRequest) {
    
    const searchParams = req.nextUrl.searchParams;
    const column = searchParams.get("columnName");
    const query = `SELECT DISTINCT ${column} FROM irisdata;`;
    
    // console.log(`Request value: ${column}, initiating query: ${query}`);

    // if (!db) {
    const db = await open({
        filename: "./datasets.db",
        driver: sqlite3.Database,
    });
    // }

    
    const items = await db.all(query);
    
    console.log(items);

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json", "Cache-control": "no-store" },
        status: 200,
    });
}