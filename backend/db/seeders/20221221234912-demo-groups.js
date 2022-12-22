'use strict';
let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Groups"
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(options, [
    {
      organizerId: 1,
      name: "Group 1",
      about: "A fun group on this exciting website.",
      type: "In Person",
      private: true,
      city: "Columbus",
      state: "Ohio",
    },
    {
      organizerId: 1,
      name: "Group 2",
      about: "A fun group on this exciting website.",
      type: "Online",
      private: false,
      city: null,
      state: null,
    },
    {
      organizerId: 1,
      name: "Group 3",
      about: "A fun group on this exciting website.",
      type: "In Person",
      private: false,
      city: "Columbus",
      state: "Ohio",
    },
    {
      organizerId: 2,
      name: "Group 4",
      about: "A fun group on this exciting website.",
      type: "In Person",
      private: true,
      city: "Columbus",
      state: "Ohio",
    },
    {
      organizerId: 2,
      name: "Group 5",
      about: "A fun group on this exciting website.",
      type: "In Person",
      private: false,
      city: "Columbus",
      state: "Ohio",
    },
    ]);

  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Group 1', 'Group 2','Group 3','Group 4','Group 5'] }
    }, {});

  }
};
