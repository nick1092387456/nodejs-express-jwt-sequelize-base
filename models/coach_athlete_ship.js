'use strict'

module.exports = (sequelize, DataTypes) => {
  const CoachAthleteShip = sequelize.define(
    'CoachAthleteShip',
    {
      coachId: DataTypes.UUID,
      athleteId: DataTypes.UUID,
      startAt: DataTypes.DATE,
      stopAt: DataTypes.DATE,
      status: DataTypes.STRING,
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
