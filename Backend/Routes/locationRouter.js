import express from 'express'
import { getCoordinates } from '../Controllers/locationController.js';

const locationRouter = express.Router();


locationRouter.post("/co",getCoordinates)


export default locationRouter;