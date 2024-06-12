'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        id: '8286443b-989d-4783-9a42-2d477e0267b7',
        type: 'art',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b7211535-6452-4697-a144-35116a62c078',
        type: 'antiques',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '66fa772a-195a-4006-819e-c37909a7674c',
        type: 'collectibles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a91e6862-3e44-4295-9173-5513d01e348c',
        type: 'technology',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2860e8e3-6789-4275-a237-668922d08a92',
        type: 'vehicles',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '15640257-4636-4241-87b1-0e5932269226',
        type: 'real estate',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Category', categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category', null, {});
  },
};
