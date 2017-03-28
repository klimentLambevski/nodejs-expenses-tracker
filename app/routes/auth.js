const {methods: {login}, validation} = require("../modules/auth/auth.controller.js");
const {Router} = require('express');
const validate = require('../middlewares/validation.middleware');


const Auth = Router();

Auth.post('/login', validate(validation.login), login);

module.exports = {
    Auth
};