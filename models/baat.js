'use strict'

module.exports = (sequelize, DataTypes) => {
  const Baat = sequelize.define(
    'Baat',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detectAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Baat',
      tableName: 'Baats',
      underscored: true,
    }
  )
  Baat.associate = function (models) {
    Baat.belongsToMany(models.User, {
      through: models.Baat_user_ship,
      foreignKey: 'BaatId',
      as: 'BaatUser',
    })
  }
  return Baat
}
