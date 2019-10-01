const objectId = require("mongodb").ObjectID;
const path = require("path");
let db, col;
(async () => {
    try {
        db = await require("../dbConfig")();
        col = await db.collection("quotes");
    } catch (error) {
        Console.log(error);
    }

})();

module.exports = {
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
            let data = await col.findOne({
                "_id": objectId(req.params.id)
            });
            res.render('show', {
                val: [data],
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
        res.render('create', {date: Date.now(), title:"Create new quote"});
    },
    store: async (req, res) => {
        try {
            const obj = {
                ...req.body,
                timestamp: Date.now()
            }
            await col.insertOne(obj);
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
                timestamp: Date.now()
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