const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

let collection = null;

async function getSubscriptionsCollection() {
  if (!collection) {
    await client.connect();

    const db = client.db("saasguardian");

    collection = db.collection("subscriptions");

    console.log("✅ Connected to subscriptions collection");
  }

  return collection;
}

module.exports = getSubscriptionsCollection;