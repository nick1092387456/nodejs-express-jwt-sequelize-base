'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ssta2SEBT extends Model {
    static associate(models) {
      Ssta2SEBT.belongsToMany(models.User, {
        through: models.Ssta2UserShip,
        foreignKey: 'ssta2_sebt_id',
        as: 'Ssta2_sebt_user',
      })
    }
  }
  Ssta2SEBT.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ssta2SEBT',
      tableName: 'Ssta2_sebts',
      underscored: true,
    }
  )
  return Ssta2SEBT
}
