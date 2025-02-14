import Tokens from "../../models/Token.model.js";

export const findToken = async (newToken) => {
  try {
    const theToken = await Tokens.findOne({where:{ token: newToken }});
    return theToken;
  } catch (err) {
    console.error(err);
  }
};
