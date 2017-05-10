const {methods: {login}, validation} = require("../modules/auth/auth.controller.js");
const {Router} = require('express');
const validate = require('../middlewares/validation.middleware');
const {usersMethods, usersValidation} = require('../modules/user/user.controller');

const Auth = Router();

Auth.post('/login', validate(validation.login), login);
Auth.post('/register', validate(usersValidation.store), usersMethods.register);
Auth.post('/activate', usersMethods.activate);

module.exports = {
    Auth
};