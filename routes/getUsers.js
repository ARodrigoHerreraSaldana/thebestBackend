import express from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../middleware/generateToken.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../index.js";
import { insertRefreshToken } from "../controllers/Users/Token.insert.js";
import sequelize from "../src/dbsequelize.js";
const routerGetUsers = express.Router();

routerGetUsers.get('/', async(req, res)=>
{   
    try
    {
        const results =  await sequelize.query(
            "select concat(firstName,'',lastName) as full_name, occupation, email, updatedAt, isActive  from users ;",
            {
              type: sequelize.QueryTypes.RAW,
            })
            return res.status(200).json({ message: results });
    }
    catch(error)
    {
        console.error(error)
        return res.status(400).json({ message: error.parent.sqlMessage  });
    }
    finally
    {
        
    }
})

export default routerGetUsers;