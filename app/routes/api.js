const {Router} = require('express');

const Api = Router();

Api.get('/test', (req, res) => {
    res.send({kur: 'kur'});
});

module.exports = {
    Api
};