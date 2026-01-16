import express from "express";
import multer from "multer";
import { importStaffFromExcel } from "../controllers/importController.js";

const router = express.Router();
const upload = multer();

router.post("/staff", upload.single("file"), importStaffFromExcel);

export default router;
