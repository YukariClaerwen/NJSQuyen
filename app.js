const express = require("express");
const app = express();
let port = 7000;

var morgan = require("morgan");
app.use(morgan("dev"));
app.set("view engine", "ejs");

let bodyParser = require("body-parser");
app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => { res.render("index")})
app.get('/news', (req, res) => { res.render("news")})
app.get('/vip', (req, res) => { res.render("vip")})

const server = app.listen(port, () => {
    console.log(`Run success in port ${port}`)
});