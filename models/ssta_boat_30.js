'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaBoat30 = sequelize.define(
    'SstaBoat30',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SstaBoat30',
      tableName: 'Ssta_boat_30s',
      underscored: true,
    }
  )
  SstaBoat30.associate = function (models) {
    SstaBoat30.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'Ssta_boat_30_id',
      as: 'SstaBoat30User',
    })
  }
  return SstaBoat30
}
