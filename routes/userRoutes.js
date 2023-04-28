const express = require("express");
const router = express.Router();

// Controllers
const {
    user_signup,
    user_login
} = require("../controllers/userController")

// Routes
router.post("/signup", user_signup);

router.post("/login", user_login);

module.exports = router;

