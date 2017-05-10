const {sequelize} = require('../instances');
const {User} = require('../../models');

sequelize.sync({force: true}).then(() => {
    User.create({
        email: 'admin@test.com',
        password: 'test',
        name: 'Admin',
        lastName: 'Lastname',
        role: 'admin',
        activated: true
    });
    User.create({
        email: 'manager@test.com',
        password: 'test',
        name: 'Manager',
        lastName: 'Lastname',
        role: 'manager',
        activated: true
    });
    User.create({
        email: 'regular@test.com',
        password: 'test',
        name: 'Regular',
        lastName: 'Lastname',
        role: 'regular',
        activated: true
    })
});