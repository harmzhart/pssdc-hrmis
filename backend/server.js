import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import staffRoutes from "./routes/staffRoutes.js";
import importRoutes from "./routes/importRoutes.js";
import cloudinary from "./config/cloudinary.js";

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/staff", staffRoutes);
app.use("/api/import", importRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("PSSDC HRMIS API is running");
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