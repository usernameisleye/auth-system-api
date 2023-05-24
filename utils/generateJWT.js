const jwt = require("jsonwebtoken");
let SECRET = process.env.SECRET

const createJWT = ( res, _id) => { //Function creating JWTs
    const token = jwt.sign({ _id }, SECRET, { 
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

module.exports = createJWT;