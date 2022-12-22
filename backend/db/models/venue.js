'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {

    static associate(models) {
      // define association here
      Venue.hasMany(models.Event, {
        foreignKey: 'venueId',
        onDelete: 'CASCADE',
        hooks: true
      });

      Venue.belongsTo(models.Group, {
        foreignKey: 'groupId'
      });
    }
  }

  Venue.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    lng: {
      type: DataTypes.DECIMAL
    }
  }, {
    sequelize,
    modelName: 'Venue',
    schema: process.env.SCHEMA
  });
  return Venue;
};
