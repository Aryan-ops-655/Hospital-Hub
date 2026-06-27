import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import 'dotenv/config';

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login User 
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id); 
    res.json({ success: true, token, user: { name: user.name, email: user.email, id: user._id, contact: user.contact } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in Login" });
  }
};



// Register User
const registerUser = async (req, res) => {
  const { name, email, password, contact } = req.body;
  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      contact,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ 
      success: true,
      token,
      user: { name: user.name, email: user.email, id: user._id }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in Registration" });
  }
};

export { loginUser, registerUser };
