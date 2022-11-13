'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaFootBallLight = sequelize.define(
    'SstaFootBallLight',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SstaFootBallLight',
      tableName: 'Ssta_footBall_lights',
      underscored: true,
    }
  )
  SstaFootBallLight.associate = function (models) {
    SstaFootBallLight.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'SstaFootBallLightId',
      as: 'SstaFootBallLightUser',
    })
  }
  return SstaFootBallLight
}
