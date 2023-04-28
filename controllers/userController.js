const User = require("../models/userModel");

const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createJWT = ( _id) => { //Function creating JWTs
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" })
}

const user_signup = async (req, res) => {
    const { email, password } = req.body;

    try{
        if(!email || !password){
            throw Error("Fill in all fields");
        }
        if(!validator.isEmail(email)){
            throw Error("Invalid email address");
        }
        if(!validator.isStrongPassword(password)){
            throw Error("Password is not strong enough");
        }

        // If email exists
        const exists = await User.findOne({ email });
        if(exists){
            throw Error("Email address already exists");
        }
        

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt); //Hashing salt with password

        const user = await User.create({ email, password: hash });

        const token = createJWT(user._id); //Creating token
        res.status(200).json({ email, token });
    }
    catch(error){
        res.status(400).json(error);
    }
};

const user_login = async (req, res) => {
    const { email, password } = req.body;

    try{
        if(!email || !password){
            throw Error("Fill in all fields");
        }

        const user = await User.findOne({ email });
        if(!user){
            throw Error("Invalid email address");
        }

        const compare = await bcrypt.compare(password, user.password); //Comparing passwords
        if(!compare){
            throw Error("Invalid password, try again");
        }

        const token = createJWT(user._id);
        res.status(200).json({email, token});
    }
    catch(error){
        res.status(400).json(error);
    }
};

module.exports = {
    user_login,
    user_signup
}