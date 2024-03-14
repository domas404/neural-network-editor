const { db } = require('@vercel/postgres');
const irisdata = require("../datasets/iris");

async function seedIrisdata(client) {
    // const irisdata = iris;
    try {
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS irisdata (
                id SERIAL,
                SepalLengthCm VARCHAR(50),
                SepalWidthCm VARCHAR(50),
                PetalLengthCm VARCHAR(50),
                PetalWidthCm VARCHAR(50),
                Species VARCHAR(50)
            );
        `;
        console.log(`Created "irisdata" table`);

        const uploadDataset = await Promise.all(
            irisdata.map(
                (row) => client.sql`
                    INSERT INTO irisdata (SepalLengthCm, SepalWidthCm, PetalLengthCm, PetalWidthCm, Species)
                    VALUES (${row.sepalLength}, ${row.sepalWidth}, ${row.petalLength}, ${row.petalWidth}, ${row.species});
                `,
            ),
        );

        // const uploadDataset = await client.sql`
        //     \copy irisdata (SepalLengthCm, SepalWidthCm, PetalLengthCm, PetalWidthCm, Species)
        //     FROM '../iris.csv'
        //     DELIMITER ',' CSV;
        // `;

        console.log(`Uploaded dataset.`);

        return {
            createTable,
            dataset: uploadDataset,
        };
    } catch (error) {
        console.error('Error copying csv:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();
    await seedIrisdata(client);
    await client.end();
}
  
main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});