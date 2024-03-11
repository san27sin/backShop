'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
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

    await queryInterface.createTable('advantages', {
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

    await queryInterface.createTable('phoneNumbers', {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      phone: {type: DataTypes.STRING }
    })

    await queryInterface.createTable('socialNetwork', {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      urlPicture: {type: DataTypes.STRING},
      urlSocialNet: {type: DataTypes.STRING}
    })

    await queryInterface.createTable('users', {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      email: {type: DataTypes.STRING, unique: true},
      nickname: {type: DataTypes.STRING, unique: true},
      password: {type: DataTypes.STRING}
    })

    await queryInterface.createTable('tokens', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      refreshToken: {type: DataTypes.STRING, unique: true},
      userId: {type: DataTypes.INTEGER}
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
