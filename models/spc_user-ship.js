'use strict'
module.exports = (sequelize, DataTypes) => {
  const SpcUserShip = sequelize.define(
    'SpcUserShip',
    {
      user_id: DataTypes.UUID,
      spc_id: DataTypes.INTEGER,
      id_number: DataTypes.STRING,
      detect_at: DataTypes.DATE,
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
