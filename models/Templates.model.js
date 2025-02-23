import sequelize from "../src/dbsequelize.js";
import pkg from "sequelize";
const { DataTypes } = pkg;

const Templates = sequelize.define("templates", {
  author:{
      type: DataTypes.STRING(50),
      allowNull: false,
  },
  uuid: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  question1: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  answer1: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  multianswer1: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  type1: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  question2: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  answer2: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  multianswer2: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  type2: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  question3: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  answer3: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  multianswer3: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  type3: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  question4: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  answer4: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  multianswer4: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  type4: {
    type: DataTypes.STRING(20),
    allowNull: true,
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

export default Templates;
