'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VolunteerApplication extends Model {
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined
      }
    }
  };

  VolunteerApplication.init({
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
  }, {
    sequelize,
    tableName: 'volunteerapplications',
    modelName: 'VolunteerApplication',
  });

  return VolunteerApplication;
};