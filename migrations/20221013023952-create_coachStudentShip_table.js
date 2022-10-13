module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('CoachStudentShips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coachId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'Users',
          key: 'id',
        },
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: 'Users',
          key: 'id',
        },
      },
      sports: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('CoachStudentShips'),
}
