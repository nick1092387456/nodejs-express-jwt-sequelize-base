'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Baat_user_ships', 'baat_grip_strength_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'Baat_user_ships',
      'baat_grip_strength_id'
    )
  },
}
