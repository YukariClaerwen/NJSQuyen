// let localStrategy = require('passport-local').Strategy;

module.exports = (app) => {
    app.post("/login", (req, res) => {
        let email = req.body.email;
        let pass = req.body.pass;
        if(email == "admin@gmail.com" && pass == "123456")
            res.json(1);
        else
            res.json(0);
    })
}

// module.exports = (passport) => {
//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     })

//     passport.deserializeUser((id, done) => {
//         User.findById(id, (err, user) => {
//             done(err, user);
//         })
//     })

//     passport.user('local-login', new localStrategy({
//         usernameField: 'email',
//         passwordField: 'passport',
//         passReqToCallback: true
//     }, (req, email, password, done) => {
//         User.findOne({'local.email': email}, (err, user) => {
//             if(err)
//                 return done(err);
//             if(!user)
//                 return done(null, false, req.flash('loginMessage', 'No user found.'));
//             if(!user.validPassword(password))
//                 return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
//             return done(null, user);
//         })
//     }))
// }