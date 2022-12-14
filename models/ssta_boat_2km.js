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
      tableName: 'Ssta_boat_2kms',
      underscored: true,
    }
  )
  SstaBoat2km.associate = function (models) {
    SstaBoat2km.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'Ssta_boat_2km_id',
      as: 'SstaBoat2kmUser',
    })
  }
  return SstaBoat2km
}
