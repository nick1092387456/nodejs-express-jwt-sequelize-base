'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class baat_imtp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      baat_imtp.belongsToMany(models.User, {
        through: models.Baat_user_ship,
        foreignKey: 'baat_imtp_id',
        as: 'baat_imtp_user',
      })
    }
  }
  baat_imtp.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'baat_imtp',
      tableName: 'Baat_imtps',
      underscored: true,
    }
  )
  return baat_imtp
}
