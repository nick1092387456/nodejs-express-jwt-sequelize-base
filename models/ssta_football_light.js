'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaFootballLight = sequelize.define(
    'SstaFootballLight',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SstaFootballLight',
      tableName: 'Ssta_football_lights',
      underscored: true,
    }
  )
  SstaFootballLight.associate = function (models) {
    SstaFootballLight.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'SstaFootballLightId',
      as: 'SstaFootballLightUser',
    })
  }
  return SstaFootballLight
}
