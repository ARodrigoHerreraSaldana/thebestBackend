import Answers from "../../models/Answers.model.js";

export const insertAnswer = async (mail,obj) => {
    
    try {
      const newTemplates= await Answers.create({ 
        uuid:obj.uuid,
        user:mail,
        answer1:obj.answer1,
        answer2:obj.answer2,
        answer3:obj.answer3,
        answer4:obj.answer4,
    });
      return newTemplates;
    } catch (err) {
      console.error(err);
    }
  };