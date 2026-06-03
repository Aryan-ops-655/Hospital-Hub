import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    image: { type: String, default: "" },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const hospitalModel = mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema);

export default hospitalModel;
