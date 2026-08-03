import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import testNeo4jConnection from "./modules/graph/config/testNeo4jConnection.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {

    try {

        /*
        =====================================
        Connect MongoDB
        =====================================
        */

        await connectDB();

        /*
        =====================================
        Connect Neo4j
        =====================================
        */

        await testNeo4jConnection();

        /*
        =====================================
        Start Express Server
        =====================================
        */

        app.listen(PORT, () => {

            console.log("======================================");
            console.log("🚀 SupplyMind AI Backend Started");
            console.log(`🌐 Server : http://localhost:${PORT}`);
            console.log(`📦 Environment : ${process.env.NODE_ENV}`);
            console.log("======================================");

        });

    }

    catch (error) {

        console.error("======================================");
        console.error("❌ Failed to start server");
        console.error(error);
        console.error("======================================");

        process.exit(1);

    }

};

startServer();