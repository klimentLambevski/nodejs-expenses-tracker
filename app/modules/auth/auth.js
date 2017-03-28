const passport = require("passport");
const passportJWT = require("passport-jwt");
const {jwt} = require("../../config/auth");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const {User} = require('../../models');

const params = {
    secretOrKey: jwt.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};


module.exports = function() {
    const strategy = new Strategy(params, function(payload, done) {
        User.findById(payload.id).then((user) => {
            if(user) {
                done(null, user);
            } else {
                done(null, false, {message: 'User not found'})
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", jwt.jwtSession);
        }
    };
};