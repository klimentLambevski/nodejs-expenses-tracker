const Joi = require('joi');
const {Record, User} = require('../../models');

const recordValidation = {
    store: Joi.object().keys({
        workedFrom: Joi.date().required(),
        workedTo: Joi.date().min(Joi.ref('workedFrom')).required()
    })
};

const recordMethods = {
    get(req, res) {
        req.user.getRecords().then(records => res.json(records));
    },
    getForUser(req, res) {
        User.findById(req.params.id).then(user => {
            if(user) {
                user.getRecords().then(records => res.json(records));
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
    }
};

module.exports = {
    recordValidation,
    recordMethods
};