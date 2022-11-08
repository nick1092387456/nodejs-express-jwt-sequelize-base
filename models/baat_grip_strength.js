'use strict'

module.exports = (sequelize, DataTypes) => {
  const BaatGripStrength = sequelize.define(
    'BaatGripStrength',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BaatGripStrength',
      tableName: 'Baat_grip_strengths',
      underscored: true,
    }
  )
  BaatGripStrength.associate = function (models) {
    BaatGripStrength.belongsToMany(models.User, {
      through: models.BaatUserShip,
      foreignKey: 'BaatGripStrengthId',
      as: 'BaatGripStrengthUser',
    })
  }
  return BaatGripStrength
}
