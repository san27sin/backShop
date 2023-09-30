const sequelize = require('../config/db');
const { DataTypes } = require('sequelize'); // объект позволяет типизовать поля в нашей будущей таблицы

// создание абстрактной таблицы для бд, если ее нету то создается, если нет, то и суда нет
const Categories = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    }
})

module.exports = {
    Categories,
}