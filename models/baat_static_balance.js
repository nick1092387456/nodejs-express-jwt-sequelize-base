'use strict'

module.exports = (sequelize, DataTypes) => {
  const BaatStaticBalance = sequelize.define(
    'BaatStaticBalance',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BaatStaticBalance',
      tableName: 'Baat_static_balances',
      underscored: true,
    }
  )
  BaatStaticBalance.associate = function (models) {
    BaatStaticBalance.belongsToMany(models.User, {
      through: models.BaatUserShip,
      foreignKey: 'BaatStaticBalanceId',
      as: 'BaatStaticBalanceUser',
    })
  }
  return BaatStaticBalance
}
