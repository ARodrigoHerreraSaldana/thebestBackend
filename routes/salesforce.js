import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../middleware/generateToken.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index.js";
import { insertRefreshToken } from "../controllers/Users/Token.insert.js";
import sequelize from "../src/dbsequelize.js";
import Tokens from "../models/Token.model.js";
const routerSalesForce = express.Router();

routerSalesForce.get("/", async (req, res) => {
  try {
    res.status(200).json({message:'SalesForce'});
  } catch (error) {
    res.status(403).json({ message: error.message });
    console.error(error)
  } finally {
  }
});
export default routerSalesForce;