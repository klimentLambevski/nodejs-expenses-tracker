const {Router} = require('express');
const auth = require('../modules/auth/auth');

const Api = Router();

Api.get('/test', auth().authenticate(), (req, res) => {
    res.json({kur: 'kur'});
});

module.exports = {
    Api
};