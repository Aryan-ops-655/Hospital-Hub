import express from "express";
import { loginDoc, registerDoctor } from "../Controllers/docController.js";

const doctorRouter = express.Router();

doctorRouter.post("/register", registerDoctor);
doctorRouter.post("/login", loginDoc);

export default doctorRouter;