'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert("pets", [
    {
      id: 1,
      uuid: "22cf0332-d8d7-40ab-b445-27fe5dd92ed6",
      adoptionStatus: "Available",
      dateAdmitted: "2021-09-21T04:07:51.391Z",
      name: "Misty & Pepper",
      type: "Cat",
      ageInDays: 30,
      breed: "Domestic Shorthair",
      sex: "Female & Female",
      weightInKg: 1.2,
      birthday: null,
      description: "Hi I'm a Cat",
      updatedAt: "2021-09-21T04:07:51.391Z",
      createdAt: "2021-09-21T04:07:51.391Z"
    },
    {
      id: 2,
      uuid: "53ad0332-a8d7-76ab-c445-57fe5dd42ed7",
      adoptionStatus: "Available",
      dateAdmitted: "2021-09-21T04:07:51.391Z",
      name: "Brock",
      type: "Cat",
      ageInDays: 30,
      breed: "Domestic Shorthair",
      sex: "Male",
      weightInKg: 2.4,
      birthday: null,
      description: "Hi I'm a Cat",
      updatedAt: "2021-09-21T04:07:51.391Z",
      createdAt: "2021-09-21T04:07:51.391Z"
    }, 
    {
      id: 3,
      uuid: "7294233b-9e52-4829-aef0-06c0cf6489b2",
      adoptionStatus: "Available",
      dateAdmitted: "2021-09-22T07:21:46.168Z",
      name: "Max",
      type: "Dog",
      ageInDays: 365,
      breed: "German Shepherd",
      sex: "Male",
      weightInKg: 5,
      birthday: null,
      description: "Hi I'm Max",
      updatedAt: "2021-09-22T07:21:46.169Z",
      createdAt: "2021-09-22T07:21:46.169Z"
    },   
   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pets", null, {})
  }
};
