const {methods: {login}} = require("../modules/auth/auth.controller.js");
const {Router} = require('express');

const Auth = Router();

Auth.post('/login', login);

module.exports = {
    Auth
};