const Joi = require('joi');
const {User} = require('../../models');
const _ = require('lodash');
const sequelize = require("sequelize");
const authConfig = require("../../config/auth.js");
const jwt = require("jwt-simple");
var bcrypt = require("bcrypt");

const {sentActivationMail, sendInvitationMail} = require('../../utils/mailer/mailer');


const usersValidation = {
    store: Joi.object().keys({
        role: Joi.any().valid('admin', 'manager', 'regular').optional(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        password_repeat: Joi.string().required().valid(Joi.ref('password')),
        lastName: Joi.string().required(),
        name: Joi.string().required()
    }),
    update: Joi.object().keys({
        role: Joi.any().valid('admin', 'manager', 'regular').optional(),
        lastName: Joi.string().required(),
        name: Joi.string().required()
    }),
    invitation: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        password_repeat: Joi.string().required().valid(Joi.ref('password')),
        lastName: Joi.string().required(),
        name: Joi.string().required()
    }),
    invite: Joi.object().keys({
        email: Joi.string().email().required()
    }),
};


const usersMethods = {
    get(req, res) {
        let options = {
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                id: {
                    $ne: req.user.id
                }
            }
        };

        if(req.user.role !== 'admin') {
            options = Object.assign(options, {
                where: {
                    role: {
                        $in: ['regular', 'manager']
                    },
                    id: {
                        $ne: req.user.id
                    }
                }
            });
        } else if(req.query.roles) {
            options = Object.assign(options, {
                where: {
                    role: {
                        $in: req.query.roles
                    },
                    id: {
                        $ne: req.user.id
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

                sentActivationMail(user, req.headers.origin);

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
            sentActivationMail(user, req.headers.origin);
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
    },
    activate(req, res) {
        User.findOne({
            where: {
                activationId: req.body.activationId
            }
        }).then(user => {
            user.activated = true;
            user.save().then(_ => {
                let payload = {
                    id: user.id
                };
                let token = jwt.encode(payload, authConfig.jwt.jwtSecret);
                res.json({
                    token: token
                });
            })
        }).catch(err => {
            res.status(422).json([{message: 'Activation link not valid'}]);
        })
    },

    unblock(req, res) {
        User.findById(req.params.id).then((user) => {
            if (user) {
                user.loginRetries = 0;
                user.save().then(u => {
                    res.json(u);
                })
            } else {
                res.status(422).json([{message: 'User not found'}]);
            }
        })
    },

    completeInvitation(req, res) {
        console.log(req.params);
        User.findOne({
            where: {
                activationId: req.params.id
            }
        }).then(user => {
            if(user) {
                user.name = req.body.name;
                user.lastName = req.body.lastName;
                user.activated = true;

                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    user.password = hash;
                    user.save().then(_ => {
                        let payload = {
                            id: user.id
                        };
                        let token = jwt.encode(payload, authConfig.jwt.jwtSecret);
                        res.json({
                            token: token
                        });
                    });
                });

            } else {
                res.status(422).json([{message: 'Invitation link not valid'}]);
            }
        })
    },

    invite(req, res) {
        User.findOne({
            where: {
                email: req.body.email,
            }
        }).then(u => {
            if(!u) {
                User.create({
                    email: req.body.email,
                    password: 'none',
                    name: 'none',
                    lastName: 'none',
                    role: 'regular'
                }).then(user => {
                    sendInvitationMail(user, req.headers.origin);
                    res.json([{message: 'Invitation successfully sent to user'}]);
                });
            } else {
                res.status(422).json([{message: 'Email you want to sent invitation to is already in the database'}]);
            }
        })

    }
};


module.exports = {
    usersMethods,
    usersValidation
};