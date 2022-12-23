'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {


    static associate(models) {
      Membership.belongsTo(models.Group, {
        foreignKey: 'groupId'
      });

      Membership.belongsTo(models.User, {
        foreignKey: 'userId'
      });

    }
  }
  Membership.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['co-host', 'member', 'pending']]
      }
    }
  }, {
    sequelize,
    modelName: 'Membership',
    schema: process.env.SCHEMA
  });

  return Membership;
};
