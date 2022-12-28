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
      through: models.BaatUserShip,
      foreignKey: 'user_id',
      as: 'Baat_inbodies',
    })
    User.belongsToMany(models.BaatGripStrength, {
      through: models.BaatUserShip,
      foreignKey: 'user_id',
      as: 'Baat_grip_strengths',
    })
    User.belongsToMany(models.BaatCmj, {
      through: models.BaatUserShip,
      foreignKey: 'user_id',
      as: 'Baat_cmj',
    })
    User.belongsToMany(models.BaatImtp, {
      through: models.BaatUserShip,
      foreignKey: 'user_id',
      as: 'Baat_imtp',
    })
    User.belongsToMany(models.BaatWingateTest, {
      through: models.BaatUserShip,
      foreignKey: 'user_id',
      as: 'Baat_wingate_test',
    })
    User.hasOne(models.Role, {
      foreignKey: 'user_id',
      allowNull: false,
    })
    User.hasOne(models.Privacy_consent_status, {
      foreignKey: 'user_id',
      allowNull: false,
    })
    User.belongsToMany(models.SncInbody, {
      through: models.SncUserShip,
      foreignKey: 'user_id',
      as: 'Snc_inbody',
    })
    User.belongsToMany(models.Spc, {
      through: models.SpcUserShip,
      foreignKey: 'user_id',
      as: 'Spc',
    })
    User.belongsToMany(models.SstaBoat2km, {
      through: models.SstaUserShip,
      foreignKey: 'user_id',
      as: 'Ssta_boat_2km',
    })
    User.belongsToMany(models.SstaBoat30, {
      through: models.SstaUserShip,
      foreignKey: 'user_id',
      as: 'Ssta_boat_30',
    })
    User.belongsToMany(models.SstaBw, {
      through: models.SstaUserShip,
      foreignKey: 'user_id',
      as: 'Ssta_bw',
    })
    User.belongsToMany(models.SstaCyclingVo2, {
      through: models.SstaUserShip,
      foreignKey: 'user_id',
      as: 'Ssta_cycling_vo2',
    })
    User.belongsToMany(models.SstaFootball20m, {
      through: models.SstaUserShip,
      foreignKey: 'user_id',
      as: 'Ssta_football_20m',
    })
    User.belongsToMany(models.SstaFootball505, {
      through: models.SstaUserShip,
      foreignKey: 'user_id',
      as: 'Ssta_football_505',
    })
    User.belongsToMany(models.SstaFootballLight, {
      through: models.SstaUserShip,
      foreignKey: 'user_id',
      as: 'Ssta_football_light',
    })
    User.belongsToMany(models.SstaInbody, {
      through: models.SstaUserShip,
      foreignKey: 'user_id',
      as: 'Ssta_inbody',
    })
    User.belongsToMany(models.Src, {
      through: models.SrcUserShip,
      foreignKey: 'user_id',
      as: 'Src',
    })
    User.belongsToMany(models.Ssta2FMS, {
      through: models.Ssta2UserShip,
      foreignKey: 'user_id',
      as: 'Ssta2_fms',
    })
    User.belongsToMany(models.Ssta2LEST, {
      through: models.Ssta2UserShip,
      foreignKey: 'user_id',
      as: 'Ssta2_lest',
    })
    User.belongsToMany(models.Ssta2SEBT_L, {
      through: models.Ssta2UserShip,
      foreignKey: 'user_id',
      as: 'Ssta2_sebt_l',
    })
    User.belongsToMany(models.Ssta2SEBT_R, {
      through: models.Ssta2UserShip,
      foreignKey: 'user_id',
      as: 'Ssta2_sebt_r',
    })
    User.belongsToMany(models.Ssta2UEST, {
      through: models.Ssta2UserShip,
      foreignKey: 'user_id',
      as: 'Ssta2_uest',
    })
    User.belongsToMany(models.BaatStaticBalance, {
      through: models.BaatUserShip,
      foreignKey: 'user_id',
      as: 'Baat_static_balance',
    })
    User.belongsToMany(models.BaatDynamicBalance, {
      through: models.BaatUserShip,
      foreignKey: 'user_id',
      as: 'Baat_dynamic_balance',
    })
  }
  return User
}
