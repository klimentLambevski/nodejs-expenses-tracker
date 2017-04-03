const Joi = require('joi');
const {Record, User} = require('../../models');
const sequelize = require('sequelize');

const recordValidation = {
    store: Joi.object().keys({
        workedFrom: Joi.date().iso().required(),
        workedTo: Joi.date().iso().min(Joi.ref('workedFrom')).required(),
        notes: Joi.any().optional()
    })
};

const recordMethods = {
    get(req, res) {
        let dateFrom =  new Date(req.query.date);
        let dateTo = new Date(req.query.date);
        dateTo.setDate(dateTo.getDate() + 1);
        if(req.query.dateTo) {
            dateTo = new Date(req.query.dateTo);
        }
        req.user.getRecords({
            where: {
                workedFrom: {
                    $between: [dateFrom, dateTo]
                }
            }
        }).then(records => res.json(records));
    },
    getForUser(req, res) {
        let dateFrom =  new Date(req.query.date);
        let dateTo = new Date(req.query.date);
        dateTo.setDate(dateTo.getDate() + 1);
        if(req.query.dateTo) {
            dateTo = new Date(req.query.dateTo);
        }

        User.findById(req.params.id).then(user => {
            if(user) {
                user.getRecords({
                    where: {
                        workedFrom: {
                            $between: [dateFrom, dateTo]
                        }
                    }
                }).then(records => res.json(records));
            } else {
                res.sendStatus(401);
            }
        })
    },
    getReportForUser(req, res) {
        let dateFrom =  new Date(req.query.date);
        let dateTo = new Date(req.query.date);
        dateTo.setDate(dateTo.getDate() + 1);
        if(req.query.dateTo) {
            dateTo = new Date(req.query.dateTo);
        }

        User.findById(req.params.id).then(user => {
            if(user) {
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
            })
    },
    update(req, res) {
        Record.findById(req.params.id).then(record => {
            return record.update(req.body);
        }).then(record => res.json(record));
    },
    delete(req, res) {
        Record.findById(req.params.recordId).then(record => {
            if(record) {
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