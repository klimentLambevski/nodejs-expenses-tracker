const passport = require("passport");
const passportJWT = require("passport-jwt");
const {jwt} = require("../../config/auth");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: jwt.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};


module.exports = function() {
    const strategy = new Strategy(params, function(payload, done) {
        return done(null, {
            id: payload.id
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