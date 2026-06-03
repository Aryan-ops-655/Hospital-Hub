import express from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
import {
    addBed, listBeds, updateBed, removeBed,
    addAmbulance, listAmbulances, updateAmbulance, removeAmbulance,
    addTest, listTests, updateTest, removeTest,
    searchServices
} from "../Controllers/serviceController.js";

const serviceRouter = express.Router();

// Public Geolocation Search
serviceRouter.get("/search", searchServices);

// Beds
serviceRouter.post("/add-bed", authMiddleware, addBed);
serviceRouter.get("/list-beds", authMiddleware, listBeds);
serviceRouter.post("/update-bed", authMiddleware, updateBed);
serviceRouter.post("/remove-bed", authMiddleware, removeBed);

// Ambulances
serviceRouter.post("/add-ambulance", authMiddleware, addAmbulance);
serviceRouter.get("/list-ambulances", authMiddleware, listAmbulances);
serviceRouter.post("/update-ambulance", authMiddleware, updateAmbulance);
serviceRouter.post("/remove-ambulance", authMiddleware, removeAmbulance);

// Tests
serviceRouter.post("/add-test", authMiddleware, addTest);
serviceRouter.get("/list-tests", authMiddleware, listTests);
serviceRouter.post("/update-test", authMiddleware, updateTest);
serviceRouter.post("/remove-test", authMiddleware, removeTest);

export default serviceRouter;
