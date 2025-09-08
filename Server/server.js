// Don't forget to change proxy back when deploying
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Vite dev server
    credentials: true,               // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

const client = new MongoClient(process.env.MONGO_URI);
let infosCollection;

async function connectDB() {
    try {
        await client.connect();
        const db = client.db("Paypal");
        infosCollection = db.collection("infos");
        console.log("✅ Connected to MongoDB (Paypal/infos)");
    } catch (err) {
        console.error("❌ DB connection error:", err);
        process.exit(1);
    }
}
connectDB();

app.get("/api/healthz", (req, res) => {
    res.json({ ok: true });
});


app.post("/api/infos", async (req, res) => {
    try {
        const result = await infosCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
