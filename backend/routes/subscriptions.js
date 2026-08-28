const express = require("express");
const { ObjectId } = require("mongodb");

const getSubscriptionsCollection = require("../models/Subscription");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, cost, renewal, status } = req.body;

    if (!name || cost === undefined || !renewal) {
      return res.status(400).json({
        message: "Name, cost and renewal date are required",
      });
    }

    const collection = await getSubscriptionsCollection();

    const newSubscription = {
      userId: req.user.id,
      name,
      cost: Number(cost),
      renewal,
      status: status || "Active",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(
      newSubscription
    );

    res.status(201).json({
      message: "Subscription created successfully",
      subscription: {
        _id: result.insertedId,
        ...newSubscription,
      },
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);

    res.status(500).json({
      message: "Error saving subscription",
      error: error.message,
    });
  }
});

// READ
router.get("/", authMiddleware, async (req, res) => {
  try {
    const collection = await getSubscriptionsCollection();

    const subscriptions = await collection
      .find({
        userId: req.user.id,
      })
      .sort({ createdAt: -1 })
      .toArray();

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
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const collection =
        await getSubscriptionsCollection();

      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Invalid subscription ID",
        });
      }

      const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id),
        userId: req.user.id,
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: "Subscription not found",
        });
      }

      res.status(200).json({
        message: "Subscription deleted successfully",
      });
    } catch (error) {
      console.error("DELETE ERROR:", error);

      res.status(500).json({
        message: "Error deleting subscription",
        error: error.message,
      });
    }
  }
);

module.exports = router;