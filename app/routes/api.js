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
Api.delete('/self/records/:recordId', [auth().authenticate()], recordMethods.delete);

Api.patch('/records/:id', [auth().authenticate(), validationMiddleware(recordValidation.store)], recordMethods.update);
Api.delete('/records/:recordId', [auth().authenticate()], recordMethods.delete);


Api.get('/users', [auth().authenticate(), authorizationMiddleware(['admin', 'manager'])], usersMethods.get);
Api.post('/users', [auth().authenticate(), authorizationMiddleware(['admin', 'manager']), validationMiddleware(usersValidation.store)], usersMethods.store);
Api.patch('/users/:id', [auth().authenticate(), authorizationMiddleware(['admin', 'manager']), validationMiddleware(usersValidation.update)], usersMethods.update);
Api.delete('/users/:id', [auth().authenticate(), authorizationMiddleware(['admin', 'manager'])], usersMethods.delete);
Api.post('/users/:id/unblock', [auth().authenticate(), authorizationMiddleware(['admin', 'manager'])], usersMethods.unblock);

Api.get('/users/:id/records', [auth().authenticate(), authorizationMiddleware(['admin'])], recordMethods.getForUser);
Api.post('/users/:id/records', [auth().authenticate(), authorizationMiddleware(['admin'])], recordMethods.addForUser);
Api.get('/users/:id/records/reports', [auth().authenticate(), authorizationMiddleware(['admin'])], recordMethods.getReportForUser);
Api.delete('/users/:id/records/:recordId', [auth().authenticate(), authorizationMiddleware(['admin'])], recordMethods.delete);

module.exports = {
    Api
};