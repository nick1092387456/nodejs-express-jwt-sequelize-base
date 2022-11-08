'use strict'

module.exports = (sequelize, DataTypes) => {
  const SncSuggestion = sequelize.define(
    'SncSuggestion',
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SncSuggestion',
      tableName: 'Snc_suggestions',
      underscored: true,
    }
  )
  SncSuggestion.associate = function (models) {
    SncSuggestion.belongsToMany(models.User, {
      through: models.SncUserShip,
      foreignKey: 'SncSuggestionId',
      as: 'SncSuggestionUser',
    })
  }
  return SncSuggestion
}
