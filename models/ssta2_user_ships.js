'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ssta2UserShip extends Model {}
  Ssta2UserShip.init(
    {
      id_number: DataTypes.STRING,
      user_id: DataTypes.UUID,
      detect_at: DataTypes.DATE,
      ssta2_lest_id: DataTypes.INTEGER,
      ssta2_uest_id: DataTypes.INTEGER,
      ssta2_sebt_id: DataTypes.INTEGER,
      ssta2_fms_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Ssta2UserShip',
      tableName: 'Ssta2_user_ships',
      underscored: true,
    }
  )
  return Ssta2UserShip
}
