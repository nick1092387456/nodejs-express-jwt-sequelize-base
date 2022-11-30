'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ssta2UEST extends Model {
    static associate(models) {
      Ssta2UEST.belongsToMany(models.User, {
        through: models.Ssta2UserShip,
        foreignKey: 'ssta2_uest_id',
        as: 'Ssta2_uest_user',
      })
    }
  }
  Ssta2UEST.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ssta2UEST',
      tableName: 'Ssta2_uests',
      underscored: true,
    }
  )
  return Ssta2UEST
}
