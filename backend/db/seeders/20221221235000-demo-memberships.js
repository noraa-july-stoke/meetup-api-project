'use strict';
let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Memberships"
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        groupId: 1,
        status: 'pending',
      },
      {
        userId: 2,
        groupId: 1,
        status: 'co-host',
      },
      {
        userId: 2,
        groupId: 2,
        status: 'member',
      },
      {
        userId: 3,
        groupId: 1,
        status: 'member',
      },
      {
        userId: 3,
        groupId: 2,
        status: 'co-host',
      },


    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
