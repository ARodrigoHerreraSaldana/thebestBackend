import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../middleware/generateToken.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index.js";
import { insertRefreshToken } from "../controllers/Users/Token.insert.js";
import sequelize from "../src/dbsequelize.js";
import Tokens from "../models/Token.model.js";
const routerLogout = express.Router();

routerLogout.delete("/", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const result = await Tokens.update(
        { isActive: 0 ,updatedAt:new Date().toISOString() }, 
        { where: { token: refreshToken } }
      );
    if (!refreshToken) return res.sendStatus(401); 
    res.status(200).json({message:refreshToken});

  } catch (error) {
    res.status(403).json({ message: error.message });
    console.error(error)
  } finally {
  }
});
export default routerLogout;