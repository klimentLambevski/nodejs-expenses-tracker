const {Router} = require('express');

const Auth = Router();

Auth.get('/login', (req, res) => {
    res.send({kur: 'kur login'});
});

module.exports = {
    Auth
};