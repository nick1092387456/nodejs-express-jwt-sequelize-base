'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class baat_wingate_test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      baat_wingate_test.belongsToMany(models.User, {
        through: models.Baat_user_ship,
        foreignKey: 'baat_wingate_test_id',
        as: 'baat_wingate_test_user',
      })
    }
  }
  baat_wingate_test.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'baat_wingate_test',
      tableName: 'Baat_wingate_tests',
      underscored: true,
    }
  )
  return baat_wingate_test
}
