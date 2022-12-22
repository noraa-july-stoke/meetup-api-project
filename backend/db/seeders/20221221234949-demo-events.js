'use strict';
let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Events"
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
    {
      venueId: 1,
      groupId: 1,
      name: "Event 1",
      description: "Event 1",
      type: "In Person",
      capacity:100,
      price: 0,
      startDate: new Date('2023-12-25 19:00:00'),
      endDate: new Date('2023-12-25 22:00:00')
    },
    {
      venueId: null,
      groupId: 1,
      name: "Event 2",
      description: "Event 2",
      type: "Online",
      capacity:1000,
      price: 0,
      startDate: new Date('2023-12-26 19:00:00'),
      endDate: new Date('2023-12-26 22:00:00')
    },
    {
      venueId: 2,
      groupId: 2,
      name: "Event 3",
      description: "Event 3",
      type: "In Person",
      capacity:200,
      price: 100,
      startDate: new Date('2023-12-27 19:00:00'),
      endDate: new Date('2023-12-27 22:00:00')
    },
    {
      venueId: 3,
      groupId: 3,
      name: "Event 4",
      description: "Event 4",
      type: "In Person",
      capacity:200,
      price: 100,
      startDate: new Date('2023-12-28 19:00:00'),
      endDate: new Date('2023-12-28 22:00:00')
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Event 1', 'Event 2', 'Event 3', 'Event 4'] }
    }, {});
  }
};
