const jwt = require("jwt-simple");
const authConfig = require('../../config/auth');
const Joi = require('joi');
const {User} = require('../../models');

const loginValidation = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


const methods = {
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({where: {
            email: email
        }}).then((user) => {
            if(user &&  user.authenticate(password)) {
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
        });
    }
};


module.exports = {
    methods,
    validation: {
        login: loginValidation
    }
};