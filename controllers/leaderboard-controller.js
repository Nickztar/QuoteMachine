let db, col;
(async () => {
    try {
        db = await require("../dbConfig")();
        col = await db.collection("scores");
    } catch (error) {
        Console.log(error);
    }
})();
module.exports = {
    index: async (req, res) => {
        try {
            const val = await col.find().sort({score: -1}).toArray();
            res.render('leaderboard', {
                val: val,
                title: "Leaderboard för robocop",
                leader: val[0].name
            });
        } catch (error) {
            res.send("Error finding qoutes")
        }

    }
}