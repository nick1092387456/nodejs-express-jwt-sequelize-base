'use strict'

module.exports = (sequelize, DataTypes) => {
  const SstaUserShip = sequelize.define(
    'SstaUserShip',
    {
      id_number: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      ssta_inbody_id: DataTypes.INTEGER,
      ssta_boat_30_id: DataTypes.INTEGER,
      ssta_boat_2km_id: DataTypes.INTEGER,
      ssta_bw_id: DataTypes.INTEGER,
      ssta_football_20m_id: DataTypes.INTEGER,
      ssta_football_505_id: DataTypes.INTEGER,
      ssta_football_light_id: DataTypes.INTEGER,
      ssta_cycling_vo2_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SstaUserShip',
      tableName: 'Ssta_user_ships',
      underscored: true,
    }
  )
  return SstaUserShip
}
