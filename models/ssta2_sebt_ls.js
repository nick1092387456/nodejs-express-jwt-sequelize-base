'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ssta2SebtL extends Model {
    static associate(models) {
      Ssta2SebtL.belongsToMany(models.User, {
        through: models.Ssta2UserShip,
        foreignKey: 'ssta2_sebt_l_id',
        as: 'Ssta2_sebt_l_user',
      })
    }
  }
  Ssta2SebtL.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Ssta2SebtL',
      tableName: 'Ssta2_sebt_ls',
      underscored: true,
    }
  )
  return Ssta2SebtL
}
