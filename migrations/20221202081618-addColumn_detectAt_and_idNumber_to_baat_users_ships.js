'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Baat_user_ships', 'id_number', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('Baat_user_ships', 'detect_at', {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Baat_user_ships', 'id_number')
    await queryInterface.removeColumn('Baat_user_ships', 'detect_at')
  },
}
