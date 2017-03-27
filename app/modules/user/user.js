const {sequelize} = require('../../database/instances');
const { DataTypes } = require('sequelize');

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
    last: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = User;