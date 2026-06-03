import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    userId: { type: String, required: true }, // For now, simple string if user registration isn't implemented
    userName: { type: String, required: true },
    userContact: { type: String, required: true },
    serviceType: { type: String, required: true, enum: ["Bed", "Blood", "Test", "Ambulance"] },
    details: { type: Object, required: true }, // e.g., { bloodGroup: "A+", units: 2 } or { bedType: "ICU" }
    status: { type: String, default: "Pending", enum: ["Pending", "Accepted", "Rejected", "Completed"] },
    requestDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const requestModel = mongoose.models.Request || mongoose.model("Request", requestSchema);

export default requestModel;
