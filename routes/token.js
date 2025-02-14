import express from "express";
import jwt from "jsonwebtoken";

import generateAccessToken from "../middleware/generateToken.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index.js";
import { findToken } from "../controllers/Users/Token.find.js";
import sequelize from "../src/dbsequelize.js";
const routerToken = express.Router();

routerToken.post("/", async (req, res) => {
  try {

    // Access the cookies
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401); 
    console.log(refreshToken);

    // Find the token in the database
    let result = await findToken(refreshToken);
    if (!result) return res.sendStatus(401); 

    // Verify the refresh token
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) return res.sendStatus(403); 
      console.log(user);
      // Generate a new access token
      const accessToken = generateAccessToken({ mail : data.mail });
      res.json({ accessToken });
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(403).json({ message: error.message }); // Respond with the error message
  } finally {
    console.log("Request processed");
  }
});

export default routerToken;