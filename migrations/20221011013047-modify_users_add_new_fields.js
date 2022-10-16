'use strict'

// const { query } = require('express')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'description', {
      type: Sequelize.STRING(160),
    })
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('Users', 'id_number', {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true,
    })
    await queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.STRING(1),
      allowNull: false,
    })
    await queryInterface.addColumn('Users', 'birthday', {
      type: Sequelize.DATE,
      allowNull: false,
    })
    await queryInterface.addColumn('Users', 'duty', {
      type: Sequelize.STRING,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'description')
    await queryInterface.removeColumn('Users', 'avatar')
    await queryInterface.removeColumn('Users', 'id_number')
    await queryInterface.removeColumn('Users', 'gender')
    await queryInterface.removeColumn('Users', 'birthday')
    await queryInterface.removeColumn('Users', 'duty')
  },
}
