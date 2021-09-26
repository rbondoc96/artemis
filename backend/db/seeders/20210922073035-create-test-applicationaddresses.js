'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("applicationaddresses", [
     {
       id: 1,
       address1: "2234 Some Address Ave.",
       address2: "APT #30",
       address3: "",
       city: "San Diego",
       state: "CA",
       country: "US",
       postalCode: "92116",
       createdAt: "2021-09-22T06:30:40.220Z",
       updatedAt: "2021-09-22T06:30:46.308Z",       
     },
     {
      id: 2,
      address1: "999 Some St.",
      address2: "Building 2",
      address3: "STE 30",
      city: "San Diego",
      state: "CA",
      country: "US",
      postalCode: "92108",
      createdAt: "2021-09-22T06:30:40.220Z",
      updatedAt: "2021-09-22T06:30:46.308Z",      
    },     
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkInsert("applicationaddresses", null, {});    
  }
};
