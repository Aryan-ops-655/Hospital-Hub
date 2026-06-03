import express from "express";
import { loginHospital, registerHospital } from "../Controllers/hospitalController.js";

const hospitalRouter = express.Router();

hospitalRouter.post("/register", registerHospital);
hospitalRouter.post("/login", loginHospital);

export default hospitalRouter;
