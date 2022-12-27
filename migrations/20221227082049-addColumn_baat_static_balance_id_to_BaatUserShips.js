'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Baat_user_ships',
      'baat_static_balance_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    )
    await queryInterface.addColumn(
      'Baat_user_ships',
      'baat_dynamic_balance_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    )
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'Baat_user_ships',
      'baat_static_balance_id'
    )
    await queryInterface.removeColumn(
      'Baat_user_ships',
      'baat_dynamic_balance_id'
    )
  },
}
