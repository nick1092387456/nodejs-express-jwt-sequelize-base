'use strict'
module.exports = (sequelize, DataTypes) => {
  const SpcUserShip = sequelize.define(
    'SpcUserShip',
    {
      user_id: DataTypes.UUID,
      spc_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SpcUserShip',
      tableName: 'Spc_user_ships',
      underscored: true,
    }
  )
  return SpcUserShip
}
