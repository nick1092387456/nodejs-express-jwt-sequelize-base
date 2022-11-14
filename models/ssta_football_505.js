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
      tableName: 'Ssta_football_505s',
      underscored: true,
    }
  )
  SstaFootball505.associate = function (models) {
    SstaFootball505.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'Ssta_football_505_id',
      as: 'SstaFootball505User',
    })
  }
  return SstaFootball505
}
