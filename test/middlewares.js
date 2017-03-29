const assert = require('assert');
const authorizationMiddleware = require('../app/middlewares/authorization.middleware');
const validationMiddleware = require('../app/middlewares/validation.middleware');
const Joi = require('joi');


describe('Middlewares', () => {

    describe('Authorization', () => {
        const req = {
            user: {
                role: 'admin'
            }
        };

        const res = {
            sendStatus(status) {
                assert.equal(status, 401);
            }
        };

        it('should authorize user', () => {
            authorizationMiddleware(['admin', 'manager'])(req, {}, () => {
                assert(true);
            })
        });

        it('should not authorize user', () => {
            authorizationMiddleware(['regular'])(req, res, () => {
                assert(false);
            })
        });
    });

    describe('Validation middleware', () => {

        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required()
        });

        const req = {
            body: {
                name: 'test',
                email: 'test@test.com'
            }
        };

        const res = {
            status(code) {
                assert.equal(code, 422);
                return {
                    json(msg) {

                        assert.equal(msg[0].message, "\"name\" is required");
                    }
                }
            }
        };

        it('should validate data', () => {
            validationMiddleware(schema)(req, {}, () => {
                assert(true);
            })
        });

        it('should return validation error', () => {
            validationMiddleware(schema)({body: {}}, res, () => {
                assert(true);
            })
        });
    });
});