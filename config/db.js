const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crm-flowers', 'postgres', process.env.PASSWORD_DB, {
    host: "localhost",
    dialect: "postgres", // автоматически транслирует все то что мы напишем для опреленной БД
});

module.exports = sequelize;