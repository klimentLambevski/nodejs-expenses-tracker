const Joy = require('joi');

module.exports = (schema) => {
    return (req, res, next) => {
        const {error} = Joy.validate(req.body, schema);
        if(error) {
            res.status(422).json(error.details)
        } else {
            next();
        }
    }
};