'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ssta2FMS extends Model {
    static associate(models) {
      Ssta2FMS.belongsToMany(models.User, {
        through: models.Ssta2UserShip,
        foreignKey: 'ssta2_fms_id',
        as: 'Ssta2_fms_user',
      })
    }
  }
  Ssta2FMS.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Ssta2FMS',
      tableName: 'Ssta2_fms',
      underscored: true,
    }
  )
  return Ssta2FMS
}
