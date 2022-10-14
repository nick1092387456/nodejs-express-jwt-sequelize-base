'use strict'
module.exports = (sequelize, DataTypes) => {
  const CoachAthleteShip = sequelize.define(
    'CoachAthleteShip',
    {
      sport: DataTypes.STRING,
    },
    {}
  )
  CoachAthleteShip.associate = function (models) {
    CoachAthleteShip.belongsTo(models.User)
  }
  return CoachAthleteShip
}
