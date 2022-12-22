'use strict';

let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "EventImages"

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: "image.com/url_path",
        preview: true
      },
      {
        eventId: 1,
        url: "image.com/url_path",
        preview: false
      },
      {
        eventId: 2,
        url: "image.com/url_path",
        preview: true
      },
      {
        eventId: 3,
        url: "image.com/url_path",
        preview: true
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
