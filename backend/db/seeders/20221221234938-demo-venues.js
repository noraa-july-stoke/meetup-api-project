'use strict';

let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Venues"

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
    {
      groupId:1,
      address:"123 Anywhere Street",
      city:"Columbus",
      state:"Ohio",
      lat:39.9612,
      lng:-82.9988
    },
    {
      groupId:1,
      address:"124 Anywhere Street",
      city:"Columbus",
      state:"Ohio",
      lat:39.9612,
      lng:-82.9988
    },
    {
      groupId:3,
      address:"125 Anywhere Street",
      city:"Columbus",
      state:"Ohio",
      lat:39.9612,
      lng:-82.9988
    },
    {
      groupId:4,
      address:"126 Anywhere Street",
      city:"Columbus",
      state:"Ohio",
      lat:39.9612,
      lng:-82.9988
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1,3,4] }
    }, {});
  }
};
