const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

let settingsCollection = null;

async function getSettingsCollection() {
  if (!settingsCollection) {
    await client.connect();

    const db = client.db("saasguardian");

    settingsCollection = db.collection("settings");

    console.log("✅ Connected to settings collection");
  }

  return settingsCollection;
}

module.exports = getSettingsCollection;