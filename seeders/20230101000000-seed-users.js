'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
        id: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        name: 'User One',
        lastName: 'LastName One',
        email: 'user1@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address One',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        name: 'User Two',
        lastName: 'LastName Two',
        email: 'user2@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address Two',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a9d66d46-ef97-4e80-b408-87f32e63e40b',
        name: 'User Three',
        lastName: 'LastName Three',
        email: 'user3@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address Three',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f16dca37-4518-4378-b6d5-0c16a0dc30a3',
        name: 'User Four',
        lastName: 'LastName Four',
        email: 'user4@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address Four',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '82e08d57-5a5a-4df4-8914-c632de13fadc',
        name: 'User Five',
        lastName: 'LastName Five',
        email: 'user5@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        isActive: true,
        address: 'Address Five',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
