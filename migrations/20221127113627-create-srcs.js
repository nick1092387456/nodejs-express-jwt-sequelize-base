'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Srcs', {
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
      data: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Srcs')
  },
}
