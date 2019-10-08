const jwt = require("jsonwebtoken");

async function verification(req, res, next){
    try {
        await jwt.verify(req.cookies.token, process.env.secret);
        next();
    } catch (error) {
        res.redirect('/login');
    }   
}

module.exports = (verification);