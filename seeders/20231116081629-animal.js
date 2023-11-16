'use strict';

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
    await queryInterface.bulkInsert('Animals', [
      {
        name:"lion", 
        class:"mammal",
        legs: 4, 
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        name:"tiger", 
        class:"mammal",
        legs: 4, 
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        name:"turtle", 
        class:"reptile",
        legs: 4, 
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        name:"eagle", 
        class:"poultry",
        legs: 2, 
        createdAt: new Date(), 
        updatedAt: new Date()
      }
     ])
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
