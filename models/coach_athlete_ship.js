'use strict'

module.exports = (sequelize, DataTypes) => {
  const CoachAthleteShip = sequelize.define(
    'CoachAthleteShip',
    {
      coach_id: DataTypes.UUID,
      athlete_id: DataTypes.UUID,
      start_at: DataTypes.DATE,
      stop_at: DataTypes.DATE,
      status: DataTypes.STRING,
      sport: DataTypes.STRING,
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
