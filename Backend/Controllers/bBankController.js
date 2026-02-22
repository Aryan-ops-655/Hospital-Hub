import { BloodBank } from '../Models/bBankModel.js';



//Add blood
const addBlood = async(req , res) => {
    const blood = new BloodBank({
        component: req.body.component,
        blood_group: req.body.group,
        units: req.body.units,
        stock_status: req.body.status, 
        donated_date: req.body.collected,
        expiry_date: req.body.expiry,
    })
    try {
        await blood.save();
        res.json({
            success:true,
            message:"Blood Added"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Blood not Added error "
        })
    }
}


export {addBlood}