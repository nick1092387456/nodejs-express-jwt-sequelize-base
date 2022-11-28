'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class EmailStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  EmailStatus.init(
    {
      email: DataTypes.STRING,
      verify_code: DataTypes.UUID,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EmailStatus',
      tableName: 'Email_statuses',
      underscored: true,
    }
  )
  return EmailStatus
}
