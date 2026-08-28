const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

let invoicesCollection = null;

async function getInvoicesCollection() {
  if (!invoicesCollection) {
    await client.connect();

    const db = client.db("saasguardian");

    invoicesCollection = db.collection("invoices");

    console.log("✅ Connected to invoices collection");
  }

  return invoicesCollection;
}

module.exports = getInvoicesCollection;