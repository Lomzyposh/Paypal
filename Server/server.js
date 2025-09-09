require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
// Put your front-end URL in Render as CLIENT_URL (for dev it can be http://localhost:5173)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());

// Allow only the allowed origin(s). For dev you can keep localhost, for production set Vercel URL.
const whitelist = [CLIENT_URL];
app.use(cors({
    origin: (origin, cb) => {
        // allow non-browser requests (curl/postman) with no origin
        if (!origin) return cb(null, true);
        if (whitelist.includes(origin)) return cb(null, true);
        cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));

const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
});
let infosCollection = null;

async function startServer() {
    try {
        await client.connect();
        const db = client.db("Paypal");
        infosCollection = db.collection("infos");
        console.log("✅ Connected to MongoDB (Paypal/infos)");

        // Root route to avoid "Cannot GET /"
        app.get("/", (req, res) => {
            res.send("Backend is running. Try GET /api/healthz");
        });

        app.get("/api/healthz", (req, res) => res.json({ ok: true }));

        app.post("/api/infos", async (req, res) => {
            if (!infosCollection) return res.status(503).json({ message: "DB not ready" });
            try {
                const result = await infosCollection.insertOne(req.body);
                res.status(201).json(result);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ DB connection error:", err);
        process.exit(1);
    }
}

startServer();
