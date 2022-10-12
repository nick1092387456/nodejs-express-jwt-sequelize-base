'use strict'

// const { query } = require('express')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'private_check', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'private_check')
  },
}
