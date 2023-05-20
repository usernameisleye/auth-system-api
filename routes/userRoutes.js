const express = require("express");
const router = express.Router();

// Controllers
const {
    user_signup,
    user_login,
    user_logout
} = require("../controllers/userController")

// Routes
router
.route("/signup")
.post(user_signup)

router
.route("/login")
.post(user_login)

router
.route("/logout")
.post(user_logout)

module.exports = router;

