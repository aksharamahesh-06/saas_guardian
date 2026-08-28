const express = require("express");

const getSettingsCollection = require("../models/Settings");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET SETTINGS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const collection = await getSettingsCollection();

    let settings = await collection.findOne({
      userId: req.user.id,
    });

    // Create default settings if none exist
    if (!settings) {
      settings = {
        userId: req.user.id,
        renewalReminders: true,
        monthlyReports: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await collection.insertOne(settings);
    }

    res.status(200).json({
      renewalReminders: settings.renewalReminders,
      monthlyReports: settings.monthlyReports,
    });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    res.status(500).json({
      message: "Error loading settings",
    });
  }
});

// UPDATE SETTINGS
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { renewalReminders, monthlyReports } = req.body;

    const collection = await getSettingsCollection();

    await collection.updateOne(
      {
        userId: req.user.id,
      },
      {
        $set: {
          renewalReminders:
            renewalReminders !== undefined
              ? Boolean(renewalReminders)
              : true,

          monthlyReports:
            monthlyReports !== undefined
              ? Boolean(monthlyReports)
              : true,

          updatedAt: new Date(),
        },

        $setOnInsert: {
          userId: req.user.id,
          createdAt: new Date(),
        },
      },
      {
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    res.status(500).json({
      message: "Error saving settings",
    });
  }
});

module.exports = router;