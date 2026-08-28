const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

let usersCollection = null;

async function getUsersCollection() {
  if (!usersCollection) {
    await client.connect();

    const db = client.db("saasguardian");

    usersCollection = db.collection("users");

    console.log("✅ Connected to users collection");
  }

  return usersCollection;
}

module.exports = getUsersCollection;