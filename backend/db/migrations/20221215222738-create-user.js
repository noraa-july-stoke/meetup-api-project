'use strict';
/** @type {import('sequelize-cli').Migration} */


// options.schema = process.env.SCHEMA;  // define your schema in options object
let options = {};
options.schema = process.env.SCHEMA;  // define your schema in options object
options.tableName = "Users";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema(process.env.SCHEMA).then(() => {
      queryInterface.createTable("Users", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING(256),
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING(256),
          allowNull: false
        },
        username: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING(256),
          allowNull: false,
          unique: true
        },
        hashedPassword: {
          type: Sequelize.STRING.BINARY,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
      }, options)
    });
},
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(options, options);
  }
};
