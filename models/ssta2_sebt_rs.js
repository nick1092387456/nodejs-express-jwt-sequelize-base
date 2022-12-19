'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ssta2SEBT_R extends Model {
    static associate(models) {
      Ssta2SEBT_R.belongsToMany(models.User, {
        through: models.Ssta2UserShip,
        foreignKey: 'ssta2_sebt_r_id',
        as: 'Ssta2_sebt_r_user',
      })
    }
  }
  Ssta2SEBT_R.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Ssta2SEBT_R',
      tableName: 'Ssta2_sebt_rs',
      underscored: true,
    }
  )
  return Ssta2SEBT_R
}
