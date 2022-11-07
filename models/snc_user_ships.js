'use strict'
module.exports = (sequelize, DataTypes) => {
  const Snc_user_ship = sequelize.define(
    'Snc_user_ship',
    {
      user_id: DataTypes.INTEGER,
      snc_inbody_id: DataTypes.INTEGER,
      snc_suggestion_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Snc_user_ship',
      tableName: 'Snc_user_ships',
      underscored: true,
    }
  )
  return Snc_user_ship
}
