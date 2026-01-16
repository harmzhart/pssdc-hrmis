import Staff from "../models/Staff.js";
import XLSX from "xlsx";

export const importStaffFromExcel = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    let imported = 0;
    let skipped = 0;

    for (const row of data) {
      if (!row.staffId || !row.lastName) {
        skipped++;
        continue;
      }

      const exists = await Staff.findOne({ staffId: row.staffId });
      if (exists) {
        skipped++;
        continue;
      }

      await Staff.create(row);
      imported++;
    }

    res.status(200).json({
      message: "Import completed",
      imported,
      skipped,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
