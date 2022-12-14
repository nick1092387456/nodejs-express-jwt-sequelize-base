'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Src extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Src.belongsToMany(models.User, {
        through: models.SrcUserShip,
        foreignKey: 'src_id',
        as: 'SrcUser',
      })
    }
  }
  Src.init(
    {
      data: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Src',
      tableName: 'Srcs',
      underscored: true,
    }
  )
  return Src
}
