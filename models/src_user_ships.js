'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class SrcUserShip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  SrcUserShip.init(
    {
      user_id: DataTypes.UUID,
      src_id: DataTypes.INTEGER,
      id_number: DataTypes.STRING,
      detect_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'SrcUserShip',
      tableName: 'Src_user_ships',
      underscored: true,
    }
  )
  return SrcUserShip
}
