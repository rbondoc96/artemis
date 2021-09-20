'use strict';
import {DataTypes, Model, Optional} from "sequelize"
import {sequelize} from "."

// Fields of single database row
interface TestUserAttributes {
  id: string
  name: string
  email: string
}


/*
  Must declare this to tell Sequelize and TypeScript that the "id" property
  is optional/it will be passed at creation time
*/
interface TestUserCreationAttributes extends Optional<TestUserAttributes, "id"> {}

// Single database row/record
interface TestUserInstance extends Model<TestUserAttributes, TestUserCreationAttributes>, TestUserAttributes {
  createdAt?: Date
  updatedAt?: Date
}

const TestUser = sequelize.define<TestUserInstance>("TestUser", {
  id: {
    type: DataTypes.UUID,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
})

export default TestUser