'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Privacy_consent_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Privacy_consent_status.belongsTo(models.User)
    }
  }
  Privacy_consent_status.init(
    {
      user_id: DataTypes.INTEGER,
      baat_root: DataTypes.BOOLEAN,
      snc_root: DataTypes.BOOLEAN,
      ssta_root: DataTypes.BOOLEAN,
      ssta2_root: DataTypes.BOOLEAN,
      src_root: DataTypes.BOOLEAN,
      spc_root: DataTypes.BOOLEAN,
      sptc_root: DataTypes.BOOLEAN,
      baat_coach: DataTypes.BOOLEAN,
      snc_coach: DataTypes.BOOLEAN,
      ssta_coach: DataTypes.BOOLEAN,
      ssta2_coach: DataTypes.BOOLEAN,
      src_coach: DataTypes.BOOLEAN,
      spc_coach: DataTypes.BOOLEAN,
      sptc_coach: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Privacy_consent_status',
      tableName: 'Privacy_consent_statuses',
      underscored: true,
    }
  )
  return Privacy_consent_status
}
