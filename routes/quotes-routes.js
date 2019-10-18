const quotes = require("../controllers/quotes-controller");
const tokenVerication = require("../middleware/tokenVerification");

module.exports = (app) => {
    app.get('/', quotes.home);
    app.get('/quotes', quotes.index);
    app.get('/quotes/delete/:id',tokenVerication, quotes.destroy);
    app.get('/quotes/create', quotes.create);
    app.post('/quotes/create', quotes.store);
    app.get('/quotes/show', quotes.show);
    app.get('/quotes/edit/:id',tokenVerication, quotes.edit);
    app.post('/quotes/update/',tokenVerication, quotes.update);
}