'use strict'
module.exports = (sequelize, DataTypes) => {
  const CoachStudentShip = sequelize.define(
    'CoachStudentShip',
    {
      sport: DataTypes.STRING,
    },
    {}
  )
  CoachStudentShip.associate = function (models) {
    CoachStudentShip.belongsTo(models.User)
  }
  return CoachStudentShip
}
