'use strict';
let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Attendances"
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [

      {
        eventId: 1,
        userId: 1,
        status: 'member'
      },
      {
        eventId: 2,
        userId: 2,
        status: 'member'
      },
      {
        eventId: 3,
        userId: 2,
        status: 'member'
      }
    ]);

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2] }
    }, {});
  }
};
