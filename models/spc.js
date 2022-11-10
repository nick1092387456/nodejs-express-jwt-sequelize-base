'use strict'

module.exports = (sequelize, DataTypes) => {
  const Spc = sequelize.define(
    'Spc',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Spc',
      tableName: 'Spcs',
      underscored: true,
    }
  )
  Spc.associate = function (models) {
    Spc.belongsToMany(models.User, {
      through: models.SpcUserShip,
      foreignKey: 'SpcId',
      as: 'SpcUser',
    })
  }
  return Spc
}
