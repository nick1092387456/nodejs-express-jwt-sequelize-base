'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaInbody = sequelize.define(
    'SstaInbody',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SstaInbody',
      tableName: 'Ssta_inbodies',
      underscored: true,
    }
  )
  SstaInbody.associate = function (models) {
    SstaInbody.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'SstaInbodyId',
      as: 'SstaInbodyUser',
    })
  }
  return SstaInbody
}
