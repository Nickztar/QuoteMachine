const leaderboard = require("../controllers/leaderboard-controller");

module.exports = (app) => {
    app.get('/leaderboard', leaderboard.index);
}