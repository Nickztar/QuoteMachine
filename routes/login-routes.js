const login = require("../controllers/login-controller");

module.exports = (app) => {
    app.get('/register', login.create);
    app.post('/register', login.store);
    app.get('/login', login.login);
    app.post('/login', login.check);
    app.get('/creditcard', )
}