'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ssta_user_ships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_number: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      ssta_inbody_id: {
        type: Sequelize.INTEGER,
      },
      ssta_boat_30_id: {
        type: Sequelize.INTEGER,
      },
      ssta_boat_2km_id: {
        type: Sequelize.INTEGER,
      },
      ssta_bw_id: {
        type: Sequelize.INTEGER,
      },
      ssta_football_20m_id: {
        type: Sequelize.INTEGER,
      },
      ssta_football_505_id: {
        type: Sequelize.INTEGER,
      },
      ssta_football_light_id: {
        type: Sequelize.INTEGER,
      },
      ssta_cycling_vo2_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Ssta_user_ships')
  },
}
