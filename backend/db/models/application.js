'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Application extends Model {

    static associate(models) {
      this.belongsTo(models.ApplicationAddress, {
        foreignKey: "applicationAddressId",
        as: "applicationAddress",
      });

      this.belongsTo(models.Pet, {
        foreignKey: "petId",
        as: "pet",
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        petId: undefined,
        applicationAddressId: undefined,
      };
    }
  };

  Application.init({
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },    
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
        isIn: {
          args: [["Adoption", "Foster"]],
          msg: "Application type must be one of the following: Adoption, or Foster"
        }
      }
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
        notEmpty: { msg: "Email address cannot be empty" },
        isEmail: { msg: "Value is not a valid email address" }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\(?\d{3}\)?(-| )?\d{3}(-| )?\d{4}$/i
      }
    },
    applicationAddressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Apartment", "Condo", "Dormitory", "House", "Townhouse", "Other"]],
          msg: "Home Type must be one of the following: Apartment, Condo, Dormitory, House, Townhouse, or Other"
        }
      }
    },
    haveChildren: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    homeStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Own", "Rent"]],
          msg: "Home Status must be one of the following: Own or Rent"
        }
      }      
    },
    homeDescription: {
      type: DataTypes.STRING,
    },
    homeContact: {
      type: DataTypes.STRING,
    },
    isFirstPet: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    haveOtherPets: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    petsDescription: {
      type: DataTypes.STRING,
    },
    vetName: {
      type: DataTypes.STRING,
    },
    vetPhone: {
      type: DataTypes.STRING,
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
    tableName: 'applications',
    modelName: 'Application',
  });

  return Application;
};