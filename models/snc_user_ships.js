'use strict'
module.exports = (sequelize, DataTypes) => {
  const SncUserShip = sequelize.define(
    'SncUserShip',
    {
      user_id: DataTypes.UUID,
      snc_inbody_id: DataTypes.INTEGER,
      id_number: DataTypes.STRING,
      detect_at: DataTypes.DATE,
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
