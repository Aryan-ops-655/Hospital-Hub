import mongoose  from "mongoose";
import { DB_NAME } from "../constant.js";
import 'dotenv/config'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB Connected...`)
        
    } catch (error) {
        console.log("MongoDB is not able to connect Error!!", error);
        process.exit(1);
    }
}

export default connectDB;