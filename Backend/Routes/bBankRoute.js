import express from 'express'
import { addBlood, deleteBlood, listBlood } from '../Controllers/bBankController.js';

const bloodBankRouter = express.Router();


bloodBankRouter.post("/add",addBlood)
bloodBankRouter.get("/blood",listBlood)
bloodBankRouter.post("/remove",deleteBlood)


export default bloodBankRouter;