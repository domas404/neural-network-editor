const { db } = require('@vercel/postgres');
const irisdata = require("../datasets/iris");
const penguins = require("../datasets/penguins");

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

async function seedPenguinData(client) {
    try {
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS penguins (
                id SERIAL,
                island VARCHAR(50),
                culmen_length_mm VARCHAR(50),
                culmen_depth_mm VARCHAR(50),
                flipper_length_mm VARCHAR(50),
                body_mass_g VARCHAR(50),
                sex VARCHAR(50),
                species VARCHAR(50)
            );
        `;
        console.log(`Created "penguins" table`);

        const uploadDataset = await Promise.all(
            penguins.map(
                (row) => client.sql`
                    INSERT INTO penguins (island, culmen_length_mm, culmen_depth_mm, flipper_length_mm, body_mass_g, sex, species)
                    VALUES (
                        ${row.island},
                        ${row.culmen_length_mm},
                        ${row.culmen_depth_mm},
                        ${row.flipper_length_mm},
                        ${row.body_mass_g},
                        ${row.sex},
                        ${row.species}
                    );
                `,
            ),
        );

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
    await seedPenguinData(client);
    await client.end();
}
  
main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});