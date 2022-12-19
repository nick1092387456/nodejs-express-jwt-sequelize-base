'use strict'
module.exports = (sequelize, DataTypes) => {
  const BaatUserShip = sequelize.define(
    'BaatUserShip',
    {
      baat_inbody_id: DataTypes.INTEGER,
      baat_grip_strength_id: DataTypes.INTEGER,
      baat_cmj_id: DataTypes.INTEGER,
      baat_imtp_id: DataTypes.INTEGER,
      baat_wingate_test_id: DataTypes.INTEGER,
      user_id: DataTypes.UUID,
      id_number: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BaatUserShip',
      tableName: 'Baat_user_ships',
      underscored: true,
    }
  )
  return BaatUserShip
}
