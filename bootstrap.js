const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {Auth} = require('./app/routes/auth');
const {Api} = require('./app/routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api', Api);
app.use('/api/auth', Auth);

module.exports = app;