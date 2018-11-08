const passport = require('passport');
const facebbokStratagey = require('passport-facebook');



var fb_app_id = '1927796927306649';
var fb_app_secret = 'fe0682575af65b0820658729540b64ae';
var fb_options = {
    clientId: fb_app_id,
    clientSecret: fb_app_secret,
    callbackURL: 'https://localhost:3000/api/v1/users/auth/facebook/callback',
    profileFields: ['emails']
}
passport.use(new facebbokStratagey(fb_options, fb_callback));

var fb_callback = function (accessToken, refreshToken, profile, cb) {
    try {
        let total = {
            'accessToken': accessToken,
            'refreshToken': refreshToken,
            'profile': profile
        }
        console.log(total)
        cb(null, total)
    } catch(err) {
        console.log(err);
        cb(err, null)
    }
}

let fbauth = (req, res, next) => {
    passport.authenticate('facebook', (err, user, info) => {
        console.log(err, user, info)
        req.user = {user: user, info: info}
    });
    next()
}

module.exports = {
    fbauth: fbauth
}