let express = require("express")
let app = express();
let port = process.env.PORT || 7000;
let passport = require('passport');
let flash = require('connect-flash');

let cookieParser = require('cookie-parser');
let session = require('express-session');

var morgan = require("morgan");
app.use(morgan("dev"));
app.set("view engine", "ejs");

let bodyParser = require("body-parser");
app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(session({secret: 'ilovescodetheworld'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes.js')(app, passport);



const server = app.listen(port, () => {
    console.log(`Run success in port ${port}`)
});