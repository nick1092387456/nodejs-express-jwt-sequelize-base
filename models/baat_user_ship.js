'use strict'
module.exports = (sequelize, DataTypes) => {
  const Baat_user_ship = sequelize.define(
    'Baat_user_ship',
    {
      baatInbodyId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      detectAt: DataTypes.DATE,
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
