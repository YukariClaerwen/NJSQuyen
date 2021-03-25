var del = require('delete');

module.exports = (app) => {
    app.post("/login", (req, res) => {
        let email = req.body.email;
        let pass = req.body.pass;
        if(email == "admin@gmail.com" && pass == "123456"){
            req.session.user_id = email;
            res.json(1);
        }
        else
            res.json(0);
    })

    app.get('/logout', function (req, res) {
        delete req.session.user_id;
        // del.sync(['public/files/*.mp3']);
        res.json(0);
    }); 
}