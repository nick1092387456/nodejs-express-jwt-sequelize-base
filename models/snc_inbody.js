'use strict'

module.exports = (sequelize, DataTypes) => {
  const SncInbody = sequelize.define(
    'SncInbody',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SncInbody',
      tableName: 'Snc_inbodies',
      underscored: true,
    }
  )
  SncInbody.associate = function (models) {
    SncInbody.belongsToMany(models.User, {
      through: models.Snc_user_ship,
      foreignKey: 'SncInbodyId',
      as: 'SncInbodyUser',
    })
  }
  return SncInbody
}
