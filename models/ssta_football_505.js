'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaFootball505 = sequelize.define(
    'SstaFootball505',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SstaFootball505',
      tableName: 'SstaFootball505s',
      underscored: true,
    }
  )
  SstaFootball505.associate = function (models) {
    SstaFootball505.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'SstaFootball505Id',
      as: 'SstaFootball505User',
    })
  }
  return SstaFootball505
}