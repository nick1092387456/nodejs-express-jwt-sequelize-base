'use strict'
module.exports = (sequelize, DataTypes) => {
  const Baat_user_ship = sequelize.define(
    'Baat_user_ship',
    {
      baat_inbody_id: DataTypes.INTEGER,
      baat_grip_strength_id: DataTypes.INTEGER,
      baat_cmj_id: DataTypes.INTEGER,
      baat_imtp_id: DataTypes.INTEGER,
      baat_wingate_test_id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Baat_user_ship',
      tableName: 'Baat_user_ships',
      underscored: true,
    }
  )
  return Baat_user_ship
}
