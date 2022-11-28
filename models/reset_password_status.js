'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ResetPasswordStatus extends Model {}
  ResetPasswordStatus.init(
    {
      email: DataTypes.STRING,
      verify_code: DataTypes.UUID,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ResetPasswordStatus',
      tableName: 'Reset_password_statuses',
      underscored: true,
    }
  )
  return ResetPasswordStatus
}
