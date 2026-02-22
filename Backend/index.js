import 'dotenv/config';
import express from "express";
import cors from 'cors'
import connectDB from "./Database/db.js";
import bloodBankRouter from './Routes/bBankRoute.js';

const port = process.env.PORT || 5000;

//app config
const app = express()


//middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Database connection
connectDB();

//api endpoints
app.use("/api/bBank",bloodBankRouter)



app.get("/",(req, res) =>{
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`Server is working on: http://localhost:${port}`);
})