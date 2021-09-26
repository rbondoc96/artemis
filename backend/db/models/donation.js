'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
      }
    }
  };
  Donation.init({
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" }
      }
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: [[0.0]],
          msg: "Donation amount must be a floating-point number greater than 0.0"
        }
      }
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" }
      }
    },
    transactionDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'donations',
    modelName: 'Donation',
  });
  return Donation;
};