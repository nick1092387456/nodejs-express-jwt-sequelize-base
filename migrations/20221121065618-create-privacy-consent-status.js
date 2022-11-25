'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Privacy_consent_statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.UUID,
      },
      baat_root: {
        type: Sequelize.BOOLEAN,
      },
      snc_root: {
        type: Sequelize.BOOLEAN,
      },
      ssta_root: {
        type: Sequelize.BOOLEAN,
      },
      ssta2_root: {
        type: Sequelize.BOOLEAN,
      },
      src_root: {
        type: Sequelize.BOOLEAN,
      },
      spc_root: {
        type: Sequelize.BOOLEAN,
      },
      sptc_root: {
        type: Sequelize.BOOLEAN,
      },
      baat_coach: {
        type: Sequelize.BOOLEAN,
      },
      snc_coach: {
        type: Sequelize.BOOLEAN,
      },
      ssta_coach: {
        type: Sequelize.BOOLEAN,
      },
      ssta2_coach: {
        type: Sequelize.BOOLEAN,
      },
      src_coach: {
        type: Sequelize.BOOLEAN,
      },
      spc_coach: {
        type: Sequelize.BOOLEAN,
      },
      sptc_coach: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Privacy_consent_statuses')
  },
}
