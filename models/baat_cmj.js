'use strict'

module.exports = (sequelize, DataTypes) => {
  const BaatCmj = sequelize.define(
    'BaatCmj',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BaatCmj',
      tableName: 'Baat_cmjs',
      underscored: true,
    }
  )
  BaatCmj.associate = function (models) {
    BaatCmj.belongsToMany(models.User, {
      through: models.BaatUserShip,
      foreignKey: 'BaatCmjId',
      as: 'BaatCmjUser',
    })
  }
  return BaatCmj
}
