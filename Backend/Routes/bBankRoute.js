import express from 'express'
import { addBlood, deleteBlood, listBlood, totalUnits, findId, findandUpdate } from '../Controllers/bBankController.js';

const bloodBankRouter = express.Router();


bloodBankRouter.post("/add",addBlood)
bloodBankRouter.get("/blood",listBlood)
bloodBankRouter.post("/remove",deleteBlood)
bloodBankRouter.get("/totalUnits",totalUnits)
bloodBankRouter.post("/find",findId)
bloodBankRouter.post("/findandupdate",findandUpdate)



export default bloodBankRouter;