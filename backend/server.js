import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import staffRoutes from "./routes/staffRoutes.js";
import staffImportRoutes from "./routes/staffImportRoutes.js";
import cloudinary from "./config/cloudinary.js";

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/staff", staffRoutes);
app.use("/api/staff", staffImportRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("PSSDC HRMIS API is running");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    );
    res.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});