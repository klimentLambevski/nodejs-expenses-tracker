const request = require('supertest');
const {User} = require('../app/models');
const {sequelize} = require('../app/database/instances');
const server = require('../bin/www');
const assert = require('assert');

beforeEach((done) => {
    sequelize.sync({force: true}).then(() => {
        return User.create({
            email: 'admin@test.com',
            name: 'test',
            lastName: 'test',
            password: 'test',
            role: 'admin',
            activated: true
        });
    }).then(() => {
        return User.create({
            email: 'manager@test.com',
            name: 'test',
            lastName: 'test',
            password: 'test',
            role: 'manager',
            activated: true
        });
    }).then(() => {
        return User.create({
            email: 'regular@test.com',
            name: 'test',
            lastName: 'test',
            password: 'test',
            role: 'regular',
            activated: true
        });
    }).then(() => {
        done();
    })
});

function login() {
    return request(server)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
            email: 'admin@test.com',
            password: 'test',
            _testToken: 'A57AA433B3A5895E87CACE6F993C6BC3FA5FC612EE2BC122E312A53145309FE3313AE81EF9A76F93093D88B3A9023DC610CC13B1C15B926B1E77EE2B7A7FB8DE',
            captcha: 'test'
        });
}

function addRecord(token) {

    return request(server)
        .post('/api/self/records')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `JWT ${token}`)
        .send({
            date: new Date(),
            name: 'test record',
            description: 'test description',
            amount: 1,
            comment: 'no comment'
        });
}

describe('/api', () => {

    describe('POST /auth/login', () => {
        it('should login successfully', (done) => {
            login()
                .expect(200)
                .then((res) => {
                    assert(res.body.token);
                    done();
                }, (err) => {
                console.log(err);
                    assert(false);
                    done(err);
                }).catch(err => done(err));
        });
    });

    describe('GET /self', () => {
        it('should get info about current loged in user', (done) => {
            login()
                .then((res) => {
                    return request(server)
                        .get('/api/self')
                        .accept('json')
                        .set('Content-Type', 'application/json')
                        .set('Authorization', `JWT ${res.body.token}`)
                        .expect(200)
                        .then(res => {
                            assert.equal(res.body.email, 'admin@test.com');
                            done();
                        }, (err) => {
                            assert(false);
                            done(err);
                        })
                }, (err) => {
                    assert(false);
                    done(err);
                });
        });
    });

    describe('PATCH /self', () => {
        it('should change logedin user name and last name', (done) => {
            login()
                .then((res) => {
                    return request(server)
                        .patch('/api/self')
                        .accept('json')
                        .set('Content-Type', 'application/json')
                        .set('Authorization', `JWT ${res.body.token}`)
                        .send({name: 'test2', lastName: 'test2'})
                        .expect(200)
                        .then(res => {
                            assert.equal(res.body.name, 'test2');
                            assert.equal(res.body.lastName, 'test2');
                            done();
                        }, (err) => {
                            assert(false);
                            done(err);
                        })
                }, (err) => {
                    assert(false);
                    done(err);
                });
        })
    });

    describe('POST /self/records', () => {
        it('should add record for logedin user', (done) => {
            login()
                .then((res) => {
                    addRecord(res.body.token)
                        .expect(200)
                        .then(() => {
                            assert(true);
                            done();
                        }, (err) => {
                        console.log(err);
                            assert(false);
                            done(err)
                        })

                })
        })
    });

    describe('GET /self/records', () => {
        it('should get records for logedin user', (done) => {
            login()
                .then((res) => {
                    addRecord(res.body.token)
                        .expect(200)
                        .then(() => {
                            return request(server)
                                .get('/api/self/records')
                                .accept('json')
                                .set('Content-Type', 'application/json')
                                .set('Authorization', `JWT ${res.body.token}`)
                                .expect(200)
                                .then(res => {
                                    assert(res.body.length > 0);
                                    done();
                                }, (err) => {
                                    assert(false);
                                    done(err);
                                })
                        })

                })
        })
    })
});