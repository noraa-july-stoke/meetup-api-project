'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Attendance.belongsTo(models.Event, {
        foreignKey: 'eventId',
      });

      Attendance.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Attendance.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['member', 'waitlist', 'pending']]
      }
    }
  }, {
    sequelize,
    modelName: 'Attendance',
    schema: process.env.SCHEMA
  });
  return Attendance;
};
