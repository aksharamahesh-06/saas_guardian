const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const getSubscriptionsCollection = require("../models/Subscription");

// CREATE
router.post("/", async (req, res) => {
  try {
    const collection = await getSubscriptionsCollection();

    const result = await collection.insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error("CREATE ERROR:", error);

    res.status(500).json({
      message: "Error saving subscription",
      error: error.message,
    });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const collection = await getSubscriptionsCollection();

    const subscriptions = await collection.find({}).toArray();

    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("READ ERROR:", error);

    res.status(500).json({
      message: "Error fetching subscriptions",
      error: error.message,
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  console.log("================================");
  console.log("DELETE ROUTE HIT");
  console.log("ID RECEIVED:", req.params.id);
  console.log("================================");

  try {
    const collection = await getSubscriptionsCollection();

    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    console.log("DELETE RESULT:", result);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      message: "Subscription deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: "Error deleting subscription",
      error: error.message,
    });
  }
});

module.exports = router;