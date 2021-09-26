'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationAddress extends Model {
    static associate(models) {
      this.hasOne(models.Application, {
        foreignKey: "applicationAddressId",
        onDelete: "cascade",
      })
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
      }
    }
  };
  ApplicationAddress.init({
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Address Line 1 cannot be an empty string" }
      }
    },
    address2: {
      type: DataTypes.STRING,
    },
    address3: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "City cannot be empty" }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "State cannot be empty" }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Country cannot be empty" }
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Postal Code cannot be empty" }
      }
    }
  }, {
    sequelize,
    tableName: 'applicationaddresses',
    modelName: 'ApplicationAddress',
  });
  return ApplicationAddress;
};