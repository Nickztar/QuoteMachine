const quotes = require("../controllers/quotes-controller");
const tokenVerification = require("../middleware/tokenVerification");
const adminVerification = require("../middleware/adminVerification");
module.exports = (app) => {
    app.get('/', quotes.home);
    app.get('/quotes', quotes.index);
    app.get('/quotes/delete/:id',adminVerification, quotes.destroy);
    app.get('/quotes/create',adminVerification, quotes.create);
    app.post('/quotes/create',adminVerification, quotes.store);
    app.get('/quotes/show', quotes.show);
    app.get('/quotes/edit/:id',adminVerification, quotes.edit);
    app.post('/quotes/update/',adminVerification, quotes.update);
}