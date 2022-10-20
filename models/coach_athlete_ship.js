'use strict'

module.exports = (sequelize, DataTypes) => {
  const CoachAthleteShip = sequelize.define(
    'CoachAthleteShip',
    {
      coachId: DataTypes.INTEGER,
      athleteId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CoachAthleteShip',
      tableName: 'Coach_athlete_ships',
      underscored: true,
    }
  )

  return CoachAthleteShip
}