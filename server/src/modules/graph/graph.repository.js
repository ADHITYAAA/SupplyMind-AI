import { getDriver } from "./config/neo4j.js";

class GraphRepository {

    async execute(query, parameters = {}) {

        console.log("\n====== GRAPH REPOSITORY ======");
        console.log(query);
        console.log(parameters);

        const driver = getDriver();

        const session = driver.session({

            database: process.env.NEO4J_DATABASE

        });

        try {

            const result = await session.run(

                query,

                parameters

            );

            console.log("Cypher Executed Successfully");

            return result;

        }

        catch(error){

            console.error(error);

            throw error;

        }

        finally {

            await session.close();

        }

    }

}

export default new GraphRepository();