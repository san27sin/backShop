const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('crm-flowers', 'postgres', process.env.PASSWORD_DB, {
    host: "localhost",
    dialect: "postgres", // автоматически транслирует все то что мы напишем для опреленной БД
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;