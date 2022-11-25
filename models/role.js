'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsTo(models.User)
    }
  }
  Role.init(
    {
      user_id: DataTypes.UUID,
      baat: DataTypes.BOOLEAN,
      snc: DataTypes.BOOLEAN,
      ssta: DataTypes.BOOLEAN,
      ssta2: DataTypes.BOOLEAN,
      src: DataTypes.BOOLEAN,
      spc: DataTypes.BOOLEAN,
      sptc: DataTypes.BOOLEAN,
      coach: DataTypes.BOOLEAN,
      athlete: DataTypes.BOOLEAN,
      analyst: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'Roles',
      underscored: true,
    }
  )
  return Role
}
