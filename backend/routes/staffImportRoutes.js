import express from "express";
import { uploadExcel } from "../middleware/uploadExcel.js";
import { importStaffFromExcel } from "../controllers/staffImportController.js";

const router = express.Router();

router.post(
  "/import-excel",
  uploadExcel.single("file"),
  (req, res, next) => importStaffFromExcel(req, res).catch(next)
);

export default router;
