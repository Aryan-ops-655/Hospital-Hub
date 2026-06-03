import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    name: { type: String, required: true }, // e.g., MRI, CT Scan, Blood Test
    price: { type: Number, required: true },
    description: { type: String },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const testModel = mongoose.models.Test || mongoose.model("Test", testSchema);

export default testModel;
