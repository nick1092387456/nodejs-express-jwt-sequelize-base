'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Coach_athlete_ships', 'start_at', {
      type: Sequelize.DATE,
      allowNull: true,
    })
    await queryInterface.addColumn('Coach_athlete_ships', 'stop_at', {
      type: Sequelize.DATE,
      allowNull: true,
    })
    await queryInterface.addColumn('Coach_athlete_ships', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Coach_athlete_ships', 'start_at')
    await queryInterface.removeColumn('Coach_athlete_ships', 'stop_at')
    await queryInterface.removeColumn('Coach_athlete_ships', 'status')
  },
}
