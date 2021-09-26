'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert("donations", [
    {
        uuid: "1f22d45d-24ed-42f4-8bce-69a6e096d57d",
        name: "Victor",
        email: "victor@me.com",
        amount: 12.43,
        comments: "None from me",
        transactionDate: "2021-09-22T05:31:54.605Z",
        createdAt: "2021-09-22T05:31:54.606Z",
        updatedAt: "2021-09-22T05:31:54.606Z"
    },
    {
        uuid: "45e5d400-d8cc-49ce-8140-08b88171a7d5",
        name: "Victor",
        email: "victor@me.com",
        amount: 12.43,
        comments: "None from me",
        transactionDate: "2021-09-22T05:31:55.909Z",
        createdAt: "2021-09-22T05:31:55.909Z",
        updatedAt: "2021-09-22T05:31:55.909Z"
    }
])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("donations", null, {});
  }
};
