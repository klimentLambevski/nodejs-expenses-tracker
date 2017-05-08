const {sequelize} = require('../instances');
const {User} = require('../../models');

sequelize.sync({force: true}).then(() => {
    User.create({
        email: 'admin@test.com',
        password: 'test',
        name: 'test',
        lastName: 'test',
        role: 'admin'
    });
    User.create({
        email: 'manager@test.com',
        password: 'test',
        name: 'test',
        lastName: 'test',
        role: 'manager'
    });
    User.create({
        email: 'regular@test.com',
        password: 'test',
        name: 'test',
        lastName: 'test',
        role: 'regular'
    })
});