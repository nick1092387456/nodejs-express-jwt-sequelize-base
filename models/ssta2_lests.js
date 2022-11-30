'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ssta2LEST extends Model {
    static associate(models) {
      Ssta2LEST.belongsToMany(models.User, {
        through: models.Ssta2UserShip,
        foreignKey: 'ssta2_lest_id',
        as: 'Ssta2_lest_user',
      })
    }
  }
  Ssta2LEST.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ssta2LEST',
      tableName: 'Ssta2_lests',
      underscored: true,
    }
  )
  return Ssta2LEST
}
