const User = require('./modules/user/user');
const Record = require('./modules/record/record');

User.Records = User.hasMany(Record, {as: 'records'});
Record.User = Record.belongsTo(User, {as: 'user'});

module.exports = {
    User,
    Record
};

