const {sequelize} = require('../../database/instances');
const { DataTypes } = require('sequelize');

const Record = sequelize.define('record', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    workedFrom: {
        type: DataTypes.DATE,
        allowNull: false
    },
    workedTo: {
        type: DataTypes.DATE,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Record;