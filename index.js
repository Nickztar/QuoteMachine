const express = require("express"); //Express import
const app = express(); //Express init
const cookieParser = require("cookie-parser");


app.use(cookieParser());
app.use(express.urlencoded({
    extended: false
})); //HTML encode
app.use(express.static(__dirname + "/public"));

require("./routes/quotes-routes")(app); //Routes init
require("./routes/login-routes")(app);
require("./routes/leaderboard-routes")(app);
//Views engine initialization
app.set("views", "./views");
app.set("view engine", "pug");
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("port 3000")
}); //Port setup