import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    // ======================
    // PERSONAL INFORMATION
    // ======================
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
    middleName: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    passportPhoto: {
      type: String, // Cloudinary URL
    },

    // ======================
    // EMPLOYMENT DETAILS
    // ======================
    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    officialEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
    },
    jobTitle: {
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
      enum: ["Permanent", "Temporary", "Fixed-Term Contract", "Expatriate", "Others"],
    },
    previousEmployment: {
      type: String,
    },
    dateOfFirstAppointment: {
      type: Date,
    },
    confirmationDate: {
      type: Date,
    },
    lastPromotionDate: {
      type: Date,
    },
    nextPromotionEligibilityDate: {
      type: Date,
    },

    // ======================
    // CONTACT DETAILS
    // ======================
    alternativeEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
    },
    residentialAddress: {
      type: String,
    },
    residentialLGA: {
      type: String,
    },

    // ======================
    // NEXT OF KIN
    // ======================
    nextOfKin: {
      name: String,
      relationship: String,
      phoneNumber: String,
      address: String,
    },

    // ======================
    // EDUCATION & TRAINING
    // ======================
    education: {
      academicQualification: String,
      institution: String,
      yearOfGraduation: String,
    },
    professionalAssociations: [
      {
        type: String,
      },
    ],
    recentTrainings: [
      {
        type: String,
      },
    ],

    // ======================
    // DOCUMENT UPLOADS
    // ======================
    documents: {
      appointmentLetter: String,
      confirmationLetter: String,
    },

    // ======================
    // STAFF STATUS
    // ======================
    status: {
      type: String,
      enum: [
        "Active",
        "On Leave",
        "Retired",
        "Suspended",
        "Seconded",
        "Deceased",
        "Deactivated",
      ],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
