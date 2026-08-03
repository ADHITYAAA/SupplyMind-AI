import { getDriver } from "./neo4j.js";

const testNeo4jConnection = async () => {
    const driver = getDriver();

    try {
        const serverInfo = await driver.getServerInfo();

        console.log("======================================");
        console.log("🟢 Neo4j Connected Successfully");
        console.log(`🌐 Address : ${serverInfo.address}`);
        console.log(`🛢️ Database : ${process.env.NEO4J_DATABASE}`);
        console.log("======================================");

    } catch (error) {

        console.error("======================================");
        console.error("❌ Neo4j Connection Failed");
        console.error(error.message);
        console.error("======================================");

    }
};

export default testNeo4jConnection;