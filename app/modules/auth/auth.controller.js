const jwt = require("jwt-simple");
const authConfig = require('../../config/auth');
const Joi = require('joi');
const request = require("request");
const {User} = require('../../models');

const loginValidation = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    captcha: Joi.string().required()
});


const methods = {
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const captcha = req.body.captcha;

        User.findOne({where: {
            email: email
        }}).then((user) => {
            if(!user) {
                res.status(401).json([{
                    message: 'Username or password are not valid'
                }]);
            }
            else if(!user.activated) {
                res.status(401).json([{
                    message: 'Account has not been activated'
                }]);
            }
            else if(user.authenticate(password)) {
                request.post('https://www.google.com/recaptcha/api/siteverify', {
                    form:{
                        secret: '6LeH4CAUAAAAAL1KQcoMI-JIlkfJGPxpSLQ8ev_1',
                        response: captcha
                    }
                }, (err,httpResponse,body) => {
                    let b = JSON.parse(body);
                    if(b.success) {
                        let payload = {
                            id: user.id
                        };
                        let token = jwt.encode(payload, authConfig.jwt.jwtSecret);
                        res.json({
                            token: token
                        });

                    } else {
                        res.status(401).json([{
                            message: 'Please verify that you are not a robot'
                        }]);
                    }
                });

            } else {
                if(user.loginRetries >= 3) {
                    res.status(401).json([{
                        message: 'Too many login attempts. Please contact admin/manager in order to unblock your account'
                    }]);
                } else {
                    user.loginRetries ++;
                    user.save().then(_ => {
                        res.status(401).json([{
                            message: 'Username or password are not valid'
                        }]);
                    })
                }

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