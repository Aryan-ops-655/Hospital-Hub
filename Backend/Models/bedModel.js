import mongoose from "mongoose";

const bedSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    type: { type: String, required: true }, // e.g., ICU, General, Ventilator, COVID
    totalUnits: { type: Number, required: true },
    availableUnits: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Available" },
  },
  { timestamps: true }
);

const bedModel = mongoose.models.Bed || mongoose.model("Bed", bedSchema);

export default bedModel;
