'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ssta2_user_ships', {
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
        type: Sequelize.UUID,
      },
      detect_at: {
        type: Sequelize.DATE,
      },
      ssta2_lest_id: {
        type: Sequelize.INTEGER,
      },
      ssta2_uest_id: {
        type: Sequelize.INTEGER,
      },
      ssta2_sebt_l_id: {
        type: Sequelize.INTEGER,
      },
      ssta2_sebt_r_id: {
        type: Sequelize.INTEGER,
      },
      ssta2_fms_id: {
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
    await queryInterface.dropTable('Ssta2_user_ships')
  },
}
