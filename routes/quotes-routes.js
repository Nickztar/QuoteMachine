const quotes = require("../controllers/quotes-controller");

module.exports = (app) => {
    app.get('/', quotes.home);
    app.get('/quotes', quotes.index);
    app.get('/quotes/delete/:id', quotes.destroy);
    app.get('/quotes/create', quotes.create);
    app.post('/quotes/create', quotes.store);
    app.get('/quotes/:id', quotes.show);
    app.get('/quotes/edit/:id', quotes.edit);
    app.post('/quotes/update/', quotes.update);
}