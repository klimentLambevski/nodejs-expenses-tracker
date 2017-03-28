const Joi = require('joi');
const {User} = require('../../models');
const _ = require('lodash');


const usersValidation = {
    store: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        lastName: Joi.string().required(),
        name: Joi.string().required(),
        workingHoursFrom: Joi.number().min(0).max(23).less(Joi.ref('workingHoursTo')).optional(),
        workingHoursTo: Joi.number().min(1).max(24).optional()
    }),
    update: Joi.object().keys({
        role: Joi.any().valid('admin', 'manager', 'regular').required(),
        lastName: Joi.string().required(),
        name: Joi.string().required(),
        workingHoursFrom: Joi.number().min(0).max(23).less(Joi.ref('workingHoursTo')).optional(),
        workingHoursTo: Joi.number().min(1).max(24).optional()
    })
};


const usersMethods = {
    get(req, res) {
      User.findAll().then(users => {
          res.json(users);
      })
    },
    store(req, res) {
        User.create(req.body).then((user) => {
            res.json(user);
        })
    },
    update(req, res) {
        if(req.user.role !== 'admin' && _.findIndex(['manager', 'regular'], role => role === req.body.role) > -1) {
            User.findById(req.params.id).then((user) => {
                if(user) {
                    user.role = req.body.role;
                    user.save().then(() => {
                        res.json(user);
                    })
                } else {
                    res.sendStatus(401);
                }
            })
        } else {
            res.sendStatus(401);
        }
    }
};


module.exports = {
    usersMethods,
    usersValidation
};