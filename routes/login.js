import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../middleware/generateToken.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index.js";
import { insertRefreshToken } from "../controllers/Users/Token.insert.js";
import sequelize from "../src/dbsequelize.js";
const routerLogin = express.Router();

routerLogin.post("/", async (req, res) => {
  try {
    if (!REFRESH_TOKEN_SECRET) return res.sendStatus(401).json({ message: "Internal Problems" });
    //check the username and password
    const [results, metadata] = await sequelize.query(
      "select checkuser(:mail,:password) as Result",
      {
        replacements: { mail: req.body.mail, password: req.body.password },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    //if the user can log in
    if (results.Result == 1) {
      //work with token
      const data = { mail: req.body.mail };
      const accessToken = generateAccessToken(data);
      const refreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET);
      if (!refreshToken  || !accessToken == null) {
        return res.sendStatus(401).json({ message: "Internal Problems" });
      }
      //push to the database the access Token
      await insertRefreshToken(refreshToken);
      //push the acces and refresh cooki into a cookie
      res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
      res.status(200).json({message: "User authenticated succesfully",accessToken: accessToken, refreshToken: refreshToken,
      });
    } else {
      return res.status(200).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.log("x");
    console.error("error", error);
    res.status(403).json({ message: error.message });
  } finally {
    console.log("sss");
  }
});

export default routerLogin;
