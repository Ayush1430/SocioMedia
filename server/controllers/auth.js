
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } =req.body ;
    //console.log(firstName);
    // console.log(firstName,
    //   lastName,
    //   email,
    //   password,
    //   picturePath,
    //   friends,
    //   location,
    //   occupation);
    var bcrypt=require('bcryptjs');
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    

    const newUser = new User({
      firstName,
      lastName,
      email,   
      password: passwordHash,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      savedUser
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(password);
    const user = await User.findOne({ email: email }).lean().exec();
    if (!user) return res.status(400).json({ success:false, message: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success:false, message: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ success:true, token, user });
  } catch (error) {
    res.status(500).json({ success:false, error:error.message });
  }
}
