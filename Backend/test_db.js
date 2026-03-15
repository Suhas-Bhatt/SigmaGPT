import mongoose from "mongoose";
import "dotenv/config";

const testDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Successfully connected to MongoDB!");
        process.exit(0);
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1);
    }
};

testDB();
