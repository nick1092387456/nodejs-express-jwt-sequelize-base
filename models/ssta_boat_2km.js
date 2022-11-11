'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaBoat2km = sequelize.define(
    'SstaBoat2km',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SstaBoat2km',
      tableName: 'SstaBoat2kms',
      underscored: true,
    }
  )
  SstaBoat2km.associate = function (models) {
    SstaBoat2km.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'SstaBoat2kmId',
      as: 'SstaBoat2kmUser',
    })
  }
  return SstaBoat2km
}
