import Templates from "../../models/Templates.model.js";

export const getCards = async () => {
    try {
      const allTemplates = await Templates.findAll({
        attributes: ['author', 'title', 'description'],
      });
      return allTemplates ;
    } catch (err) {
      console.error(err);
    }
  };
  