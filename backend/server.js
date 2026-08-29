const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const subscriptionRoutes = require("./routes/subscriptions");
const authRoutes = require("./routes/auth");
const settingsRoutes = require("./routes/settings");
const invoiceRoutes = require("./routes/invoices");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SaaS Guardian backend is running",
  });
});

// API Routes
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/invoices", invoiceRoutes);

// MongoDB
const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Error:",
      error
    );
  }
}

connectDB();

// Serve uploaded invoice files
app.use(
  "/uploads",
  express.static("uploads")
);

// Test route
app.get("/", (req, res) => {
  res.status(200).send(
    "SaaS Guardian Backend Running 🚀"
  );
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port ${PORT}`
  );
});