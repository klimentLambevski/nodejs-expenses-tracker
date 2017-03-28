const {sequelize} = require('../../database/instances');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['admin', 'manager', 'regular'],
        defaultValue: 'regular'
    },
    workingHoursFrom: {
        type: DataTypes.INTEGER
    },
    workingHoursTo: {
        type: DataTypes.INTEGER
    }
}, {
    indexes: [{unique: true, fields: ['email']}],
    instanceMethods: {
        authenticate: function(value) {
            if (bcrypt.compareSync(value, this.password))
                return this;
            else
                return false;
        }
    }
});

let hasSecurePassword = function(user, options, callback) {
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
        if (err) return callback(err);
        user.set('password', hash);
        return callback(null, options);
    });
};

User.beforeCreate(function(user, options, callback) {
    user.email = user.email.toLowerCase();
    if (user.password)
        hasSecurePassword(user, options, callback);
    else
        return callback(null, options);
});

module.exports = User;