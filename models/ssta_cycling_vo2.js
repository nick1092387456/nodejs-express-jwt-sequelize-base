'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaCyclingVo2 = sequelize.define(
    'SstaCyclingVo2',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SstaCyclingVo2',
      tableName: 'Ssta_cycling_vo2s',
      underscored: true,
    }
  )
  SstaCyclingVo2.associate = function (models) {
    SstaCyclingVo2.belongsToMany(models.User, {
      through: models.SstaUserShip,
      foreignKey: 'SstaCyclingVo2Id',
      as: 'SstaCyclingVo2User',
    })
  }
  return SstaCyclingVo2
}
