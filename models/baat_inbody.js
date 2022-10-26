'use strict'

module.exports = (sequelize, DataTypes) => {
  const BaatInbody = sequelize.define(
    'BaatInbody',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BaatInbody',
      tableName: 'Baat_inbodies',
      underscored: true,
    }
  )
  BaatInbody.associate = function (models) {
    BaatInbody.belongsToMany(models.User, {
      through: models.Baat_user_ship,
      foreignKey: 'BaatInbodyId',
      as: 'BaatInbodyUser',
    })
  }
  return BaatInbody
}
