const User = require("../models/userModel");
const createJWT = require("../utils/generateJWT");

// Signup user
const user_signup = async (req, res) => {
    const {email} = req.body;
    try{
        // If email exists
        let user = await User.findOne({ email });
        if(user){
            throw Error("User already exists");
        }

        user = await User.create({...req.body});
        createJWT(res, user._id);

        if(user){
            res.status(200).json({ 
                email: user.email,
                username: user.username
            });
        }else{
            res.status(400);
            throw Error("Invalid credentials");
        }
    }
    catch(error){
        res.status(400).json({ 
            error: error.message 
        });
    }
};

// Login user
const user_login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });

        if(user && (await user.compare(password))){
            createJWT(res, user._id);

            res.status(201)
            .json({ email: user.email });
        }else{
            res.status(401)
            .json({ 
                error: "Invalid email or password"
             });
        }
    }
    catch(error){
        res.status(400).json({ 
            error: error.message 
        });
    }
};

const user_logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        msg: "User logged out"
    })
}

module.exports = {
    user_signup,
    user_login,
    user_logout
}