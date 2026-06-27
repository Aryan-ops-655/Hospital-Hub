import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    // Basic Information
    fullName: { type: String, required: true, trim: true },
    fees: { type: String, default: 99 },
    profilePhoto: { type: String, default: "" }, //URL
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
    // Professional Information
    specialization: { type: String, required: true },
    superSpecialization: { type: String, default: "" },
    qualifications: [{ degree: String, institute: String, year: Number }],
    yearsOfExperience: { type: Number, default: 0 },
    medicalRegistrationNumber: { type: String, required: true, unique: true },
    registrationCouncil: { type: String },
    licenseValidity: { type: Date },
    languagesKnown: [String],
    biography: { type: String, maxlength: 1000 },

    // Hospital Associations
    hospitals: [
      {
        hospitalId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hospital",
        },
        department: String,
        designation: String,
        joiningDate: Date,
        activeStatus: {
          type: Boolean,
          default: true,
        },
      },
    ],

    // Availability
    consultationType: {
      type: String,
      enum: ["Physical", "Online", "Both"],
      default: "Physical",
    },

    availability: [
      {
        day: String, // Monday, Tuesday, etc.
        startTime: String,
        endTime: String,
      },
    ],

    emergencyDuty: {
      type: Boolean,
      default: false,
    },

    appointmentRequired: {
      type: Boolean,
      default: true,
    },

    averageConsultationDuration: {
      type: Number, // in minutes
      default: 15,
    },

    //Emergency capabilities
    emergencyCapabilities: {
      traumaCare: {
        type: Boolean,
        default: false,
      },
      criticalCare: {
        type: Boolean,
        default: false,
      },
      strokeManagement: {
        type: Boolean,
        default: false,
      },
      cardiacEmergency: {
        type: Boolean,
        default: false,
      },
      ventilatorManagement: {
        type: Boolean,
        default: false,
      },
    },

    // Metrics
    totalPatientsTreated: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationDate: Date,

    profileStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // Account Information
    accountStatus: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const doctorModel =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default doctorModel;
