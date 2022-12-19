'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ssta2SEBT_L extends Model {
    static associate(models) {
      Ssta2SEBT_L.belongsToMany(models.User, {
        through: models.Ssta2UserShip,
        foreignKey: 'ssta2_sebt_l_id',
        as: 'Ssta2_sebt_l_user',
      })
    }
  }
  Ssta2SEBT_L.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Ssta2SEBT_L',
      tableName: 'Ssta2_sebt_ls',
      underscored: true,
    }
  )
  return Ssta2SEBT_L
}
