require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Allow multiple origins (localhost + Vercel frontend from env vars)
const whitelist = [
  "http://localhost:5173",          // Dev frontend
  process.env.CLIENT_URL            // Prod frontend (set this in Render → Environment Vars)
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);       // Allow Postman / curl with no origin
    if (whitelist.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true,
}));

// ✅ MongoDB connection
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let infosCollection = null;

async function startServer() {
  try {
    await client.connect();
    const db = client.db("Paypal");
    infosCollection = db.collection("infos");
    console.log("✅ Connected to MongoDB (Paypal/infos)");

    // ✅ Root route to avoid "Cannot GET /"
    app.get("/", (req, res) => {
      res.send("Backend is running 🚀 | Try GET /api/healthz");
    });

    // ✅ Health check route
    app.get("/api/healthz", (req, res) => res.json({ ok: true }));

    // ✅ API: Save info
    app.post("/api/infos", async (req, res) => {
      if (!infosCollection) return res.status(503).json({ message: "DB not ready" });
      try {
        const result = await infosCollection.insertOne(req.body);
        res.status(201).json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // ✅ 404 fallback (optional but clean)
    app.use((req, res) => {
      res.status(404).json({ message: "Route not found" });
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
