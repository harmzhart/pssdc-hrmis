import Staff from "../models/Staff.js";

// ==========================
// CREATE STAFF (ADMIN)
// ==========================
export const createStaff = async (req, res) => {
  try {
    const staffExists = await Staff.findOne({ staffId: req.body.staffId });

    if (staffExists) {
      return res.status(400).json({ message: "Staff ID already exists" });
    }

    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// GET ALL STAFF (TABLE VIEW)
// ==========================
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// GET SINGLE STAFF (PROFILE)
// ==========================
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// UPDATE STAFF (ADMIN EDIT)
// ==========================
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// DEACTIVATE STAFF (SAFE DELETE)
// ==========================
export const deactivateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    staff.isActive = false;
    await staff.save();

    res.status(200).json({ message: "Staff deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
