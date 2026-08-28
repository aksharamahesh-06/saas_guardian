const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getInvoicesCollection = require("../models/Invoice");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Make sure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File validation
const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, JPG and PNG files are allowed"
        )
      );
    }
  },
});

// UPLOAD INVOICE
router.post(
  "/upload",
  authMiddleware,
  (req, res) => {
    upload.single("invoice")(req, res, async (error) => {
      try {
        // Multer error
        if (error) {
          console.error(
            "MULTER ERROR:",
            error
          );

          return res.status(400).json({
            message:
              error.message ||
              "Invoice upload failed",
          });
        }

        if (!req.file) {
          return res.status(400).json({
            message:
              "Please upload an invoice file",
          });
        }

        const collection =
          await getInvoicesCollection();

        const invoice = {
          userId: req.user.id,

          originalName:
            req.file.originalname,

          fileName:
            req.file.filename,

          filePath:
            req.file.path,

          fileType:
            req.file.mimetype,

          fileSize:
            req.file.size,

          uploadedAt: new Date(),

          status: "Uploaded",
        };

        const result =
          await collection.insertOne(invoice);

        res.status(201).json({
          message:
            "Invoice uploaded successfully",

          invoice: {
            _id: result.insertedId,
            ...invoice,
          },
        });
      } catch (error) {
        console.error(
          "INVOICE UPLOAD ERROR:",
          error
        );

        res.status(500).json({
          message:
            "Error uploading invoice",
        });
      }
    });
  }
);

// GET USER INVOICES
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const collection =
        await getInvoicesCollection();

      const invoices = await collection
        .find({
          userId: req.user.id,
        })
        .sort({
          uploadedAt: -1,
        })
        .toArray();

      res.status(200).json(invoices);
    } catch (error) {
      console.error(
        "GET INVOICES ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Error fetching invoices",
      });
    }
  }
);

module.exports = router;