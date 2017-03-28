const jwt = require("jwt-simple");
const authConfig = require('../../config/auth');
const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


const methods = {
    login(req, res) {
        const {error, value} = Joi.validate(req.body, schema);
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;

            let user = {
                id: 1
            };
            if (user) {
                let payload = {
                    id: user.id
                };
                let token = jwt.encode(payload, authConfig.jwt.jwtSecret);
                res.json({
                    token: token
                });
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }
};


module.exports = {
    methods
};