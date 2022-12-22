'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {



    static associate(models) {
      // define association here
      Group.hasMany(models.Event, {
        foreignkey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      });

      Group.hasMany(models.Venue, {
        foreignkey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      });

      Group.hasMany(models.Membership, {
        foreignkey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      });

      Group.hasMany(models.GroupImage, {
        foreignkey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      });

      Group.belongsTo(models.User, {
        foreignKey: 'organizerId',
      });
    }
  }

  Group.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,1000]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ['In Person', 'Online']
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        len: [1,50]
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        len: [1,50]
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
    schema: process.env.SCHEMA,
  });
  return Group;
};
