'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('volunteerapplications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" }
        }
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },      
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" }
        }      
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\(?\d{3}\)?(-| )?\d{3}(-| )?\d{4}$/i
        }
      },   
      haveWorkedWithAnimals: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      interestText: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Please explain your interest in taking care of a pet" }
        }
      },
      acknowledgedTerms: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }, 
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('volunteerapplications');
  }
};