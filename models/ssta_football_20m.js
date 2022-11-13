'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaFootball20m = sequelize.define(
    'SstaFootball20m',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SstaFootball20m',
      tableName: 'Ssta_football_20ms',
      underscored: true,
    }
  )
  SstaFootball20m.associate = function (models) {
    SstaFootball20m.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'SstaFootball20mId',
      as: 'SstaFootball20mUser',
    })
  }
  return SstaFootball20m
}
