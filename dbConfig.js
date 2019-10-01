//Mongo config
const conString = process.env.DBSTRING;
const mongo = require("mongodb").MongoClient;

module.exports = async () => {
    try {
        const con = await mongo.connect(conString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = await con.db("mongo-intro");
        return db;
    } catch (error) {
        process.exit();
    }
}