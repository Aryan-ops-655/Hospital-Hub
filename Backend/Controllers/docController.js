import doctorModel from "../Models/doctorModel.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import "dotenv/config";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//doctor login
const loginDoc = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bycrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(doctor._id);
    res.json({success:true, token, doctor:{name:doctor.fullName, email:doctor.email, id:doctor._id}});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in Login" });
  }
};


//register doctor
const registerDoctor = async(req, res)=>{
  const { fullName, email, password, phoneNumber, gender, medicalRegistrationNumber, address, specialization, superSpecialization, qualifications, yearsOfExperience, } = req.body;
  try {
    const exist = await doctorModel.findOne({email});
    if(exist){
      return res.json({sucess: false, message: "User already exists"});
    }

    //validation
    if(!validator.isEmail(email)){
      return res.json({success: false, message: "Please enter a strong password (min 8 character)"});
    }

    //hashing 
    const salt =  await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password,salt);

    // Create doctor 
    const newDoctor = new doctorModel({ 
      fullName, 
      email, 
      password: hashedPassword, 
      phoneNumber, 
      gender, 
      medicalRegistrationNumber, 
      address, 
      specialization, 
      superSpecialization, 
      qualifications, 
      yearsOfExperience 
    });

    const doctor = await newDoctor.save();
    const token = createToken(doctor._id);

    res.json({ success: true, 
      message: "Doctor registered successfully", 
      token, 
      doctor: { 
        id: doctor._id, 
        fullName: doctor.fullName, 
        email: doctor.email, 
        specialization: doctor.specialization, 
        medicalRegistrationNumber: doctor.medicalRegistrationNumber 
      }
     });

  } catch (error) {
    console.log(error);
    res.json({success: false, message:"Error in Registration"});
  }
}

export { loginDoc, registerDoctor};