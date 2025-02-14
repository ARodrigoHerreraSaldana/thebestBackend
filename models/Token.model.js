import sequelize from "../src/dbsequelize.js";
import pkg from "sequelize";
const { DataTypes } = pkg;

const Tokens = sequelize.define("tokens", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
    token: {
    type: DataTypes.TEXT,
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
    console.log("Token table created successfully!");
  } catch (error) {
    console.error("Unable to create table:", error);
  }
})();

export default Tokens;
