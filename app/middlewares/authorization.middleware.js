const _ = require('lodash');

module.exports = (roles) => {
    return (req, res, next) => {
        if(req.user && _.findIndex(roles, role => role === req.user.role) > -1) {
            next();
        } else {
            res.sendStatus(401);
        }
    }
};