const {sequelize} = require('../instances');
const {User} = require('../../models');

sequelize.sync({force: true}).then(() => {
    User.create({
        email: 'admin@test.com',
        password: 'test',
        name: 'Admin',
        lastName: 'Lastname',
        role: 'admin'
    });
    User.create({
        email: 'manager@test.com',
        password: 'test',
        name: 'Manager',
        lastName: 'Lastname',
        role: 'manager'
    });
    User.create({
        email: 'regular@test.com',
        password: 'test',
        name: 'Regular',
        lastName: 'Lastname',
        role: 'regular'
    })
});