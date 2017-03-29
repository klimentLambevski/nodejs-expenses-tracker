const Sequelize = require('sequelize');
const {pg} = require('../config/database');

const sequelize = new Sequelize(pg.database, pg.username, pg.password, {
    host: pg.host,
    dialect: 'postgres',
    logging: false
});

module.exports = {
    sequelize
};