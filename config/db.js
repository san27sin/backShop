const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('crm-flowers', 'postgres', 'vannabluerey8', {
    host: "localhost",
    dialect: "postgres", // автоматически транслирует все то что мы напишем для опреленной БД
});

module.exports = sequelize;