'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Coach_athlete_ships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coach_id: {
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },
      athlete_id: {
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
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
    await queryInterface.dropTable('Coach_athlete_ships')
  },
}
