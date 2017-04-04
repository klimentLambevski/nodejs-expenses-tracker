const Joi = require('joi');
const {User} = require('../../models');
const _ = require('lodash');
const sequelize = require("sequelize");


const usersValidation = {
    store: Joi.object().keys({
        role: Joi.any().valid('admin', 'manager', 'regular').optional(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        password_repeat: Joi.string().required().valid(Joi.ref('password')),
        lastName: Joi.string().required(),
        name: Joi.string().required(),
        workingHoursFrom: Joi.number().min(0).max(23).less(Joi.ref('workingHoursTo')).optional(),
        workingHoursTo: Joi.number().min(1).max(24).optional()
    }),
    update: Joi.object().keys({
        role: Joi.any().valid('admin', 'manager', 'regular').optional(),
        lastName: Joi.string().required(),
        name: Joi.string().required(),
        workingHoursFrom: Joi.number().min(0).max(23).less(Joi.ref('workingHoursTo')).optional(),
        workingHoursTo: Joi.number().min(1).max(24).optional()
    })
};


const usersMethods = {
    get(req, res) {
        let options = {
            order: [
                ['createdAt', 'DESC']
            ]
        };

        if(req.user.role !== 'admin') {
            options = Object.assign(options, {
                where: {
                    role: {
                        $in: ['regular', 'manager']
                    }
                }
            });
        } else if(req.query.roles) {
            options = Object.assign(options, {
                where: {
                    role: {
                        $in: req.query.roles
                    }
                }
            });
        }

        User.findAll(options).then(users => {
            res.json(users);
        })
    },
    store(req, res) {
        if (req.user.role !== 'admin' && _.findIndex(['manager', 'regular'], role => role === req.body.role) === -1 && req.body.role) {
            res.sendStatus(401);
        } else {
            User.create(req.body).then((user) => {
                res.json(user);
            }, (err) => {
                if(err.name === 'SequelizeUniqueConstraintError') {
                    res.status(422).json([{message: 'Entered email already exist'}]);
                } else {
                    res.sendStatus(422)
                }
            })
        }

    },
    register(req, res) {
        User.create(req.body).then((user) => {
            res.json(user);
        }, (err) => {
            if(err.name === 'SequelizeUniqueConstraintError') {
                res.status(422).json([{message: 'Entered email already exist'}]);
            } else {
                res.sendStatus(422)
            }
        })
    },
    update(req, res) {
        if (req.user.role !== 'admin' && _.findIndex(['manager', 'regular'], role => role === req.body.role) === -1 && req.body.role) {
            res.sendStatus(401);
        } else {
            User.findById(req.params.id).then((user) => {
                if (user) {
                    user.update(req.body).then(u => {
                        res.json(u);
                    })
                } else {
                    res.sendStatus(401);
                }
            });
        }
    },
    delete(req, res) {
        User.findById(req.params.id).then((user) => {
            if (user) {
                user.destroy().then(u => {
                    res.json(user);
                })
            } else {
                res.status(422).json([{message: 'User not found'}]);
            }
        })
    }
};


module.exports = {
    usersMethods,
    usersValidation
};