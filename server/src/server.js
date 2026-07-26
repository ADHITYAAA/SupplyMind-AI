import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log("======================================");
    console.log("🚀 SupplyMind AI Backend Started");
    console.log(`🌐 Server : http://localhost:${PORT}`);
    console.log(`📦 Environment : ${process.env.NODE_ENV}`);
    console.log("======================================");
});