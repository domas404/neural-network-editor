const { db } = require('@vercel/postgres');
const irisdata = require("../datasets/iris");
const penguins = require("../datasets/penguins");
const wine = require("../datasets/wine");

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

async function seedWineData(client) {
    try {
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS wine (
                id SERIAL,
                "Alcohol" VARCHAR(50),
                "Malic acid" VARCHAR(50),
                "Ash" VARCHAR(50),
                "Alcalinity of ash" VARCHAR(50),
                "Magnesium" VARCHAR(50),
                "Total phenols" VARCHAR(50),
                "Flavanoids" VARCHAR(50),
                "Nonflavanoid phenols" VARCHAR(50),
                "Proanthocyanins" VARCHAR(50),
                "Color intensity" VARCHAR(50),
                "Hue" VARCHAR(50),
                "OD280/OD315 of diluted wines" VARCHAR(50),
                "Proline" VARCHAR(50),
                class VARCHAR(50)
            );
        `;
        console.log(`Created "wine" table`);

        const uploadDataset = await Promise.all(
            wine.map(
                (row) => client.sql`
                    INSERT INTO wine (
                        "Alcohol",
                        "Malic acid",
                        "Ash",
                        "Alcalinity of ash",
                        "Magnesium",
                        "Total phenols",
                        "Flavanoids",
                        "Nonflavanoid phenols",
                        "Proanthocyanins",
                        "Color intensity",
                        "Hue",
                        "OD280/OD315 of diluted wines",
                        "Proline",
                        class
                    )
                    VALUES (
                        ${row["Alcohol"]},
                        ${row["Malic acid"]},
                        ${row["Ash"]},
                        ${row["Alcalinity of ash"]},
                        ${row["Magnesium"]},
                        ${row["Total phenols"]},
                        ${row["Flavanoids"]},
                        ${row["Nonflavanoid phenols"]},
                        ${row["Proanthocyanins"]},
                        ${row["Color intensity"]},
                        ${row["Hue"]},
                        ${row["OD280/OD315 of diluted wines"]},
                        ${row["Proline"]},
                        ${row["class"]}
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
    await seedWineData(client);
    await client.end();
}
  
main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});