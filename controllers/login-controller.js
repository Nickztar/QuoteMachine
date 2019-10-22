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
                date: req.body.date,
                admin: false
            };
            const exist = await col.findOne({email:user.email});
            if (!exist) {
                await col.insertOne(user);
                res.redirect('/login');
            } else {
                res.redirect('/register?failed'); //user exists
            }
        } catch (error) {
            res.redirect('/register?failed'); //db error
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
                date: user.date,
                admin: user.admin
            }
            const result = await bcrypt.compare(password, user.password);
            const token = jwt.sign(cUser, process.env.secret, {
                expiresIn: 120
            });
            req.user = cUser;
            req.token = token;
            if (result) {
                res.cookie("token", req.token, {
                    httpOnly: true,
                    sameSite: "lax"
                });
                res.redirect('/quotes');
            } else {
                res.redirect("/login?failed"); //password fail
            }
        } catch (error) {
            res.redirect("/login?failed"); //email fail
        }

    }
}