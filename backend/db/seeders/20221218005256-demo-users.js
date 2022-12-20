'use strict';
const bcrypt = require("bcryptjs");

// let options = {};
// options.schema = process.env.SCHEMA;  // define your schema in options object

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: "User",
        lastName: "One",
        email: 'user1@user.io',
        username: 'user1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "User",
        lastName: "Two",
        email: 'user2@user.io',
        username: 'user2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "User",
        lastName: "Three",
        email: 'user3@user.io',
        username: 'user3',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "User",
        lastName: "Four",
        email: 'user4@user.io',
        username: 'user4',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "User",
        lastName: "Five",
        email: 'user5@user.io',
        username: 'user5',
        hashedPassword: bcrypt.hashSync('password')
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['user1', 'user2', 'user3', 'user4', 'user5'] }
    }, {});
  }
};
