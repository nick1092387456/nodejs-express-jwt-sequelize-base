'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      baat: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      snc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ssta: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ssta2: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      src: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      spc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sptc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      coach: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      athlete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      analyst: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Roles')
  },
}
