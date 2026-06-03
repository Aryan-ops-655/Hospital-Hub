import hospitalModel from "../Models/hospitalModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login Hospital
const loginHospital = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hospital = await hospitalModel.findOne({ email });

    if (!hospital) {
      return res.json({ success: false, message: "Hospital doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(hospital._id);
    res.json({ success: true, token, hospital: { name: hospital.name, id: hospital._id } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in Login" });
  }
};

// Register Hospital
const registerHospital = async (req, res) => {
  const { name, email, password, address, contact, licenseNumber, latitude, longitude } = req.body;
  try {
    // Check if hospital already exists
    const exists = await hospitalModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Hospital already exists" });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
    }

    // Hashing hospital password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newHospital = new hospitalModel({
      name,
      email,
      password: hashedPassword,
      address,
      contact,
      licenseNumber,
      latitude: Number(latitude) || 0,
      longitude: Number(longitude) || 0,
    });

    const hospital = await newHospital.save();
    const token = createToken(hospital._id);

    res.json({ success: true, token, hospital: { name: hospital.name, id: hospital._id } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in Registration" });
  }
};

export { loginHospital, registerHospital };
