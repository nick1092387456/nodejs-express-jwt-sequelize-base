'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class baat_cmj extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      baat_cmj.belongsToMany(models.User, {
        through: models.Baat_user_ship,
        foreignKey: 'baat_cmj_id',
        as: 'baat_cmj_user',
      })
    }
  }
  baat_cmj.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'baat_cmj',
      tableName: 'Baat_cmjs',
      underscored: true,
    }
  )
  return baat_cmj
}
