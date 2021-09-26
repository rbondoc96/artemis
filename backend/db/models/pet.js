'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      this.hasMany(models.Application, {
        foreignKey: "petId",
        as: "applications",
        onDelete: "cascade",
      });
    }

    toJSON() {
      return({
        ...this.get(),
        id: undefined,
      });
    }    
  };
  Pet.init({
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
        notEmpty: { msg: "Name must not be empty" }
      }      
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Cat", "Dog"]],
          msg: "The pet must be either a Cat or a Dog"
        }
      }
    },
    breed: {
      type: DataTypes.STRING,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Male", "Female", "Male & Male", "Female & Female", "Female & Male", "Male & Female"]],
          msg: "Sex must be one of the following: Male, Female, Male & Male, Female & Female, Female & Male, or Male & Female"
        }
      }
    },
    ageInDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Value must be greater than or equal to 0"
        }
      }
    },
    weightInKg: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: "Value must be a floating-point number greater than 0.0" },
        min: {
          args: [0.0],
          msg: "Value must be greater than 0.0"
        }
      }
    }, 
    birthday: {
      type: DataTypes.DATE,
    },
    adoptionStatus: {
      type: DataTypes.STRING,
      defaultValue: "Available",
      allowNull: false,
      validate: {
        isIn: {
          args: [["Not Available", "Available", "Fostered", "Adopted"]],
          msg: "Adoption Status must be one of the following: Not Available, Available, Fostered, Adopted"
        }
      }
    },  
    dateAdmitted: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Description must not be empty" }
      }      
    }
  }, {
    sequelize,
    tableName: "pets",
    modelName: 'Pet',
  });
  return Pet;
};