import Answers from "../../models/Answers.model.js";
export const getAllAswers= async () => {
    try {
      const allAnswers = await Answers.findAll({
      });
      return allAnswers ;
    } catch (err) {
      console.error(err);
    }
  };
  