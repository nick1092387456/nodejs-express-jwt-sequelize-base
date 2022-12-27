'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Coach_athlete_ships', 'sport', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Coach_athlete_ships', 'sport')
  },
}
