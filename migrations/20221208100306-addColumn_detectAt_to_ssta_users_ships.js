'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Ssta_user_ships', 'detect_at', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Ssta_user_ships', 'detect_at')
  },
}
