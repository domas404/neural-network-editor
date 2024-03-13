import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {

    const name = req.url.split("/").pop();
    const query = `SELECT * FROM ${name};`;

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

// export async function getAllItems(req: Request, res: Response) {

//     const db = await open({
//         filename: "./datasets.db",
//         driver: sqlite3.Database,
//     });

//     const items = await db.all("SELECT * FROM irisdata;");
//     // const items = { "aaa": "aaa" }

//     console.log("Function called");

//     return JSON.stringify(items);

//     // return new Response(JSON.stringify(items), {
//     //     headers: { "Content-Type": "application/json" },
//     //     status: 200,
//     // });
// }