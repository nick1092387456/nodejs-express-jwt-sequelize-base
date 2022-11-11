'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaBw = sequelize.define(
    'SstaBw',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SstaBw',
      tableName: 'SstaBws',
      underscored: true,
    }
  )
  SstaBw.associate = function (models) {
    SstaBw.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'SstaBwId',
      as: 'SstaBwUser',
    })
  }
  return SstaBw
}
