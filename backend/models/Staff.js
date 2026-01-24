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
    nationality: {
      type: String,
      trim: true,
    },
    stateOfOrigin: {
      type: String,
      trim: true,
    },
    religion: {
      type: String,
      enum: ["Christianity", "Islam", "Traditional", "Others"],
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
    cadre: {
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
      enum: ["Permanent", "Temporary", "Fixed-Term Contract", "Expatriate", "National Youth Service (NYSC)", "Industrial Training (IT)", "Internship", "Others"],
    },
    employmentMode: {
      type: String,
      enum: ["Employed By PSSDC", "Deployed To PSSDC"],
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
    dateOfRetirement: {
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
    residentialWard: {
      type: String,
    },

    // ======================
    // MEDICAL/HEALTH DETAILS
    // ======================
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    genotype: {
      type: String,
      enum: ['AA', 'AS', 'AC', 'SS', 'SC'],
    },
    heightCm: {
      type: Number,
      min: 50,
      max: 250,
    },
    weightKg: {
      type: Number,
      min: 20,
      max: 300,
    },
    disability: {
      type: String,
      enum: ["None", "Hearing Impairment", "Learning Impairment", "Visual Impairment", "Physical Impairment", "Others"],
    },
    hasMedicalCondition: {
      type: Boolean,
      default: false,
    },

    medicalConditionDetail: {
      type: String,
      trim: true,
      maxlength: 200,
      required: function () {
        return this.hasMedicalCondition === true;
      },
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

      additionalQualifications: [
        {
          type: String,
        },
      ],
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
    // STAFF STATUS
    // ======================
    status: {
      type: String,
      enum: [
        "Active",
        "On Leave",
        "Retired",
        "Voluntarily Retired",
        "Withdrawn From Service",
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
