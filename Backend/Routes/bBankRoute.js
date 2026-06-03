import express from 'express'
import { addBlood, deleteBlood, listBlood, totalUnits, findId, findandUpdate } from '../Controllers/bBankController.js';

import authMiddleware from '../Middlewares/authMiddleware.js';

const bloodBankRouter = express.Router();


bloodBankRouter.post("/add", authMiddleware, addBlood)
bloodBankRouter.get("/blood", authMiddleware, listBlood)
bloodBankRouter.post("/remove", authMiddleware, deleteBlood)
bloodBankRouter.get("/totalUnits", authMiddleware, totalUnits)
bloodBankRouter.post("/find", authMiddleware, findId)
bloodBankRouter.post("/findandupdate", authMiddleware, findandUpdate)



export default bloodBankRouter;