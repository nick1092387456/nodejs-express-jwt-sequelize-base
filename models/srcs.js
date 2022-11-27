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
      Src.belongsTo(models.User)
    }
  }
  Src.init(
    {
      id_number: DataTypes.STRING,
      user_id: DataTypes.UUID,
      data: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Src',
      tableNmae: 'Srcs',
    }
  )
  return Src
}
