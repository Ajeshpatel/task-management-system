const express = require("express"); // Express Router banane ke liye
const { registerUser, loginUser } = require("../controllers/userController"); // Controller import
const router = express.Router(); // router object banaya
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser); // POST /api/users/register
router.post("/login", loginUser);       // POST /api/users/login

router.get("/me", protect, (req, res) => {
    res.json(req.user); // authenticated user ka data return karo
  });

module.exports = router; // export router
