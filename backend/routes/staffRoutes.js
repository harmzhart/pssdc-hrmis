import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deactivateStaff,
} from "../controllers/staffController.js";

const router = express.Router();

router.post("/", upload.single("passportPhoto"), createStaff);              // Create staff
router.get("/", getAllStaff);                // List all staff
router.get("/:id", getStaffById);             // Single staff
router.put("/:id", upload.single("passportPhoto"), updateStaff);              // Update staff
router.patch("/:id/deactivate", deactivateStaff); // Deactivate staff

export default router;
