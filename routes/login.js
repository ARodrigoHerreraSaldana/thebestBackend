import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../middleware/generateToken.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index.js";
import { insertRefreshToken } from "../controllers/Users/Token.insert.js";
import sequelize from "../src/dbsequelize.js";
const routerLogin = express.Router();

routerLogin.post("/", async (req, res) => {
  try {
    if (!REFRESH_TOKEN_SECRET)
      return res.status(401).json({ message: "Internal Problems" });
    //check the username and password
    const [results, metadata] = await sequelize.query(
      "select checkuser(:email,:password) as Result",
      {
        replacements: { email: req.body.email, password: req.body.password },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    //if the user can log in
    if (results.Result == 1) {
      const results = await sequelize.query(
        "UPDATE users SET updatedAt = :date WHERE email = :email",
        {
          replacements: {
            date: new Date().toISOString(),
            email: req.body.email,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      );
      //work with token
      const data = { mail: req.body.email };
      const accessToken = generateAccessToken(data);
      const refreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET);
      if (!refreshToken || !accessToken == null) {
        return res.status(401).json({ message: "Internal Problems" });
      }
      //push to the database the access Token
      await insertRefreshToken(refreshToken);
      //push the access and refresh cookie into a cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
      });
      //push to the session
      req.session.accessToken = accessToken;
      
      req.session.refreshToken = refreshToken;
      res.status(200).json({ message: "User authenticated succesfully" });
    } else {
      return res.status(403).json({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
    console.error(error);
  } finally {
  }
});

export default routerLogin;
