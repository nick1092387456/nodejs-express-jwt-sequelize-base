'use strict'

module.exports = (sequelize, DataTypes) => {
  const BaatImtp = sequelize.define(
    'BaatImtp',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BaatImtp',
      tableName: 'Baat_imtps',
      underscored: true,
    }
  )
  BaatImtp.associate = function (models) {
    BaatImtp.belongsToMany(models.User, {
      through: models.BaatUserShip,
      foreignKey: 'BaatImtpId',
      as: 'BaatImtpUser',
    })
  }
  return BaatImtp
}
