import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import Staff from "../models/Staff.js";
import { STAFF_FIELD_MAP } from "../utils/staffFieldMap.js";
import { setNestedValue, transformValue } from "../utils/importHelpers.js";

const deleteFileSafely = (filePath) => {
  try {
    const absolutePath = path.resolve(filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (err) {
    console.error("File cleanup failed:", err.message);
  }
};

export const importStaffFromExcel = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("File received:", req.file.path);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    if (!rows.length) {
      deleteFileSafely(req.file.path);
      return res.status(400).json({ message: "Excel file is empty" });
    }

    const REQUIRED_HEADERS = [
      "Unique Staff ID / Oracle Number",
      "First Name",
      "Last Name",
      "Official Email",
      "Department",
    ];

    const headers = Object.keys(rows[0]);
    const missingHeaders = REQUIRED_HEADERS.filter(
      (h) => !headers.includes(h)
    );

    if (missingHeaders.length > 0) {
      deleteFileSafely(req.file.path);
      return res.status(400).json({
        message: "Invalid Excel template",
        missingHeaders,
      });
    }

    for (const row of rows) {
      try {
        const staffData = {};

        for (const [formKey, schemaKey] of Object.entries(STAFF_FIELD_MAP)) {
          const rawValue = row[formKey];
          if (rawValue === undefined || rawValue === "") continue;

          const value = transformValue(schemaKey, rawValue);
          if (value === undefined) continue;

          setNestedValue(staffData, schemaKey, value);
        }

        if (!staffData.staffId) {
          skipped++;
          continue;
        }

        const existing = await Staff.findOne({
          staffId: staffData.staffId,
        });

        if (existing) {
          await Staff.updateOne(
            { staffId: staffData.staffId },
            staffData,
            { runValidators: true }
          );
          updated++;
        } else {
          await Staff.create(staffData);
          created++;
        }
      } catch (rowError) {
        console.error("Row import failed:", rowError.message);
        skipped++;
      }
    }

    deleteFileSafely(req.file.path);

    return res.status(200).json({
      message: "Staff import completed",
      created,
      updated,
      skipped,
      total: rows.length,
    });

  } catch (error) {
    deleteFileSafely(req.file.path);
    console.error("Import failed:", error.message);

    return res.status(500).json({
      message: "Import failed",
      error: error.message,
    });
  }
};
