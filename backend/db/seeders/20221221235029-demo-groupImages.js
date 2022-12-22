'use strict';
let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "GroupImages"
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: "image.com/url_path",
        preview: true
      },
      {
        groupId: 1,
        url: "image.com/url_path",
        preview: false
      },
      {
        groupId: 2,
        url: "image.com/url_path",
        preview: true
      },
      {
        groupId: 3,
        url: "image.com/url_path",
        preview: true
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
