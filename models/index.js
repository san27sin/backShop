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

const Advantages = sequelize.define('advantages', {
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
    },
    description: {
        type: DataTypes.STRING
    }
})


const PhoneNumbers = sequelize.define('phoneNumbers', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    phone: {type: DataTypes.STRING }
})

const SocialNetwork = sequelize.define('socialNetwork', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    urlPicture: {type: DataTypes.STRING},
    urlSocialNet: {type: DataTypes.STRING}
})

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, unique: true},
    nickname: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationKey: { type: DataTypes.STRING }
})

const Tokens = sequelize.define('tokens', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, unique: true},
    userId: {type: DataTypes.INTEGER}
})

// Создаем связи между моделями
Users.hasOne(Tokens, {foreignKey: 'userId'})
Tokens.belongsTo(Users, {foreignKey: 'userId'})

module.exports = {
    Categories,
    Advantages,
    PhoneNumbers,
    SocialNetwork,
    Users,
    Tokens
}