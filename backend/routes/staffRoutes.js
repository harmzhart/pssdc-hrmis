import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deactivateStaff,
} from "../controllers/staffController.js";

const router = express.Router();

router.post("/", protect, upload.single("passportPhoto"), createStaff);
router.get("/", protect, getAllStaff);
router.get("/:id", protect, getStaffById);
router.put("/:id", protect, upload.single("passportPhoto"), updateStaff);
router.patch("/:id/deactivate", protect, deactivateStaff);

export default router;
