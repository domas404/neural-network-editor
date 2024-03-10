import sqlite3 from "sqlite3";
import { open } from "sqlite";
// import { NextApiRequest, NextApiResponse } from "next";

let db = null;

export async function GET(req: Request, res: Response) {

    // const {
    //     query: { name, keyword },
    //     method,
    // } = req;
    // console.log(name, keyword, method);

    // return res.status(200).json({ query: name + " " + keyword });

    if(!db) {
        db = await open({
            filename: "./datasets.db",
            driver: sqlite3.Database,
        });
    }

    const items = await db.all("SELECT * FROM irisdata;");

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}