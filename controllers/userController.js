const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createJWT = ( res, _id) => { //Function creating JWTs
    const token = jwt.sign({ _id }, process.env.SECRET, { 
        expiresIn: "7d" 
    });

    // Cookie
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    res.cookie('jwt', token, { 
        httpOnly: true,
        sameSite: "Strict",
        path: "/",
        expires: expirationDate
    });
}

// Signup user
const user_signup = async (req, res) => {
    const { 
        username, 
        email, 
        password 
    } = req.body;

    try{
        // If email exists
        const exists = await User.findOne({ email });
        if(exists){
            throw Error("User already exists");
        }

        const user = await User.create({ 
            username, 
            email, 
            password 
        });
        createJWT(res, user._id);

        if(user){
            res.status(200).json({ 
                username,
                email 
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

            res.status(201).json({ email });
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