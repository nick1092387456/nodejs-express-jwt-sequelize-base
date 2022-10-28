'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      description: DataTypes.STRING(160),
      avatar: DataTypes.STRING,
      idNumber: DataTypes.STRING(10),
      gender: DataTypes.STRING,
      birthday: DataTypes.DATE,
      duty: DataTypes.STRING,
      sport: DataTypes.STRING,
      privateCheck: DataTypes.BOOLEAN,
      isAdmin: DataTypes.BOOLEAN,
    },
    { sequelize, modelName: 'User', tableName: 'Users', underscored: true }
  )
  User.associate = function (models) {
    User.belongsToMany(User, {
      through: models.CoachAthleteShip,
      foreignKey: 'athleteId',
      as: 'coach',
    })
    User.belongsToMany(User, {
      through: models.CoachAthleteShip,
      foreignKey: 'coachId',
      as: 'athlete',
    })
    User.belongsToMany(models.BaatInbody, {
      through: models.Baat_user_ship,
      foreignKey: 'user_id',
      as: 'Baat_Inbody',
    })
    User.belongsToMany(models.BaatGripStrength, {
      through: models.Baat_user_ship,
      foreignKey: 'user_id',
      as: 'Baat_GripStrength',
    })
    User.belongsToMany(models.baat_cmj, {
      through: models.Baat_user_ship,
      foreignKey: 'user_id',
      as: 'Baat_cmj',
    })
    User.belongsToMany(models.baat_imtp, {
      through: models.Baat_user_ship,
      foreignKey: 'user_id',
      as: 'Baat_imtp',
    })
    User.belongsToMany(models.baat_wingate_test, {
      through: models.Baat_user_ship,
      foreignKey: 'user_id',
      as: 'Baat_wingate_test',
    })
    User.hasOne(models.Role, {
      foreignKey: 'user_id',
      allowNull: false,
    })
  }
  return User
}
