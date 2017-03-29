const assert = require('assert');
const {User} = require('../app/models');
const {sequelize} = require('../app/database/instances');
beforeEach(() => {
    // return sequelize.sync({force: true});
});

describe('User', () => {
    describe('Create user', () => {
        it('should create user', (done) => {
            User.create({
                email: 'test@test.test',
                name: 'test',
                lastName: 'test',
                password: 'test'
            }).then(user => {
                assert.equal(user.email, 'test@test.test');
                assert.equal(user.name, 'test');
                assert.equal(user.lastName, 'test');
                user.destroy().then(() => {
                    done();
                });
            })
        });

        it('should authenticate users password', (done) => {
            User.create({
                email: 'test@test.test',
                name: 'test',
                lastName: 'test',
                password: 'test'
            }).then(user => {
                assert(user.authenticate('test'));
                user.destroy().then(() => {
                    done();
                });
            })
        });
    });
});