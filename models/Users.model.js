import sequelize from "../src/dbsequelize.js";
import pkg from "sequelize";
const { DataTypes } = pkg;

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  hashPassword: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Users table created successfully!");
  } catch (error) {
    console.error("Unable to create table:", error);
  }
})();

export default Users;
