const {Router} = require('express');
const auth = require('../modules/auth/auth');
const {usersMethods, usersValidation} = require('../modules/user/user.controller');
const {recordMethods, recordValidation} = require('../modules/record/record.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const authorizationMiddleware = require('../middlewares/authorization.middleware');

const {selfMethods, selfValidation} = require('../modules/auth/self.controller');

const Api = Router();

Api.get('/self', auth().authenticate(), selfMethods.get);
Api.patch('/self', [auth().authenticate(), validationMiddleware(selfValidation.update)], selfMethods.update);
Api.get('/self/records', auth().authenticate(), recordMethods.get);
Api.post('/self/records', [auth().authenticate(), validationMiddleware(recordValidation.store)], recordMethods.store);
Api.patch('/self/records/:id', [auth().authenticate(), validationMiddleware(recordValidation.store)], recordMethods.update);

Api.get('/users', [auth().authenticate(), authorizationMiddleware(['admin', 'manager'])], usersMethods.get);
Api.post('/users', validationMiddleware(usersValidation.store), usersMethods.store);
Api.patch('/users/:id', [auth().authenticate(), authorizationMiddleware(['admin', 'manager']), validationMiddleware(usersValidation.update)], usersMethods.update);

Api.get('/users/:id/records', [auth().authenticate(), authorizationMiddleware(['admin'])], recordMethods.getForUser);

module.exports = {
    Api
};