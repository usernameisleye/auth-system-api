const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const chatAuthMiddleware = async (req, res, next) => {
    let token;

    // Retieving token from request cookies
    token = req.cookies.jwt;

    if(token){
        try{
            const { _id } = jwt.verify(token, process.env.SECRET);
    
            req.user = await User.findById( _id ).select("_id");
            next();
        }
        catch(error){
            res.status(401)
            .json({
                error: "Unauthorized request, Invalid token"
            });
        }
    }
    else{
        res.status(401)
        .json({
            error: "Unauthorized request, No token found"
        });
    }
}

module.exports = chatAuthMiddleware;