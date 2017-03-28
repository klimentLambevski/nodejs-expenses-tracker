const Joi = require('joi');

const selfValidation = {
    update: Joi.object().keys({
        lastName: Joi.string().required(),
        name: Joi.string().required(),
        workingHoursFrom: Joi.number().min(0).max(23).less(Joi.ref('workingHoursTo')).optional(),
        workingHoursTo: Joi.number().min(1).max(24).optional()
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