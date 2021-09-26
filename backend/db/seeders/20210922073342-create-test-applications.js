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
   await queryInterface.bulkInsert("applications", [
    {
      id: 1,
      uuid: "756850f7-26c7-4a83-8ec0-5488f16d0603",
      type: "Adoption",
      name: "Victor",
      dob: "1996-08-28T00:00:00.000Z",
      email: "victor@me.com",
      phone: "714-123-4567",
      homeType: "Apartment",
      haveChildren: false,
      homeStatus: "Rent",
      homeDescription: "I have 16 dogs",
      homeContact: "Shitty Landlord",
      isFirstPet: false,
      haveOtherPets: true,
      petsDescription: "I have 16 dogs",
      vetName: "My Vet Name",
      vetPhone: "123-456-7890",
      haveWorkedWithAnimals: true,
      interestText: "I'm just interested",
      acknowledgedTerms: true,
      createdAt: "2021-09-22T06:30:40.220Z",
      updatedAt: "2021-09-22T06:30:46.308Z",
      applicationAddressId: 1,
      petId: 1
    },
    {
      id: 2,
      uuid: "29f7078e-90e3-4af4-bbc2-54936f3dadae",
      type: "Foster",
      name: "Adam",
      dob: "1996-08-28T00:00:00.000Z",
      email: "adam@me.com",
      phone: "858-123-4567",
      homeType: "House",
      haveChildren: true,
      homeStatus: "Own",
      homeDescription: "I have no pets",
      homeContact: "Shitty Landlord",
      isFirstPet: false,
      haveOtherPets: false,
      petsDescription: "I have no pets",
      vetName: "My Vet Name",
      vetPhone: "123-456-7890",
      haveWorkedWithAnimals: true,
      interestText: "I'm just interested too",
      acknowledgedTerms: false,
      createdAt: "2021-09-22T06:30:40.220Z",
      updatedAt: "2021-09-22T06:30:46.308Z",
      applicationAddressId: 2,
      petId: 2
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
  }
};
