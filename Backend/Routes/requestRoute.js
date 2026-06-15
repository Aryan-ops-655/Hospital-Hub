import express from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
import { listRequests, updateRequestStatus, deleteRequest, createRequest, listUserRequests } from "../Controllers/requestController.js";

const requestRouter = express.Router();

requestRouter.get("/list", authMiddleware, listRequests);
requestRouter.post("/status", authMiddleware, updateRequestStatus);
requestRouter.post("/delete", authMiddleware, deleteRequest);

// User Booking Requests 
requestRouter.post("/add", createRequest);
requestRouter.get("/user-list", listUserRequests);

export default requestRouter;
