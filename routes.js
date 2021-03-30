module.exports = (app, passport) => {

    //routes
    app.get('/', (req, res) => { res.render("index")})
    // app.get('/news', (req, res) => { res.render("news")})
    app.get('/bai-hat-moi/:p', (req, res) => { res.render("index")})
    app.get('/tim-kiem/:k/:p', (req, res) => {res.render("index")})
    app.get('/bai-hat/:n', (req, res) => {res.render("index")})

    app.get('/video/:k', (req, res) => {res.render("index")})

    //api
    let apiSong = require("./api/song");
    apiSong(app);

    let apiUser = require("./api/user");
    apiUser(app);


    //default - error page
    app.get('/*', function(req, res) {
        res.render("error")
        // res.redirect('/');
    });
};