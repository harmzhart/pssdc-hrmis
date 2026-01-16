import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    // =========================
    // PERSONAL INFORMATION
    // =========================
    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    otherNames: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
    },

    dateOfBirth: {
      type: Date,
    },

    maritalStatus: {
      type: String,
    },

    // =========================
    // EMPLOYMENT INFORMATION
    // =========================
    department: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
    },

    designation: {
      type: String,
    },

    gradeLevel: {
      type: String,
    },

    step: {
      type: String,
    },

    employmentType: {
      type: String,
      enum: ["Permanent", "Contract", "Temporary"],
      default: "Permanent",
    },

    dateOfFirstAppointment: {
      type: Date,
    },

    dateOfConfirmation: {
      type: Date,
    },

    currentPosting: {
      type: String,
    },

    // =========================
    // CONTACT INFORMATION
    // =========================
    phoneNumber: {
      type: String,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    residentialAddress: {
      type: String,
    },

    // =========================
    // IMAGE & DOCUMENTS
    // =========================
    profileImage: {
      type: String, // Cloudinary or image URL later
    },

    // =========================
    // SYSTEM STATUS
    // =========================
    isActive: {
      type: Boolean,
      default: true,
    },

    remarks: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
