'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CoachAthleteShip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  CoachAthleteShip.init(
    {
      coachId: DataTypes.INTEGER,
      athleteId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CoachAthleteShip',
      tableName: 'CoachAthleteShips',
      underscored: true,
    }
  )
  return CoachAthleteShip
}
