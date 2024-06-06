'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = [
      {
        id:  uuidv4(),
        name: 'User One',
        lastName: 'LastName One',
        email: 'user1@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address One',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:  uuidv4(),
        name: 'User Two',
        lastName: 'LastName Two',
        email: 'user2@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address Two',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:  uuidv4(),
        name: 'User Three',
        lastName: 'LastName Three',
        email: 'user3@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address Three',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:  uuidv4(),
        name: 'User Four',
        lastName: 'LastName Four',
        email: 'user4@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address Four',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:  uuidv4(),
        name: 'User Five',
        lastName: 'LastName Five',
        email: 'user5@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address Five',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
