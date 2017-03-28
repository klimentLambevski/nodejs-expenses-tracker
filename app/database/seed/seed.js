const {sequelize} = require('../instances');
const {User} = require('../../models');

sequelize.sync({force: true}).then(() => {
    User.create({
        email: 'test@test.com',
        password: 'test',
        name: 'test',
        lastName: 'test',
        workingHoursFrom: 2,
        workingHoursTo: 8,
        role: 'admin'
    })
});