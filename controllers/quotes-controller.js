const objectId = require("mongodb").ObjectID;
let db, col;
class Quote {
    constructor(author, quote) {
        this.author = author;
        this.checkAuthor();
        this.quote = quote;
        this.timestamp = new Date().toLocaleString("de-DE", {timeZone:'Europe/Berlin'});
    }

    checkAuthor() {
        if (this.author.length < 4) {
            this.author = this.author + " - extra chars";
        }
    }
}
(async () => {
    try {
        db = await require("../dbConfig")();
        col = await db.collection("quotes");
    } catch (error) {
        Console.log(error);
    }

})();

module.exports = {
    home: (req, res) => {
        res.redirect("/quotes");
    },
    index: async (req, res) => {
        try {
            const data = await col.find().toArray();
            const val = data.reverse();
            res.render('quotes', {
                val: val,
                title: "List of quotes"
            });
        } catch (error) {
            res.send("Error finding qoutes")
        }

    },
    show: async (req, res) => {
        try {
            const author = req.params.author;
            const subStr = author.substr(0, 3);
            const arrD = await col.find({
                author: {$regex: subStr, $options: 'i'}
            }).toArray(); 
            const data = arrD.reverse();
            res.render('show', {
                val: data,
                title: "Specified quote"
            });

        } catch (error) {
            res.send("Error finding ID");
        }

    },
    destroy: async (req, res) => {
        try {
            await col.deleteOne({
                "_id": objectId(req.params.id)
            });
            res.redirect("/quotes");
        } catch (error) {
            res.redirect("/quotes");
        }
    },
    create: async (req, res) => {
        res.render('create', {
            date: new Date().toLocaleString("de-DE", {timeZone: 'Europe/Berlin'}),
            title: "Create new quote"
        });
    },
    store: async (req, res) => {
        try {
            const quote = new Quote(req.body.author, req.body.quote);
            await col.insertOne(quote);
            res.redirect('/quotes');
        } catch (err) {
            res.send("No quotes created");
        }
    },
    edit: async (req, res) => {
        try {
            const data = await col.findOne({
                "_id": objectId(req.params.id)
            });
            res.render('update', {
                author: data.author,
                quote: data.quote,
                _id: data._id,
                title: "Update a quote"
            });
        } catch (error) {
            res.redirect('/quotes');
        }

    },
    update: async (req, res) => {
        try {
            const dataBody = {
                author: req.body.author,
                quote: req.body.quote,
                timestamp: new Date().toLocaleString("de-DE", {timeZone: 'Europe/Berlin'})
            }
            await col.updateOne({
                "_id": objectId(req.body.id)
            }, {
                $set: dataBody
            });
            res.redirect('/quotes');
        } catch (error) {
            res.send("No thing was updated");
        }
    }
}