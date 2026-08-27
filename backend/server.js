const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const subscriptionRoutes = require("./routes/subscriptions");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/subscriptions", subscriptionRoutes);

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("SaaS Guardian Backend Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});