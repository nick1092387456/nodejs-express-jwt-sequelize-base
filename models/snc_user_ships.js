'use strict'
module.exports = (sequelize, DataTypes) => {
  const SncUserShip = sequelize.define(
    'SncUserShip',
    {
      user_id: DataTypes.INTEGER,
      snc_inbody_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SncUserShip',
      tableName: 'Snc_user_ships',
      underscored: true,
    }
  )
  return SncUserShip
}
