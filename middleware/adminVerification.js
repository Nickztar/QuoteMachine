const jwt = require("jsonwebtoken");

async function verification(req, res, next){
    try {
        await jwt.verify(req.cookies.token, process.env.secret);
        if(jwt.decode(req.cookies.token).admin){
            next();
        }
        else{
            throw "not admin";
        }
    } catch (error) {
        res.redirect('/login?AdminOnlyPage');
    }   
}

module.exports = (verification);