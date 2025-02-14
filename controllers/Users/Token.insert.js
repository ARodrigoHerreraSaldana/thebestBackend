import Tokens from "../../models/Token.model.js";

export const insertRefreshToken = async (newToken) => {
  try {
    const newUser = await Tokens.create({ token: newToken });
    return newUser;
  } catch (err) {
    console.error(err);
  }
};
