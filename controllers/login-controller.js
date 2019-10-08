const encrypt = require("../crypto")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let db, col;
(async () => {
    try {
        db = await require("../dbConfig")();
        col = await db.collection("users");
    } catch (error) {
        Console.log(error);
    }
})();

module.exports = {
    create: (req, res) => {
        res.render('register', {
            date: Date.now(),
            title: "Registration"
        });
    },
    store: async (req, res) => {
        try {
            const hashPass = await encrypt(req.body.password);
            const user = {
                email: req.body.email,
                password: hashPass,
                date: req.body.date
            };
            const exist = await col.findOne({email:user.email});
            if (!exist) {
                await col.insertOne(user);
                res.redirect('/login');
            } else {
                res.redirect('/register?useralreadyexists');
            }
        } catch (error) {
            res.redirect('/register?errormakinguser');
        }
    },
    login: (req, res) => {
        res.render('login', {
            title: "login"
        });
    },
    check: async (req, res) => {
        const mail = req.body.email;
        const password = req.body.password;
        try {
            const user = await col.findOne({
                "email": mail
            });
            const cUser = {
                email: user.email,
                date: user.date
            }
            const result = await bcrypt.compare(password, user.password);
            const token = jwt.sign(cUser, process.env.secret, {
                expiresIn: 120
            });
            //req.user = cUser;
            req.token = token;
            if (result) {
                res.cookie("token", req.token, {
                    httpOnly: true,
                    sameSite: "lax"
                });
                res.redirect('/quotes');
            } else {
                res.redirect("/login?mes=wrong username or password");
            }
        } catch (error) {
            res.redirect("/login?mes=no user found")
        }

    }
}