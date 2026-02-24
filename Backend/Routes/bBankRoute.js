import express from 'express'
import { addBlood, deleteBlood, listBlood, totalUnits } from '../Controllers/bBankController.js';

const bloodBankRouter = express.Router();


bloodBankRouter.post("/add",addBlood)
bloodBankRouter.get("/blood",listBlood)
bloodBankRouter.post("/remove",deleteBlood)
bloodBankRouter.get("/totalUnits",totalUnits)



export default bloodBankRouter;