import multer from "multer";
import fs from "fs";

const uploadFolder = "uploads";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `staff-import-${Date.now()}.xlsx`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.originalname.endsWith(".xlsx")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .xlsx files are allowed"), false);
  }
};

export const uploadExcel = multer({
  storage,
  fileFilter,
});
