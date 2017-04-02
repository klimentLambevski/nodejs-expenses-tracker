const {sequelize} = require('../instances');
const {User} = require('../../models');

sequelize.sync({force: true}).then(() => {
    User.create({
        email: 'admin@test.com',
        password: 'test',
        name: 'test',
        lastName: 'test',
        workingHoursFrom: 2,
        workingHoursTo: 8,
        role: 'admin'
    });
    User.create({
        email: 'manager@test.com',
        password: 'test',
        name: 'test',
        lastName: 'test',
        workingHoursFrom: 2,
        workingHoursTo: 8,
        role: 'manager'
    });
    User.create({
        email: 'regular@test.com',
        password: 'test',
        name: 'test',
        lastName: 'test',
        workingHoursFrom: 2,
        workingHoursTo: 8,
        role: 'regular'
    })
});