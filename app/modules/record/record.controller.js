const Joi = require('joi');
const {Record, User} = require('../../models');
const sequelize = require('sequelize');

const recordValidation = {
    store: Joi.object().keys({
        name: Joi.string().required(),
        date: Joi.date().iso().required(),
        description: Joi.string().required(),
        amount: Joi.number().positive().required(),
        comment: Joi.string()
    })
};

const recordMethods = {
    get(req, res) {
        let dateFrom = new Date(req.query.date);
        let dateTo = new Date(req.query.date);
        dateTo.setDate(dateTo.getDate() + 1);
        if (req.query.dateTo) {
            dateTo = new Date(req.query.dateTo);
        }

        let where = {
            date: {
                $between: [dateFrom, dateTo]
            }
        };

        if(req.query.search) {
            where = Object.assign(where, {
                name: {
                    $like: `%${req.query.search}%`
                }
            })
        }
        req.user.getRecords({
            where
        }).then(records => res.json(records));
    },
    getForUser(req, res) {
        let dateFrom = new Date(req.query.date);
        let dateTo = new Date(req.query.date);
        dateTo.setDate(dateTo.getDate() + 1);
        if (req.query.dateTo) {
            dateTo = new Date(req.query.dateTo);
        }

        let where = {
            date: {
                $between: [dateFrom, dateTo]
            }
        };

        if(req.query.search) {
            where = Object.assign(where, {
                name: {
                    $like: `%${req.query.search}%`
                }
            })
        }

        User.findById(req.params.id).then(user => {
            if (user) {
                user.getRecords({
                    where
                }).then(records => res.json(records));
            } else {
                res.sendStatus(401);
            }
        })
    },
    getReportForUser(req, res) {
        let dateFrom = new Date(req.query.date);
        let dateTo = new Date(req.query.date);
        dateTo.setDate(dateTo.getDate() + 1);
        if (req.query.dateTo) {
            dateTo = new Date(req.query.dateTo);
        }

        User.findById(req.params.id).then(user => {
            if (user) {
                user.getRecords({
                    where: {
                        workedFrom: {
                            $between: [dateFrom, dateTo]
                        }
                    },
                    attributes: ['id', [sequelize.fn('SUM', (sequelize.fn('COALESCE', (sequelize.col('base_income')), 0), sequelize.literal('+'), sequelize.fn('COALESCE', (sequelize.col('user_taxes')), 0))), 'total_sal']],
                    group: ['name', 'name']
                }).then(records => res.json(records));
            } else {
                res.sendStatus(401);
            }
        })
    },
    store(req, res) {

        Record
            .build(req.body)
            .save()
            .then(record => {
                req.user.addRecord(record);
                res.json(record);
            }).catch(() => {
            res.sendStatus(422);
        })

    },

    addForUser(req, res) {
        Record
            .build(req.body)
            .save()
            .then(record => {
                User.findById(req.params.id).then(user => {
                    user.addRecord(record);
                    res.json(record);
                })
            }).catch(() => {
            res.sendStatus(422);
        })
    },

    update(req, res) {
        Record.findById(req.params.id).then(record => {
            return record.update(req.body);
        }).then(record => res.json(record));
    },
    delete(req, res) {
        Record.findById(req.params.recordId).then(record => {
            if (record) {
                record.destroy().then(_ => res.json(record));
            } else {
                res.status(422).json([{message: 'Record not found'}])
            }
        });
    },

};

module.exports = {
    recordValidation,
    recordMethods
};