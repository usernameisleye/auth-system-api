const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const chatAuthMiddleware = async (req, res, next) => {
    const { authorization } = req.headers; //Destructuring auth header from req

    if(!authorization){
        return res.status(401).json({error: "Authorization header is missing from the request"});
    };

    const token = authorization.split(" ")[1]; //Getting JWT token from auth string

    try{
        const{_id} = jwt.verify(token, process.env.SECRET); //Retriving payload

        req.user = await User.findOne({ _id }).select("_id"); //Storing _id in req user obj
        next();
    }
    catch(error){
        console.error(error);
        res.status(401).json({error: "Unauthorized request"})
    }
}

module.exports = chatAuthMiddleware;