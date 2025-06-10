const User = require("../models/User"); // User model import
const jwt = require("jsonwebtoken"); // JWT generate karne ke liye
const bcrypt = require("bcryptjs"); // Password compare karne ke liye

// JWT generate karne ka function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // 7 din tak token valid hoga
};

// @route   POST /api/users/register
// @desc    Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email }); // email se user already hai kya check karo
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password }); // naya user create karo

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id), // token return karo
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @route   POST /api/users/login
// @desc    Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // email se user find karo
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password); // password match karo
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // login successful token send
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { registerUser, loginUser };
