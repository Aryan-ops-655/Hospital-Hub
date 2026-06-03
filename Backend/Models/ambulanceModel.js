import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    type: { type: String, required: true }, // e.g., Basic, Advanced, Cardiac
    contact: { type: String, required: true },
    pricePerKm: { type: Number, required: true },
    status: { type: String, default: "Available" }, // Available, Busy
    vehicleNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const ambulanceModel = mongoose.models.Ambulance || mongoose.model("Ambulance", ambulanceSchema);

export default ambulanceModel;
