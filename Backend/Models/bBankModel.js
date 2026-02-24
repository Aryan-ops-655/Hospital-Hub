import mongoose, { Schema } from "mongoose";

const bloodBankSchema = new Schema(
    {
        component: String,
        blood_group: String,
        units: Number,
        stock_status: String, 
        donated_date: Date,
        expiry_date: Date,
    },{timestamps: true}
)


export const BloodBank = mongoose.models.BloodBank || mongoose.model("BloodBank", bloodBankSchema)  
