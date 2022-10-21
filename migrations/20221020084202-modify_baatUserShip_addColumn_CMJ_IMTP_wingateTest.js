'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Baat_user_ships', 'baat_cmj_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.addColumn('Baat_user_ships', 'baat_imtp_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.addColumn('Baat_user_ships', 'baat_wingate_test_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Baat_user_ships', 'baat_cmj_id')
    await queryInterface.removeColumn('Baat_user_ships', 'baat_imtp_id')
    await queryInterface.removeColumn('Baat_user_ships', 'baat_wingate_test_id')
  },
}
