import Templates from "../../models/Templates.model.js";

export const insertTemplates = async (obj) => {
    try {
      const newTemplates= await Templates.create({ 
        author:obj.author,
        uuid:obj.uuid,
        title:obj.title,
        description:obj.description,
        question1: obj.question1,
        answer1: obj.answer1,
        multianswer1: obj.multianswer1,  // Corrected
        type1: obj.type1,                // Corrected
        question2: obj.question2,
        answer2: obj.answer2,
        multianswer2: obj.multianswer2,  // Corrected
        type2: obj.type2,
        question3: obj.question3,
        answer3: obj.answer3,
        multianswer3: obj.multianswer3,
        type3: obj.type3,
        question4: obj.question4,
        answer4: obj.answer4,
        multianswer4: obj.multianswer4,
        type4: obj.type4,
    });
      return newTemplates;
    } catch (err) {
      console.error(err);
    }
  };
  