import express from 'express'
import { addBlood } from '../Controllers/bBankController.js';

const bloodBankRouter = express.Router();


bloodBankRouter.post("/add",addBlood)


export default bloodBankRouter;