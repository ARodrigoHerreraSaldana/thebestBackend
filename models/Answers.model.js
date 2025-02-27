import sequelize from "../src/dbsequelize.js";
import pkg from "sequelize";
const { DataTypes } = pkg;

const Answers = sequelize.define("answers", {
  uuid: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  answer1:{
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  answer2:{
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  answer3:{
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  answer4:{
    type: DataTypes.STRING(50),
    allowNull: true,
  }
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Answers table created successfully!");
  } catch (error) {
    console.error("Unable to create table:", error);
  }
})();

export default Answers;
