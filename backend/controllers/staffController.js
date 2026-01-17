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
    const {
      search,
      department,
      status,
      gradeLevel,
      sortBy = "lastName",
      order = "asc",
    } = req.query;

    let query = {};

    // 🔍 SEARCH (Name, Staff ID, Email)
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { staffId: { $regex: search, $options: "i" } },
        { officialEmail: { $regex: search, $options: "i" } },
      ];
    }

    // 🎯 FILTERS
    if (department) query.department = department;
    if (status) query.status = status;
    if (gradeLevel) query.gradeLevel = gradeLevel;

    // 🔃 SORT
    const sortOrder = order === "desc" ? -1 : 1;
    const sortOptions = { [sortBy]: sortOrder };

    const staff = await Staff.find(query)
      .sort(sortOptions)

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff", error });
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
    res.status(500).json({ message: "Failed to fetch staff", error });
  }
};

// ==========================
// UPDATE STAFF (ADMIN EDIT)
// ==========================
export const updateStaff = async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: "Failed to update staff", error });
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

    staff.status = "Deactivated";
    await staff.save();

    res.status(200).json({ message: "Staff deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
