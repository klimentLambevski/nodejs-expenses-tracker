const Joi = require('joi');

const selfValidation = {
    update: Joi.object().keys({
        lastName: Joi.string().required(),
        name: Joi.string().required()
    })
};

const selfMethods = {
    get(req, res) {
        res.json(req.user);
    },
    update(req, res) {
        req.user.update(req.body).then(user => res.json(user));
    }
};

module.exports = {
    selfMethods,
    selfValidation
};