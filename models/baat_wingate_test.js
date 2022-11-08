'use strict'

module.exports = (sequelize, DataTypes) => {
  const BaatWingateTest = sequelize.define(
    'BaatWingateTest',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BaatWingateTest',
      tableName: 'Baat_wingate_tests',
      underscored: true,
    }
  )
  BaatWingateTest.associate = function (models) {
    BaatWingateTest.belongsToMany(models.User, {
      through: models.BaatUserShip,
      foreignKey: 'baat_wingate_test_id',
      as: 'BaatWingateTestUser',
    })
  }
  return BaatWingateTest
}
