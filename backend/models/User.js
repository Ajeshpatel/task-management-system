const mongoose = require("mongoose"); // MongoDB ke sath schema define karne ke liye mongoose use karte hain
const bcrypt = require("bcryptjs"); // Password ko securely hash karne ke liye

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // ye field required hai
  },
  email: {
    type: String,
    required: true,
    unique: true, // email unique honi chahiye har user ke liye
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // timestamps se createdAt aur updatedAt automatic add hota hai

// Password ko save karne se pehle hash karne ke liye pre-hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // agar password already hashed hai, to skip karo

  const salt = await bcrypt.genSalt(10); // 10 rounds ka salt generate karo
  this.password = await bcrypt.hash(this.password, salt); // password hash karo
  next();
});

// Model banake export karna
const User = mongoose.model("User", userSchema);
module.exports = User;
