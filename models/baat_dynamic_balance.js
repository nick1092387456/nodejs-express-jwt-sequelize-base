'use strict'

module.exports = (sequelize, DataTypes) => {
  const BaatDynamicBalance = sequelize.define(
    'BaatDynamicBalance',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BaatDynamicBalance',
      tableName: 'Baat_Dynamic_balances',
      underscored: true,
    }
  )
  BaatDynamicBalance.associate = function (models) {
    BaatDynamicBalance.belongsToMany(models.User, {
      through: models.BaatUserShip,
      foreignKey: 'BaatDynamicBalanceId',
      as: 'BaatDynamicBalanceUser',
    })
  }
  return BaatDynamicBalance
}
