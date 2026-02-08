import express from "express";
import { loginAdmin, logoutAdmin, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", protect, getMe);

export default router;
