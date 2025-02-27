import Templates from "../../models/Templates.model.js";

export const getCard = async (data) => {
    try {
      const theTemplate = await Templates.findOne({where:{ uuid: data }});
      return theTemplate ;
    } catch (err) {
      console.error(err);
    }
  };
  